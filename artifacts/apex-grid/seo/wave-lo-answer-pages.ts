import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

// AEO buyer-question wave 1 (2026-10-21): buyer-language questions approved
// verbatim through the ChatGPT consult (GO, zero revisions). Copy is final.
export const WAVE_LO_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "who-can-stamp-my-commercial-building-plans",
    title: "Who Can Stamp My Commercial Building Plans? | Apex Grid Engineering PLLC",
    description: "A licensed PE in the building's state, discipline by discipline, under a registered firm. How commercial sealing works and how Apex scopes it.",
    h1: "Who Can Stamp My Commercial Building Plans?",
    answer: "A professional engineer licensed in the state where the building will be built, working under a registered engineering firm — with each discipline sealed by an engineer licensed for it. Commercial plans typically need sealed structural, mechanical, electrical and plumbing drawings. Apex Grid Engineering PLLC's engineers review your set discipline by discipline, resolve corrections in writing, and seal it when the responsible PE for each discipline approves.",
    topic: "Commercial Building Plan Stamping",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Why commercial plans almost always need seals",
        body: "The residential code's prescriptive recipes stop at the commercial line. Under the commercial building code, the structure, the mechanical systems, the electrical distribution and the plumbing design are engineering — sized, calculated and certified by licensed professionals. Jurisdictions require the seals at submittal because the consequences the code guards against scale with occupancy: assembly spaces, offices, retail, warehouses and medical facilities all concentrate people and systems in ways that demand accountable design. The set is usually sealed discipline by discipline, and the authorities check that the seals match the work — a structural seal does not cover the electrical design, and no single stamp covers a building.",
      },
      {
        heading: "One firm, every discipline, one accountable review",
        body: "The practical problem with commercial sealing is coordination: four disciplines designed in four places, reconciled — or not — at the permit counter. Apex runs the review as one engagement. The set is scoped whole: structure, MEP and civil checked against the architectural set and against each other, interfaces reconciled before submittal instead of by the plans examiner. Apex Grid Engineering PLLC provides engineering in 49 states, and every engagement is matched to engineers licensed in the project jurisdiction. Corrections come back consolidated and in writing, so your design team answers one list, not four.",
      },
      {
        heading: "What we need to scope it",
        body: "The current drawing set across disciplines, the calculations behind it, and the project address — plus any comments the jurisdiction has already issued, if the set has been through a first review. Scoping confirms completeness and returns a written quote naming the scope and the engagement timeline. If parts of the building still need engineering rather than review — a discipline undesigned, a system unsized — that is design work Apex performs as the engineer of record; say so at intake and it is scoped as design, separately from the review of finished work.",
      },
    ],
    faqs: [
      {
        question: "Can one engineer stamp the whole commercial set?",
        answer: "Only the disciplines they're licensed for, in the state where the building stands. A complete commercial set is normally sealed by several engineers — structural, mechanical, electrical, plumbing, civil — each answering for their discipline. Apex assigns the responsible PE per discipline inside one coordinated engagement.",
      },
      {
        question: "Our architect already sealed the architectural drawings. Is that enough?",
        answer: "The architect's seal covers the architectural work. The engineering disciplines still require PE seals — the two licensure systems are parallel, and jurisdictions check for both where both kinds of work appear.",
      },
      {
        question: "Do you stamp plans drawn by our in-house team?",
        answer: "Yes — third-party review and sealing of finished work is core Apex practice, provided the review supports it: the sealing engineers verify the design and calculations, require corrections where needed, and seal under responsible charge.",
      },
    ],
    extraLinks: [
      { label: "Architect stamp vs PE stamp: who seals what", href: "/answers/architect-stamp-vs-pe-stamp/" },
      { label: "Can an engineer seal another engineer's drawings?", href: "/answers/can-an-engineer-seal-another-engineers-drawings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-my-mep-plans",
    title: "Who Can Stamp My MEP Plans? | Apex Grid Engineering PLLC",
    description: "Mechanical, electrical and plumbing plans are sealed by PEs licensed in those disciplines in the project's state. How Apex reviews and seals MEP sets.",
    h1: "Who Can Stamp My MEP Plans?",
    answer: "Professional engineers licensed in the mechanical, electrical and plumbing disciplines, in the state where the project will be built. Apex's MEP engineers review your mechanical, electrical and plumbing sets — loads, sizing, equipment selection, code compliance — coordinate them against the structural and architectural drawings, and seal each discipline when its responsible PE approves the work.",
    topic: "MEP Plan Stamping",
    serviceHref: "/services/mep/",
    sections: [
      {
        heading: "Three disciplines, three seals",
        body: "The M in MEP is a mechanical engineer answering for HVAC loads, ventilation, duct and piping design and energy-code compliance. The E is an electrical engineer answering for service sizing, distribution, fault protection and life-safety systems' power. The P is a plumbing engineer answering for water, waste, vent and gas systems sized to the fixture load. Some engineers hold licenses spanning more than one of these; no one's license spans a state line. The sealing engineer for each discipline must be licensed in the project's state, and the review behind each seal must be genuine — responsible charge applies to a duct system exactly as it does to a beam.",
      },
      {
        heading: "Coordination is where MEP reviews earn their fee",
        body: "MEP sets rarely fail inside a discipline; they fail between them. The air handler the mechanical set specifies doesn't fit the structural steel's clearances. The electrical room shrinks after the service was sized. The plumbing riser lands where the architecture puts a corridor. A discipline-by-discipline stamp shop can seal all three sets and miss every one of those collisions, because nobody reviewed the interfaces. Apex reviews MEP as a system: the three disciplines checked against each other and against the structural and architectural sets, with clashes and gaps returned as one consolidated correction list — before the plans examiner finds them on the jurisdiction's clock instead of yours.",
      },
      {
        heading: "What to send",
        body: "The MEP drawing sets at their current revision, the load and sizing calculations behind them, equipment schedules or selections where the design depends on them, and the architectural and structural sets they're coordinated against — plus the project address, and any jurisdiction comments already in hand. Scoping returns a written quote for the review with its timeline stated. Where an MEP discipline hasn't been designed yet, that's not a review engagement — it's design. Apex performs full MEP design as engineer of record; name it at intake and it will be scoped as such, honestly separated from review work.",
      },
    ],
    faqs: [
      {
        question: "Can a structural engineer stamp MEP plans?",
        answer: "No — the seal must match the discipline. Structural licensure covers structural work; mechanical, electrical and plumbing sets are sealed by engineers licensed in those disciplines in the project's state.",
      },
      {
        question: "Our mechanical contractor produced the drawings. Can they be sealed?",
        answer: "Yes, through third-party review: Apex's engineers examine the design and calculations, require corrections where the work falls short, and seal under responsible charge when it approves. Contractor-produced design is a routine intake here.",
      },
      {
        question: "What if only one MEP discipline needs sealing?",
        answer: "Then the review is scoped to that discipline — with its interfaces checked against the rest of the set, because a sealed mechanical set that collides with the structure helps no one.",
      },
    ],
    extraLinks: [
      { label: "Can an engineer seal another engineer's drawings?", href: "/answers/can-an-engineer-seal-another-engineers-drawings/" },
      { label: "How the plan check corrections process works", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-if-my-plans-need-corrections-before-an-engineer-can-stamp-them",
    title: "What If My Plans Need Corrections Before an Engineer Can Stamp Them? | Apex Grid Engineering PLLC",
    description: "Then the corrections happen first — in writing, with the code basis, fixed and re-reviewed before the seal. How the correction cycle works.",
    h1: "What If My Plans Need Corrections Before an Engineer Can Stamp Them?",
    answer: "Then the corrections get made before the stamp — that sequence is the service. The reviewing engineer lists every issue in writing with its code basis, the set is revised, the changed sheets are re-reviewed, and the seal goes on the corrected set. A stamp applied over known problems is not a shortcut; it is a liability carrying your project's name, and no legitimate engineer will sell you one.",
    topic: "Plan Corrections Before Sealing",
    serviceHref: "/services/plan-check-corrections-engineer/",
    sections: [
      {
        heading: "Corrections before stamping are a different animal from city comments",
        body: "Most correction stories in construction are about plan-check comments: the city reviews a submitted set and sends it back. Pre-stamp corrections happen one step earlier, inside the engineering review itself — the sealing engineer finds that a calculation doesn't support a detail, a load path is incomplete, a code provision is missed — and the set cannot lawfully be sealed until it's fixed. Discovering that at this stage is the cheap version of the discovery. The same issue found by the plans examiner costs a full resubmittal cycle; found in the field, it costs whatever it wants.",
      },
      {
        heading: "How the cycle runs",
        body: "The reviewer returns a written correction list: each item located on the set, the code or engineering basis named, the required fix stated plainly enough for the designer to act on. Revisions come back — from your designer, your in-house team, or, where you engage Apex for it, from Apex's own engineers and drafters working under the responsible PE. The changed sheets are re-reviewed; items close one by one, on the record. When the list is empty, the set is sealed. Nothing about the cycle is improvised, and the documentation it produces — review, corrections, re-review — is exactly the file that proves the seal was earned if anyone ever asks.",
      },
      {
        heading: "What if the corrections are extensive?",
        body: "Sometimes the honest review verdict is that the set needs engineering, not editing: calculations absent, a system fundamentally undersized, a design basis that doesn't fit the jurisdiction. The reviewer will say so plainly and early — at scoping where the gaps are visible on arrival, or in the first correction list where they're not. At that point the options are real ones: your design team completes the work and resubmits for review, or Apex scopes the completion as design work under its own engineers. What never happens is the seal going on anyway. That refusal is not the process failing; it is the process — the same refusal that makes the seal on every other set worth having.",
      },
    ],
    faqs: [
      {
        question: "Who makes the corrections — me or you?",
        answer: "Either. Your designer can revise against the written correction list, or Apex can scope the correction work itself, performed by its engineers and drafters under the responsible PE and then re-reviewed. Many clients split it: their team fixes design intent items; Apex closes calculation and code items.",
      },
      {
        question: "Do corrections mean my designer did bad work?",
        answer: "No. First-pass correction lists are the norm on real projects — codes layer federal, state and local amendments, and interfaces between disciplines generate issues even on strong sets. The review exists to catch them at the cheapest moment.",
      },
      {
        question: "Can the engineer just stamp it and let the city catch the rest?",
        answer: "No. Sealing work the engineer knows is deficient violates board rules in every state and exposes everyone in the chain — the engineer, the designer and the owner — when it surfaces. The seal certifies the review and the work, not the hope that someone downstream will check again.",
      },
    ],
    extraLinks: [
      { label: "How the plan check corrections process works", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Can an engineer seal another engineer's drawings?", href: "/answers/can-an-engineer-seal-another-engineers-drawings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
