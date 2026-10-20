/** Shared HTML shell for statically generated SEO pages.
 * Mirrors the React app's red/black branding (Space Grotesk / Inter, HSL 0 0% 3% bg, red 0 72% 48%).
 */
import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "../src/lib/licensing";

const LOGO_SVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:36px;height:36px;color:hsl(0 72% 48%)"><path d="M50 8L8 88h12l30-58 30 58h12L50 8z" fill="currentColor"/><path d="M50 40L30 78h8l12-24 12 24h8L50 40z" fill="currentColor" opacity="0.7"/><path d="M32 74h36v6H32z" fill="currentColor"/></svg>`;
const PROJECT_YEAR = process.env.APEX_GRID_PROJECT_YEAR?.trim() || String(new Date().getFullYear());

export const SITE = "https://apexgrideng.com";

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:hsl(0 0% 3%);--card:hsl(0 0% 5%);--border:hsl(0 0% 12%);--fg:hsl(0 0% 92%);--muted:hsl(0 0% 62%);--primary:hsl(0 72% 48%);--primary-fg:#fff}
body{background:var(--bg);color:var(--fg);font-family:'Inter',system-ui,sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,.display{font-family:'Space Grotesk',sans-serif;line-height:1.15;letter-spacing:-0.01em}
a{color:inherit;text-decoration:none}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
header{border-bottom:1px solid var(--border);background:hsl(0 0% 3%/.95);position:sticky;top:0;z-index:50;backdrop-filter:blur(8px)}
.nav{display:flex;align-items:center;justify-content:space-between;height:76px}
.brand{display:flex;align-items:center;gap:12px;font-family:'Space Grotesk';font-weight:700;font-size:19px;letter-spacing:-.01em}
.brand small{display:block;font-size:9px;letter-spacing:.3em;color:var(--muted);font-weight:500}
.navlinks{display:flex;gap:18px;font-size:13px;color:hsl(0 0% 80%);align-items:center}
.navlinks a:hover{color:var(--primary)}
.cta{background:var(--primary);color:var(--primary-fg);font-weight:700;font-size:14px;padding:12px 24px;border-radius:2px}
.cta:hover{background:hsl(0 72% 42%)}
.hero{padding:96px 0 64px;border-bottom:1px solid var(--border);position:relative}
.hero .kicker{color:var(--primary);font-family:'Space Grotesk';font-size:12px;letter-spacing:.25em;text-transform:uppercase;margin-bottom:20px;font-weight:600}
.hero h1{font-size:clamp(34px,5vw,58px);font-weight:700;margin-bottom:24px}
.hero h1 .dim{color:var(--muted)}
.hero .lede{font-size:19px;color:hsl(0 0% 78%);max-width:760px;border-left:4px solid var(--primary);padding-left:22px}
.breadcrumb{padding-top:20px;font-size:12px;font-family:'Space Grotesk';text-transform:uppercase;letter-spacing:.12em;color:var(--muted);overflow-wrap:anywhere}
.breadcrumb a:hover{color:var(--primary)}
.breadcrumb span{margin:0 8px;color:hsl(0 0% 30%)}
section.block{padding:56px 0;border-bottom:1px solid var(--border)}
section.block h2{font-size:28px;margin-bottom:20px}
section.block h2 em{color:var(--primary);font-style:normal}
.prose p{color:hsl(0 0% 74%);margin-bottom:18px;max-width:820px}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.card{background:var(--card);border:1px solid var(--border);padding:26px}
.card h3{font-size:16px;margin-bottom:10px;color:var(--fg)}
.card p{font-size:14px;color:var(--muted)}
.card .label{font-family:'Space Grotesk';font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--primary);margin-bottom:12px;font-weight:600}
ul.scope{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;max-width:900px}
ul.scope li{background:var(--card);border:1px solid var(--border);padding:14px 18px;font-size:14px;color:hsl(0 0% 78%);border-left:3px solid var(--primary)}
.faq{max-width:860px}
.faq details{border:1px solid var(--border);background:var(--card);margin-bottom:10px}
.faq summary{cursor:pointer;padding:18px 22px;font-family:'Space Grotesk';font-weight:600;font-size:15px}
.faq .a{padding:0 22px 18px;color:var(--muted);font-size:14.5px}
.linkrow{display:flex;flex-wrap:wrap;gap:10px}
.linkrow a{border:1px solid var(--border);background:var(--card);padding:10px 16px;font-size:13px;color:hsl(0 0% 78%)}
.linkrow a:hover{border-color:var(--primary);color:var(--primary)}
.family-visual{max-width:1200px;margin:0 auto;padding:30px 24px 6px}
.family-visual img{display:block;width:100%;height:auto;border:1px solid var(--border);background:hsl(0 0% 5%)}
.ctaband{padding:72px 0;text-align:left}
.ctaband h2{font-size:32px;margin-bottom:14px}
.ctaband p{color:var(--muted);margin-bottom:28px;max-width:640px}
footer{border-top:1px solid var(--border);background:var(--card);padding:64px 0 32px;font-size:14px}
.fgrid{display:grid;grid-template-columns:2fr 1fr 1.2fr 1fr 1fr;gap:32px}
@media(max-width:1000px){.navlinks>a:not(.cta){display:none}}
@media(max-width:600px){
  .topbar .container{width:calc(100% - 24px)}
  .brand small{display:none}
  .navlinks{gap:8px}
  .navlinks .cta{padding:10px 13px;font-size:11px;letter-spacing:.06em}
  .hero h1{overflow-wrap:anywhere}
}
@media(max-width:800px){.fgrid{grid-template-columns:1fr 1fr}}
footer h4{font-family:'Space Grotesk';font-size:12px;text-transform:uppercase;letter-spacing:.15em;color:var(--muted);margin-bottom:18px}
footer ul{list-style:none}
footer li{margin-bottom:12px;color:hsl(0 0% 78%)}
footer a:hover{color:var(--primary)}
.fbottom{margin-top:48px;padding-top:24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--muted)}
.note{font-size:12.5px;color:hsl(0 0% 45%);max-width:820px;margin-top:8px}
.statgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--border);border:1px solid var(--border)}
.statgrid .cell{background:var(--bg);padding:22px}
.statgrid .cell .k{font-family:'Space Grotesk';font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--primary);margin-bottom:8px;font-weight:600}
.statgrid .cell .v{font-size:14.5px;color:hsl(0 0% 80%)}
`;

function header(): string {
  return `<header><div class="container nav">
  <a class="brand" href="/">${LOGO_SVG}<span>APEX GRID<small>ENGINEERING · ARCHITECTURE · GC</small></span></a>
  <nav class="navlinks">
    <a href="/services">Engineering</a><a href="/architecture/">Architecture</a><a href="/general-contracting/">General Contracting</a><a href="/industries">Industries</a><a href="/resources">Resources</a><a href="/locations/">Service Areas</a>
    <a class="cta" href="/contact">Contact Us</a>
  </nav>
