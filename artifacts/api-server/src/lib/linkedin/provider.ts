import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const linkedinProviderOperations = [
  "publish_organization_post",
] as const;

export type LinkedinProviderOperation = typeof linkedinProviderOperations[number];
export type LinkedinProviderCapabilities = {
  read: boolean;
  execute: boolean;
  send: boolean;
  publish: boolean;
  publishOrganizationPost: boolean;
  sendConnectionRequest: boolean;
  sendDirectMessage: boolean;
  publishComment: boolean;
};

export type LinkedinProviderStatus = {
  name: string;
  configured: boolean;
  mode: "manual_only" | "official_api";
  discovery: "configuration" | "disabled";
  capabilities: LinkedinProviderCapabilities;
  allowedOperations: LinkedinProviderOperation[];
  unavailableReasons: string[];
};

export type LinkedinProviderExecution = {
  operation: LinkedinProviderOperation;
  reconciliationKey: string;
  approvedCopy: string;
};

export type LinkedinProviderResult = {
  providerActionId: string | null;
  state: "accepted" | "ambiguous";
};

export class LinkedinProviderError extends Error {
  constructor(
    message: string,
    readonly outcome: "definitive" | "ambiguous",
  ) {
    super(message);
    this.name = "LinkedinProviderError";
  }
}

const disabledCapabilities = (): LinkedinProviderCapabilities => ({
  read: false,
  execute: false,
  send: false,
  publish: false,
  publishOrganizationPost: false,
  sendConnectionRequest: false,
  sendDirectMessage: false,
  publishComment: false,
});

const configuredScopes = () => new Set(
  (process.env.LINKEDIN_OFFICIAL_SCOPES ?? "")
    .split(/[\s,]+/)
    .map((scope) => scope.trim())
    .filter(Boolean),
);

function configuration() {
  const accessToken = process.env.LINKEDIN_OFFICIAL_ACCESS_TOKEN?.trim();
  const organizationId = process.env.LINKEDIN_OFFICIAL_ORGANIZATION_ID?.trim();
  const enabled = process.env.LINKEDIN_OFFICIAL_PROVIDER_ENABLED === "true";
  const approved = process.env.LINKEDIN_OFFICIAL_PROVIDER_APPROVED === "true";
  const scopes = configuredScopes();
  const canPublish = enabled
    && approved
    && Boolean(accessToken)
    && Boolean(organizationId)
    && scopes.has("w_organization_social");
  return { accessToken, organizationId, enabled, approved, scopes, canPublish };
}

export function discoverLinkedinProviderStatus(): LinkedinProviderStatus {
  const config = configuration();
  const unavailableReasons: string[] = [];
  if (!config.enabled) unavailableReasons.push("Official provider is not enabled");
  if (!config.approved) unavailableReasons.push("Official provider approval is not recorded");
  if (!config.accessToken) unavailableReasons.push("Official provider access token is not configured");
  if (!config.organizationId) unavailableReasons.push("LinkedIn organization ID is not configured");
  if (!config.scopes.has("w_organization_social")) unavailableReasons.push("Required w_organization_social permission is unavailable");

  return {
    name: config.canPublish ? "LinkedIn Official API" : "Manual only",
    configured: config.canPublish,
    mode: config.canPublish ? "official_api" : "manual_only",
    discovery: config.enabled ? "configuration" : "disabled",
    capabilities: config.canPublish
      ? {
          ...disabledCapabilities(),
          execute: true,
          publish: true,
          publishOrganizationPost: true,
        }
      : disabledCapabilities(),
    allowedOperations: config.canPublish ? ["publish_organization_post"] : [],
    unavailableReasons,
  };
}

function assertAllowedOperation(operation: string): asserts operation is LinkedinProviderOperation {
  if (!linkedinProviderOperations.includes(operation as LinkedinProviderOperation)) {
    throw new LinkedinProviderError(`Unsupported LinkedIn provider operation: ${operation}`, "definitive");
  }
}

async function executeOfficialProvider(input: LinkedinProviderExecution): Promise<LinkedinProviderResult> {
  assertAllowedOperation(input.operation);
  const config = configuration();
  if (!config.canPublish || !config.accessToken || !config.organizationId) {
    throw new LinkedinProviderError("LinkedIn official provider is not configured with approved permissions", "definitive");
  }

  try {
    const response = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json",
        "LinkedIn-Version": process.env.LINKEDIN_API_VERSION?.trim() || "202601",
        "X-Restli-Protocol-Version": "2.0.0",
        "X-RestLi-Idempotency-Key": input.reconciliationKey,
      },
      body: JSON.stringify({
        author: `urn:li:organization:${config.organizationId}`,
        commentary: input.approvedCopy,
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const providerActionId = response.headers.get("x-restli-id");
    if (response.ok) {
      return { providerActionId, state: providerActionId ? "accepted" : "ambiguous" };
    }
    const detail = (await response.text()).slice(0, 500);
    const message = `LinkedIn provider rejected the action (${response.status})${detail ? `: ${detail}` : ""}`;
    throw new LinkedinProviderError(message, response.status >= 500 ? "ambiguous" : "definitive");
  } catch (error) {
    if (error instanceof LinkedinProviderError) throw error;
    throw new LinkedinProviderError(
      error instanceof Error ? `LinkedIn provider outcome is unknown: ${error.message}` : "LinkedIn provider outcome is unknown",
      "ambiguous",
    );
  }
}

export function verifyLinkedinProviderWebhook(rawBody: Buffer, signature: string | undefined): boolean {
  const secret = process.env.LINKEDIN_OFFICIAL_CLIENT_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const supplied = signature.replace(/^sha256=/i, "").trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(supplied)) return false;
  return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(supplied, "hex"));
}

export function linkedinWebhookChallenge(challengeCode: string): string {
  const secret = process.env.LINKEDIN_OFFICIAL_CLIENT_SECRET;
  if (!secret) throw new Error("LinkedIn webhook secret is not configured");
  return createHash("sha256").update(`${challengeCode}${secret}`).digest("hex");
}

export const linkedinProvider = {
  get name() {
    return discoverLinkedinProviderStatus().name;
  },
  get capabilities() {
    return discoverLinkedinProviderStatus().capabilities;
  },
  status: discoverLinkedinProviderStatus,
  async execute(input?: LinkedinProviderExecution): Promise<LinkedinProviderResult> {
    if (!input) {
      throw new LinkedinProviderError("LinkedIn provider execution requires an approved queue action", "definitive");
    }
    return executeOfficialProvider(input);
  },
};