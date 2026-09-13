import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ARIZONA_IDENTITY_REVIEW,
  evaluateArizonaIdentityReview,
  type ArizonaIdentityReview,
} from "./official-evidence/claims";
import {
  LICENSED_STATES_TEXT,
  LICENSING_COVERAGE_STATEMENT,
} from "../src/lib/licensing";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generalProhibited = [
  /\b49(?:\s+U\.?S\.?)?\s+states\b/i,
  /\b49-state\b/i,
  /\bstates?\s+PE[-\s]*licensed\b/i,
  /PE\s+(?:licenses?|licensure)[^.\n]{0,60}\b49\b/i,
  /in-house\s+architect/i,
  /licensed\s+architect\s+on\s+staff/i,
  /architecture\s+team\s+includes\s+(?:an\s+)?architects?\s+licensed/i,
  /UFC[-\s]*qualified\s+(?:engineering\s+)?team/i,
  /20\+\s+(?:licensed\s+)?engineers/i,
  /"@type"\s*:\s*"GeoCoordinates"/i,
  /Apex Grid(?: Engineering)?\s+is[^.\n]{0,100}\bSDVOSB\b/i,
  /\b(?:we are|Apex Grid is)\s+SAM\.gov registered\b/i,
  /\bregistered (?:with|in) SAM\.gov\b/i,
  /\bactive registration with UEI\b/i,
  /\b(?:eligible|qualifies) for SDVOSB\b/i,
  /\bour SDVOSB status\b/i,
  // Apex-specific credential, coverage, staffing, and outcome claims must be
  // tied to a named responsible professional, current evidence, discipline,
  // firm authorization, and the AHJ. Keep educational explanations (for
  // example, "a PE must...") outside these patterns.
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\b(?:nationwide|across the (?:country|US)|anywhere in the country|all states)\b/i,
  /\bApex Grid\b[^.\n]{0,100}\b(?:in[- ]house|on staff)\b[^.\n]{0,60}\b(?:PE|engineer|architect|professional)\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\b(?:never outsourced|not outsourced|without outsourcing|no separate consultant)\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\b(?:carry|take)\b[^.\n]{0,40}\b(?:anywhere|everywhere|any project)\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\b(?:maintain(?:s|ing)?|hold(?:s)?)\b[^.\n]{0,80}\b(?:license|licensure)\b[^.\n]{0,60}\b(?:all|every|multiple jurisdictions|across .*states)\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\b(?:registered|licensed)\s+architects?\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\bNCARB\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\bmaintain(?:s|ing)?\b[^.\n]{0,60}\blicen[cs]/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\b(?:local|regional)\s+(?:offices?|hubs?)\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\bguarantee[sd]?\b[^.\n]{0,60}\b(?:permit|approval|acceptance|pass)\b/i,
  /\b(?:Apex Grid|we|our)\b[^.\n]{0,100}\b(?:every|all)\s+(?:permit|project|work)\b[^.\n]{0,60}\b(?:stamp|seal|approve)\b/i,
  /\bApex Grid\b[^.\n]{0,100}\b(?:stamp|seal)[^.\n]{0,80}\b(?:all|every|any)\b/i,
  /\bevery\s+project\s+is\s+overseen\s+and\s+stamped\b/i,
];

