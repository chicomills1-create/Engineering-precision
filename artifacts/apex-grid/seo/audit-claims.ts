import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const prohibited = [
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
];
const educationalStatements = [
  "A PE must hold a current license in the applicable jurisdiction.",
  "NCARB explains how architect credentials and registration requirements vary by jurisdiction.",
  "A permit-ready package cannot guarantee approval because the AHJ makes the final decision.",
  "In-house coordination can reduce handoffs, but it does not establish licensure or firm authorization.",
  "Stamping and sealing rules differ by discipline and state.",
];
for (const statement of educationalStatements) {
  if (prohibited.some((pattern) => pattern.test(statement))) {
    throw new Error(`Claims audit educational statement was falsely rejected: ${statement}`);
  }
}
for (const claim of regressionClaims) {
  if (!prohibited.some((pattern) => pattern.test(claim))) {
    throw new Error(`Claims audit regression fixture was not rejected: ${claim}`);
  }
}

const roots = ["src", "seo", "public"];
const extensions = new Set([".ts", ".tsx", ".html"]);
const failures: string[] = [];
function walk(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (extensions.has(path.extname(entry.name))) {
      if (full === fileURLToPath(import.meta.url)) continue;
      const text = fs.readFileSync(full, "utf8");
      for (const pattern of prohibited) if (pattern.test(text)) failures.push(`${path.relative(root, full)}: ${pattern}`);
    }
  }
}
for (const dir of roots) walk(path.join(root, dir));
if (failures.length) {
  console.error(`Claims audit failed (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log("Claims audit passed: no prohibited unqualified claims or business geo coordinates found.");