</div></header>`;
}

function footer(): string {
  const year = PROJECT_YEAR;
  return `<footer><div class="container">
   <div class="fgrid">
    <div>
      <a class="brand" href="/" style="margin-bottom:18px">${LOGO_SVG}<span>APEX GRID</span></a>
       <p style="color:var(--muted);max-width:340px;margin-top:16px">Engineering, Architecture, and General Contracting under one organization—from concept and permit documents through construction delivery.</p>
       <p style="color:var(--muted);max-width:340px;margin-top:12px">${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}</p>
    </div>
     <div><h4>Firm</h4><ul><li><a href="/about">About Us</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/resources">Resources</a></li><li><a href="/blog/">Blog</a></li><li><a href="/south-africa/">South Africa Insights</a></li><li><a href="/locations/">Service Areas</a></li><li><a href="/licensing-service-coverage/">Licensing &amp; Coverage</a></li><li><a href="/contact">Contact</a></li></ul></div>
    <div><h4>Services</h4><ul><li><a href="/services/mep">MEP Engineering</a></li><li><a href="/services/structural">Structural Design</a></li><li><a href="/services/civil">Civil Engineering</a></li><li><a href="/architecture/">Architectural Design</a></li><li><a href="/general-contracting/">General Contracting</a></li></ul></div>
    <div><h4>Disciplines</h4><ul><li><a href="/structural-engineering/">Structural Engineering</a></li><li><a href="/mep-engineering/">MEP Engineering</a></li><li><a href="/civil-engineering/">Civil Engineering</a></li><li><a href="/mechanical-engineering/">Mechanical (HVAC)</a></li><li><a href="/electrical-engineering/">Electrical Engineering</a></li><li><a href="/plumbing-engineering/">Plumbing Engineering</a></li></ul></div>
     <div><h4>Business-provided contact</h4><ul><li>Operating / contact address<br/>22475 E Quintero Rd<br/>Queen Creek, AZ 85142</li><li><a href="mailto:info@apexgrideng.com">info@apexgrideng.com</a></li><li><a href="tel:+14804900064">(480) 490-0064</a></li></ul></div>
  </div>
  <div class="fbottom"><p>© ${year} Apex Grid Engineering PLLC. All rights reserved.</p><p><a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a></p></div>
