/** Shared HTML shell for statically generated SEO pages.
 * Mirrors the React app's red/black branding (Space Grotesk / Inter, HSL 0 0% 3% bg, red 0 72% 48%).
 */
import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "../src/lib/licensing";

const LOGO_SVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:36px;height:36px;color:hsl(0 72% 48%)"><path d="M50 8L8 88h12l30-58 30 58h12L50 8z" fill="currentColor"/><path d="M50 40L30 78h8l12-24 12 24h8L50 40z" fill="currentColor" opacity="0.7"/><path d="M32 74h36v6H32z" fill="currentColor"/></svg>`;
const PROJECT_YEAR = process.env.APEX_GRID_PROJECT_YEAR?.trim() || "2025";

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
.breadcrumb{padding:20px 0 0;font-size:12px;font-family:'Space Grotesk';text-transform:uppercase;letter-spacing:.12em;color:var(--muted);overflow-wrap:anywhere}
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
  <div class="fbottom"><p>© ${year} Apex Grid Engineering. All rights reserved.</p><p><a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a></p></div>
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
    addLocalBusiness: true,
    areaServed: "Texas",
  },
  "/industries/life-science/cleanroom-mep-engineering/": {
    title: "Cleanroom MEP Engineering | ISO 5\u20138 Design, 10+ Licensed PEs | Apex Grid",
    description: "Cleanroom MEP engineering for ISO 5\u20138 environments \u2014 HEPA/ULPA filtration, pressure cascades, temperature and humidity control. PE-stamped design from a veteran-owned firm with 20+ engineers and 10+ licensed PEs. Same-day quotes on qualifying scopes.",
    titleB: "MEP Engineering for Cleanrooms | Pharma & Life Science Experts",
    descriptionB: "Specialized cleanroom MEP design \u2014 ISO classification HVAC, HEPA/ULPA filtration, positive pressure cascades. Life science facility experts. Contact Apex Grid for a project quote.",
    utmSlug: "cleanroom-mep-engineering",
    addLocalBusiness: true,
    areaServed: "United States",
  },
  "/locations/colorado/denver/mep-engineering/": {
    title: "MEP Engineering Colorado | Denver-Based, Licensed Statewide | Apex Grid",
    description: "MEP engineering in Colorado \u2014 Denver-based team, licensed statewide. Commercial HVAC, electrical, plumbing design with local code expertise. Get a Colorado MEP quote today. Call (480) 490-0064.",
    titleB: "Denver MEP Engineering | Commercial HVAC, Electrical & Plumbing",
    descriptionB: "Denver MEP engineering firm serving all of Colorado. Commercial mechanical, electrical, and plumbing design coordinated with local AHJs. Licensed in 49 states. Request a quote.",
    utmSlug: "mep-engineering-colorado",
    addLocalBusiness: true,
    areaServed: "Colorado",
  },
  "/locations/ohio/cleveland/structural-engineering/": {
    title: "Structural Engineer Cleveland, Ohio | Hire Licensed Experts | Apex Grid",
    description: "Hire a structural engineer in Cleveland, Ohio. Industrial, commercial & residential structural design with Ohio PE stamps. Get a quote in 24 hours \u2014 call (480) 490-0064.",
    titleB: "Cleveland Structural Engineering | Industrial & Commercial Design",
    descriptionB: "Cleveland structural engineering for adaptive reuse, industrial, and commercial projects. Licensed Ohio PEs. Lake-region expertise. Contact Apex Grid Engineering for a structural quote.",
    utmSlug: "structural-engineer-cleveland-ohio",
    addLocalBusiness: true,
    areaServed: "Cleveland, Ohio",
  },
  "/industries/multifamily/apartments/mep-engineering/": {
    title: "Apartment MEP Engineering | Multifamily Design Experts | Apex Grid",
    description: "MEP engineering for apartment buildings \u2014 unit HVAC, electrical, plumbing & energy compliance. Trusted by multifamily developers nationwide. Get an apartment MEP quote today.",
    titleB: "Multifamily MEP Engineering | Apartment Design & Energy Compliance",
    descriptionB: "Apartment MEP engineering from schematic to permit \u2014 HVAC loads, electrical distribution, plumbing risers, Title 24 / IECC compliance. Developer-trusted nationwide. Request a quote.",
    utmSlug: "apartment-mep-engineering",
    addLocalBusiness: true,
    areaServed: "United States",
  },
  "/metros/kalamazoo-portage-mi/mep-engineering/": {
    title: "MEP Engineering Kalamazoo | PE-Stamped, Same-Day Quotes | Apex Grid",
    description: "MEP Engineering for the Kalamazoo-Portage, MI metro \u2014 PE-stamped documents from a veteran-owned firm with 10+ licensed PEs and 20+ engineers. Same-day quotes on qualifying scopes.",
    titleB: "Kalamazoo MEP Engineering | Commercial Design, Fast Turnaround",
    descriptionB: "MEP engineering for the Kalamazoo\u2013Portage metro \u2014 commercial HVAC, electrical, plumbing with Michigan code expertise. Licensed in 49 states. Get a Kalamazoo MEP quote today.",
    utmSlug: "mep-design-kalamazoo",
    addLocalBusiness: true,
    areaServed: "Kalamazoo-Portage, Michigan",
  },
  "/locations/oregon/salem/structural-engineering/": {
    title: "Structural Engineer Salem, Oregon | Licensed PE | Apex Grid",
    description: "Hire a structural engineer in Salem, Oregon. Residential & commercial structural design with Oregon PE stamps. Seismic, ADU & addition experts. Get a quote today \u2014 (480) 490-0064.",
    titleB: "Salem Structural Engineering | Seismic, ADUs & Additions",
    descriptionB: "Salem, Oregon structural engineering \u2014 ADUs, additions, commercial interiors, seismic retrofits. Licensed Oregon PE. Willamette Valley expertise. Request a structural quote.",
    utmSlug: "structural-engineer-salem-oregon",
    addLocalBusiness: true,
    areaServed: "Salem, Oregon",
  },
  "/answers/garage-conversion-engineering/": {
    title: "Garage Conversion Structural Engineer | Permit Drawings in 24\u201348 Hrs",
    description: "Need a structural engineer for your garage conversion permit? We provide calculations, drawings & permit letters with 24\u201348 hour turnaround. Get a quote today \u2014 licensed in 49 states.",
    titleB: "Garage Conversion Engineering | Structural Plans for Permits",
    descriptionB: "Garage conversion structural engineering \u2014 slab analysis, new openings, shear walls, and the permit drawings proving the structure works as living space. Fast turnaround. Get a quote.",
    utmSlug: "garage-conversion-structural-engineer",
    addLocalBusiness: true,
    areaServed: "United States",
  },
  "/answers/what-is-seismic-retrofit-engineering/": {
    title: "Seismic Retrofit Engineer | Soft-Story & URM Specialists | Apex Grid",
    description: "Hire a seismic retrofit engineer for soft-story, URM & mandated retrofits. LA, SF, Seattle ordinance expertise. Structural calculations & permit drawings. Get a quote today.",
    titleB: "Seismic Retrofit Engineering | Earthquake Strengthening Experts",
    descriptionB: "Seismic retrofit engineering strengthens existing buildings against earthquakes \u2014 soft-story, unreinforced masonry, non-ductile concrete. Mandated-program expertise. Request a quote.",
    utmSlug: "seismic-retrofit-engineer",
    addLocalBusiness: true,
    areaServed: "California, Oregon, Washington",
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
  if (!override) return { title, description, schemaJson, body };

  let newSchema = schemaJson;
  if (override.addLocalBusiness) {
    newSchema = [...schemaJson, buildCtrLocalBusinessSchema(override, canonical)];
  }
  // UTM-tag CTA links for attribution (?src=seo-{slug})
  // Handles both bare /contact and /contact?existing=params
  const newBody = body.replace(
    /href="\/contact(\?[^"]*)?"/g,
    (_m, q) => `href="/contact?src=seo-${override.utmSlug}${q ? "&" + q.slice(1) : ""}"`,
  );
  return { title: override.title, description: override.description, schemaJson: newSchema, body: newBody };
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
<style>${CSS}</style>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZR5W46M"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
${header()}
${_body}
${footer()}
</body>
</html>`;
}
