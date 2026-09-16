import { htmlShell, SITE } from "./shell";

export const PHASE11_AUTHOR = "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";
type Faq = { question: string; answer: string };
type Project = {
  slug: string; title: string; description: string; h1: string; sector: string;
  location: string; year: string; disciplines: string[]; image: string;
  projectDescription: string; stats: { label: string; value: string }[];
  links: { label: string; href: string }[]; faqs: Faq[];
};

const data: Array<Omit<Project, "description"> & { description: string }> = [
  {
    slug: "kestrel-point-tower", title: "Kestrel Point Tower Case Study | Apex Grid", description: "Kestrel Point Tower project case study: seismic structural engineering, efficient HVAC routing, and coordinated mixed-use design in Seattle.",
    h1: "Kestrel Point Tower", sector: "Mixed-Use High Rise", location: "Seattle, WA", year: "2023", disciplines: ["Structural", "MEP", "Title 24"], image: "/images/case-studies/project-1.webp",
    projectDescription: "A 42-story tower requiring advanced seismic structural engineering and highly efficient HVAC routing through constrained plenum spaces. The design successfully integrated luxury residential units over 10 floors of commercial office space, balancing complex load transfers and massive centralized cooling requirements.",
    stats: [{ label: "Scale", value: "850K sq ft" }, { label: "Cooling", value: "1,200 Tons" }, { label: "Steel", value: "4,500 Tons" }],
    links: [{ label: "Structural engineering projects", href: "/projects/structural/" }, { label: "MEP engineering projects", href: "/projects/mep/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What made Kestrel Point Tower complex?", answer: "The 42-story mixed-use arrangement combined luxury residential units with 10 floors of commercial office space, creating complex load transfers and centralized cooling requirements." },
      { question: "What structural work was described for Kestrel Point Tower?", answer: "The portfolio describes advanced seismic structural engineering for the tower and balancing its complex load transfers." },
      { question: "How was HVAC addressed?", answer: "The design used highly efficient HVAC routing through constrained plenum spaces and included massive centralized cooling requirements." },
      { question: "What disciplines are listed for this project?", answer: "The listed disciplines are Structural, MEP, and Title 24." },
    ],
  },
  {
    slug: "bluewire-data-campus", title: "Bluewire Data Campus Case Study | Apex Grid", description: "Bluewire Data Campus case study: mission-critical MEP design, cooling distribution, reliable power, and pre-action fire suppression in Ashburn.",
    h1: "Bluewire Data Campus", sector: "Mission Critical / Industrial", location: "Ashburn, VA", year: "2023", disciplines: ["MEP", "Fire Protection"], image: "/images/case-studies/project-2.webp",
    projectDescription: "Mission-critical MEP design featuring N+1 redundancy, advanced cooling distribution, and pre-action fire suppression systems. The facility demanded highly reliable electrical distribution to support extreme rack densities, alongside massive backup generator arrays seamlessly integrated into the structural envelope.",
    stats: [{ label: "Power", value: "32 MW" }, { label: "Density", value: "250 W/sq ft" }, { label: "Uptime", value: "Tier III" }],
    links: [{ label: "MEP engineering projects", href: "/projects/mep/" }, { label: "Electrical engineering", href: "/electrical-engineering/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What type of facility is Bluewire Data Campus?", answer: "It is described as a mission-critical / industrial facility in Ashburn, Virginia." },
      { question: "What redundancy was included?", answer: "The mission-critical MEP design featured N+1 redundancy." },
      { question: "How was fire protection handled?", answer: "The design included pre-action fire suppression systems." },
      { question: "What electrical challenge did the facility have?", answer: "It required highly reliable electrical distribution to support extreme rack densities, with massive backup generator arrays integrated into the structural envelope." },
    ],
  },
  {
    slug: "saguaro-gate-medical-campus", title: "Saguaro Gate Medical Campus Case Study | Apex Grid", description: "Saguaro Gate Medical Campus case study: site and vertical engineering, retaining walls, stormwater detention, isolation rooms, and medical gas routing.",
    h1: "Saguaro Gate Medical Campus", sector: "Healthcare", location: "Queen Creek, AZ", year: "2024", disciplines: ["Civil", "Structural", "MEP"], image: "/images/case-studies/project-3.webp",
    projectDescription: "Complete site and vertical engineering for a sprawling new healthcare facility. The civil scope included complex retaining walls and massive stormwater detention basins, while the MEP team tackled stringent OSHPD-level equivalent requirements for negative pressure isolation rooms and medical gas routing.",
    stats: [{ label: "Scale", value: "120K sq ft" }, { label: "Site Area", value: "14 Acres" }, { label: "Beds", value: "85" }],
    links: [{ label: "Healthcare projects", href: "/projects/healthcare/" }, { label: "Civil engineering projects", href: "/projects/civil/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What engineering scope is described?", answer: "The project is described as complete site and vertical engineering for a new healthcare facility." },
      { question: "What did the civil scope include?", answer: "The civil scope included complex retaining walls and massive stormwater detention basins." },
      { question: "What healthcare systems were coordinated?", answer: "The MEP team addressed negative pressure isolation rooms and medical gas routing." },
      { question: "Which disciplines are listed?", answer: "The listed disciplines are Civil, Structural, and MEP." },
    ],
  },
  {
    slug: "windlass-logistics-hub", title: "Windlass Logistics Hub Case Study | Apex Grid", description: "Windlass Logistics Hub case study: tilt-up concrete, rooftop solar support, optimized structural design, and heavy-duty logistics pavement in Reno.",
    h1: "Windlass Logistics Hub", sector: "Industrial Warehouse", location: "Reno, NV", year: "2022", disciplines: ["Structural", "Civil", "Title 24"], image: "/images/case-studies/project-4.webp",
    projectDescription: "A massive logistics facility utilizing tilt-up concrete construction. Optimized for rapid deployment, the structural design minimized steel tonnage while supporting extensive rooftop solar arrays. Civil engineering handled heavy-duty pavement design for 24/7 autonomous truck traffic.",
    stats: [{ label: "Scale", value: "500K sq ft" }, { label: "Clear Height", value: "40 ft" }, { label: "Docks", value: "112" }],
    links: [{ label: "Industrial projects", href: "/projects/industrial/" }, { label: "Structural engineering projects", href: "/projects/structural/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What construction system did Windlass Logistics Hub use?", answer: "The facility used tilt-up concrete construction." },
      { question: "How did the structural design support deployment?", answer: "The structural design was optimized for rapid deployment and minimized steel tonnage." },
      { question: "What did the rooftop design support?", answer: "The structural design supported extensive rooftop solar arrays." },
      { question: "What was the civil pavement designed for?", answer: "Civil engineering handled heavy-duty pavement design for 24/7 autonomous truck traffic." },
    ],
  },
  {
    slug: "ironquill-lofts", title: "Ironquill Lofts Case Study | Apex Grid", description: "Ironquill Lofts case study: a 5-over-2 podium, urban infill project with underpinning, centralized VRF systems, and coordinated structural and MEP engineering.",
    h1: "The Ironquill Lofts", sector: "Multifamily Residential", location: "Austin, TX", year: "2023", disciplines: ["Structural", "MEP"], image: "/images/case-studies/project-5.webp",
    projectDescription: "A 5-over-2 podium construction project in a dense urban infill site. Structural engineering navigated complex foundation underpinning adjacent to historic structures. MEP systems utilized highly efficient centralized VRF systems to maximize ceiling heights in the residential units.",
    stats: [{ label: "Units", value: "245" }, { label: "Levels", value: "7" }, { label: "Efficiency", value: "LEED Gold" }],
    links: [{ label: "Structural engineering projects", href: "/projects/structural/" }, { label: "MEP engineering projects", href: "/projects/mep/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What project facts are recorded for Ironquill Lofts?", answer: "The portfolio records The Ironquill Lofts as a 5-over-2 podium construction project in a dense urban infill site in Austin, Texas, from 2023, with Structural and MEP disciplines." },
      { question: "Which disciplines are listed?", answer: "Structural and MEP are the disciplines listed in the portfolio record." },
      { question: "Where is The Ironquill Lofts located?", answer: "The portfolio record lists Austin, Texas." },
      { question: "What year is listed for the project?", answer: "The portfolio record lists 2023." },
    ],
  },
  {
    slug: "cumberland-forge-corporate-center", title: "Cumberland Forge Corporate Center Case Study | Apex Grid", description: "Cumberland Forge Corporate Center case study: core-and-shell engineering, tenant-ready MEP infrastructure, open floor plates, and rooftop loads.",
    h1: "Cumberland Forge Corporate Center", sector: "Commercial Office", location: "Nashville, TN", year: "2023", disciplines: ["MEP", "Structural"], image: "/images/case-studies/project-7.webp",
    projectDescription: "Core-and-shell engineering for a Class A office campus, with tenant-ready MEP infrastructure designed for flexible floor-plate demising. Right-sized central plant capacity, vertical distribution planned around future tenant improvements, and structural framing optimized for open floor plates and rooftop amenity loads.",
    stats: [{ label: "Scale", value: "310K sq ft" }, { label: "Floors", value: "12" }, { label: "Parking", value: "5-Level Garage" }],
    links: [{ label: "Commercial projects", href: "/projects/commercial/" }, { label: "MEP engineering projects", href: "/projects/mep/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What engineering scope is recorded?", answer: "The portfolio records core-and-shell engineering for a Class A office campus." },
      { question: "How was tenant flexibility addressed?", answer: "Tenant-ready MEP infrastructure was designed for flexible floor-plate demising, with vertical distribution planned around future tenant improvements." },
      { question: "What did the structural framing address?", answer: "Structural framing was optimized for open floor plates and rooftop amenity loads." },
      { question: "Which disciplines are listed?", answer: "The listed disciplines are MEP and Structural." },
    ],
  },
  {
    slug: "marketplace-at-cholla-verde", title: "Marketplace at Cholla Verde Case Study | Apex Grid", description: "Marketplace at Cholla Verde case study: open-air retail, site development, stormwater, utilities, kitchen ventilation, and restaurant services.",
    h1: "The Marketplace at Cholla Verde", sector: "Retail / Hospitality", location: "Phoenix, AZ", year: "2022", disciplines: ["Civil", "MEP", "Structural"], image: "/images/case-studies/project-8.webp",
    projectDescription: "A multi-building open-air retail and restaurant center. Civil scope covered full site development — grading, shared stormwater retention, and utility distribution to nine pads. Restaurant tenants required commercial kitchen ventilation, grease systems, and heavy electrical services coordinated across shell buildings.",
    stats: [{ label: "Buildings", value: "9" }, { label: "Scale", value: "185K sq ft" }, { label: "Restaurant Pads", value: "6" }],
    links: [{ label: "Civil engineering projects", href: "/projects/civil/" }, { label: "Commercial projects", href: "/projects/commercial/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What type of development is Marketplace at Cholla Verde?", answer: "It is a multi-building open-air retail and restaurant center." },
      { question: "What did the civil scope cover?", answer: "The civil scope covered grading, shared stormwater retention, and utility distribution to nine pads." },
      { question: "What restaurant systems were coordinated?", answer: "Restaurant tenants required commercial kitchen ventilation, grease systems, and heavy electrical services coordinated across shell buildings." },
      { question: "How many buildings are recorded?", answer: "The portfolio records nine buildings." },
    ],
  },
  {
    slug: "basalt-bend-stem-academy", title: "Basalt Bend STEM Academy Case Study | Apex Grid", description: "Basalt Bend STEM Academy case study: laboratory ventilation, fume exhaust, campus utilities, shaded courtyards, and phased construction in Boise.",
    h1: "Basalt Bend STEM Academy", sector: "Education", location: "Boise, ID", year: "2024", disciplines: ["Structural", "MEP", "Civil"], image: "/images/case-studies/project-9.webp",
    projectDescription: "A two-story K-8 academic building with laboratory classrooms. Engineering emphasized lab ventilation and fume exhaust, campus-wide utility infrastructure, and shaded outdoor learning courtyards. Structural design accommodated phased construction so the existing campus could stay in session through the build.",
    stats: [{ label: "Students", value: "1,200" }, { label: "Scale", value: "95K sq ft" }, { label: "Classrooms", value: "48" }],
    links: [{ label: "Structural engineering projects", href: "/projects/structural/" }, { label: "MEP engineering projects", href: "/projects/mep/" }, { label: "Portfolio", href: "/portfolio/" }],
    faqs: [
      { question: "What kind of building is Basalt Bend STEM Academy?", answer: "It is a two-story K-8 academic building with laboratory classrooms." },
      { question: "What laboratory systems were emphasized?", answer: "Engineering emphasized lab ventilation and fume exhaust." },
      { question: "How was construction phased?", answer: "Structural design accommodated phased construction so the existing campus could stay in session through the build." },
      { question: "What site features are recorded?", answer: "The portfolio records campus-wide utility infrastructure and shaded outdoor learning courtyards." },
    ],
  },
];