</div></footer>`;
}

const e=(s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

// ─── Strike 100 Week-1 CTR Blitz Overrides (2026-10-12) ───
// ChatGPT-approved (2026-10-12T06:36:33Z): rewrite titles/descriptions for the
// 10 highest-value commercial-intent keywords. Target: CTR 0% → 2%+.
// Keyed by canonical URL path. Applied in htmlShell() before rendering.
// Variant B titles/descriptions are staged for sequential A/B testing:
// deploy variant A now, swap to B at Day 15, compare GSC CTR deltas.
interface CtrOverride {
  title: string;
  description: string;
  /** Variant B for sequential A/B test (swap at Day 15) */
  titleB: string;
  descriptionB: string;
  /** UTM slug for CTA attribution (?src=seo-{utmSlug}) */
  utmSlug: string;
  /** Append LocalBusiness/ProfessionalService schema */
  addLocalBusiness: boolean;
  /** Append aggregateRating + review schema (CTR Stage 2 proof stack) */
  addReviewSchema?: boolean;
  /** areaServed for the schema */
  areaServed: string;
}

const CTR_OVERRIDES: Record<string, CtrOverride> = {
  "/pe-stamp/texas/": {
    title: "Texas PE Stamp in 24\u201348 Hours | Licensed Engineer Seal | Apex Grid Engineering",
    description: "Need a PE stamp in Texas? Apex Grid Engineering provides licensed Texas engineer seals with 24\u201348 hour turnaround. Get a quote today \u2014 licensed in 49 states. Call (480) 490-0064.",
    titleB: "PE Stamp Texas | Fast 24\u201348 Hr Turnaround | Licensed in 49 States",
    descriptionB: "Get your Texas PE stamp fast. Licensed professional engineers, 24\u201348 hour turnaround, all disciplines. Apex Grid Engineering \u2014 trusted nationwide. Request a quote now.",
    utmSlug: "pe-stamp-texas",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "Texas",
  },
  "/industries/life-science/cleanroom-mep-engineering/": {
    title: "Cleanroom MEP Engineering Services \u2014 ISO 5\u20138, PE-Stamped Design | Apex Grid",
    description: "PE-stamped cleanroom MEP design for ISO 5\u20138 facilities: HEPA/ULPA filtration, pressure cascades, temp & humidity control. Licensed PEs, veteran-owned. Get a same-day quote on qualifying scopes.",
    titleB: "MEP Engineering for Cleanrooms | Pharma & Life Science Experts",
    descriptionB: "Specialized cleanroom MEP design \u2014 ISO classification HVAC, HEPA/ULPA filtration, positive pressure cascades. Life science facility experts. Contact Apex Grid for a project quote.",
    utmSlug: "cleanroom-mep-engineering",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "United States",
  },
  "/locations/colorado/denver/mep-engineering/": {
    title: "MEP Engineering Colorado | Denver-Based, Licensed Statewide | Apex Grid",
    description: "MEP engineering in Colorado \u2014 Denver-based team, licensed statewide. Commercial HVAC, electrical, plumbing design with local code expertise. Get a Colorado MEP quote today. Call (480) 490-0064.",
    titleB: "Denver MEP Engineering | Commercial HVAC, Electrical & Plumbing",
    descriptionB: "Denver MEP engineering firm serving all of Colorado. Commercial mechanical, electrical, and plumbing design coordinated with local AHJs. Licensed in 49 states. Request a quote.",
    utmSlug: "mep-engineering-colorado",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "Colorado",
  },
  "/locations/ohio/cleveland/structural-engineering/": {
    title: "Structural Engineer Cleveland, Ohio | Hire Licensed Experts | Apex Grid",
    description: "Hire a structural engineer in Cleveland, Ohio. Industrial, commercial & residential structural design with Ohio PE stamps. Get a quote in 24 hours \u2014 call (480) 490-0064.",
    titleB: "Cleveland Structural Engineering | Industrial & Commercial Design",
    descriptionB: "Cleveland structural engineering for adaptive reuse, industrial, and commercial projects. Licensed Ohio PEs. Lake-region expertise. Contact Apex Grid Engineering for a structural quote.",
    utmSlug: "structural-engineer-cleveland-ohio",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "Cleveland, Ohio",
  },
  "/industries/multifamily/apartments/mep-engineering/": {
    title: "Apartment MEP Engineering | Multifamily Design Experts | Apex Grid",
    description: "MEP engineering for apartment buildings \u2014 unit HVAC, electrical, plumbing & energy compliance. Trusted by multifamily developers nationwide. Get an apartment MEP quote today.",
    titleB: "Multifamily MEP Engineering | Apartment Design & Energy Compliance",
    descriptionB: "Apartment MEP engineering from schematic to permit \u2014 HVAC loads, electrical distribution, plumbing risers, Title 24 / IECC compliance. Developer-trusted nationwide. Request a quote.",
    utmSlug: "apartment-mep-engineering",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "United States",
  },
  "/metros/kalamazoo-portage-mi/mep-engineering/": {
    title: "MEP Engineering Kalamazoo | PE-Stamped, Same-Day Quotes | Apex Grid",
    description: "MEP Engineering for the Kalamazoo-Portage, MI metro \u2014 PE-stamped documents from a veteran-owned firm with 10+ licensed PEs and 20+ engineers. Same-day quotes on qualifying scopes.",
    titleB: "Kalamazoo MEP Engineering | Commercial Design, Fast Turnaround",
    descriptionB: "MEP engineering for the Kalamazoo\u2013Portage metro \u2014 commercial HVAC, electrical, plumbing with Michigan code expertise. Licensed in 49 states. Get a Kalamazoo MEP quote today.",
    utmSlug: "mep-design-kalamazoo",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "Kalamazoo-Portage, Michigan",
  },
  "/locations/oregon/salem/structural-engineering/": {
    title: "Structural Engineer Salem, Oregon | Licensed PE | Apex Grid",
    description: "Hire a structural engineer in Salem, Oregon. Residential & commercial structural design with Oregon PE stamps. Seismic, ADU & addition experts. Get a quote today \u2014 (480) 490-0064.",
    titleB: "Salem Structural Engineering | Seismic, ADUs & Additions",
    descriptionB: "Salem, Oregon structural engineering \u2014 ADUs, additions, commercial interiors, seismic retrofits. Licensed Oregon PE. Willamette Valley expertise. Request a structural quote.",
    utmSlug: "structural-engineer-salem-oregon",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "Salem, Oregon",
  },
  "/answers/garage-conversion-engineering/": {
    title: "Garage Conversion Structural Engineer | Permit Drawings in 24\u201348 Hrs",
    description: "Need a structural engineer for your garage conversion permit? We provide calculations, drawings & permit letters with 24\u201348 hour turnaround. Get a quote today \u2014 licensed in 49 states.",
    titleB: "Garage Conversion Engineering | Structural Plans for Permits",
    descriptionB: "Garage conversion structural engineering \u2014 slab analysis, new openings, shear walls, and the permit drawings proving the structure works as living space. Fast turnaround. Get a quote.",
    utmSlug: "garage-conversion-structural-engineer",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "United States",
  },
  "/answers/what-is-seismic-retrofit-engineering/": {
    title: "Seismic Retrofit Engineer | Soft-Story & URM Specialists | Apex Grid",
    description: "Hire a seismic retrofit engineer for soft-story, URM & mandated retrofits. LA, SF, Seattle ordinance expertise. Structural calculations & permit drawings. Get a quote today.",
    titleB: "Seismic Retrofit Engineering | Earthquake Strengthening Experts",
    descriptionB: "Seismic retrofit engineering strengthens existing buildings against earthquakes \u2014 soft-story, unreinforced masonry, non-ductile concrete. Mandated-program expertise. Request a quote.",
    utmSlug: "seismic-retrofit-engineer",
    addReviewSchema: true,
    addLocalBusiness: true,
    areaServed: "California, Oregon, Washington",
  },
  "/locations/iowa/carroll/": {
    title: "Structural, Civil & MEP Engineers in Carroll, IA \u2014 PE-Stamped Drawings | Apex Grid",
    description: "PE-stamped structural, civil and MEP drawings for Carroll and Carroll County projects \u2014 permit-ready, designed to the IBC with Iowa amendments. Same-day quotes on qualifying scopes.",
    titleB: "Engineering Services in Carroll, IA | MEP, Structural, Civil | Apex Grid",
    descriptionB: "MEP, structural & civil engineering in Carroll, IA \u2014 PE-stamped, permit-ready drawings designed to the IBC with Iowa amendments; adoption reach varies by jurisdiction. Veteran-owned firm with 10+ licensed PEs; same-day quotes on qualifying scopes.",
    utmSlug: "engineering-carroll-iowa",
    addLocalBusiness: true,
    areaServed: "Carroll, Iowa",
    addReviewSchema: true,
  },
  "/locations/missouri/macon/": {
    title: "Structural, Civil & MEP Engineers in Macon, MO \u2014 PE-Stamped Drawings | Apex Grid",
    description: "PE-stamped structural, civil and MEP drawings for Macon and Macon County projects \u2014 permit-ready, designed to the IBC with Missouri amendments. Same-day quotes on qualifying scopes.",
    titleB: "Engineering Services in Macon, MO | MEP, Structural, Civil | Apex Grid",
    descriptionB: "MEP, structural & civil engineering in Macon, MO \u2014 PE-stamped, permit-ready drawings designed to the IBC with local amendments; editions vary widely by jurisdiction. Veteran-owned firm with 10+ licensed PEs; same-day quotes on qualifying scopes.",
    utmSlug: "engineering-macon-missouri",
    addLocalBusiness: true,
    areaServed: "Macon, Missouri",
    addReviewSchema: true,
  },
  "/locations/utah/salt-lake-city/": {
    title: "MEP, Structural & Civil Engineers in Salt Lake City \u2014 PE-Stamped, Permit-Ready | Apex Grid",
    description: "Licensed engineers serving Salt Lake City: MEP documentation, structural and civil design, energy-code compliance \u2014 permitted through Salt Lake City Building Services. PE-stamped drawings, same-day quotes on qualifying scopes.",
    titleB: "Engineering Services in Salt Lake City, UT | MEP, Structural, Civil, Energy | Apex Grid",
    descriptionB: "Licensed MEP, structural, civil, and energy-compliance engineering in Salt Lake City, UT. Permitting through Salt Lake City Building Services Division (within the Department of Community & Neighborhoods) under the 2021 IBC as adopted statewide under the Utah State Construction Code. PE-stamped documents from a veteran-owned firm with 10+ licensed PEs \u2014 same-day quotes on qualifying scopes.",
    utmSlug: "engineering-salt-lake-city",
    addLocalBusiness: true,
    areaServed: "Salt Lake City, Utah",
    addReviewSchema: true,
  },
};

function buildCtrLocalBusinessSchema(override: CtrOverride, canonical: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apex Grid Engineering",
    "url": "https://apexgrideng.com",
    "telephone": "+1-480-490-0064",
    "email": "info@apexgrideng.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22475 E Quintero Rd",
      "addressLocality": "Queen Creek",
      "addressRegion": "AZ",
      "postalCode": "85142",
      "addressCountry": "US",
    },
    "areaServed": override.areaServed,
    "priceRange": "$$",
    "sameAs": ["https://apexgrideng.com"],
  };
}

// CTR Stage 2 proof stack (2026-10-19): the five Google reviews published
// on the homepage (Home.tsx REVIEWS), verbatim. aggregateRating 5.0 / 5
// matches the homepage's own published "5.0 on Google" presentation.
const APEX_GOOGLE_REVIEWS: ReadonlyArray<{ author: string; jobTitle?: string; text: string }> = [
  { author: "Ammad Riaz", text: "Jeremy is a great communicator. I trust him on projects to be responsive until the job is done. I would definitely consider him for engineering projects!" },
  { author: "Jason Mitchell", jobTitle: "Principal Architect, JL Mitchell Architects PC", text: "Worked with Jeremy on a project \u2014 solid engineering and clear communication from start to finish." },
  { author: "Griffin Phillips", text: "Apex was great to work with! We had a project that required both structural and MEP engineering and they got us taken care of promptly! They will definitely be getting our next projects." },
  { author: "James Wadlund", text: "I had an issue at my home that required an engineer to draw plans and stamp them. Most firms turned me down, but not APEX Grid. Jeremy Mills was fantastic to work with. Honestly some of the best communication I've received from a business in years." },
  { author: "Nayon Iovino", text: "Great costumer service. Speedy work with quality. I strongly recommend!" },
];

function buildApexReviewSchema(canonical: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${canonical}#reviews`,
    "name": "Apex Grid Engineering",
    "url": canonical,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "5",
      "bestRating": "5",
    },
    "review": APEX_GOOGLE_REVIEWS.map((r) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.author, ...(r.jobTitle ? { "jobTitle": r.jobTitle } : {}) },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": r.text,
    })),
  };
}

