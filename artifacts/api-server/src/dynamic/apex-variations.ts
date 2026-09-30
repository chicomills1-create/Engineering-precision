/* Apex keyword-variation routes: /{svc}/{state}/{city}/{variation}/
 *
 * 82 intent families x 3 core services x all cities. Dynamic — no per-page files.
 * Includes FAQ schema on every page for AEO (AI engine citations).
 * TypeScript port for api-server integration.
 *
 * SEO SAFETY: URLs must stay identical to existing static pages.
 * Server-side rendering only — no client-side JS for SEO pages.
 */

import { SITE, esc, htmlShell } from "./apex-shell.js";

export interface PlaceType {
  name: string;
  blurb: string;
  profile: string;
}

export interface CityPlace {
  s: string;  // state slug
  c: string;  // city slug
  n: string;  // city display name
}

export interface StateMeta {
  abbr: string;
  name: string;
}

export interface ServiceCopy {
  deliverables: string;
  feeNote: string;
  codeRef: string;
  blurb: string;
  profile: string;
}

export interface VariationDef {
  title: (t: string, c: string, a: string) => string;
  desc: (t: string, c: string, s: string) => string;
  h1: (t: string, c: string, a: string) => string;
  lede: (t: string, c: string, s: string, cp: PlaceType) => string;
  sections: (t: string, c: string, s: string, cp: PlaceType, sc: ServiceCopy, sp: Record<string, unknown>) => [string, string][];
  faqs: (t: string, c: string, s: string, cp: PlaceType, sc: ServiceCopy) => [string, string][];
}

export const VARIATION_SERVICES: string[] = [
  "mep-engineering", "structural-engineering", "civil-engineering",
];

// Per-service substance for variation pages.
// Adapted for Apex Grid Engineering: MEP, Structural, Civil.
export const VARIATION_SERVICE_COPY: Record<string, ServiceCopy> = {
  "mep-engineering": {
    deliverables: "mechanical plans with Manual J/S/D load calculations, electrical plans with panel schedules and one-line diagrams, plumbing plans with risers and isometrics, energy-code compliance documentation, and equipment schedules",
    feeNote: "system complexity, energy-modeling requirements, and review rounds",
    codeRef: "IMC, NEC, IPC/UPC, and ASHRAE 90.1",
    blurb: "MEP engineering",
    profile: "mep",
  },
  "structural-engineering": {
    deliverables: "structural plans with framing layouts, foundation design, lateral-force resisting system details, structural calculations with load paths, and connection schedules",
    feeNote: "structural system type, seismic/wind design category, foundation complexity, and retrofit constraints",
    codeRef: "IBC, ASCE 7, ACI 318, AISC 360, and NDS",
    blurb: "structural engineering",
    profile: "structural",
  },
  "civil-engineering": {
    deliverables: "site grading and drainage plans, utility design, stormwater management with calculations, erosion control plans, and paving details",
    feeNote: "site complexity, stormwater requirements, utility coordination, and jurisdictional review scope",
    codeRef: "local development standards, state DOT requirements, and EPA stormwater regulations",
    blurb: "civil engineering",
    profile: "civil",
  },
};

// PLACE_TYPES defines the display names and blurbs per service.
// These must match the existing static page H1/title patterns EXACTLY.
export const PLACE_TYPES: Record<string, PlaceType> = {
  "mep-engineering": {
    name: "MEP Engineering",
    blurb: "MEP engineering",
    profile: "mep",
  },
  "structural-engineering": {
    name: "Structural Engineering",
    blurb: "structural engineering",
    profile: "structural",
  },
  "civil-engineering": {
    name: "Civil Engineering",
    blurb: "civil engineering",
    profile: "civil",
  },
};

export const VARIATIONS: Record<string, VariationDef> = {
  "best": {
    title: (t, c, a) => `Best ${t} in ${c}, ${a}: How to Choose`,
    desc: (t, c, s) => `Choosing ${t.toLowerCase()} in ${c}, ${s}: evaluation criteria, red flags, and the questions that separate good engineers from expensive lessons.`,
    h1: (t, c, a) => `${t} — <span class="hl">choosing right in ${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The best ${cp.blurb} for your ${c} project isn't the cheapest quote — it's the engineer who seals the drawings, shows the calculations, and answers plan check. Here's how ${s} owners evaluate ${t.toLowerCase()} firms.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What to look for", `Responsible charge first: one licensed engineer who did the work and seals the sheets. Then calculations — ${sc.codeRef} references your ${c} reviewer can verify. Then local fluency: ${sp.planCheck ? "the local plan-check patterns" : "jurisdiction requirements"} in ${s}. And correction support: plan-check comments are normal; the proposal should say who responds.`],
      ["Red flags", `No named sealing engineer. No calculations behind selections. Promises of permit approval — no engineer controls the AHJ. Two-week quotes for full commercial sets in ${c}: skipped engineering or billed revisions.`],
      ["The interview", `Send every candidate the same package — address, scope, existing drawings — and compare scope letters line by line. The firm that answers with names, sheets, and code references is usually the firm that delivers.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`How do I choose the best ${t.toLowerCase()} firm in ${c}?`, `Look for a named licensed engineer in responsible charge, calculations tied to ${sc.codeRef} that your ${c} reviewer can verify, and a proposal that lists every sheet with correction support included.`],
      [`What are red flags when hiring an engineer in ${s}?`, `No named sealing engineer, no calculations behind selections, promises of permit approval (no engineer controls the AHJ), and two-week quotes for full commercial sets.`],
      [`Should I get multiple quotes for ${t.toLowerCase()} in ${c}?`, `Yes — send every candidate the same package and compare scope letters line by line. The cheapest quote often excludes corrections or calculations you'll pay for separately.`],
    ],
  },
  "cost": {
    title: (t, c, a) => `${t} Cost in ${c}, ${a}`,
    desc: (t, c, s) => `What ${t.toLowerCase()} costs in ${c}, ${s}: fee drivers, proposal anatomy, and how to read quotes without overpaying.`,
    h1: (t, c, a) => `${t} cost in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Nobody can quote your ${c} project responsibly without seeing it. What ${t.toLowerCase()} costs here follows real drivers — here's what they are and what a proposal should include.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Fee drivers", `In ${c}, ${t.toLowerCase()} fees follow ${sc.feeNote}. A small straightforward scope costs far less than new construction with complex systems — and ${c} review requirements add their own layer.`],
      ["Proposal anatomy", `A proposal worth signing lists every deliverable: ${sc.deliverables}. It names the engineer in responsible charge, states how plan-check corrections are handled, and lists assumptions and exclusions.`],
      ["Controlling cost", `The cheapest path is a complete first submittal. Gaps in your inputs — missing surveys, backgrounds, existing-condition records — become assumptions, and assumptions get billed later.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`How much does ${t.toLowerCase()} cost in ${c}?`, `Fees in ${c} follow ${sc.feeNote}. A small straightforward scope costs far less than new construction. No responsible engineer quotes without seeing the project.`],
      [`What should a ${t.toLowerCase()} proposal include?`, `Every deliverable (${sc.deliverables}), the named engineer in responsible charge, how plan-check corrections are handled, and assumptions/exclusions.`],
      [`How can I control engineering costs in ${s}?`, `The cheapest path is a complete first submittal. Provide surveys and existing records upfront — gaps become assumptions, and assumptions get billed later.`],
    ],
  },
  "commercial": {
    title: (t, c, a) => `Commercial ${t} in ${c}, ${a}`,
    desc: (t, c, s) => `Commercial ${t.toLowerCase()} in ${c}, ${s}: code triggers, deliverables, and the submittal bar for commercial work.`,
    h1: (t, c, a) => `Commercial ${t} in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Commercial ${cp.blurb} in ${c} — engineered drawings, calculations, and plan-check support for commercial projects across ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Code triggers", `Under ${sc.codeRef}, commercial projects in ${c} trigger engineered design far earlier than residential: occupancy changes, additions affecting egress or structure, capacities beyond prescriptive tables.`],
      ["Deliverables", `Commercial sets include ${sc.deliverables} — each tied to code references the ${c} reviewer can verify.`],
      ["Clearing review", `Commercial reviewers clear sets that show their work: complete schedules, calculations behind selections, coordinated plans. A sealed, complete first submittal is the difference between a short review and a long one.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`When does commercial work in ${c} need an engineer?`, `Under ${sc.codeRef}, commercial triggers engineered design far earlier than residential: occupancy changes, additions affecting egress, capacities beyond prescriptive tables.`],
      [`What do commercial ${t.toLowerCase()} drawings include?`, `Commercial sets include ${sc.deliverables} — each tied to code references the ${c} reviewer can verify.`],
      [`How long does commercial plan check take in ${c}?`, `Depends on the queue and submittal completeness. A sealed, complete first submittal clears far faster than one forcing the reviewer to ask for basics.`],
    ],
  },
  "residential": {
    title: (t, c, a) => `Residential ${t} in ${c}, ${a}`,
    desc: (t, c, s) => `Residential ${t.toLowerCase()} in ${c}, ${s}: when you need an engineer, what drawings include, and the permit path.`,
    h1: (t, c, a) => `Residential ${t} in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Residential ${cp.blurb} for ${c} homeowners — additions, remodels, system replacements, and the sealed drawings the building department asks for.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["When a seal is needed", `The ${c} building department requires engineered drawings where prescriptive tables run out: additions, alterations affecting structure or egress, and system changes that alter loads.`],
      ["What's included", `A sealed residential set: ${sc.deliverables} — sized to the house, not copied from a commercial template.`],
      ["Process and timing", `Send the address, scope, and any sketches; get a scope letter; design; sealed submittal; corrections. Most ${c} residential scopes clear in one or two rounds when the first submittal is complete.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Do I need an engineer for my home project in ${c}?`, `The ${c} building department requires engineered drawings where prescriptive tables run out: additions, alterations affecting structure, system changes altering loads.`],
      [`What's included in residential ${t.toLowerCase()} drawings?`, `A sealed set includes ${sc.deliverables} — sized to your house, stamped by the licensed engineer in responsible charge.`],
      [`How long does a residential permit take in ${c}?`, `Most ${c} scopes clear in one or two rounds when the first submittal is complete. Incomplete drawings, not the queue, cause most delays.`],
    ],
  },
  "firm": {
    title: (t, c, a) => `${t} Firm in ${c}, ${a}`,
    desc: (t, c, s) => `${t} firm serving ${c}, ${s}: licensed engineers, responsible charge, and plan-check support.`,
    h1: (t, c, a) => `${t} firm serving <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Apex Grid Engineering provides ${cp.blurb} for ${c}, ${s} — one team from design through plan check, with PE stamping in 49 states.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Licensed where you build", `Apex Grid Engineering is licensed in 49 states. Your ${c} project gets a licensed engineer in responsible charge — not a referral, not a subcontractor you never meet.`],
      ["What the firm delivers", `${sc.deliverables}, sealed and coordinated. One point of contact from first call through final inspection.`],
      ["Plan-check support", `Corrections are part of engineering, not an extra. Every engagement includes responding to reviewer comments with revised sheets and calculations.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Is Apex Grid Engineering licensed in ${s}?`, `Yes — licensed in 49 states. Your ${c} project gets a licensed engineer in responsible charge, not a referral.`],
      [`What does the firm deliver?`, `${sc.deliverables}, sealed and coordinated. One contact from first call through final inspection, correction support included.`],
      [`How does plan-check support work?`, `Corrections are part of engineering, not an extra. Every engagement includes responding to reviewer comments until the permit clears.`],
    ],
  },
  "services": {
    title: (t, c, a) => `${t} Services in ${c}, ${a}`,
    desc: (t, c, s) => `${t} services in ${c}, ${s}: full scope catalog, deliverable by deliverable.`,
    h1: (t, c, a) => `${t} services in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The full ${t.toLowerCase()} scope catalog for ${c}, ${s} — every service engineered, calculated, and sealed for submittal.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Scope catalog", `${sc.deliverables}. Each service is engineered to ${sc.codeRef} and ${c} submittal requirements.`],
      ["Commercial and residential", `Scopes scale to the project — a TI package and a ground-up building are not the same scope, and proposals say exactly which sheets and calculations each includes.`],
      ["Also in ${c}", `Plan-check correction rescues, deferred submittals, and peer reviews — ${t.toLowerCase()} support beyond the base design.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What ${t.toLowerCase()} services are available in ${c}?`, `${sc.deliverables}. Each engineered to ${sc.codeRef} and ${c} requirements, with sealed drawings and calculations.`],
      [`Commercial and residential in ${s}?`, `Yes. Scopes scale to the project, and every proposal lists exactly which sheets and calculations are included.`],
      [`Can you rescue a stuck plan check?`, `Yes — correction rescues, deferred submittals, and peer reviews are part of our ${t.toLowerCase()} support in ${c}.`],
    ],
  },
  "hire": {
    title: (t, c, a) => `How to Hire ${t} in ${c}, ${a}`,
    desc: (t, c, s) => `Hiring ${t.toLowerCase()} in ${c}, ${s}: the process, what to send, red flags, and realistic timelines.`,
    h1: (t, c, a) => `How to hire ${t.toLowerCase()} in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Hiring ${t.toLowerCase()} in ${c} — the process that gets you a sealed, approved set without the expensive lessons.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Step by step", `Send the address, plain-language scope, and existing drawings. Ask for a scope letter listing every sheet and calculation. Confirm the engineer in responsible charge. Agree on correction handling before signing.`],
      ["Red flags", `Blind quotes. Vague deliverables. Promised permit approvals. Correction rounds billed as surprises. A realistic ${c} proposal separates design time from jurisdiction time.`],
      ["Timelines", `Design time follows ${sc.feeNote}; review time follows the queue and your submittal's completeness. The fastest ${c} projects pair a complete sealed set with fast correction responses.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What's the hiring process in ${c}?`, `Send address, scope, and drawings. Get a scope letter listing every sheet. Confirm the engineer in responsible charge. Agree on correction handling before signing.`],
      [`What are red flags?`, `Blind quotes, vague deliverables, promised approvals, surprise-billed corrections. A realistic ${c} proposal separates design time from jurisdiction time.`],
      [`How long does it take?`, `Design follows ${sc.feeNote}; review follows the queue. Fastest projects pair complete sealed sets with fast correction responses.`],
    ],
  },
  "permit": {
    title: (t, c, a) => `${t} Permitting in ${c}, ${a}`,
    desc: (t, c, s) => `${t} permitting in ${c}, ${s}: the submittal path, what's required, and what earns a fast review.`,
    h1: (t, c, a) => `${t} permitting in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The ${c} ${t.toLowerCase()} permit path — what to submit, what triggers review, and how to earn a fast approval in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["The submittal path", `Permits run through the ${c} building department under ${sc.codeRef}. Reviewers want completeness: sealed drawings, calculations that justify selections, schedules filled to model numbers, details a contractor can build from.`],
      ["What triggers review", `Anything beyond prescriptive tables — commercial work, additions, system changes that alter loads. ${sp.planCheck ? "Local plan-check patterns: " + String(sp.planCheck).slice(0, 220) + "…" : ""}`],
      ["Earning a fast review", `Speed comes from the first submittal. Complete sealed sets, correction responses that answer every comment with revised sheets — that's the formula, and it's included in our engagements.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What needs a permit in ${c}?`, `Anything beyond prescriptive tables — commercial work, additions, system changes altering loads — under ${sc.codeRef}.`],
      [`What does the reviewer want?`, `Completeness: sealed drawings, calculations justifying selections, filled schedules, buildable details. Incomplete submittals cause most ${c} delays.`],
      [`How to get fast review in ${s}?`, `Complete first submittal plus correction responses answering every comment with revised sheets. Included in every Apex engagement.`],
    ],
  },
  "near-me": {
    title: (t, c, a) => `${t} Near Me in ${c}, ${a}`,
    desc: (t, c, s) => `${t} near ${c}, ${s}: local coverage, fast plan-check support, and engineers who know the jurisdiction.`,
    h1: (t, c, a) => `${t} near <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `${t} for ${c} and every city in ${s} — local coverage, jurisdiction fluency, and correction support from the engineer of record.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Local coverage", `We serve ${c} and all of ${s}. Local ${t.toLowerCase()} means engineers who know the ${c} building department's submittal expectations and review patterns — not learning your jurisdiction on your project.`],
      ["Why it matters", `Local conditions shape every design decision. An engineer working ${c} regularly designs for them from the first sheet; one learning them discovers them in plan check.`],
      ["Getting started", `Send the address and scope for a real timeline. Most ${c} scopes move from first call to sealed submittal in weeks, with permit support and correction rounds included.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Do you serve ${c}?`, `Yes — ${c} and every city in ${s}. Engineers who know the ${c} building department's expectations, not learning on your project.`],
      [`Why does local knowledge matter?`, `An engineer working ${c} regularly designs for local conditions from the first sheet; others discover them as plan-check corrections.`],
      [`How do I start?`, `Send address and scope for a real timeline. Most ${c} scopes go from first call to sealed submittal in weeks.`],
    ],
  },
  "emergency": {
    title: (t, c, a) => `Emergency ${t} in ${c}, ${a}`,
    desc: (t, c, s) => `Emergency ${t.toLowerCase()} in ${c}, ${s}: what's a real emergency, what to do right now, and how urgent engineering support works.`,
    h1: (t, c, a) => `Emergency ${t.toLowerCase()} in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `When ${t.toLowerCase()} can't wait in ${c}, every hour matters. Here's how to tell a real emergency from a next-day problem — and what urgent ${cp.blurb} support looks like in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Is it an emergency?", `Structural distress signs — new cracks widening, sagging, water where it shouldn't be — are call-now situations in ${c}. So are failed MEP systems in occupied buildings: no heat, no water, electrical hazards. When in doubt, describe the symptoms; a straight answer about urgency is free.`],
      ["What to do right now", `Make it safe first: evacuate if structure is suspect, shut off water/electric/gas at the source if systems are failing dangerously. Document with photos and timestamps — the timeline tells the engineer more than the symptom alone. In ${c}, ${sp.planCheck ? "emergency work still needs permits in most cases — we handle that paperwork under emergency provisions" : "we handle emergency permit paperwork"}.`],
      ["How urgent engineering works", `Emergency calls get triaged by safety first. Expect a site visit or remote assessment quickly, then a written finding: what failed, what it takes to stabilize, and the path to a permanent fix with sealed drawings. After stabilization, every emergency should end with an engineered repair scope — not just a patch.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What counts as an emergency in ${c}?`, `Structural distress (widening cracks, sagging, water intrusion) and failed MEP in occupied buildings. When in doubt, describe symptoms — urgency assessment is free.`],
      [`What should I do right now?`, `Make it safe: evacuate if structure is suspect, shut off utilities at the source. Document with photos and timestamps.`],
      [`Do emergencies need permits?`, `Usually yes, under emergency provisions. We handle the paperwork and follow stabilization with an engineered repair scope.`],
    ],
  },
  "repair-vs-replace": {
    title: (t, c, a) => `${t}: Repair vs Replace in ${c}, ${a}`,
    desc: (t, c, s) => `${t.toLowerCase()} repair or replace in ${c}, ${s}? The honest engineering math — when each choice wins.`,
    h1: (t, c, a) => `${t}: repair or replace in <span class="hl">${c}, ${a}</span>?`,
    lede: (t, c, s, cp) => `The repair-vs-replace question for ${t.toLowerCase()} in ${c} has an engineering answer — it depends on condition, remaining life, and what ${s} codes require when you touch the system.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["The honest math", `An engineer evaluates repair-vs-replace on remaining useful life, not just today's quote. If the repair costs more than half of replacement and buys less than half the life, replacement usually wins. In ${c}, ${sc.codeRef} often triggers upgrades the moment you replace — which changes the payback calculation.`],
      ["When repair wins", `Localized damage on an otherwise sound system — a single failed connection, isolated deterioration, one bad component — is repair every time. If the rest of the system has decades of life and the repair restores full function, fixing it is the smart money in ${c}.`],
      ["When replacement wins", `Systemic failure, end of design life, or a system that can't meet current ${sc.codeRef} minimums: replacement stops being a cost and starts being the cheaper path. A new system also resets the clock on ${c} code compliance — one engineered submittal instead of serial repair permits.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`How to decide in ${c}?`, `On remaining useful life, not just today's quote. Repair costing >50% of replacement for <50% of the life usually means replace. ${sc.codeRef} upgrades change the math.`],
      [`When does repair win?`, `Localized damage on a sound system — one bad component, isolated deterioration. Restores full function at smart money in ${c}.`],
      [`When does replacement win?`, `Systemic failure, end of life, or can't meet ${sc.codeRef}. Resets code compliance — one submittal instead of serial permits.`],
    ],
  },
  "questions": {
    title: (t, c, a) => `Top ${t} Questions in ${c}, ${a} — Answered`,
    desc: (t, c, s) => `The ${t.toLowerCase()} questions ${c}, ${s} owners and managers actually ask — permits, costs, timelines, and what to ask your engineer.`,
    h1: (t, c, a) => `${t} questions, <span class="hl">answered for ${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The questions ${c} property owners ask about ${t.toLowerCase()} — with straight answers, no sales pitch. If yours isn't here, ask; the answer is free.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Do I need a permit?", `In ${c}, most ${t.toLowerCase()} work beyond minor repairs needs one. Anything touching structure, capacity, or building systems triggers ${sc.codeRef} review. Unpermitted work surfaces at sale or insurance claim — the permit costs less than the problem.`],
      ["What should I ask an engineer?", `Who's the licensed engineer of record? What's excluded from the scope? How are plan-check corrections handled and billed? Can I see a recent ${c} submittal package? The answers separate firms that engineer from firms that draft.`],
      ["How long does it take?", `Design follows ${sc.feeNote}; ${c} review follows the queue. Simple scopes move in weeks, complex commercial in months. Anyone quoting days for engineered work in ${s} is skipping steps you'll pay for later.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Do I need a permit in ${c}?`, `Most ${t.toLowerCase()} work beyond minor repairs. Anything touching structure, capacity, or systems triggers ${sc.codeRef} review.`],
      [`What to ask an engineer in ${s}?`, `Who's the engineer of record? What's excluded? How are corrections billed? Can I see a recent ${c} package?`],
      [`How long in ${c}?`, `Design follows ${sc.feeNote}. Simple scopes: weeks. Complex commercial: months. Days-long quotes skip steps.`],
    ],
  },

  "adu": {
    title: (t, c, a) => `${t} for ADUs in ${c}, ${a}`,
    desc: (t, c, s) => `Licensed ${t.toLowerCase()} for accessory dwelling units in ${c}, ${s}: plans, calculations, and permit support for garage conversions and backyard cottages.`,
    h1: (t, c, a) => `${t} for ADUs in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `An accessory dwelling unit looks small on paper, but ${c} reviewers hold ADUs to the same engineering standard as the main house. Whether it's a garage conversion, a basement unit, or a detached backyard cottage, the ${cp.blurb} has to be designed, calculated, and sealed — here's what that actually involves in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `the electrical panel usually needs a load calculation to prove it can carry the ADU — many ${c} homes need a panel upgrade or a separate subpanel. HVAC is typically a ductless mini-split sized with a Manual J, and plumbing means tying into the existing sewer lateral, which the city will want shown on the plans`
        : p === "structural"
        ? "garage conversions need the existing slab and walls verified for the new use, and detached ADUs need full foundation design with lateral-force detailing for wind and seismic. If you're converting, expect the engineer to verify the existing framing can carry any new loads before anything gets sealed"
        : `the site plan has to show utility laterals from the main house or street, grading that keeps drainage away from both structures, and setbacks the ${c} planner will check against ADU rules. On tight lots, stormwater from the new roof area has to go somewhere the reviewer accepts`;
      return [
        ["What the city actually reviews", `In ${c}, an ADU submittal gets the same structural, mechanical, electrical, and plumbing review as new construction — there is no "small project" shortcut in the code. The plans need ${sc.deliverables.split(",")[0].trim()} at minimum, and ${sp.planCheck ? `${c} plan check will run the full correction cycle` : "the building department will run its standard review"}. Most ADU delays come from incomplete first submittals, not from the review itself.`],
        [`${cp.name} scope for an ADU`, `For ${cp.blurb} on an ADU in ${c}, ${sys}. The engineering fee follows ${sc.feeNote}, and detached units cost more to engineer than conversions because everything — foundation to roof — is new design rather than verification.`],
        ["The ADU mistakes that cost money", `The expensive ADU errors are all avoidable: assuming the existing panel has capacity without a load calc, pouring a slab before the soils and setbacks are confirmed, and designing the unit before checking ${c}'s ADU size, height, and parking rules. A one-hour feasibility check with the engineer before design starts is the cheapest money in the whole project.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do I need an engineer for an ADU in ${c}?`, `In most cases yes. ${c} requires engineered plans for the structural work, and the MEP systems need designed drawings — not just a floor plan sketch. Some jurisdictions allow prescriptive paths for very simple conversions, but anything with new foundation, altered rooflines, or panel changes needs a licensed engineer.`],
      [`How much does ${cp.blurb} cost for an ADU?`, `ADU engineering fees in ${s} typically run a fraction of full-house design because the scope is smaller, but they scale with ${sc.feeNote}. Detached ADUs cost more than garage conversions. Get a fixed-fee proposal that lists every sheet and calculation — not an hourly open tab.`],
      [`Can I convert my garage without new engineering?`, `Only if the existing structure is verified adequate — and that verification itself is engineering. The slab, walls, and roof have to be checked for the residential loads and lateral requirements, and the MEP systems need design for the new occupancy. Unpermitted conversions are the most common source of stop-work orders in ${c}.`],
    ],
  },

  "restaurant": {
    title: (t, c, a) => `${t} for Restaurants in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for restaurant build-outs in ${c}, ${s}: kitchen exhaust, grease waste, dining comfort, and health-department-ready engineered plans.`,
    h1: (t, c, a) => `${t} for restaurants in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Restaurants are among the most engineering-intensive tenant improvements in ${c}: commercial cooking triggers exhaust, grease, gas, and electrical loads that dwarf a typical retail space, and the health department reviews alongside building plan check. Here's how ${cp.blurb} works for restaurant projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "Type I kitchen exhaust with makeup air sized to the cooking lineup, grease interceptor sizing coordinated with the health department, gas piping with seismic shutoff where required, and dining-room HVAC that handles both kitchen heat gain and occupant comfort. The electrical service almost always needs upsizing for cooking equipment — the load calc drives that decision early"
        : p === "structural"
        ? `rooftop exhaust fans and makeup-air units need curbs, supports, and anchorage designed for wind and seismic loads. Walk-in coolers, kitchen equipment, and any mezzanine storage add floor loads the existing slab and framing must be verified for. In ${c}, older retail shells often need the roof structure checked before a single fan goes up`
        : `grease waste routing to the interceptor and sanitary connection, parking counts under ${c}'s restaurant ratios (higher than retail), drive-thru stacking lanes where applicable, and stormwater treatment for the parking area. The civil site plan is also where fire-lane access and trash enclosure drainage get resolved`;
      return [
        ["Why restaurants get extra scrutiny", `A restaurant concentrates more regulated systems per square foot than almost any other commercial use: ${sc.codeRef} all show up, plus the health department's plan review. In ${c}, the building permit and the health permit run in parallel — and health won't sign off without engineered kitchen plans. Starting MEP design from the equipment schedule (not the floor plan) prevents the classic mistake of undersized utilities discovered after lease signing.`],
        [`${cp.name} scope for restaurants`, `For a restaurant in ${c}, ${sys}. Fees follow ${sc.feeNote} — and restaurant fees run higher than vanilla retail TI because the systems are denser and the review has more agencies at the table.`],
        ["Sequencing that saves the opening date", `Lock the cooking equipment list before engineering starts — every hood, fryer, and oven changes exhaust, gas, and electrical sizing. Submit health department and building department packages together, not sequentially. And verify base-building capacity (panel, gas meter, water service) during lease negotiation, not after: capacity upgrades can take months with the utility in ${s}.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What engineering does a restaurant build-out need in ${c}?`, `Typically full MEP design (kitchen exhaust, HVAC, plumbing with grease waste, electrical with load calcs), structural verification or design for equipment and any framing changes, and civil for site work. The health department requires engineered food-facility plans in ${s} — a floor plan alone won't clear review.`],
      [`How long does restaurant engineering take?`, `Design typically runs 4–8 weeks after the equipment schedule is locked, then plan check adds its own cycle. The critical path is usually equipment decisions and utility capacity upgrades, not the engineering itself — which is why early equipment lock matters more than anything.`],
      [`Can I use the previous tenant's restaurant plans?`, `Only as background. Equipment lineups differ, codes have changed, and the engineer of record must verify existing conditions rather than trust old drawings. Reusing a previous tenant's layout without re-engineering is how undersized exhaust and overloaded panels happen.`],
    ],
  },

  "office": {
    title: (t, c, a) => `${t} for Office Buildings in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for office buildings and tenant improvements in ${c}, ${s}: HVAC zoning, lighting, power distribution, and core-and-shell coordination.`,
    h1: (t, c, a) => `${t} for office buildings in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Office work in ${c} splits into two very different engineering problems: core-and-shell design for the building itself, and tenant improvements that have to live inside someone else's base building. Here's how ${cp.blurb} handles both in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `HVAC zoning by exposure and occupancy, lighting design with Title 24/ASHRAE 90.1 controls compliance, power distribution with spare capacity for tenant churn, and coordination with base-building systems in TI work — you inherit the landlord's equipment and design around it. In ${c}, energy-code documentation is a full deliverable, not an afterthought`
        : p === "structural"
        ? "floor loading for open-office densities and file/storage areas, demising wall framing and lateral continuity, and rooftop unit screening structures. For TI work, the structural scope is usually verification — confirming the slab and framing handle new partitions, equipment, and any openings — rather than new design"
        : `parking ratios under ${c}'s office requirements, accessible route and drop-off design, site lighting photometrics, and stormwater for the lot. For multi-tenant office parks, the civil work also covers shared access drives and phased utility extensions`;
      return [
        ["Core-and-shell vs. tenant improvement", `Ground-up office design in ${c} means full ${cp.blurb} for the whole building under ${sc.codeRef}. TI work is different: the engineer designs within the base building's constraints — available panel capacity, existing HVAC zones, floor-to-floor heights. The most valuable TI engineering deliverable is the base-building survey that documents what's actually there before design starts, because landlord-provided drawings are frequently wrong.`],
        [`${cp.name} scope for office projects`, `On office work in ${c}, ${sys}. Fees track ${sc.feeNote}; TI fees are lower per square foot than ground-up but carry more coordination risk, which is why the base-building investigation matters.`],
        ["What office tenants get wrong", `Tenants sign leases assuming the space can support their density, then discover the HVAC zone can't handle the headcount or the panel is full. The engineering fix is cheap during lease negotiation (a capacity letter from the engineer) and expensive after signing. Always verify base-building MEP capacity before the lease is final in ${c}.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do I need an engineer for an office tenant improvement in ${c}?`, `For anything beyond cosmetic work — yes. Moving walls, changing HVAC zones, adding electrical loads, or touching plumbing all trigger engineered plans and permits in ${c}. Even "simple" office TIs need MEP drawings when the occupancy load or systems change.`],
      [`What is a base-building survey?`, `It's the engineer's field investigation of the existing building systems — panel schedules, HVAC equipment, structural framing, plumbing routing — documented before TI design. It catches the discrepancies between landlord drawings and reality that otherwise surface as change orders mid-construction.`],
      [`How does energy code affect office TI in ${s}?`, `Lighting alterations trigger current energy-code compliance for the altered areas, and HVAC changes can trigger broader requirements. The compliance documentation (COMcheck or Title 24 forms in ${s}) is part of the permit package — plan for it in the engineering scope, not as a last-minute add.`],
    ],
  },

  "warehouse": {
    title: (t, c, a) => `${t} for Warehouses in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for warehouse and distribution buildings in ${c}, ${s}: high-bay systems, dock design, racking loads, truck courts, and ESFR coordination.`,
    h1: (t, c, a) => `${t} for warehouses in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Warehouses look simple — big box, big slab — but in ${c} they're a coordination exercise: racking loads drive the slab, clear heights drive the structure, ESFR sprinklers drive the water supply, and truck courts drive the site. Here's the ${cp.blurb} picture for warehouse and distribution projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "high-bay HVAC (often destratification fans plus minimal heating), high-bay LED lighting layouts with controls, ESFR sprinkler coordination — which drives fire-pump and water-service sizing — and dock equipment power and controls. The electrical service study has to account for future tenant equipment, not just day-one loads"
        : p === "structural"
        ? `slab design for racking point loads and forklift traffic (this is the structural heart of a warehouse), tilt-up or PEMB lateral systems for ${c}'s wind/seismic demands, dock-high walls and leveler pits, and roof structure for the long spans clear heights require. Racking itself is usually deferred-submittal but the slab must be designed for its loads now`
        : `truck courts with turning templates for WB-67 trucks, dock apron grades, massive impervious areas driving detention design, and fire-lane loops the fire marshal will walk. In ${c}, the civil package also handles off-site improvements the city exacts for industrial traffic`;
      return [
        ["The warehouse coordination chain", `Everything in a warehouse connects: clear height sets the structural system, which sets roof drainage, which affects the civil grading; racking layout sets slab loads; commodity classification sets sprinkler design, which sets water service size. In ${c}, the engineer who sequences these decisions early — before the site plan is locked — saves months. Under ${sc.codeRef}, industrial occupancies also trigger hazardous-materials review when storage includes anything beyond ordinary commodities.`],
        [`${cp.name} scope for warehouses`, `For warehouse work in ${c}, ${sys}. Fees follow ${sc.feeNote}; tilt-up warehouses are efficient to engineer per square foot, but the site work and coordination scope is large.`],
        ["Spec vs. build-to-suit engineering", `Speculative warehouses get engineered for flexible assumptions — generic racking loads, commodity Class I–IV, standard dock packages. Build-to-suit gets engineered to the tenant's actual operation. The expensive mistake is building spec and then discovering the tenant's racking or commodity class exceeds the design assumptions — re-engineering a slab after pouring is not a conversation anyone wants.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What slab thickness does a warehouse need in ${c}?`, `It depends on racking loads, forklift axle loads, and soils — not a rule of thumb. The structural engineer designs the slab section (thickness, reinforcement, joints) from the actual loading, and ${c} reviewers expect the calculations. Underslab decisions made without engineering are the top source of warehouse floor failures.`],
      [`Do I need sprinklers in a warehouse in ${s}?`, `Almost always — and storage occupancies typically require ESFR systems, which need specific water supplies, clear-height coordination, and racking layout inputs. The fire-protection design starts with commodity classification, so classify the storage early.`],
      [`How big do truck courts need to be?`, `For modern distribution with 53-foot trailers, 130–190 feet of truck court depth is typical depending on the operation, verified with turning templates. ${c} will check fire access and circulation — the civil engineer lays this out before the building footprint is final.`],
    ],
  },

  "retail": {
    title: (t, c, a) => `${t} for Retail Spaces in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for retail buildings and storefronts in ${c}, ${s}: tenant improvements, facades, signage structure, parking, and shell coordination.`,
    h1: (t, c, a) => `${t} for retail spaces in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Retail engineering in ${c} lives at the intersection of landlord base building, tenant brand standards, and city design review — three masters with three sets of requirements. Here's how ${cp.blurb} navigates retail shells, storefronts, and tenant build-outs in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "rooftop unit replacement or re-zoning for tenant layouts, storefront lighting and accent power for brand standards, plumbing for food or restroom tenants, and electrical load calcs that prove the base-building panel can carry the tenant's equipment. Restaurant or coffee tenants multiply the MEP scope — coordinate them as their own engineering track"
        : p === "structural"
        ? `storefront framing and glazing support, canopy and blade-sign structures with wind-load design, facade alterations for brand remodels, and verification of existing roof structure for new RTUs. In ${c}, parapet bracing for older retail shells is a common structural add when the facade gets touched`
        : `parking counts and restriping under ${c}'s retail ratios, accessible parking and path upgrades (older centers almost always need them), monument sign foundations, and stormwater retrofits when the lot gets reconfigured. Shared-center reciprocal access agreements also shape what the civil plan can change`;
      return [
        ["Shell, TI, and the gap between them", `Retail shells in ${c} are permitted as warm shells — then each tenant's improvement is its own permit with its own engineering. The friction point is always the interface: who provides HVAC capacity, whose panel serves the space, where demising walls land. The ${cp.blurb} for a TI starts with documenting the shell's actual provisions, because shell drawings and shell reality diverge often enough to matter.`],
        [`${cp.name} scope for retail`, `For retail in ${c}, ${sys}. Fees track ${sc.feeNote}; vanilla retail TI is straightforward engineering, while food tenants, facades, and structural alterations step the fee up.`],
        ["Brand standards vs. local code", `National tenants bring prototype drawings engineered for nowhere in particular. The local engineer adapts them to ${c}: ${sc.codeRef}, local amendments, and the reviewer's expectations. Prototypes that skip local adaptation are the classic source of first-round plan-check corrections — budget the adaptation, don't fight it.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do I need permits for a retail tenant improvement in ${c}?`, `Yes for anything beyond paint and flooring. Demising walls, ceiling changes, HVAC or electrical modifications, plumbing, and signage all need permits with engineered plans in ${c}. Landlords typically require the tenant's engineer to coordinate with base-building systems.`],
      [`Who pays for base-building upgrades in a retail TI?`, `That's a lease negotiation question, but the engineering answer is: find out what's needed before signing. A pre-lease MEP capacity review (a few thousand dollars) identifies panel, HVAC, and plumbing shortfalls while you still have leverage.`],
      [`Can I reuse the previous tenant's improvements?`, `Sometimes partially — but the engineer must verify. Previous work may be unpermitted, undersized for your use, or non-compliant with current code. ${c} reviewers hold new TIs to current code regardless of what was there before.`],
    ],
  },

  "hotel": {
    title: (t, c, a) => `${t} for Hotels in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for hotels and hospitality in ${c}, ${s}: guest-room systems, stacked plumbing, podium structures, and arrival/drop-off site design.`,
    h1: (t, c, a) => `${t} for hotels in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Hotels are vertical repetition with zero tolerance for noise, leaks, or downtime — hundreds of identical bathrooms stacked over each other, corridors that must stay quiet, and a lobby that has to impress on day one. Here's the ${cp.blurb} scope for hotel and hospitality projects in ${c}, ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "stacked plumbing design with careful venting and acoustic isolation (guest complaints start at the pipes), PTAC/VRF or central HVAC zoned per room with corridor ventilation, electrical with emergency/egress systems throughout, and laundry/kitchen/pool equipment loads that dwarf the guest-room floors. Hot-water recirculation design makes or breaks guest satisfaction"
        : p === "structural"
        ? `podium transfer structures where wood or light-gauge upper floors sit on concrete parking levels, floor vibration control for guest comfort, lateral systems for ${c}'s seismic/wind demands, and pool/spa structures with waterproofing coordination. Repetitive floor plates make hotels efficient to engineer — the podium transfer is where the real design lives`
        : `arrival court and porte-cochère geometry, bus and shuttle turning, parking structures or lots under ${c}'s hospitality ratios, pool deck drainage, and utility services sized for laundry and kitchen peaks. The civil arrival sequence is the guest's first impression — it gets engineered like it matters`;
      return [
        ["Why hotels punish bad engineering", `A hotel's systems run 24/7 at full occupancy with guests sleeping above, below, and beside every pipe and duct. Noise transmission, plumbing leaks, and HVAC failures become reviews, not just work orders. Under ${sc.codeRef}, hospitality also carries assembly-occupancy triggers for lobbies, restaurants, and event spaces — the code analysis has to catch every occupancy in the building, not just the guest rooms.`],
        [`${cp.name} scope for hotels`, `For hotels in ${c}, ${sys}. Fees follow ${sc.feeNote}; select-service hotels are efficient per key, while full-service properties with restaurants, event space, and pools carry resort-level MEP scope.`],
        ["Brand standards engineering", `Flag brands bring detailed PIP and design standards — the engineer's job is translating them to ${c}'s codes and the actual site. Prototype guest-room MEP layouts get adapted, not copied: local water pressure, electrical service, and energy code all reshape the design. Start brand coordination in schematic design, not during plan check.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What makes hotel plumbing different from apartments?`, `Density and duty cycle: hundreds of fixtures stacked vertically running near-continuously, with acoustic requirements between rooms. The venting, pipe sizing, and recirculation design are commercial-grade even in select-service hotels — residential plumbing practice doesn't transfer.`],
      [`Do hotels need special structural design in ${s}?`, `Beyond standard ${sc.codeRef.split(",")[0].trim()} requirements: podium transfers, long-span event spaces, pool structures, and rooftop amenity loads. In seismic/wind zones, the lateral design for a mid-rise hotel is a full engineering exercise — not a prescriptive path.`],
      [`How is hotel parking calculated in ${c}?`, `${c} sets parking ratios per key plus restaurant/event space additions. Structured parking changes the civil and structural scope significantly — resolve the parking strategy (surface vs. structure) before the site plan advances past concept.`],
    ],
  },

  "school": {
    title: (t, c, a) => `${t} for Schools in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for schools and educational facilities in ${c}, ${s}: classroom ventilation, DSA-style review readiness, playfields, and safe student circulation.`,
    h1: (t, c, a) => `${t} for schools in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Schools in ${c} face the strictest review environment in commercial construction — public school work often goes through state-level structural and fire review on top of local plan check, and every system is designed around children's health and safety. Here's how ${cp.blurb} serves educational projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "classroom ventilation at ASHRAE 62.1 rates with CO2 demand control, acoustic criteria for HVAC (35–40 dBA background in classrooms), gym and multipurpose room systems, kitchen/cafeteria equipment, and emergency lighting and fire alarm throughout. Indoor air quality isn't a feature in schools — it's the design driver"
        : p === "structural"
        ? "lateral-force design for essential-facility performance where required, long-span gym and multipurpose structures, DSA-caliber detailing and inspection readiness on public work, and shade structures and playground equipment foundations. School structural packages get reviewed harder than any other occupancy — the calculations have to be complete and checkable"
        : "bus loops separated from parent drop-off (the civil safety core of every school site), playfield grading and drainage, parking and staff circulation, joint-use access, and stormwater for large impervious areas. Student pedestrian routes from the sidewalk to the classroom door get designed, not assumed";
      return [
        ["The school review reality", `Public schools in ${s} typically face state agency structural/fire review plus local planning — a dual track that demands complete, coordinated documents. Private schools get local review but the same occupancy standards. Under ${sc.codeRef}, educational occupancies trigger specific egress, ventilation, and structural requirements that don't apply to offices or retail. The engineering schedule has to carry the review timeline honestly: school approvals take longer, and pretending otherwise breaks the construction calendar.`],
        [`${cp.name} scope for schools`, `For schools in ${c}, ${sys}. Fees track ${sc.feeNote}; modernization work on occupied campuses adds phasing and interim-housing engineering that new construction doesn't need.`],
        ["Modernization vs. new construction", `Most school engineering in ${c} is modernization: HVAC replacement in occupied buildings, seismic retrofit of pre-1970s structures, accessibility upgrades across campus. The engineering starts with investigation — as-builts, hazardous materials surveys, structural assessment — because 1960s drawings lie. Budget the investigation phase properly and the design phase goes smoothly.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why does school engineering cost more per square foot?`, `Review intensity, systems density (ventilation, acoustics, safety), and documentation standards. Public school structural packages face state-level review with zero tolerance for incomplete calcs. The fee reflects the rigor — value-engineering the engineering on a school is the most expensive savings available.`],
      [`Can construction happen while school is in session?`, `Yes with phasing engineering: interim housing, phased MEP cutovers, separated construction access, and noise/dust controls. The phasing plan is an engineering deliverable — it needs to be designed, not improvised by the contractor.`],
      [`What ventilation do classrooms need?`, `ASHRAE 62.1 sets the minimum outdoor air rates, and ${s} energy code overlays demand-control requirements. Post-2020, most districts also specify filtration upgrades. The mechanical design balances air quality, acoustics, and energy — all three, not two.`],
    ],
  },

  "church": {
    title: (t, c, a) => `${t} for Churches in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for churches and worship facilities in ${c}, ${s}: sanctuary spans, fellowship halls, large parking, and phased campus growth.`,
    h1: (t, c, a) => `${t} for churches in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Church projects in ${c} are really campus projects: a sanctuary with long spans and critical acoustics, fellowship and education wings with very different systems, and parking for the one hour a week when everyone arrives at once. Here's the ${cp.blurb} approach for worship facilities in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "sanctuary HVAC designed for 500+ occupants with low noise criteria (NC-25 to NC-30 — the mechanical system cannot compete with the sermon), zoned systems for sanctuary vs. education wings with wildly different schedules, theatrical/stage lighting and AV infrastructure, and commercial kitchen for fellowship halls. The sanctuary noise criterion drives equipment selection more than load does"
        : p === "structural"
        ? "long-span sanctuary roofs (steel trusses or glulam, often 80–100+ feet clear), lateral systems for tall open volumes, baptistry and platform structures, and steeple/tower elements with wind design. The sanctuary span is the structural signature of the building — it gets designed early because it sets the whole framing approach"
        : "parking for peak-hour arrival (the civil design event is Sunday 10:45 AM, not the weekday average), phased campus master planning with future buildings shown, detention for large impervious areas, and shared access with neighboring uses. Churches often grow in phases over decades — the civil plan should reserve the future, not just serve phase one";
      return [
        ["Designing for the peak hour", `Everything about church engineering in ${c} is sized for concentrated peaks: full sanctuary occupancy, full parking lot, full kitchen — simultaneously, once or twice a week. Systems that would be oversized for the average load are correctly sized for the peak. Under ${sc.codeRef}, the sanctuary's assembly occupancy also triggers the strictest egress, structural, and fire-protection requirements in the building.`],
        [`${cp.name} scope for churches`, `For churches in ${c}, ${sys}. Fees follow ${sc.feeNote}; multi-phase campuses are typically engineered phase by phase, with a master plan that keeps future phases permittable.`],
        ["The phased-campus strategy", `Most churches in ${c} can't build the full vision at once. The engineering response: a campus master plan showing all phases (which also helps with city entitlements), phase-one systems sized with stub-outs for future phases, and structural grids that accept future additions. Designing phase one as if it's the whole building guarantees expensive rework when phase two arrives.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why is church HVAC so expensive?`, `Sanctuary acoustics. Moving 500 people's worth of air quietly requires larger ducts, slower air velocities, and careful equipment selection — all of which cost more than a standard commercial system. Value-engineering sanctuary HVAC noise criteria is the fastest way to ruin the room's purpose.`],
      [`Can we build the sanctuary later and start with the fellowship hall?`, `Often yes — and it's a common phasing strategy in ${c}. The master plan shows the sanctuary's future location, phase-one utilities get stubbed for it, and the structural grid accommodates the future connection. The city entitles the campus, not just the phase.`],
      [`Do churches need the same parking as commercial?`, `${c} typically has specific religious-assembly parking ratios based on sanctuary seats. The peak-arrival pattern also affects driveway and drop-off design — the civil engineer designs for the Sunday peak, which looks nothing like weekday commercial traffic.`],
    ],
  },

  "medical": {
    title: (t, c, a) => `${t} for Medical Facilities in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for medical offices, clinics, and surgical centers in ${c}, ${s}: med gas, procedure-room systems, OSHPD-grade documentation, and patient circulation.`,
    h1: (t, c, a) => `${t} for medical facilities in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Medical projects in ${c} operate under healthcare-specific codes layered on top of standard building code — and the engineering has to satisfy both the building department and the health facility reviewers. From MOB tenant improvements to ambulatory surgical centers, here's the ${cp.blurb} scope for healthcare in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "medical gas systems (oxygen, medical air, vacuum) with source equipment and alarm panels, procedure-room HVAC with pressure relationships and air-change rates per ASHRAE 170, exam-room plumbing with hands-free fixtures, emergency power for life-safety and critical branches, and nurse-call/low-voltage infrastructure. The HVAC pressure cascade — positive procedure rooms, negative isolation — is designed, balanced, and commissioned, not assumed"
        : p === "structural"
        ? "imaging equipment supports (MRI, CT, X-ray) with manufacturer-specific structural criteria including vibration limits, equipment anchorage for seismic, shielding support for lead-lined walls, and floor-loading verification for heavy diagnostic equipment. Imaging vendors publish structural requirements — the engineer designs to them and coordinates the deferred submittals"
        : "ambulance and patient drop-off geometry separated from public access, accessible parking and routes (healthcare gets audited on accessibility), medical waste and generator fuel coordination on the site plan, and utility redundancy where the facility requires it. The arrival sequence separates patients, staff, emergency, and service — four circulations, not one";
      return [
        ["The dual-review track", `Healthcare in ${c} answers to the building department and healthcare facility licensing reviewers, each with their own standards. The engineering documents have to satisfy both simultaneously — ${sc.codeRef} plus NFPA 99, ASHRAE 170, and FGI Guidelines where they apply. Ambulatory surgical centers face the most intense review; standard medical office TI faces the least. Knowing which track the project is on determines the entire documentation strategy.`],
        [`${cp.name} scope for medical`, `For medical in ${c}, ${sys}. Fees track ${sc.feeNote}; ASC and imaging-center work commands premium engineering fees because the systems and review are specialized.`],
        ["Equipment-first engineering", `Medical projects are equipment-driven: the imaging vendor, the procedure-table manufacturer, the med-gas supplier each publish requirements that shape the engineering. The project sequence that works is equipment selection → engineering → permit. Projects that permit first and select equipment later pay for it in change orders — especially structural supports and electrical capacity for imaging.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is ASHRAE 170 and does my clinic need it?`, `ASHRAE 170 sets ventilation requirements for healthcare facilities — air changes, pressure relationships, filtration. It applies to spaces like procedure rooms, isolation rooms, and sterile processing. Standard exam-room medical offices follow it selectively; surgical centers follow it fully. Your mechanical engineer determines applicability by space type.`],
      [`Do I need medical gas engineering for a dental office?`, `Dental offices using nitrous oxide or oxygen need designed med-gas systems with proper source, distribution, and alarms — it's not plumber's-trade work. The system gets engineered, permitted, and inspected as a healthcare system in ${s}.`],
      [`Can a medical office go in a standard office building?`, `Often yes for clinic/exam use, with TI engineering for the medical systems. The constraints are base-building capacity (electrical, plumbing, HVAC), floor-to-floor heights for med-gas and ductwork, and imaging equipment structural requirements. A pre-lease engineering assessment answers all three before the lease is signed.`],
    ],
  },

  "multifamily": {
    title: (t, c, a) => `${t} for Apartments in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for multifamily and apartment projects in ${c}, ${s}: stacked systems, podium design, unit repetition, and amenity engineering.`,
    h1: (t, c, a) => `${t} for apartment buildings in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Multifamily in ${c} is an exercise in repetition done right: one well-engineered unit type multiplied across hundreds of doors, stacked plumbing that can't leak, and a podium that carries it all. Here's the ${cp.blurb} scope for apartment and multifamily development in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "stacked DWV and water distribution with careful venting, individual unit HVAC (typically split systems or PTACs) with corridor ventilation, centralized vs. decentralized hot water strategy, electrical with house-vs.-unit metering, and fire sprinkler throughout. The plumbing stack design — one detail repeated 200 times — deserves more engineering attention than any other multifamily system because leaks multiply"
        : p === "structural"
        ? `podium transfer slabs where wood-frame upper floors meet concrete parking podiums, lateral-force systems for ${c}'s wind/seismic demands, corridor and amenity long spans, and acoustic detailing between units (which is structural as much as architectural). Type III and Type V podium construction dominate ${c} multifamily — the transfer slab and podium lateral design are the structural core of the project`
        : `parking counts under ${c}'s multifamily ratios (often reduced near transit), amenity deck drainage and waterproofing coordination, utility services for hundreds of units, fire access around the podium, and phased site work. The civil package also handles the off-site improvements cities exact for density`;
      return [
        ["Repetition as an engineering strategy", `The economics of multifamily engineering in ${c} come from getting the typical unit, typical stack, and typical corridor exactly right — then repeating them. One plumbing-stack detail error multiplied across 200 units is a catastrophe; one correct detail repeated 200 times is efficiency. Under ${sc.codeRef}, multifamily also triggers accessibility (Fair Housing/ADA), energy code, and acoustic requirements that single-family never sees.`],
        [`${cp.name} scope for multifamily`, `For apartments in ${c}, ${sys}. Fees follow ${sc.feeNote}; garden-style walk-ups are the simplest multifamily engineering, while podium and wrap projects carry full commercial-grade scope.`],
        ["The podium decision", `The single biggest engineering fork in ${c} multifamily is the podium: wood over concrete podium vs. all-wood vs. steel/concrete mid-rise. The decision drives structural system, fire separation, MEP distribution strategy, construction type, and cost per door. It's made in concept design with the engineer at the table — projects that pick the system without engineering input redesign it later.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is podium construction?`, `Typically 1–2 levels of concrete construction (usually parking) with 3–5 levels of wood framing above, separated by a fire-rated transfer slab. It's the dominant ${c} multifamily type because it maximizes wood-frame efficiency over concrete parking. The transfer slab and podium lateral design are specialized structural engineering.`],
      [`How do you prevent plumbing leaks in stacked units?`, `Careful stack design with proper venting, quality control on the repeated detail, pressure testing before close-in, and access provisions for maintenance. The engineering contribution is a correct, buildable typical detail — the contractor's contribution is building it identically 200 times.`],
      [`Do apartments need sprinklers in ${s}?`, `Yes — residential sprinklers (NFPA 13R or 13 depending on height/construction type) throughout, plus common areas. The fire-protection design coordinates with the plumbing engineer on water service sizing and with structural on seismic bracing.`],
    ],
  },

  "single-family": {
    title: (t, c, a) => `${t} for Custom Homes in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for custom single-family homes in ${c}, ${s}: Manual J HVAC, panel design, foundation engineering, grading, and luxury-home systems.`,
    h1: (t, c, a) => `${t} for custom homes in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Custom homes in ${c} have outgrown the era of rule-of-thumb engineering — 6,000-square-foot houses with walls of glass, pools, casitas, and home automation need real ${cp.blurb}, not prescriptive tables. Here's what engineering a custom residence actually involves in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "room-by-room Manual J/S/D load calculations and duct design (not a block load and a guess), electrical with load calcs for pools, spas, EV charging, and accessory structures, plumbing with hot-water recirculation for long runs, and low-voltage infrastructure for automation. Production-home MEP practice doesn't scale to custom — the loads, zones, and owner expectations are all different"
        : p === "structural"
        ? "foundation design from the soils report (not a prescriptive table), lateral-force systems for open floor plans with limited shear walls, long-span beams for great rooms and glass walls, and pool/casita/retaining structures. The structural signature of a custom home is achieving the architecture — cantilevers, corners of glass, floating stairs — with real load paths behind them"
        : `grading and drainage plans showing pad elevations and water routing, driveway geometry and sight distance, utility laterals and septic where applicable, and pool/spa drainage. On hillside or large ${c} lots, the civil grading plan is what makes the architecture buildable — flat-pad thinking on a sloped lot creates the drainage failures`;
      return [
        ["Custom vs. production engineering", `Production builders in ${c} reuse engineered plan sets across lots. Custom homes get engineered once, for one site, for one architecture — which means the soils report, the grading, the structural system, and the MEP design all respond to actual conditions. Under ${sc.codeRef}, larger custom homes also trigger energy-code performance paths and sometimes fire-sprinkler requirements that production plans handle by repetition.`],
        [`${cp.name} scope for custom homes`, `For custom residences in ${c}, ${sys}. Fees track ${sc.feeNote}; the engineering fee on a custom home is a small fraction of construction cost and the highest-leverage money in the project.`],
        ["The architect-engineer sequence", `Custom homes work best when the engineer joins during schematic design — not after the plans are "done." Structural input on the framing concept, MEP input on equipment locations and chases, and civil input on grading all prevent the redesign loop where finished architecture meets engineering reality. In ${c}, the smoothest custom-home permits come from teams that coordinated early.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Does a custom home need a soils report in ${c}?`, `Almost always for engineered foundations — and most ${c} jurisdictions require one for new custom homes. The foundation design follows the soils engineer's recommendations; designing foundations without soils data is guessing with concrete.`],
      [`What size electrical panel does a large custom home need?`, `Determined by load calculation, not square footage — 400-amp service is common for large ${c} custom homes with pools, spas, and EV charging. The electrical engineer runs the NEC load calc; the utility then confirms service availability.`],
      [`Do custom homes need fire sprinklers in ${s}?`, `Depends on size, location (wildfire interface), and local amendments in ${c}. Many ${s} jurisdictions require sprinklers above certain square footages or in high-fire-severity zones. Verify with the building department during concept design — it affects water service sizing.`],
    ],
  },

  "mixed-use": {
    title: (t, c, a) => `${t} for Mixed-Use in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for mixed-use developments in ${c}, ${s}: podium separation, multi-occupancy systems, shared parking, and phased entitlements.`,
    h1: (t, c, a) => `${t} for mixed-use projects in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Mixed-use in ${c} stacks different buildings inside one envelope — retail at grade, offices or housing above, parking below — each with its own code requirements, systems, and tenants. Here's how ${cp.blurb} handles the vertical complexity of mixed-use development in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "separated vs. shared systems strategy (retail RTUs vs. residential splits vs. office VRF — often all three in one building), occupancy separation with rated shafts for MEP penetrations, parking garage ventilation and CO monitoring, and metering/submetering strategy across uses. The MEP design starts with the separation plan: what can share, what must separate, and where the boundaries run"
        : p === "structural"
        ? "podium transfer structures carrying different framing systems above, occupancy-separation floor assemblies with structural fire ratings, lateral systems handling the irregular massing mixed-use creates, and retail storefront long spans at grade under residential above. The transfer level is the structural heart — it resolves every system change in one slab"
        : `shared parking with mixed-use ratios (retail peak vs. residential peak don't coincide — ${c} allows shared-parking analysis), loading and service access separated from residential arrival, phased utility services, and streetscape improvements cities require for urban mixed-use. The civil site has to choreograph four user groups that never want to meet`;
      return [
        ["The separation problem", `Mixed-use engineering in ${c} is governed by occupancy separation: fire-rated assemblies between uses, separated egress, and often separated MEP systems. Under ${sc.codeRef}, the code analysis identifies every occupancy, the required separations, and whether the building is separated or non-separated mixed-use — a decision that ripples through structure, MEP, and cost. Get the occupancy analysis right in concept design; everything else follows.`],
        [`${cp.name} scope for mixed-use`, `For mixed-use in ${c}, ${sys}. Fees follow ${sc.feeNote}; the coordination premium on mixed-use is real — more meetings, more interfaces, more review comments — and it's priced in.`],
        ["Phasing and entitlements", `${c} mixed-use projects often entitle the full vision and build in phases. The engineering accommodates phasing: utility mains sized for ultimate buildout, structural grids that accept future vertical phases, and MEP systems with capped stub-outs. Phasing designed in is cheap; phasing retrofitted is a second project.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is separated vs. non-separated mixed-use?`, `A code decision about whether occupancies need fire-rated separation assemblies. Separated mixed-use allows each occupancy to follow its own height/area limits but requires rated separations; non-separated applies the most restrictive requirements building-wide. The architect and engineer make this call together in concept design — it shapes everything.`],
      [`Can retail and residential share HVAC?`, `Sometimes for small projects, but usually they're separated: different schedules, different loads, different tenants paying different utility bills. The metering/submetering strategy is decided with the MEP design, not after.`],
      [`How does mixed-use parking work in ${c}?`, `${c} typically allows shared-parking analysis showing retail daytime peaks and residential nighttime peaks using the same stalls. The civil engineer prepares the shared-parking study as part of entitlements — it's one of the highest-value analyses in mixed-use.`],
    ],
  },

  "industrial": {
    title: (t, c, a) => `${t} for Industrial in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for industrial and manufacturing facilities in ${c}, ${s}: process loads, heavy slabs, crane structures, hazmat review, and truck circulation.`,
    h1: (t, c, a) => `${t} for industrial facilities in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Industrial work in ${c} is process-driven: the manufacturing or logistics operation dictates the engineering, not the other way around. Here's the ${cp.blurb} scope for manufacturing, flex, and heavy industrial projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "process ventilation and exhaust for manufacturing operations, compressed air and process piping distribution, heavy electrical service with power quality for production equipment, and hazmat exhaust and monitoring where chemicals are present. The process equipment list is the MEP design basis — every machine's utilities get documented before design starts"
        : p === "structural"
        ? "crane runway beams and supports (top-running or underhung, designed to the crane class), heavy equipment foundations with vibration isolation, thickened slabs for point loads, and pre-engineered or conventional steel lateral systems for large clear spans. Crane loads are dynamic and cyclical — the structural design follows CMAA and AISC standards, not building-code defaults"
        : "WB-67 truck circulation and dock geometry, heavy-duty pavement sections for loaded trucks and forklifts, containment and secondary containment for chemical storage, industrial wastewater pretreatment coordination, and rail access where applicable. The civil package also handles the fire-water supply and hydrant layout industrial insurers require";
      return [
        ["Process-first design", `Industrial engineering in ${c} starts with the process flow: what gets made, what equipment it needs, what utilities each machine draws, what waste it produces. The building is designed around the process — bay spacing from equipment layout, clear heights from crane or racking, slab from equipment loads. Under ${sc.codeRef}, industrial occupancies also trigger high-piled storage, hazardous materials, and industrial wastewater reviews that don't exist for other uses.`],
        [`${cp.name} scope for industrial`, `For industrial in ${c}, ${sys}. Fees track ${sc.feeNote}; process-heavy manufacturing carries the highest MEP engineering intensity per square foot in commercial construction.`],
        ["The tenant-unknown problem", `Spec industrial gets engineered for flexible assumptions — generic crane provisions, standard dock packages, flexible electrical. The costly error is under-designing flexibility: a spec building that can't accept the tenant's crane or process loads needs structural retrofit before first occupancy. In ${c}'s industrial market, over-provisioning the slab and electrical service is cheap insurance.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What structural provisions does a crane need?`, `Runway beams designed for the crane class (CMAA 70/74), building columns and bracing that accept crane lateral and longitudinal forces, and foundations for the resulting loads. The crane manufacturer supplies load data; the structural engineer designs the building to carry it. Crane provisions must be in the original design — retrofitting is extremely expensive.`],
      [`Do industrial projects need hazmat review in ${c}?`, `When storing or using hazardous materials above threshold quantities — yes, through both building code (high-hazard occupancy triggers) and the fire department. The review affects occupancy classification, ventilation, containment, and separation. Classify materials early; it changes the building.`],
      [`How is industrial wastewater handled?`, `Through pretreatment systems (oil/water separators, pH adjustment, clarifiers) discharging to the sanitary system under an industrial waste permit from ${c}'s utility. The civil/plumbing design includes the pretreatment, sampling manholes, and permit documentation — start the permit conversation early, as it has its own timeline.`],
    ],
  },

  "storage": {
    title: (t, c, a) => `${t} for Self-Storage in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for self-storage facilities in ${c}, ${s}: multi-story structures, drive-aisle circulation, unit mix efficiency, and conversion engineering.`,
    h1: (t, c, a) => `${t} for self-storage in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Self-storage in ${c} has evolved from single-story metal buildings to multi-story climate-controlled facilities — and the engineering has evolved with it. Here's the ${cp.blurb} scope for ground-up and conversion storage projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "climate-control HVAC for conditioned units (dehumidification matters more than temperature), LED lighting with occupancy controls across thousands of fixtures, fire sprinkler throughout multi-story facilities, and gate/access control power and low-voltage. The MEP load is light but the fixture count is enormous — the electrical design is about distribution efficiency"
        : p === "structural"
        ? "multi-story storage structures with floor loading for unit contents (125 psf is the standard design load — heavier than office), long-span corridors, elevator and stair cores, and conversion verification when adapting existing buildings. Single-story remains pre-engineered metal; multi-story is conventional steel or concrete — the structural system follows the height"
        : "drive-aisle widths and turning for customer vehicles (and moving trucks), unit door access from aisles, stormwater for the large roof and pavement areas, and perimeter security fencing and lighting. Conversions inherit the existing site — the civil scope becomes verification and targeted upgrades rather than new design";
      return [
        ["Ground-up vs. conversion", `New storage in ${c} is increasingly multi-story climate-controlled — full ${cp.blurb} for the building and site. Conversions (adapting existing retail, office, or industrial buildings) flip the engineering: structural verification of floor loads for storage use, MEP adaptation to the existing systems, and code analysis for the occupancy change. Under ${sc.codeRef}, the occupancy change from mercantile or business to storage triggers the full review — conversions aren't shortcuts.`],
        [`${cp.name} scope for self-storage`, `For storage in ${c}, ${sys}. Fees follow ${sc.feeNote}; storage is efficient to engineer per square foot because the systems are simple and repetitive — the value is in the unit-mix and circulation efficiency, not complex systems.`],
        ["The unit-mix engineering", `Storage economics live in the unit mix — the ratio of 5x5 to 10x30, climate vs. non-climate, drive-up vs. interior. The engineer contributes by keeping the structural grid and MEP distribution compatible with the operator's mix: corridor widths, door swings, HVAC zoning that can be rebalanced. Design the building to accept mix changes without re-engineering.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Can I convert an existing building to self-storage in ${c}?`, `Often yes — big-box retail and light industrial convert well. The engineering checks: floor load capacity for storage loads (125 psf), ceiling heights for the unit layout, MEP adaptation, and the occupancy-change code analysis. A structural feasibility check comes before the purchase, not after.`],
      [`What floor load does storage need?`, `125 psf uniformly distributed is the industry standard design load for storage units — significantly heavier than office (50–80 psf). Existing buildings being converted must be verified for this load; many need structural reinforcement.`],
      [`Do storage facilities need climate control engineering?`, `For climate-controlled units, yes — HVAC designed for dehumidification and temperature control across the unit mix, with zoning that matches the operator's product. The building envelope also matters: insulation and air sealing make or break the humidity control.`],
    ],
  },

  "gym": {
    title: (t, c, a) => `${t} for Fitness Centers in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for gyms and fitness centers in ${c}, ${s}: ventilation, locker rooms, floor vibration, equipment loads, and high-occupancy egress.`,
    h1: (t, c, a) => `${t} for fitness centers in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Gyms in ${c} concentrate more people, more moisture, and more dropped weight per square foot than almost any other commercial use. Here's the ${cp.blurb} scope for fitness centers, from boutique studios to big-box health clubs in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "ventilation at assembly-occupancy rates (gyms breathe hard — ASHRAE 62.1 plus operator experience), locker-room plumbing with gang showers and floor drains, dehumidification for pool/spa areas where included, and HVAC zoning that separates the hot yoga studio from the weight floor. Moisture management in locker rooms is a design discipline: exhaust, materials, and drainage coordinated"
        : p === "structural"
        ? "floor vibration design for group-fitness studios (aerobic activity on a light floor is felt three floors away), dropped-weight impact loads in free-weight areas, equipment anchorage, and mezzanine cardio decks. The structural signature of gym engineering is vibration: the floor system gets designed for human-induced vibration, not just static load"
        : `parking for peak-hour fitness traffic (the 5 PM rush is the design event), accessible routes, exterior boot-camp or turf areas with drainage, and bike parking ${c} increasingly requires. Standalone gyms also need the full site package — lighting, landscaping, stormwater`;
      return [
        ["The three gym engineering problems", `Every fitness center in ${c} presents the same trio: air (ventilation and moisture for hundreds of exercising occupants), structure (vibration and impact from weights and classes), and plumbing (locker rooms that run like small aquatic centers). Under ${sc.codeRef}, the assembly occupancy triggers egress, structural, and ventilation requirements well beyond standard commercial. Boutique studios simplify the program but not the physics — a 3,000-square-foot HIIT studio still needs real vibration and ventilation design.`],
        [`${cp.name} scope for fitness`, `For gyms in ${c}, ${sys}. Fees track ${sc.feeNote}; second-floor gyms in existing buildings carry structural investigation scope that ground-floor TI doesn't.`],
        ["Second-floor gyms: the investigation", `Putting a gym above another tenant is the highest-risk fitness engineering in ${c}. The structural engineer investigates the existing floor for vibration and load capacity before the lease is signed — because some buildings simply can't accept a gym above occupied space, and discovering that after signing is catastrophic. The pre-lease structural assessment is non-negotiable for upper-floor fitness.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Can I put a gym on the second floor in ${c}?`, `Sometimes — but only after structural investigation. The engineer checks floor vibration under rhythmic activity, impact loads from weights, and the existing capacity. Many light-frame upper floors can't accept gym use without reinforcement. Get the assessment during lease negotiation.`],
      [`What ventilation does a gym need?`, `Above standard commercial rates: high occupant density plus high activity level means high CO2 and moisture generation. The mechanical design uses ASHRAE 62.1 assembly rates as a starting point, with dehumidification where pools or heavy shower use add moisture load.`],
      [`Do boutique fitness studios need full engineering?`, `Yes — the physics don't scale down. A cycling or HIIT studio still needs ventilation for 30 exercising people, vibration control for rhythmic movement, and proper egress for the occupant load. ${c} permits the TI with engineered plans like any assembly use.`],
    ],
  },

  "daycare": {
    title: (t, c, a) => `${t} for Daycare Centers in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for daycare and childcare centers in ${c}, ${s}: licensing-ready plans, child-safe systems, playgrounds, and secure drop-off design.`,
    h1: (t, c, a) => `${t} for daycare centers in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Daycare centers in ${c} answer to two authorities: the building department and the state childcare licensing agency — and licensing has its own facility requirements that shape the engineering. Here's the ${cp.blurb} scope for childcare projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "ventilation with attention to indoor air quality (young children are the most sensitive occupants), plumbing with child-height fixtures and hands-free controls, water temperature controls (anti-scald is a licensing item), and security/access-control low-voltage. The MEP design reads the licensing checklist alongside the building code — both have to be satisfied"
        : p === "structural"
        ? "playground equipment foundations and shade-structure supports, interior partition bracing for the open classroom layouts, and verification of existing structures in conversion projects. New daycare construction is typically light-frame — the structural engineering is straightforward, but playground structures need real foundation and wind design"
        : `secure drop-off/pick-up circulation separated from through traffic (the licensing reviewer walks this), fenced outdoor play areas with proper drainage and fall-zone surfacing grades, accessible routes throughout, and parking under ${c}'s childcare ratios. The site plan demonstrates child safety to both the city and the licensing agency`;
      return [
        ["The dual-approval track", `Childcare in ${c} needs a building permit and a childcare license — and the license has facility standards (outdoor space per child, fencing, water temperature, egress) that the engineering must satisfy. Under ${sc.codeRef}, the educational/daycare occupancy also triggers specific egress and plumbing-fixture requirements. The efficient path is designing to both checklists simultaneously; the expensive path is permitting the building and then discovering licensing requires changes.`],
        [`${cp.name} scope for daycare`, `For childcare in ${c}, ${sys}. Fees follow ${sc.feeNote}; conversion of existing buildings (houses, retail, church wings) is the most common daycare project and carries investigation scope.`],
        ["Conversions: houses to daycare", `Many ${c} daycares adapt existing houses or commercial spaces. The engineering investigation checks: does the structure meet the occupancy requirements, can the MEP systems serve the fixture counts and ventilation licensing requires, and does the site accommodate fenced play area plus drop-off? A feasibility assessment before purchase or lease answers all three — it's the highest-value engineering a daycare operator buys.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What does childcare licensing require of the building in ${s}?`, `Typical items: minimum indoor and outdoor space per child, fenced outdoor play areas, water temperature limits, egress requirements, and sanitation standards. The requirements vary by state — the engineer designs to both the building code and the licensing facility standards for ${s}.`],
      [`Can I convert a house into a daycare in ${c}?`, `Often yes for small centers, but the occupancy change from residential to educational/daycare triggers full code compliance: egress, plumbing fixtures, accessibility, fire protection. The structural and MEP systems get evaluated against the new occupancy — some houses adapt easily, others don't. Feasibility first.`],
      [`Do daycares need sprinklers?`, `In most cases yes under current codes for the occupancy — and licensing reviewers expect them. The fire-protection design is part of the TI or new-construction package in ${c}.`],
    ],
  },

  "senior-living": {
    title: (t, c, a) => `${t} for Senior Living in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for senior living and assisted living in ${c}, ${s}: accessibility-first design, nurse-call systems, commercial kitchens, and care-ready MEP.`,
    h1: (t, c, a) => `${t} for senior living in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Senior living in ${c} blends residential, healthcare, and hospitality engineering — apartments with nurse call, dining rooms with commercial kitchens, and accessibility that exceeds code minimums because the residents demand it. Here's the ${cp.blurb} scope for assisted living, memory care, and independent living in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "nurse-call and wander-management low-voltage systems, HVAC with individual room control and quiet operation, commercial kitchen and laundry equipment, emergency power for life-safety plus resident-critical loads, and plumbing with accessibility fixtures throughout. Memory-care units add secured egress controls and specialized lighting — the MEP design serves care operations, not just the building"
        : p === "structural"
        ? "residential-scale framing (typically wood over podium, like multifamily) with enhanced acoustic detailing between units, commercial kitchen and laundry equipment supports, canopy and porte-cochère structures for the arrival, and courtyard structures. The structural work resembles multifamily — the differentiation is in the amenity and care spaces"
        : `covered drop-off and porte-cochère for resident transport and ambulances, accessible routes with gentle grades throughout the site (exceeding minimums as a market expectation), courtyard and walking-path design with drainage, visitor and staff parking under ${c}'s senior-housing ratios, and emergency vehicle access. The site is designed for residents with limited mobility — every grade, curb, and crossing matters`;
      return [
        ["Care levels drive engineering", `Independent living engineers like upscale multifamily; assisted living adds nurse call, commercial food service, and enhanced life safety; memory care adds secured perimeters and specialized environments; skilled nursing approaches healthcare-facility standards. Under ${sc.codeRef}, the occupancy classification follows the care level — and in ${s}, higher care levels can trigger healthcare licensing review. The care model must be defined before engineering starts because it determines the code track.`],
        [`${cp.name} scope for senior living`, `For senior living in ${c}, ${sys}. Fees track ${sc.feeNote}; the MEP scope is the cost driver — nurse call, commercial kitchen, emergency power, and specialized HVAC exceed standard multifamily systems.`],
        ["Accessibility as market standard", `Senior-living residents and their families judge accessibility harder than any code official. Successful ${c} projects engineer beyond minimums: gentler ramps, better lighting, quieter HVAC, clearer wayfinding. The engineering that exceeds code is the engineering that fills units — design for the resident, not the reviewer.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What's the difference between assisted living and memory care engineering?`, `Memory care adds secured egress (delayed-egress or controlled access), wander-management systems, specialized lighting and acoustics, and secure outdoor courtyards. The base building systems are similar; the life-safety and low-voltage scope diverges significantly.`],
      [`Does senior living need healthcare licensing review in ${s}?`, `It depends on the care level — independent and assisted living typically follow residential/commercial tracks, while skilled nursing faces healthcare facility review. Confirm the licensing track with ${s} authorities during concept design; it determines the entire engineering and review strategy.`],
      [`What MEP systems are unique to senior living?`, `Nurse-call/code-blue systems, wander management, commercial kitchen and laundry, emergency power beyond standard life-safety, and HVAC with individual control and quiet operation. The low-voltage scope alone exceeds typical multifamily significantly.`],
    ],
  },

  "student-housing": {
    title: (t, c, a) => `${t} for Student Housing in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for student housing in ${c}, ${s}: dense unit plans, durable systems, bike/ped circulation, and amenity-heavy programming.`,
    h1: (t, c, a) => `${t} for student housing in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Student housing in ${c} is multifamily engineered for maximum density, maximum durability, and an amenity package that leases the building — often within walking distance of campus where the site constraints are tightest. Here's the ${cp.blurb} scope for purpose-built student housing in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "high-density plumbing (four-bedroom units mean four times the fixtures), individual metering and HVAC control per bedroom, robust ventilation for dense occupancy, amenity-space systems (fitness, study lounges, pool), and access-control and security low-voltage throughout. Student housing MEP is designed for abuse tolerance — systems that survive four 20-year-olds per unit"
        : p === "structural"
        ? "podium or wrap structures like conventional multifamily, floor vibration control for amenity decks above units, long-span amenity spaces (clubhouses, fitness), and parking structure integration. The structural system follows the multifamily playbook — the differentiation is density-driven loading and the amenity program"
        : `bike parking and pedestrian connections to campus (often the primary transportation mode), reduced vehicle parking under ${c}'s student-housing ratios, amenity courtyards with drainage, move-in/move-out circulation for hundreds of simultaneous arrivals, and tight urban sites with zero-lot-line constraints. The August move-in is the site's design event — hundreds of cars, one weekend`;
      return [
        ["Density changes everything", `Purpose-built student housing in ${c} packs more bedrooms per square foot than conventional multifamily — and every system scales with bedrooms, not units. Plumbing fixture counts, HVAC loads, electrical capacity, parking demand (or bike demand), and egress all follow the bed count. Under ${sc.codeRef}, the occupancy is still residential, but the engineering intensity per square foot exceeds standard apartments.`],
        [`${cp.name} scope for student housing`, `For student housing in ${c}, ${sys}. Fees follow ${sc.feeNote}; proximity to campus usually means tight urban sites that add civil and structural complexity.`],
        ["The university relationship", `Student housing near ${c} campuses often involves university design guidelines, city specific-plan requirements, or both — sometimes with community-benefit negotiations. The entitlements track can be longer than the engineering track. Successful projects engage the entitlement requirements during concept design so the engineering responds to the actual approvals, not assumptions.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How is student housing different from apartments?`, `Higher bedroom density per unit, individual bedroom leases (with individual metering/HVAC control), heavier amenity programming, durability-driven specifications, and transportation skewed toward bikes/pedestrians/transit. The engineering follows the bed count, and the bed count is high.`],
      [`What parking do student housing projects need in ${c}?`, `Often reduced ratios compared to conventional multifamily — sometimes dramatically near campus transit. ${c} may have specific student-housing parking standards or allow transportation-demand-management reductions. The parking study is part of entitlements.`],
      [`Do student housing buildings need sprinklers?`, `Yes — residential sprinklers throughout per current code, like all multifamily in ${s}. The fire-protection design is standard multifamily practice; the differentiation is in the amenity and common-area systems.`],
    ],
  },

  "car-wash": {
    title: (t, c, a) => `${t} for Car Washes in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for car wash facilities in ${c}, ${s}: water reclaim, equipment loads, stacking lanes, wash-water discharge, and tunnel structures.`,
    h1: (t, c, a) => `${t} for car washes in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Car washes in ${c} are specialized industrial-commercial hybrids: water-reclaim plumbing, heavy equipment in a corrosive environment, and a site designed around vehicle stacking. Here's the ${cp.blurb} scope for express tunnel and in-bay automatic washes in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "water-reclaim and reverse-osmosis systems with significant plumbing design, high electrical loads for blowers/dryers/pumps with load calcs, floor drains and trench drains throughout the tunnel, and HVAC for equipment rooms in a high-humidity environment. The water system — reclaim, RO, discharge — is the MEP heart of the project and gets designed around the equipment vendor's requirements"
        : p === "structural"
        ? "tunnel and equipment-room structures designed for the corrosive wet environment (material selection matters), equipment supports and anchorage for wash machinery, canopy structures over vacuum areas, and foundations in soils affected by constant water exposure. Corrosion detailing — galvanized, stainless, or coated — is a structural durability decision, not an architectural finish choice"
        : `vehicle stacking lanes sized for peak demand (the site's reason for being — undersized stacking backs onto the street and draws violations), wash-water discharge to sanitary with oil/water separation and the industrial waste permit, vacuum-area parking and circulation, and stormwater for the large impervious site. ${c} will scrutinize stacking and discharge — both are common approval conditions`;
      return [
        ["The equipment-vendor partnership", `Car wash engineering in ${c} is vendor-driven: the wash equipment manufacturer dictates water, electrical, compressed air, and structural requirements. The engineer's job is translating vendor cutsheets into permitted construction documents under ${sc.codeRef} — and coordinating the half-dozen trades the vendor doesn't cover. Select the equipment vendor before engineering starts; changing vendors mid-design restarts the MEP and structural coordination.`],
        [`${cp.name} scope for car washes`, `For car washes in ${c}, ${sys}. Fees track ${sc.feeNote}; the industrial-waste discharge permit and stacking analysis are specialized scope items beyond standard commercial.`],
        ["Water: the regulatory core", `Wash-water discharge in ${c} goes to the sanitary sewer through oil/water separation under an industrial waste permit — not to the storm drain, ever. The reclaim system reduces both water cost and discharge volume. The permit application runs parallel to the building permit and has its own review timeline; start it early because the equipment selection affects the discharge characteristics.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Where does car wash water go in ${c}?`, `To the sanitary sewer through pretreatment (oil/water separation, solids removal) under an industrial waste discharge permit from the local utility. Storm-drain discharge of wash water is prohibited. The reclaim system recycles a large percentage, reducing both supply and discharge.`],
      [`How much stacking does a car wash site need?`, `Enough that peak-demand queues stay on-site — typically 10–20+ cars for express tunnels depending on throughput. ${c} reviews stacking as a traffic condition; inadequate stacking that backs onto the street is the most common car-wash site violation.`],
      [`Can I convert an existing building to a car wash?`, `In-bay automatics sometimes; tunnels rarely without major work. The constraints are floor drainage and reclaim plumbing, equipment structural loads, ceiling heights, and the discharge permit. A feasibility check against the equipment vendor's requirements comes before the property decision.`],
    ],
  },

  "gas-station": {
    title: (t, c, a) => `${t} for Gas Stations in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for gas stations and convenience stores in ${c}, ${s}: fueling canopies, UST coordination, stormwater treatment, and high-visibility site design.`,
    h1: (t, c, a) => `${t} for gas stations in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Gas stations in ${c} combine fueling infrastructure, convenience retail, and some of the most regulated site work in commercial construction. Here's the ${cp.blurb} scope for fueling facilities and c-stores in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? "canopy and site lighting photometrics (fueling facilities are lit like landmarks), electrical for dispensers, POS, and EV charging additions, HVAC and plumbing for the convenience store, and coordination with fuel-system vendors on emergency shutoffs and monitoring. The MEP design interfaces with the petroleum equipment contractor's scope at clearly defined boundaries"
        : p === "structural"
        ? `fueling canopy structures with wind-load design for the large canopy sail area, canopy column foundations, convenience-store building structure, car-wash or lube additions where included, and signage structures. The canopy is the structural signature — long spans, minimal columns for vehicle maneuvering, designed for ${c}'s wind demands`
        : `fueling-position layout with turning templates, underground storage tank excavation coordination and backfill specifications, stormwater treatment (fueling areas need oil/water separation before discharge), spill containment grading at dispensers, and driveway access meeting ${c}'s arterial standards. The civil package also addresses any legacy contamination from prior fueling use — Phase II findings shape the grading plan`;
      return [
        ["The petroleum interface", `Gas station engineering in ${c} splits between the building/site engineer and the petroleum contractor who installs tanks, piping, and dispensers. The boundary must be contractually clear: who designs the tank excavation and backfill, who specifies the spill containment, who coordinates the fire marshal's fuel-system review. Under ${sc.codeRef} plus fire code Article 23 (or ${s} equivalent), fueling facilities face hazardous-materials review that shapes the entire site layout.`],
        [`${cp.name} scope for fueling`, `For gas stations in ${c}, ${sys}. Fees follow ${sc.feeNote}; UST coordination and environmental review add specialized scope beyond standard commercial site work.`],
        ["EV charging at fueling sites", `Many ${c} fueling sites are adding EV fast charging — which is a separate electrical engineering exercise: service capacity studies, load management, new switchgear, and civil layout for charging stalls. The charging scope often exceeds the original fueling electrical scope. Design the electrical service with charging expansion in mind, even if phase one is fuel-only.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Who designs the underground fuel tanks?`, `The petroleum equipment contractor designs and installs the UST system; the civil/structural engineer designs the excavation support, backfill, and surface improvements, and coordinates the fire marshal review. The interface between the two scopes is defined in the contract documents — ambiguity here causes the classic gas-station disputes.`],
      [`What stormwater treatment does a gas station need in ${c}?`, `Fueling areas require oil/water separation or equivalent treatment before stormwater discharge, plus spill-containment grading at dispenser islands. ${c}'s stormwater requirements for fueling are stricter than standard commercial — the treatment system is sized and specified in the civil package.`],
      [`Can I add EV charging to an existing gas station?`, `Usually yes, but it requires electrical engineering: service capacity analysis, new distribution, and often a service upgrade. The civil layout adds charging stalls with accessible compliance. Start with a capacity study — the existing service is frequently inadequate for DC fast charging.`],
    ],
  },

/* DRAFT: 70 new Apex variation definitions — technical disciplines (2/4) */

  "hvac-design": {
    title: (t, c, a) => `HVAC Design & Coordination in ${c}, ${a}`,
    desc: (t, c, s) => `Professional HVAC design in ${c}, ${s}: load calculations, equipment selection, ductwork, and structural/electrical coordination for ${t.toLowerCase()} projects.`,
    h1: (t, c, a) => `HVAC design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `HVAC is the most visible engineering system in any building — and the one most affected by the other disciplines. Whether the project needs full mechanical design or the ${cp.blurb} interface with it, here's how HVAC engineering and its coordination work in ${c}, ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Room-by-room Manual J load calculations, Manual S equipment selection, and Manual D duct design — the ACCA trilogy that ${c} reviewers expect behind every residential and light-commercial submittal. Commercial work adds ventilation per ASHRAE 62.1, energy modeling for code compliance, and controls sequences. Equipment gets selected for the load, the noise criterion, and the energy code — in that order`
        : p === "structural"
        ? `Every rooftop unit, exhaust fan, and air handler needs structural support: curbs, dunnage, anchorage for wind and seismic, and vibration isolation that actually isolates. The structural engineer's HVAC scope is the equipment support package — and in ${c}, rooftop equipment on older buildings triggers verification of the existing roof structure before a single curb is set`
        : `Outdoor equipment placement on the site plan with screening per ${c}'s mechanical-equipment visibility rules, condensate drainage routing, equipment pad grading and drainage, and noise considerations at property lines. The civil coordination keeps condensers out of drainage paths and visible from the street`;
      return [
        ["Load calculations: the non-negotiable", `No responsible HVAC design in ${c} starts with equipment — it starts with loads. Manual J (residential) or ASHRAE-based commercial load calculations determine every downstream decision: equipment size, duct sizing, electrical loads, structural supports. Under ${sc.codeRef}, the reviewer checks that equipment selections trace back to calculations. Rule-of-thumb sizing (tons per square foot) is how oversized, noisy, short-cycling systems happen.`],
        [`The ${cp.name} interface with HVAC`, `On this project type in ${c}, ${angle}. The coordination failure that costs the most is late equipment selection — structural curbs, electrical service, and duct chases all depend on knowing the actual units. Lock equipment during design development, not during construction.`],
        ["Energy code reality", `${s} energy code makes HVAC documentation a full deliverable: compliance forms, mandatory measures checklists, acceptance testing requirements. The compliance path (prescriptive vs. performance) is chosen during design — and it affects equipment efficiency minimums, controls requirements, and envelope coordination. Budget the compliance work as engineering, not paperwork.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is a Manual J load calculation?`, `The ACCA-standard method for calculating residential heating and cooling loads room by room, accounting for orientation, glazing, insulation, infiltration, and internal gains. ${c} reviewers expect Manual J behind equipment selections — it's the engineering basis that separates designed systems from guessed ones.`],
      [`Who designs the structural supports for rooftop HVAC?`, `The structural engineer — curbs, dunnage steel, anchorage, and vibration isolation, all designed for gravity plus wind/seismic loads. The mechanical engineer selects the equipment and provides weights and dimensions; structural designs the support. This handoff needs to happen during design, not in the field.`],
      [`How do I know if my HVAC is oversized?`, `Short cycling, humidity problems, and noise are the symptoms. The diagnosis is comparing the installed capacity against a proper load calculation. Oversized equipment costs more to buy, more to run, and delivers worse comfort — correct sizing is the highest-value HVAC engineering there is.`],
    ],
  },

  "electrical-design": {
    title: (t, c, a) => `Electrical Design in ${c}, ${a}`,
    desc: (t, c, s) => `Licensed electrical engineering in ${c}, ${s}: load calculations, panel schedules, one-line diagrams, and power distribution for ${t.toLowerCase()} projects.`,
    h1: (t, c, a) => `Electrical design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Electrical design in ${c} runs on calculations: load calcs that size the service, fault-current studies that size the protection, and voltage-drop calcs that keep the farthest outlet working. Here's how electrical engineering — and its ${cp.blurb} interfaces — works in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `NEC load calculations by occupancy, panel schedules with spare capacity, one-line diagrams from service to branch, lighting design with energy-code controls, and coordination with the utility on service size and meter requirements. The load calc is the foundation — every panel, feeder, and service size traces back to it, and ${c} reviewers check the math`
        : p === "structural"
        ? `Seismic anchorage and bracing of electrical equipment — switchgear, transformers, panelboards, and cable tray all need engineered supports for ${c}'s seismic demands. The structural scope also covers equipment pads, vault structures, and pole bases for site electrical. Electrical gear is heavy, top-heavy, and full of energy: it gets anchored like it matters`
        : "Underground service routing and trenching coordination, site lighting pole bases and photometrics, utility coordination with the power company (service location, easements, transformer pads), and EV-ready conduit. The civil site plan shows where the electrical goes underground — and where it can't, because of drainage, trees, or other utilities";
      return [
        ["The load calculation drives everything", `Electrical design in ${c} starts with the NEC load calculation: general lighting, receptacles, HVAC equipment, specialty loads (kitchens, EV charging, process), and demand factors by occupancy. The service size, panel schedule, and utility coordination all follow. Under ${sc.codeRef}, the reviewer verifies the calc — undersized services discovered after the utility sets the transformer are extremely expensive to fix.`],
        [`The ${cp.name} interface with electrical`, `For this work in ${c}, ${angle}. The most expensive electrical coordination failure is discovering the service is inadequate after construction starts — the capacity study belongs in due diligence, before the property or lease is final.`],
        ["Utility coordination timeline", `The power company works on its own schedule: service applications, engineering reviews, transformer lead times, and construction windows that can run months in ${s}. The electrical engineer initiates utility coordination during design — not after permit issuance. Projects that treat the utility as an afterthought inherit the utility's timeline as their critical path.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How is electrical service size determined?`, `By NEC load calculation: the engineer totals general, HVAC, appliance, and specialty loads with applicable demand factors, then selects the next standard service size with spare capacity. ${c} and the utility both review it. There's no shortcut — square-footage rules of thumb don't survive plan check.`],
      [`What is seismic bracing of electrical equipment?`, `Engineered anchorage and restraint of switchgear, transformers, panels, and distribution so they stay in place and functional during earthquakes. Required by code in ${s} seismic zones and reviewed as part of the structural package — the electrical engineer provides equipment data, the structural engineer designs the anchorage.`],
      [`When should I involve the power company?`, `During design — as soon as the service size is estimated. New services, upgrades, and relocations each have utility engineering and construction timelines measured in weeks to months. The service application should be submitted before or with the building permit, never after.`],
    ],
  },

  "plumbing-design": {
    title: (t, c, a) => `Plumbing Design in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered plumbing design in ${c}, ${s}: risers, isometrics, fixture calculations, gas piping, and utility coordination for ${t.toLowerCase()} work.`,
    h1: (t, c, a) => `Plumbing design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Plumbing engineering in ${c} is hydraulics plus code: pipe sizing from fixture-unit calculations, venting that actually vents, gas piping with pressure-drop calcs, and isometrics the inspector can follow. Here's the plumbing design scope — and its ${cp.blurb} interfaces — in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Fixture-unit calculations driving DWV and water-pipe sizing, hot-water system design with recirculation for long runs, gas piping with pressure-drop calculations and seismic shutoff where required, roof drainage (primary plus overflow), and riser diagrams plus isometrics that show the whole system. The isometric is the plumbing engineer's signature drawing — ${c} inspectors build from it`
        : p === "structural"
        ? "Slab and wall penetrations for plumbing runs (sleeves and blockouts coordinated before concrete, not cored after), equipment supports for water heaters and boilers, seismic bracing of piping, and trench/foundation coordination where plumbing goes under or through structure. The structural-plumbing interface is about timing: penetration locations must be in the structural drawings before the concrete is placed"
        : `Building sewer and water service laterals to the mains, backflow-prevention assemblies per ${c}'s cross-connection requirements, grease-interceptor or pretreatment coordination for food uses, and utility invert elevations that make gravity work. If the sewer main is shallower than the building drain, the civil engineer solves it with the site grading — or designs the lift station nobody wanted`;
      return [
        ["Fixture units to pipe sizes", `Plumbing design in ${c} sizes every pipe from fixture-unit totals per the plumbing code — not from habit. Water piping, DWV, vents, and gas each get calculated: Hunter's curve for water, branch-interval loading for stacks, pressure drop for gas. Under ${sc.codeRef}, the reviewer checks pipe sizing against the fixture counts on the plans. Mismatched fixtures and pipe sizes are among the most common plan-check corrections.`],
        [`The ${cp.name} interface with plumbing`, `On plumbing work in ${c}, ${angle}. The recurring failure is sequencing: plumbing design finalized after structural drawings are issued means coring slabs and cutting beams — expensive, sometimes structurally compromising. Coordinate penetrations during design development.`],
        ["Gas piping: the separate discipline", `Gas design in ${c} is effectively its own engineering: pressure-drop calculations from meter to appliance, seismic shutoff valves where ${s} requires them, combustion-air provisions, and coordination with the gas utility on meter sizing. Restaurant and industrial gas loads dwarf residential — the gas system gets engineered to the equipment schedule, never assumed.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is a plumbing isometric?`, `A three-dimensional diagram showing the DWV (drain-waste-vent) system: pipe sizes, slopes, vent connections, and fixture connections. ${c} requires isometrics on commercial plumbing permits — it's how the plan checker verifies venting and sizing without guessing from floor plans.`],
      [`Who coordinates plumbing penetrations through structure?`, `The plumbing engineer locates them; the structural engineer approves sizes and locations and details the sleeves or blockouts. This coordination happens in the construction documents — field-cutting structure for missed plumbing is a structural integrity issue, not just an inconvenience.`],
      [`Do I need a grease interceptor in ${c}?`, `Food-service uses do — sized per the plumbing code from fixture units and menu type, with the location coordinated on the civil site plan. ${c}'s industrial waste program may also require a sampling manhole. Size it from the actual equipment, not the previous tenant's interceptor.`],
    ],
  },

  "lighting-design": {
    title: (t, c, a) => `Lighting Design in ${c}, ${a}`,
    desc: (t, c, s) => `Professional lighting design in ${c}, ${s}: photometrics, energy-code controls, site lighting, and fixture coordination for ${t.toLowerCase()} projects.`,
    h1: (t, c, a) => `Lighting design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Lighting design in ${c} balances three demands: enough light for the task, compliance with an energy code that keeps getting stricter, and the ${cp.blurb} interfaces that put fixtures where they belong. Here's how it's done in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Photometric calculations proving footcandle levels for the occupancy, lighting power density compliance with ${s} energy code, controls design (occupancy, daylight, scheduling) that the code mandates — not suggests — and fixture schedules coordinated with the architectural reflected ceiling plan. The controls narrative is now as important as the fixture layout: ${c} reviewers check control zones, not just wattage`
        : p === "structural"
        ? `Pole bases for site and parking-lot lighting (designed for wind loads on the pole-and-fixture assembly), facade and canopy fixture supports, high-bay fixture supports in warehouses and gyms, and seismic restraint of pendant and suspended fixtures. A 30-foot site-light pole in ${c} wind is a structural element — the base and foundation get engineered`
        : `Site lighting photometric plans showing footcandle levels across parking, drives, and walkways (which ${c} planning often requires for approvals), pole locations coordinated with drainage and landscaping, and light-trespass analysis at residential property lines. The site photometric plan is frequently a planning-department condition, not just an electrical drawing`;
      return [
        ["Photometrics before fixtures", `Lighting design in ${c} starts with required light levels by task — offices, retail, parking, egress — then selects fixtures and layouts that deliver them in software, not by spacing rules. Under ${sc.codeRef} plus ${s} energy code, the submittal includes photometric calculations, lighting power density compliance, and the controls narrative. Fixture catalogs don't constitute a lighting design; calculations do.`],
        [`The ${cp.name} interface with lighting`, `For lighting work in ${c}, ${angle}. The classic coordination miss is the reflected ceiling plan: fixtures, HVAC diffusers, sprinklers, and structure all compete for the same ceiling real estate, and the lighting designer needs the final RCP — not a schematic one — to place fixtures correctly.`],
        ["Energy code: controls are mandatory", `${s} energy code treats lighting controls as requirements: occupancy sensing, daylight harvesting, multilevel control, scheduling — each with specific applicability by space type. The compliance documentation lists every control by space, and ${c} field inspectors verify installation against the narrative. Design the controls early; retrofitting them after the electrical is roughed is the expensive path.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What are photometric calculations?`, `Software modeling showing predicted footcandle levels across a space or site from the proposed fixtures — proving the design delivers required light levels before anything is purchased. ${c} planning departments often require site photometrics for commercial approvals, and reviewers check interior levels for egress and task areas.`],
      [`Does the energy code really require all those controls?`, `Yes — ${s} energy code mandates occupancy sensors, daylight controls, and multilevel switching by space type, with limited exceptions. The requirements tighten every code cycle. Non-compliant lighting is one of the most common commercial plan-check corrections in ${c}.`],
      [`Who designs site-light pole foundations?`, `The structural engineer — pole bases are designed for wind overturning on the pole-plus-fixture assembly per ${c}'s wind criteria, with foundations sized for the soils. The electrical engineer provides the pole and fixture data; structural delivers the base design.`],
    ],
  },

  "foundation-design": {
    title: (t, c, a) => `Foundation Design in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered foundation design in ${c}, ${s}: footings, piers, and slabs based on soils reports — the structural base for ${t.toLowerCase()} projects.`,
    h1: (t, c, a) => `Foundation design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Every building in ${c} stands on a foundation designed for its actual soil — or it should. Foundation engineering translates the geotechnical report into footings, piers, or slabs that carry the building's loads to ground that can hold them. Here's the foundation scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Underground MEP rough-in coordinated with the foundation plan: slab penetrations sleeved before the pour (not cored after), under-slab plumbing and electrical routed around footings and grade beams, and equipment pads bearing on the structural slab or independent footings. The foundation drawing set includes every MEP penetration location — the coordination meeting happens before concrete, never after"
        : p === "structural"
        ? `Spread footings, grade beams, drilled piers, or mat slabs selected from the soils report's bearing and settlement recommendations; lateral-force resistance through the foundation system; retaining and stem-wall design; and detailing for ${c}'s seismic and expansive-soil conditions. The foundation plan, sections, and details plus structural calculations are the core deliverable — ${c} reviewers check bearing pressures against the soils report line by line`
        : "Foundation-adjacent civil work: site grading that keeps water away from foundations (the 5%-for-10-feet rule and its engineered equivalents), foundation drainage systems, pad elevations coordinated with finish floors, and shoring design for deep foundations near property lines. Water is the enemy of foundations — the civil grading plan is foundation protection";
      return [
        ["Soils report first, always", `Foundation design in ${c} begins with the geotechnical investigation — bearing capacity, settlement estimates, expansive-soil potential, groundwater, seismic site class. The structural engineer designs the foundation type and dimensions from the soils engineer's recommendations; under ${sc.codeRef}, the plan checker verifies the design against the soils report. Designing foundations without a soils report is guessing with the most expensive concrete on the project.`],
        [`The ${cp.name} interface with foundations`, `For foundation work in ${c}, ${angle}. The sequencing that matters: soils → foundation design → MEP underground coordination → structural drawings issued. Compressing that sequence is how penetrations get missed and slabs get cored.`],
        ["Expansive and problem soils", `Much of ${s} has expansive clays or other problem soils — and the foundation system responds: post-tensioned slabs, drilled piers to stable strata, over-excavation and recompaction, moisture barriers. The soils report prescribes the strategy; the structural engineer executes it. Ignoring expansive-soil recommendations is the most common source of residential foundation litigation in ${s}.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do I really need a soils report for my project in ${c}?`, `For engineered foundations — yes, and most ${c} jurisdictions require one for new construction. The report costs a fraction of the foundation and determines the entire design. Foundations designed on assumed soils are the leading cause of settlement and expansive-soil damage claims.`],
      [`Piers vs. spread footings — how is it decided?`, `By the soils report: bearing capacity at shallow depth, settlement tolerance, expansive-soil depth, and groundwater. Shallow competent soils get spread footings; deep problem soils get piers to stable strata. The structural engineer doesn't choose — the soil chooses, and the engineer documents why.`],
      [`Who coordinates plumbing under the slab?`, `The plumbing engineer routes it; the structural engineer reviews penetrations through grade beams and footings. Sleeve locations go on the foundation plan before the pour. Post-pour coring through structural elements requires engineering evaluation — it's never just a contractor decision.`],
    ],
  },

  "seismic-retrofit": {
    title: (t, c, a) => `Seismic Retrofit in ${c}, ${a}`,
    desc: (t, c, s) => `Seismic retrofit engineering in ${c}, ${s}: soft-story, URM, and non-ductile concrete upgrades with full ${t.toLowerCase()} coordination.`,
    h1: (t, c, a) => `Seismic retrofit in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `In ${s} seismic country, thousands of older buildings need structural upgrades — soft-story apartments, unreinforced masonry, non-ductile concrete — and many cities now mandate them. Here's the seismic retrofit scope and its ${cp.blurb} interfaces in ${c}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Anchorage and bracing of mechanical, electrical, and plumbing equipment disturbed or added during the retrofit — water heaters, gas piping seismic shutoffs, and piping bracing per the seismic design category. Retrofits that touch MEP systems trigger current anchorage requirements for the affected equipment, and gas shutoff valves are frequently a ${c} mandate item in the same ordinance as the structural retrofit`
        : p === "structural"
        ? `The core engineering: ASCE 41 seismic evaluation establishing the deficiency, then retrofit design — steel moment frames or cantilever columns for soft-story, wall anchors and parapet bracing for URM, fiber-wrap or concrete jacketing for non-ductile concrete. ${c} retrofit ordinances typically reference specific standards and compliance tiers; the design documents include the evaluation, the retrofit drawings, and calculations the reviewer can verify`
        : `Construction-phase civil work: shoring and excavation support where retrofit foundations go in, site access and staging in dense ${c} neighborhoods, sidewalk and street restoration, and drainage protection during foundation work. The civil scope is construction-enabling — it keeps the retrofit buildable on tight urban sites`;
      return [
        ["Evaluation before design", `Seismic retrofit in ${c} starts with ASCE 41 evaluation: the engineer analyzes the existing building against current seismic demands and documents the deficiencies tier by tier. Under ${sc.codeRef} and ${c}'s retrofit ordinances, the evaluation determines whether the trigger is a voluntary upgrade, a mandatory ordinance, or a change-of-occupancy requirement — each with different compliance standards. Designing the retrofit without the evaluation is prescribing before diagnosing.`],
        [`The ${cp.name} interface with retrofit`, `For retrofit work in ${c}, ${angle}. The tenant-impact reality: most retrofits happen in occupied buildings, so the phasing plan — which units are affected when, how MEP systems stay live — is an engineering deliverable, not a contractor improvisation.`],
        ["Ordinance compliance strategy", `${c}'s retrofit ordinances set deadlines, standards, and sometimes cost-recovery mechanisms. The engineering strategy matches the ordinance: minimum-compliance vs. full-upgrade, phased vs. single-mobilization, and coordination with planned TI or repositioning work so the building isn't opened up twice. Retrofit engineering bundled with planned renovation is dramatically cheaper per scope than standalone retrofit.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is a soft-story retrofit?`, `Strengthening buildings with weak ground floors — typically apartments with tuck-under parking — using steel moment frames, cantilever columns, or shear walls to prevent ground-floor collapse in earthquakes. Many ${s} cities mandate them on deadlines; the engineering follows ASCE 41 and the local ordinance's compliance standard.`],
      [`Do I need a seismic evaluation before the retrofit design?`, `Yes — ASCE 41 Tier 1/2 evaluation documents the deficiencies and establishes the compliance path. ${c} reviewers expect the evaluation as part of the submittal. Skipping it risks designing the wrong retrofit for the building's actual weaknesses.`],
      [`Can tenants stay during a seismic retrofit?`, `Often yes with phasing engineering — the work is sequenced by unit or bay, with MEP systems kept operational. The phasing plan addresses noise, dust, access, and system shutdowns. Occupied retrofits cost more in phasing but avoid relocation costs; the engineer designs the sequence.`],
    ],
  },

  "structural-calculations": {
    title: (t, c, a) => `Engineering Calculations in ${c}, ${a}`,
    desc: (t, c, s) => `Licensed engineering calculations in ${c}, ${s}: structural calcs, equipment anchorage, and code-verified analysis supporting ${t.toLowerCase()} permits.`,
    h1: (t, c, a) => `Engineering calculations in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Behind every sealed plan set in ${c} is a calculation package proving the design works — load paths, member sizes, connections, anchorage. Here's what engineering calculations cover, and how the ${cp.blurb} interfaces with them, in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Equipment anchorage calculations (seismic/wind restraint for mechanical and electrical equipment), piping and duct support spans, roof-screen and equipment-curb structural verification, and vibration-isolation selection calcs. MEP-adjacent calculations prove the equipment stays put and the supports carry it — ${c} reviewers ask for them whenever equipment goes on a roof or a wall`
        : p === "structural"
        ? `Gravity and lateral analysis: load takedowns, member sizing for beams/columns/walls, connection design, foundation bearing checks, diaphragm and shear-wall analysis, and drift verification. The calc package follows the load path from roof to foundation with every member and connection verified — ${c} plan checkers follow that same path, so the package is organized for verification, not just for the record`
        : "Retaining-wall calculations (overturning, sliding, bearing, global stability), detention and storm-drain hydraulics, pavement section structural numbers, and shoring design calcs. Civil calculations prove the site works: water goes where it's supposed to, walls stand up, pavements carry the loads";
      return [
        ["What a calc package contains", `A ${c} calculation package is a checkable document: design criteria and code references up front, then the analysis in load-path order — loads, members, connections, foundations — with sketches tying each calc to the drawings. Under ${sc.codeRef}, the reviewer verifies the design by following the calcs; a package organized for checking clears review faster than a brilliant but disorganized one. Completeness beats cleverness in plan check.`],
        [`The ${cp.name} calculation scope`, `For this work in ${c}, ${angle}. The common gap: deferred submittals (racking, cladding, equipment) whose calcs arrive during construction — the engineer of record defines the deferred scope and review process in the permit set so nothing structural goes uncalculated.`],
        ["Software vs. hand calcs", `Modern ${c} practice uses structural software for analysis — but the calc package still shows the engineer's judgment: input verification, spot-check hand calcs on critical members, and connection design the software doesn't do. Reviewers trust packages where the engineer evidently checked the machine, not just printed its output. The seal means a human verified the work.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why do plan checkers ask for more calculations?`, `Because the code requires the design to be verified by analysis — and the checker's job is verifying the verification. When ${c} asks for additional calcs, it's identifying a load path or member the package didn't document. Complete first submittals include every member and connection; the corrections come from gaps, not disagreements.`],
      [`What's the difference between structural calcs and a structural plan?`, `The calculations prove the members work; the plans show the contractor what to build. ${c} requires both — calcs for verification, plans for construction. A plan set without calcs is an unverified claim; calcs without plans are unbuildable.`],
      [`Do small projects need engineering calculations?`, `When they need engineering at all, yes — the calc package scales with the project, from a few pages for a beam replacement to volumes for a high-rise. ${c} doesn't waive the physics for small projects; it waives nothing.`],
    ],
  },

  "energy-modeling": {
    title: (t, c, a) => `Energy Modeling in ${c}, ${a}`,
    desc: (t, c, s) => `Energy modeling and code compliance in ${c}, ${s}: Title 24, ASHRAE 90.1, COMcheck, and performance-path documentation for ${t.toLowerCase()}.`,
    h1: (t, c, a) => `Energy modeling in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Energy code in ${s} is no longer a checklist — it's a modeling exercise with compliance documentation the building department verifies in the field. Here's the energy-modeling scope and its ${cp.blurb} interfaces in ${c}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `The core deliverable: building energy modeling (EnergyPlus, IES, or compliance software) proving the design beats the standard, HVAC efficiency and controls compliance, lighting power density and controls, water-heating efficiency, and the full compliance forms package — CF-1R/NC or COMcheck equivalents that ${c} requires at permit and verifies at inspection. The model is built during design, not after — it informs equipment selection`
        : p === "structural"
        ? "Thermal-bridge detailing where structure penetrates the envelope (balconies, parapets, slab edges), envelope air-barrier continuity at structural interfaces, and coordination of insulation placement with the structural system. The structural contribution to energy performance is in the details: every unbroken concrete path through the envelope is a thermal bridge the model penalizes"
        : `Site-level energy considerations: building orientation established on the civil site plan, shading from existing and proposed landscaping, cool-roof and cool-pavement strategies for heat-island compliance, and EV-ready parking infrastructure that ${s} energy code increasingly mandates. The civil site plan sets the orientation the energy model assumes — late site changes invalidate the model`;
      return [
        ["Prescriptive vs. performance path", `Energy compliance in ${c} offers two routes: prescriptive (meet every individual requirement) or performance (model the building and beat the standard overall). Under ${sc.codeRef} plus ${s} energy code, performance path gives design flexibility — trade envelope for efficient HVAC, for example — but requires the full model and documentation. The path is chosen in schematic design; switching mid-permit restarts the compliance work.`],
        [`The ${cp.name} interface with energy`, `For energy work in ${c}, ${angle}. The coordination that matters most: the energy model must match the construction documents — same glazing, same insulation, same equipment. Mismatches between the model and the plans are the top source of energy-code plan-check corrections.`],
        ["Field verification reality", `${c} doesn't just review the energy forms — inspectors verify installation: HERS raters test duct leakage and refrigerant charge, verify insulation grades, confirm lighting controls function. The acceptance testing requirements are part of the permit package. Designing systems that pass field verification (sealed ducts, accessible equipment) is as important as the model itself.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is Title 24 / energy-code compliance documentation?`, `The forms and calculations proving the building meets ${s} energy standards: envelope, HVAC efficiency, lighting power and controls, water heating. ${c} requires them at permit application and verifies measures during inspection — including third-party HERS verification for many items.`],
      [`When do I need a full energy model vs. COMcheck?`, `Simple buildings can often comply prescriptively with COMcheck or equivalent forms; complex buildings or designs seeking trade-off flexibility need full performance modeling. Your mechanical engineer recommends the path during schematic design based on the building's complexity and your design goals.`],
      [`Why did my project fail the HERS test?`, `Usually duct leakage, refrigerant charge, or airflow — installation quality issues, not design issues. The engineering response is designing for testability: sealed duct systems, accessible equipment, and specifications requiring installer certification. Passing HERS starts on the drawings.`],
    ],
  },

  "drainage-design": {
    title: (t, c, a) => `Drainage Design in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered drainage design in ${c}, ${s}: storm drains, detention, roof drainage, and grading that moves water where it belongs.`,
    h1: (t, c, a) => `Drainage design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Water follows gravity and the path of least resistance — drainage engineering in ${c} makes sure that path doesn't run through the building. Here's the drainage scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Roof drainage design: primary drains plus overflow scuppers sized for ${c}'s rainfall intensity, with overflow paths that don't flood the building when primaries clog. Interior coordination includes sump pumps for below-grade spaces, condensate routing, and foundation-drain connections. The MEP roof-drainage calc is reviewed against the plumbing code — and the overflow design is what saves the building during the 100-year storm`
        : p === "structural"
        ? "Foundation drainage systems (perforated pipe, drainage board, sump) that keep hydrostatic pressure off basement walls, retaining-wall backdrains, and waterproofing coordination. The structural engineer designs the drainage that protects the structure — because water against a foundation is a structural load, not just a nuisance"
        : `The site drainage system: hydrology calculations for the watershed, storm-drain pipe sizing, inlet placement, detention/retention design per ${c}'s requirements, and grading plans showing every swale and flow arrow. The civil drainage report — with pre- and post-development runoff comparison — is a standard ${c} submittal requirement`;
      return [
        ["The drainage report", `Civil drainage design in ${c} is documented in the hydrology/hydraulics report: tributary areas, runoff coefficients, time of concentration, pipe and inlet sizing, detention volume calculations, and outlet analysis. Under ${sc.codeRef} plus ${c}'s drainage manual, the reviewer checks that post-development runoff doesn't exceed pre-development (or the city's threshold) and that the 100-year storm is contained. No report, no permit — it's that central.`],
        [`The ${cp.name} interface with drainage`, `For drainage work in ${c}, ${angle}. The interface failure that floods buildings: roof drainage designed without coordinating overflow paths to the civil grading — the water leaves the roof and has nowhere to go. Roof, foundation, and site drainage are one system designed by three engineers who must coordinate.`],
        ["Detention vs. retention vs. LID", `${c} typically requires detention (temporarily hold and release runoff) or retention/bioretention (infiltrate it), increasingly with low-impact-development features: bioswales, permeable pavement, rain gardens. The strategy is chosen from the soils (can it infiltrate?), the space available, and ${c}'s current manual. LID features need maintenance plans — the civil package includes them because unmaintained bioretention fails.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why does ${c} require a drainage report?`, `To prove the project doesn't flood its neighbors or overload the public storm system. The report documents pre- vs. post-development runoff, sizes every pipe and basin, and demonstrates 100-year containment. It's the engineering basis for the entire site drainage design.`],
      [`What is the difference between detention and retention?`, `Detention temporarily holds stormwater and releases it slowly to the storm system; retention (or bioretention) infiltrates it into the ground. ${c} allows each based on soils and watershed — infiltration needs permeable soils verified by testing, which is why the geotechnical report matters for drainage too.`],
      [`Who designs roof drainage — plumbing or civil?`, `The plumbing engineer designs the roof drains, leaders, and overflow per the plumbing code; the civil engineer takes over where water hits the site — connecting to the storm system and grading the overflow paths. The handoff point is defined on the drawings; the coordination is non-negotiable.`],
    ],
  },

  "grading-design": {
    title: (t, c, a) => `Grading Design in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered grading plans in ${c}, ${s}: earthwork, pad elevations, slopes, and drainage patterns for ${t.toLowerCase()} projects.`,
    h1: (t, c, a) => `Grading design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Grading is the civil engineer's signature on the land — every pad elevation, slope, and swale that makes the site buildable and drainable. Here's the grading scope and its ${cp.blurb} interfaces in ${c}, ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Equipment pad elevations and drainage: outdoor HVAC, generators, and transformers sit on pads whose finish elevation and surrounding grades the civil plan sets — pads that pond water fail. Underground utility trenches follow the grading; the MEP engineer needs final grades before routing site utilities. Grade changes after MEP design invalidate invert calculations"
        : p === "structural"
        ? "Pad elevations that set finish floors, retaining walls where grades change abruptly, foundation drainage coordination with the grading slopes, and shoring where grading meets property lines or existing structures. The structural engineer builds on the grades the civil engineer sets — late grading changes ripple through foundations, retaining walls, and accessibility routes"
        : `The grading plan itself: existing and proposed contours, pad elevations, slope ratios, retaining wall locations, earthwork quantities (cut/fill balance), erosion control, and the drainage patterns that prove water flows away from every building. Under ${sc.codeRef} plus ${c}'s grading ordinance, the plan also shows limits of disturbance, protected trees, and construction-phase erosion control`;
      return [
        ["Pad elevations set everything", `The proposed pad elevation on the ${c} grading plan determines finish floors, foundation depths, drainage falls, utility inverts, and accessibility slopes — it's the single number the most disciplines depend on. Under ${sc.codeRef}, the plan checker verifies drainage away from buildings, maximum slopes, and retaining-wall triggers. Setting pad elevations without coordinating structure and MEP is how projects end up with stairs where ramps were planned.`],
        [`The ${cp.name} interface with grading`, `For grading work in ${c}, ${angle}. The grading plan should be the most-coordinated sheet in the set: architecture's finish floors, structural's foundations, MEP's inverts, and accessibility's slopes all trace to it. Issue grading early in design development and freeze it — late grade changes are the most disruptive revision in site development.`],
        ["Earthwork economics", `Cut/fill balance drives grading cost: balanced sites move dirt around; import/export sites buy and haul it. The civil engineer designs the grading to balance when the site allows — and documents the quantities so the contractor bids real numbers. In ${c}, export also triggers haul-route and dust-control conditions; the grading plan anticipates them.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is on a grading plan?`, `Existing and proposed contours, building pad elevations, slope ratios and directions, retaining walls, drainage swales and flow arrows, limits of grading, erosion control, and earthwork quantities. ${c} reviews it for drainage, slope stability, and ordinance compliance — it's the foundational civil sheet.`],
      [`When is a retaining wall needed?`, `When grade changes exceed what slopes can handle — typically over 3–4 feet depending on soils and ${c}'s requirements. Walls over 4 feet (measured from footing bottom) need engineered design and permits in most jurisdictions. The grading plan locates them; the structural engineer designs them.`],
      [`Why does grading affect the building design?`, `Pad elevation sets finish floor, which sets foundation depth, drainage falls, utility inverts, stair/riser counts, and accessibility slopes. A one-foot pad change ripples through architecture, structure, MEP, and civil. That's why grading is coordinated early and changed reluctantly.`],
    ],
  },

  "utility-design": {
    title: (t, c, a) => `Utility Design in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered utility design in ${c}, ${s}: water, sewer, storm, and dry utilities coordinated from mains to building for ${t.toLowerCase()} sites.`,
    h1: (t, c, a) => `Utility design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A site without utilities is just land — utility engineering in ${c} connects water, sewer, storm, power, gas, and telecom from the public mains to the building, sized and routed to actually work. Here's the utility scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "The building-side interface: water service entrance with backflow prevention, sanitary connection points with invert elevations, gas meter location and service routing, electrical service duct banks — the MEP engineer designs from the property line inward, and needs the civil utility plan's invert elevations, locations, and capacities to do it. Mismatched inverts between civil and MEP drawings are a classic (and wet) coordination failure"
        : p === "structural"
        ? "Utility structures: vaults, manholes, and pull boxes with traffic-rated lids; trench shoring and bedding where utilities run deep or near foundations; and structural coordination where utilities penetrate foundation walls (sleeves, waterstops). The structural scope protects both the utilities and the building where they meet"
        : `The full wet-and-dry utility plan: water mains with fire-flow calculations proving hydrant capacity, sewer mains with slope and capacity analysis, storm drains tied to the drainage design, and dry-utility corridors (power, gas, telecom) coordinated with each provider's requirements. Under ${sc.codeRef} plus ${c}'s utility standards, the improvement plans show every pipe, structure, and connection — and the fire-flow test proves the water system before the building gets its final`;
      return [
        ["Capacity and will-serve", `Utility design in ${c} starts before design: will-serve letters from water, sewer, power, and gas confirming capacity exists. Under ${sc.codeRef}, the building's demands (fixture units, fire flow, electrical load, gas load) get calculated and compared against available capacity. The nightmare scenario — designing a building the utilities can't serve — is prevented by a capacity inquiry during due diligence, not discovered during plan check.`],
        [`The ${cp.name} interface with utilities`, `For utility work in ${c}, ${angle}. The coordination artifact is the composite utility plan: all wet and dry utilities on one drawing, checked for crossings, clearances, and conflicts. Issuing separate utility drawings that were never composited is how contractors discover the water main through the electrical duct bank.`],
        ["Fire flow: the governing utility", `Often the water system is sized by fire flow, not domestic demand — the fire marshal's required flow and duration dictate main sizes, hydrant placement, and sometimes off-site upgrades. The civil engineer runs the fire-flow analysis early because it can trigger main extensions that carry their own timeline and cost. In ${c}, fire flow surprises late in the project are expensive and slow.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is a will-serve letter?`, `A utility provider's written confirmation that capacity exists to serve the project — water, sewer, power, gas. ${c} typically requires them before or with permit application. Get them during due diligence: "no capacity" answers reshape or kill projects, and they're cheapest to receive early.`],
      [`Who designs what: civil vs. MEP on utilities?`, `Civil designs from the public mains to the property line (or to 5 feet outside the building, by local convention); MEP designs from there into the building. Invert elevations, locations, and sizes must match at the handoff — the composite utility plan proves they do.`],
      [`What is a fire-flow test?`, `A field test measuring available water flow and pressure at the site's hydrants, used to verify the water system can deliver the fire marshal's required flow. The civil engineer uses test results in the hydraulic analysis; ${c} fire departments often require recent tests (not decade-old data) for new projects.`],
    ],
  },

  "fire-protection": {
    title: (t, c, a) => `Fire Protection in ${c}, ${a}`,
    desc: (t, c, s) => `Fire-protection engineering in ${c}, ${s}: sprinklers, alarms, egress, and fire access coordinated with ${t.toLowerCase()} design.`,
    h1: (t, c, a) => `Fire protection in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Fire protection in ${c} spans four disciplines: sprinklers and alarms (MEP), fireproofing and egress structure, and fire access and water supply (civil) — all reviewed by a fire marshal with veto power. Here's the fire-protection scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Sprinkler and standpipe design per NFPA 13/13R/14: hazard classification, hydraulic calculations proving the water supply works, head layouts coordinated with structure and ceilings. Plus fire-alarm design: device placement, notification, monitoring, and emergency-voice where required. The hydraulic calc is the submittal's heart — ${c} fire reviewers check it against the water-supply data`
        : p === "structural"
        ? "Structural fire protection: fireproofing of steel (spray-applied, intumescent, or encasement), fire-rated assemblies and their structural support, egress stair and shaft structures, and seismic bracing of sprinkler piping. The structural engineer also designs the fire-protection water storage tanks and supports where on-site storage is required"
        : `Fire access and water supply: apparatus access roads with turning templates and load-bearing pavement, hydrant placement per ${c} spacing rules, fire-flow analysis proving the water system delivers, and Knox-box/gate access for secured sites. The civil fire-access plan is often the fire marshal's first review item — access problems kill projects before the building is even discussed`;
      return [
        ["The fire marshal's authority", `In ${c}, the fire department reviews and approves fire-protection systems independently of building plan check — and can hold the certificate of occupancy. Under ${sc.codeRef} plus NFPA standards and ${s} amendments, the submittal includes sprinkler/standpipe plans with hydraulics, alarm plans, access plans, and water-supply data. Engaging the fire marshal's requirements during design (not at final inspection) is the difference between approval and redesign.`],
        [`The ${cp.name} interface with fire protection`, `For fire-protection work in ${c}, ${angle}. The coordination that fails most: sprinkler head locations vs. structural beams, ductwork, and lighting in the reflected ceiling plan — the fire-protection designer needs the final RCP and structural framing, not early schematics.`],
        ["Hazard classification drives everything", `Sprinkler design starts with classifying what's stored or done in the space — light hazard, ordinary, extra hazard, or high-piled storage commodities. The classification sets water density, head spacing, and supply requirements. Misclassifying (or designing before the tenant's operation is known) produces systems that don't match the hazard — the most dangerous and expensive fire-protection error.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do I need sprinklers in ${c}?`, `Most new commercial construction and many residential types — yes, under current ${s} codes, with the specific standard (NFPA 13, 13R, 13D) set by occupancy and height. Existing buildings face retrofit triggers on change of occupancy or major renovation. Verify with ${c}'s current amendments during concept design.`],
      [`What is a hydraulic calculation?`, `The engineering analysis proving the sprinkler system delivers required water density at the most remote heads given the available supply — pipe sizes, friction losses, and supply curve all modeled. ${c} fire reviewers check hydraulics before anything else; it's the mathematical proof the system works.`],
      [`Who reviews fire protection in ${c}?`, `Typically the fire department/fire marshal separately from building plan check — sprinklers, alarms, access, and water supply each get fire review. Some jurisdictions consolidate; ${c}'s process should be confirmed at project start so submittals go to the right reviewers in the right sequence.`],
    ],
  },

  "building-envelope": {
    title: (t, c, a) => `Building Envelope in ${c}, ${a}`,
    desc: (t, c, s) => `Building-envelope engineering in ${c}, ${s}: waterproofing, cladding support, air barriers, and moisture management for ${t.toLowerCase()}.`,
    h1: (t, c, a) => `Building envelope in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The building envelope — everything separating inside from outside — is where water intrusion lawsuits are born. Envelope engineering in ${c} coordinates waterproofing, cladding, air barriers, and drainage across disciplines. Here's the scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Envelope-driven loads: the mechanical engineer sizes HVAC from the envelope's actual thermal performance (glazing ratios, insulation values, air leakage), and condensation analysis at envelope interfaces prevents the moisture problems that rot buildings from the inside. Penetrations for MEP through the air and water barriers get detailed — every pipe and duct through the envelope is a potential leak drawn on purpose"
        : p === "structural"
        ? `Cladding support engineering: curtain-wall anchors, brick-veneer ties, stucco lath attachment, and wind-load design for components and cladding per ASCE 7. The structural engineer designs what holds the skin on — and in ${c} wind/seismic, cladding anchorage is life-safety engineering, not facade detailing`
        : "Grade-level envelope protection: grading that drains away from walls (the first waterproofing), foundation waterproofing and drainage coordination, plaza and podium waterproofing with drainage composites, and hardscape slopes at entrances. Most envelope failures start at grade — the civil grading plan is waterproofing's first line of defense";
      return [
        ["Water management, not waterproofing", `Modern envelope practice in ${c} designs water management: deflection (keep it off), drainage (give it a path down and out), drying (let what gets in escape), and durable materials where it lingers. Under ${sc.codeRef}, the details that matter are transitions — window-to-wall, wall-to-roof, wall-to-foundation — where different trades' work meets. The envelope consultant (or the engineer acting as one) details the transitions; the field verifies them with testing.`],
        [`The ${cp.name} interface with the envelope`, `For envelope work in ${c}, ${angle}. The organizational problem: the envelope belongs to no single trade, so it belongs to everyone badly. Successful ${c} projects assign envelope responsibility explicitly — details, submittal review, and field testing under one accountable party.`],
        ["Testing and commissioning", `Envelope performance gets verified: water-spray testing of windows and curtain wall (AAMA 501.2), whole-building air-barrier testing where ${s} energy code requires it, and flood testing of podium decks. The testing plan is specified in the construction documents — and failed tests get fixed before concealment, not litigated after occupancy.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What causes most building-envelope failures?`, `Transitions and penetrations: where windows meet walls, walls meet roofs, pipes penetrate barriers — the details between trades' scopes. Material failures are rare; detailing and installation failures at interfaces are the pattern. That's why envelope engineering focuses on transitions, not just material selection.`],
      [`Who designs cladding attachment?`, `The structural engineer — curtain-wall anchors, veneer ties, and cladding supports are designed for wind (components and cladding) loads per ASCE 7, plus seismic. The architect selects the cladding system; structural engineers its attachment. In ${c}'s wind/seismic environment, this is life-safety work.`],
      [`What is an air barrier and why does energy code care?`, `A continuous plane controlling air leakage through the envelope — critical for both energy performance and moisture control. ${s} energy code increasingly requires air-barrier detailing and sometimes whole-building testing. Leaky envelopes waste the HVAC engineer's careful load calculations.`],
    ],
  },

  "retaining-wall": {
    title: (t, c, a) => `Retaining Walls in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered retaining-wall design in ${c}, ${s}: calculations, drainage, and permits for walls that hold back ${t.toLowerCase()} sites.`,
    h1: (t, c, a) => `Retaining walls in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Retaining walls in ${c} are structural engineering holding back the site — and the most common source of neighbor disputes in hillside and tight-lot construction. Here's the retaining-wall scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Drainage behind the wall: perforated backdrain piping, drainage composite, and outlet routing — because hydrostatic pressure doubles the lateral load when drains clog or were never installed. The MEP-adjacent scope is really plumbing: the wall's drain system gets designed like a building drain, with cleanouts and positive outlets, not as an afterthought"
        : p === "structural"
        ? `The wall design itself: cantilever, gravity, segmental (MSE), or soldier-pile systems selected from the soils report; calculations for overturning, sliding, bearing, and global stability; seismic increment per ${s} requirements; and construction-phase shoring where the wall goes in near existing structures. Walls over 4 feet (from footing bottom) need engineered design and permits in ${c} — the calculation package is the submittal`
        : "Wall layout on the grading plan, global slope stability above and below the wall, surface drainage directed away from the wall face, and property-line coordination — walls near lines need neighbor agreements or fall entirely on the owner's side. The civil engineer also designs the temporary shoring that keeps the excavation open while the wall is built";
      return [
        ["Drainage is structural", `The geotechnical truism: most retaining-wall failures are drainage failures. Water behind a wall adds hydrostatic pressure the design didn't include — doubling or tripling lateral loads. Under ${sc.codeRef}, ${c} requires backdrain systems with positive outlets on engineered walls, and reviewers check the drainage detail as carefully as the structural calcs. A wall without drainage is a future failure with a construction schedule.`],
        [`The ${cp.name} interface with retaining walls`, `For wall work in ${c}, ${angle}. The critical coordination: the wall's backdrain outlet must connect to the site storm system — which means the civil engineer needs the wall's drainage design during grading design, not after the wall is built.`],
        ["Tiered walls and surcharges", `Tall grade changes in ${c} often use tiered walls — but tiers interact: the upper wall surcharges the lower, and the global stability analysis must consider the system, not each wall alone. Surcharges from buildings, driveways, or slopes above the wall get included in the lateral pressures. The soils report defines the parameters; the structural engineer analyzes the whole system.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`When does a retaining wall need engineering in ${c}?`, `Typically over 4 feet measured from the bottom of the footing — engineered design, calculations, and permits required. Segmental (block) walls, cantilever concrete, and soldier-pile walls all need engineering above the threshold; the wall type is selected from soils, height, and site constraints.`],
      [`Why do retaining walls fail?`, `Overwhelmingly: water. Missing or clogged backdrains let hydrostatic pressure build behind the wall, exceeding the design loads. Other causes include unaccounted surcharges, inadequate foundations, and global slope instability. The engineering prevents all four — if it's followed during construction.`],
      [`Can I build a retaining wall on the property line?`, `Only with careful coordination — footings often extend beyond the wall face, and construction access needs the neighbor's side. ${c} typically requires walls to be entirely on the owner's property unless easements exist. Resolve property-line walls with the survey and neighbor agreements before design advances.`],
    ],
  },

  "pavement-design": {
    title: (t, c, a) => `Pavement Design in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered pavement design in ${c}, ${s}: parking-lot sections, heavy-duty concrete, and ADA-compliant accessible routes.`,
    h1: (t, c, a) => `Pavement design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Pavement in ${c} fails from the bottom up — weak subgrade, thin sections, or water underneath — and the repair costs multiples of proper design. Here's the pavement engineering scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Pavement-adjacent MEP: site-light pole bases in paved areas, EV-charging conduit under pavement (trench before paving, not cut after), and drainage inlets set to finish pavement grades. The MEP site work must be installed and inspected before the pavement section goes down — sequencing the underground before the surface"
        : p === "structural"
        ? "Heavy-duty pavement engineering: concrete sections for truck courts, loading docks, and fire lanes — designed as slabs-on-grade for wheel loads with joint layouts that control cracking. Dock aprons and trash-enclosure pads get thickened concrete; the structural engineer designs these rigid pavements while civil handles the flexible (asphalt) areas"
        : `The pavement design itself: subgrade evaluation from the soils report, section design (asphalt thickness over base over subgrade) by traffic index, concrete sections for heavy-duty areas, grading for drainage (no birdbaths — minimum slopes enforced), and striping, signage, and ADA accessible routes. Under ${sc.codeRef} plus ${c} standards, the civil plans show sections, grades, and details the contractor builds to`;
      return [
        ["Subgrade is the pavement", `The soils report's subgrade recommendation governs ${c} pavement design: R-values or modulus, expansive-soil treatment, and compaction requirements. Under ${sc.codeRef}, the section (asphalt and base thicknesses) is calculated from traffic index and subgrade strength — not selected from habit. Pavements built on unprepared or wet subgrade fail regardless of surface thickness; the design addresses the foundation first.`],
        [`The ${cp.name} interface with pavement`, `For pavement work in ${c}, ${angle}. The sequencing rule: all underground utilities installed, tested, and inspected before any base or pavement — and the civil engineer holds the pre-paving inspection. Cutting new pavement for forgotten utilities is the most visible construction failure there is.`],
        ["ADA: slopes are the design", `Accessible parking, routes, and ramps in ${c} are governed by slopes: 2% max cross-slope, 8.33% max ramp running slope, with landing and detectable-warning details. The civil engineer designs the finish grades to hit these numbers — and specifies construction tolerances tighter than standard grading, because a 2.5% as-built cross-slope is a violation, not close enough.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How thick should parking-lot asphalt be in ${c}?`, `Calculated from the traffic index and subgrade strength — not a standard number. Car-only areas differ from truck courts and fire lanes. The civil engineer designs the section from the soils report and expected traffic; ${c} reviewers check the design method, not just the thickness.`],
      [`Why do new parking lots crack?`, `Usually: inadequate subgrade preparation, thin sections for the actual traffic, missing or wrong joint layout in concrete areas, or water under the pavement. All four are design and construction-quality issues — properly designed and built pavement doesn't crack prematurely.`],
      [`What makes pavement ADA-compliant?`, `Slopes (the critical factor), accessible stall dimensions and access aisles, compliant routes from stalls to entrances, curb ramps with detectable warnings, and signage. The civil engineer designs the grades; the contractor builds to tight tolerances; the CASp or inspector verifies. Slope failures are the most common ADA pavement violation.`],
    ],
  },

  "solar-design": {
    title: (t, c, a) => `Solar PV Design in ${c}, ${a}`,
    desc: (t, c, s) => `Solar PV engineering in ${c}, ${s}: rooftop and ground-mount structural, electrical interconnection, and permit-ready ${t.toLowerCase()} coordination.`,
    h1: (t, c, a) => `Solar PV design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Solar in ${c} is two engineering projects: the electrical system that generates power, and the structural system that holds it to the building through wind and seismic events. Here's the solar scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `The electrical heart: array layout and stringing, inverter selection (string vs. micro), DC and AC conduit routing, point-of-interconnection design with load-side or supply-side taps, rapid-shutdown compliance per NEC 690, and utility interconnection applications. The one-line diagram plus calculations is the electrical submittal — ${c} and the utility both review it`
        : p === "structural"
        ? `Rooftop structural verification: can the roof carry the array's dead load plus wind uplift and seismic forces? Ballasted vs. attached vs. penetrating mounts — each with different structural implications. In ${c}, older roofs often need reinforcement before solar; the structural letter or analysis is a standard ${c} permit requirement. Ground-mount systems get foundation design from the soils report`
        : "Ground-mount site work: array foundations and access roads, grading for drainage around arrays, fencing and security, and environmental review where applicable. Rooftop projects need minimal civil scope — but carport solar over parking lots is civil-structural: canopy structures, foundations, drainage, and lighting underneath";
      return [
        ["Structure first, panels second", `The sequence that works in ${c}: structural verification of the roof, then electrical design, then permit. Under ${sc.codeRef} plus NEC Article 690, the building department checks structural adequacy for the added loads and wind uplift — and ballasted systems in high-wind zones need engineering proving they stay put. Discovering the roof can't carry solar after the electrical is designed wastes the entire design fee.`],
        [`The ${cp.name} interface with solar`, `For solar work in ${c}, ${angle}. The utility interconnection is the schedule risk: applications, engineering review, meter upgrades, and permission to operate run on the utility's timeline — often months. Submit interconnection applications during design, not after permit issuance.`],
        ["NEC 690: the rapid-shutdown era", `Current electrical code requires module-level rapid shutdown — the array must de-energize to safe levels within the array boundary on command. This drives equipment selection (microinverters or optimizers vs. string inverters with separate devices) and the system architecture. The electrical design complies with the code cycle ${c} has adopted; older design templates don't transfer.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Can my roof support solar panels in ${c}?`, `Depends on the roof structure, age, and the array weight plus wind/seismic loads. A structural engineer evaluates the existing framing against the added loads — many roofs can, some need reinforcement, a few can't. The structural assessment comes before system design, not after.`],
      [`What is the utility interconnection process?`, `Application to the utility with the system one-line, utility engineering review, possible meter/service upgrades, installation, inspection, then written permission to operate. Timelines run weeks to months in ${s} — it's frequently the project's critical path.`],
      [`Ballasted vs. attached rooftop solar — which is better?`, `Ballasted avoids roof penetrations but adds more dead load and needs wind engineering proving uplift resistance; attached uses fewer pounds but penetrates the roof (with flashed attachments). The structural engineer recommends based on the roof structure, wind exposure, and ${c}'s requirements.`],
    ],
  },

  "ev-charging": {
    title: (t, c, a) => `EV Charging Design in ${c}, ${a}`,
    desc: (t, c, s) => `EV-charging engineering in ${c}, ${s}: service capacity, load management, accessible stall layout, and utility coordination.`,
    h1: (t, c, a) => `EV charging design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `EV charging in ${c} is an electrical capacity project wearing a parking-lot costume — the chargers are the easy part; the service, distribution, and utility coordination are the engineering. Here's the EV scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Service capacity analysis: can the existing service carry the charging load, or is an upgrade needed? Load-management systems that share capacity across chargers, new panelboards and distribution, and coordination with the charger vendor on power requirements. DC fast charging is a different animal from Level 2 — 50–350 kW per port vs. 7–19 kW — and the electrical design treats them as separate projects"
        : p === "structural"
        ? "Equipment pads for chargers and switchgear, canopy structures over charging stalls where provided, bollard protection for equipment, and wall-mount structural verification in parking structures. The structural scope is site-equipment support — straightforward, but it needs to be in the permit set"
        : `Charging-stall layout: quantities per ${c} and ${s} code (which keep increasing), accessible EV stall design (the accessibility rules for EV are specific and evolving), striping and signage, conduit routing under pavement, and coordination with the overall parking count. The civil plan locates every stall, pedestal, and conduit run — and proves the site still meets parking requirements after conversion`;
      return [
        ["Capacity study first", `EV charging engineering in ${c} starts with the capacity study: existing service size, spare capacity, and the charging load with diversity. Under ${sc.codeRef} plus ${s} code, many projects trigger EV-ready or EV-installed requirements by parking count — the code sets minimums, but the market often wants more. The study answers the fundamental question: upgrade the service, manage the load, or both.`],
        [`The ${cp.name} interface with EV charging`, `For EV work in ${c}, ${angle}. The utility is the schedule driver: service upgrades for DC fast charging involve utility engineering, transformer lead times, and construction windows measured in months. Start utility coordination the day the project is conceived.`],
        ["Load management vs. service upgrade", `Power-sharing load management can often double or triple the charger count on a given service — at lower per-port speed during coincident use. The engineering economics: load management hardware vs. utility service upgrade costs and timelines. For many ${c} commercial sites, managed Level 2 avoids a six-figure service upgrade entirely.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How many EV chargers does my project need in ${c}?`, `${s} code and ${c} amendments set minimum EV-capable, EV-ready, and EV-installed stall counts by occupancy and parking total — and the numbers increase every code cycle. Check the current adopted code; last cycle's minimums are already outdated.`],
      [`Can my building's electrical service handle EV chargers?`, `Sometimes for a few Level 2 ports; rarely for banks of chargers or DC fast charging without analysis. The capacity study — existing loads vs. service rating vs. proposed charging — gives the definitive answer. Assume nothing; the service was sized for the building, not the building plus a fueling station.`],
      [`What are the accessibility requirements for EV stalls?`, `A portion of EV stalls must be accessible, with specific dimensions, slopes, and access-aisle requirements that differ slightly from standard accessible stalls. ${s} has detailed EV-accessibility standards — the civil engineer designs them into the stall layout from the start.`],
    ],
  },

  "low-voltage": {
    title: (t, c, a) => `Low-Voltage Design in ${c}, ${a}`,
    desc: (t, c, s) => `Low-voltage systems design in ${c}, ${s}: data, security, AV, and access control infrastructure for ${t.toLowerCase()} projects.`,
    h1: (t, c, a) => `Low-voltage design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Low-voltage in ${c} is the building's nervous system — data, voice, security, access control, AV — and it's engineered as infrastructure even when the electronics come later. Here's the low-voltage scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "The design core: telecommunications rooms sized and located per TIA standards, pathway design (conduit, cable tray, J-hooks) with fill calculations, grounding and bonding per TIA-607, and coordination with the electrical engineer on dedicated power and cooling for IT rooms. The pathway infrastructure goes in during construction — pulling cable later is easy; adding pathway later is demolition"
        : p === "structural"
        ? "Supports for low-voltage infrastructure: cable-tray supports and seismic bracing, equipment-rack anchorage, wall-mount backboard supports, and rooftop antenna/mast structures with wind design. The structural scope also covers the telecommunications room itself where it's a hardened or rated space"
        : "Site low-voltage: gate access and intercom conduit, perimeter camera conduit and pole bases, parking-garage emergency phones, and site-wide fiber duct banks. The civil site plan routes the underground pathways — coordinated with wet utilities so the data conduit doesn't cross the sewer at the same elevation";
      return [
        ["Infrastructure now, electronics later", `Low-voltage engineering in ${c} designs the permanent infrastructure — rooms, pathways, grounding, power, cooling — while specific electronics (cameras, servers, AV gear) are often owner-furnished later. Under ${sc.codeRef}, the permit set shows the infrastructure; the electronics get specified or deferred. The expensive mistake is finishing construction without pathways: surface-mounted raceway in a new building is a visible failure of planning.`],
        [`The ${cp.name} interface with low-voltage`, `For low-voltage work in ${c}, ${angle}. The coordination document is the RCP and the reflected plans: every camera, WAP, speaker, and card reader needs a ceiling or wall location coordinated with lighting, HVAC, and structure — decided during design, not during trim-out.`],
        ["The IT room: a mechanical project", `Telecommunications rooms are cooling projects disguised as closets: heat loads from switches and servers, dedicated cooling (not building HVAC overflow), UPS power, and access for maintenance. The MEP engineer sizes the room's systems from the IT heat load — and the architect sizes the room from the equipment layout. Undersized IT rooms with no cooling are the most common low-voltage-adjacent failure in ${c} commercial buildings.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What low-voltage systems need engineering in ${c}?`, `At minimum the infrastructure: telecom rooms, pathways, grounding. Systems commonly engineered: access control, intrusion detection, video surveillance, AV, nurse call (healthcare), DAS (large buildings). The permit set covers infrastructure; specific systems may be design-build by specialty contractors with engineer review.`],
      [`Who designs the data network electronics?`, `Typically the owner's IT consultant or a design-build low-voltage contractor — the engineer provides the infrastructure (rooms, pathways, power, cooling) and performance specifications. The boundary is defined in the contract documents to avoid gaps.`],
      [`Why do IT rooms overheat?`, `Because they were designed as closets, not equipment rooms: no dedicated cooling, no ventilation, heat loads nobody calculated. The engineering fix is treating every telecom room as a small mechanical project — load calc, dedicated cooling, monitoring. It's cheaper than replacing cooked switches.`],
    ],
  },

  "septic-design": {
    title: (t, c, a) => `Septic System Design in ${c}, ${a}`,
    desc: (t, c, s) => `Engineered septic and onsite wastewater design in ${c}, ${s}: perc testing, drainfield sizing, and health-department permits.`,
    h1: (t, c, a) => `Septic system design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Where sewers don't reach in ${s}, the septic system is the project's private wastewater utility — engineered from soil tests, sized to the building's flows, and permitted through the health department. Here's the septic scope and its ${cp.blurb} interfaces in ${c}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Building-to-tank interface: the plumbing engineer designs the building sewer to the septic tank inlet at the invert elevation the civil design sets — and sizes any effluent pumps or grinder systems where gravity doesn't work. The plumbing/septic handoff is an invert elevation on the drawings; getting it wrong means sewage that doesn't flow"
        : p === "structural"
        ? "Tank structural design: septic tanks under driveways or traffic areas need traffic-rated (H-20) structures — the structural engineer verifies or designs the tank for the loading. Pump chambers, risers, and access structures get structural attention where they're buried deep or trafficked. The structural scope is small but critical: a collapsed tank under a driveway is a catastrophic (and literal) mess"
        : `The system design itself: percolation testing and soil-profile analysis, daily flow calculations from the building's fixture count and use, drainfield sizing and layout per ${c} health-department standards, reserve-area designation (required — the replacement field), and the permit package the health department reviews. Under ${sc.codeRef} plus county environmental health rules, the design proves the soil can absorb the effluent for the system's design life`;
      return [
        ["Soils determine everything", `Septic design in ${c} starts with the soil: perc rates, soil profile, groundwater depth, and setback constraints (wells, streams, property lines, buildings). The health department's design standards translate soil capacity into drainfield size — poor soils mean larger fields or advanced treatment. Under ${sc.codeRef} and county rules, the site evaluation comes before the building is sited, because the drainfield location and reserve area shape the entire site plan.`],
        [`The ${cp.name} interface with septic`, `For septic work in ${c}, ${angle}. The site-planning rule: locate the primary drainfield and the 100% reserve area first, then design the site around them. Projects that site the building first and "find room" for septic later discover the setbacks don't work — and redesigning a site around a failed septic layout is the most expensive civil revision there is.`],
        ["Advanced treatment", `Poor soils, high groundwater, or nitrogen-sensitive watersheds in ${s} trigger advanced treatment units (ATUs) — engineered systems beyond conventional gravity drainfields. ATUs add mechanical components, power requirements, monitoring, and maintenance contracts. The civil engineer designs the system; the owner maintains it under a health-department operating permit. Know the watershed's requirements before buying the land.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How is a septic system sized in ${c}?`, `From the building's design flow (bedrooms for residential, fixture units and use for commercial) and the soil's absorption capacity (perc rate). The health department's standards convert flow + soil into drainfield square footage. Plus a 100% reserve area for the replacement field — required, not optional.`],
      [`What is a perc test?`, `A field test measuring how fast soil absorbs water — the fundamental input to drainfield sizing. Performed by qualified professionals per county protocol, often with witnessed tests. Failing perc doesn't necessarily kill a project, but it changes the system type and cost significantly.`],
      [`Can I build over a septic drainfield?`, `No — no structures, paving, or heavy traffic over drainfields or reserve areas. Compaction destroys the soil's absorption capacity. The site plan protects both areas permanently; the civil engineer shows them as restricted zones on the drawings.`],
    ],
  },

  "commissioning": {
    title: (t, c, a) => `Building Commissioning in ${c}, ${a}`,
    desc: (t, c, s) => `Third-party building commissioning in ${c}, ${s}: functional testing, systems verification, and owner training for ${t.toLowerCase()} projects.`,
    h1: (t, c, a) => `Building commissioning in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Commissioning in ${c} is quality assurance for buildings: an independent agent verifies the engineered systems actually perform as designed before the owner accepts them. Here's the commissioning scope and its ${cp.blurb} interfaces in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `The commissioning core: functional performance testing of HVAC (airflows, temperatures, controls sequences, economizers), lighting controls verification, plumbing system tests, and fire-alarm/life-safety integration testing. The Cx agent writes the test procedures from the design intent — and the MEP systems get tested under load, not just started up. Most ${c} commissioning findings are controls issues: sequences that don't match the design`
        : p === "structural"
        ? "Envelope commissioning (where included): air-barrier testing, water-spray testing of fenestration, and verification of structural interfaces with commissioned systems — equipment anchorage, vibration isolation performance. The structural role in Cx is targeted: verifying the physical installations the MEP systems depend on"
        : `Site-systems commissioning: stormwater BMP verification (do the bioswales actually infiltrate?), irrigation system testing, site-lighting controls, and fire-water supply verification. The civil Cx scope proves the site infrastructure performs — increasingly required by ${c} for LID stormwater features that must function for the project's life`;
      return [
        ["What commissioning actually does", `A commissioning agent in ${c} works from the Owner's Project Requirements and the design intent: developing commissioning specs, reviewing submittals for commissionability, witnessing startup, executing functional tests, and documenting results. Under ${sc.codeRef} plus ${s} energy code (which mandates commissioning for larger buildings), Cx is both a code requirement and a quality investment. Industry data consistently shows commissioning catches deficiencies in the majority of new buildings — it's not an insult to the contractor, it's how complex systems get verified.`],
        [`The ${cp.name} interface with commissioning`, `For commissioning work in ${c}, ${angle}. The critical timing: the Cx agent joins during design (reviewing for testability and maintainability), not at project closeout. Commissioning specified after construction is forensic investigation; commissioning designed in is quality assurance.`],
        ["Existing-building commissioning", `Retro-commissioning (tuning existing buildings) and re-commissioning (re-verifying previously commissioned buildings) are often the highest-ROI engineering in ${c}: no capital construction, just finding the dampers stuck shut, the schedules running 24/7, the sensors lying. The Cx investigation typically pays for itself in energy savings within two years — it's the engineering equivalent of finding money.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Is commissioning required by code in ${s}?`, `For many commercial buildings — yes. ${s} energy code requires commissioning for buildings over certain sizes, with documentation at permit and completion. Beyond code, owners specify enhanced commissioning for quality assurance. Check ${c}'s current thresholds during design.`],
      [`What's the difference between commissioning and testing & balancing?`, `TAB verifies air and water flows match design; commissioning verifies the entire system performs its intended function — controls sequences, integration, efficiency, operability. TAB is a subset of the commissioning process, typically witnessed by the Cx agent.`],
      [`When should the commissioning agent be hired?`, `During design — ideally schematic or design development. Early involvement lets the Cx agent review the design for testability, maintainability, and OPR compliance. Hiring at construction completion reduces commissioning to punchlist, losing most of its value.`],
    ],
  },

/* DRAFT: 70 new Apex variation definitions — process & timeline (3/4) */

  "timeline": {
    title: (t, c, a) => `${t} Timeline in ${c}, ${a}`,
    desc: (t, c, s) => `How long does ${t.toLowerCase()} take in ${c}, ${s}? Realistic engineering and permit timelines from survey to approved plans.`,
    h1: (t, c, a) => `${t} timeline in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The most common question in ${c} engineering: "how long will this take?" The honest answer has three parts — design time, review time, and the decisions only the owner can make. Here's the realistic ${cp.blurb} timeline in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Design phase: what the engineer controls", `Engineering design in ${c} runs from notice-to-proceed to permit-ready documents. Small TI: 3–6 weeks. Custom home: 8–14 weeks. Commercial ground-up: 12–24 weeks. These assume the engineer has what they need: survey, soils, architectural backgrounds, equipment selections. Under ${sc.codeRef}, the design must be complete — ${c} doesn't accept partial submittals, and incomplete packages get rejected at intake, not reviewed.`],
      ["Review phase: what the city controls", `Plan check in ${c} runs in cycles: first review (typically 4–8 weeks for commercial), corrections by the engineer (2–4 weeks depending on comment depth), re-review (2–4 weeks). Two to three cycles is normal — ${sp.planCheck ? "and ${c}'s reviewers are thorough" : "plan for it"}. The schedule killer isn't review time, it's incomplete first submittals that generate avoidable correction cycles. Complete documents clear faster than fast documents.`],
      ["Owner decisions: the hidden critical path", `The timeline factor nobody budgets: owner decisions. Equipment selections, finish approvals, scope confirmations — every week of owner deliberation during design pushes the schedule a week. The fastest ${c} projects share one trait: an owner who answers questions in days, not weeks. The engineer's schedule and the city's schedule are predictable; the decision schedule is the variable.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`How long does engineering take in ${c}?`, `Design: 3–6 weeks for small TI, 8–14 for custom homes, 12–24+ for commercial ground-up. Plan check adds 2–4 review cycles at 4–8 weeks per cycle. Total engineering-through-permit: 3–9 months depending on project complexity and ${c}'s current review volume.`],
      [`Can engineering be expedited?`, `Sometimes — overtime design, over-the-counter reviews for small scopes, and third-party plan check where ${c} allows it. But expediting costs money and can't compress owner decisions or utility timelines. The honest fast track is a complete first submittal, not a rushed one.`],
      [`What delays engineering the most?`, `In order: late owner decisions, missing inputs (survey, soils, equipment), scope changes during design, and incomplete first submittals generating extra plan-check cycles. The engineer controls design efficiency; the owner controls decisions; the city controls review. All three have to move.`],
    ],
  },

  "process": {
    title: (t, c, a) => `Our Engineering Process in ${c}, ${a}`,
    desc: (t, c, s) => `How ${t.toLowerCase()} works in ${c}, ${s}: from first call and site visit through design, permits, and construction support.`,
    h1: (t, c, a) => `How ${t.toLowerCase()} works in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Hiring an engineer in ${c} shouldn't be mysterious. Here's exactly how ${cp.blurb} proceeds — what happens at each step, what we need from you, and what you get — from first call to final inspection in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Step 1–2: Consultation and proposal", `It starts with a conversation about the project: address, scope, timeline, what's driving the schedule. We typically visit the site — existing conditions tell us things drawings can't. Then a fixed-fee proposal listing every deliverable: ${sc.deliverables}. The proposal also states what's excluded and what we need from you (survey, soils, architectural backgrounds). No hourly open tabs, no vague scopes.`],
      ["Step 3–4: Design and coordination", `Design proceeds in phases you'll recognize: schematic (concepts and systems), design development (systems selected, coordination underway), construction documents (the permit set). At each phase, the disciplines coordinate — ${cp.blurb} doesn't happen in isolation. You'll review and approve at phase milestones; your decisions at these gates keep the schedule.`],
      ["Step 5–7: Permit, bid, and construction", `We submit to ${c}, respond to plan-check corrections (normal — it's the city's quality control, not a failure), and deliver the permitted set. During bidding we answer contractor questions; during construction we do site observations, review submittals, and handle the field questions that always arise. The permit isn't the finish line — the building is.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What do you need from me to start engineering?`, `Project address, scope description, survey and soils report (we'll tell you if you need them), architectural plans if they exist, and your timeline drivers. Equipment selections come during design. The more complete the inputs, the faster and more accurate the design.`],
      [`How do we communicate during the project?`, `A designated project engineer as your single point of contact, phase-milestone reviews for your approvals, and direct access for questions. You'll always know the status, the next decision needed, and the schedule impact of pending items.`],
      [`What happens if plan check has corrections?`, `We respond to them — it's included in the proposal. Plan-check corrections are the city's review doing its job; typical projects see 2–3 cycles. We track every comment to resolution and resubmit. You don't manage this process; we do.`],
    ],
  },

  "consultation": {
    title: (t, c, a) => `${t} Consultation in ${c}, ${a}`,
    desc: (t, c, s) => `Free initial ${t.toLowerCase()} consultation in ${c}, ${s}: feasibility, scope, fees, and honest answers before you commit.`,
    h1: (t, c, a) => `${t} consultation in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Before design, before fees, before commitments — a consultation answers the questions that determine whether the project works. Here's what a ${cp.blurb} consultation covers in ${c}, ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What we evaluate", `The consultation examines feasibility: zoning and code constraints at your ${c} address, the likely engineering scope (what's needed vs. what's nice), utility and site constraints visible from records, and the permit path — what approvals, what reviewers, what timeline. Under ${sc.codeRef}, some projects face triggers (seismic, flood, historic) that reshape scope; the consultation identifies them before money is spent.`],
      ["What you should bring", `Project address, any existing drawings or surveys, photos of the site and building, your goals and timeline, and the decisions driving the schedule. For TI: the lease and landlord requirements. For ground-up: the survey if you have it. Don't worry about organizing — the engineer knows what to ask.`],
      ["What you get", `An honest assessment: is the project feasible, what's the engineering scope, what will it cost (fixed fee, not a range), how long will it take, and what could go wrong. If the project doesn't need engineering, we'll tell you. If it needs a different engineer (geotechnical, say), we'll tell you that too. The consultation's value is candor — including "don't do this."`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Is the initial consultation really free?`, `Yes — the first conversation costs nothing and commits you to nothing. It's how we both determine fit: you evaluate us, we evaluate the project's feasibility. Serious engineering starts with honest scoping, not sales pressure.`],
      [`Should I consult before or after buying/leasing?`, `Before — always before. A pre-purchase or pre-lease consultation identifies engineering constraints (capacity, soils, code triggers, utility availability) while you still have leverage. The consultation fee is trivial compared to discovering fatal constraints after closing.`],
      [`What if I'm not sure I need an engineer?`, `That's exactly what the consultation determines. Bring the project description; we'll tell you whether engineering is required, recommended, or unnecessary — and which kind. We'd rather talk you out of unneeded engineering than sell it.`],
    ],
  },

  "quote": {
    title: (t, c, a) => `Get a ${t} Quote in ${c}, ${a}`,
    desc: (t, c, s) => `Fixed-fee ${t.toLowerCase()} quotes in ${c}, ${s}: what a real proposal includes, what drives the fee, and how to compare engineers.`,
    h1: (t, c, a) => `Get a ${t.toLowerCase()} quote in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Engineering quotes in ${c} vary wildly — and the cheapest quote is rarely the cheapest project. Here's how ${cp.blurb} fees work, what a legitimate proposal contains, and how to compare quotes in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What drives the fee", `Engineering fees in ${c} follow ${sc.feeNote} — not square footage alone. A 5,000-square-foot restaurant costs more to engineer than a 5,000-square-foot office because the systems are denser. Existing-building work costs more than new construction per square foot (investigation, verification, constraints). And ${c}'s review intensity affects the corrections-and-resubmittal effort baked into every fee.`],
      ["What a real proposal includes", `Every legitimate ${c} engineering proposal lists: the scope in plain language, every deliverable (${sc.deliverables}), the fee (fixed, not hourly-open), what's excluded, the schedule, how plan-check corrections are handled, and what inputs are needed from you. Proposals missing any of these are incomplete — and incomplete proposals generate the change orders that make "cheap" quotes expensive.`],
      ["How to compare quotes", `Compare scope letters line by line, not bottom lines. The low quote often excludes: plan-check corrections, construction observation, as-builts, or entire disciplines. Ask each engineer: what's excluded, how are corrections handled, who is the engineer in responsible charge, and can I see a sample deliverable? The best value in ${c} engineering is rarely the lowest fee — it's the most complete scope at a fair price.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Why do engineering quotes vary so much?`, `Because scopes vary. One quote includes plan-check corrections and construction support; another excludes them. One covers all disciplines; another covers one. The variation is in what's included, not in market pricing for identical work. Always compare the scope letters, not just the numbers.`],
      [`Fixed fee vs. hourly — which is better?`, `Fixed fee for defined scopes (design and permitting) — you know the cost upfront. Hourly for undefined scopes (forensic investigation, expert witness). Be wary of hourly design work: it transfers all the efficiency risk to you. Our design proposals are fixed-fee.`],
      [`What's a reasonable engineering fee?`, `It depends on ${sc.feeNote} — there's no universal percentage. As a sanity check: design fees are typically a small single-digit percentage of construction cost for commercial work, higher for small or complex projects. Quotes dramatically below market usually mean dramatically reduced scope.`],
    ],
  },

  "inspection": {
    title: (t, c, a) => `Engineering Inspections in ${c}, ${a}`,
    desc: (t, c, s) => `Special inspections and structural observation in ${c}, ${s}: what gets inspected, who inspects, and why ${t.toLowerCase()} requires it.`,
    h1: (t, c, a) => `Engineering inspections in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Engineered designs in ${c} get verified during construction — special inspections, structural observation, and deputy inspection aren't bureaucracy, they're how the design intent survives contact with the field. Here's the inspection landscape for ${cp.blurb} in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Special inspection vs. structural observation", `Special inspection (IBC Chapter 17) is continuous or periodic inspection by certified inspectors for critical work: structural steel, concrete, masonry, soils, spray-applied fireproofing, and more. Structural observation is the engineer of record's periodic site visits to verify general conformance. Under ${sc.codeRef}, ${c} identifies required special inspections on the permit — they're a condition of approval, not optional quality control.`],
      ["What gets inspected on your project", `Typical ${c} inspection scope: soils and compaction, concrete placement and reinforcement, structural steel bolting and welding, masonry, wood shear-wall nailing and holdowns, MEP rough-in (by trade inspectors), and energy-code measures (HERS verification). The inspection plan is in the permit documents — the contractor schedules inspections, the inspectors verify, and the engineer of record reviews reports.`],
      ["The observation visit: what the engineer checks", `Structural observation visits verify the big picture: is the lateral system being built as designed, are holdowns and connections installed per detail, is the load path continuous? The engineer isn't the inspector — inspectors check every weld, the engineer checks that the system works. Observation reports go to ${c} as part of the approval record.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Who pays for special inspections in ${c}?`, `The owner — typically contracted directly with the inspection agency (not through the contractor, to preserve independence). Budget it as a project cost alongside engineering; it's required by the permit and the costs are predictable once the inspection scope is defined.`],
      [`What's the difference between the city inspector and special inspector?`, `City inspectors verify code compliance at hold points (rough-in, final). Special inspectors provide continuous or periodic verification of specific critical work per IBC Chapter 17, employed by the owner. Both are required; neither replaces the other — or the engineer's observation.`],
      [`Can construction proceed without inspections?`, `No — covering work before required inspections draws stop-work orders in ${c}, and uncovering it costs far more than the inspection. The inspection schedule is in the permit documents; the contractor builds it into the construction sequence.`],
    ],
  },

  "design-build": {
    title: (t, c, a) => `${t} for Design-Build in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for design-build delivery in ${c}, ${s}: fast-track engineering, delegated design, and contractor collaboration.`,
    h1: (t, c, a) => `${t} for design-build in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Design-build in ${c} puts engineering and construction on the same team — faster, more collaborative, and demanding a different engineering approach. Here's how ${cp.blurb} works in design-build delivery in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["How design-build changes engineering", `In design-build, the engineer works for (or with) the contractor toward a GMP — which means designing to budget, not just to code. Under ${sc.codeRef}, the permit requirements don't change, but the process does: early contractor input on constructability, fast-track packages (foundations permitted while interiors are still designed), and delegated design for specialty systems. The engineer's role expands from designer to design-manager.`],
      ["Fast-track: phased permits", `${c} allows phased permit packages — grading, foundations, core-and-shell, TI — each submitted when ready rather than waiting for the complete set. The engineering strategy sequences the packages: early site and structural work unlocks construction while MEP and interiors catch up. Fast-track saves months but demands rigorous coordination: every package must anticipate the next one's requirements.`],
      ["Delegated design and design-assist", `Specialty systems (fire protection, structural steel connections, curtain wall, racking) are often delegated to specialty engineers working for subcontractors — with the engineer of record defining performance criteria and reviewing the delegated submittals. In ${c} design-build, the EOR's submittal-review role is critical: delegated designs must be checked against the overall building performance, not just their own scope.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Who does the engineer work for in design-build?`, `Typically the design-build contractor (as a subconsultant) or in a joint venture — contractually different from design-bid-build, where the engineer works directly for the owner. The engineer's professional obligations (public safety, code compliance, responsible charge) don't change with the contract structure.`],
      [`Does design-build save time in ${c}?`, `Usually — overlapping design and construction through phased permits compresses the schedule by months on commercial projects. The savings come from early contractor involvement and fast-track permitting, not from skipping engineering. ${c}'s phased-permit process enables it; the team's coordination discipline delivers it.`],
      [`What is delegated design?`, `When the engineer of record specifies performance criteria and a specialty engineer (working for a subcontractor) designs the system: steel connections, fire sprinklers, curtain walls. The EOR reviews for conformance with the overall design intent. It's standard in ${c} commercial work and explicitly permitted by code — with defined review responsibilities.`],
    ],
  },

  "plan-check-corrections": {
    title: (t, c, a) => `Plan Check Corrections in ${c}, ${a}`,
    desc: (t, c, s) => `We handle ${c} plan-check corrections for ${t.toLowerCase()}: fast, complete responses that clear review and get permits issued.`,
    h1: (t, c, a) => `Plan check corrections in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Plan-check corrections aren't failure — they're ${c}'s quality-control process working as designed. But slow or incomplete correction responses are the top avoidable source of permit delay. Here's how ${cp.blurb} corrections get handled in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What corrections mean", `A correction list from ${c} is the reviewer's verification notes: code sections to address, calculations to provide, details to clarify. Under ${sc.codeRef}, typical first-cycle corrections run 20–60 comments on commercial projects — normal, expected, and priced into every professional proposal. Corrections become a problem only when they're ignored, answered incompletely, or argued instead of addressed.`],
      ["The response method", `Every comment gets a written response: what was changed and where (sheet and detail reference), or a code-based explanation if the design already complies. The resubmittal includes revised drawings clouded at changes, updated calculations, and the response letter keyed to the comment numbers. ${c} reviewers check responses against comments systematically — organized responses clear faster than brilliant ones.`],
      ["Avoiding correction cycles", `The best correction strategy is prevention: complete first submittals with every calculation, detail, and code reference the reviewer needs. The second-best strategy is speed: responding to corrections in days, not weeks. ${sp.planCheck ? `${c}'s reviewers reward complete, prompt responses with faster re-reviews` : "Prompt, complete responses earn faster re-reviews"}. The project-killer is the partial response — answering 80% of comments just buys another full cycle.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Are plan-check corrections included in your fee?`, `Yes — normal correction cycles (typically 2–3 rounds) are included in our fixed-fee proposals. What's not included: redesign from owner scope changes disguised as corrections, or corrections caused by missing owner-provided inputs. The proposal defines the boundary.`],
      [`How long do corrections take?`, `Our response: typically 1–3 weeks depending on comment depth. ${c} re-review: typically 2–4 weeks per cycle. Two to three cycles is normal for commercial work. The fastest path through plan check is a complete first submittal — which is an engineering quality issue, not a city speed issue.`],
      [`Can I respond to corrections myself?`, `Only the engineer of record (or architect) can revise sealed documents and respond to technical corrections in ${c}. Owner responses to engineering comments aren't accepted — the seal carries the responsibility, so the sealed professional handles the responses.`],
    ],
  },

  "permit-expediting": {
    title: (t, c, a) => `Permit Expediting in ${c}, ${a}`,
    desc: (t, c, s) => `Permit expediting in ${c}, ${s}: the honest strategies that actually shorten ${t.toLowerCase()} approval timelines.`,
    h1: (t, c, a) => `Permit expediting in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Everyone wants permits faster in ${c}. Here's the truth about expediting: some strategies genuinely work, some are expensive theater, and the biggest time-saver isn't called expediting at all. The ${cp.blurb} perspective from ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What actually works", `Pre-submittal meetings with ${c} reviewers (align on requirements before drawing), complete first submittals (the #1 schedule strategy), over-the-counter permits for qualifying small scopes, phased permits separating site/foundation from building, and third-party plan check where ${c} allows it. Under ${sc.codeRef}, none of these lower the standard — they remove process friction, which is where most delay lives.`],
      ["What doesn't (but gets sold)", `Paying a "permit runner" to stand in line doesn't speed engineering review. Submitting incomplete drawings "to get in the queue" backfires — ${c} rejects at intake or issues massive correction lists that take longer than waiting to submit complete. And pressuring reviewers rarely helps; organized, responsive submittals do. The expediting industry's dirty secret: most delay is incomplete documents, not city slowness.`],
      ["The pre-submittal meeting", `The highest-ROI expediting investment in ${c}: a pre-submittal conference with planning, building, fire, and public works reviewers walking through the project concept. You learn the triggers (historic, flood, traffic, utility), the submittal requirements, and the reviewers' hot buttons — before spending on design. Projects that pre-submittal permit faster because they were designed for the actual requirements, not assumed ones.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Can you guarantee a permit timeline in ${c}?`, `No honest engineer can — the city controls review. What we guarantee: complete submittals, prompt correction responses, and proactive reviewer communication. Those three factors dominate the timeline, and they're all within our control.`],
      [`Is third-party plan check faster?`, `Often — where ${c} allows it, approved third-party reviewers can turn reviews in days instead of weeks. It costs more (you pay the reviewer), but on schedule-driven commercial projects the time savings justify it. We coordinate third-party review when the project economics favor speed.`],
      [`What's the fastest permit path for a small project?`, `Over-the-counter or express review for qualifying scopes: minor TIs, residential alterations, small additions. The key is qualifying — the scope must fit ${c}'s OTC criteria exactly, with complete documents. We tell you upfront whether your project qualifies.`],
    ],
  },

  "feasibility-study": {
    title: (t, c, a) => `Feasibility Studies in ${c}, ${a}`,
    desc: (t, c, s) => `Engineering feasibility studies in ${c}, ${s}: know what the site and building can support before you buy, lease, or design.`,
    h1: (t, c, a) => `Feasibility studies in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The cheapest engineering in ${c} is the study that kills a bad project before it starts — or confirms a good one before the money flows. Here's what ${cp.blurb} feasibility covers in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Site feasibility", `Before acquiring a ${c} site: zoning and entitlement constraints, utility capacity and will-serve status, soils and geohazard review, flood and environmental flags, access and traffic feasibility, and the permit path with realistic timelines. Under ${sc.codeRef}, code triggers (seismic retrofit, flood elevation, historic review) get identified here — when they're still negotiable, not after closing when they're just expensive.`],
      ["Building feasibility", `Before leasing or buying a building: structural capacity for the intended use, MEP system capacity and condition, code compliance of the occupancy change, accessibility upgrade scope, and the TI engineering budget. The feasibility visit documents existing conditions — because ${c} buildings' actual systems frequently differ from their drawings, and the difference is where TI budgets die.`],
      ["The feasibility deliverable", `A written report: findings, constraints, the engineering scope the project will need, order-of-magnitude fees, timeline, and fatal flaws if any. It's the document that lets you negotiate (price, TI allowance, contingencies) or walk away with confidence. Feasibility studies cost a fraction of one percent of project cost and prevent the six-figure surprises.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`When should I order a feasibility study?`, `During due diligence — before purchase or lease contingencies expire. The study needs 1–3 weeks; build it into the contingency timeline. Ordering feasibility after closing converts it from a decision tool into damage assessment.`],
      [`What does a feasibility study cost?`, `A fraction of the design fee — typically a few thousand dollars depending on scope. Compare that to discovering unbuildable soils, inadequate utilities, or a seismic retrofit mandate after acquisition. It's the highest-ROI engineering expenditure in development.`],
      [`Can feasibility be done from records, or is a site visit needed?`, `Both. Records research (zoning, utilities, permits, hazards) plus a site visit by the engineer. The visit catches what records miss: actual conditions, undocumented alterations, site constraints invisible on paper. Never waive the visit.`],
    ],
  },

  "site-assessment": {
    title: (t, c, a) => `Site Assessments in ${c}, ${a}`,
    desc: (t, c, s) => `Engineering site assessments in ${c}, ${s}: existing-conditions investigation that tells design what it's working with.`,
    h1: (t, c, a) => `Site assessments in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Every existing building in ${c} differs from its drawings — the question is how much, and whether it matters. A ${cp.blurb} site assessment documents reality before design commits to assumptions in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What gets investigated", `Structural: framing type and condition, lateral system identification, foundation signs of distress, roof structure capacity. MEP: panel schedules and spare capacity, HVAC equipment age and condition, plumbing materials and routing, fire-protection coverage. Site: grading and drainage patterns, pavement condition, utility locations, accessibility barriers. Under ${sc.codeRef}, the assessment also flags code triggers the new work will activate.`],
      ["Methods", `Visual survey, selective demolition (opening walls/ceilings to see structure and systems), review of available as-builts and permits (checked against field conditions, not trusted), measurements and photos, and sometimes testing (concrete cores, material sampling). The assessment is destructive enough to be accurate, limited enough to be economical — targeted openings, not gutting.`],
      ["The assessment report", `Findings organized by discipline, with photos: what's there, what condition it's in, what capacity remains, what must be replaced, and what the new design must accommodate. The report becomes the design basis — every assumption documented, every unknown flagged. ${c} reviewers accept designs based on assessed conditions; they reject designs based on assumed ones.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Why not just design from the existing drawings?`, `Because they're frequently wrong — undocumented alterations, as-built deviations, systems replaced without permits. Designing from unverified drawings is the top source of existing-building change orders in ${c}. The assessment verifies; the design follows reality.`],
      [`How much demolition is needed for an assessment?`, `Targeted: ceiling tiles lifted, small wall openings at structural connections, panel covers removed, roof probes. Enough to verify systems and structure, not enough to disrupt occupancy significantly. The scope is agreed with the owner before mobilization.`],
      [`Does the assessment include cost estimates?`, `It includes the engineering findings that drive costs: what needs replacement, what capacity exists, what code upgrades trigger. Detailed construction pricing comes from contractors — but the assessment gives them accurate scope to price, which is what prevents bid surprises.`],
    ],
  },

  "peer-review": {
    title: (t, c, a) => `Peer Review in ${c}, ${a}`,
    desc: (t, c, s) => `Independent engineering peer review in ${c}, ${s}: third-party verification that ${t.toLowerCase()} designs are sound, complete, and biddable.`,
    h1: (t, c, a) => `Peer review in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Peer review in ${c} is a second licensed engineer checking the first's work — not adversarial, but independent. Owners, lenders, and insurers use it to verify ${cp.blurb} before construction commits millions in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What peer review covers", `Design criteria and code compliance (right code, right occupancy, right loads), structural system adequacy (spot-check calculations on critical members), coordination (do the disciplines' drawings agree?), constructability (can it actually be built as drawn?), and completeness (is the set biddable and permittable?). Under ${sc.codeRef}, the reviewer checks compliance — not design elegance. The deliverable is a comment list, not a redesign.`],
      ["When peer review is required vs. chosen", `Required: ${c} mandates independent review for certain structures (high-rise, essential facilities, unusual systems). Chosen: owners order it for risk management on major projects, lenders require it for financing, and design-build teams use it for QA. Voluntary peer review on complex ${c} projects routinely pays for itself in caught errors — the reviewer finds what familiarity blinded the design team to.`],
      ["How it works", `The design team submits drawings and calculations; the reviewer works independently (no design-team influence on findings); comments go to the owner and design team; the design team responds; the reviewer verifies resolution. It's plan check by a hired expert — faster, more collaborative, and focused on the owner's risk, not just code minimums.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Is peer review an insult to the design engineer?`, `No — it's standard practice on significant projects, and good engineers welcome it. Complex ${c} projects have more interfaces than any one team can perfectly coordinate; independent review catches the inevitable gaps. Lenders and insurers often require it regardless of the design team's quality.`],
      [`What's the difference between peer review and plan check?`, `Plan check verifies code compliance for the city; peer review verifies design quality for the owner — including coordination, constructability, and completeness that exceed code minimums. They complement each other; neither replaces the other.`],
      [`When is peer review required in ${c}?`, `For designated structure types: typically high-rise, Risk Category III/IV, and structures with unusual lateral systems. Beyond mandates, owners choose it for any project where design errors would be expensive — which is most commercial work.`],
    ],
  },

  "as-built": {
    title: (t, c, a) => `As-Built Documentation in ${c}, ${a}`,
    desc: (t, c, s) => `As-built and record drawings in ${c}, ${s}: laser-measured documentation of what was actually constructed for ${t.toLowerCase()} owners.`,
    h1: (t, c, a) => `As-built documentation in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The building ${c} approved isn't quite the building the contractor built — field changes, substitutions, and routing adjustments accumulate. As-built documentation records reality for the ${cp.blurb} owner in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["As-builts vs. record drawings", `Contractor as-builts: the contractor's redlines showing field changes — required by most ${c} contracts but varying wildly in quality. Record drawings: the design team's verified update of the construction documents incorporating the as-builts — the authoritative document. Under ${sc.codeRef}, ${c} may require record drawings for the permit closeout on certain occupancies. Know which one your project needs.`],
      ["How as-builts get made", `Field verification: the engineer (or surveyor) measures and documents actual conditions — laser scanning for complex MEP, field measurement for structure and architecture, photo documentation. Then drafting: updating the construction documents to reflect verified conditions. The quality spectrum runs from contractor redlines to laser-scan BIM — matched to what the owner will use them for.`],
      ["Why owners need them", `Future TI design (the next tenant's engineer designs from reality, not from 2019 assumptions), facilities management (knowing where the shutoffs actually are), dispute resolution (what was actually built), and code compliance (proving the constructed condition). Buildings without as-builts pay for re-investigation on every future project — the documentation is an asset that appreciates.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Are as-builts required in ${c}?`, `Contractor as-builts are typically a contract requirement; record drawings may be a permit condition for certain occupancies. Beyond requirements, they're operational necessities — specify the as-built standard (redlines vs. verified record drawings) in the construction contract, not after completion.`],
      [`What's the difference between as-builts and a survey?`, `As-builts document the building's constructed condition (systems, structure, dimensions); surveys document the site (boundaries, topography, improvements). Both record reality, at different scales. Major ${c} projects need both at closeout.`],
      [`Can laser scanning replace manual as-builts?`, `For complex MEP and congested spaces — largely yes, and it's faster and more accurate. The scan produces a point cloud; the deliverable is still drafted drawings or a BIM model. Specify the deliverable format (2D drawings, 3D model, or both) when commissioning scanning.`],
    ],
  },

  "due-diligence": {
    title: (t, c, a) => `Due Diligence in ${c}, ${a}`,
    desc: (t, c, s) => `Engineering due diligence in ${c}, ${s}: property condition assessments that protect ${t.toLowerCase()} buyers and lenders.`,
    h1: (t, c, a) => `Engineering due diligence in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Buying a building in ${c} without engineering due diligence is buying the seller's problems at the seller's price. Here's what ${cp.blurb} due diligence investigates in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Property condition assessment", `The PCA documents: structural condition and distress, MEP system age/condition/capacity, envelope and roofing condition, site and pavement condition, accessibility compliance status, and code compliance of existing conditions. Under ${sc.codeRef}, the assessment also identifies triggers — what the buyer's planned changes will require (seismic retrofit, accessibility upgrades, fire protection). The deliverable follows ASTM E2018: immediate repairs, short-term replacements, and long-term reserves with costs.`],
      ["Beyond the building", `Zoning and entitlement verification (can you actually do what you plan?), utility capacity confirmation, environmental Phase I coordination (we coordinate with the environmental consultant on recognized conditions), flood and geohazard review, and permit-history research at ${c} (what was permitted, what wasn't — unpermitted work becomes the buyer's liability). The building is half the diligence; the site and entitlements are the other half.`],
      ["How diligence gets used", `Negotiation (price reductions, seller credits, repair escrows), financing (lenders require PCAs for commercial loans), budgeting (capital plans grounded in engineering, not optimism), and go/no-go decisions. The PCA's cost opinions — immediate, 1-year, 5-year, 12-year — become the buyer's capital budget. Deals that skip diligence don't save the fee; they transfer the risk at full price.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What is a Property Condition Assessment?`, `A standardized (ASTM E2018) engineering evaluation of a commercial building's physical condition: structure, MEP, envelope, site — with repair/replacement costs over immediate, short-term, and reserve terms. Lenders typically require them; smart buyers order them regardless.`],
      [`When should diligence happen?`, `During the contingency period — before it expires. The PCA needs 2–4 weeks including site visit and report. Build the engineering contingency into the purchase agreement; expiring contingencies before diligence completes forfeits the leverage the diligence creates.`],
      [`Does diligence include environmental?`, `We coordinate with environmental consultants (Phase I ESAs are their scope), and our assessment flags recognized conditions we observe. The two investigations run in parallel during due diligence — engineering condition and environmental condition are separate reports, often both lender-required.`],
    ],
  },

  "pre-design": {
    title: (t, c, a) => `Pre-Design Services in ${c}, ${a}`,
    desc: (t, c, s) => `Pre-design engineering in ${c}, ${s}: programming, massing studies, and systems concepts that set ${t.toLowerCase()} up right.`,
    h1: (t, c, a) => `Pre-design services in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The decisions made before design starts — site selection, massing, structural system, servicing strategy — determine 80% of a ${c} project's engineering cost and difficulty. Pre-design gets them right in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Programming and criteria", `Pre-design establishes: the program (spaces, sizes, adjacencies), the design criteria (codes, loads, performance targets), the site constraints (zoning envelope, soils, utilities, access), and the budget framework. Under ${sc.codeRef}, early code analysis identifies the occupancy, construction type, and triggers that shape everything downstream. Projects that skip programming design the wrong building efficiently.`],
      ["Systems concepts", `Before drawings: structural system selection (steel vs. concrete vs. wood vs. hybrid — decided on span, height, soils, and ${c} seismic/wind demands), MEP systems concepts (central vs. distributed, all-electric vs. mixed-fuel), and site servicing strategy (grading approach, utility routing, stormwater concept). These concept decisions, made with the engineer at the table, prevent the redesign loops where architecture meets engineering reality.`],
      ["The pre-design deliverable", `A basis-of-design document: program summary, code analysis, system selections with rationale, site strategy, budget implications of engineering choices, and the scope/schedule/fee for full design. It's the brief the design team executes — and the document that keeps value engineering from becoming de-engineering later.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Is pre-design a separate phase or part of design?`, `It can be either — but it should be explicit. As a separate engagement, pre-design produces the basis of design that the full design proposal responds to. As design's first phase, it's the programming and concepts milestone. Either way, name it and fund it; unnamed pre-design gets skipped.`],
      [`Who should be at the table during pre-design?`, `Owner, architect, structural/MEP/civil engineers, and (for commercial) the contractor or cost consultant. The whole team deciding systems together prevents the sequential handoffs where each discipline discovers the previous one's decisions too late.`],
      [`How does pre-design save money?`, `By deciding the expensive things cheaply: structural system selection, MEP concepts, and site strategy determined in weeks of study rather than months of redesign. Industry rule of thumb: decisions made in pre-design cost 1x; the same decisions revised during construction documents cost 10x; during construction, 100x.`],
    ],
  },

  "value-engineering": {
    title: (t, c, a) => `Value Engineering in ${c}, ${a}`,
    desc: (t, c, s) => `Real value engineering in ${c}, ${s}: reducing ${t.toLowerCase()} cost without reducing performance, safety, or lifespan.`,
    h1: (t, c, a) => `Value engineering in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Value engineering in ${c} has a bad reputation — earned by cost-cutting disguised as engineering. Real VE maintains function while reducing cost. Here's how ${cp.blurb} does it honestly in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What VE actually is", `Function analysis: for each system, what function does it serve, and what's the lowest-cost way to serve it? Under ${sc.codeRef}, the code-compliant function is non-negotiable — VE never reduces safety, structural capacity, or code compliance. Legitimate VE targets: over-designed systems (capacity beyond any credible need), inefficient configurations (routing, zoning, structural bays), and specification upgrades with no performance benefit.`],
      ["Where the real savings are", `Structural: bay spacing and system selection (the structural system is the biggest VE lever in ${c} commercial), foundation type, lateral system efficiency. MEP: right-sizing equipment (oversized is overspent), system selection (VRF vs. rooftop vs. chilled water at the right scale), controls strategies. Site: grading balance, utility routing, pavement sections. The savings are in system selection and configuration — decided early, not in finishes.`],
      ["VE vs. cost-cutting", `Cost-cutting removes scope and hopes nothing breaks: thinner slabs, smaller equipment, deleted testing. Real VE is re-engineered: same performance, lower cost through better design. The test: does the VE proposal include recalculations proving performance is maintained? If not, it's not value engineering — it's gambling with the owner's building. We do the former and refuse the latter.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`When should value engineering happen?`, `During design — schematic through design development. VE during construction documents is redesign; VE during construction is change orders. The earlier the VE workshop, the larger the savings and the smaller the disruption. ${c} projects that VE after permit waste the permit effort.`],
      [`Can VE compromise structural safety?`, `Never — and any proposal that does isn't VE. Structural VE optimizes the system (bay spacing, member efficiency, foundation type) while maintaining every code-required capacity. The recalculations prove it. If someone proposes reducing capacity, that's not engineering.`],
      [`Who should lead the VE workshop?`, `The design team with the contractor and owner — collaborative, not adversarial. The engineers bring system alternatives with cost and performance data; the team decides. VE imposed by non-engineers cutting line items is how buildings get compromised.`],
    ],
  },

/* DRAFT: 70 new Apex variation definitions — special situations (4/4) */

  "historic-building": {
    title: (t, c, a) => `${t} for Historic Buildings in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for historic buildings in ${c}, ${s}: adaptive reuse, seismic retrofit, and Secretary's Standards-compliant engineering.`,
    h1: (t, c, a) => `${t} for historic buildings in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Historic buildings in ${c} are irreplaceable — and structurally unforgiving. Adaptive reuse demands engineering that respects historic fabric while meeting modern code. Here's the ${cp.blurb} approach for designated and older buildings in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Systems threaded through historic fabric: minimal-invasion HVAC (high-velocity small-duct or ductless where chases can't be cut), electrical upgrades within existing walls, plumbing routed to avoid historic finishes, and fire-protection integrated without destroying character. The MEP design principle: reversibility and concealment — new systems that don't scar the building"
        : p === "structural"
        ? `The core discipline: seismic evaluation (ASCE 41) of URM, non-ductile concrete, or wood-frame historic structures; retrofit design sympathetic to historic fabric (center-core drilling, FRP, carefully placed steel); foundation underpinning where needed; and navigating the historic building code's alternative compliance paths. ${c} historic review boards scrutinize structural interventions — the design proves safety with minimal visual impact`
        : `Site work around historic resources: archaeology coordination where ${c} requires it, grading that doesn't undermine historic foundations, accessibility routes threaded through historic landscapes, and utility upgrades without trenching through historic features. The civil scope protects the setting as well as the structure`;
      return [
        ["The regulatory landscape", `Historic projects in ${c} navigate overlapping authorities: local historic designation review, the Secretary of the Interior's Standards (especially with tax credits), the California Historical Building Code or ${s} equivalent (offering alternative compliance), and standard building/fire codes. Under ${sc.codeRef}, the historic code provisions allow reasonable safety upgrades without full current-code compliance — but "reasonable" is negotiated with reviewers, not assumed. The entitlement strategy is designed alongside the engineering.`],
        [`The ${cp.name} scope for historic`, `For historic buildings in ${c}, ${angle}. Fees track ${sc.feeNote}; historic work carries investigation and review-response effort that new construction doesn't — every intervention is evaluated for both engineering adequacy and historic appropriateness.`],
        ["Tax credits change the engineering", `Federal and state historic tax credits (20%+ of qualified costs) make preservation finance work — but the Secretary's Standards review every intervention. Engineering that damages historic character (inappropriate storefront infill, destructive seismic work) can disqualify credits worth millions. The engineer designs to the Standards from day one; retrofitting the design for credit compliance after the fact rarely works.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do historic buildings have to meet current code in ${c}?`, `Not fully — the historic building code provides alternative compliance paths recognizing that full current-code compliance would destroy historic fabric. But life safety (egress, fire protection, seismic) must be addressed to a reasonable standard negotiated with ${c} reviewers. It's flexibility, not exemption.`],
      [`Can you add modern HVAC to a historic building?`, `Yes — with careful design: high-velocity small-duct systems, ductless splits, or strategically placed conventional systems using existing chases and non-character spaces. The engineering challenge is capacity without destruction; it's routinely solved but never trivially.`],
      [`What triggers seismic retrofit on historic buildings in ${s}?`, `Change of occupancy, major renovation thresholds, URM ordinances, or voluntary upgrade. Historic buildings often fall under both the retrofit ordinance and historic review — the engineering satisfies both: safety per ASCE 41, character per the Standards.`],
    ],
  },

  "flood-zone": {
    title: (t, c, a) => `${t} in Flood Zones in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for flood-zone construction in ${c}, ${s}: elevation certificates, floodproofing, and FEMA-compliant design.`,
    h1: (t, c, a) => `${t} in flood zones in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Building in a ${c} flood zone means designing for water — FEMA maps, base flood elevations, and floodplain regulations shape every discipline. Here's the ${cp.blurb} scope for flood-zone projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Flood-resistant MEP: electrical panels, HVAC equipment, and water heaters elevated above the base flood elevation (BFE) — no exceptions; flood vents for enclosed areas below BFE; backflow prevention on sewer connections; and emergency power located above flood level. The MEP flood design keeps every critical system dry in the design flood — equipment below BFE is a code violation and an insurance catastrophe"
        : p === "structural"
        ? `Elevation and floodproofing: lowest-floor elevation at or above BFE (documented by elevation certificate), breakaway walls for enclosures below BFE in coastal zones, foundation design for hydrostatic and hydrodynamic loads plus scour, and dry-floodproofing design (sealants, shields, structural reinforcement) for non-residential where permitted. The structural calculations address flood loads the building never sees on dry land — ${c} reviewers check them specifically`
        : "Floodplain civil work: elevation certificates (pre- and post-construction), no-rise analysis proving the project doesn't raise flood levels (required for floodway work), compensatory storage where fill displaces floodwater, site grading that doesn't divert water onto neighbors, and CLOMR/LOMR applications where maps need revision. The civil floodplain package is a FEMA-compliance exercise as much as a design";
      return [
        ["Know your zone", `Flood design in ${c} starts with the FIRM panel: Zone X (minimal), Zone A/AE (100-year, BFE established), Zone V/VE (coastal high-hazard, wave action), floodway (the channel — most restrictive). Under ${sc.codeRef} plus ${c}'s floodplain ordinance, each zone carries different elevation, construction, and use requirements. The zone determines the engineering — verify it from the current maps, not from memory or the seller.`],
        [`The ${cp.name} scope in flood zones`, `For flood-zone work in ${c}, ${angle}. Fees follow ${sc.feeNote}; floodplain analysis, elevation certificates, and floodproofing design add specialized scope beyond standard practice.`],
        ["Insurance: the financial engineering", `Flood-zone buildings live or die on NFIP flood insurance premiums — and elevation is everything. Building 2 feet above BFE vs. at BFE can halve premiums for the building's life. The engineering decision (how high to elevate) is also a financial decision: the owner should see the insurance math before the elevation is locked. In ${c}, elevation certificates document compliance and set the premium.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is base flood elevation (BFE)?`, `The computed elevation of the 100-year flood at the site, shown on FEMA maps for AE/VE zones. ${c} requires the lowest floor (including basement) at or above BFE — documented by a licensed surveyor's elevation certificate. Everything structural and mechanical follows from this number.`],
      [`Can I build in a floodway in ${c}?`, `Essentially no for new structures — floodways carry the deepest, fastest water and ${c} prohibits encroachments that raise flood levels. Some infrastructure and open uses are permitted with no-rise certification. Check the FIRM: floodway vs. flood fringe determines what's possible.`],
      [`What is dry floodproofing?`, `Making a non-residential building watertight below BFE: reinforced walls, sealed openings, flood shields for doors, sump systems. Permitted for commercial (not residential) in most ${c} flood zones, requiring engineered design and certification. It's an alternative to elevation — with its own maintenance and human-intervention requirements.`],
    ],
  },

  "hillside": {
    title: (t, c, a) => `${t} for Hillside Sites in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for hillside construction in ${c}, ${s}: slope stability, stepped foundations, retaining systems, and drainage that protects the slope.`,
    h1: (t, c, a) => `${t} for hillside sites in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Hillside sites in ${c} offer the views and the engineering challenges in equal measure — slope stability, stepped foundations, retaining walls, and drainage that must never destabilize the hill. Here's the ${cp.blurb} scope for hillside projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Hillside MEP challenges: stepped buildings need creative plumbing routing (gravity still works downhill — use it), retaining-wall drainage tied to the site storm system, pump systems where fixtures sit below the sewer, and equipment placement on terraced pads. The MEP design follows the stepped architecture — vertical zoning that matches the building's terraces"
        : p === "structural"
        ? `The structural heart: stepped or terraced foundations following the slope, retaining walls (often tiered) with global stability analysis, drilled piers where soils demand it, and lateral-force design for split-level diaphragms — the seismic behavior of stepped buildings is complex and gets modeled explicitly. ${c} hillside ordinances often trigger geotechnical and structural peer review; the design anticipates it`
        : `Slope-stability-driven civil work: grading plans that balance cut and fill without overloading slopes, surface drainage that never concentrates water on or above slopes, subsurface drainage (subdrains) intercepting groundwater, and erosion control during and after construction. Under ${sc.codeRef} plus ${c}'s hillside ordinance, the geotechnical engineer's slope-stability recommendations govern the grading — the civil plan executes them`;
      return [
        ["Water and slopes: the cardinal rule", `Hillside engineering in ${c} obeys one rule above all: never add water to a slope. Irrigation, drainage discharge, pool leaks, and broken pipes have caused more ${s} hillside failures than earthquakes. The civil drainage design keeps every drop controlled — roof water to the street, subsurface water intercepted, irrigation designed for the slope. Under ${sc.codeRef}, ${c} hillside review scrutinizes drainage as a stability issue, not a plumbing issue.`],
        [`The ${cp.name} scope for hillside`, `For hillside work in ${c}, ${angle}. Fees track ${sc.feeNote}; hillside projects carry geotechnical investigation, retaining design, and review-response effort that flat sites never see.`],
        ["The geotechnical partnership", `Hillside projects in ${c} are geotechnical-led: the soils engineer's slope-stability analysis, foundation recommendations, and drainage requirements shape the civil grading and structural foundations. The structural and civil engineers design within the geotechnical constraints — this isn't a suggestion, it's how ${c} hillside review works. Engage the geotechnical engineer before the architecture advances past concept.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What makes hillside construction more expensive?`, `Retaining systems, stepped foundations, deep piers, extensive drainage, geotechnical investigation, and longer review — typically 20–50% more site/structural cost than flat construction. The view premium funds the engineering premium; budget it from the start.`],
      [`Can I build on any slope in ${c}?`, `No — ${c} hillside ordinances limit grading quantities, pad sizes, retaining heights, and sometimes prohibit construction above certain slope ratios. Plus geotechnical feasibility: some slopes shouldn't be built on at any price. The feasibility study (with geotechnical input) comes before the land purchase.`],
      [`How is hillside drainage different?`, `Every drop is controlled: no sheet flow over slopes, subsurface drains intercepting groundwater, roof and surface water piped to the street or approved outlet. Concentrated discharge on or above a slope is prohibited — it's a stability threat, not just a drainage preference.`],
    ],
  },

  "high-wind": {
    title: (t, c, a) => `High-Wind Design in ${c}, ${a}`,
    desc: (t, c, s) => `High-wind engineering in ${c}, ${s}: wind-load design, cladding anchorage, and storm-resistant ${t.toLowerCase()} for exposed sites.`,
    h1: (t, c, a) => `High-wind design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Wind in ${s} isn't just weather — it's a structural design load that shapes framing, cladding, and equipment anchorage. Here's the high-wind ${cp.blurb} scope for exposed ${c} sites.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Wind-driven MEP: rooftop equipment anchorage for the design wind speed (curbs, straps, and attachments engineered — not just set), exhaust and vent caps rated for wind-driven rain, and emergency power for wind-event outages. Equipment that becomes a projectile in ${c} wind is a life-safety failure — the anchorage is engineered, inspected, and documented`
        : p === "structural"
        ? `The wind design core: main wind-force resisting system (MWFRS) for the building's overall stability, components and cladding (C&C) pressures for windows, roofing, and facade elements — which often exceed the MWFRS pressures. In ${c}'s wind climate, C&C design governs the envelope: every window, every roof edge, every cladding panel gets its wind pressure and its attachment designed`
        : `Site wind considerations: construction-phase protection (the building is most vulnerable half-built), temporary bracing and sequencing, wind-borne debris provisions where ${c} requires them, and landscape/hardscape that doesn't become projectiles. The civil role is construction-phase and site-furnishing wind safety`;
      return [
        ["MWFRS vs. components and cladding", `Wind engineering in ${c} designs two things: the main system keeping the building standing (shear walls, frames, diaphragms) and the components keeping the envelope attached (windows, cladding, roofing). Under ${sc.codeRef} (ASCE 7), C&C pressures at corners and roof edges can be 2–3x the main-system pressures — which is why envelopes fail while structures stand. Both get calculated; neither gets assumed.`],
        [`The ${cp.name} scope for high wind`, `For wind-exposed work in ${c}, ${angle}. Fees follow ${sc.feeNote}; wind-borne-debris regions and hurricane-prone zones add impact-rating and enhanced-anchorage scope.`],
        ["The construction-phase vulnerability", `Buildings under construction in ${c} wind season are at their weakest: sheathing incomplete, connections temporary, cladding absent. The structural engineer specifies construction-phase bracing and sequencing — and the contractor follows it. More wind damage happens to half-built structures than to completed ones; the engineering addresses the temporary condition, not just the final.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What wind speed is my building designed for in ${c}?`, `Per ASCE 7's wind maps for ${c}'s location and the building's risk category — the structural engineer determines the design wind speed and exposure category from the site. It's not a round number or a rule of thumb; it's mapped and calculated.`],
      [`Do windows need special rating for high wind?`, `In wind-borne-debris regions or high-wind zones — yes: impact-rated glazing or shutters, with design pressures from the C&C calculations. The window schedule references the required ratings; ${c} reviewers check them. Standard windows in debris regions are a code violation.`],
      [`How is rooftop equipment secured for wind?`, `Engineered anchorage: curbs with structural attachment, straps or clips rated for the uplift, all designed for the site's wind pressures. The mechanical contractor doesn't decide this in the field — the structural engineer details it on the drawings and it's inspected.`],
    ],
  },

  "snow-load": {
    title: (t, c, a) => `Snow-Load Design in ${c}, ${a}`,
    desc: (t, c, s) => `Snow-load engineering in ${c}, ${s}: roof design for snow, drift, and ice — ${t.toLowerCase()} for mountain and high-desert sites.`,
    h1: (t, c, a) => `Snow-load design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Snow in ${s}'s mountains and high country isn't scenery — it's the governing structural load, measured in feet and designed in pounds per square foot. Here's the snow-country ${cp.blurb} scope for ${c}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Snow-country MEP: roof drains and scuppers that function under snow (overflow paths that don't ice-dam), plumbing vents extended above snow depth, HVAC intakes and exhausts above the snow line, and heat-trace at critical drainage points. The MEP snow design keeps systems breathing and draining when the roof is buried — vents buried in snow are failed systems"
        : p === "structural"
        ? `The snow engineering core: ground snow loads from ASCE 7 maps or site-specific studies for ${c}'s elevation, balanced and unbalanced (drift) loading, sliding snow from upper roofs, rain-on-snow surcharge, and ice-dam considerations at eaves. Drift at parapets, penthouses, and roof steps often governs member sizes — the drift analysis is where snow engineering lives, not the uniform load`
        : "Site snow management: grading that doesn't create drift traps against the building, snow-storage areas in the site plan (plowed snow goes somewhere — designated, not improvised), emergency access maintained in snow season, and roof-drainage discharge that doesn't ice over walkways. The civil site plan designs for the snow season, not just the summer site visit";
      return [
        ["Drift governs", `Snow design in ${c} is drift design: wind piles snow against parapets, penthouses, and upper walls at 2–4x the uniform depth, and the structural members below get designed for it. Under ${sc.codeRef} (ASCE 7 Chapter 7), the engineer calculates drift widths and heights at every roof projection — the uniform snow load is the starting point, not the answer. Roof collapses in snow country are drift failures, not uniform-load failures.`],
        [`The ${cp.name} scope for snow country`, `For snow-load work in ${c}, ${angle}. Fees track ${sc.feeNote}; site-specific snow studies (for elevations above the mapped data) add specialized scope.`],
        ["The construction-season reality", `Snow-country ${c} projects face compressed construction seasons — foundations before freeze, roofing before snow, concrete with cold-weather provisions. The engineering specifies cold-weather construction requirements; the schedule respects the climate. Designing a snow-country building without a snow-country construction plan is designing half the project.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How much snow load does my roof need in ${c}?`, `From ASCE 7 ground-snow maps adjusted for ${c}'s elevation, exposure, and thermal condition — then drift analysis at projections. It varies enormously with elevation: valley floors and mountain sites are different engineering problems. The structural engineer calculates it; there's no county-wide number.`],
      [`What is snow drift and why does it matter?`, `Wind-redistributed snow piling against roof projections at multiples of the uniform depth — the governing load for many roof members. Drift is calculated at every parapet, penthouse, and roof step per ASCE 7. Ignoring drift is the classic snow-country structural error.`],
      [`Do I need to worry about ice dams?`, `Yes — ice dams at eaves cause the leaks that snow-country buildings are famous for. The defense: adequate insulation and ventilation (cold roof), air sealing, and waterproofing membranes at eaves. It's a thermal-envelope design issue the architect and mechanical engineer address together.`],
    ],
  },

  "expansive-soil": {
    title: (t, c, a) => `${t} on Expansive Soil in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for expansive-soil sites in ${c}, ${s}: pier foundations, moisture control, and slabs engineered for clay.`,
    h1: (t, c, a) => `${t} on expansive soil in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Expansive clay in ${s} moves buildings — swelling when wet, shrinking when dry, cracking slabs and foundations that weren't designed for it. Here's the ${cp.blurb} approach for expansive-soil sites in ${c}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Moisture-stability MEP: plumbing designed for zero leaks (every leak feeds the clay), irrigation separated from foundations, drainage that keeps water away from the building perimeter, and under-slab vapor/moisture barriers. On expansive soil, the MEP systems are moisture-management systems — a leaking pipe or misdirected downspout causes the foundation movement, not just a water bill"
        : p === "structural"
        ? "The foundation engineering: drilled piers extending below the active moisture-fluctuation zone, grade beams spanning between piers (isolated from soil swell), post-tensioned slabs designed for edge lift and center lift, and void forms where required. The structural design follows the geotechnical engineer's parameters — pier depth, slab stiffness, moisture barriers — because the soil's swell potential dictates the system"
        : "Site moisture control: grading that sheds water away from structures (positive drainage, no ponding), subdrain systems where groundwater contributes, irrigation design kept clear of foundations, and pavement sections designed for subgrade movement. The civil site plan is a moisture-control plan — every grade and drain serves the foundation's stability";
      return [
        ["The geotechnical prescription", `Expansive-soil engineering in ${c} starts with the soils report's swell testing: plasticity index, swell pressure, active-zone depth. Under ${sc.codeRef}, the foundation design must address the expansive potential — and ${c} reviewers check the design against the soils recommendations specifically. The common failure isn't unknown expansive soil; it's known expansive soil with a conventional foundation designed as if the report didn't exist.`],
        [`The ${cp.name} scope on expansive clay`, `For expansive-soil work in ${c}, ${angle}. Fees follow ${sc.feeNote}; pier foundations and PT slabs cost more to design and build than conventional — and cost far less than foundation repair.`],
        ["Moisture: the lifelong battle", `Expansive foundations are designed for a moisture regime — and the owner maintains it. Consistent irrigation (no soaking, no drought), gutters that discharge away, no planter beds against the foundation, prompt plumbing-leak repair. The engineer designs the foundation; the owner operates the moisture environment. Most expansive-soil distress traces to moisture changes the design didn't anticipate — usually man-made.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How do I know if my site has expansive soil in ${c}?`, `The geotechnical investigation tests for it: Atterberg limits, swell/consolidation tests. Much of ${s} has expansive clays — assume testing is needed, not that the soil is fine. The soils report quantifies the swell potential; the foundation design responds to it.`],
      [`Piers vs. post-tensioned slab on expansive soil?`, `Both work when designed correctly: piers bypass the active zone (best for high swell), PT slabs stiffen against differential movement (common for moderate swell). The geotechnical engineer recommends; the structural engineer designs. The wrong choice is a conventional slab ignoring the report.`],
      [`Can landscaping cause foundation problems on clay?`, `Absolutely — the leading cause of post-construction expansive distress. Planting water-hungry trees near foundations (drying the soil), over-irrigating beds against the house (swelling it), or removing vegetation (changing the moisture balance). Landscape design on expansive soil is foundation engineering by other means.`],
    ],
  },

  "infill": {
    title: (t, c, a) => `${t} for Infill Sites in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for urban infill in ${c}, ${s}: zero-lot-line construction, shoring, neighbor protection, and tight-site logistics.`,
    h1: (t, c, a) => `${t} for infill sites in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Infill in ${c} means building where there's no room to build — zero lot lines, neighbors on every side, and construction logistics as complex as the design. Here's the ${cp.blurb} scope for urban infill in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? "Zero-lot-line MEP: no windows or openings on property-line walls (fire code), which pushes all ventilation and daylighting to the front and interior — the mechanical design compensates. Shared-wall plumbing and fire-protection coordination with adjacent buildings, crane-swing and equipment-placement logistics, and utility connections in streets with no staging room. The MEP design accepts the site's constraints as fixed inputs"
        : p === "structural"
        ? "The infill structural core: shoring design for excavations next to existing buildings and streets (soldier pile, shotcrete, underpinning where needed), zero-lot-line wall design (fire-rated, structurally independent), protection of adjacent structures (monitoring, pre-construction surveys), and crane and construction loading on the new structure. Underpinning a neighbor's foundation is the highest-stakes structural work in infill — designed, monitored, and insured"
        : `Tight-site civil work: shoring and excavation support coordinated with the structural design, dewatering where groundwater appears, street-occupancy and haul-route planning with ${c}, protection of adjacent sidewalks and utilities, and stormwater management with no room for surface basins (underground systems). The civil logistics plan is a construction-enabling document the city reviews`;
      return [
        ["The neighbor is the project", `Infill engineering in ${c} treats adjacent buildings as design constraints: pre-construction surveys documenting their condition, monitoring (survey points, crack gauges) during excavation, shoring designed to prevent any movement, and underpinning where the new excavation goes below neighbor foundations. Under ${sc.codeRef}, protection of adjacent property is a code requirement — and in ${c}, it's also a litigation-avoidance strategy. The neighbor's building gets engineered protection whether the neighbor cooperates or not.`],
        [`The ${cp.name} scope for infill`, `For infill work in ${c}, ${angle}. Fees track ${sc.feeNote}; shoring, monitoring, and logistics planning add scope that greenfield sites never see.`],
        ["Logistics as engineering", `On a zero-lot-line ${c} site, where the crane sits, how concrete gets placed, where materials stage, and how the street stays open are engineering decisions with structural and civil implications. The logistics plan — crane locations and loads, concrete pump placement, street occupancy — is developed with the contractor during design. Infill projects designed without logistics input discover the building can't be built as drawn.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is shoring and when is it needed?`, `Temporary (or permanent) support for excavations: soldier piles with lagging, shotcrete walls, soil nails — designed by the structural/geotechnical engineer when excavating near property lines, streets, or existing buildings. ${c} requires shoring design and permits for excavations that could affect adjacent property or the public right-of-way.`],
      [`How do you protect neighboring buildings during infill construction?`, `Pre-construction condition surveys, engineered shoring/underpinning, vibration and settlement monitoring during work, and construction methods selected for minimal impact. The protection plan is part of the permit documents in ${c} — and the monitoring data is the defense if damage is alleged.`],
      [`Can I build to the property line in ${c}?`, `Often yes — but zero-lot-line walls have no openings (fire code), require fire-rated construction, need neighbor agreements for construction access, and trigger shoring design. Zoning may also require setbacks. The feasibility study confirms what's allowed before design assumes it.`],
    ],
  },

  "tenant-improvement": {
    title: (t, c, a) => `${t} for Tenant Improvements in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for tenant improvements in ${c}, ${s}: office, retail, and restaurant TI with base-building coordination and fast permits.`,
    h1: (t, c, a) => `${t} for tenant improvements in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Tenant improvements in ${c} are the most common commercial engineering — and the most coordination-intensive per square foot. Here's the ${cp.blurb} TI playbook in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Base-building coordination", `Every TI in ${c} starts with the base building: available electrical capacity, HVAC zones and equipment, plumbing routing and capacity, structural capacity for new loads, and fire-protection coverage. Under ${sc.codeRef}, the TI must comply with current code for the altered areas — and the base-building survey documents what exists before design. Landlord-provided drawings are a starting point, not a verified condition.`],
      ["The TI engineering scope", `Typical ${c} TI: demolition plans, partition and ceiling layouts, HVAC re-zoning or extension, lighting and power for the tenant's use, plumbing for restrooms/break rooms, fire-sprinkler modifications, and code compliance (egress, accessibility, energy). Restaurant and medical TIs add their specialized systems. The permit set is compact but complete — ${c} reviews TIs on the same standards as ground-up, just smaller.`],
      ["Schedule: the TI advantage", `TIs permit faster than ground-up — smaller scopes, established buildings, sometimes over-the-counter review for minor work. The schedule drivers: base-building information gathering, landlord approval (which has its own timeline), long-lead equipment, and ${c}'s review queue. Well-run TIs go from lease to occupancy in 4–8 months; the engineering is rarely the long pole — decisions and landlord coordination are.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What does the landlord vs. tenant engineer handle?`, `The tenant's engineer designs the TI within the base building's constraints; the landlord (or base-building engineer) approves impacts on base systems and sometimes performs the base-building modifications. The lease's work letter defines the boundary — read it before designing.`],
      [`Do I need a permit for office TI in ${c}?`, `For anything beyond cosmetic: yes. Partitions, ceilings, MEP modifications, and accessibility upgrades all need permits with engineered plans. ${c} treats TI as new construction for the altered areas — current code applies.`],
      [`How fast can a TI be designed and permitted?`, `Design: 3–8 weeks for typical office/retail TI. Permit: 4–8 weeks for first review plus corrections. Landlord approval runs parallel. Aggressive but realistic: 3–4 months lease-to-permit for straightforward TI in ${c}.`],
    ],
  },

  "change-of-use": {
    title: (t, c, a) => `${t} for Change of Use in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for occupancy changes in ${c}, ${s}: code analysis, upgrades, and permits when the building's use changes.`,
    h1: (t, c, a) => `${t} for change of use in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Changing a ${c} building's use — office to restaurant, warehouse to gym, retail to medical — triggers code requirements that can exceed the TI itself. Here's the ${cp.blurb} change-of-use process in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["The code analysis", `Change of use in ${c} starts with the occupancy comparison: existing vs. proposed occupancy under ${sc.codeRef}, and what the change triggers — structural (higher loads? seismic upgrade?), fire protection (sprinklers? alarms?), MEP (ventilation? plumbing fixtures? electrical?), accessibility (full compliance for the changed area?), and energy (alteration requirements). The analysis is the project's roadmap; skipping it means discovering triggers during plan check.`],
      ["Common trigger upgrades", `Seismic: higher risk category or occupancy change can trigger retrofit per ${s} requirements. Fire: assembly and hazardous occupancies almost always trigger sprinkler/alarm upgrades. Accessibility: change of use triggers full accessibility compliance for the area. Plumbing: fixture counts follow the new occupancy (restaurant vs. office is a 10x difference). The upgrade scope often exceeds the tenant's visible TI — budget it from the code analysis, not from the space plan.`],
      ["Zoning: the parallel track", `Beyond building code, ${c} zoning must allow the new use — conditional use permits, parking requirement changes, neighborhood notification. The zoning approval and building permit run in parallel; the engineering serves both. Change-of-use projects die more often on zoning (use not permitted, parking infeasible) than on building code — verify zoning before engineering.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What triggers a change-of-occupancy review in ${c}?`, `Changing to a different occupancy classification under the building code — e.g., Business to Assembly (office to restaurant), Storage to Educational (warehouse to daycare). Even within similar uses, increased occupant load or hazard can trigger the review. ${c} determines it from the proposed use description.`],
      [`Will I need seismic retrofit for a change of use?`, `Possibly — ${s} and ${c} trigger structural evaluation (and retrofit if deficient) for certain occupancy changes, especially to higher risk categories or assembly uses. The structural code analysis in the project's early phase answers this definitively.`],
      [`Does change of use affect parking?`, `Almost always — ${c} parking ratios follow the use, and the new use usually requires more (restaurant vs. office) or different (accessible, loading) parking. Parking shortfalls kill change-of-use projects; the civil/site analysis confirms feasibility before design.`],
    ],
  },

  "addition": {
    title: (t, c, a) => `${t} for Building Additions in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for building additions in ${c}, ${s}: tying new to existing structurally, extending systems, and seamless permits.`,
    h1: (t, c, a) => `${t} for building additions in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Additions in ${c} are two projects: the new construction and the surgery connecting it to the existing building. Here's the ${cp.blurb} addition playbook in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["The connection: where additions succeed or fail", `The existing-new interface governs ${c} additions: structural connection (dowel, separate, or seismic joint — each with different implications), envelope tie-in (waterproofing the seam), MEP extension vs. new systems, and foundation compatibility (new footings next to old — settlement differential). Under ${sc.codeRef}, the addition must meet current code; the existing building's triggered upgrades (seismic, accessibility, fire) get evaluated per the alteration thresholds.`],
      ["Structural strategies", `Three approaches: structurally connected (tied together, acting as one — requires verifying the existing lateral system can carry the addition), structurally separate (seismic joint between — the addition stands alone, the joint is detailed and maintained), or hybrid. The structural engineer selects based on the existing building's capacity, verified by investigation — not assumed from drawings. In ${c} seismic country, the lateral decision is the project's structural crux.`],
      ["MEP: extend or new?", `Small additions extend existing systems (verify capacity first — the panel, the HVAC, the water heater). Large additions get dedicated systems (cleaner, often cheaper than upgrading the old). The decision point: when extension costs exceed new-system costs, or when the existing systems are at end of life. The MEP assessment of existing capacity happens before the addition is designed, not during.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Do I need to upgrade the existing building when adding on?`, `Sometimes — ${c} alteration thresholds trigger upgrades: structural (when the addition increases lateral loads on the existing system), accessibility (path of travel upgrades), fire protection (sprinkler extension triggers). The code analysis identifies triggers before design; the triggers are proportional, not all-or-nothing.`],
      [`Should the addition be structurally connected or separate?`, `Depends on the existing building's lateral capacity and the addition's size. Connected is simpler architecturally but requires the existing system to carry new loads (verified by analysis). Separate needs a seismic joint but leaves the existing building alone structurally. The engineer decides from investigation data.`],
      [`How do you waterproof the connection between old and new?`, `With detailed transition flashing, compatible materials, and (for below-grade) waterproofing continuity across the construction joint. The envelope detail at the tie-in gets the same attention as a new building's corners — it's the highest-leak-risk detail on the project.`],
    ],
  },

  "remodel": {
    title: (t, c, a) => `${t} for Remodels in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for residential and commercial remodels in ${c}, ${s}: opening walls safely, updating systems, and navigating alteration codes.`,
    h1: (t, c, a) => `${t} for remodels in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Remodels in ${c} uncover what the original builders hid — and the engineering has to handle both the vision and the reality. Here's the ${cp.blurb} remodel approach in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["Opening walls: the structural question", `Every wall removal in a ${c} remodel asks: is it load-bearing, is it a shear wall, what's above it? The structural engineer investigates (not guesses) — attic/crawlspace inspection, selective demolition, load-path tracing — then designs the replacement: beams, posts, holdowns, shear-wall replacement. Under ${sc.codeRef}, removed lateral elements must be replaced with equivalent capacity; "it looked non-structural" is how collapses happen.`],
      ["Systems modernization", `Remodels are the opportunity to fix what's obsolete: electrical panels at capacity (or with safety issues), galvanized plumbing past its life, HVAC that's loud and inefficient, missing seismic anchorage. The MEP scope rightsizes systems to the remodeled building — and ${c}'s alteration code triggers (energy, accessibility, fire) get addressed proportionally, not ignored.`],
      ["The alteration code path", `${c} applies the existing-building code to remodels: compliance for the altered areas, with triggers for broader upgrades at thresholds (substantial structural alteration, occupancy change, major renovation). The code analysis at project start maps exactly what the remodel triggers — so the budget covers the required upgrades, not just the desired finishes.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Can I remove this wall?`, `Maybe — the structural engineer determines it by investigation: load-bearing walls need beams and posts; shear walls need lateral replacement; some walls are just partitions. Never remove a wall on a contractor's visual assessment. The investigation costs little; the failure costs everything.`],
      [`Do remodels need permits in ${c}?`, `Structural, electrical, plumbing, and mechanical work: yes. Cosmetic (paint, flooring, cabinets without MEP changes): typically no. When in doubt, the scope description to ${c} gets a definitive answer — unpermitted remodel work complicates every future sale and insurance claim.`],
      [`Will my remodel trigger seismic retrofit?`, `Under ${s} existing-building provisions, substantial structural alterations can trigger evaluation and retrofit of the lateral system. The threshold and requirements are project-specific — the structural code analysis at design start gives the definitive answer, not a rule of thumb.`],
    ],
  },

  "new-construction": {
    title: (t, c, a) => `${t} for New Construction in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for ground-up new construction in ${c}, ${s}: full design from soils to certificate of occupancy.`,
    h1: (t, c, a) => `${t} for new construction in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Ground-up construction in ${c} is engineering without constraints — every system designed fresh, every coordination decision made on a blank slate. Here's the full ${cp.blurb} new-construction process in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["The design sequence", `New construction in ${c} follows the proven sequence: due diligence (zoning, utilities, soils, hazards), schematic design (massing, systems concepts), design development (systems selected, coordination), construction documents (the permit set), permit, bid, construction. Under ${sc.codeRef}, each phase has defined deliverables — and skipping phases (jumping to CDs from a sketch) is how coordination failures are manufactured.`],
      ["What the full scope includes", `The complete ${cp.blurb} package: ${sc.deliverables}. Plus: energy modeling and compliance, fire-protection design, civil improvement plans (grading, drainage, utilities, paving), landscape coordination, and specifications. New construction is the only project type where everything is designed — which is why the coordination effort (and fee) reflects the full building.`],
      ["Why new construction still needs coordination", `Blank slate doesn't mean simple: the disciplines still interface at every level — structural vs. MEP penetrations, civil vs. architectural grades, energy model vs. actual envelope. ${c}'s best-run new-construction projects hold regular coordination meetings through design development — the BIM or overlay process catching conflicts before they become RFIs. Coordination is a designed activity, not a hope.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What's the engineering timeline for ground-up construction?`, `Design: 4–8 months for commercial (longer for complex). Permit: 3–6 months through ${c} review cycles. Construction administration: through construction. Total engineering engagement: often 12–24 months from first sketch to final inspection.`],
      [`What consultants do I need beyond the engineer?`, `Typical ${c} team: architect, structural, MEP, civil, geotechnical, energy consultant, landscape architect. Plus specialty: fire protection, acoustical, traffic, environmental — as the project requires. We coordinate the engineering disciplines; the architect typically primes the team.`],
      [`Design-bid-build vs. design-build for new construction?`, `Design-bid-build: engineer works for owner, competitive bidding, clear roles — best for owners wanting control. Design-build: faster, single responsibility, engineer works with contractor — best for schedule-driven projects. ${c} supports both; the delivery method is chosen before design starts.`],
    ],
  },

  "shell-building": {
    title: (t, c, a) => `${t} for Shell Buildings in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for core-and-shell buildings in ${c}, ${s}: warm shells engineered for flexible tenant futures.`,
    h1: (t, c, a) => `${t} for shell buildings in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Shell buildings in ${c} are engineered for unknown tenants — the art is providing enough (structure, envelope, base systems) while leaving the right things for TI. Here's the ${cp.blurb} shell strategy in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["What the shell provides", `A ${c} warm shell delivers: complete structure and envelope, base-building MEP (main electrical service with distribution capacity, HVAC base systems or provisions, plumbing mains and restroom cores, fire protection throughout), site work complete, and demising flexibility. Under ${sc.codeRef}, the shell permits as a building — the TIs permit separately. The shell's engineering decisions (floor-to-floor heights, structural grid, shaft locations) constrain every future tenant — they're made for flexibility, not for the first tenant.`],
      ["Capacity: the shell's critical design", `Shell MEP is capacity engineering: electrical service sized for the densest credible tenant mix (with spare), HVAC provisions (shafts, outdoor equipment areas, structural capacity for future units), plumbing with capped stub-outs at logical tenant locations, and fire protection designed for the shell with TI modification provisions. Undersized shell capacity is the most expensive shell error — upgrading base building after occupancy disrupts everyone.`],
      ["Shell-TI interface", `The shell documents define the handoff: what the shell provides at each demising line (electrical capacity, HVAC connection points, plumbing stub-outs, data pathways), base-building design criteria TI engineers must follow, and the landlord's TI review process. Clear interface documents prevent the TI-vs.-shell disputes that delay every tenant — the shell engineer writes them during shell design, not during the first TI.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`What's the difference between cold shell, warm shell, and vanilla shell?`, `Cold/dark shell: structure and envelope only. Warm shell: plus base HVAC, lighting, restrooms — occupiable with TI. Vanilla box (retail): finished storefront, base systems, ready for tenant finishes. The definitions vary by market; the lease and the shell documents define what ${c} delivers — read them, don't assume.`],
      [`How much electrical capacity should a shell provide?`, `Sized for the credible tenant mix plus spare — the electrical engineer analyzes likely uses (office? restaurant? medical?) and sizes the service with growth capacity. Restaurant-capable shells need dramatically more than office-only. The capacity decision is made with the developer's leasing strategy, not in isolation.`],
      [`Do shell buildings need full MEP design?`, `Base-building MEP: yes — service, distribution, mains, and provisions, all engineered and permitted. Tenant systems: no — that's TI. The shell MEP stops at defined interface points documented for future TI engineers. The boundary is contractual and drawn, not verbal.`],
    ],
  },

  "brownfield": {
    title: (t, c, a) => `${t} for Brownfield Sites in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for brownfield redevelopment in ${c}, ${s}: building safely on remediated sites with environmental coordination.`,
    h1: (t, c, a) => `${t} for brownfield sites in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Brownfields in ${c} — former industrial, gas station, dry cleaner sites — offer infill opportunity wrapped in environmental complexity. Here's the ${cp.blurb} approach for building on remediated sites in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["The environmental-engineering interface", `Brownfield projects in ${c} run two parallel tracks: environmental (Phase I/II, remediation, regulatory closure) and engineering (design for the remediated condition). The environmental consultant defines the constraints: residual contamination levels, vapor-intrusion requirements, soil-management plans, deed restrictions. Under ${sc.codeRef}, the engineering designs within these constraints — foundation types compatible with caps, vapor barriers and sub-slab venting where required, utility trenches that don't create vapor pathways.`],
      ["Designing for the remediated condition", `Vapor intrusion mitigation: sub-slab depressurization or vapor barriers for buildings over residual VOCs — designed by the environmental engineer, integrated by the building team. Soil management: grading plans honoring the remediation's clean-soil cap depths and institutional controls. Groundwater: dewatering discharge may need treatment; foundations avoid creating preferential pathways. The ${cp.blurb} accommodates the remedy — the building doesn't compromise it.`],
      ["Regulatory navigation", `${c} brownfields involve the Regional Water Board or DTSC (or ${s} equivalent), the county health department, and sometimes EPA — each with requirements that affect design and construction. No-further-action letters, soil-management plans, and construction worker safety plans are project documents alongside the building permit. The regulatory timeline runs parallel to design; start both together.`],
    ],
    faqs: (t, c, s, cp, sc) => [
      [`Can you build on contaminated land in ${c}?`, `Yes — after investigation and remediation to regulatory standards for the intended use. Residential requires cleaner than commercial/industrial. The environmental process (Phase I → Phase II → remediation → closure) precedes or parallels design; the engineering designs for the post-remediation condition with any required mitigation (vapor barriers, caps) integrated.`],
      [`What is vapor intrusion and how is it addressed?`, `Chemical vapors migrating from contaminated soil/groundwater into buildings. Mitigation: vapor barriers under slabs, sub-slab venting or depressurization systems, sealed utility penetrations. The environmental engineer designs the mitigation; the building engineer integrates it. It's standard, effective, and required where residual VOCs exist.`],
      [`Do brownfields affect construction cost?`, `Yes — soil management (handling/disposal protocols), vapor mitigation systems, regulatory compliance, and sometimes foundation modifications. But brownfield incentives (grants, liability protections, tax credits) often offset the premium. The feasibility study quantifies both sides before acquisition.`],
    ],
  },

  "coastal": {
    title: (t, c, a) => `${t} for Coastal Sites in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for coastal construction in ${c}, ${s}: corrosion protection, flood and wave design, and coastal-commission coordination.`,
    h1: (t, c, a) => `${t} for coastal sites in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Coastal sites in ${s} combine every challenge — salt corrosion, flood zones, high wind, geotechnical complexity, and coastal-commission jurisdiction. Here's the ${cp.blurb} coastal playbook for ${c}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const angle = p === "mep"
        ? `Corrosion-resistant MEP: marine-grade equipment and fasteners, stainless or coated exterior components, elevated equipment above flood levels, and HVAC designed for salt-air intake (corrosion-resistant coils, filtration). The MEP specification for coastal ${c} reads differently — every exterior component gets a corrosion rating, and the maintenance manual addresses salt exposure explicitly`
        : p === "structural"
        ? "Coastal structural design: V-zone wave and flood loads where applicable (breakaway walls, elevated foundations, scour design), corrosion protection (epoxy-coated or stainless reinforcement, concrete cover, material selection), wind design for coastal exposure, and bluff-top setback considerations. The structural durability design — what keeps the building standing for 50 years in salt air — is as important as the load calculations"
        : "Coastal civil work: FEMA flood-zone compliance (often VE zones), coastal-commission permit coordination (a separate approval track with its own timeline), bluff and shoreline setback compliance, drainage that doesn't accelerate bluff erosion, and public-access requirements where the commission imposes them. The civil package navigates two regulatory worlds: FEMA floodplain and coastal commission";
      return [
        ["The dual jurisdiction", `Coastal ${c} projects answer to the city/county and the coastal commission (or ${s} equivalent) — separate permits, separate timelines, sometimes conflicting requirements. Under ${sc.codeRef} plus coastal regulations, the commission reviews for coastal-resource impacts: public access, views, marine environment, bluff stability. The entitlement strategy sequences both approvals; the engineering serves both sets of requirements. Commission timelines are measured in months to years — start early.`],
        [`The ${cp.name} scope for coastal`, `For coastal work in ${c}, ${angle}. Fees track ${sc.feeNote}; coastal review, flood design, and corrosion detailing add specialized scope beyond standard practice.`],
        ["Corrosion: the 50-year design", `Salt air destroys unprotected steel, standard fasteners, and ordinary equipment in years, not decades. Coastal ${c} engineering specifies: hot-dip galvanized or stainless structural connections, epoxy-coated rebar in splash zones, marine-grade MEP equipment, and corrosion-resistant cladding attachments. The durability specification is life-cycle engineering — the premium at construction prevents the premature failure that coastal buildings are famous for.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What extra approvals does coastal construction need?`, `Beyond city/county permits: coastal commission (or ${s} equivalent) development permits for work in the coastal zone, FEMA floodplain compliance, and sometimes state lands or wildlife agency review. Each has its own application, timeline, and requirements — the entitlement consultant maps them all before design.`],
      [`How do you protect a building from salt corrosion?`, `Material selection (stainless, galvanized, marine-grade), protective coatings, concrete cover and mix design, drainage detailing that prevents salt-water ponding, and maintenance provisions. The corrosion-protection specification is a design deliverable — not a contractor option.`],
      [`Can I build on a coastal bluff in ${c}?`, `Sometimes — with geotechnical bluff-stability analysis, commission-mandated setbacks (often 50–100+ feet from the bluff edge), and designs accounting for long-term erosion. The geotechnical engineer's bluff-retreat analysis determines the buildable area; the commission enforces it. Feasibility with geotechnical input comes before the land purchase.`],
    ],
  },

  "brewery": {
    title: (t, c, a) => `${t} for Breweries in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for breweries and taprooms in ${c}, ${s}: process piping, glycol cooling, tank loads, and health-department-ready engineered plans.`,
    h1: (t, c, a) => `${t} for breweries in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Breweries in ${c} are industrial process facilities wearing a hospitality face: behind the taproom sit steam boilers, glycol chillers, pressurized fermentation tanks, and floor drains everywhere — all of which need engineered design under ${s} codes. Here's how ${cp.blurb} works for brewery and taproom projects.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `process steam or direct-fire heating with boiler sizing and gas train design, glycol chilling looped to each fermenter with heat-load calcs, CO2 monitoring and ventilation in cellar areas (an asphyxiation hazard reviewers take seriously), trench drains with chemical-resistant piping, and electrical service sized for the combined brewing, cooling, and packaging loads. In ${c}, the health department reviews the taproom while building plan check covers the production side — the MEP set has to satisfy both`
        : p === "structural"
        ? `fermentation and bright tanks impose concentrated loads that change dramatically between full and empty — the slab and footings get designed for the worst case, with seismic anchorage for every vessel per ASCE 7. Mezzanines for grain storage or offices add another load path, and in ${c} older industrial shells almost always need the existing slab cored and verified before a single tank is ordered`
        : `process wastewater pretreatment before discharge to the ${c} sanitary system (high-BOD brewery effluent triggers industrial pretreatment permits), loading dock and truck court paving designed for delivery axle loads, outdoor seating drainage, and stormwater treatment for the expanded impervious area. The civil package is also where fire-lane access around tank farms gets resolved`;
      return [
        ["Why breweries are not restaurant TI", `A taproom looks like a restaurant build-out, but the production floor is light industrial: ${sc.codeRef} apply alongside health and fire codes, and the process equipment drives structural and utility decisions that dwarf the hospitality scope. In ${c}, the single most common brewery permitting failure is designing the taproom first and treating the cellar as an afterthought — the tanks, drains, and ventilation dictate the building, not the other way around.`],
        [`${cp.name} scope for breweries`, `On brewery work in ${c}, ${sys}. Fees follow ${sc.feeNote}, and brewery fees run above typical TI because the process scope is essentially a second engineering project inside the building.`],
        ["Sequencing a brewery build", `Lock the brewing equipment list — tank sizes, boiler type, packaging line — before engineering starts, because every vessel changes loads, drains, and utilities. Confirm process-wastewater discharge terms with ${c} utilities during site selection; pretreatment requirements have killed otherwise-ready sites. And order long-lead tanks early: the structural design needs certified equipment weights and anchor details, not catalog estimates.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What engineering does a brewery need in ${c}?`, `Full MEP with process piping, glycol, steam, and CO2 ventilation design; structural for tank loads, slabs, and seismic anchorage; and civil for process wastewater, paving, and stormwater. The taproom adds health-department review on top. It's one of the most multi-discipline small projects in ${s}.`],
      [`Do fermentation tanks need seismic anchorage?`, `Yes — in ${s}, tanks are nonstructural components requiring anchorage design per ASCE 7, and a full 15-barrel fermenter weighs as much as a loaded box truck. Unanchored tanks are a top correction item on brewery plan checks.`],
      [`Can I put a brewery in an existing warehouse?`, `Often yes, and it's the most common path — but the existing slab, roof structure, and utilities must be verified by the engineer first. Slab thickness, panel capacity, gas service size, and floor-drain feasibility are the four checks that decide whether the shell works or needs expensive upgrades.`],
    ],
  },

  "data-center": {
    title: (t, c, a) => `${t} for Data Centers in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for data centers in ${c}, ${s}: cooling, redundant power, UPS and generator backup, and mission-critical engineered design.`,
    h1: (t, c, a) => `${t} for data centers in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Data centers in ${c} are utility-scale engineering problems: a single hall can draw more power than the neighborhood around it, and the cooling never stops. ${cp.blurb} for data centers is about redundancy at every layer — here's what that means in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `cooling design around the IT load with N+1 or 2N redundancy — chilled water, DX, or evaporative depending on ${c} climate and water availability — plus UPS strings, generator plants with paralleling switchgear, and automatic transfer schemes that hold the load through a utility outage. Power density per rack drives everything: the electrical one-line, the cooling layout, and the utility service negotiation all start from watts per square foot. In ${s}, the utility interconnection study is frequently the project critical path`
        : p === "structural"
        ? `floor loading for server racks and battery strings far beyond office design — 250 psf and up in halls, with concentrated UPS and switchgear loads. Seismic bracing for racks, cable tray, and piping per ASCE 7, plus vibration and deflection criteria that protect spinning disks and fiber connections. In ${c}, the structural set also covers screen walls, generator enclosures, and fuel tank supports`
        : `substation and utility duct-bank coordination (often the largest civil scope on the project), water supply for evaporative cooling with backflow and metering, security setbacks and anti-ram barriers, and stormwater for the big impervious footprint. The civil package also handles construction-phase logistics for delivering transformers and generators that arrive on multi-axle trailers`;
      return [
        ["Redundancy is the design", `Every data center system in ${c} gets designed twice: the primary path and the backup path that carries the load when the first fails. That philosophy — concurrent maintainability — flows through ${sc.codeRef} and into every drawing: dual power feeds, redundant cooling, and controls that fail over without human intervention. Value-engineering redundancy out is how outages happen.`],
        [`${cp.name} scope for data centers`, `For data center work in ${c}, ${sys}. Fees track ${sc.feeNote}; data center engineering is among the highest per-square-foot because the systems are dense, redundant, and documented to commissioning standards.`],
        ["The utility conversation comes first", `Before site design advances in ${c}, the engineer and owner need the utility's answer on available capacity, service voltage, and interconnection timeline — a 10 MW load doesn't connect like a retail building. Substation lead times in ${s} can exceed the building construction schedule, so the utility application should precede the building permit, not follow it.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What does data center engineering cost in ${s}?`, `Data center MEP and structural engineering runs well above standard commercial rates because of redundancy, power density, and commissioning documentation. Fees follow ${sc.feeNote} — and the IT load (MW) is the primary driver, not square footage.`],
      [`How much power does a data center need?`, `Modern halls run from a few MW for enterprise facilities to 50+ MW for hyperscale. The engineer sizes everything — utility service, generators, UPS, cooling — from the IT load, so an accurate load projection from the operator is the single most important design input.`],
      [`Do data centers need special structural design?`, `Yes. Rack halls, battery rooms, and electrical rooms carry loads far beyond typical commercial floors, and seismic bracing for racks and overhead systems is a code requirement. The structural engineer also designs for the heavy yard equipment — transformers, generators, and chillers — that surrounds the building.`],
    ],
  },

  "greenhouse": {
    title: (t, c, a) => `${t} for Greenhouses in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for greenhouses in ${c}, ${s}: climate controls, irrigation, supplemental lighting, and engineered growing facilities.`,
    h1: (t, c, a) => `${t} for greenhouses in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A commercial greenhouse in ${c} is a building whose entire job is controlling climate: temperature, humidity, light, and irrigation have to hold steady while ${s} weather does whatever it wants outside. Here's how ${cp.blurb} serves greenhouse and controlled-environment agriculture projects.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `heating and cooling sized for the crop's climate setpoints — not human comfort — with dehumidification handling the massive moisture load from transpiration. Supplemental LED lighting adds both electrical load and heat the HVAC must remove, and irrigation/fertigation needs designed water treatment, pumping, and drainage. In ${c}, energy modeling matters because greenhouse conditioning can dominate the operating budget`
        : p === "structural"
        ? `light-gauge or aluminum frame design for wind and snow per ASCE 7 — greenhouse glazing sheds load differently than conventional roofs, and drifting snow against gutter-connected ranges is a real failure mode in ${s}. Foundations are typically grade beams or piers, and the structure must also carry hanging baskets, shade systems, and irrigation booms as suspended loads`
        : `grading that keeps the pad above flood and ponding levels, water supply for irrigation demand (often the largest site utility), runoff management for the impervious greenhouse footprint, and access drives for delivery and harvest traffic. In ${c}, well capacity and water rights can gate the whole project — confirm supply before design`;
      return [
        ["Greenhouses are process buildings", `Reviewers in ${c} increasingly treat commercial greenhouses as agricultural-industrial facilities: ${sc.codeRef} apply, and energy and water use get scrutiny. The engineering has to serve the crop cycle — a tomato greenhouse and a cannabis facility have very different climate, lighting, and security requirements, and the design starts from the grower's environmental recipe.`],
        [`${cp.name} scope for greenhouses`, `For greenhouse projects in ${c}, ${sys}. Fees follow ${sc.feeNote}; the MEP scope is usually the largest because climate control is the product.`],
        ["What greenhouse owners underestimate", `Water and power. A commercial range can use more water than the farmhouse it sits behind, and supplemental lighting can trigger a utility service upgrade. Get the irrigation demand and lighting load to the engineer — and the utility — during site selection in ${c}, not after the pad is poured.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do I need engineered plans for a greenhouse in ${c}?`, `For commercial greenhouses — yes. ${c} requires structural design for wind and snow loads on the frame and glazing, plus MEP for heating, cooling, lighting, and irrigation. Small hobby houses may qualify for prescriptive paths, but anything commercial needs an engineer.`],
      [`How are greenhouses heated and cooled?`, `Typically unit heaters or hot-water radiant for heating, and natural ventilation with exhaust fans, evaporative pads, or full mechanical cooling depending on the crop and ${s} climate. The engineer sizes systems to the crop's temperature and humidity setpoints, which are tighter than human-comfort ranges.`],
      [`What is the biggest engineering risk on greenhouses?`, `Snow and wind on lightweight frames — greenhouse collapses under drifted snow are a known failure pattern. The structural design must address unbalanced snow loads on gutter-connected ranges specifically, not just uniform roof snow.`],
    ],
  },

  "hangar": {
    title: (t, c, a) => `${t} for Aircraft Hangars in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for aircraft hangars in ${c}, ${s}: long-span frames, hangar doors, foam suppression, and apron-ready engineered design.`,
    h1: (t, c, a) => `${t} for aircraft hangars in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `An aircraft hangar in ${c} is a big clear box with one enormous moving wall: the door can span 100 feet or more, and everything about the building — structure, power, fire protection — orbits that opening. Here's how ${cp.blurb} works for hangar projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `high-bay heating (radiant tube or unit heaters) for a volume that's mostly empty air, hangar door power with manual override, and fire suppression — foam systems for larger hangars per NFPA 409, which drives water supply and containment design. Fueling areas need classified electrical per NEC, and in ${c} the fire marshal's hangar requirements often exceed the base building code`
        : p === "structural"
        ? `long-span rigid frames or trusses clearing the full door opening, with the door header designed for the stacked or bottom-rolling door loads. Wind uplift on the big roof area and lateral design for the open front wall are the governing cases in ${s}. The slab gets aircraft wheel loads — point loads far beyond typical industrial — and door rails need precise, level foundations`
        : `apron and taxi-lane paving designed for aircraft weights (not truck ESALs), fuel farm secondary containment, oil-water separators on hangar drains, and stormwater for the large impervious area. In ${c}, airport authority design standards overlay the municipal code — the civil set has to satisfy both, and FAA-adjacent height and glare rules constrain the site plan`;
      return [
        ["The door drives the building", `Every hangar decision in ${c} starts with the door: bi-fold, hydraulic, or bottom-rolling — each imposes different header loads, power needs, and foundation details. ${sc.codeRef} all show up, but the door manufacturer's structural and electrical requirements are project-specific inputs the engineer needs before framing design begins.`],
        [`${cp.name} scope for hangars`, `On hangar work in ${c}, ${sys}. Fees track ${sc.feeNote}; hangars are efficient per square foot but the door and suppression systems concentrate the engineering.`],
        ["Fire protection is the surprise scope", `Owners budget for the steel box and forget NFPA 409: hangars over certain sizes and fuel quantities trigger foam suppression, which means water supply upgrades, containment, and a fire protection engineer on the team. Confirm the suppression trigger with the ${c} fire marshal during programming — it changes the MEP budget significantly.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What size hangar door do I need?`, `It depends on the aircraft: wingspan plus clearance, typically door width at 110–120% of wingspan. The engineer needs the design aircraft locked early because door width sets the structural span, the header design, and the power requirements.`],
      [`Do hangars need fire sprinklers?`, `It depends on size, construction type, and fuel quantity — NFPA 409 sets hangar-specific thresholds that differ from standard commercial rules. Larger hangars trigger foam systems, not just water sprinklers. The ${c} fire marshal makes the final call, so confirm during programming.`],
      [`Can I build a hangar on leased airport land?`, `Yes — it's the most common arrangement. The airport authority's design standards and lease terms overlay municipal code, so the engineering team designs to both. Ground-lease terms also affect how the structure is financed and permitted in ${c}.`],
    ],
  },

  "stadium": {
    title: (t, c, a) => `${t} for Stadiums in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for stadiums and arenas in ${c}, ${s}: grandstand structures, crowd systems, broadcast power, and large-venue engineered design.`,
    h1: (t, c, a) => `${t} for stadiums in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Stadiums and arenas in ${c} concentrate every engineering challenge at once: thousands of occupants, long-span roofs, broadcast-grade power, and life-safety systems that have to work perfectly on game day. ${cp.blurb} for venues is large-team engineering — here's the landscape in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `crowd-comfort HVAC for concourses and clubs with smoke-control and pressurization for egress, broadcast and event power with redundant feeds, concessions MEP (essentially a food hall inside the venue), and emergency voice/alarm communication across a noisy bowl. In ${c}, the life-safety and smoke-control sequences are engineered systems with their own commissioning — not just devices on a plan`
        : p === "structural"
        ? `grandstand and bleacher structures designed for synchronized crowd loading and vibration — human-induced vibration criteria govern member sizing as much as strength. Long-span roof structures over the bowl, seismic design for the occupied structure, and expansion detailing for a building that moves with temperature. In ${s}, the structural peer review is typically a jurisdictional requirement, not an option`
        : `parking for peak-event demand (often 3–4x daily use), traffic and pedestrian circulation engineered with the ${c} traffic engineer, stormwater for one of the largest impervious footprints in the city, and utility extensions sized for event-day peaks. The civil scope also covers construction logistics for a multi-year build that can't disrupt the surrounding district`;
      return [
        ["Venues are engineered for the worst 3 hours", `A stadium in ${c} sits empty most days and holds a small city on event day — ${sc.codeRef} all get applied to the peak condition: full occupancy, full concessions, full broadcast. Egress modeling, structural crowd loading, and utility peaks are designed for the sellout, which is why venue engineering doesn't scale down linearly from the seat count.`],
        [`${cp.name} scope for stadiums`, `For venue work in ${c}, ${sys}. Fees follow ${sc.feeNote}; stadium engineering is procured as a multi-firm team with the structural and MEP leads coordinating through a single BIM model.`],
        ["What drives venue schedules", `Steel and precast lead times, not drawings. The long-span roof and grandstand precast order before the permit is fully clean in most ${c} venue programs, which means the structural design has to be procurement-ready early. Owners who treat a stadium like a big office building on schedule discover the specialty trades set the pace.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How is stadium structural design different?`, `Crowd-induced vibration governs: thousands of people moving in rhythm can excite a grandstand's natural frequency, so the engineer designs for dynamic response, not just static strength. Long-span roofs, seismic demands for occupied structures, and peer review requirements complete the picture in ${s}.`],
      [`What MEP systems are unique to venues?`, `Smoke control for the bowl and concourses, broadcast/event power with redundancy, high-density concessions MEP, and emergency communication that works over crowd noise. The life-safety sequence of operations is an engineered deliverable with dedicated commissioning.`],
      [`How long does stadium engineering take?`, `Design for a major venue typically runs 12–24 months with a large integrated team, plus extended permitting with ${c} and specialty reviews. It's program-driven: the event calendar often sets an immovable opening date that the entire design and construction sequence works backward from.`],
    ],
  },

  "theater": {
    title: (t, c, a) => `${t} for Theaters in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for theaters and cinemas in ${c}, ${s}: acoustic HVAC, stage systems, raked seating, and performance-venue engineered design.`,
    h1: (t, c, a) => `${t} for theaters in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Theaters in ${c} are buildings designed around silence and sightlines: the HVAC can't be heard, the structure can't transmit vibration to the stage, and every seat needs an unobstructed view. Here's how ${cp.blurb} serves theater and cinema projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `low-velocity, acoustically-treated HVAC targeting NC-20 to NC-25 in the auditorium — ductwork gets lined, oversized, and isolated so the system is inaudible during quiet passages. Stage lighting and sound power with dimming and isolated grounds, projection booth ventilation, and lobby systems that handle intermission surges. In ${c}, the acoustic consultant's criteria become MEP design requirements, not suggestions`
        : p === "structural"
        ? `fly tower and gridiron steel for flown scenery, catwalk and tension-grid framing, raked seating structure with vibration isolation from the stage house, and long-span auditorium roofs clear of columns. In ${s}, the stage machinery loads — battens, curtains, lighting bridges — are owner-furnished inputs the structural engineer designs the building around`
        : `parking for peak-show demand, drop-off and queueing for sold-out performances, site lighting that preserves the marquee visibility without glare, and stormwater for the large roof. For historic theater renovations in ${c}, the civil scope often includes alley and service access that the original building never had`;
      return [
        ["Silence is a design criterion", `In a theater in ${c}, background noise has a number: NC-25 or lower in the auditorium, and every ${cp.blurb} decision serves it. ${sc.codeRef} apply, but the acoustic criteria overlay them — duct velocities, equipment locations, and structural isolation details all trace back to what the audience should not hear.`],
        [`${cp.name} scope for theaters`, `On theater work in ${c}, ${sys}. Fees track ${sc.feeNote}; theaters carry an acoustic consultant whose criteria become binding inputs to the engineering.`],
        ["Renovation vs. new build", `Historic theater renovations in ${c} are the harder engineering problem: the structure must be verified and often strengthened for new stage loads, MEP has to thread through a building with no chases, and accessibility upgrades touch everything. New-build theaters are straightforward by comparison — the constraints are known from day one.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why is theater HVAC so specialized?`, `Because the audience can hear it. Theater HVAC is designed to NC-20/25 background noise levels — roughly a whisper — which means oversized low-velocity ductwork, silencers, and vibration-isolated equipment. Standard commercial HVAC practice would be plainly audible during quiet scenes.`],
      [`What structural work does a theater need?`, `Fly towers, catwalks, raked seating, and long-span column-free auditoriums, all with vibration isolation so footfall and equipment don't reach the stage. In renovations, verifying and strengthening the existing structure for new stage machinery is often the largest structural scope.`],
      [`Do cinemas need the same engineering as live theaters?`, `Less — cinemas need raked seating structure, acoustic separation between auditoriums, and projection booth design, but no fly tower or stage machinery. The acoustic criteria still govern the MEP, since projector noise and HVAC can't intrude on the auditoriums.`],
    ],
  },

  "museum": {
    title: (t, c, a) => `${t} for Museums in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for museums in ${c}, ${s}: archival climate control, exhibit lighting, vibration isolation, and collection-safe engineered design.`,
    h1: (t, c, a) => `${t} for museums in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Museums in ${c} are engineered around the collection: temperature and humidity have to hold within a few percent around the clock, light levels are capped to protect artifacts, and vibration from the street can't reach the galleries. Here's how ${cp.blurb} serves museum projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `tight-tolerance HVAC holding 70°F/50% RH (or the conservator's spec) with N+1 redundancy — a climate failure can damage a collection overnight. UV-filtered exhibit lighting with strict foot-candle limits, security and fire-suppression systems coordinated with collection protection (clean-agent in vaults and storage), and loading-dock airlocks that keep unconditioned air out of galleries. In ${c}, the conservator's environmental spec becomes the MEP design basis`
        : p === "structural"
        ? `heavy exhibit and sculpture loads with concentrated point loads the structural engineer designs to the curator's layout, vibration isolation from street and rail traffic (a real criterion with measured limits, not a judgment call), long-span gallery spaces clear of columns, and seismic protection for the collection — base isolation or restrained pedestals in higher seismic zones of ${s}. Atrium and skylight framing must also manage daylight without UV exposure`
        : `bus and school-group drop-off circulation, plaza and forecourt drainage that protects the below-grade collection storage from any water intrusion, site security with anti-ram rated barriers, and stormwater for the large roof and hardscape. In ${c}, museum expansions on tight urban sites often need the civil engineer to thread new utilities and loading around a landmarked existing building`;
      return [
        ["The collection sets the criteria", `Every museum engineering decision in ${c} traces to conservation: ${sc.codeRef} apply, but the conservator's environmental and lighting specs overlay them as binding requirements. A gallery that meets code but drifts 10% in humidity fails its actual purpose — which is why the engineer designs to the collection spec first and the building code second.`],
        [`${cp.name} scope for museums`, `For museum work in ${c}, ${sys}. Fees follow ${sc.feeNote}; museums carry conservators and exhibit designers whose criteria become engineering inputs, and the redundancy requirements push MEP scope above typical cultural buildings.`],
        ["What museum boards underestimate", `Operating cost. The tight-tolerance HVAC that protects the collection runs 24/7/365 and dominates the utility budget — energy modeling during design in ${c} isn't a code exercise, it's the board's financial planning. Designing for maintainability (filter access, redundant trains that allow service without shutdown) pays back for decades.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why do museums need such tight climate control?`, `Organic materials — canvas, wood, paper, textiles — expand, contract, and degrade with temperature and humidity swings. The standard museum spec (around 70°F and 50% RH, tightly held) prevents cracking, warping, and mold. The MEP engineer designs redundant systems because a single failure during a ${s} summer could damage irreplaceable works.`],
      [`What is vibration criteria in museum design?`, `A measured limit on floor vibration from footfall, traffic, and equipment, set so visitors don't feel the floor move and sensitive exhibits aren't disturbed. Near rail or heavy traffic in ${c}, the structural engineer may specify isolation joints, stiffened floors, or base isolation to meet it.`],
      [`Do museums need special fire protection?`, `Yes — collection storage and vaults typically get clean-agent suppression (no water damage), while galleries use preaction sprinklers that only charge when a detector trips. The fire protection engineer coordinates suppression choice with the conservator's requirements for each space type.`],
    ],
  },

  "library": {
    title: (t, c, a) => `${t} for Libraries in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for libraries in ${c}, ${s}: book-stack loading, reading-room comfort, community spaces, and civic-building engineered design.`,
    h1: (t, c, a) => `${t} for libraries in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Libraries in ${c} are quiet workhorses: book stacks impose some of the heaviest floor loads in any civic building, reading rooms need calm air and good light, and community rooms swing from empty to packed. Here's how ${cp.blurb} serves library projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `HVAC zoned for stack areas (stable temperature and humidity protect the collection), reading rooms with low-velocity quiet air distribution, and community/multipurpose rooms with ventilation that handles full-house events. Lighting design balances daylighting for reading with UV control for the stacks, and in ${c} the energy-code compliance for a daylit civic building is a full modeling exercise`
        : p === "structural"
        ? `book-stack live loads of 150 psf — triple typical office loading — which governs slab, beam, and footing design wherever compact shelving goes. Long-span reading rooms clear of columns, and in ${s} seismic design for a public-occupancy building with the stacks treated as contents requiring anchorage. Renovations of Carnegie-era libraries in ${c} usually need the existing floors verified or strengthened before a single new shelf goes in`
        : `parking sized for peak program demand (story time and evening events, not just daily use), accessible routes and drop-off at the main entry, plaza drainage, and site lighting for evening hours. For branch libraries in ${c}, the civil scope often includes shared parking agreements and joint-use site planning with adjacent civic buildings`;
      return [
        ["Stacks drive the structure", `The defining engineering fact of a library in ${c} is the weight of books: ${sc.codeRef} set the rules, but 150 psf stack loading sets the member sizes. Compact/mobile shelving concentrates that load further — the structural engineer needs the shelving layout and vendor weights before framing design, not after.`],
        [`${cp.name} scope for libraries`, `On library work in ${c}, ${sys}. Fees track ${sc.feeNote}; libraries are efficient civic buildings, with the structural stack scope and the daylit MEP design as the two specialty areas.`],
        ["Designing for the library's second life", `Modern libraries in ${c} are community centers that happen to hold books: makerspaces, recording studios, and event rooms all need power, ventilation, and acoustic separation the original program didn't contemplate. The engineer who designs spare electrical capacity and flexible HVAC zoning gives the building a future the board will thank them for.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why do library floors need to be so strong?`, `Books are extraordinarily heavy in aggregate — code requires 150 psf live load for stack areas, versus 50 psf for offices. Compact shelving is heavier still. The structural engineer designs slabs, beams, and foundations for the stack layout, which is why shelving plans come before framing plans.`],
      [`Do libraries need special HVAC?`, `Quieter and more zoned than typical commercial: reading rooms need low-velocity air distribution for acoustic comfort, stacks need stable temperature and humidity, and community rooms need ventilation for variable occupancy. It's three different HVAC problems in one building.`],
      [`Can an old building become a library?`, `Often — but the floor structure must be verified for stack loads first, which is the most common deal-breaker. A ${c} building with light framing may need strengthening that costs more than the TI itself. The structural assessment comes before lease or purchase, not after.`],
    ],
  },

  "fire-station": {
    title: (t, c, a) => `${t} for Fire Stations in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for fire stations in ${c}, ${s}: apparatus bays, alerting systems, essential-facility seismic design, and first-responder-ready engineering.`,
    h1: (t, c, a) => `${t} for fire stations in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Fire stations in ${c} are essential facilities: they have to survive the earthquake, keep the trucks rolling, and get crews from bunk to bay in under a minute — all while housing people 24/7. Here's how ${cp.blurb} serves fire station projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `apparatus bay vehicle-exhaust capture (diesel exhaust is the recognized health hazard driving the design), station alerting systems integrated with dispatch, decontamination and gear laundry with dedicated ventilation, living-quarter HVAC zoned for shift sleep, and emergency power that keeps the station operational through a utility outage. In ${c}, the alerting and communications systems are engineered with the fire department's radio and dispatch standards`
        : p === "structural"
        ? `essential-facility seismic design — Risk Category IV in ${s}, meaning higher forces and stricter detailing so the station functions after the design earthquake. Apparatus bay door headers spanning the full bay width, hose-drying tower framing, and slabs designed for 40-ton apparatus point loads. The structural set also covers the fuel island canopy and training tower where applicable`
        : `apron paving in front of the bays designed for apparatus turning and outrigger loads, direct egress onto the arterial with traffic-signal preemption coordinated with ${c}, fuel storage with secondary containment, and stormwater for the site. The civil engineer also resolves the conflict every station site has: fast truck egress versus pedestrian safety at the sidewalk`;
      return [
        ["Essential means after the earthquake", `A fire station in ${c} is designed to a higher standard than the buildings around it: ${sc.codeRef} apply at essential-facility levels, with seismic forces and detailing intended to keep the station operational when the community needs it most. Nonstructural anchorage — generators, communications racks, gear lockers — gets the same attention as the frame.`],
        [`${cp.name} scope for fire stations`, `For station work in ${c}, ${sys}. Fees follow ${sc.feeNote}; the essential-facility classification and the specialty systems (alerting, exhaust capture, decon) make stations more engineering-intensive per square foot than typical municipal buildings.`],
        ["The turnout-time plan", `Sixty seconds from alert to wheels rolling drives the floor plan: bunk-to-bay circulation, pole or slide placement, and alerting zoning are architectural, but the engineer enables them — bay door operators on emergency power, exhaust capture that doesn't slow egress, and lighting that snaps to full on alert. In ${c}, the department's operations staff should review the MEP and structural concepts before design development, not at the permit counter.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What makes fire station design different?`, `The essential-facility classification: the station must remain operational after the design earthquake, which raises seismic forces and detailing above standard commercial. Add 24/7 living quarters, diesel exhaust hazards in the bays, and sub-minute turnout requirements, and it's a specialty building type.`],
      [`Why do apparatus bays need exhaust systems?`, `Diesel exhaust is a known carcinogen, and firefighters historically had the highest exposure in their own station. Code and department standards in ${s} now require source-capture exhaust that connects to each truck automatically — it's a health-driven engineered system, not optional ventilation.`],
      [`How are fire station sites selected?`, `Response-time coverage modeling picks the location; then the civil engineer confirms the site works — apparatus egress onto the street network, signal preemption feasibility with ${c}, and room for the apron, fueling, and future expansion. A site that fails the turning-radius check fails the project.`],
    ],
  },

  "bank": {
    title: (t, c, a) => `${t} for Banks in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for banks in ${c}, ${s}: vault structures, branch MEP, drive-thru lanes, and financial-facility engineered design.`,
    h1: (t, c, a) => `${t} for banks in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Bank branches in ${c} are small buildings with outsized engineering: the vault alone is a concrete fortress inside a retail box, and drive-thru lanes, ATMs, and security systems each bring their own design requirements. Here's how ${cp.blurb} serves bank and financial projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `vault ventilation (a sealed concrete box still needs air), branch HVAC with after-hours setback for the unoccupied vault zone, security and access-control power and pathways coordinated with the bank's security vendor, drive-thru pneumatic tube and audio systems, and ATM vestibule heating and lighting. In ${c}, the MEP engineer also coordinates emergency power for the security and IT systems that can't go dark`
        : p === "structural"
        ? `the vault: reinforced concrete walls, floor, and ceiling designed for the specified burglary resistance (UL ratings), with the massive dead load carried on thickened slabs or dedicated footings. Safe-deposit and cash-handling areas get the same treatment at smaller scale, and in ${s} the night-depository and ATM surrounds need impact and forced-entry detailing. Teller-line bullet-resistant assemblies bear on structure the engineer verifies`
        : `drive-thru lane stacking, geometrics, and canopy clearances per ${c} standards, ATM drive-up lanes separated from teller lanes, site security lighting photometrics, and stormwater for the highly impervious branch site. The civil set also handles the queuing analysis ${c} requires — a bank that stacks cars into the arterial doesn't get its permit`;
      return [
        ["The vault is a building inside the building", `Bank engineering in ${c} starts with the vault spec: ${sc.codeRef} govern the branch, but the vault's UL burglary rating dictates concrete thickness, rebar, and the door frame the structural engineer details. The vault is typically designed first and the branch wrapped around it — reversing that order is how projects end up with a vault that doesn't fit the structure.`],
        [`${cp.name} scope for banks`, `On bank work in ${c}, ${sys}. Fees track ${sc.feeNote}; branches are small but the vault, security coordination, and drive-thru civil work concentrate the engineering.`],
        ["What slows bank permits", `Security-vendor coordination and drive-thru traffic review. The bank's security consultant specifies systems the MEP engineer has to power and pathway — and that spec often arrives late. Meanwhile ${c} traffic review of the drive-thru queuing can force site plan revisions. Get both the security spec and the traffic study scoped during programming, not during plan check.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What does the vault structure require?`, `Reinforced concrete on all six sides to the specified UL burglary rating, with the door frame cast or grouted per the vault door manufacturer's details. The structural engineer designs for the vault's enormous dead load plus the building around it — in ${c}, the vault foundation is often the deepest element on the site.`],
      [`Do bank branches need special MEP?`, `Beyond the vault ventilation and security-system power, branches are straightforward commercial MEP — with two twists: after-hours zoning that doesn't condition the empty vault, and emergency power for security, communications, and IT. The security vendor's power and pathway requirements are the coordination item that most affects the electrical design.`],
      [`How many drive-thru lanes can a site fit?`, `That's a civil and traffic question: ${c} requires stacking length per lane so queues don't reach the street, plus turning geometrics for the design vehicle. The site plan balances lanes, ATM access, and pedestrian safety — on tight urban branches in ${s}, the drive-thru often determines whether the site works at all.`],
    ],
  },

  "parking-garage": {
    title: (t, c, a) => `${t} for Parking Garages in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for parking structures in ${c}, ${s}: post-tensioned decks, ventilation, EV charging, and durable garage engineering.`,
    h1: (t, c, a) => `${t} for parking garages in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Parking garages in ${c} look simple and punish simplification: open decks move with temperature, de-icing salts attack the concrete, and every ramp, turn, and clearance has to work for real drivers. Here's how ${cp.blurb} serves parking structure projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `enclosed-level CO ventilation with gas detection and controls, LED lighting design with uniformity for safety and energy code, EV charging distribution with load management (the fastest-growing garage MEP scope in ${c}), deck drainage with oil separation, and fire suppression and standpipes per the garage's open/closed classification. The electrical service has to anticipate charging growth — designing for today's EV count guarantees an expensive retrofit`
        : p === "structural"
        ? `post-tensioned or conventional concrete decks designed for vehicle loads, thermal movement, and long-term durability — the structural engineer details pour strips, expansion joints, and drainage slopes as one system. Ramp geometrics, helixes, and speed-bump-free transitions get structural coordination, and in ${s} seismic design for the open frame with its irregular diaphragm behavior. Waterproofing membranes and corrosion protection are structural durability decisions, not finishes`
        : `grading that delivers the required ramp slopes and clearances, stormwater for one of the most impervious structures in ${c}, traffic circulation and entry/exit geometrics coordinated with the street network, and pedestrian routes separated from vehicle paths. The civil engineer also designs the construction-phase shoring and dewatering for below-grade levels`;
      return [
        ["Durability is the design", `A garage in ${c} fails slowly and expensively: ${sc.codeRef} set the minimums, but chloride intrusion, joint failure, and drainage ponding are what actually kill decks. The engineering details that matter most — membrane selection, joint placement, drain slopes, concrete cover — are invisible on opening day and decisive at year twenty.`],
        [`${cp.name} scope for parking garages`, `For garage work in ${c}, ${sys}. Fees follow ${sc.feeNote}; garages are among the most cost-efficient structures per square foot, but the durability detailing and EV infrastructure are where the engineering judgment concentrates.`],
        ["EV charging changes the electrical", `Every new garage in ${c} should be EV-ready: conduit, panel space, and service capacity for a large fraction of stalls, even if day-one chargers are few. Retrofitting charging into a garage with no spare capacity means new service, new distribution, and coring finished decks — an order of magnitude more expensive than designing it in.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How long should a parking garage last?`, `50+ years with proper design and maintenance — but only if durability is engineered in: membranes, joint details, drainage, and concrete cover. Garages in ${s} that skip these details face major restoration at year 15–20. The structural engineer's durability spec is the difference.`],
      [`Do parking garages need ventilation?`, `Enclosed levels do — CO monitoring with demand-controlled exhaust fans is the code requirement in ${c}. Open decks ventilate naturally by meeting openness criteria in the code. The classification (open vs. enclosed) drives the entire MEP scope, so it's established early in design.`],
      [`Can an existing garage add EV charging?`, `Usually yes, but the electrical capacity check comes first: service size, panel space, and feeder routes through a finished concrete structure. A load study by the MEP engineer tells you how many chargers the existing service supports before anyone buys hardware.`],
    ],
  },

  "rooftop": {
    title: (t, c, a) => `${t} for Rooftop Projects in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for rooftop additions and equipment in ${c}, ${s}: structural verification, dunnage, screening, and code-compliant rooftop engineering.`,
    h1: (t, c, a) => `${t} for rooftop projects in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Every rooftop project in ${c} starts with the same question: can the existing roof carry it? New equipment, penthouses, solar arrays, and rooftop amenities all land on structure designed for a different load — and the engineer proves it works before anything goes up. Here's how ${cp.blurb} handles rooftop work in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `rooftop unit replacement and additions with curb, disconnect, and refrigerant-line routing, screening that meets ${c} mechanical screening ordinances without choking airflow, and coordination of new roof penetrations with the roofing warranty (the roofer's details are part of the MEP package). In ${s}, energy code triggers on equipment replacement — a like-for-like swap can still require controls and efficiency upgrades`
        : p === "structural"
        ? `verification of the existing roof framing for the new loads — the engineer reviews the original structural drawings, field-verifies the framing, and calculates whether the proposed equipment, dunnage, screen walls, or penthouse works with or without strengthening. New rooftop structures get full lateral design for wind and seismic, and in ${c} the anchorage of screen walls and equipment for wind uplift is the most-reviewed detail on the structural set`
        : `roof drainage redesign where new equipment or structures change flow paths — overflow scuppers and secondary drainage per code so a clogged primary drain doesn't pond the roof. For rooftop amenity decks in ${c}, the civil scope covers the plaza drainage and the waterproofing-protection assembly the structural engineer details`;
      return [
        ["Verify before you buy the equipment", `Rooftop engineering in ${c} is investigation-first: ${sc.codeRef} govern the new work, but the existing building's capacity governs the project. The structural verification — drawings review, field measurement, and calculation — should precede equipment procurement, because a roof that needs strengthening changes the budget before the crane is scheduled.`],
        [`${cp.name} scope for rooftop work`, `On rooftop projects in ${c}, ${sys}. Fees track ${sc.feeNote}; rooftop scopes are compact but investigation-heavy, and the verification report is often the most valuable deliverable.`],
        ["The screening trap", `${c} screening ordinances require equipment hidden from street view — but solid screen walls become sails in the wind, adding lateral load the existing roof may not have. The structural engineer sizes the screen-wall framing and its anchorage for wind, and the MEP engineer keeps clearances for airflow and service. Design the screen and the structure together, not as separate afterthoughts.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Can my building's roof support new HVAC units?`, `Maybe — that's exactly what the structural verification determines. The engineer checks the original design drawings, confirms the as-built framing in the field, and runs the numbers for the new unit weights plus code-required live and environmental loads. In ${c}, this verification is a standard (and inexpensive) engineering service.`],
      [`Do rooftop additions need a permit in ${c}?`, `Yes — equipment, screen walls, penthouses, and amenities all trigger building permits with structural review. Even equipment swaps can trigger energy-code upgrades. The permit package includes the structural verification or new design plus MEP for the equipment itself.`],
      [`What is dunnage?`, `The steel framing that spreads equipment loads across the roof structure — curbs, rails, and platforms that keep a 2,000-pound unit from point-loading a roof designed for uniform snow. The structural engineer sizes dunnage to the equipment weights and the verified capacity of the framing below.`],
    ],
  },

  "acoustic-design": {
    title: (t, c, a) => `${t}: Acoustic Design in ${c}, ${a}`,
    desc: (t, c, s) => `Acoustic engineering with ${t.toLowerCase()} in ${c}, ${s}: sound isolation, NC-rated HVAC, vibration control, and quiet-building design.`,
    h1: (t, c, a) => `${t}: acoustic design in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Acoustic design in ${c} is engineering you experience by not noticing it: the office where you can't hear the conference room, the residence where traffic disappears, the theater where the HVAC is silent. ${cp.blurb} carries the acoustic scope — here's how it works in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `HVAC designed to background-noise criteria (NC/RC ratings) — oversized low-velocity ductwork, silencers at air handlers, and vibration-isolated equipment so the mechanical system doesn't become the noise source. Sound-masking systems for open offices, and in ${c} the acoustic consultant's NC targets become binding MEP design inputs on performance venues, studios, and high-end residential`
        : p === "structural"
        ? `sound-isolation assemblies: STC-rated walls, IIC-rated floor-ceilings, and floating floors where footfall can't transmit — each an assembly the structural engineer details for both acoustic performance and structural adequacy. Resilient connections, isolated slabs, and mass-air-mass detailing, with field verification that the built assembly matches the rated design. In ${s}, the structural details are where acoustic designs most often fail in construction`
        : `site-noise assessment that sets the building's exterior envelope requirement — traffic, rail, and airport noise contours around ${c} determine the STC rating the facade must achieve. Setbacks, berms, and building orientation are the civil and site-design tools that reduce the noise reaching the building before the envelope has to stop it`;
      return [
        ["Acoustics is a number, not a feeling", `Acoustic engineering in ${c} works to measured criteria: ${sc.codeRef} set the baseline, but NC ratings for background noise, STC/IIC for isolation, and vibration criteria for sensitive spaces are the real design targets. The acoustic consultant (or the engineer wearing that hat) specifies numbers, and every ${cp.blurb} decision is checked against them.`],
        [`${cp.name} scope for acoustic design`, `For acoustic scopes in ${c}, ${sys}. Fees follow ${sc.feeNote}; acoustic work is usually a specialty overlay on a base building project, with the criteria-setting and verification testing as the distinct deliverables.`],
        ["Where acoustic designs die", `In the field: a 1/4-inch gap at a partition top, a rigid pipe hanger bridging an isolated ceiling, ductwork touching structure — each a flanking path that defeats the rated assembly. In ${c}, the acoustic scope should include construction observation of the critical details, because the best-rated assembly on paper performs at its weakest field connection.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is an NC rating?`, `Noise Criteria — the standard curve set rating background noise in a room, from NC-20 (very quiet: theaters, studios) to NC-45 (busy offices). The MEP engineer designs HVAC airflow, ductwork, and equipment selection to hit the NC target for each space type in ${c}.`],
      [`What is the difference between STC and IIC?`, `STC (Sound Transmission Class) rates how well a wall or floor blocks airborne sound — voices, music. IIC (Impact Insulation Class) rates footfall and impact noise through floors. A luxury condo in ${c} needs both: STC so you don't hear the neighbor's TV, IIC so you don't hear their footsteps.`],
      [`Can you fix noise in an existing building?`, `Sometimes — the engineer first measures and identifies the paths (flanking, duct-borne, structure-borne), then designs targeted treatments. Low-frequency and structure-borne noise are the hardest to retrofit. An acoustic assessment in ${c} before spending money tells you whether the fix is a sealant detail or a rebuild.`],
    ],
  },

  "waterproofing": {
    title: (t, c, a) => `${t}: Waterproofing in ${c}, ${a}`,
    desc: (t, c, s) => `Building waterproofing engineering with ${t.toLowerCase()} in ${c}, ${s}: below-grade systems, plaza decks, envelope detailing, and leak-free design.`,
    h1: (t, c, a) => `${t}: waterproofing in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Waterproofing in ${c} is the engineering discipline of keeping water where it belongs: below-grade walls dry, plaza decks draining, and envelopes shedding ${s} storms without a drop inside. It's detailed, unforgiving, and almost always cheaper designed than repaired. Here's the ${cp.blurb} scope.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `below-grade drainage and sump-pump systems sized for the water table the geotechnical report establishes, dehumidification for below-grade occupied space, and coordination of every MEP penetration through waterproofed walls — each penetration is a detailed, sequenced installation, not a cored hole. In ${c}, the MEP engineer also designs the leak-detection and monitoring for critical below-grade rooms`
        : p === "structural"
        ? `waterproof concrete design — waterstops at every joint, crack-control reinforcement, and hydrostatic pressure design for the below-grade walls and slabs. The structural engineer details the joints the waterproofing membrane depends on: a membrane over a moving, cracking joint fails regardless of product quality. In ${s}, the structural and waterproofing details are drawn as one coordinated set, because the warranty lives or dies at the interfaces`
        : `site drainage that keeps water away from the building — grading, perimeter drains, and stormwater systems sized so the waterproofing never sees more water than it was designed for. In ${c}, the civil engineer also manages construction-phase dewatering, which has to hold the excavation dry while the permanent waterproofing goes in`;
      return [
        ["Waterproofing is a system, not a product", `No membrane compensates for bad detailing: ${sc.codeRef} set minimums, but successful waterproofing in ${c} is the coordinated result of structural joint design, drainage that relieves hydrostatic pressure, and installation sequencing the drawings actually show. The projects that leak are the ones where waterproofing was a spec section instead of a designed system.`],
        [`${cp.name} scope for waterproofing`, `For waterproofing scopes in ${c}, ${sys}. Fees track ${sc.feeNote}; waterproofing engineering is front-loaded — the design and detailing effort that prevents a seven-figure leak repair later.`],
        ["The below-grade investigation", `Every below-grade waterproofing design in ${c} starts with the geotechnical report's water table and soil chemistry — the highest seasonal water level sets the hydrostatic design, and sulfates or chlorides in the soil attack both concrete and membranes. Designing waterproofing without the geotech data is guessing at the loads.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is the difference between waterproofing and dampproofing?`, `Dampproofing resists soil moisture; waterproofing resists hydrostatic water pressure. Below the water table in ${c}, only true waterproofing — membranes or waterproof concrete with waterstops — qualifies. The geotechnical report's water-table elevation decides which one the project needs.`],
      [`Why do basements leak in new buildings?`, `Almost always detailing and sequencing: joints without waterstops, penetrations cored after the membrane, drainage that clogs or was never connected. The membrane product is rarely the failure — the details and the installation order are. That's why the engineer details waterproofing as a system with the structural joints.`],
      [`Can waterproofing be fixed after construction?`, `Interior fixes manage water; they don't waterproof. True remediation usually means exterior excavation or injection grouting — both expensive and disruptive. In ${c}, the cost ratio of designed waterproofing to post-construction remediation is routinely 1:10 or worse.`],
    ],
  },

  "elevator": {
    title: (t, c, a) => `${t} for Elevators in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for elevator and escalator projects in ${c}, ${s}: hoistway structures, machine rooms, seismic design, and vertical-transportation engineering.`,
    h1: (t, c, a) => `${t} for elevators in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Adding an elevator in ${c} means threading a concrete-and-steel shaft through an existing building — or designing the shaft into new construction so the elevator contractor's equipment fits the first time. Here's how ${cp.blurb} serves elevator and escalator projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `hoistway ventilation and machine-room (or machine-room-less) cooling, elevator power with emergency/standby recall sequences, fire-service access and shunt-trip coordination, and sump/pit drainage. In ${c}, the elevator contractor provides equipment data — car weights, rail loads, machine loads — that become structural and electrical design inputs the engineer must receive before the shaft is drawn`
        : p === "structural"
        ? `hoistway framing: concrete or steel shaft walls designed for rail-bracket loads (the rails guide a moving multi-ton car), the pit with its buffers and waterproofing, machine beams or support for MRL equipment, and seismic design of the shaft and counterweight per ASME A17.1 as adopted in ${s}. For retrofit elevators in ${c}, the structural engineer also verifies the existing floors where the shaft lands and the roof where it terminates`
        : `site access for the elevator installation — the car, rails, and machine arrive as long, heavy pieces that need crane or freight access the civil and architectural plans provide. For exterior or parking-structure elevators in ${c}, the civil scope covers the pad, drainage, and accessible route to the new entry`;
      return [
        ["The equipment data comes first", `Elevator engineering in ${c} is equipment-driven: ${sc.codeRef} govern, but the specific car, counterweight, rail, and machine the owner selects set the loads, dimensions, and power the engineer designs to. Starting shaft design before the elevator submittal data arrives is how shafts get built too small — the industry's most expensive rework.`],
        [`${cp.name} scope for elevators`, `On elevator work in ${c}, ${sys}. Fees follow ${sc.feeNote}; elevator scopes are compact but coordination-intensive, with the equipment vendor's data as the critical-path input.`],
        ["Retrofit elevators in existing buildings", `The harder problem in ${c}: the shaft has to land on existing structure, dodge existing MEP, and meet accessibility and fire-service requirements the original building never contemplated. The structural assessment of the host building — and the field verification of what's actually there — precedes any shaft design.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Can an elevator be added to an existing building?`, `Usually yes — interior shafts, exterior additions, and parking-structure elevators are all standard retrofit types in ${c}. The structural engineer first verifies the host building can accept the shaft loads and the pit excavation; the elevator vendor's equipment data then drives the shaft design.`],
      [`What does the engineer need from the elevator contractor?`, `Certified equipment data: car and counterweight weights, rail bracket loads and spacing, machine loads and locations, power requirements, pit depths, and overhead clearances. In ${s}, the structural and electrical design can't be finalized until this data is in hand.`],
      [`Do elevators need emergency power?`, `Yes — code requires standby or emergency power for elevator recall and at least one car's operation during outages in most building types in ${c}. The MEP engineer coordinates the power source, transfer sequence, and fire-service controls with the elevator vendor.`],
    ],
  },

  "generator": {
    title: (t, c, a) => `${t} for Generator Systems in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for backup generator systems in ${c}, ${s}: sizing, fuel, sound attenuation, seismic anchorage, and emergency-power engineering.`,
    h1: (t, c, a) => `${t} for generator systems in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Backup generators in ${c} are insurance you engineer: the sizing study, fuel strategy, and sound design decide whether the lights stay on — and whether the neighbors stay happy. Here's how ${cp.blurb} serves generator and emergency-power projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `load analysis and generator sizing (kW/kVA with motor-starting and harmonic analysis, not just connected load), automatic transfer switch schemes and selective coordination, fuel system design — diesel day-tanks and storage or natural-gas service with utility coordination — exhaust routing with emissions compliance, and sound-attenuated enclosures designed to ${c} noise ordinance limits at the property line. In ${s}, the fuel-storage permitting (fire marshal, air quality) runs parallel to the building permit`
        : p === "structural"
        ? `generator pad and vibration-isolated mounting — a multi-ton machine that shakes — with seismic anchorage per ASCE 7 so the emergency system survives the event it's meant to ride through. Enclosure and screen-wall framing for wind, fuel-tank supports and secondary containment structures, and in ${c} the structural design of rooftop generator installations where the host roof must be verified first`
        : `fuel delivery access and spill containment grading, setbacks from property lines and buildings per ${c} fire code, acoustic screening with landscaping or walls, and stormwater for the generator yard. The civil site plan also resolves the exhaust discharge location — away from air intakes and operable windows, which the MEP engineer specifies`;
      return [
        ["Sizing is the engineering", `Generator projects in ${c} succeed or fail at the load study: ${sc.codeRef} set the installation rules, but the one-line diagram, transfer scheme, and fuel autonomy all flow from an accurate picture of what must stay powered and for how long. Oversizing wastes capital and ruins efficiency; undersizing fails the facility when it matters.`],
        [`${cp.name} scope for generators`, `For generator work in ${c}, ${sys}. Fees track ${sc.feeNote}; the load study and the fuel/noise permitting are the two efforts owners most often underestimate.`],
        ["The neighbor problem", `Generators are loud and test regularly — ${c} noise ordinances and conditional-use permits govern testing hours and property-line sound levels. The acoustic design (enclosure rating, exhaust silencers, testing schedule) should be settled during programming in ${s}, because retrofitting attenuation onto an installed generator costs multiples of designing it in.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How big a generator do I need?`, `That's the load study: the engineer inventories critical loads, analyzes motor starting and harmonics, and sizes the machine with appropriate margin — typically 125% of the calculated standby load. In ${c}, guessing from square footage is how projects end up with generators that trip on startup.`],
      [`Diesel or natural gas?`, `Diesel offers on-site fuel autonomy (days of runtime with storage) but needs fuel permitting, polishing, and emissions compliance. Natural gas avoids storage but depends on utility reliability — which has failed during the same storms that cause outages in ${s}. The engineer models both against the facility's required runtime.`],
      [`Do generators need seismic anchorage?`, `Yes — emergency systems are designated seismic systems in ${s}, and the anchorage is designed so the generator stays put and functional through the design earthquake. An unanchored generator that walks off its pad during the event it was bought for is the definition of a failed design.`],
    ],
  },

  "kitchen-design": {
    title: (t, c, a) => `${t} for Commercial Kitchens in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for commercial kitchens in ${c}, ${s}: exhaust hoods, grease waste, gas, and health-department-ready kitchen engineering.`,
    h1: (t, c, a) => `${t} for commercial kitchens in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Commercial kitchens in ${c} pack the densest MEP of any building space: Type I hoods over every cooking surface, grease waste to interceptors, gas trains, and dishwashing steam — all reviewed by the health department alongside building plan check. Here's how ${cp.blurb} serves commercial kitchen projects in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `Type I kitchen exhaust hoods sized to the cooking equipment lineup with dedicated makeup air (the most-missed design element — exhaust without makeup air starves the building), grease duct construction and clearances per code, gas piping with seismic shutoff valves where ${s} requires, plumbing with grease interceptor sizing coordinated with the health department, and electrical service with load calcs for the cooking, refrigeration, and dishwashing loads. In ${c}, the equipment schedule locks before design — every fryer and range changes the engineering`
        : p === "structural"
        ? `rooftop exhaust fan and makeup-air unit supports with curbs and seismic/wind anchorage, walk-in cooler and freezer floor loading, and verification of the existing roof structure in retrofit kitchens — older ${c} retail shells frequently need the roof checked before the first fan goes up. Mezzanine storage and heavy cooking equipment get their own load paths to the foundation`
        : `grease interceptor location, sizing, and sanitary connection with the health department's approval, kitchen waste routing separated from dining restrooms, loading and delivery access for food service, and trash/corral drainage. In ${c}, the interceptor is often outside the building footprint — the civil engineer coordinates its location with paving, landscaping, and utility conflicts`;
      return [
        ["Start from the equipment list", `Kitchen engineering in ${c} is equipment-driven: ${sc.codeRef} govern, but the cooking lineup — what cooks, how, and at what BTU — sets exhaust rates, gas sizes, electrical loads, and grease waste. Designing the kitchen before the equipment is selected is the industry's classic expensive mistake; the health department agrees, since it reviews the equipment plan first.`],
        [`${cp.name} scope for commercial kitchens`, `For kitchen work in ${c}, ${sys}. Fees follow ${sc.feeNote}; kitchens are the densest MEP per square foot in commercial construction, and the dual health/building review adds coordination the fee reflects.`],
        ["Makeup air is the silent killer", `Exhaust 5,000 CFM from a kitchen without designed makeup air and the building goes negative: doors won't close, pilot lights flutter, and the dining room smells like the fryer. In ${c}, plan check now flags unbalanced kitchen ventilation routinely — the makeup-air design isn't optional, it's the other half of the exhaust system.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is a Type I hood?`, `The grease-rated exhaust hood required over commercial cooking equipment that produces grease-laden vapors — fryers, ranges, grills. Type I hoods need welded grease duct, specific clearances to combustibles, and dedicated makeup air. In ${c}, the hood type and size come from the equipment lineup, and plan check verifies the match.`],
      [`Do I need a grease interceptor in ${c}?`, `For commercial food service — almost certainly yes. The health department and the ${c} sewer authority both require grease separation before discharge, with sizing based on fixture units or seating. The interceptor location (usually outside, below grade) is a civil design item that affects the whole site plan.`],
      [`Can I convert a retail space to a restaurant kitchen?`, `Often, but the investigation comes first: panel capacity, gas service size, roof structure for exhaust fans, and whether the sanitary lateral can accept a grease interceptor. In ${c}, base-building capacity shortfalls are the most common reason restaurant conversions stall — verify during lease negotiation.`],
    ],
  },

  "cleanroom": {
    title: (t, c, a) => `${t} for Cleanrooms in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for cleanrooms and labs in ${c}, ${s}: HEPA filtration, pressurization cascades, process utilities, and contamination-controlled engineering.`,
    h1: (t, c, a) => `${t} for cleanrooms in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Cleanrooms in ${c} are buildings that manufacture air: particle counts, pressurization cascades, and temperature control held to tolerances that make office HVAC look casual. Semiconductor, pharma, and biotech work in ${s} demands engineering at a different precision — here's the ${cp.blurb} scope.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `HEPA/ULPA filtration with air-change rates set by the ISO classification (tens to hundreds of changes per hour), pressurization cascades that step pressure from the cleanest room outward, process utilities — DI water, process gases, vacuum, specialty exhaust — each a designed distribution system, and N+1 redundancy on the air handlers because a cleanroom that loses filtration loses product. In ${c}, the sequence of operations and the commissioning/validation protocol are engineered deliverables, not contractor means and methods`
        : p === "structural"
        ? `vibration criteria for lithography and metrology tools — measured in micro-inches per second, with the structural engineer designing stiffened floors or isolated foundations to meet them. Heavy process equipment and interstitial mechanical floors add concentrated loads, and in ${s} the seismic design covers both the structure and the nonstructural cleanroom envelope that must remain particle-tight after an event`
        : `chemical storage and waste treatment with secondary containment, loading docks designed for tool move-in (semiconductor tools arrive on air-ride trailers and need precise, level access), and water supply for the enormous process-water demand. In ${c}, the industrial wastewater discharge permit for cleanroom effluent is a long-lead agency approval that starts during programming`;
      return [
        ["Classification drives everything", `Cleanroom engineering in ${c} starts with the ISO class: ${sc.codeRef} apply, but ISO 14644's particle limits set air-change rates, filtration levels, pressurization, and gowning sequences. A Class 100 (ISO 5) suite and a Class 100,000 (ISO 8) corridor are different buildings sharing a roof — the engineer zones them accordingly.`],
        [`${cp.name} scope for cleanrooms`, `For cleanroom work in ${c}, ${sys}. Fees track ${sc.feeNote}; cleanrooms are among the highest engineering intensity per square foot in any building type, with validation and commissioning as major scope components.`],
        ["Vibration is the hidden criterion", `The tools dictate the structure: semiconductor lithography can't tolerate floor vibration the human body can't even feel. In ${c}, the vibration survey of the site — measuring ambient ground motion before design — determines whether the project needs a standard slab, a stiffened waffle slab, or an isolated foundation. That survey happens during site selection, not after the building is framed.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What ISO class do I need?`, `It depends on the process: semiconductor lithography needs ISO 3–5, pharma sterile filling ISO 5–7, medical device assembly ISO 7–8. The process engineer or tool vendor specifies the class; the MEP engineer then designs air changes, filtration, and pressurization to achieve it in ${c}.`],
      [`Why are cleanrooms so expensive to engineer?`, `Precision at every layer: redundant HEPA air handlers, process utility distribution, vibration-controlled structure, and a validation protocol proving the room performs. The commissioning and qualification documentation alone can exceed the design fee of a conventional building in ${s}.`],
      [`Can an existing building become a cleanroom?`, `Sometimes — the checks are floor vibration (measure first), floor-to-floor height for the deep mechanical distribution, and structural capacity for the heavy air handlers. In ${c}, vibration is the most common disqualifier: a site next to rail or heavy traffic may never meet the tool spec regardless of the building.`],
    ],
  },

  "home-builder": {
    title: (t, c, a) => `${t} for Home Builders in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for production and custom home builders in ${c}, ${s}: plan-check corrections, repeat plan sets, value engineering, and builder-paced engineered support.`,
    h1: (t, c, a) => `${t} for home builders in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Home builders in ${c} don't buy engineering the way a one-off owner does: they need plan sets that clear plan check the first time, corrections turned in days not weeks, and details their crews can build repeatedly without RFIs. ${cp.blurb} for production and custom builders is a throughput game — here's how it works in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `production HVAC design with Manual J/S/D done once and repeated across plan types, plumbing layouts standardized per model with water-heater and gas sizing verified against ${c} amendments, and electrical panel schedules that match what the builder actually stocks. In ${s}, Title-24-style energy compliance (or the local equivalent) is the MEP scope that most often holds up a builder's permit — getting the energy model right on the master plan prevents re-running it for every lot`
        : p === "structural"
        ? `repeatable framing plans with prescriptive paths used wherever the code allows and engineered details only where they pay: shear wall schedules standardized per plan type, foundation details tuned to ${c} soils (expansive clay versus caliche changes everything), and truss package coordination so the truss company's layout matches the sealed framing plan. For production builders in ${s}, the structural set is a product — consistent, buildable, and correction-proof`
        : `lot-specific grading and drainage for each release, utility service coordination with ${c} providers across the subdivision, retaining walls and lot-to-lot drainage details that prevent the callbacks builders dread, and SWPPP compliance during mass grading. In ${s}, the civil engineer is also the one who keeps the improvement plans moving through the city while vertical construction starts`;
      return [
        ["Builders need speed, not studies", `A production builder in ${c} measures engineering in days-to-permit and corrections-per-release. The engineering has to fit the builder's machine: master plans with options that don't trigger re-engineering, standard details the superintendents already know, and a correction turnaround measured in days. ${sc.codeRef} compliance is table stakes — the differentiator is an engineer who has built for builders before and prices like it. The builders who win in ${s} treat the engineer as production support: redlines reviewed the same day, standard details that never change without a release note, and a single point of contact who knows the plan library. That relationship is worth more than a low per-sheet fee, because a stalled release costs the builder carrying costs that dwarf engineering.`],
        [`${cp.name} scope for home builders`, `For builder work in ${c}, ${sys}. Fees follow ${sc.feeNote}; production builders typically negotiate per-plan or per-release pricing because the work repeats, while custom builders pay per project with heavier structural involvement.`],
        ["What kills a builder's schedule", `Three things: plan-check corrections that sit for three weeks, details the field can't build (which generate RFIs that stop crews), and energy compliance redone from scratch on every plan. The fix is an engineer embedded in the builder's process — reviewing redlines fast, standardizing what repeats, and engineering the options (bonus rooms, extended patios) once so sales can sell them without re-permitting. In ${c}, builders who treat engineering as a vendor lose weeks; builders who treat it as a department gain them. The antidote is process discipline on both sides: the builder freezes plan changes before engineering starts, and the engineer staffs builder work with people who answer the phone. In ${s}, the best builder-engineer relationships run on standing weekly calls during active releases — fifteen minutes that prevent the three-week surprises.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How fast can you turn a plan-check correction in ${c}?`, `For production builders, corrections go back in days — the details are standardized, so most corrections are markups on known sheets, not redesigns. Custom builder corrections depend on the comment depth, but the target is always the next submittal cycle, never the one after. Speed is the whole product.`],
      [`Do you do per-plan pricing for production builders?`, `Yes. Production work prices per plan type or per release because the engineering repeats — the first plan carries the design cost and the repetitions carry drafting and coordination. Custom homes price per project. Either way the proposal lists every sheet so the builder can compare apples to apples.`],
      [`Can you handle energy compliance for our plans?`, `Yes — energy modeling and compliance documentation for the master plans, with the forms set up so repetitions and options don't trigger remodels. In ${s}, energy compliance is the most common avoidable permit delay for builders, and it's entirely a paperwork-and-modeling problem the engineer should own.`],
    ],
  },

  "distribution-center": {
    title: (t, c, a) => `${t} for Distribution Centers in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for distribution centers in ${c}, ${s}: high-bay structures, ESFR sprinklers, dock design, truck courts, and logistics-ready engineered plans.`,
    h1: (t, c, a) => `${t} for distribution centers in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A distribution center in ${c} is a concrete box engineered around the trailer: 40-foot clear heights, dock doors every few thousand square feet, and a truck court that never stops moving. ${cp.blurb} for DCs is about throughput — here's what that means in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `ESFR fire suppression design for high-piled storage — the sprinkler and water supply design drives the fire pump, tank, and service sizing for the whole building. High-bay heating and ventilation for a volume with minimal occupancy, LED high-bay lighting with controls, and dock equipment power (levelers, restraints, seals) at every door. In ${c}, the fire marshal's high-piled storage review is the MEP scope that most often surprises developers`
        : p === "structural"
        ? `tilt-up concrete panels or PEMB designed for the clear height and the racking loads the tenant will install — 36 to 40 feet clear is the ${s} market standard now, and the structure has to handle future rack configurations the engineer will never see. Floor flatness (FF/FL numbers) for narrow-aisle forklifts is a structural-adjacent spec that gets written into the slab design, and dock leveler pits interrupt the slab edge at every door`
        : `truck court paving designed for fully-loaded trailer axle loads with concrete (not asphalt) in the maneuvering lanes, dock apron grading for drainage away from the building, trailer staging and queuing that keeps trucks off ${c} streets, and stormwater for the enormous impervious footprint. In ${s}, the civil package also resolves rail service where sites have it — spur geometry and loading clearances`;
      return [
        ["Clear height is the market", `Tenants in ${c} lease cubic feet, not square feet: every foot of clear height is rentable storage, which is why ${s} spec DCs keep climbing from 32 to 36 to 40 feet. That height cascades through every discipline — taller panels, bigger sprinklers, deeper water supply, higher lighting loads. The engineer who designs a 32-foot building in a 40-foot market has designed an obsolete building. The structural implications compound: taller panels need heavier foundations, the fire protection demand grows with storage height, and the lighting and heating loads follow the volume. Developers in ${s} who try to save on structure by shaving clear height discover the building leases slower and for less — the market has spoken, and it wants cubic feet.`],
        [`${cp.name} scope for distribution centers`, `On DC work in ${c}, ${sys}. Fees track ${sc.feeNote}; distribution centers are efficient per square foot because the architecture is minimal, but the fire protection and paving scopes concentrate the engineering cost.`],
        ["The fire review comes early", `High-piled storage in ${c} triggers a separate fire review beyond building plan check: commodity classification, storage height, sprinkler design criteria, and smoke/heat venting all get scrutinized. Engage the fire protection engineer during site planning — discovering ESFR water-supply requirements after the building is designed means upsizing services, pumps, and sometimes the water main. The practical move is a pre-submittal meeting with the fire reviewer before the building design is finished: commodity classification, storage arrangement, and sprinkler criteria get locked while changes are still cheap. In ${s}, developers who skip this meeting routinely discover six-figure water-supply upgrades during plan check.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is ESFR and why does my DC need it?`, `Early Suppression Fast Response sprinklers are the standard for high-piled storage — they suppress fires in tall rack configurations where conventional sprinklers can't. In ${c}, ESFR drives the water supply design: bigger mains, fire pumps, and sometimes on-site tanks. It's the single largest MEP cost driver on a distribution center.`],
      [`How flat does a warehouse floor need to be?`, `For narrow-aisle and very-narrow-aisle forklifts, the slab needs specified FF/FL flatness numbers — typically FF50/FL35 or tighter. The structural engineer writes the flatness spec and the curling/joint detailing that achieves it; a wavy floor in a high-bay DC is a permanent operations problem.`],
      [`How many dock doors does a DC need?`, `The ${s} rule of thumb runs one door per 5,000–10,000 square feet depending on the operation — cross-dock needs far more than bulk storage. The engineer needs the tenant's (or developer's pro forma) door count and trailer staging assumptions before site design, because the truck court geometry follows the doors.`],
    ],
  },

  "manufacturing-plant": {
    title: (t, c, a) => `${t} for Manufacturing Plants in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for manufacturing plants in ${c}, ${s}: process loads, crane rails, heavy power, industrial ventilation, and production-ready engineered design.`,
    h1: (t, c, a) => `${t} for manufacturing plants in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A manufacturing plant in ${c} is a building designed around the process line: the equipment list sets the power, the ventilation, the floor loads, and the crane rails — the architecture just keeps the weather off. ${cp.blurb} for manufacturing starts from the process and works outward.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `process power distribution with the service sized from the equipment list — motors, ovens, welders, compressors — plus power quality (harmonics, sags) where the process is sensitive. Industrial ventilation for fumes, dust, and heat: make-up air, exhaust, and dust collection designed to NEC classified-area rules where solvents or combustibles are present. Compressed air, process water, and gas piping round out the MEP set, and in ${c} the air-quality permit often paces the project`
        : p === "structural"
        ? `crane rails and runway beams for bridge cranes — the building frame gets designed around the crane loads, including impact and lateral surge. Equipment foundations isolated from the building slab for vibration (stamping presses, forges), mezzanines for process support, and floor loading for the heaviest single piece of equipment plus its maintenance envelope. In ${s}, the structural engineer needs certified equipment weights and anchor details, not catalog cuts`
        : `heavy-duty paving for truck and forklift traffic with concrete sections designed for the axle loads, rail spur geometry where sites have rail service, process wastewater pretreatment before discharge to the ${c} system, and stormwater for the large impervious area. The civil package also handles outdoor storage, tank farms, and the fire-lane access that ${c} requires around industrial occupancies`;
      return [
        ["The equipment list is the program", `Every manufacturing project in ${c} lives or dies on the equipment list: each machine brings power demand, ventilation need, floor load, vibration, and utility connections. ${sc.codeRef} all apply, but the process equipment writes the real program. The engineer who starts design before the equipment list is locked designs twice — and the second design costs more than the first. Smart owners in ${c} bring the engineer into equipment selection: the difference between two functionally identical machines can be a utility upgrade, a foundation redesign, or a ventilation overhaul. Early engineering input on equipment choices routinely saves multiples of the engineering fee in avoided construction cost.`],
        [`${cp.name} scope for manufacturing plants`, `On manufacturing work in ${c}, ${sys}. Fees follow ${sc.feeNote}; manufacturing engineering runs above standard industrial because the process scope is essentially custom engineering for every machine.`],
        ["Permits beyond the building permit", `Manufacturing in ${c} triggers permits the building department never sees: air-quality (dust, fumes, solvents), industrial wastewater discharge, hazardous materials storage, and sometimes state environmental review. The engineer coordinates the building permit while the owner pursues the process permits — but the building design has to anticipate them, because a ventilation change ordered by the air district after construction is brutally expensive. The sequencing matters: air-quality and wastewater applications should run parallel to building design, with the building engineer coordinating the design assumptions both permits share. In ${s}, the owners who treat environmental permits as the contractor's problem discover the building can't be occupied until permits the contractor never heard of are issued.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What does the engineer need from us before design starts?`, `The equipment list: every machine with power requirements, ventilation needs, weight, dimensions, and utility connections. Certified weights and anchor details for anything over a few tons. The process flow — how material moves through the plant — because it sets the building layout. In ${c}, starting design without this information guarantees redesign.`],
      [`Do we need crane rails in the building?`, `If the process moves anything heavy — coils, dies, castings, assemblies — bridge cranes are usually cheaper over the building's life than forklifts for the heaviest lifts. The structural engineer designs the runway beams and columns for crane impact and surge loads; adding crane capacity later to a building not designed for it is rarely economical.`],
      [`What environmental permits does manufacturing need in ${s}?`, `It depends on the process: air-quality permits for dust/fumes/solvents, industrial wastewater discharge permits, hazardous materials business plans, and sometimes stormwater industrial permits. The building engineer doesn't pull these, but the building design — ventilation, containment, drainage — has to satisfy them.`],
    ],
  },

  "cold-storage": {
    title: (t, c, a) => `${t} for Cold Storage in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for cold storage facilities in ${c}, ${s}: insulated envelopes, refrigeration systems, frost-heave protection, and freezer-ready engineered design.`,
    h1: (t, c, a) => `${t} for cold storage in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A cold storage warehouse in ${c} is a thermos the size of a city block: hold -10°F inside while ${s} summer pushes 110°F outside, and do it without heaving the slab or bankrupting the owner on power. ${cp.blurb} for cold storage is building-science engineering at industrial scale.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `refrigeration system design — ammonia, CO2, or synthetic refrigerant — with the machinery room treated as a classified occupancy with gas detection, ventilation, and emergency shutdown. The refrigeration load includes transmission through the envelope, infiltration at every dock door (fast doors and air curtains are energy equipment, not accessories), and the product load itself. In ${c}, the refrigeration machinery room triggers mechanical-code and fire-code reviews beyond the base building permit`
        : p === "structural"
        ? `the slab is the critical structural element: freezer slabs need insulation below and often a heated glycol loop to prevent frost heave from lifting the floor — a heaved freezer slab is a total loss. Insulated metal panel walls span between columns with thermal-break detailing, and the roof structure carries the refrigeration piping and evaporator units. In ${s}, the structural set also covers the dock leveler pits and the panelized office that sits inside the thermal envelope`
        : `grading and drainage that keep water away from the freezer foundation (water plus freezing equals heave), truck court paving for refrigerated trailer staging with plug-in electrical at the docks, and stormwater for the large footprint. In ${c}, the civil package also coordinates the utility service for the refrigeration plant — a cold storage facility's electrical demand rivals light manufacturing`;
      return [
        ["Frost heave destroys freezers", `The ground under a -10°F slab wants to freeze and expand, and expanding soil lifts concrete with irresistible force. Every cold storage slab in ${c} gets designed against frost heave: insulation below the slab, and usually a glycol heat loop in the subgrade holding the soil above freezing. ${sc.codeRef} don't spell this out — it's freezer-specific engineering that the civil and structural engineers own jointly, and skipping it is the most expensive mistake in cold storage. The engineering is well-established but unforgiving of shortcuts: the insulation R-value, the glycol loop spacing, and the slab joint detailing all follow freezer-industry practice that ${sc.codeRef} don't fully capture. Owners in ${s} should treat any proposal to omit the subgrade heating as a proposal to rebuild the floor in five years.`],
        [`${cp.name} scope for cold storage`, `On cold storage work in ${c}, ${sys}. Fees track ${sc.feeNote}; cold storage engineering runs above standard warehouse because the envelope, slab, and refrigeration systems are specialized.`],
        ["Refrigerant choice shapes the building", `Ammonia is efficient but triggers stringent machinery-room and emergency-planning requirements; CO2 and synthetics ease the regulatory burden but change the equipment layout. The owner and engineer lock the refrigerant strategy during programming in ${c} — it determines the machinery room size, the ventilation design, the gas detection, and the hazmat review path. Energy modeling settles the operating-cost question, but the regulatory path often decides: ammonia's efficiency advantage in ${s} has to be weighed against the emergency-planning, community-notification, and insurance implications. The decision belongs to the owner with the engineer's analysis — made once, during programming, and never revisited mid-design.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why do freezer slabs need heat underneath?`, `To prevent frost heave: the frozen ground below a freezer slab expands and lifts the floor, cracking it beyond repair. A glycol heating loop in the subgrade keeps the soil above freezing. It's standard practice on every engineered freezer in ${s} — and the most commonly value-engineered-out item by owners who don't understand the failure mode.`],
      [`Ammonia vs. CO2 vs. synthetic refrigerant?`, `Ammonia is the most energy-efficient for large freezers but brings strict machinery-room, detection, and emergency-response requirements. CO2 (transcritical) avoids ammonia regulation with a efficiency penalty in hot climates like ${s}. The engineer models the trade-off — energy cost versus regulatory burden — during programming.`],
      [`How much power does a cold storage facility use?`, `Roughly 3–5 times a dry warehouse of the same size — refrigeration dominates. The ${c} utility service, the electrical distribution, and the backup power strategy all size from the refrigeration load, so the refrigeration engineer and the electrical engineer coordinate from day one.`],
    ],
  },

  "self-storage": {
    title: (t, c, a) => `${t} for Self-Storage in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for self-storage facilities in ${c}, ${s}: unit mix layouts, fire separation, climate-controlled buildings, and investor-ready engineered plans.`,
    h1: (t, c, a) => `${t} for self-storage in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `Self-storage in ${c} is a yield-per-square-foot business wearing a simple metal building: the unit mix, the climate-controlled revenue premium, and the fire separations between buildings determine the pro forma. ${cp.blurb} for self-storage is pro-forma engineering — here's how it works in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `climate-controlled buildings need full HVAC with dehumidification — ${c} humidity plus stored furniture equals mold claims — designed for the big open volumes and minimal internal loads. Fire suppression per the storage configuration (high-piled rules can apply to upper levels), security and access-control power and low-voltage pathways, and site lighting for 24-hour operation. In ${s}, the MEP scope splits sharply: drive-up non-climate buildings need almost nothing, climate-controlled buildings need real systems`
        : p === "structural"
        ? `single-story slab-on-grade buildings are straightforward, but multi-story self-storage — the urban ${c} model — is a real structure: floor loading for storage (125 psf design is common), freight elevator shafts, and fire-rated floor assemblies. Partition systems between units need engineering where they serve as fire separations, and in ${s} the corridor and stair pressurization for multi-story follows high-rise-adjacent rules`
        : `site layout is the civil engineer's pro forma lever: building spacing for fire separation versus rentable area, drive-aisle widths for moving trucks (not just cars), RV and boat storage yards with appropriate paving, and stormwater for the highly impervious site. In ${c}, the access drive throat and queuing for the rental office gate control the site plan more than anything else`;
      return [
        ["Unit mix is the architecture", `The developer's unit mix — how many 5x5s versus 10x30s, climate versus drive-up — is the building program. The engineer in ${c} designs the fire separations, the structural system, and the MEP around that mix, and changes to the mix after design are redesigns. ${sc.codeRef} compliance is straightforward; the engineering risk is all in late program changes. Developers in ${c} finalize the mix during entitlements with the engineer's input on what each mix means for fire separations and construction type: a shift from drive-up to climate-controlled mid-design is effectively a new project. The pro forma and the engineering have to agree before the first drawing, because they can't be reconciled after.`],
        [`${cp.name} scope for self-storage`, `For self-storage in ${c}, ${sys}. Fees follow ${sc.feeNote}; single-story drive-up is among the cheapest commercial engineering per square foot, while multi-story climate-controlled approaches conventional commercial cost.`],
        ["Fire separation drives the site plan", `The distance between storage buildings — or the rated walls between them — is the dominant site-planning constraint in ${c}. Closer buildings mean more rentable square feet but require rated construction; wider spacing wastes land but simplifies the buildings. The engineer and developer optimize this trade during entitlements, because the fire separation strategy is nearly impossible to change after permits. The optimization is genuinely mathematical: land cost per square foot versus rated-construction cost per square foot, solved across the building spacing options. In ${s}, the engineers who do this math with the developer during feasibility save the redesign that happens when the fire reviewer does the math during plan check.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Single-story or multi-story self-storage in ${c}?`, `It depends on land cost: where ${c} land is cheap, single-story drive-up wins on construction cost and operations. Where land is expensive, multi-story climate-controlled pencils — but the engineering cost per square foot roughly doubles with elevators, rated assemblies, and real MEP. The pro forma decides, and the engineer prices both during feasibility.`],
      [`Do storage units need fire sprinklers?`, `It depends on the configuration: single-story drive-up buildings often qualify for unsprinklered designs under ${s} code with proper separations, while multi-story and climate-controlled buildings typically require suppression. The fire review in ${c} hinges on the exact building arrangement — confirm the suppression trigger during programming.`],
      [`What floor loading do storage buildings need?`, `Design commonly uses 125 psf for storage floors — well above office loading — because tenants store dense goods (books, files, equipment). The structural engineer designs the elevated floors and foundations for it; under-designed storage floors are a latent liability that surfaces when the building is full.`],
    ],
  },

  "car-dealership": {
    title: (t, c, a) => `${t} for Car Dealerships in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for auto dealerships in ${c}, ${s}: showrooms, service bays, lifts, paint booths, and franchise-ready engineered design.`,
    h1: (t, c, a) => `${t} for car dealerships in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A car dealership in ${c} is three buildings in one: a glass-box showroom, an industrial service department, and a parking lot that holds the actual inventory. ${cp.blurb} for dealerships has to satisfy the manufacturer's brand standards and the building code at the same time.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `service department ventilation — vehicle exhaust extraction at every bay, plus paint booth make-up air and exhaust where the dealer has body-shop operations. Lifts need compressed air and electrical at each bay, the parts department needs its own HVAC zoning, and the showroom wants high-end lighting and comfort cooling for the glass box. In ${c}, the oil-water separator on the service drains is the MEP item the plumbing reviewer always checks`
        : p === "structural"
        ? `showroom long-span glazing with minimal columns (cars need sightlines), service bay slabs designed for two-post and in-ground lifts with the lift manufacturer's point loads and anchor details, and the parts mezzanine. In ${s}, the service department floor drainage slopes to trench drains — the structural slab detailing and the plumbing rough-in have to be coordinated before the slab is poured, because neither can move afterward`
        : `inventory display parking — hundreds of stalls with the grading, lighting, and security the franchise requires — plus customer and service circulation that keeps the public away from the shop. Stormwater for the enormous paved area, and in ${c} the display lighting photometrics often trigger neighbor and dark-sky review. The civil set also handles the car-wash and fuel island where the dealer has them`;
      return [
        ["Brand standards meet building code", `Every franchise in ${c} arrives with a brand-standards book: showroom dimensions, pylon sign criteria, service bay counts, image-program finishes. The engineer's job is making the brand's prototype satisfy ${sc.codeRef} and the ${c} amendments — which the prototype, drawn for national use, frequently doesn't. Prototype review before site adaptation saves the redesign cycle. The efficient path is a prototype-conformance review at project kickoff: the engineer redlines the brand package against ${s} codes and ${c} amendments, producing a conflict list the design resolves systematically. Owners who skip this step pay for it in correction cycles — the brand's architect draws for the brand, not for the jurisdiction.`],
        [`${cp.name} scope for dealerships`, `On dealership work in ${c}, ${sys}. Fees track ${sc.feeNote}; the service department concentrates the MEP and structural engineering while the showroom concentrates the architectural cost.`],
        ["The service department is the engineering", `Showrooms photograph well, but the service bays are where the engineering lives: exhaust extraction, compressed air, lift loads, oil-water separation, parts storage, and the workflow that moves cars through without backing up. In ${c}, service departments designed as afterthoughts produce the callbacks — ventilation complaints, drain backups, lift slab cracks — that the dealer remembers long after the showroom opening. The design details that matter are unglamorous: trench-drain slopes that actually drain, exhaust drops positioned for the lift layout, air hose reels where techs work, and the parts-department adjacency that keeps the shop moving. In ${s}, dealers remember the service department that works and forget the showroom within a year.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do you work with manufacturer brand standards?`, `Yes — the franchise prototype gets reviewed against ${s} codes and ${c} amendments before site adaptation, and the conflicts (egress, energy, structural, accessibility) get resolved in the design rather than discovered in plan check. Bring the brand book to the first meeting.`],
      [`What is an oil-water separator and do we need one?`, `A plumbing device that keeps motor oil and shop contaminants out of the sanitary sewer — required wherever vehicles are serviced or washed in ${c}. The plumbing engineer sizes it from the fixture count and the ${c} pretreatment rules; it's a standard plan-check item on every dealership service department.`],
      [`How many service bays should the shop have?`, `The dealer and manufacturer set the count from sales volume and service throughput — the engineer designs what they're given. What the engineer does control is making the bay count work: ventilation per bay, lift power and air, parts adjacency, and the circulation that keeps the shop from gridlocking at peak.`],
    ],
  },

  "fast-food": {
    title: (t, c, a) => `${t} for Fast-Food Restaurants in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for quick-service restaurants in ${c}, ${s}: drive-thru stacking, grease interceptors, prototype adaptation, and franchise-paced engineered plans.`,
    h1: (t, c, a) => `${t} for fast-food restaurants in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A fast-food restaurant in ${c} is a prototype executed at speed: the franchise has built a thousand of them, but none in this jurisdiction, on this lot, with this drive-thru. ${cp.blurb} for QSR is prototype adaptation at franchise pace — here's the playbook in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `kitchen exhaust hoods with the make-up air to match — QSR hoods are the dominant HVAC load in the building — plus grease interceptor sizing per ${c} pretreatment rules, gas service for the fryers and grills, and the walk-in refrigeration electrical. The dining room HVAC is straightforward; the kitchen is the engineering. In ${s}, the health department plan check runs parallel to building plan check and reviews the kitchen independently`
        : p === "structural"
        ? `prototype structural systems adapted to ${s} wind and seismic — the national prototype's lateral design rarely matches local requirements without re-engineering. Canopy and drive-thru cover structures, pylon sign foundations (the sign is a structure with its own permit in ${c}), and the slab with grease-containment detailing at the kitchen. Franchise prototypes almost always need structural re-certification for the local jurisdiction`
        : `drive-thru stacking and circulation — the site plan lives or dies on the queue: ordering, payment, pickup windows with stacking for 8–12 cars without blocking the street or the parking. In ${c}, the drive-thru throat, the bypass lane, and the pedestrian conflicts are the planning commission's focus. Grease interceptor location, trash enclosure access, and stormwater for the paved site round out the civil set`;
      return [
        ["The prototype is a starting point", `No national QSR prototype in ${c} satisfies ${sc.codeRef} and local amendments as drawn — energy code, plumbing code grease rules, structural lateral, and accessibility all need local adaptation. The engineer who has adapted the brand's prototype before knows where the conflicts are; the engineer seeing it for the first time discovers them in plan check. Ask for the brand's prototype package at programming, not at permit. Experienced QSR engineers in ${s} maintain a running conflict list per brand — the structural lateral details that never work locally, the energy-code forms the prototype omits, the grease-sizing methodology the jurisdiction rejects. That institutional knowledge is the real product; the drawings are its output.`],
        [`${cp.name} scope for fast-food`, `For QSR in ${c}, ${sys}. Fees follow ${sc.feeNote}; QSR engineering is efficient because the prototype carries the design intent, but the local adaptation — structural, energy, grease, drive-thru — is real engineering, not redlines.`],
        ["Drive-thru is the site plan", `In ${c}, the planning review of a QSR is largely a drive-thru review: stacking capacity, queue spillover onto streets, speaker-box noise at property lines, and headlight glare. The civil engineer proves the queue works with a stacking study; a QSR that queues onto the arterial gets continued at planning commission. Design the drive-thru first and fit the building to it, not the reverse. The stacking exhibit the civil engineer prepares for ${c} planning isn't just a permit document — it's the operations proof the franchisee needs: can the site handle the Friday dinner rush without the queue blocking the arterial and inviting the enforcement action that follows. Design for the peak, not the average.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How long does a QSR permit take in ${c}?`, `With a clean prototype adaptation: building plan check in the normal ${c} cycle plus parallel health department review. The schedule killers are prototype conflicts discovered late (structural lateral, energy compliance) and drive-thru planning issues. An engineer who has done the brand before typically saves one full review cycle.`],
      [`What size grease interceptor do we need?`, `The ${c} pretreatment authority sets sizing from the kitchen fixture count and menu type — fryers drive it. The plumbing engineer calculates it per the local rules; undersized interceptors are a standard health/building correction. Confirm the sizing methodology with ${c} before design, because jurisdictions differ.`],
      [`Can you adapt our franchise prototype?`, `Yes — that's the core QSR service: take the brand's prototype plans and produce a ${s}-code-compliant, ${c}-permitted set. The adaptation covers structural lateral, energy compliance, plumbing/grease, accessibility, and site-specific drive-thru and grading. The prototype is the starting point, never the submittal.`],
    ],
  },

  "coffee-shop": {
    title: (t, c, a) => `${t} for Coffee Shops in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for coffee shops and cafes in ${c}, ${s}: drive-thru design, small-footprint MEP, seating layouts, and cafe-ready engineered plans.`,
    h1: (t, c, a) => `${t} for coffee shops in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A coffee shop in ${c} is small-footprint, high-throughput engineering: the entire business runs through a 1,200-square-foot box and a drive-thru window, and the morning rush doesn't forgive design mistakes. ${cp.blurb} for cafes is compact but exact — here's what matters in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `espresso equipment electrical — a multi-group machine plus grinders pulls real amperage in a small space — with the panel sized for the equipment lineup, not the square footage. Plumbing for the espresso machine (water filtration and drainage), the mop sink, and the hand sink the health department requires; HVAC for a space with high occupant turnover and heat from the equipment. In ${c}, the grease interceptor question depends on the menu: pastries-only versus real food prep changes the plumbing scope`
        : p === "structural"
        ? `tenant-improvement structural work: verifying the existing structure for the new layout, rooftop unit supports where the cafe adds HVAC to an existing shell, and the drive-thru window and canopy framing. In ${s}, most coffee shops are TI in existing buildings — the structural scope is verification and the occasional opening, plus the pylon or monument sign foundation that ${c} permits separately`
        : `drive-thru stacking for the morning peak — the queue that wraps the building at 7:30 AM — with the order board, payment window, and pickup sequencing that keeps it moving. In ${c}, the site plan also resolves the patio (fencing, drainage, accessibility), the trash enclosure, and pedestrian paths that don't cross the drive-thru lane. Speaker noise at the property line is the neighbor issue that kills approvals`;
      return [
        ["Small box, real engineering", `Coffee shops in ${c} get underestimated because they're small: but the equipment density per square foot rivals a restaurant kitchen, the drive-thru is a traffic engineering problem, and the health department reviews the space like any food facility. ${sc.codeRef} apply at full force to 1,200 square feet. The engineering fee is small; the cost of getting it wrong — a failed health review, a drive-thru that gridlocks — is not. The equipment schedule for a ${c} coffee shop reads like a restaurant's: espresso machines, grinders, brewers, refrigeration, and the water treatment they all need — packed into a tenth of the space. The MEP coordination per square foot is among the densest in commercial work, which is why experienced cafe engineers are worth their fee.`],
        [`${cp.name} scope for coffee shops`, `For cafes in ${c}, ${sys}. Fees follow ${sc.feeNote}; coffee shop TI engineering is among the most efficient commercial scopes because the footprint is small — but the drive-thru site work can exceed the building engineering cost.`],
        ["The drive-thru is the business", `For most ${c} coffee shops the drive-thru does the majority of revenue, which makes the site circulation the highest-value engineering on the project: stacking for the peak queue, dual lanes where volume warrants, and a layout that doesn't trap dine-in customers behind the drive line. The building is the easy part; the queue is the design problem. Site selection for coffee in ${s} is drive-thru selection: corner lots with the right turning movements, stacking geometry that fits, and the visibility that drives impulse stops. The engineer feasibility-sketches the drive-thru before the LOI is signed — a lot that can't stack the morning peak isn't a coffee site at any price.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do we need a grease interceptor for a coffee shop?`, `It depends on the menu in ${c}: drip coffee and pre-made pastries typically don't trigger one; cooking, frying, or significant food prep does. The health department and the ${c} pretreatment authority make the call — confirm during programming, because adding an interceptor after design is expensive.`],
      [`How much stacking does a coffee drive-thru need?`, `Plan for the morning peak: 8–12 cars of stacking is the ${s} planning expectation for new drive-thrus, with the queue fully on-site and off the street. The civil engineer lays out the lane geometry and proves it with a stacking exhibit for the ${c} review.`],
      [`Can we put a drive-thru on an existing building?`, `Often yes, but the site has to have the geometry: lane width, turning radii, window location, and stacking length all have to fit without breaking parking or circulation. The engineer tests the fit during feasibility — a drive-thru that doesn't fit the lot is the most common dead coffee-shop site in ${c}.`],
    ],
  },

  "bar-nightclub": {
    title: (t, c, a) => `${t} for Bars & Nightclubs in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for bars and nightclubs in ${c}, ${s}: assembly occupancy, sound isolation, egress, and late-night-ready engineered design.`,
    h1: (t, c, a) => `${t} for bars & nightclubs in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A nightclub in ${c} is an assembly occupancy with a sound system: the building code sees 500 occupants needing egress, the neighbors hear bass at 1 AM, and the dance floor loads the structure like a small earthquake. ${cp.blurb} for nightlife venues designs for all three realities.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `assembly-occupancy HVAC with the ventilation and cooling for a packed room — occupant heat load dominates, and the system has to handle the swing from empty to full. Sound-system electrical with isolated power where the venue has touring acts, emergency voice/alarm communication intelligible over program audio, and kitchen/bar plumbing with the grease and glass-washer requirements. In ${c}, the sound limiter tied to the fire alarm is the MEP detail venues forget`
        : p === "structural"
        ? `dance-floor and assembly loading — rhythmic crowd movement creates dynamic loads the structure must handle without perceptible vibration. Mezzanine and VIP deck structures, stage and DJ booth framing with the equipment loads, and in ${s} the existing-building verification when the club goes into an old warehouse (the most common nightclub shell in ${c}). Vibration criteria govern member sizing as much as strength`
        : `late-night site impacts: parking for the peak occupancy, rideshare queuing that doesn't block ${c} streets at closing, and the outdoor smoking/patio areas with their drainage and accessibility. In ${c}, the conditional-use permit for nightlife lives or dies on the neighbor impacts — sound, traffic, parking — and the civil set documents the mitigation. Sound-wall and site-layout decisions made here determine whether the venue keeps its permit`;
      return [
        ["Occupancy classification is everything", `The moment a bar in ${c} crosses into assembly occupancy, ${sc.codeRef} change completely: egress widths, panic hardware, occupant load calculations, fire suppression, and alarm requirements all step up. Many venue failures start as "it's just a bar" designs that the reviewer reclassifies as assembly — with the corrections arriving after construction. Classify honestly at programming. The classification analysis in ${c} looks at the actual operation: occupant load calculations from the floor plan, the dance floor versus seating mix, and the late-night density the venue really sees. Honest classification at programming produces a permit on schedule; optimistic classification produces a stop-work order during construction.`],
        [`${cp.name} scope for bars & nightclubs`, `On nightlife work in ${c}, ${sys}. Fees follow ${sc.feeNote}; the assembly-occupancy upgrade (egress, suppression, alarm) is the cost step that surprises owners converting from mercantile or restaurant.`],
        ["Sound is a site-planning problem", `Bass transmits through structure and across property lines, and in ${c} the neighbor complaints become permit conditions. The engineering response spans disciplines: structural isolation of the performance space, MEP penetrations sealed against flanking paths, and site layout that puts the noisy side away from residences. Venues that treat sound as an afterthought buy it twice — once in complaints, once in retrofits. The venues that survive in ${c} treat acoustic design as a permit asset: documented STC assemblies, sealed penetrations, and site layouts that demonstrate neighbor consideration become exhibits at the conditional-use hearing. Sound engineering buys permits as surely as it buys sleep for the neighbors.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`When does a bar become an assembly occupancy?`, `Under ${s} code, it's about occupant load: cross 50 occupants in the bar area and assembly rules apply; large nightclubs hit A-2 with full egress, suppression, and alarm requirements. The ${c} reviewer classifies from the floor plan — under-classifying to dodge the requirements is the most common (and most expensive) bar permitting mistake.`],
      [`How do we handle sound for neighbors?`, `With a layered approach: structural decoupling of the music space, sealed MEP penetrations, and site planning that distances outdoor areas from residences. In ${c}, the conditional-use permit often carries measurable noise conditions — the engineering documents the compliance path during entitlements, not after the first complaint.`],
      [`Can we convert a warehouse into a nightclub?`, `Yes — it's the classic ${c} nightclub project. The engineering verifies the existing structure for assembly loading and vibration, designs the egress and life-safety upgrade the occupancy change triggers, and handles the sound isolation the shell never had. Change-of-occupancy is the permit path, and it's a full engineering scope, not a TI.`],
    ],
  },

  "casino": {
    title: (t, c, a) => `${t} for Casinos in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for casinos and gaming facilities in ${c}, ${s}: gaming-floor power, smoke control, security infrastructure, and large-assembly engineered design.`,
    h1: (t, c, a) => `${t} for casinos in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A casino in ${c} is a small city that never sleeps: thousands of occupants, a gaming floor with the power density of a data center, restaurants and hotels stacked above, and life-safety systems that have to perform with a full house at 3 AM. ${cp.blurb} for gaming facilities is large-team, high-stakes engineering.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `gaming-floor power distribution — slots and table games draw continuous loads with strict uptime expectations — plus the HVAC for a densely occupied, smoke-laden (where permitted) volume with sophisticated smoke control and pressurization. Emergency power with generator plants covering life safety and gaming operations separately, and the low-voltage pathways for the surveillance and security systems that blanket the facility. In ${c}, the smoke-control sequence is an engineered life-safety system with commissioning, not just fans on a plan`
        : p === "structural"
        ? `large-span gaming floor structures with vibration control (a humming floor kills the gaming experience), hotel tower or parking structure integration above or adjacent, and seismic design for the fully occupied assembly. In ${s}, the structural peer review is typically jurisdictional on this scale. Progressive-collapse and robustness considerations enter where the gaming floor spans column-free`
        : `the site is a resort: hotel drop-off, valet queuing, bus and tour staging, employee parking separated from guest circulation, and the porte-cochère that is the building's front door. In ${c}, traffic impact and the 24-hour operation shape the civil design — trip generation, signal timing, and neighbor mitigation. Stormwater for the massive impervious footprint and the utility services sized for a facility that rivals a hospital in demand`;
      return [
        ["Gaming regulation overlays everything", `Beyond ${sc.codeRef}, casinos in ${s} answer to gaming regulators whose requirements touch the building: surveillance sightlines and coverage, count-room security, cash-handling adjacencies, and the infrastructure (power, pathways, structural support) that the security systems need. The engineer coordinates with the gaming consultant from programming — security infrastructure designed after the building is open is surgically expensive. The gaming consultant and the engineer coordinate from programming in ${s}: surveillance camera coverage needs structural support and power at every location, the count room needs its adjacencies and its rated construction, and the cash-handling routes shape the back-of-house layout. Security infrastructure is building infrastructure — designed once, together.`],
        [`${cp.name} scope for casinos`, `On casino work in ${c}, ${sys}. Fees track ${sc.feeNote}; casino engineering is among the most intensive commercial scopes per square foot because of the power density, life-safety systems, and security integration.`],
        ["The 3 AM life-safety case", `Casinos are occupied at full density around the clock, which means the egress, smoke control, and alarm systems get designed for the worst case the building will actually see — not a daytime office scenario. In ${c}, the fire and life-safety review of a casino is the most rigorous assembly review in the jurisdiction. The engineering has to be right before the first guest arrives, because there's never an empty building to fix it in. Every life-safety calculation in the ${c} casino assumes the building is full: egress widths, smoke-control volumes, alarm intelligibility over gaming-floor noise. The reviewer checks the worst case because the worst case is a normal Saturday night. There's no unoccupied-hours discount in the code, and none in the design.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What makes casino engineering different from a hotel?`, `Power density (the gaming floor rivals a data center), 24-hour full-occupancy life safety, smoke control for the gaming volume, and the security/surveillance infrastructure woven through every system. In ${s}, the gaming regulator's building requirements add a review layer hotels never see.`],
      [`How is the gaming floor cooled?`, `With high-capacity HVAC designed for the dense occupant load plus the heat from thousands of electronic gaming machines — and, where smoking is permitted, the ventilation and smoke-control strategy for the gaming volume. The ${c} mechanical review scrutinizes the smoke-control sequence as a life-safety system.`],
      [`Do casinos need special structural design?`, `Yes at this scale: long-span gaming floors with vibration criteria, full-occupancy seismic design, and integration with hotel towers or parking structures. The ${c} structural review typically requires independent peer review — budget for it in the engineering scope, not as a surprise.`],
    ],
  },

  "airport-terminal": {
    title: (t, c, a) => `${t} for Airport Terminals in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for airport terminals in ${c}, ${s}: passenger processing, baggage systems, jet-bridge power, and FAA-coordinated engineered design.`,
    h1: (t, c, a) => `${t} for airport terminals in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `An airport terminal in ${c} is a secure public building wrapped around an industrial baggage operation: TSA checkpoints, airline systems, and jet bridges on the public side; bag rooms, tugs, and fuel hydrants on the airside. ${cp.blurb} for terminals designs for both worlds — and for the airport authority that governs them.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `terminal HVAC for the tall public volumes with stratification control, baggage-handling power and controls coordination, jet-bridge 400 Hz power and pre-conditioned air at every gate, and the security-system pathways for TSA and airport operations. Emergency power covers life safety plus the operational systems the airport can't lose. In ${c}, the airport authority's design standards overlay ${sc.codeRef} — the MEP set satisfies both, and TSA's checkpoint requirements arrive as fixed inputs`
        : p === "structural"
        ? `long-span terminal roofs over the public concourse, canopies at curbside and airside, and the bag-room level designed for tug and cart loading. Seismic and progressive-robustness design for the high-occupancy public building, and in ${s} blast considerations where the threat assessment requires them. The structural set also covers jet-bridge foundations and the airside equipment supports. The structural coordination with the airport's own engineering staff runs through design and construction — airside work never proceeds without their review`
        : `the landside/airside divide organizes the civil design: curbside queuing and commercial-vehicle management on the public side, aircraft parking, service roads, and fuel hydrant corridors on the airside. In ${c}, FAA-adjacent height, glare, and wildlife-hazard rules constrain the site plan, and stormwater must meet airport-specific treatment standards. Utility coordination with the airport's own systems — often a private utility — replaces the municipal model`;
      return [
        ["The airport authority is the AHJ-plus", `Terminal projects in ${c} answer to the airport authority's design standards, TSA security requirements, airline technical criteria, and FAA-adjacent rules — on top of ${sc.codeRef} and the municipal building department. The engineer who has worked airside before knows the submittal sequence; the engineer who hasn't discovers that the airport's review is the long pole, not the city's. The submittal sequence in ${c} runs the airport authority review parallel to — or ahead of — the municipal building permit, because the authority's comments reshape the design while the city's mostly verify it. Engineers new to airside work learn this once, usually the hard way, when the authority's first review arrives after the building is fully designed.`],
        [`${cp.name} scope for airport terminals`, `On terminal work in ${c}, ${sys}. Fees follow ${sc.feeNote}; terminal engineering is specialized and intensive, with the security and baggage systems integration driving coordination cost.`],
        ["Phasing is the project", `Airports don't close: terminal work in ${c} gets built in phases around operating gates, with temporary checkpoints, swing bag rooms, and construction separation from the traveling public. The engineering documents the phasing — temporary egress, temporary systems, interim life safety — as a design scope, not a contractor means-and-methods afterthought. Phase-zero planning determines whether the project is buildable at all. The phasing documents in a ${c} terminal project — temporary egress plans, interim life-safety narratives, construction separation details — are permit submittals in their own right, reviewed by the same authorities as the permanent work. Budget the phasing design as a design phase, not as contractor means and methods.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Who reviews airport terminal plans?`, `Multiple authorities: the municipal building department for ${sc.codeRef}, the airport authority for its design standards, TSA for checkpoint and security areas, and the airlines for their leased spaces. In ${c}, the airport authority's review typically governs the schedule — engage it before the building permit application, not after.`],
      [`What is 400 Hz power at the gates?`, `Aircraft ground power: 400-hertz electrical supplied through the jet bridge so parked aircraft can shut down their engines and APUs. The electrical engineer designs the gate power distribution, and the structural engineer designs the bridge foundations — both coordinated with the airline's equipment standards.`],
      [`Can terminals be built while the airport operates?`, `Yes — it's the only way they're built. The engineering includes phased egress, temporary life-safety systems, construction separation from passengers, and interim baggage and checkpoint operations. In ${c}, the phasing plan is a permit document reviewed alongside the building plans.`],
    ],
  },

  "train-station": {
    title: (t, c, a) => `${t} for Train Stations in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for train stations in ${c}, ${s}: platforms, canopies, passenger flow, and transit-authority engineered design.`,
    h1: (t, c, a) => `${t} for train stations in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A train station in ${c} is a passenger machine: platforms, canopies, ticketing, and vertical circulation arranged so thousands of people board in minutes — all under the transit authority's rules. ${cp.blurb} for stations designs the flow first and the building around it.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `platform and concourse HVAC or ventilation (open-air platforms need wind and weather design more than conditioning), station power with the transit agency's traction-power separation, emergency lighting and communication for the platform edge, and fare-system power and pathways. In ${c}, the transit authority's systems standards — signaling interfaces, grounding, stray-current protection near electrified rail — overlay ${sc.codeRef} and arrive as fixed design criteria`
        : p === "structural"
        ? `platform canopies with long spans and minimal columns (columns on platforms obstruct passenger flow), the station headhouse structure, and pedestrian bridges or tunnels with their loading and vibration criteria. In ${s}, the structural design also addresses train-induced vibration and the clearance envelopes the transit agency enforces absolutely — nothing intrudes into the dynamic envelope, ever`
        : `station-area site design: bus intermodal connections, kiss-and-ride queuing, bike facilities, and the pedestrian network that feeds the station. In ${c}, grade crossings, track drainage, and the railroad's own right-of-way requirements govern the civil work near the tracks — the freight or commuter railroad is a separate authority with veto power over anything in its envelope. Stormwater and utility coordination follow the transit corridor, not the municipal grid`;
      return [
        ["The transit agency writes half the program", `Station projects in ${c} get their critical dimensions from the transit authority: platform lengths, canopy coverage, clearance envelopes, systems interfaces, and accessibility requirements that exceed the base code. ${sc.codeRef} apply, but the agency's design manual is the document the engineer opens first. Agencies review slowly and comment thoroughly — schedule the agency review as the project's long pole. The agency's design manual in ${s} specifies everything from platform edge details to the exact yellow of the detectable warnings — and the agency's reviewers check compliance line by line. The engineer who designs from the manual passes review; the engineer who designs from the building code gets the correction list that quotes the manual.`],
        [`${cp.name} scope for train stations`, `On station work in ${c}, ${sys}. Fees track ${sc.feeNote}; the agency coordination and the track-adjacent constraints make station engineering more intensive than the building size suggests.`],
        ["Accessibility is the design driver", `Stations in ${c} serve every rider, which makes accessible vertical circulation — elevators, not just stairs — a core design element, not an add-on. Platform-train interface heights, detectable warnings, and the accessible path from street to train get engineered to the agency's standards and federal requirements. The elevator count and locations are decided at programming; adding them later is structurally brutal. The accessible path in a ${c} station — street to ticket to platform to train — is a continuous engineered system: elevator locations, platform heights, detectable warnings, and the signage that guides riders with disabilities. Breaks in the path are civil-rights failures, not just code corrections, and the agencies enforce them accordingly.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is the railroad clearance envelope?`, `The three-dimensional space around the tracks that must stay clear of all structures — defined by the railroad or transit agency and absolutely non-negotiable. In ${c}, the structural and civil engineers design everything (canopies, platforms, utilities, grading) outside the envelope, and the agency verifies it. Intrusion isn't a correction; it's a redesign.`],
      [`Do stations need elevators?`, `Yes — accessible vertical circulation to every platform is a federal and agency requirement in ${s}, not an amenity. The MEP engineer powers them on emergency circuits, the structural engineer designs the shafts, and the architect locates them on the accessible path. Plan the elevator count at programming.`],
      [`Who approves work near active tracks?`, `The railroad or transit agency — separately from the municipal building department. In ${c}, anything in the railroad right-of-way needs the railroad's engineering approval, flagging during construction, and compliance with its safety rules. The building permit doesn't cover the tracks.`],
    ],
  },

  "golf-course": {
    title: (t, c, a) => `${t} for Golf Courses in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for golf course clubhouses in ${c}, ${s}: event spaces, cart infrastructure, irrigation, and resort-ready engineered design.`,
    h1: (t, c, a) => `${t} for golf courses in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A golf clubhouse in ${c} is a hospitality venue that happens to overlook fairways: weddings and tournaments in the event space, a restaurant and pro shop downstairs, and a cart fleet that needs its own infrastructure. ${cp.blurb} for golf facilities covers the buildings — and the site systems that make the course work.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `event-space HVAC with the capacity swing from empty ballroom to 300-guest wedding, commercial kitchen MEP for the restaurant and banquet operations, and the cart-barn electrical — fleet charging for dozens of electric carts is a real load with its own ventilation for battery areas. In ${c}, the pool and locker-room MEP (where the club has them) adds dehumidification and chemical-storage design to the scope`
        : p === "structural"
        ? `clubhouse framing with the event space's long spans and assembly loading, veranda and patio structures with their wind and occupant loads, and the cart bridge and tunnel structures where paths cross roads or waterways. In ${s}, the maintenance facility is its own pre-engineered building — and the structural set covers the range ball dispensers, shade structures, and the signature entry features the club wants photographed`
        : `irrigation is the civil centerpiece: water supply, storage lakes, pump stations, and distribution for the course — often the largest water demand in ${c}. Cart-path network grading and drainage, parking for tournament peaks (not daily play), and stormwater where the course doubles as regional detention. In ${s}, water rights and reclaimed-water availability gate the irrigation design before anything else`;
      return [
        ["The event business pays for the golf", `Modern ${c} clubs make their money on weddings, tournaments, and dining — which makes the clubhouse an event venue first and a golfer amenity second. The engineering follows the revenue: ballroom acoustics and HVAC, bridal-suite plumbing, commercial kitchen capacity for 300 covers, and the porte-cochère that photographs well. ${sc.codeRef} assembly requirements apply to the event spaces at full force. The clubhouse program in ${c} gets written from the events calendar: wedding-season capacity, tournament operations, and the dining covers that carry the food-and-beverage budget. The engineer sizes the ballroom HVAC for the 300-guest peak, the kitchen for the plated-dinner rush, and the parking for the Saturday that has both. Average-day design produces a clubhouse that fails on the days that matter.`],
        [`${cp.name} scope for golf courses`, `For golf facilities in ${c}, ${sys}. Fees follow ${sc.feeNote}; the clubhouse is conventional hospitality engineering, while the irrigation and site-civil scope is specialized to golf.`],
        ["Water is the existential question", `In ${s}, a golf course's irrigation demand dwarfs every other site utility — and water availability, reclaimed-water mandates, and drought restrictions shape the project before design begins. The civil engineer confirms supply, storage, and distribution strategy during feasibility in ${c}: a course without a water plan is a grading project, not a golf course. The irrigation water strategy in ${s} — wells, reclaimed water contracts, storage lakes sized for the dry season — is a civil engineering project that precedes the golf architecture. Courses that secure water first build with confidence; courses that assume water discover the assumption during the drought that always comes.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How much water does a golf course use?`, `A typical 18-hole course in ${s} irrigates 100+ acres — the demand rivals a small town's. The civil engineer designs the supply (wells, reclaimed water, storage lakes), the pump stations, and the distribution network. Confirm water rights and reclaimed-water availability in ${c} before buying the land.`],
      [`Do we need an engineer for the cart paths?`, `For the paths themselves — usually just grading and drainage design. But cart bridges, tunnels under roads, and retaining walls along the paths are structures needing engineering, and the path network's drainage ties into the course stormwater system the civil engineer designs.`],
      [`What drives clubhouse engineering cost?`, `The event spaces: assembly occupancy triggers the egress, suppression, and alarm upgrades, and the commercial kitchen is a full MEP scope. A ${c} clubhouse that's really an event venue with golf attached engineers like hospitality — budget accordingly.`],
    ],
  },

  "recreation-center": {
    title: (t, c, a) => `${t} for Recreation Centers in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for recreation centers in ${c}, ${s}: gymnasiums, pools, fitness areas, and community-ready engineered design.`,
    h1: (t, c, a) => `${t} for recreation centers in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A recreation center in ${c} packs a gym, a pool, fitness rooms, and community spaces under one roof — each with its own structural, mechanical, and acoustic demands, all sharing walls. ${cp.blurb} for rec centers is multi-use engineering where the adjacencies are the hard part.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `pool dehumidification — the natatorium HVAC is a dedicated system managing evaporation, chloramine exhaust, and the corrosion-resistant everything the pool environment demands. Gymnasium ventilation for the big volume, fitness-room cooling for the equipment heat, and locker-room exhaust and plumbing. In ${c}, the pool chemical storage and feed systems bring fire-code and health-code reviews that run parallel to the building permit`
        : p === "structural"
        ? `gymnasium long-span roof with vibration control (basketball and aerobics load the floor dynamically), the pool vessel itself — a concrete structure designed for water weight, soil pressure, and thermal movement — and the fitness mezzanine. In ${s}, the natatorium's humid, chlorinated air corrodes ordinary steel: the structural set specifies the coatings and materials that survive the environment, or the building eats itself`
        : `the site serves the whole community: parking for peak class-change overlap, drop-off loops for youth programs, outdoor fields and courts with their lighting and drainage, and the splash pad or outdoor aquatics where the center has them. In ${c}, the stormwater design often uses the athletic fields as detention — dual-use grading that the civil engineer coordinates with the parks department`;
      return [
        ["The pool rules the building", `Everything about a rec center in ${c} orbits the natatorium: the dehumidification plant, the chemical storage, the corrosion detailing, and the acoustic separation (pools are loud). ${sc.codeRef} treat the pool as a special occupancy with health-department review on top. Design the pool systems first and fit the rest of the building around them — the pool never compromises, so everything else must. The natatorium's dehumidification plant, chemical storage, and corrosion detailing are designed first in a ${c} rec center because they have the tightest constraints and the least flexibility. Everything else — gym, fitness, community rooms — adapts around the pool's requirements. Architects who lay out the building before the pool engineer weighs in redraw it after.`],
        [`${cp.name} scope for recreation centers`, `On rec center work in ${c}, ${sys}. Fees follow ${sc.feeNote}; municipal rec centers often build with public money, which adds prevailing-wage, public-bid, and sometimes LEED-equivalent requirements to the engineering scope.`],
        ["Acoustics between uses", `The gym's basketball noise, the pool's reverberation, and the community room's wedding reception all share one building in ${c}. The engineering response is structural-acoustic: isolated slabs, rated assemblies, and MEP penetrations detailed against flanking paths. Multi-use buildings that skip the acoustic design get the complaints that never stop — design the separations, don't apologize for them later. The acoustic design in a ${c} rec center is a structural scope as much as an architectural one: isolated slabs need structural detailing, high-STC walls need the framing to support them, and every MEP penetration needs the sealant and sleeving the acoustic consultant specifies. It's engineered during SD or not at all.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Why is pool dehumidification so important?`, `An indoor pool evaporates hundreds of gallons daily — without dedicated dehumidification, the moisture condenses on the structure, grows mold, and corrodes steel. In ${c}, the natatorium HVAC is a separate engineered system (not building HVAC extended), and it's the largest MEP cost in the rec center.`],
      [`Do rec centers need special structural design?`, `Yes: gymnasium long spans with vibration criteria, the pool vessel as a water-retaining concrete structure, and corrosion-resistant detailing throughout the natatorium. In ${s}, the pool structure also needs the geotechnical coordination — a leaking pool vessel undermines its own foundation.`],
      [`How do you keep the gym noise out of the community rooms?`, `With structural-acoustic separation: isolated floor slabs, high-STC wall assemblies, and sealed MEP penetrations. The engineer designs the separations during SD in ${c} — acoustic retrofits after opening cost multiples and never fully work.`],
    ],
  },

  "swimming-pool": {
    title: (t, c, a) => `${t} for Swimming Pools in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for commercial swimming pools in ${c}, ${s}: pool vessels, dehumidification, chemical systems, and health-department-ready engineered design.`,
    h1: (t, c, a) => `${t} for swimming pools in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A commercial pool in ${c} — whether it's a natatorium, a water park, or a competition venue — is a concrete vessel holding thousands of gallons, wrapped in a building fighting humidity, chemicals, and corrosion every day. ${cp.blurb} for aquatic facilities is unforgiving engineering: water always wins against shortcuts.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `natatorium dehumidification sized for the evaporation load — the dedicated system that keeps the building from rotting — plus pool-water heating, chemical feed and control systems (chlorine, pH, UV), and the pump-room MEP with its ventilation and electrical. In ${c}, chemical storage rooms trigger fire-code hazardous-materials review: chlorine and acid stored separately, with spill containment and emergency ventilation the reviewer checks closely`
        : p === "structural"
        ? `the pool vessel as a water-retaining concrete structure: designed for full water weight, lateral soil pressure when empty, and thermal movement — with waterproofing and crack-control detailing that actually holds water. The deck slopes, the gutter system, and the equipment-pit structure. In ${s}, every structural material in the natatorium gets specified for the chlorinated humid environment, or corrosion writes the maintenance budget`
        : `deck drainage that keeps pool water out of the storm system (backwash and filter discharge go to sanitary in ${c}, with the pretreatment the utility requires), site grading for the outdoor aquatics where they exist, and the parking and drop-off for swim-meet peaks. In ${s}, the civil set also handles the water supply for fill and make-up — a competition pool's initial fill is a utility-coordination event`;
      return [
        ["Health department is a second AHJ", `Commercial pools in ${c} get permitted twice: the building department for ${sc.codeRef}, and the county health department for the pool itself — recirculation rates, chemical control, safety equipment, and accessibility. The health review has its own submittal, its own reviewer, and its own timeline. The engineer prepares both packages in parallel; sequencing them serially adds months in ${s}. The health department's pool reviewer in ${c} checks recirculation turnover rates, chemical automation, safety equipment, and the accessibility details the building reviewer never sees. The two reviews run on different clocks with different comment styles — the engineer staffs both, because a pool that passes building but fails health doesn't open.`],
        [`${cp.name} scope for swimming pools`, `On pool work in ${c}, ${sys}. Fees follow ${sc.feeNote}; the pool vessel and the dehumidification plant are the engineering cost centers — everything else is conventional.`],
        ["Waterproofing is structural", `A pool that leaks is a structural failure with a geotechnical consequence: escaping water undermines the vessel foundation and the surrounding slabs. In ${c}, the structural engineer owns the vessel waterproofing strategy — integral admixtures, membranes, waterstops at every joint — because the warranty and the liability sit with the structure, not a coating applicator. Detail it like the building depends on it, because it does. The vessel detailing in ${s} — waterstops at every construction joint, integral waterproofing admixtures, crack-control steel beyond the minimum — reflects the reality that a pool vessel can't be re-waterproofed from the outside. The structural drawings carry the waterproofing strategy because the structure is the waterproofing.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What permits does a commercial pool need in ${c}?`, `Two tracks: the building permit (structure, MEP, enclosure) and the health department pool permit (recirculation, chemistry, safety, accessibility). In ${s}, the health review is frequently the longer path — start it with the building design, not after.`],
      [`How is an indoor pool building heated and ventilated?`, `With a dedicated natatorium dehumidification system — not conventional HVAC. It manages evaporation, holds temperature and humidity setpoints, exhausts chloramines, and often recovers heat to the pool water. In ${c}, this single system is the largest MEP investment in the facility.`],
      [`Why do pool structures corrode?`, `Chlorinated humidity attacks ordinary steel, fasteners, and even concrete reinforcement. The structural engineer specifies stainless, galvanized, or coated systems and details the vapor barriers that keep moisture out of the assemblies. In ${s}, natatorium structural failures from corrosion are a known pattern — the detailing prevents them.`],
    ],
  },

  "convention-center": {
    title: (t, c, a) => `${t} for Convention Centers in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for convention centers in ${c}, ${s}: exhibit halls, divisible ballrooms, loading docks, and large-assembly engineered design.`,
    h1: (t, c, a) => `${t} for convention centers in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A convention center in ${c} is a flat-floor machine for crowds: exhibit halls that swallow trade shows, ballrooms that split into six breakout rooms, and a loading dock that turns the whole building over in a day. ${cp.blurb} for convention facilities designs for the event cycle — move-in, show, move-out, repeat.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `exhibit-hall HVAC with the capacity for 10,000 occupants plus the heat from show lighting and displays — and the smoke-control and pressurization for the vast volume. Divisible ballroom systems with independent zoning per operable-wall configuration, show power (floor boxes and overhead busway for exhibitor loads), and the kitchen MEP for banquet-scale food service. In ${c}, the life-safety sequence for the exhibit hall is an engineered smoke-control system with commissioning`
        : p === "structural"
        ? `column-free exhibit halls spanning 120 feet and more — long-span trusses or space frames with the roof designed for rigging loads (trade shows hang tons of lighting and signage from the structure). Floor loading for forklifts and exhibit freight on the hall slab, operable-wall support tracks, and in ${s} the seismic design for the fully occupied assembly. The rigging-load criteria get written into the structural drawings so every future show knows the limits`
        : `the loading dock is the building's engine: truck courts, marshaling yards, and dock doors sized for 53-foot trailers with the queuing that keeps show move-in off ${c} streets. Attendee drop-off, bus staging, and parking for the peak event — not the average day. In ${c}, the civil set also resolves the service tunnel or corridor network that moves freight without crossing the public concourse`;
      return [
        ["Divisibility drives the design", `Every ballroom and hall in ${c} gets subdivided by operable walls — which means the MEP zones, the egress paths, the sound isolation, and the structural supports all have to work in every configuration. ${sc.codeRef} get applied to the worst case of each subdivision. The engineer documents the configurations; the operator lives in them daily. Miss a configuration and the fire marshal finds it during the first big show. The configuration matrix in a ${c} convention center — every operable-wall combination with its egress, HVAC, and sound implications — is a design document the reviewer approves and the operator uses daily. Engineers who document three configurations when the operator needs six create the field conflicts that the fire marshal resolves with red tags.`],
        [`${cp.name} scope for convention centers`, `On convention work in ${c}, ${sys}. Fees track ${sc.feeNote}; the exhibit-hall long spans and the life-safety systems make convention centers among the most intensive assembly engineering per square foot.`],
        ["Move-in is a structural event", `Trade shows roll forklifts, crates, and vehicles across the exhibit floor — the slab gets designed for it, with the loading paths and the point loads from the heaviest exhibits. In ${c}, the dock-to-hall freight route (doors, corridors, elevators) is designed as a system: a beautiful hall with a freight bottleneck is a building that can't host shows. The freight route in ${c} — dock doors to corridors to hall, with every turn radius, door width, and elevator capacity verified for the largest exhibit crate — is designed like a highway for forklifts. Show producers walk the route during booking; a building whose freight path was never engineered loses the shows that need it.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How much floor load does an exhibit hall need?`, `Typically 350–500 psf for the hall slab — forklifts, crated exhibits, and vehicles all cross it. In ${s}, the structural engineer also designs for concentrated rigging loads hung from the roof structure; the rigging criteria go on the drawings so future shows engineer within them.`],
      [`What is smoke control in an exhibit hall?`, `An engineered life-safety system that manages smoke in the vast hall volume during a fire — mechanical exhaust, make-up air, and pressurized egress paths sequenced automatically. In ${c}, it's a commissioned system with its own testing, not just exhaust fans. The ${c} fire review treats it as the building's primary life-safety feature.`],
      [`How do operable walls affect engineering?`, `Every wall configuration is a separate code condition: HVAC zoning, egress paths, sound ratings, and sprinkler coverage all have to work subdivided and open. The engineer in ${c} documents each configuration on the plans — the reviewer checks them all.`],
    ],
  },

  "movie-theater": {
    title: (t, c, a) => `${t} for Movie Theaters in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for cinemas in ${c}, ${s}: sloped auditoriums, sound isolation, projection systems, and theater-ready engineered design.`,
    h1: (t, c, a) => `${t} for movie theaters in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A movie theater in ${c} is a row of concrete boxes tuned for sound: sloped floors, isolated walls, and projection rooms — with a lobby and concession stand up front paying the bills. ${cp.blurb} for cinemas is acoustic engineering wrapped in assembly-occupancy code.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `auditorium HVAC with low-velocity, low-noise distribution — the system can't be heard during quiet scenes — plus projection-room cooling for the laser projectors' heat load and the concession kitchen MEP (poppers, warmers, soda systems). Emergency voice/alarm intelligibility in the auditoriums, and in ${c} the sound-system power with isolated grounds where the exhibitor's audio spec requires it`
        : p === "structural"
        ? `sloped auditorium floors — stepped concrete risers with stadium seating — and the long-span roofs over the auditorium boxes. Sound-isolation construction: double-stud or masonry walls between auditoriums with the STC ratings the exhibitor demands, floating floors where bass transmission matters. In ${s}, the tilt-up or masonry auditorium boxes are straightforward structures; the acoustic detailing is the engineering that makes or breaks the experience`
        : `the site is a parking field with a building attached: stall counts for the peak Friday-night show, queuing for the box office and concessions spillover, and the drop-off loop. In ${c}, the civil set handles the big-box site — stormwater for the impervious lot, photometric site lighting for the late-night egress, and the trash and grease infrastructure for the concessions`;
      return [
        ["Sound isolation is the product", `Nobody pays to hear the action movie next door during the drama. The ${c} cinema's auditorium-to-auditorium isolation — wall assemblies, sealed MEP penetrations, isolated slabs — is engineered to STC targets, not guessed. ${sc.codeRef} set the minimums; the exhibitor's audio spec sets the real target. The acoustic design happens during SD in ${s}, because retrofitting isolation into finished auditoriums is ruinous. The STC targets in a ${c} cinema come from the exhibitor's audio specification, not the building code — and they're verified by the acoustic consultant's testing after construction. The engineer's detailing during design is what makes the test passable; failed acoustic tests in finished auditoriums have no economical fix.`],
        [`${cp.name} scope for movie theaters`, `On cinema work in ${c}, ${sys}. Fees follow ${sc.feeNote}; the auditorium boxes are efficient structures, and the acoustic and MEP-noise detailing is the specialized scope.`],
        ["Sightlines shape the structure", `The sloped floor, the screen height, and the projector throw distance are a geometric system the architect locks early — and the structural engineer builds the stepped risers, the screen wall, and the projection-port structure around it. In ${c}, late changes to the auditorium geometry cascade through structure, MEP, and egress; the cinema's dimensions are decided once, at programming. The auditorium geometry — screen size, seating rake, projector throw — is locked with the exhibitor before structural design in ${s}, because the stepped risers, screen wall, and projection room are concrete commitments. Cinemas are one of the few building types where the AV design precedes the structural design, and the schedule has to allow it.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How do you keep sound from traveling between auditoriums?`, `With mass, separation, and sealing: high-STC wall assemblies (double-stud or masonry), MEP penetrations sealed against flanking, and isolated floor slabs where bass is the issue. In ${c}, the engineer designs to the exhibitor's STC targets during SD — acoustic fixes after opening rarely work and always cost more.`],
      [`Why is theater HVAC so quiet?`, `Because it's designed for NC-25 or lower background noise: oversized low-velocity ductwork, remote mechanical rooms, and vibration-isolated equipment. Standard commercial HVAC in an auditorium would be audible during quiet scenes — the ${c} cinema's air system is acoustic equipment that happens to condition air.`],
      [`Do theaters need special egress design?`, `Yes — assembly occupancy with fixed seating: aisle widths, row spacing, exit counts, and the vomitory/exit-door arrangement all follow ${s} code for the occupant load. The sloped-floor aisles need the handrail and step detailing the ${c} reviewer checks closely.`],
    ],
  },

  "funeral-home": {
    title: (t, c, a) => `${t} for Funeral Homes in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for funeral homes in ${c}, ${s}: chapels, preparation rooms, crematories, and dignified engineered design.`,
    h1: (t, c, a) => `${t} for funeral homes in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A funeral home in ${c} is a hospitality building with an industrial back-of-house: a serene chapel and visitation rooms up front, preparation rooms and sometimes a crematory behind — each with its own engineering demands. ${cp.blurb} for funeral facilities designs the dignity in front and the function behind.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `preparation-room ventilation — high air-change rates with exhaust that never recirculates to public spaces — plus the crematory's combustion air, flue-gas exhaust, and emissions controls where the facility cremates on-site. Chapel HVAC with quiet distribution for services, and the general building systems for the visitation rooms and offices. In ${c}, the crematory triggers air-quality permitting beyond the building permit, with its own timeline`
        : p === "structural"
        ? `chapel long-span framing for the column-free gathering space, the crematory equipment supports (the retort is heavy, hot, and vibrates), and floor loading for casket displays and the hearse garage. In ${s}, most funeral homes are conventional light-frame or masonry structures — the structural scope concentrates on the chapel span and the crematory's thermal and vibration detailing`
        : `service-day site design: the funeral procession's arrival, hearse and family-car queuing, and parking for the largest service — not the average day. In ${c}, the porte-cochère and the private family entrance organize the site plan, with the service-vehicle court separated from grieving families. Stormwater and utilities are conventional; the circulation choreography is the civil design problem`;
      return [
        ["Two buildings, one roof", `The public spaces in ${c} — chapel, visitation rooms, lobby — want quiet HVAC, soft lighting, and residential-scale comfort. The back-of-house — prep rooms, crematory, garage — is industrial: ventilation rates, chemical storage, equipment loads, and emissions. ${sc.codeRef} apply to both, but the engineering characters are opposites. The design keeps them rigorously separated: no shared air, no shared circulation, no compromises. The separation in a ${c} funeral home is absolute: separate air systems, separate circulation, acoustic privacy between the chapel and the back-of-house, and the dignity of the public spaces never compromised by the industrial reality behind them. Families notice the details — the quiet, the calm, the absence of anything clinical — and the engineering is what makes those details possible.`],
        [`${cp.name} scope for funeral homes`, `For funeral facilities in ${c}, ${sys}. Fees follow ${sc.feeNote}; the crematory (where present) adds the air-quality permitting and the specialized MEP that dominate the engineering scope.`],
        ["The crematory paces the project", `Where a ${c} funeral home includes on-site cremation, the air-quality permit — not the building permit — sets the schedule: emissions review, stack design, and neighbor notification run on the regulator's timeline. The engineer coordinates the building design around the crematory equipment early, because the retort's space, structural, and ventilation requirements are fixed inputs that don't flex for architecture. The air-quality application in ${s} needs the equipment selection, the stack design, and the emissions calculations — all engineering deliverables that precede the permit clock. Owners who order the retort early and engineer around it permit on schedule; owners who treat the crematory as equipment procurement discover the building can't be permitted without it.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What permits does a crematory need in ${s}?`, `Beyond the building permit: air-quality permits for emissions, with stack design, monitoring, and sometimes neighbor notification. In ${c}, the air district's timeline typically exceeds the building plan-check cycle — start the air-quality application during programming, not after design.`],
      [`How is the preparation room ventilated?`, `With dedicated high-rate exhaust that never recirculates — typically 12+ air changes per hour, exhausted directly outdoors with the make-up air to match. The ${c} mechanical and plumbing reviewers check the prep-room ventilation and drainage closely; it's a health-and-safety system, not comfort HVAC.`],
      [`Can a funeral home go in a residential area?`, `Sometimes — many ${c} funeral homes operate in converted residences or residential zones with conditional-use permits. The engineering addresses the conversion: assembly-occupancy egress upgrades, the prep-room and crematory systems the house never had, and the parking and procession circulation the neighbors will scrutinize at the planning hearing.`],
    ],
  },

  "veterinary-clinic": {
    title: (t, c, a) => `${t} for Veterinary Clinics in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for veterinary clinics in ${c}, ${s}: surgery suites, kennels, X-ray shielding, and animal-care engineered design.`,
    h1: (t, c, a) => `${t} for veterinary clinics in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A veterinary clinic in ${c} is a small hospital for patients who can't describe symptoms: surgery suites, X-ray, kennels, and isolation — plus the odor, noise, and waste stream of dozens of animals. ${cp.blurb} for vet clinics is medical-office engineering with the animal factors designed in.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `surgery-suite HVAC with the air-change rates and pressure relationships of a medical procedure room, X-ray room shielding coordinated with the physicist's report (lead lining in walls, doors, and sometimes floors), kennel ventilation with high air changes and odor exhaust that never serves the client areas, and medical gas (oxygen) plus vacuum where the surgical scope requires it. In ${c}, the kennel drainage — trench drains with hair and solids handling — is the plumbing scope general medical offices never see`
        : p === "structural"
        ? `mostly conventional light-frame or TI structural work in ${c}: the engineering verifies the existing or new structure for the equipment loads (X-ray, surgery tables, kennel runs) and designs the X-ray shielding supports where lead-lined assemblies are heavy. Large-animal practices in ${s} add barn and arena structures — pre-engineered buildings with the ventilation and drainage the small-animal clinic doesn't need`
        : `the site handles the species: separate client and patient intake circulation, outdoor runs and exercise yards with their drainage and fencing, and the waste stream — medical and animal waste storage with the ${c} hauler access. In ${s}, equine and large-animal facilities add paddock grading, arena footing drainage, and trailer parking that make the civil set a small ranch project`;
      return [
        ["Odor and noise are design loads", `The defining vet-clinic engineering problems in ${c} aren't medical — they're the kennel: odor exhaust that keeps the waiting room smelling like a lobby, acoustic separation so boarding dogs don't soundtrack the exam rooms, and drainage that handles the reality of animal care. ${sc.codeRef} cover the building; the animal factors are the engineering the code doesn't spell out. Clinics that under-design the kennel MEP get the reviews that mention smell. The kennel HVAC in a ${c} vet clinic is sized like industrial ventilation — high air changes, 100% exhaust, no recirculation — because the alternative is a waiting room that smells like a kennel and the online reviews that follow. The acoustic separation gets the same seriousness: boarding dogs bark, and exam rooms need quiet for anxious owners and accurate diagnoses.`],
        [`${cp.name} scope for veterinary clinics`, `For vet clinics in ${c}, ${sys}. Fees follow ${sc.feeNote}; the surgery suite and X-ray shielding are the specialized MEP scopes, while the kennel ventilation and drainage are the scopes owners underestimate.`],
        ["X-ray shielding needs a physicist", `The lead shielding in the X-ray room isn't sized by the engineer — it's specified by a health physicist's shielding report, which the engineer then builds into the walls, doors, and penetrations. In ${c}, the sequence is fixed: physicist's report first, shielding design second, construction third. Designing the room before the report arrives guarantees rework. The shielding report in ${s} specifies the lead equivalence for each barrier based on the equipment, the workload, and the occupancy beyond — and the engineer builds exactly that, no more and no less. Over-shielding wastes money on lead; under-shielding fails inspection. The physicist's calculation is the design input that makes the room pass the first time.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Do vet clinics need X-ray shielding?`, `Yes — the X-ray room gets lead shielding per a health physicist's report: walls, doors, and sometimes floors, with every penetration detailed. In ${c}, the shielding is a plan-check item; the physicist's report is the submittal document the reviewer expects alongside the drawings.`],
      [`How do you control kennel odor?`, `With dedicated high-rate exhaust for the kennel zones — air that never recirculates to client or medical areas — plus the air-change rates that keep the space fresh. The MEP engineer zones the kennel HVAC completely separately from the rest of the clinic in ${c}; shared air is how waiting rooms smell like kennels.`],
      [`What plumbing does a vet clinic need beyond normal?`, `Kennel trench drains with solids and hair handling, surgery scrub sinks, tub and grooming drains, and the backflow protection ${c} requires. The drainage has to handle animal waste without clogging — the plumbing engineer sizes and details it as an animal-care system, not an office restroom group.`],
    ],
  },

  "dental-office": {
    title: (t, c, a) => `${t} for Dental Offices in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for dental offices in ${c}, ${s}: operatories, nitrous systems, vacuum and compressed air, and practice-ready engineered design.`,
    h1: (t, c, a) => `${t} for dental offices in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A dental office in ${c} is a medical suite built around the chairs: every operatory needs vacuum, compressed air, nitrous, X-ray, and perfect lighting — roughed in before the walls close. ${cp.blurb} for dental practices is precision TI engineering where the rough-in is everything.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `the dental systems core: central vacuum, oil-free compressed air, and nitrous oxide distribution piped to every chair — designed as medical-gas-adjacent systems with the isolation valves and alarms the equipment requires. X-ray shielding per the physicist's report (panoramic and CBCT rooms), operatory HVAC with quiet distribution, and the amalgam separator on the vacuum discharge that ${c} pretreatment rules require. In ${s}, the equipment dealer's rough-in drawings arrive late — the MEP engineer designs the infrastructure to the equipment schedule and coordinates the final connections`
        : p === "structural"
        ? `dental TI structural work in ${c} is verification and minor framing: confirming the existing structure for the new layout, supporting the X-ray and CBCT equipment (the 3D imaging units are heavy and need the floor capacity), and the occasional rooftop unit curb. The structural scope is small but the coordination isn't — the equipment locations are fixed, and the structure has to accept them`
        : `dental offices are interior TI — the civil scope is minimal unless the practice builds ground-up. In ${c}, the site considerations are the monument sign, the patient drop-off, and the parking count for the chair count; the real "site work" is the landlord coordination for the base building's systems capacity (electrical service, HVAC zones, plumbing risers) that the TI taps into`;
      return [
        ["The rough-in is the project", `Every dental chair in ${c} needs six services in the floor or wall before finishes: vacuum, compressed air, water, drainage, nitrous, and electrical — positioned to the inch for the chair model. ${sc.codeRef} compliance is routine; the engineering risk is the rough-in coordination between the equipment schedule, the MEP design, and the contractor's slab cuts. Miss a rough-in and the fix involves a concrete saw. The coordination drawing in a ${c} dental office — every chair's six services located to the inch, verified against the equipment cut sheets — is the most important sheet in the set. Contractors build from it before the walls exist; errors in it get discovered when the concrete is already poured. The engineer who site-verifies rough-in locations before the slab pour earns the fee many times over.`],
        [`${cp.name} scope for dental offices`, `For dental in ${c}, ${sys}. Fees follow ${sc.feeNote}; dental TI engineering is efficient per square foot, but the dental-systems piping (vacuum, air, nitrous) is a specialty scope that general TI engineers often under-design.`],
        ["Nitrous is a medical gas", `Nitrous oxide distribution in ${c} gets designed with medical-gas discipline: dedicated piping, zone valves, alarms, and the scavenging exhaust that keeps the operatory safe. The ${c} reviewer treats it as a piped gas system with its own submittal expectations — not as "just an air line." The equipment dealer specifies the endpoints; the engineer designs the distribution. The nitrous distribution in ${s} follows medical-gas installation standards: cleaned and capped piping, zone valve boxes, area alarms, and the testing and certification the code requires. The ${c} inspector treats it as a life-safety system — because for the sedated patient, it is one.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is an amalgam separator and do we need one?`, `A device on the vacuum line that captures mercury amalgam before discharge — required by federal rule and enforced through ${c} pretreatment. The plumbing engineer specifies and details it; it's a standard plan-check item on every dental office in ${s}.`],
      [`How many operatories can the building support?`, `The constraint is usually the base building: electrical service capacity, HVAC zoning, and plumbing riser locations. The engineer verifies the landlord's systems against the chair count during feasibility in ${c} — discovering the panel is full after lease signing is the classic dental TI disaster.`],
      [`When do we need the equipment list?`, `Before MEP design starts. Every chair model, X-ray unit, compressor, and vacuum pump has connection requirements the engineer designs to. In ${c}, the equipment dealer is a design-team member — their cut sheets are engineering inputs, not contractor submittals.`],
    ],
  },

  "urgent-care": {
    title: (t, c, a) => `${t} for Urgent Care Clinics in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for urgent care clinics in ${c}, ${s}: exam rooms, triage flow, medical systems, and patient-ready engineered design.`,
    h1: (t, c, a) => `${t} for urgent care in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `An urgent care clinic in ${c} is a high-throughput medical machine: triage, exam rooms, X-ray, and procedure space arranged so patients flow through in under an hour — all under the healthcare occupancy rules. ${cp.blurb} for urgent care designs the flow and the clinical systems together.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `exam-room HVAC with the air-change rates and filtration the clinical program requires, X-ray shielding per the physicist's report, medical vacuum and oxygen where the procedure scope includes them, and the nurse-call and clinical low-voltage pathways. In ${c}, the soiled-utility and clean-utility separation — plumbing and ventilation that never cross-contaminate — is the MEP discipline healthcare reviewers check first`
        : p === "structural"
        ? `urgent care TI in ${c} is typically verification plus equipment supports: X-ray and imaging equipment loads, the occasional procedure-table anchorage, and rooftop equipment curbs. Where the clinic builds ground-up in ${s}, the structure is conventional light-frame — the engineering emphasis stays on the clinical systems, not the frame. Equipment anchorage and shielding supports get the structural attention the frame doesn't need`
        : `patient-arrival site design: the drop-off loop for the sick and injured, ambulance access where the clinic accepts them, and parking turnover for the high visit volume. In ${c}, the after-hours operation shapes the site lighting and security design. The civil scope is modest; the building's clinical systems are the engineering investment. The civil scope stays lean by design — the value is inside the building, not under the parking lot`;
      return [
        ["Healthcare occupancy changes everything", `The moment a clinic in ${c} is classified as healthcare occupancy, ${sc.codeRef} impose the clinical requirements: corridor widths, smoke compartments, medical-gas rules, and the infection-control construction standards. Many urgent-care failures start as "medical office" designs that the reviewer reclassifies — with the corrections landing after the lease is signed. Classify the occupancy honestly at programming in ${s}. The occupancy analysis in ${c} examines the actual clinical operation — procedure types, sedation use, patient mobility — against the ${s} code's healthcare thresholds. Borderline clinics get the formal determination from the building official before design, because the official's ruling sets the engineering scope and there's no appealing it mid-permit.`],
        [`${cp.name} scope for urgent care`, `For urgent care in ${c}, ${sys}. Fees follow ${sc.feeNote}; the healthcare-occupancy upgrade (life safety, clinical MEP, shielding) is the cost step that surprises owners coming from standard medical office.`],
        ["Patient flow is the floor plan", `Triage to exam to discharge without backtracking — the clinical flow determines the room adjacencies, which determine the MEP routing, which determines the ceiling coordination. In ${c}, the engineer needs the operator's flow diagram before design: a clinic whose flow was never diagrammed gets designed twice, once by the architect and once by the reviewer. The flow diagram in a ${c} urgent care — triage to exam to X-ray to discharge, with the clean and soiled paths separated — is a clinical operations document the engineer turns into architecture. Operators who diagram their flow get buildings that work; operators who describe it verbally get buildings designed from the architect's assumptions.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Is urgent care a healthcare occupancy?`, `Often yes under ${s} code — which triggers the clinical requirements for egress, smoke compartments, and MEP systems. In ${c}, the occupancy classification is the first programming decision because it sets the entire engineering scope; assuming "business occupancy" and discovering otherwise in plan check is the expensive path.`],
      [`What medical systems does urgent care need?`, `It depends on the clinical scope: X-ray shielding is near-universal, medical vacuum and oxygen serve the procedure rooms, and nurse-call covers the exam areas. In ${c}, the operator's equipment list is the engineering program — the MEP engineer designs to it, not to a generic clinic template.`],
      [`How fast can an urgent care TI permit?`, `With a clean healthcare-occupancy design: the normal ${c} TI cycle plus the clinical reviews (X-ray shielding, medical gas where applicable). The schedule killer is occupancy reclassification mid-review — honest classification at programming keeps the permit on the TI timeline.`],
    ],
  },

  "assisted-living": {
    title: (t, c, a) => `${t} for Assisted Living in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for assisted living facilities in ${c}, ${s}: resident units, commercial kitchens, egress for limited mobility, and care-ready engineered design.`,
    h1: (t, c, a) => `${t} for assisted living in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `An assisted living facility in ${c} is a residential building with institutional life safety: private apartments for residents with limited mobility, commercial kitchens and dining, and egress systems designed for people who can't evacuate quickly. ${cp.blurb} for assisted living designs for the residents' reality — not the code minimum.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `residential-unit HVAC with individual control (residents run hot and cold differently) plus the common-area systems, commercial kitchen MEP for the full meal-service operation, nurse-call and wander-management low-voltage pathways, and emergency power covering life safety plus the systems the residents depend on. In ${c}, the smoke-detection and alarm sequence for the defend-in-place strategy is an engineered life-safety system — the residents don't evacuate like office workers`
        : p === "structural"
        ? `multi-story residential framing — wood, steel, or concrete depending on the ${s} market — with the corridor and stair pressurization the defend-in-place strategy requires. Resident-unit bathrooms with the blocking and backing for grab bars (every bathroom, not just accessible units), and in ${c} the courtyard and outdoor resident areas with their shade structures and walking-path detailing`
        : `the site serves residents and their families: covered drop-off at the entry, visitor parking near the lobby (not the service yard), walking paths and courtyards with accessible grading, and the service court — kitchen deliveries, trash, laundry — rigorously separated from the resident experience. In ${s}, the civil set also handles the emergency-vehicle access that the defend-in-place strategy depends on`;
      return [
        ["Defend-in-place is the life-safety concept", `Residents with limited mobility can't evacuate down stairs in ${c} — so ${sc.codeRef} let the building defend them in place: smoke compartments, sprinkler protection, pressurized stairs and corridors, and the alarm sequence that manages the event. The engineer designs the whole life-safety system around this concept; it's the opposite of an office building's "everyone out" strategy, and every discipline's design reflects it. The systems coordination in a ${c} assisted living facility — smoke compartmentation, sprinkler zoning, pressurization sequences, and the alarm logic that manages a fire event without mass evacuation — is engineered as an integrated life-safety design, not a collection of devices. The fire protection engineer, the MEP engineer, and the architect design it together or it doesn't work.`],
        [`${cp.name} scope for assisted living`, `On assisted living work in ${c}, ${sys}. Fees follow ${sc.feeNote}; the commercial kitchen and the defend-in-place life-safety systems are the engineering cost centers in an otherwise residential building.`],
        ["Licensing overlays the building code", `Beyond ${sc.codeRef}, ${s} licenses assisted living facilities with requirements that touch the building: unit sizes, staffing adjacencies, kitchen standards, and the physical-plant rules the licensing surveyor checks. The engineer coordinates the licensing requirements with the building design during SD in ${c} — discovering a licensing conflict at final inspection is a special kind of expensive. The licensing physical-plant checklist in ${s} — unit configurations, common-area requirements, kitchen standards, outdoor space minimums — gets reviewed against the construction documents before the licensing survey. In ${c}, the engineer cross-checks the design against the licensing rules during construction documents, when changes are still paper.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What is defend-in-place?`, `The life-safety strategy for residents who can't self-evacuate: the building's smoke compartments, sprinklers, and pressurized egress protect residents where they are while staff manage the event. In ${c}, the entire MEP and structural life-safety design follows this concept — it's engineered into every system, not added as devices.`],
      [`Do assisted living facilities need commercial kitchens?`, `Yes — full meal service for the resident population means a commercial kitchen with the hoods, grease, gas, and health-department review of a restaurant. In ${s}, the kitchen is the largest single MEP scope in the facility and gets its own health plan-check parallel to the building permit.`],
      [`What does licensing require of the building?`, `${s} licensing rules set unit minimums, common-area ratios, kitchen standards, and physical-plant requirements beyond the building code. In ${c}, the engineer reviews the licensing checklist against the design during SD — the licensing survey happens after construction, when changes are prohibitively expensive.`],
    ],
  },

  "memory-care": {
    title: (t, c, a) => `${t} for Memory Care in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for memory care facilities in ${c}, ${s}: secure egress, wandering paths, specialized lighting, and dementia-ready engineered design.`,
    h1: (t, c, a) => `${t} for memory care in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A memory care facility in ${c} is assisted living designed for dementia: residents who wander need secure perimeters and looping paths, not locked wards — and every system, from lighting to door hardware, serves that philosophy. ${cp.blurb} for memory care engineers the building as a therapeutic tool.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `circadian lighting design — tunable systems that support residents' sleep-wake cycles, which the clinical literature ties to reduced agitation — plus the wander-management and elopement-prevention low-voltage systems integrated with door hardware and the nurse-call. HVAC with the residential zoning of assisted living, and in ${c} the delayed-egress and access-control sequencing that keeps residents safe without feeling institutional: the MEP and security design is the care model made physical`
        : p === "structural"
        ? `the secured courtyard is the structural centerpiece in ${c}: shade structures, walking-loop detailing, and the perimeter security integrated with the landscape walls. The building itself is conventional assisted-living framing — the memory-care specialization lives in the hardware, the sightlines, and the secure outdoor space, all of which the structural set supports. The courtyard structures get the same durability detailing as the building — they serve residents daily for decades`
        : `the wandering path organizes the site: a secure, looping outdoor circuit with shade, seating, and visual interest — no dead ends, which distress wandering residents. In ${c}, the perimeter security (fencing, gates, monitoring) is designed as landscape architecture, not prison infrastructure. The civil set grades the paths accessible, drains the courtyard, and separates the service functions from the therapeutic environment`;
      return [
        ["The building is the therapy", `Memory care design in ${c} follows the clinical evidence: looping corridors without dead ends, secure outdoor access, circadian lighting, and small household-scale neighborhoods instead of institutional wings. ${sc.codeRef} provide the life-safety baseline (defend-in-place, as in assisted living); the memory-care specialization is the layer above — and the engineer implements it through lighting controls, door hardware sequencing, acoustic calm, and the secured courtyard. The household model in ${c} memory care — small neighborhoods of 12–16 residents with their own living, dining, and outdoor access — shapes the floor plan more than any code: shorter corridors, recognizable destinations, and the residential scale that reduces agitation. The engineer implements the care philosophy through the building systems that support it.`],
        [`${cp.name} scope for memory care`, `For memory care in ${c}, ${sys}. Fees follow ${sc.feeNote}; the specialized lighting, access-control, and courtyard design add a therapeutic layer to the assisted-living engineering base.`],
        ["Elopement prevention without institutional feel", `Residents must not leave unsupervised — but the building can't feel locked. In ${c}, the engineering answer is delayed-egress hardware, wander-management systems, and courtyard perimeters that read as garden walls. The ${c} reviewer checks the egress hardware against the life-safety code (delayed egress has strict rules); the families judge whether the place feels like home. Both have to pass. The hardware schedule in a ${c} memory care facility — delayed-egress doors, wander-management integration, courtyard gate controls — is coordinated across architecture, electrical, and fire alarm as a single life-safety and security design. The ${c} reviewer approves the hardware against the code; the families approve the feeling against their hearts. The engineering serves both.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`How do you keep residents safe without locked doors?`, `With delayed-egress hardware (alarmed, timed release), wander-management systems that alert staff, and secured courtyards that give residents outdoor freedom safely. In ${c}, the door hardware has to satisfy both the life-safety code and the care model — the engineer sequences it with the fire alarm so safety never depends on staff remembering.`],
      [`What is circadian lighting?`, `Tunable LED systems that shift color temperature through the day — bright cool light mornings, warm dim evenings — supporting residents' sleep-wake cycles. The clinical evidence links it to reduced sundowning agitation. In ${s}, it's an MEP-lighting design scope with the controls sequences the engineer documents.`],
      [`How is memory care different from assisted living engineering?`, `The base building is similar (defend-in-place life safety, commercial kitchen, residential units), but memory care adds the elopement-prevention systems, the therapeutic lighting, the acoustic calm, and the secured wandering paths. In ${c}, it's assisted living plus a clinical-design layer — budget the specialty systems, not just the building.`],
    ],
  },

  "charter-school": {
    title: (t, c, a) => `${t} for Charter Schools in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for charter schools in ${c}, ${s}: classrooms, multi-use spaces, playgrounds, and education-ready engineered design.`,
    h1: (t, c, a) => `${t} for charter schools in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A charter school in ${c} is a public school built like a startup: tight budgets, fast timelines, and facilities that have to satisfy the authorizer, the building department, and the parents — often in a converted commercial building. ${cp.blurb} for charter schools is education engineering at entrepreneurial speed.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `classroom HVAC with the ventilation rates and acoustic performance learning requires — low background noise, good air quality, individual room control. The multi-purpose room's assembly systems, kitchen or warming-kitchen MEP for the meal program, and in ${c} the IT infrastructure pathways (every classroom is a networked room now). Where the charter occupies a converted commercial building in ${s}, the MEP retrofit — bringing office systems up to classroom standards — is the dominant scope`
        : p === "structural"
        ? `classroom buildings in ${c} are typically conventional framing — the structural engineering concentrates on the conversions: verifying the existing commercial structure for school loading and the assembly-occupancy upgrade, designing the playground structures and shade canopies, and the marquee and entry features. In ${s}, the DSA-style review doesn't apply to charters the way it does to district schools, but the structural design still meets the same ${sc.codeRef}`
        : `the school site is a traffic problem with a playground: parent drop-off and pickup queuing that doesn't gridlock ${c} streets twice daily, bus loading where the charter runs buses, and the play fields and hardcourts with their drainage. In ${s}, many charters start in leased commercial space — the civil scope is then the parking restripe, the playground build-out, and the drop-off reconfiguration of an office or retail site`;
      return [
        ["Conversions are the charter market", `Most ${c} charter schools open in converted offices, retail, or churches — which means change-of-occupancy engineering: assembly-occupancy egress upgrades, classroom ventilation retrofits, playground construction on a commercial site, and the accessibility upgrades the building never had. ${sc.codeRef} apply at full educational-occupancy force. The feasibility question isn't "is it a nice building" — it's "what does the conversion cost," and the engineer answers it before the lease is signed. The feasibility study in ${c} prices the full conversion — egress, ventilation, restrooms, playground, accessibility, signage — before the charter signs the lease, because the conversion cost determines whether the site works at the charter's budget. Engineers who do charter feasibility regularly know the cost drivers by building type; the study pays for itself in avoided bad leases.`],
        [`${cp.name} scope for charter schools`, `For charter schools in ${c}, ${sys}. Fees follow ${sc.feeNote}; conversion projects concentrate the engineering in the occupancy-upgrade scope, while ground-up charter campuses engineer like small private schools.`],
        ["The authorizer is a stakeholder", `Charter schools in ${s} answer to their authorizer (district, county, or state) for the facility: capacity, safety, and the educational adequacy the charter petition promised. The building design documents the petition's commitments — classroom counts, specialty spaces, outdoor areas. The engineer designs the building the charter promised, because the authorizer checks. The facility exhibits in the charter petition — site plans, floor plans, capacity calculations — become commitments the authorizer holds the school to. In ${s}, the engineer produces petition-ready facility documents during the application phase, because the authorized facility is the one that must be built and the variances from it require approval.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`Can we put a charter school in an office building?`, `Often yes — it's the most common charter project in ${c}. The engineering covers the change of occupancy: egress upgrades to educational/assembly requirements, classroom ventilation and acoustics, restroom fixture counts for students, playground construction, and accessibility. The feasibility study prices the conversion before the lease commits.`],
      [`Do charter schools need DSA review?`, `In ${s}, charter schools generally permit through the municipal building department under ${sc.codeRef} — not the DSA process that governs district schools. But the structural and life-safety design meets the same code; the review path is shorter, not the standard lower. Confirm the AHJ during programming in ${c}.`],
      [`What drives the site design for a school?`, `Parent drop-off and pickup: the twice-daily queue that defines the site plan. In ${c}, the civil engineer designs the stacking, the circulation separation (buses vs. parents vs. pedestrians), and the play-area drainage. A school whose pickup queues onto the arterial gets the neighborhood opposition that delays approvals.`],
    ],
  },

  "logistics-hub": {
    title: (t, c, a) => `${t} for Logistics Hubs in ${c}, ${a}`,
    desc: (t, c, s) => `${t} for logistics hubs in ${c}, ${s}: cross-dock design, trailer courts, automation-ready structures, and freight-engineered plans.`,
    h1: (t, c, a) => `${t} for logistics hubs in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `A logistics hub in ${c} is freight in motion: cross-dock buildings where trailers unload on one side and load on the other, trailer courts staged for the next wave, and increasingly the automation — sorters, robotics — that needs its own engineering. ${cp.blurb} for logistics designs the velocity.`,
    sections: (t, c, s, cp, sc, sp) => {
      const p = sc.profile;
      const sys = p === "mep"
        ? `the automation electrical: sorters, conveyors, and robotics draw significant power with the power quality the controls demand — plus the building systems around them: high-bay HVAC for the dock workforce, LED lighting with the controls the 24-hour operation needs, and dock equipment power at every door. In ${c}, the fire protection for the automated storage (high-piled rules plus the automation's own suppression interfaces) is the MEP scope that most often surprises developers`
        : p === "structural"
        ? `cross-dock structures optimized for door density — shallow buildings with docks on both sides — with the floor flatness for automation (conveyor and robot systems need tighter tolerances than forklifts). Mezzanines for the sortation equipment with vibration isolation, and in ${s} the structural coordination with the automation vendor: the equipment loads, anchor points, and clearances are vendor inputs the structure must accept exactly`
        : `the trailer court is the site: staging positions, circulation for 53-foot trailers, and the queuing that keeps trucks off ${c} streets — designed with the turning templates, not guesses. In ${s}, the pavement section for the constant trailer traffic is concrete with the joint detailing that survives it; asphalt ruts under trailer loads. The civil set also handles the employee parking surge at shift change and the stormwater for the vast impervious operation`;
      return [
        ["Automation is a structural tenant", `The sorters and robotics in a ${c} logistics hub impose loads, vibrations, anchor points, and clearances that the building structure must accept precisely — the automation vendor's criteria arrive as fixed engineering inputs. ${sc.codeRef} govern the building; the vendor governs the interface. The structural engineer and the automation vendor coordinate during SD in ${s}, because the equipment can't be shimmed into a structure designed without it. The vendor coordination in a ${c} logistics hub — load tables, anchor layouts, clearance envelopes, vibration criteria — is a structural design input with the contractual weight of a code: the building must accept the equipment exactly. The structural engineer holds the vendor to documented criteria during SD, because verbal assurances don't survive installation.`],
        [`${cp.name} scope for logistics hubs`, `On logistics work in ${c}, ${sys}. Fees track ${sc.feeNote}; the automation coordination and the trailer-court civil work make logistics hubs more engineering-intensive than standard distribution per square foot.`],
        ["Cross-dock is a different building", `Unlike bulk distribution's deep boxes, cross-dock in ${c} wants shallow buildings — 200 feet deep or less — with dock doors on both long sides: freight flows through, not into storage. The door count per square foot doubles, the truck court doubles (both sides), and the MEP and structural design follow the throughput logic. Designing a cross-dock like a warehouse produces a building that can't do its job. The throughput math in ${c} — trailers per door per day, staging positions per trailer, automation throughput per hour — sizes the building, the courts, and the systems together. Logistics hubs are designed from the operations model outward; the architecture encloses a material-handling system, and the engineering serves the flow rate the business plan promises.`],
      ];
    },
    faqs: (t, c, s, cp, sc) => [
      [`What's the difference between a logistics hub and a warehouse?`, `Velocity: warehouses store, hubs flow. Cross-dock buildings move freight from inbound to outbound trailers with minimal dwell — which means more doors, shallower buildings, bigger truck courts, and (increasingly) automation. In ${c}, the engineering follows the operation: door density, court geometry, and the automation interface.`],
      [`How much power does warehouse automation need?`, `Significant — sortation systems, conveyors, and robotics add megawatts to buildings that historically needed little more than lighting. In ${s}, the utility service and the electrical distribution get sized from the automation vendor's load schedule; the vendor is a design-team member from programming.`],
      [`How do you design a trailer court?`, `With the turning templates for 53-foot trailers: staging positions, circulation aisles, and queuing lanes laid out so trucks never need to back blind or block ${c} streets. The civil engineer proves it with swept-path exhibits. Concrete pavement (not asphalt) in the maneuvering areas — trailer loads rut asphalt within seasons.`],
    ],
  },
};

/* Render a variation page. Deps injected: {PLACE_TYPES, PLACE_LOOKUP, STATE_META,
 * STATE_PROFILES, layout, esc, quoteCTA, SITE}. Returns HTML string or null.
 *
 * NOTE: The layout(), esc(), and quoteCTA() functions MUST produce byte-identical
 * output to the static generator's templates. This is the critical SEO safety
 * requirement — extract them from the repo's generate.ts before going live.
 */
export interface VariationDeps {
  PLACE_TYPES: Record<string, PlaceType>;
  PLACE_LOOKUP: Map<string, CityPlace>;
  STATE_META: Record<string, StateMeta>;
  STATE_PROFILES: Record<string, Record<string, unknown>>;
  layout: (o: { title: string; description: string; canonical: string; jsonLd: string; body: string }) => string;
  esc: (s: unknown) => string;
  quoteCTA: () => string;
  SITE: string;
}

export function variationPage(deps: VariationDeps, svc: string, state: string, city: string, variation: string): string | null {
  const { PLACE_TYPES, PLACE_LOOKUP, STATE_META, STATE_PROFILES, layout, esc, quoteCTA, SITE } = deps;
  const V = VARIATIONS[variation];
  const T = PLACE_TYPES[svc];
  if (!V || !T) return null;
  const pl = PLACE_LOOKUP.get(`${state}/${city}`);
  if (!pl) return null;
  const meta = STATE_META[state] || { abbr: "", name: state };
  const sp = STATE_PROFILES[state] || {};
  const sc = VARIATION_SERVICE_COPY[svc] || VARIATION_SERVICE_COPY["mep-engineering"];
  const cityName = pl.n, abbr = meta.abbr, stateName = meta.name;
  const t = T.name, lower = t.toLowerCase();
  const canon = `${SITE}/${svc}/${state}/${city}/${variation}/`;
  const prof = sp[T.profile] ? `<section class="block"><div class="wrap"><h2>${esc(t)} in ${esc(stateName)}: what governs your project</h2><p>${esc(String(sp[T.profile]).slice(0, 600))}</p></div></section>` : "";
  const secs = V.sections(t, cityName, stateName, T, sc, sp)
    .map(([h, p]) => `<section class="block"><div class="wrap"><h2>${esc(h)}</h2><p>${esc(p)}</p></div></section>`).join("");
  // AEO: FAQ content for AI engines (ChatGPT, Perplexity, Google AI Overviews)
  const faqPairs = V.faqs(t, cityName, stateName, T, sc);
  const faqHtml = faqPairs.length > 0
    ? `<section class="block"><div class="wrap"><h2>Frequently asked questions</h2><div class="faq">` +
      faqPairs.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="a"><p>${esc(a)}</p></div></details>`).join("") +
      `</div></div></section>`
    : "";
  const faqSchema = faqPairs.length > 0 ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqPairs.map(([q, a]) => ({
      "@type": "Question", name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  } : null;
  const others = Object.keys(VARIATIONS).filter(k => k !== variation)
    .map(k => `<a href="/${svc}/${state}/${city}/${k}/">${esc(VARIATIONS[k].title(t, cityName, abbr).split(":")[0])}</a>`).join(" · ");
  const svcLinks = VARIATION_SERVICES.filter(k => k !== svc)
    .map(k => `<a href="/${k}/${state}/${city}/">${esc((PLACE_TYPES[k] || {}).name || k)} in ${esc(cityName)}</a>`).join(" · ");
  const schemas: unknown[] = [{
    "@context": "https://schema.org", "@type": "Service",
    name: V.title(t, cityName, abbr),
    provider: { "@type": "Organization", name: "Apex Grid Engineering PLLC", url: SITE },
    areaServed: { "@type": "City", name: cityName, containedIn: { "@type": "State", name: stateName } },
  }];
  if (faqSchema) schemas.push(faqSchema);
  return layout({
    title: `${V.title(t, cityName, abbr)} | Apex Grid Engineering`,
    description: V.desc(t, cityName, stateName),
    canonical: canon,
    jsonLd: JSON.stringify(schemas),
    body: `<section class="hero"><div class="wrap">
<h1>${V.h1(t, cityName, abbr)}</h1>
<p class="lede">${esc(V.lede(t, cityName, stateName, T))}</p>${quoteCTA()}</div></section>
${prof}${secs}${faqHtml}
<section class="block"><div class="wrap"><h2>More ${esc(lower)} resources for ${esc(cityName)}</h2><p>${others}</p></div></section>
<section class="block"><div class="wrap"><h2>Other services in ${esc(cityName)}</h2><p>${svcLinks}</p></div></section>`,
  });
}