export const PHASE11_PROJECT_CASE_STUDIES: Project[] = data;
export const phase11Url = (p: Project) => `/projects/case-studies/${p.slug}/`;
const founderPerspectiveBySlug: Record<string, string> = {
  "kestrel-point-tower": "When I review this portfolio record, I see the coordination challenge clearly: a tall mixed-use building has to keep its seismic structure, constrained plenums, residential floors, and commercial floors legible as one engineering problem. I would keep those interfaces visible rather than treat any one system in isolation.",
  "bluewire-data-campus": "I read the Bluewire record as a reliability and coordination exercise. N+1 redundancy, cooling distribution, electrical distribution, rack density, fire suppression, and generator arrays are all named in the record, so my perspective is to keep those interfaces explicit in the design conversation.",
  "saguaro-gate-medical-campus": "This record shows why I approach healthcare work across the site and the building. Retaining walls, detention basins, isolation rooms, and medical gas routing sit in different technical lanes, but the published scope makes their coordination part of the same project story.",
  "windlass-logistics-hub": "The Windlass record puts deployment and daily movement at the center of my reading. Tilt-up construction, reduced steel tonnage, rooftop solar support, and pavement for autonomous truck traffic describe a project where structural and civil decisions need to stay connected to the facility’s use.",
  "ironquill-lofts": "I find the useful lesson in this record’s interfaces: a 5-over-2 podium, dense urban infill, underpinning beside historic structures, and centralized VRF systems each shape the engineering conversation. I would keep the structural and MEP decisions coordinated with the residential goal of maximizing ceiling heights.",
  "cumberland-forge-corporate-center": "I read Cumberland Forge through flexibility. The published record pairs open floor plates and rooftop amenity loads with tenant-ready MEP, future tenant improvements, and a right-sized central plant, so my perspective is to preserve options without losing a clear core-and-shell baseline.",
  "marketplace-at-cholla-verde": "The Marketplace record is a good reminder that an open-air center is still one coordinated site. I would keep grading, shared retention, utilities to the pads, kitchen ventilation, grease systems, and heavy electrical services connected across the shell buildings described in the portfolio.",
  "basalt-bend-stem-academy": "I read Basalt Bend as a learning environment and an active-campus coordination problem. The record names laboratory ventilation, fume exhaust, utilities, courtyards, and phased construction, so my perspective is to make those needs understandable while the existing campus stays in session.",
};
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const faqSchema = (faqs: Faq[]) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) });
export function phase11Page(p: Project): string {
  const url = phase11Url(p);
  const perspective = founderPerspectiveBySlug[p.slug];
  if (!perspective) throw new Error(`Missing Phase 11 founder perspective: ${p.slug}`);
  const body = `<main data-phase11="true">
    <section class="hero"><div class="container">
      <p class="eyebrow">${esc(p.sector)} · ${esc(p.location)} · ${p.year}</p>
      <h1>${esc(p.h1)}</h1>
      <p class="lede">${esc(p.projectDescription)}</p>
      <p class="byline">By ${PHASE11_AUTHOR}</p>
    </div></section>
    <section class="block"><div class="container">
      <img src="${p.image}" alt="${esc(p.h1)} engineering project" loading="lazy" style="width:100%;max-height:520px;object-fit:cover;margin-bottom:28px">
      <div class="prose">
        <h2>Portfolio record</h2>
        <p>This case study is based on the published Apex Grid portfolio record for ${esc(p.h1)}. It does not add project facts beyond that record.</p>
        <p>${esc(p.projectDescription)}</p>
        <h2>My founder perspective</h2>
        <p class="founder-perspective">I base this perspective on the published portfolio record. ${esc(perspective)}</p>
      </div>
      <div class="statgrid">${p.stats.map(s => `<div class="cell"><div class="k">${esc(s.label)}</div><strong>${esc(s.value)}</strong></div>`).join("")}</div>
      <div class="prose" style="margin-top:24px"><p>Disciplines: ${p.disciplines.map(d => esc(d)).join(", ")}.</p></div>
      <div class="linkrow">${p.links.map(l => `<a href="${l.href}">${esc(l.label)}</a>`).join("")}<a href="/estimate/">Request an engineering estimate</a></div>
    </div></section>
    <section class="block"><div class="container">
      <h2>Frequently Asked Questions</h2>
      <div class="faq">${p.faqs.map(f => `<details><summary>${esc(f.question)}</summary><div class="a">${esc(f.answer)}</div></details>`).join("")}</div>
    </div></section>
  </main>`;
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.description, author: { "@type": "Person", name: "Jeremy Mills" }, image: `${SITE}${p.image}` };
  return htmlShell({ title: p.title, description: p.description, canonical: `${SITE}${url}`, schemaJson: [schema, faqSchema(p.faqs), { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Projects", item: `${SITE}/projects/` }, { "@type": "ListItem", position: 2, name: p.title, item: `${SITE}${url}` }] }], body });
}