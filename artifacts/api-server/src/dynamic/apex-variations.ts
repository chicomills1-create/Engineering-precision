/* Apex keyword-variation routes: /{svc}/{state}/{city}/{variation}/
 *
 * 12 intent families x 3 core services x all cities. Dynamic — no per-page files.
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
  },
  "permit": {
    title: (t, c, a) => `${t} Permitting in ${c}, ${a}`,
    desc: (t, c, s) => `${t} permitting in ${c}, ${s}: the submittal path, what's required, and what earns a fast review.`,
    h1: (t, c, a) => `${t} permitting in <span class="hl">${c}, ${a}</span>`,
    lede: (t, c, s, cp) => `The ${c} ${t.toLowerCase()} permit path — what to submit, what triggers review, and how to earn a fast approval in ${s}.`,
    sections: (t, c, s, cp, sc, sp) => [
      ["The submittal path", `Permits run through the ${c} building department under ${sc.codeRef}. Reviewers want completeness: sealed drawings, calculations that justify selections, schedules filled to model numbers, details a contractor can build from.`],
      ["What triggers review", `Anything beyond prescriptive tables — commercial work, additions, system changes that alter loads. ${sp.planCheck ? "Local plan-check patterns: " + sp.planCheck.slice(0, 220) + "…" : ""}`],
      ["Earning a fast review", `Speed comes from the first submittal. Complete sealed sets, correction responses that answer every comment with revised sheets — that's the formula, and it's included in our engagements.`],
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
  const others = Object.keys(VARIATIONS).filter(k => k !== variation)
    .map(k => `<a href="/${svc}/${state}/${city}/${k}/">${esc(VARIATIONS[k].title(t, cityName, abbr).split(":")[0])}</a>`).join(" · ");
  const svcLinks = VARIATION_SERVICES.filter(k => k !== svc)
    .map(k => `<a href="/${k}/${state}/${city}/">${esc((PLACE_TYPES[k] || {}).name || k)} in ${esc(cityName)}</a>`).join(" · ");
  return layout({
    title: `${V.title(t, cityName, abbr)} | Apex Grid Engineering`,
    description: V.desc(t, cityName, stateName),
    canonical: canon,
    jsonLd: JSON.stringify({
      "@context": "https://schema.org", "@type": "Service",
      name: V.title(t, cityName, abbr),
      provider: { "@type": "Organization", name: "Apex Grid Engineering PLLC", url: SITE },
      areaServed: { "@type": "City", name: cityName, containedIn: { "@type": "State", name: stateName } },
    }),
    body: `<section class="hero"><div class="wrap">
<h1>${V.h1(t, cityName, abbr)}</h1>
<p class="lede">${esc(V.lede(t, cityName, stateName, T))}</p>${quoteCTA()}</div></section>
${prof}${secs}
<section class="block"><div class="wrap"><h2>More ${esc(lower)} resources for ${esc(cityName)}</h2><p>${others}</p></div></section>
<section class="block"><div class="wrap"><h2>Other services in ${esc(cityName)}</h2><p>${svcLinks}</p></div></section>`,
  });
}

