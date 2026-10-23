/**
 * Vendor-pitch screening for public lead intake (anti-spam shield, 2026-10-22).
 *
 * Heuristic scoring of the submitter's message. A submission is classified
 * "vendor" only when it carries at least one STRONG selling pattern and a
 * total score >= 4 (STRONG = 2, WEAK = 1, distinct patterns counted once),
 * and no HARD CLIENT VETO pattern matches. The veto list is the safety
 * property: a real client who states a need ("I need…", "we need…",
 * "my project…", "how much…") is NEVER classified vendor, whatever else
 * the message says. Borderline always resolves to "lead".
 *
 * Vendor submissions are still stored (status "vendor"); they simply do
 * not fire the client-style notification. Detection reclassifies — it
 * never deletes and never blocks storage. Patterns are shared verbatim
 * with the Torch/Engides (JS) and intake-service (Python) ports and are
 * regression-tested against a fixed corpus (13 cases) in the build record.
 */

const STRONG: RegExp[] = [
  /\bwe (provide|offer|specialize|supply)\b/,
  /\b(i|we) (offer|provide)\b[^.]{0,50}\bservices\b/,
  /\bour services\b/,
  /\b(wanted|want|would like|like) to introduce\b/,
  /\bintroducing (our|my) (company|firm|services|team)\b/,
  /\bwelcome the opportunity\b/,
  /\bopportunity to provide\b/,
  /\bwe (support|serve) (architecture|design|engineering|construction) firms\b/,
  /\bfirms like yours\b/,
  /\bcompanies like yours\b/,
  /\bhelp your (firm|company|business) (grow|scale|generate|get)\b/,
  /\bgrow your (business|firm|practice|revenue|client base)\b/,
  /\bincrease your (sales|revenue|leads|visibility)\b/,
  /\bboost your\b/,
  /\bseo\b/,
  /\bsearch engine optimization\b/,
  /\bdigital marketing\b/,
  /\blead generation\b/,
  /\bsocial media marketing\b/,
  /\b(web|website) design services\b/,
  /\bwebsite redesign\b/,
  /\brank (higher|first|#1|number one)\b/,
  /\bfirst page of google\b/,
  /\bonline presence\b/,
  /\bemail marketing\b/,
  /\blink building\b/,
  /\bgoogle ads management\b/,
  /\bcontent marketing\b/,
  /\bvirtual assistant\b/,
  /\boffshore (team|staffing|drafting|support)\b/,
  /\bwhite[ -]label\b/,
  /\boutsourc(e|ing) (your|our|services)\b/,
  /\bappointment setting\b/,
  /\bcold (email|calling) (service|services|agency)\b/,
  /\bdrafting services (to|for) (us |u\.s\. )?(firms|companies|architects|engineers)\b/,
  /\bif your (firm|company|team|business) (needs|is looking|wants|requires)\b/,
  /\bi provide (pe |structural |engineering )?(stamping|design|drafting|review) services\b/,
];

const WEAK: RegExp[] = [
  /\bour company\b/,
  /\bmy company\b/,
  /\bour team\b/,
  /\bwe help\b/,
  /\bwe work with\b/,
  /\bwe can help\b/,
  /\bservices include\b/,
  /\bspecializing in\b/,
  /\bbased in\b[^.]{0,50}\bproviding\b/,
  /\bpartner(ship)? opportunit(y|ies)\b/,
  /\bpartner with (you|your)\b/,
  /\bprovide a quote\b/,
  /\bhappy to (provide|send) (a |you a )?quote\b/,
  /\bschedule a (call|demo)\b[^.]{0,40}\b(our|we|services)\b/,
  /\blow[ -]cost (team|staff|drafting|services)\b/,
  /\bfor firms like\b/,
  /\bas a subcontractor\b/,
  /\bi provide\b/,
];

const CLIENT_VETO: RegExp[] = [
  /\bi need\b/,
  /\bwe need\b/,
  /\bi require\b/,
  /\bwe require\b/,
  /\bi'?m looking for\b/,
  /\bwe'?re looking for\b/,
  /\bi am looking for\b/,
  /\blooking for (a|an|the) (pe|engineer|engineering firm|stamp)\b/,
  /\bneed (a |an |the )?(pe|stamp|engineer|calculations|calcs|structural|mechanical|electrical|plumbing|civil)\b/,
  /\bmy project\b/,
  /\bour project\b/,
  /\bmy (building|plans|permit|home|house|property|shop|warehouse|restaurant)\b/,
  /\bhow much (would|does|do|to|is)\b/,
  /\bwhat (would|do) you charge\b/,
  /\bquote for (my|our|a|the)\b/,
  /\bget (a |an )?quote\b[^.]{0,30}\b(my|our|a|the) (project|plans|building|job)\b/,
  /\bcan you (stamp|design|calculate|review|seal|provide a quote)\b/,
];

export interface VendorScore {
  verdict: "vendor" | "lead";
  score: number;
  strong: number;
  weak: number;
  veto: number;
}

export function scoreVendorMessage(message: string): VendorScore {
  const text = String(message || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  const veto = CLIENT_VETO.filter((p) => p.test(text)).length;
  const strong = STRONG.filter((p) => p.test(text)).length;
  const weak = WEAK.filter((p) => p.test(text)).length;
  const score = 2 * strong + weak;
  const verdict: VendorScore["verdict"] =
    !veto && text.length >= 40 && strong > 0 && score >= 4 ? "vendor" : "lead";
  return { verdict, score, strong, weak, veto };
}

/** Normalize a free-text field for duplicate comparison. */
export function normalizeForDedupe(value: string): string {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
