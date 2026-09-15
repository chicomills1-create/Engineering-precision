/**
 * Confirmed Phase 0 editorial corpus.
 *
 * These records are deliberately jurisdiction-neutral unless a record includes
 * an official state board link.  They are not a substitute for project intake,
 * an AHJ determination, or a responsible engineer's independent review.
 */

export type Phase0Faq = { question: string; answer: string };

export type Phase0AeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  faqs: Phase0Faq[];
  topic: string;
};

export const PHASE0_AEO_PAGES: Phase0AeoPage[] = [
  ["do-i-need-a-structural-engineer", "Do I Need a Structural Engineer? | Apex Grid", "When a project changes a load path, affects life safety, or needs sealed structural documents, a licensed structural engineer should define and document the work.", "When should I hire a structural engineer?", "Call a structural engineer before removing a load-bearing wall, adding a story or equipment load, altering foundations, investigating distress, or submitting structural documents for permit. The engineer confirms the existing conditions, design loads, applicable code path, and documents that can be responsibly sealed.", "Structural Engineering"],
  ["what-is-a-pe-stamp", "What Is a PE Stamp? | Apex Grid Engineering", "A PE stamp identifies professional responsibility for engineering work that a licensed professional engineer has reviewed, performed, and is authorized to seal.", "What does a PE stamp mean?", "A PE stamp is not a rubber-stamp service or a guarantee of approval. It identifies the licensed engineer who takes professional responsibility for defined engineering documents after reviewing the basis, calculations, drawings, and jurisdictional requirements. The responsible engineer and the applicable board rules control whether a document may be sealed.", "Professional Engineering"],
  ["what-is-mep-engineering", "What Is MEP Engineering? | Apex Grid", "MEP engineering coordinates mechanical, electrical, and plumbing systems with the building design, applicable codes, equipment, utilities, and permit documents.", "What is MEP engineering?", "MEP engineering is the design and documentation of mechanical, electrical, and plumbing systems for a defined project. It can include HVAC loads and distribution, electrical power and lighting, plumbing and gas systems, controls, equipment coordination, and code-compliance documentation. The exact scope depends on the building, jurisdiction, and responsible professionals.", "MEP Engineering"],
  ["how-much-does-mep-engineering-cost", "How Much Does MEP Engineering Cost? | Apex Grid", "MEP engineering fees depend on discipline scope, building complexity, existing conditions, coordination, deliverables, jurisdiction, and schedule—not a universal published price.", "How much does MEP engineering cost?", "There is no responsible universal MEP engineering price. Fee depends on the systems and disciplines involved, building size and occupancy, new versus existing conditions, equipment and utility information, modeling or calculations, permit deliverables, coordination, site work, and revision scope. A useful proposal states deliverables and assumptions rather than hiding scope behind a per-square-foot number.", "MEP Engineering"],
  ["how-much-does-a-pe-stamp-cost", "How Much Does a PE Stamp Cost? | Apex Grid", "A PE seal is part of responsible engineering work; its cost depends on the scope, review, design, calculations, coordination, and jurisdictional requirements.", "How much does a PE stamp cost?", "A PE stamp should not be priced as a detached signature. The fee reflects the engineering the responsible professional must perform or independently review, the records and field evidence required, the disciplines and deliverables, coordination, revisions, and applicable board or AHJ requirements. A low standalone price can hide missing engineering responsibility and is not a safe basis for a permit submission.", "Professional Engineering"],
  ["how-long-does-plan-check-take", "How Long Does Plan Check Take? | Apex Grid", "Plan-check duration depends on the authority, submittal completeness, queue, project type, review cycles, corrections, and applicant actions; it is not a universal promise.", "How long does plan check take?", "There is no universal plan-check duration. Separate engineering production, applicant intake, the AHJ's completeness review, substantive plan review, correction response, resubmittal, and any interagency review. The authority's published target or statutory window may describe one step and does not guarantee approval or total permit time.", "Plan Check"],
  ["what-are-engineering-calculations-for-a-permit", "What Are Engineering Calculations for a Permit? | Apex Grid", "Permit engineering calculations document the loads, assumptions, methods, and checks supporting a proposed structural, MEP, civil, or energy design.", "What are engineering calculations for a permit?", "Engineering calculations for a permit are the technical record behind a design: they translate project inputs into load checks, equipment sizing, capacity evaluations, drainage or utility analysis, energy results, or other required evidence. They are coordinated with the drawings and reviewed by the responsible engineer; the AHJ decides what it requires and whether the package is acceptable.", "Engineering Calculations"],
  ["what-is-title-24", "What Is Title 24? California Building Standards | Apex Grid", "Title 24 is California's compilation of building standards; Part 6 contains the California Energy Code and its compliance documentation requirements.", "What is Title 24?", "California Title 24 is the California Code of Regulations title containing the state's building standards. For commercial energy work, Title 24 Part 6 is the California Energy Code. The applicable edition, project type, alteration rules, forms, and local submission requirements must be confirmed for the project rather than inferred from a general summary.", "Energy Compliance"],
  ["title-24-vs-iecc", "Title 24 vs. IECC: What Is the Difference? | Apex Grid", "Title 24 Part 6 is California's state energy code, while the IECC is a model code adopted and amended by jurisdictions; the applicable edition and path control.", "What is the difference between Title 24 and the IECC?", "Title 24 Part 6 is California's energy standard and compliance framework. The IECC is a model energy code that states and local jurisdictions may adopt with amendments, sometimes alongside an ASHRAE compliance path. They are not interchangeable labels: identify the project's state, AHJ, adopted edition, climate data, and required documentation before selecting a method.", "Energy Compliance"],
  ["what-is-a-plan-check-correction", "What Is a Plan-Check Correction? | Apex Grid", "A plan-check correction is an AHJ comment identifying missing, unclear, inconsistent, or noncompliant information in a submitted permit package.", "What is a plan-check correction?", "A plan-check correction is part of the authority's review record. It may request clarification, a drawing change, a calculation, a code explanation, or action by another project participant. A sound response preserves the exact comment, assigns responsibility, revises the affected documents when needed, and avoids treating a response letter as a guarantee of approval.", "Plan Check"],
  ["risks-of-buying-pe-stamps-fiverr-upwork", "Risks of Buying PE Stamps on Fiverr or Upwork | Apex Grid", "Buying an isolated PE stamp through a marketplace can create licensing, professional-responsibility, document-integrity, permit, insurance, and life-safety risks.", "What are the risks of buying PE stamps on Fiverr or Upwork?", "A PE seal is not a commodity or a shortcut around engineering review. An anonymous marketplace transaction may leave unclear who designed the work, whether the engineer is licensed and authorized for the project, whether the design basis was verified, and who accepts responsible charge. It can lead to rejected permits, disciplinary exposure, uninsured errors, unsafe construction, and costly redesign. Hire a responsible professional for defined engineering work instead of purchasing an isolated signature.", "Professional Engineering"],
  ["how-does-energy-code-compliance-work", "How Does Energy Code Compliance Work? | Apex Grid", "Energy compliance matches the adopted code path, project inputs, and documentation to the jurisdiction's required submittal.", "How does commercial energy-code compliance work?", "The design team identifies the adopted energy code and compliance path, gathers envelope, lighting, HVAC, controls, and operating inputs, performs the required calculations or model, and coordinates the report with the permit drawings. The AHJ determines whether the submitted documentation is complete and acceptable.", "Energy Compliance"],
  ["what-documents-does-a-pe-need", "What Documents Does a PE Need? | Apex Grid", "A responsible engineer needs enough project, site, existing-condition, and design information to independently evaluate the requested scope.", "What does a professional engineer need to start?", "Send the project address, scope, current architectural background, existing drawings, photographs or field measurements, equipment data, survey or geotechnical information where relevant, schedule, AHJ comments, and any prior calculations. The engineer decides what evidence is sufficient and what requires verification.", "Professional Engineering"],
  ["can-an-engineer-seal-another-engineers-drawings", "Can an Engineer Seal Another Engineer's Drawings? | Apex Grid", "A seal requires independent professional responsibility; it is not a stamp-for-hire endorsement of unchanged work.", "Can a PE seal another engineer's drawings?", "Not as a simple unchanged stamp. A PE must independently review or perform the engineering, verify the design basis, coordinate the documents, and determine whether accepting responsibility is allowed and appropriate under the applicable board rules and AHJ process.", "Professional Engineering"],
  ["what-is-responsible-charge", "What Is Responsible Charge in Engineering? | Apex Grid", "Responsible charge means the engineer has the professional control and knowledge required to direct, review, and take responsibility for the work within the authorized scope.", "What does responsible charge mean for engineering documents?", "Responsible charge is a professional relationship, not merely a signature. The engineer must have sufficient knowledge of the project, direct or review the engineering work as required, comply with board rules, and accept responsibility only for work within the engineer's competence, authorization, and jurisdictional authority.", "Professional Engineering"],
  ["what-is-a-permit-ready-engineering-package", "What Is a Permit-Ready Engineering Package? | Apex Grid", "A permit-ready package coordinates the defined engineering drawings, calculations, notes, forms, and supporting documents required for a particular AHJ submission.", "What is included in a permit-ready engineering package?", "A package may include discipline drawings, calculations, schedules, specifications, energy documents, product information, professional seals, response forms, and coordination notes. The exact checklist, file format, signatures, and supporting materials come from the AHJ and project scope; permit-ready never means approval is guaranteed.", "Permit Engineering"],
  ["when-does-a-pe-need-a-site-visit", "When Does a PE Need a Site Visit? | Apex Grid", "A site visit is considered when direct observation is needed to resolve existing conditions, distress, access, measurements, or professional responsibility questions.", "When does a professional engineer need to visit a site?", "A PE may need a site visit for structural distress, uncertain or concealed conditions, complex modifications, forensic work, high-consequence decisions, or inadequate photographs and measurements. A remote workflow can be appropriate when reliable records and field evidence answer the engineering question; the responsible engineer decides.", "Professional Engineering"],
  ["what-is-engineer-of-record", "What Is an Engineer of Record? | Apex Grid", "The engineer of record is the professional engineer identified as responsible for the defined engineering documents and scope under the applicable rules.", "What does an engineer of record do?", "An engineer of record establishes or accepts responsibility for a defined engineering scope, directs or reviews the work, coordinates relevant documents, and signs or seals eligible deliverables when authorized. The role does not transfer an AHJ's authority or make the engineer responsible for unrelated design or construction work.", "Professional Engineering"],
  ["what-is-a-code-compliance-review", "What Is a Code Compliance Review? | Apex Grid", "A code compliance review checks the defined design against the adopted provisions and documents the assumptions, exceptions, calculations, and unresolved authority questions.", "What happens in a code compliance review?", "The reviewer identifies the governing code edition and scope, checks relevant life-safety and engineering criteria, traces design inputs to drawings and calculations, records exceptions or alternative methods, and flags decisions owned by the AHJ or another discipline. The review is project-specific and does not replace the authority's official plan review.", "Code Compliance"],
].map(([slug, title, description, h1, answer, topic]) => ({
  slug,
  title,
  description,
  h1,
  answer,
  topic,
  faqs: [
    { question: `What is the short answer about ${topic.toLowerCase()}?`, answer },
    { question: `What information does ${topic.toLowerCase()} depend on?`, answer: `The answer depends on the project scope, governing jurisdiction, current records, design inputs, and the responsible professional's independent review. ${answer}` },
    { question: `Does this guarantee permit approval?`, answer: "No. Engineering documents support a defined project scope, while the authority having jurisdiction controls its interpretation, completeness decision, review queue, and approval." },
    { question: "What should I send for an initial review?", answer: "Send the project address, plain-language scope, current drawings, existing-condition records, relevant calculations or comments, schedule, and the authority or code information already available. The responsible engineer will identify gaps." },
  ],
})) satisfies Phase0AeoPage[];