/** Apply CTR overrides. Returns possibly-modified {title, description, schemaJson, body}. */
function applyCtrOverrides(
  canonical: string,
  title: string,
  description: string,
  schemaJson: object[],
  body: string,
): { title: string; description: string; schemaJson: object[]; body: string } {
  let path: string;
  try {
    path = new URL(canonical).pathname;
  } catch {
    return { title, description, schemaJson, body };
  }
  // Normalize: ensure trailing slash for lookup
  const key = path.endsWith("/") ? path : path + "/";
  const override = CTR_OVERRIDES[key];
  // Proof stack: review schema on flagged money pages + the /pe-stamp/ family.
  let newSchema = schemaJson;
  if ((override && override.addReviewSchema) || key.startsWith("/pe-stamp/")) {
    newSchema = [...newSchema, buildApexReviewSchema(canonical)];
  }
  if (!override) return { title, description, schemaJson: newSchema, body };

  if (override.addLocalBusiness) {
    newSchema = [...newSchema, buildCtrLocalBusinessSchema(override, canonical)];
  }
  // UTM-tag CTA links for attribution (?src=seo-{slug})
  // Handles both bare /contact and /contact?existing=params
  const newBody = body.replace(
    /href="\/contact(\?[^"]*)?"/g,
    (_m, q) => `href="/contact?src=seo-${override.utmSlug}${q ? "&" + q.slice(1) : ""}"`,
  );
  return { title: override.title, description: override.description, schemaJson: newSchema, body: newBody };
}

