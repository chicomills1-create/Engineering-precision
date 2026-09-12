/**
 * Dedicated source content for the plan-check-corrections-engineer service page.
 *
 * This page is intentionally jurisdiction-neutral.  The applicable authority,
 * code edition, submission portal, and responsible engineer are confirmed for
 * each project rather than implied by a national service page.
 */

export interface PlanCheckCorrectionsSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface PlanCheckCorrectionsStep {
  number: number;
  heading: string;
  body: string;
}

export interface PlanCheckCorrectionsLink {
  label: string;
  href: string;
  context: string;
}

export interface PlanCheckCorrectionsSource {
  name: string;
  url: string;
  relevance: string;
}

export interface PlanCheckCorrectionsPage {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: PlanCheckCorrectionsSection[];
  process: PlanCheckCorrectionsStep[];
  boundaries: string[];
  faqs: { q: string; a: string }[];
  internalLinks: PlanCheckCorrectionsLink[];
  sources: PlanCheckCorrectionsSource[];
  phrases: string[];
  audience: string;
  overlap: string;
}

export const PLAN_CHECK_CORRECTIONS_PAGE: PlanCheckCorrectionsPage = {
  slug: "plan-check-corrections-engineer",
  path: "/services/plan-check-corrections-engineer/",
  title: "Plan Check Corrections Engineer | Apex Grid Engineering",
  description:
    "Licensed engineering support for plan-check corrections: review notices, revise calculations and drawings, coordinate disciplines, write responses, and resubmit.",
  h1: "Plan Check Corrections Engineering Support",
  kicker: "Permit Review · Correction Responses",
  lede:
    "A correction notice is a design and documentation task, not a form to sign and return. Apex Grid provides licensed professional engineering support when the project scope, jurisdiction, records, and engineer authorization align. We review the authority’s comments, trace each item to the responsible discipline and design basis, revise calculations or drawings when needed, prepare a response letter, and coordinate a complete resubmittal. The authority having jurisdiction (AHJ), not Apex Grid, decides whether the response satisfies its comments or results in approval.",
  sections: [
    {
      heading: "Turn a correction notice into an actionable work plan",
      body:
        "Plan reviewers may identify missing calculations, unclear details, code-basis questions, coordination conflicts, or work that does not match the submitted drawings. A useful response begins by preserving the notice exactly as issued and creating a comment log with the sheet, detail, calculation, code topic, and responsible discipline for each item. We distinguish a request for clarification from a change to the design, an architectural issue from an engineering issue, and a comment that needs an AHJ answer from one that can be resolved in the documents. That prevents a generic response letter from leaving a substantive comment unanswered.",
      bullets: [
        "Comment-by-comment disposition: comply, clarify, revise, or request an AHJ determination",
        "Traceable sheet, detail, calculation, and revision references",
        "Identification of comments that affect structural, mechanical, electrical, plumbing, civil, energy, or accessibility coordination",
        "A written list of missing records, field verification, product data, or owner decisions",
      ],
    },
    {
      heading: "Engineering revisions are performed under professional responsibility",
      body:
        "When a comment changes the design basis, the responsible engineer evaluates the applicable loads, systems, code provisions, existing conditions, and interfaces before issuing a revision. Depending on the correction, that may mean recalculating a beam or connection, revising an HVAC load and equipment schedule, updating an electrical one-line or load calculation, correcting plumbing sizing, adding a civil drainage detail, or coordinating energy documentation. A response is supported by the work behind it; it is not a promise that a reviewer will accept an assertion without calculations or a drawing revision.",
    },
    {
      heading: "Coordinate the disciplines before resubmission",
      body:
        "Many correction cycles persist because one sheet is changed without checking the other sheets. A structural opening can affect mechanical routing; a new rooftop unit can affect structure, electrical service, and energy compliance; a revised site utility can affect grading and accessibility. We compare the correction response against the architectural background, schedules, details, specifications, and related engineering sheets included in the agreed scope. The architect, contractor, specialty consultant, owner, utility, fire authority, and other parties retain responsibilities that are not transferred by an engineering response.",
    },
    {
      heading: "A response letter should help the reviewer verify the fix",
      body:
        "The response letter is organized to mirror the AHJ’s correction list. Each answer identifies the original comment, states the action taken, cites the revised sheet or calculation when appropriate, and explains a technical interpretation without overstating what changed. Revised sheets are clearly identified with the project’s revision convention, and changed details or calculations are coordinated with the transmitted set. If a comment turns on an unresolved zoning, fire, health, utility, or planning decision, the response identifies that dependency instead of representing an engineering opinion as an agency determination.",
    },
    {
      heading: "Resubmittal is a project-team and AHJ workflow",
      body:
        "The final package must follow the jurisdiction’s instructions for file naming, signatures and seals, revision clouds, forms, fees, portal upload, and applicant authorization. Apex Grid can prepare engineering documents and support the response package within the agreed scope; the applicant or designated permit contact may need to upload the package, pay fees, answer portal questions, or maintain the permit record. After resubmittal, the AHJ may issue another correction cycle, request information from another agency, or require a field inspection. A complete response improves traceability but cannot control the authority’s decision or queue.",
    },
    {
      heading: "Review windows are not a promise of total permit duration",
      body:
        "A published AHJ review target, a statutory completeness-review rule, and the time required to obtain a permit are different things. For example, California Government Code section 65943 concerns completeness determinations for certain development applications; it is not a universal deadline for building plan-check approval and does not establish a permit-issuance outcome. Overall duration can also include intake, corrections, applicant revisions, resubmittal queues, fees, interagency review, deferred items, inspections, and changes made after submission. We report schedule assumptions as project conditions, not as fixed approval dates.",
    },
    {
      heading: "The records that make a correction review defensible",
      body:
        "Send the complete correction notice, the submitted and approved drawing sets, calculations, specifications, portal correspondence, permit number, project address, current architectural backgrounds, and any inspection or field reports. Include equipment selections, geotechnical information, survey data, utility correspondence, photographs, and the reviewer’s requested response format when relevant. If the project changed after the original submission, identify what was built, ordered, or redesigned. Missing or superseded records are surfaced as scope risks rather than silently treated as current.",
    },
    {
      heading: "Who this service is for",
      body:
        "Owners, architects, contractors, permit coordinators, and developers use this service when a correction notice requires engineering judgment or a coordinated document change. It can support a tenant improvement, renovation, addition, new commercial building, equipment replacement, site improvement, or other permitted work. The first intake question is not simply how many comments were issued; it is whether Apex Grid can lawfully and competently assume the requested engineering role with enough information to stand behind the resulting documents.",
    },
  ],
  process: [
    {
      number: 1,
      heading: "Intake the notice and permit record",
      body:
        "We identify the project address, AHJ, permit number, submission stage, disciplines, applicant contact, code editions cited by the reviewer, and the requested decision. The complete notice and current document set are needed before a responsible engineer can define a reliable scope.",
    },
    {
      number: 2,
      heading: "Build the correction matrix",
      body:
        "Each comment is mapped to a sheet, calculation, code topic, responsible discipline, and proposed disposition. We flag conflicts, missing inputs, site-verification needs, agency questions, and changes that may expand beyond a response into redesign.",
    },
    {
      number: 3,
      heading: "Confirm the engineering basis",
      body:
        "The responsible licensed engineer reviews the design basis and determines whether existing records are sufficient. Updated loads, equipment data, survey or geotechnical information, photographs, measurements, or a site visit may be required before a revision can be issued.",
    },
    {
      number: 4,
      heading: "Revise calculations and drawings",
      body:
        "We develop the engineering changes within the agreed disciplines, update supporting calculations and details, and coordinate interfaces with the architectural and other consultant documents. The engineer determines which documents require professional signature and seal under the project’s jurisdictional rules.",
    },
    {
      number: 5,
      heading: "Prepare and quality-check the response",
      body:
        "The response letter follows the reviewer’s numbering and points to the exact revised sheet, detail, schedule, or calculation. A cross-discipline check looks for stale notes, mismatched equipment, inconsistent dimensions, unresolved assumptions, and changes that were not carried through the package.",
    },
    {
      number: 6,
      heading: "Support the resubmittal and next cycle",
      body:
        "We deliver the defined engineering response package and clarify the files, seals, forms, and applicant actions needed for the AHJ’s portal or submission method. If the authority issues additional comments, a new review cycle is evaluated against the new notice and the agreed scope rather than assumed to be included without limit.",
    },
  ],
  boundaries: [
    "Apex Grid does not stamp or seal another engineer’s unchanged work. A responsible engineer must independently review the basis, perform or verify the necessary engineering, and accept professional responsibility before issuing eligible documents.",
    "A correction-response engagement does not control permit approval, first-cycle acceptance, inspection results, a particular review date, or total permit duration. The AHJ controls its interpretation, queue, comments, and decision.",
    "The service is not a substitute for an architect, land-use professional, surveyor, geotechnical engineer, fire-protection designer, testing agency, contractor, utility, or other specialist when that party is required by the project or AHJ.",
    "Existing drawings and photographs do not prove concealed conditions. The responsible engineer may require a site visit, measurements, selective investigation, testing, survey, product data, or updated records before revising documents.",
    "A response to an AHJ comment is not legal advice and does not override zoning, planning, fire, health, accessibility, utility, environmental, or other agency authority. Unresolved non-engineering decisions are identified for the appropriate project participant.",
    "The proposal defines included disciplines, deliverables, revision cycles, site work, and coordination responsibilities. Material scope changes, new comments, construction changes, or a different AHJ can require a revised scope and fee.",
  ],
  faqs: [
    {
      q: "Can an engineer respond to my plan-check corrections?",
      a:
        "Often, subject to the project jurisdiction, discipline, records, and engineer availability. Send the complete correction notice, submitted plans and calculations, project address, permit number, and current architectural background. Apex Grid will first determine whether the requested response fits a licensed engineering scope and what additional information is required.",
    },
    {
      q: "Can Apex Grid stamp plans prepared by another engineer?",
      a:
        "No—not as an unchanged stamp-for-hire service. A responsible Apex Grid engineer must independently review the design basis, perform or verify the work needed for the project, coordinate the documents, and determine whether accepting professional responsibility is appropriate under applicable law and AHJ requirements.",
    },
    {
      q: "Do you respond to every correction comment?",
      a:
        "The agreed scope identifies the disciplines and comments included. Engineering comments may be addressed through revised calculations, drawings, details, schedules, or a response explanation. Zoning, fire, health, utility, planning, or other agency comments may require the architect, applicant, specialty consultant, or direct AHJ coordination rather than an engineering response.",
    },
    {
      q: "Will the authority approve the corrected plans after one resubmittal?",
      a:
        "Approval remains the authority’s decision. The reviewer may accept the response, issue additional comments, refer the package to another agency, or identify a new issue. A clear comment matrix and coordinated documents can make the next review easier to evaluate, but they cannot determine the AHJ’s outcome.",
    },
    {
      q: "How long does a plan-check correction response take?",
      a:
        "There is no universal duration. Engineering production depends on comment complexity, records, site access, number of disciplines, required calculations, changes in scope, and engineer availability. AHJ review time is separate and controlled by the jurisdiction. Any project schedule should distinguish engineering preparation, applicant resubmittal, and the authority’s subsequent review.",
    },
    {
      q: "Can you work from the correction notice and a PDF set alone?",
      a:
        "Sometimes, but not automatically. A PDF set may be enough for a narrow clarification; design changes can require editable backgrounds, calculations, equipment data, survey or geotechnical information, field photographs, measurements, or a site observation. The responsible engineer decides whether the available evidence supports a professional opinion.",
    },
    {
      q: "Who submits the corrected package to the building department?",
      a:
        "The applicant, owner, architect, contractor, or designated permit contact usually controls the permit account and submission authorization. Apex Grid can prepare the defined engineering files and submission support, while the project team remains responsible for portal access, fees, forms, and any actions reserved to the permit applicant or AHJ.",
    },
  ],
  internalLinks: [
    {
      label: "Plan Check Response Engineering",
      href: "/permit-engineering/plan-check-responses/",
      context: "Broader permit-comment and correction-response service overview.",
    },
    {
      label: "Engineering Calculations for Permit Submittals",
      href: "/permit-engineering/engineering-calculations/",
      context: "Supporting calculation scope for comments that require new or revised design evidence.",
    },
    {
      label: "Engineering Permit Revisions",
      href: "/permit-engineering/permit-revisions/",
      context: "Use when a correction becomes a material permit or construction revision.",
    },
    {
      label: "Engineer-of-Record Transition Support",
      href: "/engineering-intent/engineer-of-record-transition/",
      context: "Relevant when the requested response involves changing responsible engineering teams.",
    },
    {
      label: "How Long Does Plan Check Take?",
      href: "/guides/plan-check-timeline/",
      context: "General planning guidance that separates engineering work from AHJ review.",
    },
    {
      label: "Contact Apex Grid Engineering",
      href: "/contact/",
      context: "Intake for the correction notice, permit record, project scope, and jurisdiction.",
    },
  ],
  sources: [
    {
      name: "California Board for Professional Engineers, Land Surveyors, and Geologists — Professional Engineers Act",
      url: "https://www.bpelsg.ca.gov/laws/pe_act.shtml",
      relevance:
        "Primary California source for the professional-engineering practice framework; useful when California licensure, responsible work, or seal requirements are part of the project.",
    },
    {
      name: "California Board for Professional Engineers, Land Surveyors, and Geologists — Board Rules",
      url: "https://www.bpelsg.ca.gov/laws/board_rules.shtml",
      relevance:
        "Official California rules source to consult for professional responsibility and document-signing questions; the applicable jurisdiction’s requirements still control a particular submittal.",
    },
    {
      name: "California Legislative Information — Government Code section 65943",
      url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=65943.&lawCode=GOV",
      relevance:
        "Official statutory source for a California completeness-review rule. It is cited with an explicit caveat: a completeness determination is not a universal building plan-check deadline and does not establish permit issuance.",
    },
    {
      name: "California Building Standards Commission — California Building Standards Code resources",
      url: "https://www.dgs.ca.gov/BSC/Resources/Page-Content/Building-Standards-Commission-Resources-List-Folder/California-Building-Standards-Codes",
      relevance:
        "Official state source for California building-standards-code resources; the local AHJ and adopted edition must be confirmed for each project.",
    },
    {
      name: "International Code Council — I-Codes",
      url: "https://www.iccsafe.org/products-and-services/i-codes/",
      relevance:
        "Official model-code publisher source for code-family context. It does not establish which edition or amendment a local AHJ has adopted.",
    },
    {
      name: "California Department of Consumer Affairs — License Search",
      url: "https://www.dca.ca.gov/consumers/check_license.shtml",
      relevance:
        "Official California license-verification resource for checking a professional license record; project-specific authorization and responsible charge still require direct confirmation.",
    },
  ],
  phrases: [
    "plan check corrections engineer",
    "permit correction response engineer",
    "engineering response to plan review comments",
    "building department correction notice engineer",
    "permit resubmittal engineering support",
    "revised calculations for permit comments",
    "plan check correction drawings",
  ],
  audience:
    "Commercial owners, architects, contractors, developers, permit coordinators, and project managers",
  overlap:
    "Dedicated correction-notice workflow; it is more specific than general permit engineering and does not replace discipline design, permit-revision, or engineer-of-record transition pages.",
};