export type Phase0ServicePage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
  faqs: Phase0Faq[];
};

export const PHASE0_SERVICE_PAGES: Phase0ServicePage[] = [
  {
    slug: "engineering-calculations",
    path: "/services/engineering-calculations/",
    title: "Engineering Calculations Services | Apex Grid Engineering",
    description: "Permit-ready structural, MEP, civil, and energy engineering calculations prepared and reviewed for the defined project scope and AHJ requirements.",
    h1: "Engineering Calculations for Permit and Design Decisions",
    answer: "Engineering calculations turn project inputs into traceable design evidence. Apex Grid can evaluate structural, mechanical, electrical, plumbing, civil, and energy calculation scopes when the jurisdiction, records, and responsible engineer are confirmed.",
    sections: [
      { heading: "Calculation scope follows the design question", body: "A useful calculation package starts with the decision the project must support: member capacity, foundation loads, HVAC sizing, electrical service demand, drainage, equipment anchorage, energy compliance, or a correction response. The engineer identifies the applicable code edition, load criteria, assumptions, and information still needed before performing the work.", bullets: ["Gravity, lateral, wind, seismic, and foundation calculations", "HVAC load, equipment, electrical service, and distribution calculations", "Civil grading, drainage, utility, and stormwater calculations", "Energy compliance calculations and model documentation", "Revised calculations tied to plan-check comments or permit changes"] },
      { heading: "Inputs and professional review", body: "Calculations are only as defensible as the drawings, dimensions, equipment data, soil information, climate inputs, and existing-condition evidence behind them. The responsible engineer independently checks the design basis, coordinates the calculations with the drawings, and determines whether a site visit, survey, geotechnical report, or additional investigation is required.", bullets: ["Current architectural and engineering backgrounds", "Project address and adopted code information", "Equipment schedules, loads, and manufacturer data", "Existing drawings, photographs, measurements, and field reports", "AHJ checklist, correction notice, or required calculation format"] },
      { heading: "Deliverables and boundaries", body: "The deliverable may be a calculation book, calculation sheets, design narrative, marked-up background, or coordinated permit set depending on the proposal. A calculation package is not a promise of approval, a substitute for an AHJ review, or a stamp-for-hire service; the engineer seals only eligible work for which professional responsibility is accepted.", bullets: ["Traceable assumptions and load combinations", "Calculations coordinated to sheets and details", "Professional seal where authorized and required", "A response matrix when calculations address comments", "Clear exclusions for survey, testing, construction, or other specialists"] },
    ],
    faqs: [
      { question: "Can Apex Grid prepare calculations from a PDF plan set?", answer: "Sometimes. A PDF may support a narrow scope, but the responsible engineer may need editable backgrounds, field measurements, equipment data, survey, geotechnical information, or other records before accepting responsibility." },
      { question: "Are calculations the same as a PE stamp?", answer: "No. Calculations are engineering evidence; a PE seal represents professional responsibility for eligible work after the engineer performs or independently reviews it under applicable rules." },
      { question: "Will calculations guarantee permit approval?", answer: "No. The AHJ controls its requirements, interpretation, review, and decision. A coordinated calculation package helps the reviewer trace the design basis." },
      { question: "Can calculations answer plan-check comments?", answer: "They can support a response when the comment requires engineering analysis. The response must still address the exact comment and coordinate any revised drawings or other discipline actions." },
    ],
  },
  {
    slug: "energy-compliance",
    path: "/services/energy-compliance/",
    title: "Commercial Energy Compliance Services | Apex Grid",
    description: "Commercial energy-code compliance documentation, modeling, and plan-check coordination aligned to the adopted code path and project inputs.",
    h1: "Commercial Energy Code Compliance Services",
    answer: "Energy compliance is a coordinated design and documentation process. Apex Grid identifies the adopted code path, evaluates envelope and building-system inputs, prepares the required calculations or model, and coordinates the result with permit documents.",
    sections: [
      { heading: "Choose the adopted compliance path", body: "The applicable energy code, edition, amendments, project type, alteration status, climate data, and AHJ submittal checklist determine the path. Prescriptive, trade-off, and performance methods have different inputs and documentation; a state code page or model-code summary does not replace confirmation with the permitting authority.", bullets: ["Code edition and local amendment confirmation", "Prescriptive, trade-off, or performance method selection", "New construction, addition, alteration, and change-of-use review", "Envelope, HVAC, lighting, service-water, and controls coordination", "Forms, reports, schedules, and supporting calculations for submission"] },
      { heading: "Inputs that make the result reliable", body: "The energy record follows the actual design rather than a generic building description. We coordinate wall and roof assemblies, glazing, lighting power, HVAC equipment, ventilation, controls, operating schedules, and utility or owner requirements with the current architectural and MEP set. Missing or changing inputs are documented as risks.", bullets: ["Climate zone and project geometry", "Assembly and fenestration performance data", "Equipment capacities, efficiencies, controls, and schedules", "Lighting layouts, power densities, and daylight controls", "Owner decisions and product data that affect compliance"] },
      { heading: "Review support without an approval promise", body: "A complete compliance package gives the plan reviewer a traceable path from construction documents to the selected method and results. If comments arrive, the response maps the issue to the affected input, calculation, schedule, or drawing. The AHJ remains responsible for interpreting and accepting the submission.", bullets: ["Energy reports and compliance forms", "Model assumptions and output review", "Coordination with architectural and MEP revisions", "Comment responses with controlled document revisions", "Explicit handoffs for commissioning, testing, or utility programs"] },
    ],
    faqs: [
      { question: "Does every commercial project need an energy report?", answer: "Many jurisdictions require energy documentation, but the form and scope depend on the adopted code, project type, alteration rules, and AHJ checklist. Confirm the current requirement for the project." },
      { question: "Can an energy model be completed before the design is final?", answer: "A preliminary model can inform decisions, but final compliance documentation needs the current design inputs and must be coordinated with the submitted drawings." },
      { question: "Does an energy report replace MEP design?", answer: "No. Energy documentation evaluates a compliance path; it does not replace mechanical, electrical, plumbing, controls, commissioning, or architectural responsibilities." },
      { question: "Can Apex Grid respond to an energy plan-check comment?", answer: "Yes, when the scope, records, jurisdiction, and responsible engineer align. The response may require revised calculations, model inputs, schedules, drawings, or a question for the AHJ." },
    ],
  },
];