// CTR Stage 2 proof stack (2026-10-19): hero proof band + short quote form
// injected on generator money pages -- identified by the family-visual
// diagram the imagery pass placed on those families (answers, services,
// PE-stamping, discipline hubs, locations, metros, industries). Class 1
// families and owner-gated pages are hard-excluded. The form posts to the
// site's existing lead pipeline (POST /api/leads, the same LeadInput
// contract the contact form uses) and fires the same lead_submit_success
// dataLayer event the estimator and contact form fire on success.
const PROOF_BAND_HTML = `<aside class="proof-band" aria-label="Client proof"><p class="proof-stars" aria-hidden="true">★★★★★</p><p class="proof-line"><strong>5.0 on Google.</strong> “Solid engineering and clear communication from start to finish.” — Jason Mitchell, Principal Architect, JL Mitchell Architects PC</p><p class="proof-facts">20+ engineers · 10+ licensed PEs · Veteran-owned</p><a class="cta proof-cta" href="/estimate">Get an engineering estimate</a></aside>`;

const QUOTE_FORM_HTML = `<section class="quote-form-band" id="apex-quote"><div id="apex-quote-wrap"><h2>Get a quote on your project</h2><p class="qf-proof">Reviewed and sealed by licensed PEs. <span aria-hidden="true">★★★★★</span> “Solid engineering and clear communication from start to finish.” — Jason Mitchell, Principal Architect</p><p>Tell us what you need and where the project is — quotes back within 12–24 hours on qualifying scopes.</p><form id="apex-quote-form"><div class="qf-grid"><label>Full name<input type="text" name="name" autocomplete="name" required /></label><label>Email<input type="email" name="email" autocomplete="email" required /></label><label>Project type<select name="projectType" required><option value="MEP">MEP</option><option value="Structural">Structural</option><option value="Civil">Civil</option><option value="PE stamp">PE stamp</option><option value="Other">Other</option></select></label><label>Project location<input type="text" name="location" placeholder="City, State" required /></label><label class="qf-full">Plans link (optional)<input type="url" name="plans" placeholder="https://…" /></label></div><button class="cta" type="submit">Request my quote</button><p id="apex-quote-error" style="display:none">Something went wrong sending your request. Please call (480) 490-0064 and we will take it from there.</p></form></div></section><script>(function(){var form=document.getElementById("apex-quote-form");if(!form)return;form.addEventListener("submit",function(e){e.preventDefault();var btn=form.querySelector("button[type=submit]");btn.disabled=true;var plans=form.elements["plans"].value.trim();var parts=["Project location: "+form.elements["location"].value.trim()];if(plans)parts.push("Plans: "+plans);parts.push("Quote requested from "+window.location.pathname);var data={name:form.elements["name"].value.trim(),email:form.elements["email"].value.trim(),projectType:form.elements["projectType"].value,services:"Quote request",message:parts.join(String.fromCharCode(10)),landingPath:window.location.pathname,source:"website-quote-form"};fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).then(function(r){if(!r.ok)throw new Error("submit failed");window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:"lead_submit_success"});document.getElementById("apex-quote-wrap").innerHTML="<h2>Request received</h2><p>Thanks — your request is in. We will get back to you within 12–24 hours.</p>";}).catch(function(){btn.disabled=false;document.getElementById("apex-quote-error").style.display="block";});});})();</script>`;

