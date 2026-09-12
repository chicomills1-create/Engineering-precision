import { getAuthoritativeLaneConfig, type OutreachLaneConfig } from "./outreachLaneConfig";
import {
  getCurrentPhoenixPreparationTarget,
  type PhoenixPreparationTarget,
  prepareNextPhoenixOutreach,
} from "./outreachPreparation";
import { prepareNextPhoenixHotMarketOutreach } from "./hotMarketPreparation";
import { prepareNextPhoenixHotLeadOutreach } from "./outreachHotLeads";

export type PhoenixRecoveryResult = {
  state: "skipped" | "refused" | "completed" | "failed";
  targetDate: string | null;
  target?: PhoenixPreparationTarget;
  laneConfig?: Pick<
    OutreachLaneConfig,
    "namedLimit" | "publicLimit" | "hotMarketLimit" | "hotLeadLimit"
  >;
  regular?: Awaited<ReturnType<typeof prepareNextPhoenixOutreach>>;
  hotMarket?: Awaited<ReturnType<typeof prepareNextPhoenixHotMarketOutreach>>;
  hotLead?: Awaited<ReturnType<typeof prepareNextPhoenixHotLeadOutreach>>;
  error?: string;
};

export function isBeforePhoenixEight(now: Date): boolean {
  const target = getCurrentPhoenixPreparationTarget(now);
  return now.getTime() < target.scheduledAt.getTime();
}

export async function recoverCurrentPhoenixOutreach(options: {
  now?: Date;
  enabled?: boolean;
} = {}): Promise<PhoenixRecoveryResult> {
  const now = options.now ?? new Date();
  // Recovery only stages approved queue rows; it has no dispatch/provider
  // dependency.  Keeping this enabled at startup is what makes a Reserved VM
  // restart before 08:00 useful, while the Phoenix cutoff remains a hard gate.
  const enabled = options.enabled ?? true;
  if (!enabled) return { state: "skipped", targetDate: null };

  const target = getCurrentPhoenixPreparationTarget(now);
  if (!isBeforePhoenixEight(now)) {
    return { state: "refused", targetDate: target.targetDate, target };
  }

  try {
    // Resolve this before any preparation begins.  Each lane preparation also
    // reads the value, while this check makes recovery fail closed if startup
    // was called before authoritative configuration was actually available.
    const laneConfig = await getAuthoritativeLaneConfig(undefined, undefined, target.scheduledAt);
    const [regular, hotMarket, hotLead] = await Promise.all([
      prepareNextPhoenixOutreach(now, target),
      prepareNextPhoenixHotMarketOutreach(now, target),
      prepareNextPhoenixHotLeadOutreach(now, target),
    ]);
    return {
      state: "completed",
      targetDate: target.targetDate,
      target,
      laneConfig: {
        namedLimit: laneConfig.namedLimit,
        publicLimit: laneConfig.publicLimit,
        hotMarketLimit: laneConfig.hotMarketLimit,
        hotLeadLimit: laneConfig.hotLeadLimit,
      },
      regular,
      hotMarket,
      hotLead,
    };
  } catch (error) {
    return {
      state: "failed",
      targetDate: target.targetDate,
      target,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}