export type PeStateSource = { boardUrl: string; lookupUrl: string };

/** Official state board landing pages and official license-verification pages. */
export const PE_STATE_SOURCE_LINKS: Record<string, PeStateSource> = {
  alabama: { boardUrl: "https://pels.alabama.gov/", lookupUrl: "https://pels.alabama.gov/licensees/" },
  arizona: { boardUrl: "https://btr.az.gov/", lookupUrl: "https://azbtr.com/license-search/" },
  arkansas: { boardUrl: "https://www.pels.arkansas.gov/", lookupUrl: "https://www.pels.arkansas.gov/verify-license" },
  california: { boardUrl: "https://www.bpelsg.ca.gov/", lookupUrl: "https://www.dca.ca.gov/consumers/check_license.shtml" },
  colorado: { boardUrl: "https://dpo.colorado.gov/Engineering", lookupUrl: "https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx" },
  connecticut: { boardUrl: "https://portal.ct.gov/DPH/Practitioner-Licensing--Investigations/Professional-Licensing/Engineering", lookupUrl: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  delaware: { boardUrl: "https://dpr.delaware.gov/boards/professional-engineers/", lookupUrl: "https://delpros.delaware.gov/Lookup/LicenseLookup.aspx" },
  florida: { boardUrl: "https://fbpe.org/", lookupUrl: "https://fbpe.org/license-holders/licensee-search/" },
  georgia: { boardUrl: "https://pels.georgia.gov/", lookupUrl: "https://verify.sos.ga.gov/verification/" },
  hawaii: { boardUrl: "https://cca.hawaii.gov/pvl/boards/engineer/", lookupUrl: "https://cca.hawaii.gov/pvl/lookup/" },
  idaho: { boardUrl: "https://ibol.idaho.gov/IBOL/BoardPage.aspx?Bureau=PELS", lookupUrl: "https://ibol.idaho.gov/IBOL/LookupLicense.aspx" },
  illinois: { boardUrl: "https://idfpr.illinois.gov/profs/Professions/Engineer.html", lookupUrl: "https://online-dfpr.micropact.com/lookup/licenselookup.aspx" },
  indiana: { boardUrl: "https://www.in.gov/pla/professions/engineers-board/", lookupUrl: "https://mylicense.in.gov/everification/" },
  iowa: { boardUrl: "https://engineer.iowa.gov/", lookupUrl: "https://ibplicense.iowa.gov/PublicPortal/IowaLicenseSearch" },
  kansas: { boardUrl: "https://www.ksbpe.ks.gov/", lookupUrl: "https://www.ksbpe.ks.gov/verify-a-license" },
  kentucky: { boardUrl: "https://ky.gov/agencies/BEKPELS/Pages/default.aspx", lookupUrl: "https://oop.ky.gov/active_licenses.aspx" },
  louisiana: { boardUrl: "https://lsbpe.lapels.com/", lookupUrl: "https://lsbpe.lapels.com/verify-a-license/" },
  maine: { boardUrl: "https://www.maine.gov/pfr/professionallicensing/professions/engineers", lookupUrl: "https://www.pfr.maine.gov/ALMSOnline/ALMSQuery/SearchIndividual.aspx" },
  maryland: { boardUrl: "https://www.dllr.state.md.us/license/pe/", lookupUrl: "https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/Lookup/lookup.cgi" },
  massachusetts: { boardUrl: "https://www.mass.gov/orgs/board-of-registration-of-professional-engineers-and-land-surveyors", lookupUrl: "https://www.mass.gov/how-to/check-a-professional-engineers-license" },
  michigan: { boardUrl: "https://www.michigan.gov/lara/bureau-list/bpl/occ/engineering", lookupUrl: "https://aca-prod.accela.com/MILARA/GeneralProperty/PropertyLookUp.aspx" },
  minnesota: { boardUrl: "https://mn.gov/aelslagid/", lookupUrl: "https://mn.gov/aelslagid/license-search/" },
  mississippi: { boardUrl: "https://pepls.ms.gov/", lookupUrl: "https://pepls.ms.gov/verify/" },
  missouri: { boardUrl: "https://pr.mo.gov/boards/eng/", lookupUrl: "https://pr.mo.gov/licensee-search.asp" },
  montana: { boardUrl: "https://boards.bsd.dli.mt.gov/engineers-and-land-surveyors/", lookupUrl: "https://ebiz.mt.gov/POL/" },
  nebraska: { boardUrl: "https://nrec.nebraska.gov/engineers/", lookupUrl: "https://nrec.nebraska.gov/licensee-search" },
  nevada: { boardUrl: "https://nvbpels.org/", lookupUrl: "https://nvbpels.org/license-lookup/" },
  "new-hampshire": { boardUrl: "https://www.opi.nh.gov/professional-licensure/", lookupUrl: "https://www.opi.nh.gov/verification" },
  "new-jersey": { boardUrl: "https://www.njconsumeraffairs.gov/eng/", lookupUrl: "https://www.njconsumeraffairs.gov/verify" },
  "new-mexico": { boardUrl: "https://rld.nm.gov/boards-and-commissions/individual-boards-and-commissions/engineers-and-surveyors/", lookupUrl: "https://rldonline.nm.gov/lookup" },
  "new-york": { boardUrl: "https://dos.ny.gov/land-surveying-and-engineering", lookupUrl: "https://appext20.dos.ny.gov/lcns_public/lcns_public.php" },
  "north-carolina": { boardUrl: "https://www.ncbels.org/", lookupUrl: "https://www.ncbels.org/licensee-search/" },
  "north-dakota": { boardUrl: "https://ndpelsboard.org/", lookupUrl: "https://ndpelsboard.org/licensees/" },
  ohio: { boardUrl: "https://peps.ohio.gov/", lookupUrl: "https://elicense.ohio.gov/oh_verifylicense" },
  oklahoma: { boardUrl: "https://ok.gov/pe/", lookupUrl: "https://ok.gov/pe/license-lookup" },
  oregon: { boardUrl: "https://www.oregon.gov/osbeels/", lookupUrl: "https://www.oregon.gov/osbeels/Pages/license-verification.aspx" },
  pennsylvania: { boardUrl: "https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/Engineers/Pages/default.aspx", lookupUrl: "https://www.dos.pa.gov/ProfessionalLicensing/Verify-a-Professional/Pages/default.aspx" },
  "rhode-island": { boardUrl: "https://crb.ri.gov/professional-engineers-land-surveyors", lookupUrl: "https://crb.ri.gov/verify" },
  "south-carolina": { boardUrl: "https://llr.sc.gov/eng/", lookupUrl: "https://llr.sc.gov/lookup/" },
  "south-dakota": { boardUrl: "https://dps.sd.gov/licensing/professional-engineers", lookupUrl: "https://dps.sd.gov/licensing/verify" },
  tennessee: { boardUrl: "https://www.tn.gov/commerce/regboards/architects-engineers.html", lookupUrl: "https://apps.tn.gov/ae/" },
  texas: { boardUrl: "https://engineers.texas.gov/", lookupUrl: "https://engineers.texas.gov/roster/" },
  utah: { boardUrl: "https://dopl.utah.gov/professional-licensing/", lookupUrl: "https://dopl.utah.gov/license-lookup/" },
  vermont: { boardUrl: "https://sos.vermont.gov/opr/boards/engineering/", lookupUrl: "https://sos.vermont.gov/opr/verification/" },
  virginia: { boardUrl: "https://www.dpor.virginia.gov/Boards/APELS", lookupUrl: "https://www.dpor.virginia.gov/LicenseLookup" },
  washington: { boardUrl: "https://dol.wa.gov/professional-licenses/engineers-and-land-surveyors", lookupUrl: "https://fortress.wa.gov/dol/solar/Account/LawfulPresence/LicenseLookup.aspx" },
  "west-virginia": { boardUrl: "https://wvpebd.gov/", lookupUrl: "https://wvpebd.gov/license-verification" },
  wisconsin: { boardUrl: "https://dsps.wi.gov/Pages/Professions/ProfessionalEngineer/Default.aspx", lookupUrl: "https://license.wi.gov/" },
  wyoming: { boardUrl: "https://engineersandsurveyors.wyo.gov/", lookupUrl: "https://online.wyo.gov/complaint/lookup" },
};

export type Phase0Playbook = {
  slug: string;
  city: string;
  state: string;
  title: string;
  focus: string;
  sources: Array<{ label: string; url: string }>;
};

export const PHASE0_PLAN_CHECK_PLAYBOOKS: Phase0Playbook[] = [
  ["phoenix-plan-check-correction-playbook", "Phoenix", "Arizona", "municipal permit intake and correction routing", "Start with the city permit record and identify whether the comment belongs to building, planning, fire, grading, or a utility review.", "https://www.phoenix.gov/pdd", "https://www.phoenix.gov/pdd/onlineservices"],
  ["dallas-plan-check-correction-playbook", "Dallas", "Texas", "multi-discipline resubmittal coordination", "Keep the correction matrix aligned to the submitted drawing index, revision convention, and each affected discipline.", "https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/default.aspx", "https://developdallas.dallascityhall.com/"],
  ["denver-plan-check-correction-playbook", "Denver", "Colorado", "review comments, revisions, and applicant actions", "Separate engineering revisions from zoning, fire, landmark, and applicant actions before preparing the response package.", "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Community-Planning-and-Development", "https://www.denvergov.org/AccelaCitizenAccess"],
  ["houston-plan-check-correction-playbook", "Houston", "Texas", "portal records and coordinated document responses", "Preserve the reviewer notice, permit record, current plans, and upload instructions before changing a calculation or sheet.", "https://www.houstonpermittingcenter.org/", "https://www.houstonpermittingcenter.org/online-permitting"],
  ["atlanta-plan-check-correction-playbook", "Atlanta", "Georgia", "discipline ownership and resubmittal traceability", "Map each comment to the responsible design professional and do not treat a city comment as resolved until the referenced revision is coordinated.", "https://www.atlantaga.gov/government/departments/city-planning/office-of-buildings", "https://aca-prod.accela.com/Atlanta_GA/Default.aspx"],
  ["chicago-plan-check-correction-playbook", "Chicago", "Illinois", "building permit corrections and code-basis records", "Use the official permit record and current code resources to distinguish a document correction from a design change or separate city review.", "https://www.chicago.gov/city/en/depts/bldgs.html", "https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits.html"],
  ["los-angeles-plan-check-correction-playbook", "Los Angeles", "California", "plan check response and code-source coordination", "Keep the correction response tied to the plan-check cycle, applicable code edition, revised sheets, and any separate agency dependency.", "https://www.ladbs.org/", "https://www.ladbs.org/services/plan-check"],
  ["miami-plan-check-correction-playbook", "Miami", "Florida", "permit comments, hurricane design inputs, and revision control", "Confirm the project jurisdiction and design inputs before revising structural or MEP documents; coastal or wind assumptions must be project-specific.", "https://www.miami.gov/Permits-Construction", "https://www.miami.gov/Permits-Construction/Permits"],
  ["seattle-plan-check-correction-playbook", "Seattle", "Washington", "correction response evidence and permit portal workflow", "Organize reviewer comments, supporting calculations, drawings, energy documents, and unresolved applicant actions into a controlled response set.", "https://www.seattle.gov/sdci", "https://www.seattle.gov/sdci/permits"],
  ["boston-plan-check-correction-playbook", "Boston", "Massachusetts", "permit review handoffs and responsible design scope", "Identify building, zoning, fire, accessibility, and engineering handoffs so the response addresses the right authority without inventing a local determination.", "https://www.boston.gov/departments/inspectional-services", "https://www.boston.gov/departments/inspectional-services/how-get-permit"],
].map(([slug, city, state, focus, angle, source1, source2]) => ({
  slug,
  city,
  state,
  title: `${city} Plan Check Correction Playbook | Apex Grid`,
  focus,
  sources: [{ label: `${city} official building or development information`, url: source1 }, { label: `${city} official permit information`, url: source2 }, { label: "International Code Council — I-Codes", url: "https://www.iccsafe.org/products-and-services/i-codes/" }],
  // The angle is intentionally retained as a separate field while keeping the
  // exported shape small for the renderer.
  ...({ angle } as { angle: string }),
})) as Array<Phase0Playbook & { angle: string }>;

type ResourceSeed = [string, string, string, string, string];

const RESOURCE_SEEDS: ResourceSeed[] = [
  ["permit-intake-checklist", "Permit Intake Checklist for Engineering Teams", "intake", "A complete intake separates a project question from the documents needed to answer it.", "address, scope, authority, current drawings, schedule, and prior review records"],
  ["engineering-scope-letter", "How to Write an Engineering Scope Letter", "scope", "A scope letter makes responsibility, assumptions, deliverables, and exclusions visible before production begins.", "discipline boundaries, deliverable format, review cycles, site work, and owner decisions"],
  ["drawing-index-coordination", "Drawing Index Coordination for Permit Sets", "coordination", "A drawing index is a simple control that helps reviewers and project teams identify the complete current package.", "sheet numbers, revisions, discipline ownership, linked calculations, and superseded documents"],
  ["calculation-cover-sheet", "What a Calculation Cover Sheet Should Identify", "calculations", "A calculation cover sheet gives the reader a map of the design basis before the technical pages begin.", "project identity, code basis, criteria, assumptions, software, and responsible engineer"],
  ["existing-condition-photo-log", "Existing-Condition Photo Logs for Engineering", "existing", "A disciplined photo log turns visual field evidence into a traceable project record.", "location labels, direction, scale, date, access limits, and conditions needing verification"],
  ["field-measurement-protocol", "Field Measurement Protocol for Existing Buildings", "existing", "Field measurements should answer a defined engineering question and identify uncertainty rather than imply that every condition is known.", "control dimensions, member sizes, elevations, access, tolerances, and follow-up openings"],
  ["equipment-submittal-review", "Engineering Review of Equipment Submittals", "mep", "Equipment data should be checked against the loads, supports, connections, utilities, controls, and energy documents it affects.", "weight, capacity, power, airflow, clearances, mounting, and substitutions"],
  ["rooftop-equipment-structural-review", "Rooftop Equipment Structural Review", "structural", "Rooftop equipment review follows the load path from unit and curb through framing, connections, and supporting elements.", "operating and seismic loads, curb geometry, framing, access, vibration, and waterproofing handoff"],
  ["beam-opening-engineering-inputs", "Inputs for Beam and Wall-Opening Engineering", "structural", "An opening design needs enough information to trace loads above the opening into supports and foundations below.", "span, tributary area, wall construction, supports, floor levels, foundation, and temporary works handoff"],
  ["foundation-design-inputs", "Foundation Design Inputs for Permit Engineering", "structural", "Foundation design should state the soil, load, drainage, frost, seismic, and constructability information on which it relies.", "geotechnical recommendations, reactions, groundwater, frost, settlement, and excavation limits"],
  ["retaining-wall-engineering-inputs", "Retaining Wall Engineering Inputs", "civil", "Retaining wall calculations depend on soil, water, surcharge, geometry, drainage, and construction assumptions.", "height, backfill, surcharge, groundwater, drainage, global stability, and adjacent property limits"],
  ["grading-plan-review", "How to Review a Grading Plan", "civil", "A grading-plan review traces existing and proposed elevations through drainage, access, utilities, and adjacent-property constraints.", "contours, spot elevations, drainage arrows, ADA routes, utilities, and erosion controls"],
  ["stormwater-calculation-records", "Stormwater Calculation Records for Site Design", "civil", "Stormwater records explain the hydrology, assumptions, controls, routing, and maintenance obligations behind a site design.", "drainage area, rainfall data, impervious area, storage, discharge, water quality, and maintenance"],
  ["utility-coordination-matrix", "Utility Coordination Matrix for Civil Projects", "civil", "A utility matrix prevents a civil plan from treating provider decisions as if they were engineering assumptions.", "provider, point of connection, capacity, easement, service request, conflicts, and approval owner"],
  ["hvac-load-calculation-inputs", "HVAC Load Calculation Inputs", "mep", "HVAC sizing should be based on project geometry, envelope, schedules, ventilation, and equipment assumptions rather than rule-of-thumb capacity.", "climate data, orientation, assemblies, occupancy, ventilation, internal gains, and zoning"],
  ["ventilation-compliance-review", "Ventilation Compliance Review for Building Projects", "mep", "Ventilation review connects occupancy, outdoor air, exhaust, pressure relationships, controls, and the drawings that show them.", "occupancy, outdoor air method, exhaust, filtration, controls, shafts, and commissioning handoffs"],
  ["electrical-service-sizing", "Electrical Service Sizing Calculation Inputs", "mep", "Service sizing requires a coordinated load inventory and the applicable utility and electrical-code criteria.", "connected loads, demand, motors, continuous loads, EV charging, emergency systems, and utility data"],
  ["plumbing-fixture-unit-review", "Plumbing Fixture Unit Review", "mep", "Plumbing sizing begins with a fixture inventory, demand method, pressure, routing, and authority-specific requirements.", "fixture counts, demand method, pressure, pipe routing, hot water, sanitary, and specialty systems"],
  ["energy-envelope-documentation", "Energy Envelope Documentation Checklist", "energy", "Envelope documentation should let a reviewer trace assemblies, openings, thermal performance, and construction notes to the selected compliance path.", "wall and roof assemblies, glazing, air barrier, insulation, thermal bridges, and details"],
  ["lighting-power-compliance", "Lighting Power Compliance Documentation", "energy", "Lighting compliance depends on the current fixture schedule, space types, controls, and the adopted calculation method.", "area types, fixture wattage, controls, daylight, exterior lighting, and schedule coordination"],
  ["energy-model-quality-control", "Energy Model Quality-Control Review", "energy", "A model quality-control review tests whether geometry, schedules, systems, and outputs still match the construction documents.", "geometry, zoning, schedules, systems, unmet loads, reports, and revision tracking"],
  ["plan-check-comment-log", "Plan-Check Comment Log Template and Method", "review", "A comment log is most useful when each item has an owner, disposition, evidence, revision, and remaining dependency.", "comment number, sheet, discipline, action, response, revision, and open question"],
  ["permit-resubmittal-quality-control", "Permit Resubmittal Quality-Control Review", "review", "A resubmittal check looks beyond the response letter to the whole coordinated package that the reviewer will actually receive.", "revision clouds, stale notes, schedules, calculations, forms, file names, and portal requirements"],
  ["responsible-engineer-transition", "Responsible Engineer Transition Checklist", "professional", "A change in responsible engineering requires a documented handoff and independent review rather than a signature exchange.", "scope, records, open decisions, field evidence, prior reliance, authority notice, and professional acceptance"],
];

export type Phase0ResourcePage = {
  slug: string;
  title: string;
  category: string;
  answer: string;
  checklist: string;
  track: string;
};

export const PHASE0_RESOURCE_PAGES: Phase0ResourcePage[] = RESOURCE_SEEDS.flatMap((seed) =>
  ["design", "review", "delivery"].map((track) => ({
    slug: `${seed[0]}-${track}`,
    title: `${seed[1]}: ${track === "design" ? "Design Inputs" : track === "review" ? "Review Method" : "Delivery Records"}`,
    category: seed[2],
    answer: `${seed[3]} This ${track} perspective focuses on ${seed[4]}.`,
    checklist: `${seed[4]}; the governing code or AHJ checklist; current architectural and engineering backgrounds; assumptions that need confirmation; and a record of unresolved decisions.`,
    track,
  })),
);

export const PHASE0_RESOURCE_COUNT = PHASE0_RESOURCE_PAGES.length;