const identityProhibited = [
  /["']?legalName["']?\s*:\s*(?!null\b|undefined\b)["'`][^"'`]+/i,
  /["']?legalName["']?\s*:\s*(?!null\b|undefined\b)[A-Za-z_$][\w$]*/i,
  /(?:^|[{,])\s*legalName\s*(?=[,}])/im,
  /\b(?:Apex Grid(?: Engineering)?(?:['’]s)?|our|the\s+(?:company|firm|business)(?:['’]s)?)\s+legal\s+name\s*(?:is\b|:)\s*(?!not\b)[A-Z]/i,
  /["']@type["']\s*:\s*["'](?:LocalBusiness|ProfessionalService)["'][\s\S]{0,1200}["']?address["']?\s*:/i,
  /["']?address["']?\s*:[\s\S]{0,1200}["']@type["']\s*:\s*["'](?:LocalBusiness|ProfessionalService)["']/i,
  /\b(?:Apex Grid(?: Engineering)?|we|our)\b[^.\n]{0,120}\b(?:is\s+)?headquartered\b/i,
  /\b(?:Apex Grid(?: Engineering)?)['’]s\s+headquarters\b/i,
  /\b(?:Apex Grid(?: Engineering)?|our)\s+headquarters\s+(?:is|are|sits?|operates?)\b/i,
  /\b(?:the\s+)?(?:company|firm|business)\s+is\s+headquartered\b/i,
  /\b(?:Apex Grid(?: Engineering)?|our)\b[^.\n]{0,120}\bstatutory[-\s]?agent(?:['’]s)?\s+address\b/i,
  /\b(?:Apex Grid(?: Engineering)?|our)\b[^.\n]{0,120}\bofficial[-\s]?mailing\s+address\b/i,
  /\b(?:Apex Grid(?: Engineering)?|our)\b[^.\n]{0,120}\bregulator[-\s]?verified(?:\s+(?:firm|business))?\s+address\b/i,
  /\b(?:ACC|BTR|regulator)[-\s]verified(?:\s+(?:firm|business))?\s+address\s*(?:is|at|:)\s*(?!not\b)[A-Z0-9]/i,
  /\b(?:headquarters|statutory[-\s]?agent\s+address|official[-\s]?mailing\s+address)\s*(?::|is|at)\s+(?!not\b)[A-Z0-9]/i,
] as const;

const prohibited = [...generalProhibited, ...identityProhibited];
const EVIDENCE_GATE_MARKER = "claims-audit: evidence-gated";
const AUTHORIZED_LICENSING_TEXT = [
  LICENSING_COVERAGE_STATEMENT,
  "Licensed in 49 states",
  LICENSED_STATES_TEXT,
] as const;

function withoutAuthorizedLicensingText(text: string) {
  return AUTHORIZED_LICENSING_TEXT.reduce((result, statement) => result.replaceAll(statement, ""), text);
}

const regressionClaims = [
  ["Apex Grid holds PE licenses across ", "49 U.S. states"].join(""),
  ["PE Licensure — ", "49 States"].join(""),
  ["States ", "PE-Licensed"].join(""),
  ["Licensed Architect ", "on staff"].join(""),
  ["UFC-qualified ", "engineering team"].join(""),
  ["Apex Grid is an ", "SDVOSB"].join(""),
  ["We are ", "SAM.gov registered"].join(""),
  ["Apex Grid provides ", "nationwide engineering"].join(""),
  ["Our ", "in-house PEs never outsourced"].join(""),
  ["We carry ", "your project anywhere in the country"].join(""),
  ["Apex Grid maintains licenses across ", "all disciplines"].join(""),
  ["Our ", "registered architects are NCARB certified"].join(""),
  ["Apex Grid has local ", "offices nationwide"].join(""),
  ["We guarantee ", "permit acceptance"].join(""),
  ["Apex Grid stamps ", "every project"].join(""),
  ["Every project is overseen\n", "and stamped by a licensed PE"].join(""),
  ['"legalName": "', "Apex Grid Engineering", '"'].join(""),
  ['legalName: "', "Apex Grid Engineering LLC", '"'].join(""),
  ["const schema = { ", "legalName", " };"].join(""),
  ["const schema = { legalName: ", "verifiedName", " };"].join(""),
  ["Apex Grid Engineering's legal name ", "is Apex Grid Engineering LLC."].join(""),
  ["The company’s legal name: ", "Apex Grid Engineering LLC."].join(""),
  ['"@type": "ProfessionalService", "name": "Apex Grid Engineering", "address": {"@type": "PostalAddress"}'].join(""),
  ['"@type": "ProfessionalService", name: "Apex Grid Engineering", address: { "@type": "PostalAddress" }'].join(""),
  ['"address": {"@type": "PostalAddress"}, "@type": "LocalBusiness", "name": "Apex Grid Engineering"'].join(""),
  ['address: { "@type": "PostalAddress" }, "@type": "LocalBusiness", name: "Apex Grid Engineering"'].join(""),
  ["Apex Grid Engineering is headquartered ", "at 22475 E Quintero Rd."].join(""),
  ["Our headquarters ", "is 22475 E Quintero Rd."].join(""),
  ["Apex Grid's headquarters ", "are in Queen Creek."].join(""),
  ["Apex Grid’s headquarters ", "are in Queen Creek."].join(""),
  ["The company is headquartered ", "in Queen Creek."].join(""),
  ["Headquarters: ", "Queen Creek, Arizona."].join(""),
  ["Apex Grid's statutory-agent ", "address is 22475 E Quintero Rd."].join(""),
  ["Our official-mailing ", "address is 22475 E Quintero Rd."].join(""),
  ["Apex Grid's regulator-verified ", "firm address is 22475 E Quintero Rd."].join(""),
  ["ACC-verified business address: ", "Queen Creek, Arizona."].join(""),
];
const allowedStatements = [
  LICENSING_COVERAGE_STATEMENT,
  "A PE must hold a current license in the applicable jurisdiction.",
  "NCARB explains how architect credentials and registration requirements vary by jurisdiction.",
  "A permit-ready package cannot guarantee approval because the AHJ makes the final decision.",
  "In-house coordination can reduce handoffs, but it does not establish licensure or firm authorization.",
  "Stamping and sealing rules differ by discipline and state.",
  "Apex Grid Engineering uses a business-provided operating and contact address in Queen Creek, Arizona.",
  "Business-provided; not presented as a statutory-agent, ACC mailing, or regulator-verified firm address.",
  "This contact address is not presented as a regulator-verified headquarters, statutory-agent address, or official mailing address.",
];
for (const statement of allowedStatements) {
  if (prohibited.some((pattern) => pattern.test(withoutAuthorizedLicensingText(statement)))) {
    throw new Error(`Claims audit allowed statement was falsely rejected: ${statement}`);
  }
}
for (const claim of regressionClaims) {
  if (!prohibited.some((pattern) => pattern.test(claim))) {
    throw new Error(`Claims audit regression fixture was not rejected: ${claim}`);
  }
}

const capturedReview: ArizonaIdentityReview = {
  ...ARIZONA_IDENTITY_REVIEW,
  corporationCommission: {
    ...ARIZONA_IDENTITY_REVIEW.corporationCommission,
    matchingEntityCaptured: true,
    officialEntityName: "Verified fixture entity",
    entityId: "fixture-entity-id",
    status: "Active",
    capture: {
      sourceUrl: "https://arizonabusinesscenter.azcc.gov/businesssearch",
      capturedAt: "2026-09-11",
      capturePath: "official-evidence/fixtures/acc-capture.pdf",
    },
  },
  boardOfTechnicalRegistration: {
    ...ARIZONA_IDENTITY_REVIEW.boardOfTechnicalRegistration,
    matchingBusinessRegistrationCaptured: true,
    businessRegistration: {
      registrationNumber: "fixture-registration",
      registeredName: "Verified fixture entity",
      status: "Current",
      statusDate: "2026-09-11",
      expirationDate: "2027-09-11",
      disciplines: ["Engineering"],
    },
    responsibleProfessional: {
      name: "Verified fixture professional",
      licenseNumber: "fixture-license",
      profession: "Professional Engineer",
      discipline: "Engineering",
      status: "Active",
      expirationDate: "2027-09-11",
    },
    businessCapture: {
      sourceUrl: "https://azbtr.portalus.thentiacloud.net/",
      capturedAt: "2026-09-11",
      capturePath: "official-evidence/fixtures/btr-business-capture.pdf",
    },
    responsibleProfessionalCapture: {
      sourceUrl: "https://azbtr.portalus.thentiacloud.net/",
      capturedAt: "2026-09-11",
      capturePath: "official-evidence/fixtures/btr-professional-capture.pdf",
    },
  },
};
const currentIdentity = evaluateArizonaIdentityReview(
  capturedReview,
  new Date("2026-10-01T00:00:00.000Z"),
);
if (
  currentIdentity.corporationCommission === null ||
  currentIdentity.boardOfTechnicalRegistration === null
) {
  throw new Error("Claims audit fixture rejected current captured Arizona evidence");
}
const staleIdentity = evaluateArizonaIdentityReview(
  capturedReview,
  new Date("2026-12-10T00:00:00.000Z"),
);
if (
  staleIdentity.corporationCommission !== null ||
  staleIdentity.boardOfTechnicalRegistration !== null
) {
  throw new Error("Claims audit fixture published stale Arizona evidence");
}
const uncapturedIdentity = evaluateArizonaIdentityReview(
  ARIZONA_IDENTITY_REVIEW,
  new Date("2026-10-01T00:00:00.000Z"),
);
if (
  uncapturedIdentity.corporationCommission !== null ||
  uncapturedIdentity.boardOfTechnicalRegistration !== null
) {
  throw new Error("Claims audit fixture published uncaptured Arizona evidence");
}
const expiredBusinessIdentity = evaluateArizonaIdentityReview(
  {
    ...capturedReview,
    boardOfTechnicalRegistration: {
      ...capturedReview.boardOfTechnicalRegistration,
      businessRegistration: {
        ...capturedReview.boardOfTechnicalRegistration.businessRegistration!,
        expirationDate: "2026-10-15",
      },
    },
  },
  new Date("2026-10-15T00:00:00.000Z"),
);
if (expiredBusinessIdentity.boardOfTechnicalRegistration !== null) {
  throw new Error("Claims audit fixture published an expired BTR business registration");
}
const expiredProfessionalIdentity = evaluateArizonaIdentityReview(
  {
    ...capturedReview,
    boardOfTechnicalRegistration: {
      ...capturedReview.boardOfTechnicalRegistration,
      responsibleProfessional: {
        ...capturedReview.boardOfTechnicalRegistration.responsibleProfessional!,
        expirationDate: "2026-10-20",
      },
    },
  },
  new Date("2026-10-20T00:00:00.000Z"),
);
if (expiredProfessionalIdentity.boardOfTechnicalRegistration !== null) {
  throw new Error("Claims audit fixture published an expired responsible professional");
}

const extensions = new Set([".ts", ".tsx", ".html"]);
const failures: string[] = [];
const checkedFiles = new Set<string>();

function checkFile(full: string) {
  if (checkedFiles.has(full) || full === fileURLToPath(import.meta.url)) return;
  checkedFiles.add(full);
  const text = withoutAuthorizedLicensingText(fs
    .readFileSync(full, "utf8")
    .split("\n")
    .filter((line) => !line.includes(EVIDENCE_GATE_MARKER))
    .join("\n"));
  for (const pattern of prohibited) {
    if (pattern.test(text)) failures.push(`${path.relative(root, full)}: ${pattern}`);
  }
}

function walk(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (extensions.has(path.extname(entry.name))) checkFile(full);
  }
}

// Source coverage: base HTML, React schemas/components, and every SEO generator.
checkFile(path.join(root, "index.html"));
walk(path.join(root, "src"));
walk(path.join(root, "seo"));

// Generated coverage: representative output from each major page family, with
// identity/contact pages included explicitly because they are the likeliest
// place for an unsupported business address to reappear.
const representativeGeneratedPages = [
  "index.html",
  "about/index.html",
  "contact/index.html",
  "capabilities/index.html",
  "services/structural/index.html",
  "industries/healthcare/structural-engineering/index.html",
  "solutions/structural-engineering-wall-openings/index.html",
  "resources/index.html",
  "architecture/index.html",
  "general-contracting/index.html",
  "locations/arizona/index.html",
  "locations/arizona/queen-creek/index.html",
];
for (const relative of representativeGeneratedPages) {
  const full = path.join(root, "public", relative);
  if (!fs.existsSync(full)) {
    failures.push(`public/${relative}: representative generated page is missing`);
  } else {
    checkFile(full);
  }
}

if (failures.length) {
  console.error(`Claims audit failed (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(
  `Claims audit passed across ${checkedFiles.size} source and representative generated files: no prohibited unqualified, legal-identity, or business-address claims found.`,
);
