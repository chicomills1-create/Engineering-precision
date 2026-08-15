/** Static blog posts for SEO topical authority. Rendered by generate.ts into public/blog/. */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tag: string;
  minutes: number;
  /** HTML body — trusted authored content (no user input). */
  html: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "state-code-adoption-cycles",
    title: "Why State Code Adoption Cycles Should Drive Your Project Schedule",
    description:
      "Every state adopts building and energy codes on its own cycle. Here's how adoption timing changes design requirements — and how to avoid getting caught mid-cycle.",
    date: "2026-08-10",
    tag: "Permitting",
    minutes: 6,
    html: `
<p>Ask an engineer which building code applies to your project and the honest answer is: it depends on where you are and when you submit. The International Code Council publishes a new I-Code family every three years, but states — and often individual cities — adopt those editions on their own schedules, with their own amendments. One state may enforce the 2021 IBC statewide while its neighbor still runs 2015 editions with local amendments layered on top.</p>
<h2>Why the cycle matters to your budget</h2>
<p>Code editions are not interchangeable. Energy code stringency in particular has moved sharply between the 2015, 2018, and 2021 IECC — envelope requirements, lighting power densities, and mechanical efficiency floors all tightened. A building designed comfortably to a 2015 baseline can require real redesign to clear a 2021 review. If your jurisdiction is scheduled to adopt a new edition mid-project, the vesting rules — which edition your permit is reviewed under — can swing construction cost by percentage points.</p>
<h2>Three questions to ask before schematic design</h2>
<p>First: which edition is enforced today, and is an adoption pending? Most states publish adoption timelines through their building-standards agencies. Second: what triggers vesting in this jurisdiction — application date, complete submittal, or permit issuance? Third: are there local amendments that override the state baseline? Cities routinely amend snow loads, wind provisions, fire access, and energy requirements.</p>
<h2>How we handle it</h2>
<p>We verify the governing editions with the permit office at kickoff on every project, and we track adoption calendars in the states where our clients build. When an adoption is pending, we advise clients whether to accelerate submittal to vest under the current edition or design forward to the incoming one. That single decision, made early, is one of the cheapest risk reductions available in the entire project.</p>`,
  },
  {
    slug: "title-24-vs-iecc",
    title: "Title 24 vs. IECC: What Multi-State Developers Need to Know",
    description:
      "California's Title 24 energy code works differently from the IECC most states use. A practical comparison for developers building in multiple states.",
    date: "2026-07-28",
    tag: "Energy Codes",
    minutes: 7,
    html: `
<p>Developers who build nationally usually meet energy code through the IECC or ASHRAE 90.1 — until they land a California project and meet Title 24, Part 6. It is not a variant of the IECC; it is a separate regulatory system with its own compliance software, its own climate zone map, and its own documentation chain.</p>
<h2>The structural differences</h2>
<p>The IECC offers prescriptive and performance paths and is enforced by local jurisdictions with relatively light state oversight in most places. Title 24 is a state-written code updated on a three-year cycle by the California Energy Commission, with compliance demonstrated through approved software (CBECC), registered documentation, and — for many measures — third-party HERS verification in the field. The paperwork is a project of its own: certificates of compliance at design, installation certificates during construction, and verification certificates at closeout.</p>
<h2>Where teams get burned</h2>
<p>The most common failure mode we see is treating Title 24 as a checkbox late in design. Solar-ready requirements, battery storage provisions in recent cycles, demand-responsive controls, and stringent lighting power allowances all have architectural and electrical implications that are expensive to retrofit into a finished design. The second failure mode is assuming an IECC compliance report will translate — it will not, and plan checkers will not attempt the translation for you.</p>
<h2>A workable multi-state approach</h2>
<p>Design the building fabric to your most stringent market and let the compliance documentation flex per state. For most national programs that means letting California drive envelope and lighting standards, then documenting IECC or 90.1 compliance in other states from the same design. It costs a little performance margin in lenient states and saves a redesign in the strict one.</p>`,
  },
  {
    slug: "mep-coordination-reduces-rfis",
    title: "The Real Cost of Uncoordinated MEP Drawings — and How to Avoid It",
    description:
      "Clash-driven RFIs and change orders are the most preventable cost on a commercial project. Here's what coordinated MEP design actually looks like.",
    date: "2026-07-15",
    tag: "MEP Design",
    minutes: 5,
    html: `
<p>When a duct meets a beam in the field, somebody pays. Industry studies consistently put coordination-related RFIs and rework among the largest controllable costs in commercial construction — and unlike weather or material prices, they are almost entirely preventable at the design stage.</p>
<h2>Why clashes happen</h2>
<p>Most clashes are organizational, not technical. When structural, mechanical, electrical, and plumbing design happen in separate firms on separate schedules, each discipline optimizes its own scope and the conflicts surface during construction, when they are most expensive. Ceiling plenums are the classic battleground: the structural engineer needs beam depth, the mechanical engineer needs duct area, the electrical engineer needs conduit racks, the plumber needs slope — and the architect promised the tenant a ceiling height.</p>
<h2>What coordinated design looks like</h2>
<p>Real coordination means the disciplines share one model and one set of decisions: routing corridors agreed at schematic design, beam penetrations engineered rather than field-cut, equipment clearances protected before the layout hardens. It shows up in the drawings as sections through the congested zones — not just plans — and in a construction phase with mercifully boring RFI logs.</p>
<h2>The single-firm advantage</h2>
<p>This is the practical argument for housing architecture, structural, MEP, and civil under one roof: coordination stops being a contract negotiation between firms and becomes a hallway conversation. Fewer handoffs, one point of accountability, and drawings that agree with each other before they ever reach a plan checker or a job trailer.</p>`,
  },
  {
    slug: "structural-checklist-adu-additions",
    title: "A Structural Checklist Before You Commit to an ADU or Addition",
    description:
      "Five structural questions to answer before budgeting an ADU, garage conversion, or home addition — from foundations to lateral load paths.",
    date: "2026-06-30",
    tag: "Structural",
    minutes: 5,
    html: `
<p>ADUs and additions look simple from the curb, and that is exactly why they surprise people. The structural questions are the same ones a commercial building answers — loads, load paths, foundations — compressed into a small budget where a single surprise matters.</p>
<h2>1. What is the existing foundation actually doing?</h2>
<p>Garage conversions and second-story additions both lean on existing foundations that were never designed for the new load. A footing probe or as-built review early costs little; discovering an undersized footing after framing prices are locked costs a lot.</p>
<h2>2. Where does the lateral load go?</h2>
<p>Adding openings, removing walls, or stacking a story changes how wind and seismic forces travel to the ground. In seismic country, a soft or weak story is the failure mode that building departments look for hardest — expect shear wall or hardware requirements that affect your floor plan.</p>
<h2>3. What does your soil do when it gets wet?</h2>
<p>Expansive clays, uncompacted fill, and shallow groundwater each drive different foundation solutions. If neighbors have cracked slabs, budget for a geotechnical opinion before you budget for finishes.</p>
<h2>4. Which code and which local amendments apply?</h2>
<p>ADU rules have liberalized in many states, but the structural provisions still ride on the locally adopted residential or building code, including local snow, wind, and seismic amendments.</p>
<h2>5. Is your drawing set permit-ready?</h2>
<p>Jurisdictions increasingly require engineered drawings with calculations for ADUs. A clean, complete first submittal — plans, details, and a calculation package that anticipates the reviewer's questions — is the difference between a few weeks and a few months of plan check.</p>`,
  },
  {
    slug: "working-with-veteran-owned-firms",
    title: "What a Veteran-Owned Engineering Firm Brings to a Government Pursuit",
    description:
      "How veteran-owned participation fits into federal and state procurement — set-aside programs, evaluation credit, and what to verify before you bid.",
    date: "2026-06-12",
    tag: "Government",
    minutes: 6,
    html: `
<p>Government procurement is one of the few markets where the ownership of your design partner can affect your score. Federal and many state programs recognize veteran-owned and service-disabled-veteran-owned small businesses in their contracting goals, and some solicitations reflect that through set-asides and evaluation preferences.</p>
<h2>How the programs actually work</h2>
<p>At the federal level, the SBA administers the Veteran Small Business Certification (VetCert) program. Formal SDVOSB and VOSB set-asides require current SBA certification — ownership and leadership alone are not sufficient to claim those designations. Beyond set-asides, many solicitations award evaluation credit for veteran-owned participation on the project team, and prime contractors carry small-business subcontracting plans with veteran-owned goals they need qualified partners to meet.</p>
<h2>What to verify before you bid</h2>
<p>If a pursuit strategy depends on a partner's status, verify it: current certification in the SBA's VetCert registry for formal set-asides, and clear documentation of ownership and control for teaming arrangements. Misrepresenting status is a serious compliance problem for everyone on the team, so precision in how status is claimed matters as much as the status itself.</p>
<h2>Beyond the checkbox</h2>
<p>The durable value is cultural. Firms led by veterans tend to understand the client on military and federal work — the language of UFC criteria and ATFP provisions, the discipline of submittal schedules, and the reality that government reviewers check everything. In our experience, that familiarity is worth more than any single evaluation point.</p>`,
  },
  {
    slug: "multi-state-rollout-engineering",
    title: "Engineering a Multi-State Rollout Without Fifty Different Headaches",
    description:
      "Prototype programs live or die on code localization. How national retail, restaurant, and industrial programs keep one design working in many jurisdictions.",
    date: "2026-05-27",
    tag: "Multi-State",
    minutes: 6,
    html: `
<p>National rollout programs — retail, restaurant, self-storage, EV charging, industrial — are built on a seductive idea: design it once, build it everywhere. The idea survives contact with reality only if someone owns code localization from the start.</p>
<h2>What actually changes state to state</h2>
<p>The prototype's architecture barely changes. What changes is everything wrapped around it: the adopted building and energy code editions, snow and wind and seismic design values, frost depths, soil conditions, fire access rules, accessibility interpretations, and each utility's service standards. A roof that works in Georgia needs a different structure in Minnesota; a kitchen exhaust package that sails through one review draws redlines in the next county over.</p>
<h2>The localization playbook</h2>
<p>Successful programs split the drawing set into a protected core — the brand-critical layout and systems concept — and a localization layer that is expected to change: foundations, lateral systems, envelope insulation, equipment efficiencies, and site design. Each new jurisdiction gets a code study before drawings move: adopted editions, local amendments, AHJ submittal quirks, and utility requirements, documented once and reused across every site in that territory.</p>
<h2>Licensure is the quiet constraint</h2>
<p>Every sheet needs a stamp from an engineer licensed in that state. Programs that rely on ad-hoc local engineers per site trade away consistency and schedule; programs that work with a multi-state licensed firm keep one engineering voice across the whole map. With PE licensure across 49 states, that is precisely the model we run — one team, one standard of documentation, localized correctly for wherever the next site lands.</p>`,
  },
];