const PROOF_CSS = `.proof-band{max-width:1180px;margin:22px auto 0;padding:18px 22px;background:#0d1626;border:1px solid #24314d;border-radius:8px;color:#e5e7eb}.proof-band .proof-stars{color:#fbbf24;letter-spacing:2px;margin:0 0 6px;font-size:18px}.proof-band p{margin:0 0 6px}.proof-band .proof-facts{color:#94a3b8;font-size:14px}.proof-band .proof-cta{display:inline-block;margin-top:8px}.quote-form-band{max-width:1180px;margin:26px auto;padding:26px 22px;background:#0d1626;border:1px solid #24314d;border-radius:8px;color:#e5e7eb}.quote-form-band h2{margin:0 0 8px;font-size:26px}.quote-form-band .qf-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}.quote-form-band label{display:block;font-size:13px;color:#cbd5e1}.quote-form-band input,.quote-form-band select{width:100%;margin-top:5px;padding:11px 12px;border-radius:6px;border:1px solid #334155;background:#0f172a;color:#f8fafc;font-size:15px;box-sizing:border-box}.quote-form-band .qf-full{grid-column:1/-1}.quote-form-band button{margin-top:14px}@media(max-width:700px){.quote-form-band .qf-grid{grid-template-columns:1fr}}`;

const PROOF_EXCLUDED_PREFIXES = ["/architecture/", "/general-contracting/", "/portfolio/", "/jeremy-mills/"];

function proofApplies(canonical: string, body: string): boolean {
  let path = canonical;
  try {
    path = new URL(canonical, SITE).pathname;
  } catch {
    /* keep raw canonical */
  }
  if (PROOF_EXCLUDED_PREFIXES.some((p) => path.startsWith(p))) return false;
  return body.includes('class="family-visual"') || path.startsWith("/industries/");
}

export function htmlShell(opts: {
  title: string;
  description: string;
  canonical: string;
  schemaJson: object[];
  body: string;
  robots?: string;
}): string {
  // Strike 100 Week-1 CTR Blitz (2026-10-12, ChatGPT-approved): apply
  // title/description/schema/UTM overrides for the 10 target pages.
  const _ctr = applyCtrOverrides(opts.canonical, opts.title, opts.description, opts.schemaJson, opts.body);
  const _title = _ctr.title;
  const _description = _ctr.description;
  const _schemaJson = _ctr.schemaJson;
  const _body = _ctr.body;
  let _bodyOut = _body;
  if (proofApplies(opts.canonical, _bodyOut)) {
    const heroEnd = _bodyOut.indexOf("</section>");
    if (heroEnd >= 0) {
      const cut = heroEnd + "</section>".length;
      _bodyOut = _bodyOut.slice(0, cut) + PROOF_BAND_HTML + _bodyOut.slice(cut);
    }
    if (!_bodyOut.includes("<form")) _bodyOut += QUOTE_FORM_HTML;
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NZR5W46M');</script>
<!-- End Google Tag Manager -->
<!-- First-touch attribution capture: persist gclid/UTMs from the landing URL for the session -->
<script>(function(){try{var k="apex:firstTouch";if(window.sessionStorage.getItem(k))return;var q=new URLSearchParams(window.location.search),o={},hit=false;["gclid","utm_source","utm_medium","utm_campaign"].forEach(function(p){var v=q.get(p);if(v){o[p]=v;hit=true;}});if(hit)window.sessionStorage.setItem(k,JSON.stringify(o));}catch(e){}})();</script>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${e(_title)}</title>
<meta name="description" content="${e(_description)}" />
<link rel="canonical" href="${e(opts.canonical)}" />
<meta property="og:title" content="${e(_title)}" />
<meta property="og:description" content="${e(_description)}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${e(opts.canonical)}" />
<meta property="og:image" content="${e(`${SITE}/logo.png`)}" />
<meta property="og:image:alt" content="Apex Grid Engineering logo" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${e(_title)}" />
<meta name="twitter:description" content="${e(_description)}" />
<meta name="twitter:image" content="${e(`${SITE}/logo.png`)}" />
<meta name="twitter:image:alt" content="Apex Grid Engineering logo" />
<meta name="robots" content="${e(opts.robots ?? "index,follow")}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
${_schemaJson.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
<style>${CSS}${PROOF_CSS}</style>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZR5W46M"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
${header()}
${_bodyOut}
${footer()}
</body>
</html>`;
}
