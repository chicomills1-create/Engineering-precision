/** Generates static SEO pages into public/locations/ and rebuilds sitemap.xml.
 * Run: pnpm --filter @workspace/apex-grid run seo:generate
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StateData, CityData } from "./types";
import { CITY_PRIORITIES } from "./city-priorities";
import { LEGACY_CURATED_CITY_KEYS } from "./legacy-curated-cities";
import { SERVICES, type ServiceDef } from "./services";
import { htmlShell, SITE } from "./shell";
import { BLOG_POSTS, type BlogPost } from "./blog";
import { verifyBlogPostAuthorship } from "./check-blog-authorship";
import { CLIENT_PAGES, WHO_WE_WORK_WITH_HUB, type ClientPage } from "./client-pages";
import { PROJECT_TYPE_PAGES, PROJECT_TYPES_HUB, type ProjectTypePage } from "./project-type-pages";
import { EXISTING_BUILDING_PAGES, EXISTING_BUILDING_HUB, type ExistingBuildingPage } from "./existing-building-pages";
import { PERMIT_PAGES, PERMIT_HUB, type PermitPage } from "./permit-pages";
import {
  CANONICAL_INDUSTRY_DISCIPLINE_PAGES,
  INDUSTRY_DISCIPLINE_PAGES,
  INDUSTRY_DISCIPLINE_REDIRECTS,
  getIndustryDisciplineUrl,
  type IndustryDisciplinePage,
} from "./industry-discipline-pages";
import { LOCATION_SERVICE_PAGES as RAW_LOCATION_SERVICE_PAGES, type LocationServicePage } from "./location-service-pages";
import { SOLUTION_PAGES, type SolutionPage } from "./solutions-pages";
import { GUIDE_PAGES, GUIDES_HUB, type GuidePage } from "./guides-pages";
import { DISCIPLINE_HUBS, type DisciplineHub, type DisciplineSubpage } from "./discipline-pages";
import { MISC_PAGES, type MiscPage } from "./misc-pages";
import { STRUCTURAL_EXTENDED_PAGES, type StructuralExtendedPage } from "./structural-extended-pages";
import { TITLE_24_HUB, TITLE_24_PAGES, type Title24Page } from "./title-24-pages";
import { PROJECTS_HUB, PROJECT_CATEGORY_PAGES, type ProjectCategoryPage } from "./projects-pages";
import { STATIC_STANDALONE_PAGES, type StaticPageDef } from "./static-pages";
import { DISCIPLINES, type DisciplineDef } from "./disciplines";
import { PARTNER_PAGES, type PartnerPage } from "./partner-pages";
import {
  LOCATION_VERTICALS,
  type DirectoryCity,
  verticalAvailableInState,
  verticalCityPage,
  verticalCityUrl,
  verticalHubPage,
  verticalLandingPage,
  verticalStatePage,
  verticalStateUrl,
  verticalsForState,
} from "./location-verticals";
import {
  LEGACY_LOCATION_REDIRECTS,
  RETAINED_LEGACY_LOCATIONS,
} from "./legacy-locations";
import { ALL_INDUSTRIES } from "../src/data/industries";
import {
  RESOURCE_ARTICLES,
  RESOURCE_DISCIPLINES,
  ROOT_CANONICAL_RESOURCE_SLUGS,
  disciplineOf,
  resourceUrl,
  type ResourceArticle,
  type ResourceDiscipline,
} from "./resources";
import { AUDIENCE_RESOURCE_HUBS, audienceResourceHubPage, AUDIENCE_RESOURCE_AUTHOR } from "./audience-resource-hubs";
import {
  PRIORITY_MARKET_HUBS,
  PRIORITY_MARKET_AUTHOR,
  priorityMarketHubPage,
  priorityMarketHubUrl,
} from "./priority-market-hubs";
import {
  PHASE9_INDUSTRY_SERVICE_PAGES,
  PHASE9_INBOUND_TARGETS,
  phase9Page,
  phase9Url,
} from "./phase9-industry-service";
import { PHASE11_PROJECT_CASE_STUDIES, phase11Page, phase11Url } from "./phase11-project-case-studies";
import { GLOSSARY_TERMS, sortedGlossaryTerms, glossaryByLetter, relatedGlossaryTerms, type GlossaryTerm } from "./glossary";
import { APEX_GRID_BUSINESS_SCHEMA } from "../src/lib/business-schema";
import {
  LICENSED_STATES_TEXT,
  LICENSING_COVERAGE_STATEMENT,
  PROJECT_JURISDICTION_NOTE,
} from "../src/lib/licensing";
import {
  ENGINEERING_INTENT_PAGES,
  NEAR_ME_ENGINEERING_PAGE,
  type EngineeringIntentPage,
} from "./engineering-intent-pages";
import {
  assertNoConflictingOutputOwners,
  assertRouteOwnership,
  resetGeneratedChildrenPreservingHub,
  REACT_OWNED_SHARED_ROUTES,
  REACT_PRERENDER_ROUTES,
  REACT_PRERENDER_SERVICE_ROUTES,
  SEO_GENERATOR_FIXED_INDEX_ROUTES,
} from "./route-ownership";
import { NATIONAL_FACILITY_INTENT_PAGES } from "./national-facility-intent-pages";
import {
  CALIFORNIA_ADU_STATE_PAGE,
  CALIFORNIA_ADU_CITY_PAGES,
  type CaliforniaAduPage,
} from "./california-adu-pages-south";
import {
  CALIFORNIA_ADU_STRUCTURAL_PAGES,
  type CaliforniaAduStructuralPage,
} from "./california-adu-pages-north";
import {
  PLAN_CHECK_CORRECTIONS_PAGE,
  type PlanCheckCorrectionsPage,
} from "./plan-check-corrections-page";
import {
  BATCH2_CORE_SERVICE_SLUGS,
  type Batch2Faq,
  type Batch2StateExpansion,
  type Batch2Metro,
  type Batch2CoreServicePage,
} from "./batch2-core-service-types";
import georgiaBatch2 from "./batch2-georgia";
import illinoisBatch2 from "./batch2-illinois";
import michiganBatch2 from "./batch2-michigan";
import newYorkBatch2 from "./batch2-new-york";
import northCarolinaBatch2 from "./batch2-north-carolina";
import ohioBatch2 from "./batch2-ohio";
import pennsylvaniaBatch2 from "./batch2-pennsylvania";
import { BATCH3_EXPANSIONS, BATCH3_EXPECTED_STATE_SLUGS } from "./batch3-expansions";
import { BATCH4_EXPANSIONS, BATCH4_EXPECTED_STATE_SLUGS } from "./batch4-expansions";
import {
  PE_STATE_SOURCE_LINKS,
  PHASE0_AEO_PAGES,
  PHASE0_PLAN_CHECK_PLAYBOOKS,
  PHASE0_RESOURCE_PAGES,
  PHASE0_SERVICE_PAGES,
  type Phase0AeoPage,
  type Phase0Playbook,
  type Phase0ResourcePage,
  type Phase0ServicePage,
} from "./phase0-corpus";
import {
  STAMPING_SERVICE_HUBS,
  STAMPING_SERVICE_PAGES,
  type StampingServiceHub,
  type StampingServicePage,
} from "./stamping-service-pages";
import {
  PHASE1_METROS,
  PHASE1_SERVICE_SLUGS,
  PHASE1_SOURCE_URL,
  type Phase1Metro,
  type Phase1ServiceSlug,
} from "./phase1-metros";
import {
  PHASE2_METROS,
  PHASE2_SERVICE_SLUGS,
  type Phase2Metro,
  type Phase2ServiceSlug,
} from "./phase2-metros";
import {
  PHASE3_METROS,
  PHASE3_SERVICE_SLUGS,
  type Phase3Metro,
  type Phase3ServiceSlug,
} from "./phase3-metros";
import {
  PHASE4_METROS,
  PHASE4_SERVICE_SLUGS,
  PHASE4_SOURCE_URL,
  type Phase4Metro,
  type Phase4ServiceSlug,
} from "./phase4-metros";
import {
  PHASE5_METROS,
  PHASE5_SERVICE_SLUGS,
  PHASE5_SOURCE_URL,
  type Phase5Metro,
  type Phase5ServiceSlug,
} from "./phase5-metros";
import type { Phase7AeoSeed, Phase7Cluster } from "./phase7-types";
import { PHASE7_COST_PAGES } from "./phase7-cost-pages";
import { PHASE7_TIMELINE_PAGES } from "./phase7-timeline-pages";
import { PHASE7_HIRING_PAGES } from "./phase7-hiring-pages";
import { PHASE7_LICENSING_PAGES } from "./phase7-licensing-pages";
import { PHASE7_PERMIT_PAGES } from "./phase7-permit-pages";
import { PHASE7_TECHNICAL_PAGES } from "./phase7-technical-pages";
import { WAVE_D_ANSWER_PAGES } from "./wave-d-answer-pages";
import { WAVE_E_ANSWER_PAGES } from "./wave-e-answer-pages";
import { WAVE_F_ANSWER_PAGES } from "./wave-f-answer-pages";
import { WAVE_G_ANSWER_PAGES } from "./wave-g-answer-pages";
import { WAVE_H_ANSWER_PAGES } from "./wave-h-answer-pages";
import { WAVE_I_ANSWER_PAGES } from "./wave-i-answer-pages";
import { WAVE_ID_B60_ANSWER_PAGES } from "./wave-id-b60-answer-pages";
import { WAVE_IE_B60_ANSWER_PAGES } from "./wave-ie-b60-answer-pages";
import { WAVE_IF_B60_ANSWER_PAGES } from "./wave-if-b60-answer-pages";
import { WAVE_IG_B60_ANSWER_PAGES } from "./wave-ig-b60-answer-pages";
import { WAVE_IH_B60_ANSWER_PAGES } from "./wave-ih-b60-answer-pages";
import { WAVE_II_B60_ANSWER_PAGES } from "./wave-ii-b60-answer-pages";
import { WAVE_IJ_B61_ANSWER_PAGES } from "./wave-ij-b61-answer-pages";
import { WAVE_IK_B61_ANSWER_PAGES } from "./wave-ik-b61-answer-pages";
import { WAVE_IL_B61_ANSWER_PAGES } from "./wave-il-b61-answer-pages";
import { WAVE_IM_B61_ANSWER_PAGES } from "./wave-im-b61-answer-pages";
import { WAVE_IN_B61_ANSWER_PAGES } from "./wave-in-b61-answer-pages";
import { WAVE_IO_B61_ANSWER_PAGES } from "./wave-io-b61-answer-pages";
import { WAVE_IP_B62_ANSWER_PAGES } from "./wave-ip-b62-answer-pages";
import { WAVE_IQ_B62_ANSWER_PAGES } from "./wave-iq-b62-answer-pages";
import { WAVE_IR_B62_ANSWER_PAGES } from "./wave-ir-b62-answer-pages";
import { WAVE_IS_B62_ANSWER_PAGES } from "./wave-is-b62-answer-pages";
import { WAVE_IT_B62_ANSWER_PAGES } from "./wave-it-b62-answer-pages";
import { WAVE_IU_B62_ANSWER_PAGES } from "./wave-iu-b62-answer-pages";
import { WAVE_IV_B63_ANSWER_PAGES } from "./wave-iv-b63-answer-pages";
import { WAVE_IW_B63_ANSWER_PAGES } from "./wave-iw-b63-answer-pages";
import { WAVE_IX_B63_ANSWER_PAGES } from "./wave-ix-b63-answer-pages";
import { WAVE_IY_B64_ANSWER_PAGES } from "./wave-iy-b64-answer-pages";
import { WAVE_IZ_B64_ANSWER_PAGES } from "./wave-iz-b64-answer-pages";
import { WAVE_J_ANSWER_PAGES } from "./wave-j-answer-pages";
import { WAVE_JA_B64_ANSWER_PAGES } from "./wave-ja-b64-answer-pages";
import { WAVE_JB_B65_ANSWER_PAGES } from "./wave-jb-b65-answer-pages";
import { WAVE_JC_B65_ANSWER_PAGES } from "./wave-jc-b65-answer-pages";
import { WAVE_JD_B65_ANSWER_PAGES } from "./wave-jd-b65-answer-pages";
import { WAVE_JE_B65_ANSWER_PAGES } from "./wave-je-b65-answer-pages";
import { WAVE_JF_B65_ANSWER_PAGES } from "./wave-jf-b65-answer-pages";
import { WAVE_JG_B65_ANSWER_PAGES } from "./wave-jg-b65-answer-pages";
import { WAVE_JH_B66_ANSWER_PAGES } from "./wave-jh-b66-answer-pages";
import { WAVE_JI_B66_ANSWER_PAGES } from "./wave-ji-b66-answer-pages";
import { WAVE_JJ_B66_ANSWER_PAGES } from "./wave-jj-b66-answer-pages";
import { WAVE_JK_B66_ANSWER_PAGES } from "./wave-jk-b66-answer-pages";
import { WAVE_JL_B66_ANSWER_PAGES } from "./wave-jl-b66-answer-pages";
import { WAVE_JM_B66_ANSWER_PAGES } from "./wave-jm-b66-answer-pages";
import { WAVE_JN_B67_ANSWER_PAGES } from "./wave-jn-b67-answer-pages";
import { WAVE_JO_B67_ANSWER_PAGES } from "./wave-jo-b67-answer-pages";
import { WAVE_JP_B67_ANSWER_PAGES } from "./wave-jp-b67-answer-pages";
import { WAVE_JQ_B67_ANSWER_PAGES } from "./wave-jq-b67-answer-pages";
import { WAVE_JR_B67_ANSWER_PAGES } from "./wave-jr-b67-answer-pages";
import { WAVE_JS_ANSWER_PAGES } from "./wave-js-answer-pages";
import { WAVE_JT_ANSWER_PAGES } from "./wave-jt-answer-pages";
import { WAVE_JU_ANSWER_PAGES } from "./wave-ju-answer-pages";
import { WAVE_JV_ANSWER_PAGES } from "./wave-jv-answer-pages";
import { WAVE_JW_ANSWER_PAGES } from "./wave-jw-answer-pages";
import { WAVE_JX_ANSWER_PAGES } from "./wave-jx-answer-pages";
import { WAVE_JY_ANSWER_PAGES } from "./wave-jy-answer-pages";
import { WAVE_JZ_ANSWER_PAGES } from "./wave-jz-answer-pages";
import { WAVE_K_ANSWER_PAGES } from "./wave-k-answer-pages";
import { WAVE_KA_ANSWER_PAGES } from "./wave-ka-answer-pages";
import { WAVE_KB_ANSWER_PAGES } from "./wave-kb-answer-pages";
import { WAVE_KC_ANSWER_PAGES } from "./wave-kc-answer-pages";
import { WAVE_KD_ANSWER_PAGES } from "./wave-kd-answer-pages";
import { WAVE_KE_ANSWER_PAGES } from "./wave-ke-answer-pages";
import { WAVE_KF_ANSWER_PAGES } from "./wave-kf-answer-pages";
import { WAVE_KG_ANSWER_PAGES } from "./wave-kg-answer-pages";
import { WAVE_KH_ANSWER_PAGES } from "./wave-kh-answer-pages";
import { WAVE_KL_ANSWER_PAGES } from "./wave-kl-answer-pages";
import { WAVE_KM_ANSWER_PAGES } from "./wave-km-answer-pages";
import { WAVE_KN_ANSWER_PAGES } from "./wave-kn-answer-pages";
import { WAVE_KO_ANSWER_PAGES } from "./wave-ko-answer-pages";
import { WAVE_KP_ANSWER_PAGES } from "./wave-kp-answer-pages";
import { WAVE_KQ_ANSWER_PAGES } from "./wave-kq-answer-pages";
import { WAVE_KR_ANSWER_PAGES } from "./wave-kr-answer-pages";
import { WAVE_KS_B71_ANSWER_PAGES } from "./wave-ks-b71-answer-pages";
import { WAVE_KT_B71_ANSWER_PAGES } from "./wave-kt-b71-answer-pages";
import { WAVE_KU_B71_ANSWER_PAGES } from "./wave-ku-b71-answer-pages";
import { WAVE_KV_B71_ANSWER_PAGES } from "./wave-kv-b71-answer-pages";
import { WAVE_KW_B71_ANSWER_PAGES } from "./wave-kw-b71-answer-pages";
import { WAVE_KX_B71_ANSWER_PAGES } from "./wave-kx-b71-answer-pages";
import { WAVE_KY_B71_ANSWER_PAGES } from "./wave-ky-b71-answer-pages";
import { WAVE_LA_ANSWER_PAGES } from "./wave-la-answer-pages";
import { WAVE_LB_ANSWER_PAGES } from "./wave-lb-answer-pages";
import { WAVE_LC_ANSWER_PAGES } from "./wave-lc-answer-pages";
import { WAVE_LD_ANSWER_PAGES } from "./wave-ld-answer-pages";
import { WAVE_LE_ANSWER_PAGES } from "./wave-le-answer-pages";
import { WAVE_LF_ANSWER_PAGES } from "./wave-lf-answer-pages";
import { WAVE_LG_ANSWER_PAGES } from "./wave-lg-answer-pages";
import { WAVE_LN_ANSWER_PAGES } from "./wave-ln-answer-pages";
import { WAVE_LH_ANSWER_PAGES } from "./wave-lh-answer-pages";
import { WAVE_LI_ANSWER_PAGES } from "./wave-li-answer-pages";
import { WAVE_LJ_ANSWER_PAGES } from "./wave-lj-answer-pages";
import { WAVE_LK_ANSWER_PAGES } from "./wave-lk-answer-pages";
import { WAVE_LL_ANSWER_PAGES } from "./wave-ll-answer-pages";
import { WAVE_LM_ANSWER_PAGES } from "./wave-lm-answer-pages";
import { WAVE_L_ANSWER_PAGES } from "./wave-l-answer-pages";
import { WAVE_M_ANSWER_PAGES } from "./wave-m-answer-pages";
import { WAVE_N_ANSWER_PAGES } from "./wave-n-answer-pages";
import { WAVE_O_ANSWER_PAGES } from "./wave-o-answer-pages";
import { WAVE_P_ANSWER_PAGES } from "./wave-p-answer-pages";
import { WAVE_Q_ANSWER_PAGES } from "./wave-q-answer-pages";
import { WAVE_R_ANSWER_PAGES } from "./wave-r-answer-pages";
import { WAVE_S_ANSWER_PAGES } from "./wave-s-answer-pages";
import { WAVE_T_ANSWER_PAGES } from "./wave-t-answer-pages";
import { WAVE_U_ANSWER_PAGES } from "./wave-u-answer-pages";
import { WAVE_V_ANSWER_PAGES } from "./wave-v-answer-pages";
import { WAVE_W_ANSWER_PAGES } from "./wave-w-answer-pages";
import { WAVE_X_ANSWER_PAGES } from "./wave-x-answer-pages";
import { WAVE_Y_ANSWER_PAGES } from "./wave-y-answer-pages";
import { WAVE_Z_ANSWER_PAGES } from "./wave-z-answer-pages";
import { WAVE_AA_ANSWER_PAGES } from "./wave-aa-answer-pages";
import { WAVE_AB_ANSWER_PAGES } from "./wave-ab-answer-pages";
import { WAVE_AC_ANSWER_PAGES } from "./wave-ac-answer-pages";
import { WAVE_AD_ANSWER_PAGES } from "./wave-ad-answer-pages";
import { WAVE_AE_ANSWER_PAGES } from "./wave-ae-answer-pages";
import { WAVE_AF_ANSWER_PAGES } from "./wave-af-answer-pages";
import { WAVE_AG_ANSWER_PAGES } from "./wave-ag-answer-pages";
import { WAVE_AH_ANSWER_PAGES } from "./wave-ah-answer-pages";
import { WAVE_AI_ANSWER_PAGES } from "./wave-ai-answer-pages";
import { WAVE_AJ_ANSWER_PAGES } from "./wave-aj-answer-pages";
import { WAVE_AK_ANSWER_PAGES } from "./wave-ak-answer-pages";
import { WAVE_AL_ANSWER_PAGES } from "./wave-al-answer-pages";
import { WAVE_AM_ANSWER_PAGES } from "./wave-am-answer-pages";
import { WAVE_AN_ANSWER_PAGES } from "./wave-an-answer-pages";
import { WAVE_AO_ANSWER_PAGES } from "./wave-ao-answer-pages";
import { WAVE_AP_ANSWER_PAGES } from "./wave-ap-answer-pages";
import { WAVE_AQ_ANSWER_PAGES } from "./wave-aq-answer-pages";
import { WAVE_AR_ANSWER_PAGES } from "./wave-ar-answer-pages";
import { WAVE_AS_ANSWER_PAGES } from "./wave-as-answer-pages";
import { WAVE_AT_ANSWER_PAGES } from "./wave-at-answer-pages";
import { WAVE_AU_ANSWER_PAGES } from "./wave-au-answer-pages";
import { WAVE_AV_ANSWER_PAGES } from "./wave-av-answer-pages";
import { WAVE_AW_ANSWER_PAGES } from "./wave-aw-answer-pages";
import { WAVE_AX_ANSWER_PAGES } from "./wave-ax-answer-pages";
import { WAVE_AY_ANSWER_PAGES } from "./wave-ay-answer-pages";
import { WAVE_AZ_ANSWER_PAGES } from "./wave-az-answer-pages";
import { WAVE_BA_ANSWER_PAGES } from "./wave-ba-answer-pages";
import { WAVE_BB_ANSWER_PAGES } from "./wave-bb-answer-pages";
import { WAVE_BC_ANSWER_PAGES } from "./wave-bc-answer-pages";
import { WAVE_BD_ANSWER_PAGES } from "./wave-bd-answer-pages";
import { WAVE_BE_ANSWER_PAGES } from "./wave-be-answer-pages";
import { WAVE_BF_ANSWER_PAGES } from "./wave-bf-answer-pages";
import { WAVE_BG_ANSWER_PAGES } from "./wave-bg-answer-pages";
import { WAVE_BH_ANSWER_PAGES } from "./wave-bh-answer-pages";
import { WAVE_BI_ANSWER_PAGES } from "./wave-bi-answer-pages";
import { WAVE_BJ_ANSWER_PAGES } from "./wave-bj-answer-pages";
import { WAVE_BK_ANSWER_PAGES } from "./wave-bk-answer-pages";
import { WAVE_BL_ANSWER_PAGES } from "./wave-bl-answer-pages";
import { WAVE_BM_ANSWER_PAGES } from "./wave-bm-answer-pages";
import { WAVE_BN_ANSWER_PAGES } from "./wave-bn-answer-pages";
import { WAVE_BO_ANSWER_PAGES } from "./wave-bo-answer-pages";
import { WAVE_BP_ANSWER_PAGES } from "./wave-bp-answer-pages";
import { WAVE_BQ_ANSWER_PAGES } from "./wave-bq-answer-pages";
import { WAVE_BR_ANSWER_PAGES } from "./wave-br-answer-pages";
import { WAVE_BS_ANSWER_PAGES } from "./wave-bs-answer-pages";
import { WAVE_BT_ANSWER_PAGES } from "./wave-bt-answer-pages";
import { WAVE_BU_ANSWER_PAGES } from "./wave-bu-answer-pages";
import { WAVE_BV_ANSWER_PAGES } from "./wave-bv-answer-pages";
import { WAVE_BW_ANSWER_PAGES } from "./wave-bw-answer-pages";
import { WAVE_BX_ANSWER_PAGES } from "./wave-bx-answer-pages";
import { WAVE_BY_ANSWER_PAGES } from "./wave-by-answer-pages";
import { WAVE_BZ_ANSWER_PAGES } from "./wave-bz-answer-pages";
import { WAVE_CA_ANSWER_PAGES } from "./wave-ca-answer-pages";
import { WAVE_CB_ANSWER_PAGES } from "./wave-cb-answer-pages";
import { WAVE_CC_ANSWER_PAGES } from "./wave-cc-answer-pages";
import { WAVE_CD_ANSWER_PAGES } from "./wave-cd-answer-pages";
import { WAVE_CE_ANSWER_PAGES } from "./wave-ce-answer-pages";
import { WAVE_CF_ANSWER_PAGES } from "./wave-cf-answer-pages";
import { WAVE_CG_ANSWER_PAGES } from "./wave-cg-answer-pages";
import { WAVE_CH_ANSWER_PAGES } from "./wave-ch-answer-pages";
import { WAVE_CI_ANSWER_PAGES } from "./wave-ci-answer-pages";
import { WAVE_CJ_ANSWER_PAGES } from "./wave-cj-answer-pages";
import { WAVE_CK_ANSWER_PAGES } from "./wave-ck-answer-pages";
import { WAVE_CL_ANSWER_PAGES } from "./wave-cl-answer-pages";
import { WAVE_CM_ANSWER_PAGES } from "./wave-cm-answer-pages";
import { WAVE_CN_ANSWER_PAGES } from "./wave-cn-answer-pages";
import { WAVE_CO_ANSWER_PAGES } from "./wave-co-answer-pages";
import { WAVE_CP_ANSWER_PAGES } from "./wave-cp-answer-pages";
import { WAVE_CQ_ANSWER_PAGES } from "./wave-cq-answer-pages";
import { WAVE_CR_ANSWER_PAGES } from "./wave-cr-answer-pages";
import { WAVE_CS_ANSWER_PAGES } from "./wave-cs-answer-pages";
import { WAVE_CT_ANSWER_PAGES } from "./wave-ct-answer-pages";
import { WAVE_CU_ANSWER_PAGES } from "./wave-cu-answer-pages";
import { WAVE_CV_ANSWER_PAGES } from "./wave-cv-answer-pages";
import { WAVE_CW_ANSWER_PAGES } from "./wave-cw-answer-pages";
import { WAVE_CX_ANSWER_PAGES } from "./wave-cx-answer-pages";
import { WAVE_CY_ANSWER_PAGES } from "./wave-cy-answer-pages";
import { WAVE_CZ_ANSWER_PAGES } from "./wave-cz-answer-pages";
import { WAVE_DA_ANSWER_PAGES } from "./wave-da-answer-pages";
import { WAVE_DB_ANSWER_PAGES } from "./wave-db-answer-pages";
import { WAVE_DC_ANSWER_PAGES } from "./wave-dc-answer-pages";
import { WAVE_DD_ANSWER_PAGES } from "./wave-dd-answer-pages";
import { WAVE_DE_ANSWER_PAGES } from "./wave-de-answer-pages";
import { WAVE_DF_ANSWER_PAGES } from "./wave-df-answer-pages";
import { WAVE_DG_ANSWER_PAGES } from "./wave-dg-answer-pages";
import { WAVE_DH_ANSWER_PAGES } from "./wave-dh-answer-pages";
import { WAVE_DI_ANSWER_PAGES } from "./wave-di-answer-pages";
import { WAVE_DJ_ANSWER_PAGES } from "./wave-dj-answer-pages";
import { WAVE_DK_ANSWER_PAGES } from "./wave-dk-answer-pages";
import { WAVE_DL_ANSWER_PAGES } from "./wave-dl-answer-pages";
import { WAVE_DM_ANSWER_PAGES } from "./wave-dm-answer-pages";
import { WAVE_DN_ANSWER_PAGES } from "./wave-dn-answer-pages";
import { WAVE_DO_ANSWER_PAGES } from "./wave-do-answer-pages";
import { WAVE_DP_ANSWER_PAGES } from "./wave-dp-answer-pages";
import { WAVE_DQ_ANSWER_PAGES } from "./wave-dq-answer-pages";
import { WAVE_DR_ANSWER_PAGES } from "./wave-dr-answer-pages";
import { WAVE_DS_ANSWER_PAGES } from "./wave-ds-answer-pages";
import { WAVE_DT_ANSWER_PAGES } from "./wave-dt-answer-pages";
import { WAVE_DU_ANSWER_PAGES } from "./wave-du-answer-pages";
import { WAVE_DV_ANSWER_PAGES } from "./wave-dv-answer-pages";
import { WAVE_DW_ANSWER_PAGES } from "./wave-dw-answer-pages";
import { WAVE_DX_ANSWER_PAGES } from "./wave-dx-answer-pages";
import { WAVE_DY_ANSWER_PAGES } from "./wave-dy-answer-pages";
import { WAVE_DZ_ANSWER_PAGES } from "./wave-dz-answer-pages";
import { WAVE_EA_ANSWER_PAGES } from "./wave-ea-answer-pages";
import { WAVE_EB_ANSWER_PAGES } from "./wave-eb-answer-pages";
import { WAVE_EC_ANSWER_PAGES } from "./wave-ec-answer-pages";
import { WAVE_ED_ANSWER_PAGES } from "./wave-ed-answer-pages";
import { WAVE_EE_ANSWER_PAGES } from "./wave-ee-answer-pages";
import { WAVE_EF_ANSWER_PAGES } from "./wave-ef-answer-pages";
import { WAVE_EG_ANSWER_PAGES } from "./wave-eg-answer-pages";
import { WAVE_EH_ANSWER_PAGES } from "./wave-eh-answer-pages";
import { WAVE_EI_ANSWER_PAGES } from "./wave-ei-answer-pages";
import { WAVE_EJ_ANSWER_PAGES } from "./wave-ej-answer-pages";
import { WAVE_EK_ANSWER_PAGES } from "./wave-ek-answer-pages";
import { WAVE_EL_ANSWER_PAGES } from "./wave-el-answer-pages";
import { WAVE_EM_ANSWER_PAGES } from "./wave-em-answer-pages";
import { WAVE_EN_ANSWER_PAGES } from "./wave-en-answer-pages";
import { WAVE_EO_ANSWER_PAGES } from "./wave-eo-answer-pages";
import { WAVE_EP_ANSWER_PAGES } from "./wave-ep-answer-pages";
import { WAVE_EQ_ANSWER_PAGES } from "./wave-eq-answer-pages";
import { WAVE_ER_ANSWER_PAGES } from "./wave-er-answer-pages";
import { WAVE_ES_ANSWER_PAGES } from "./wave-es-answer-pages";
import { WAVE_ET_ANSWER_PAGES } from "./wave-et-answer-pages";
import { WAVE_EU_ANSWER_PAGES } from "./wave-eu-answer-pages";
import { WAVE_EV_ANSWER_PAGES } from "./wave-ev-answer-pages";
import { WAVE_EW_ANSWER_PAGES } from "./wave-ew-answer-pages";
import { WAVE_EX_ANSWER_PAGES } from "./wave-ex-answer-pages";
import { WAVE_EY_ANSWER_PAGES } from "./wave-ey-answer-pages";
import { WAVE_EZ_ANSWER_PAGES } from "./wave-ez-answer-pages";
import { WAVE_FA_ANSWER_PAGES } from "./wave-fa-answer-pages";
import { WAVE_FB_ANSWER_PAGES } from "./wave-fb-answer-pages";
import { WAVE_FC_ANSWER_PAGES } from "./wave-fc-answer-pages";
import { WAVE_FD_ANSWER_PAGES } from "./wave-fd-answer-pages";
import { WAVE_FE_ANSWER_PAGES } from "./wave-fe-answer-pages";
import { WAVE_FG_ANSWER_PAGES } from "./wave-fg-answer-pages";
import { WAVE_FH_ANSWER_PAGES } from "./wave-fh-answer-pages";
import { WAVE_FI_ANSWER_PAGES } from "./wave-fi-answer-pages";
import { WAVE_FJ_ANSWER_PAGES } from "./wave-fj-answer-pages";
import { WAVE_FK_ANSWER_PAGES } from "./wave-fk-answer-pages";
import { WAVE_FL_ANSWER_PAGES } from "./wave-fl-answer-pages";
import { WAVE_FM_ANSWER_PAGES } from "./wave-fm-answer-pages";
import { WAVE_FN_ANSWER_PAGES } from "./wave-fn-answer-pages";
import { WAVE_FO_ANSWER_PAGES } from "./wave-fo-answer-pages";
import { WAVE_FP_ANSWER_PAGES } from "./wave-fp-answer-pages";
import { WAVE_FQ_ANSWER_PAGES } from "./wave-fq-answer-pages";
import { WAVE_FR_ANSWER_PAGES } from "./wave-fr-answer-pages";
import { WAVE_FS_ANSWER_PAGES } from "./wave-fs-answer-pages";
import { WAVE_FT_ANSWER_PAGES } from "./wave-ft-answer-pages";
import { WAVE_FU_ANSWER_PAGES } from "./wave-fu-answer-pages";
import { WAVE_FV_ANSWER_PAGES } from "./wave-fv-answer-pages";
import { WAVE_FW_ANSWER_PAGES } from "./wave-fw-answer-pages";
import { WAVE_FX_ANSWER_PAGES } from "./wave-fx-answer-pages";
import { WAVE_FY_ANSWER_PAGES } from "./wave-fy-answer-pages";
import { WAVE_FZ_ANSWER_PAGES } from "./wave-fz-answer-pages";
import { WAVE_GA_ANSWER_PAGES } from "./wave-ga-answer-pages";
import { WAVE_GB_ANSWER_PAGES } from "./wave-gb-answer-pages";
import { WAVE_GC_ANSWER_PAGES } from "./wave-gc-answer-pages";
import { WAVE_GD_ANSWER_PAGES } from "./wave-gd-answer-pages";
import { WAVE_GE_ANSWER_PAGES } from "./wave-ge-answer-pages";
import { WAVE_GF_ANSWER_PAGES } from "./wave-gf-answer-pages";
import { WAVE_GG_ANSWER_PAGES } from "./wave-gg-answer-pages";
import { WAVE_GH_ANSWER_PAGES } from "./wave-gh-answer-pages";
import { WAVE_GI_ANSWER_PAGES } from "./wave-gi-answer-pages";
import { WAVE_GJ_ANSWER_PAGES } from "./wave-gj-answer-pages";
import { WAVE_GK_ANSWER_PAGES } from "./wave-gk-answer-pages";
import { WAVE_GL_ANSWER_PAGES } from "./wave-gl-answer-pages";
import { WAVE_GM_ANSWER_PAGES } from "./wave-gm-answer-pages";
import { WAVE_GN_ANSWER_PAGES } from "./wave-gn-answer-pages";
import { WAVE_GO_ANSWER_PAGES } from "./wave-go-answer-pages";
import { WAVE_GP_ANSWER_PAGES } from "./wave-gp-answer-pages";
import { WAVE_GQ_ANSWER_PAGES } from "./wave-gq-answer-pages";
import { WAVE_GR_ANSWER_PAGES } from "./wave-gr-answer-pages";
import { WAVE_GS_ANSWER_PAGES } from "./wave-gs-answer-pages";
import { WAVE_GT_ANSWER_PAGES } from "./wave-gt-answer-pages";
import { WAVE_GU_ANSWER_PAGES } from "./wave-gu-answer-pages";
import { WAVE_GV_ANSWER_PAGES } from "./wave-gv-answer-pages";
import { WAVE_GW_ANSWER_PAGES } from "./wave-gw-answer-pages";
import { WAVE_GX_ANSWER_PAGES } from "./wave-gx-answer-pages";
import { WAVE_GY_ANSWER_PAGES } from "./wave-gy-answer-pages";
import { WAVE_GZ_ANSWER_PAGES } from "./wave-gz-answer-pages";
import { WAVE_HA_ANSWER_PAGES } from "./wave-ha-answer-pages";
import { WAVE_HB_ANSWER_PAGES } from "./wave-hb-answer-pages";
import { WAVE_HC_ANSWER_PAGES } from "./wave-hc-answer-pages";
import { WAVE_HD_ANSWER_PAGES } from "./wave-hd-answer-pages";
import { WAVE_HE_ANSWER_PAGES } from "./wave-he-answer-pages";
import { WAVE_HF_ANSWER_PAGES } from "./wave-hf-answer-pages";
import { WAVE_HG_ANSWER_PAGES } from "./wave-hg-answer-pages";
import { WAVE_HH_ANSWER_PAGES } from "./wave-hh-answer-pages";
import { WAVE_HI_ANSWER_PAGES } from "./wave-hi-answer-pages";
import { WAVE_HJ_ANSWER_PAGES } from "./wave-hj-answer-pages";
import { WAVE_HK_ANSWER_PAGES } from "./wave-hk-answer-pages";
import { WAVE_HL_ANSWER_PAGES } from "./wave-hl-answer-pages";
import { WAVE_HM_ANSWER_PAGES } from "./wave-hm-answer-pages";
import { WAVE_HN_ANSWER_PAGES } from "./wave-hn-answer-pages";
import { WAVE_HO_ANSWER_PAGES } from "./wave-ho-answer-pages";
import { WAVE_HP_ANSWER_PAGES } from "./wave-hp-answer-pages";
import { WAVE_HQ_ANSWER_PAGES } from "./wave-hq-answer-pages";
import { WAVE_HR_ANSWER_PAGES } from "./wave-hr-answer-pages";
import { WAVE_HS_ANSWER_PAGES } from "./wave-hs-answer-pages";
import { WAVE_HT_ANSWER_PAGES } from "./wave-ht-answer-pages";
import { WAVE_HU_ANSWER_PAGES } from "./wave-hu-answer-pages";
import { WAVE_HV_ANSWER_PAGES } from "./wave-hv-answer-pages";
import { WAVE_HW_ANSWER_PAGES } from "./wave-hw-answer-pages";
import { WAVE_HX_ANSWER_PAGES } from "./wave-hx-answer-pages";
import { WAVE_HY_ANSWER_PAGES } from "./wave-hy-answer-pages";
import { WAVE_HZ_ANSWER_PAGES } from "./wave-hz-answer-pages";
import { WAVE_IA_ANSWER_PAGES } from "./wave-ia-answer-pages";
import { WAVE_IB_ANSWER_PAGES } from "./wave-ib-answer-pages";
import { WAVE_IC_ANSWER_PAGES } from "./wave-ic-answer-pages";
import { WAVE_ID_ANSWER_PAGES } from "./wave-id-answer-pages";
import { WAVE_IE_ANSWER_PAGES } from "./wave-ie-answer-pages";
import { WAVE_IF_ANSWER_PAGES } from "./wave-if-answer-pages";
import { WAVE_IG_ANSWER_PAGES } from "./wave-ig-answer-pages";
import { WAVE_IH_ANSWER_PAGES } from "./wave-ih-answer-pages";
import { WAVE_II_ANSWER_PAGES } from "./wave-ii-answer-pages";
import { WAVE_IJ_ANSWER_PAGES } from "./wave-ij-answer-pages";
import { WAVE_IK_ANSWER_PAGES } from "./wave-ik-answer-pages";
import { WAVE_IL_ANSWER_PAGES } from "./wave-il-answer-pages";
import { WAVE_IM_ANSWER_PAGES } from "./wave-im-answer-pages";
import { WAVE_IN_ANSWER_PAGES } from "./wave-in-answer-pages";
import { WAVE_IO_ANSWER_PAGES } from "./wave-io-answer-pages";
import { WAVE_IP_ANSWER_PAGES } from "./wave-ip-answer-pages";
import { WAVE_IQ_ANSWER_PAGES } from "./wave-iq-answer-pages";
import { WAVE_IR_ANSWER_PAGES } from "./wave-ir-answer-pages";
import { WAVE_IS_ANSWER_PAGES } from "./wave-is-answer-pages";
import { WAVE_IT_ANSWER_PAGES } from "./wave-it-answer-pages";
import { WAVE_IU_ANSWER_PAGES } from "./wave-iu-answer-pages";
import { WAVE_IV_ANSWER_PAGES } from "./wave-iv-answer-pages";
import { WAVE_IW_ANSWER_PAGES } from "./wave-iw-answer-pages";
import { WAVE_IX_ANSWER_PAGES } from "./wave-ix-answer-pages";
import { WAVE_IY_ANSWER_PAGES } from "./wave-iy-answer-pages";
import { WAVE_IZ_ANSWER_PAGES } from "./wave-iz-answer-pages";
import { WAVE_JA_ANSWER_PAGES } from "./wave-ja-answer-pages";
import { WAVE_JB_ANSWER_PAGES } from "./wave-jb-answer-pages";
import { WAVE_JC_ANSWER_PAGES } from "./wave-jc-answer-pages";
import { WAVE_JD_ANSWER_PAGES } from "./wave-jd-answer-pages";
import { WAVE_JE_ANSWER_PAGES } from "./wave-je-answer-pages";
import { WAVE_JF_ANSWER_PAGES } from "./wave-jf-answer-pages";
import { WAVE_JG_ANSWER_PAGES } from "./wave-jg-answer-pages";
import { WAVE_JH_ANSWER_PAGES } from "./wave-jh-answer-pages";
import { WAVE_JI_ANSWER_PAGES } from "./wave-ji-answer-pages";
import { WAVE_JJ_ANSWER_PAGES } from "./wave-jj-answer-pages";
import { WAVE_JK_ANSWER_PAGES } from "./wave-jk-answer-pages";
import { WAVE_JL_ANSWER_PAGES } from "./wave-jl-answer-pages";
import { WAVE_JM_ANSWER_PAGES } from "./wave-jm-answer-pages";
import { WAVE_JN_ANSWER_PAGES } from "./wave-jn-answer-pages";
import { WAVE_JO_ANSWER_PAGES } from "./wave-jo-answer-pages";
import { WAVE_JP_ANSWER_PAGES } from "./wave-jp-answer-pages";
import { WAVE_JQ_ANSWER_PAGES } from "./wave-jq-answer-pages";
import { WAVE_JR_ANSWER_PAGES } from "./wave-jr-answer-pages";
import { WAVE_KS_ANSWER_PAGES } from "./wave-ks-answer-pages";
import { WAVE_KT_ANSWER_PAGES } from "./wave-kt-answer-pages";
import { WAVE_KU_ANSWER_PAGES } from "./wave-ku-answer-pages";
import { WAVE_KV_ANSWER_PAGES } from "./wave-kv-answer-pages";
import { WAVE_KW_ANSWER_PAGES } from "./wave-kw-answer-pages";
import { WAVE_KX_ANSWER_PAGES } from "./wave-kx-answer-pages";
import { WAVE_KY_ANSWER_PAGES } from "./wave-ky-answer-pages";
import { WAVE_KZ_ANSWER_PAGES } from "./wave-kz-answer-pages";
import type { QueryMatrixPage } from "./query-matrix-types";
import { WAVE_QM_TIER1_A } from "./wave-qm-tier1-a";
import { WAVE_QM_TIER1_B } from "./wave-qm-tier1-b";
import { WAVE_QM_TIER1_C } from "./wave-qm-tier1-c";
import { WAVE_QM_TIER1_D } from "./wave-qm-tier1-d";
import { WAVE_QM_TIER1_E } from "./wave-qm-tier1-e";

const PHASE7_AEO_PAGES: Phase7AeoSeed[] = [
  ...PHASE7_COST_PAGES,
  ...PHASE7_TIMELINE_PAGES,
  ...PHASE7_HIRING_PAGES,
  ...PHASE7_LICENSING_PAGES,
  ...PHASE7_PERMIT_PAGES,
  ...PHASE7_TECHNICAL_PAGES,
];
const PHASE7_CLUSTER_COUNTS: Record<Phase7Cluster, number> = {
  "Cost and pricing": 20,
  "Project timelines": 18,
  "Hiring and vetting": 16,
  "PE licensing": 16,
  "Plan check and permits": 14,
  "Technical explainers": 17,
};

const PROMOTED_CITY_KEYS = new Set([
  "georgia/atlanta", "texas/austin", "north-carolina/charlotte",
  "illinois/chicago", "texas/dallas", "colorado/denver",
  "texas/houston", "california/los-angeles", "arizona/phoenix",
  "florida/orlando",
]);
const STANDARD_CITY_SERVICE_SLUGS = new Set([
  "mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance",
]);
/** Preserve the curated city/service canonical when an older specialty record
 * claims the exact same route. Distinct specialty slugs remain untouched. */
const LOCATION_SERVICE_PAGES = RAW_LOCATION_SERVICE_PAGES.filter((page) =>
  !(PROMOTED_CITY_KEYS.has(`${page.stateSlug}/${page.citySlug}`) && STANDARD_CITY_SERVICE_SLUGS.has(page.serviceSlug)),
);

const RETAINED_INTENT_SLUGS = new Set([
  "structural-engineering-letters", "construction-rfi-submittal-support",
  "value-engineering-design-optimization",
  "deferred-submittal-engineering", "engineer-of-record-transition", "engineering-near-me",
  ...NATIONAL_FACILITY_INTENT_PAGES.map((page) => page.slug),
]);
const ALL_ENGINEERING_INTENT_PAGES = [...ENGINEERING_INTENT_PAGES, ...NATIONAL_FACILITY_INTENT_PAGES, NEAR_ME_ENGINEERING_PAGE]
  .filter((page) => RETAINED_INTENT_SLUGS.has(page.slug));
const CONSOLIDATED_INTENT_PAGES = ENGINEERING_INTENT_PAGES.filter((page) => !RETAINED_INTENT_SLUGS.has(page.slug));

type CityDirectory = Record<string, DirectoryCity[]>; // stateSlug -> cities

function loadDirectory(): CityDirectory {
  const p = path.join(__dirname, "cities-directory.json");
  if (!fs.existsSync(p)) return {};
  const directory = JSON.parse(fs.readFileSync(p, "utf8")) as CityDirectory;
  for (const { stateSlug, city } of RETAINED_LEGACY_LOCATIONS) {
    const entries = directory[stateSlug] ?? [];
    if (!entries.some((entry) => entry.slug === city.slug)) entries.push(city);
    directory[stateSlug] = entries;
  }
  return directory;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR
  ? path.resolve(__dirname, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(__dirname, "../public");
const OUT = path.join(PUBLIC, "locations");
const METROS_OUT = path.join(PUBLIC, "metros");

/** States where Apex Grid is NOT licensed — no pages are generated for these
 * (the site publishes its reviewed licensing coverage; claiming licensed services in an
 * unlicensed state would be a misrepresentation). */
const UNLICENSED_STATES = new Set(["alaska"]);

async function loadStates(): Promise<StateData[]> {
  const dir = path.join(__dirname, "states");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !UNLICENSED_STATES.has(f.replace(/\.ts$/, "")));
  const states: StateData[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    const val = Object.values(mod)[0] as StateData;
    states.push(val);
  }
  return states.sort((a, b) => a.name.localeCompare(b.name));
}

async function loadCities(): Promise<CityData[]> {
  const dir = path.join(__dirname, "cities");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
  const cities: CityData[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    const val = Object.values(mod)[0] as CityData;
    cities.push(val);
  }
  // The abbreviated St. Louis dataset is historical source material only;
  // its old URLs are emitted as redirects to the normalized city tree.
  return cities
    .filter((city) => !(city.stateSlug === "missouri" && city.slug === "st-louis"))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function isReviewedCity(city: CityData): boolean {
  if (!city.research) return LEGACY_CURATED_CITY_KEYS.has(`${city.stateSlug}/${city.slug}`);
  const sourceGroups = Object.values(city.research.sources);
  return city.research.reviewStatus === "approved"
    && /^\d{4}-\d{2}-\d{2}$/.test(city.research.lastVerified)
    && city.research.reviewedBy.trim().length > 0
    && city.research.priority.commercialOpportunity >= 0
    && city.research.priority.commercialOpportunity <= 100
    && sourceGroups.every((urls) => urls.length > 0 && urls.every((url) => /^https:\/\//.test(url)));
}

function isSupportedCityService(city: CityData, serviceSlug: string): boolean {
  if (!isReviewedCity(city)) return false;
  const supported = city.research?.supportedServiceSlugs;
  return !city.research
    || !supported
    || supported.includes(serviceSlug as NonNullable<CityData["research"]["supportedServiceSlugs"]>[number])
    || (serviceSlug === "energy-code-compliance" && supported.includes("energy-compliance"));
}
function assertCityResearch(city: CityData): void {
  if (!city.research && !LEGACY_CURATED_CITY_KEYS.has(`${city.stateSlug}/${city.slug}`)) {
    throw new Error(`New city is missing required research evidence: ${city.stateSlug}/${city.slug}`);
  }
  if (city.research && !isReviewedCity(city) && city.research.reviewStatus === "approved") {
    throw new Error(`Approved city has incomplete research evidence: ${city.stateSlug}/${city.slug}`);
  }
  if (city.research) {
    const priority = CITY_PRIORITIES.find((entry) => entry.stateSlug === city.stateSlug && entry.citySlug === city.slug);
    if (priority && (
      priority.commercialOpportunity !== city.research.priority.commercialOpportunity ||
      priority.searchConsoleImpressions !== city.research.priority.searchConsoleImpressions ||
      priority.searchConsolePeriod !== city.research.priority.searchConsolePeriod
    )) {
      throw new Error(`City priority evidence does not match research: ${city.stateSlug}/${city.slug}`);
    }
  }
}

function citySourceList(city: CityData): string {
  if (!city.research) return "";
  const labels: Record<keyof CityData["research"]["sources"], string> = {
    ahj: "Permit authority",
    codes: "Adopted codes",
    amendments: "Local amendments",
    utilities: "Utilities",
    climate: "Climate",
    market: "Market context",
  };
  return `<section class="block"><div class="container">
  <h2>Verified <em>Local Sources</em></h2>
  <p class="note">Reviewed ${esc(city.research.lastVerified)}. Code editions and local requirements can change; confirm the current requirements with the authority having jurisdiction before design.</p>
  <div class="linkrow">${Object.entries(city.research.sources).flatMap(([group, urls]) =>
    urls.map((url) => `<a href="${esc(url)}" rel="noopener noreferrer">${esc(labels[group as keyof typeof labels])}</a>`)
  ).join("")}</div>
</div></section>`;
}
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Slugs go into URLs/paths — restrict to safe charset. */
function assertSlug(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Invalid slug: ${slug}`);
}

function assertSlugPath(slugPath: string) {
  const segments = slugPath.split("/");
  if (segments.length === 0 || segments.some((s) => !/^[a-z0-9-]+$/.test(s)))
    throw new Error(`Invalid slug path: ${slugPath}`);
}

function validateDirectory(directory: CityDirectory, states: StateData[]): void {
  const knownStates = new Set(states.map((state) => state.slug));
  for (const [stateSlug, entries] of Object.entries(directory)) {
    if (!knownStates.has(stateSlug) && stateSlug !== "alaska") {
      throw new Error(`City directory references unknown state: ${stateSlug}`);
    }
    const seen = new Set<string>();
    for (const city of entries) {
      assertSlug(city.slug);
      if (!city.name.trim()) throw new Error(`City directory has an empty name in ${stateSlug}`);
      if (seen.has(city.slug)) throw new Error(`Duplicate city slug in ${stateSlug}: ${city.slug}`);
      seen.add(city.slug);
      if (city.pop !== undefined && (!Number.isFinite(city.pop) || city.pop < 0)) {
        throw new Error(`Invalid population for ${stateSlug}/${city.slug}`);
      }
      if (city.lat !== undefined && (!Number.isFinite(city.lat) || city.lat < -90 || city.lat > 90)) {
        throw new Error(`Invalid latitude for ${stateSlug}/${city.slug}`);
      }
      if (city.lng !== undefined && (!Number.isFinite(city.lng) || city.lng < -180 || city.lng > 180)) {
        throw new Error(`Invalid longitude for ${stateSlug}/${city.slug}`);
      }
    }
  }
}

function allDirectoryCitiesForState(state: StateData, directory: CityDirectory, curated: CityData[]): DirectoryCity[] {
  const bySlug = new Map<string, DirectoryCity>();
  for (const city of directory[state.slug] ?? []) bySlug.set(city.slug, city);
  for (const city of curated.filter((entry) => entry.stateSlug === state.slug)) {
    const existing = bySlug.get(city.slug);
    bySlug.set(city.slug, {
      ...existing,
      slug: city.slug,
      name: city.name,
      designation: existing?.designation ?? "City",
    });
  }
  // Saint Louis is the sole canonical spelling used by the location tree.
  // The historical "st-louis" paths are emitted as redirects below.
  if (state.slug === "missouri") bySlug.delete("st-louis");
  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Conservative gate for Census-directory pages: only publish pages with enough
 * independently useful identity data to avoid state-copy doorway pages. */
const LITE_CITY_MIN_POPULATION = 1;
type CityQualityDecision = {
  state: string;
  slug: string;
  name: string;
  status: "indexed" | "excluded";
  reasons: string[];
  populationStatus?: DirectoryCity["populationStatus"];
  populationYear?: number;
  populationSource?: string;
  populationEvidenceNote?: string;
};
function diagnosticSlug(name: string): string {
  return name.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-|-$/g, "");
}

function assessLiteCity(state: StateData, city: DirectoryCity): CityQualityDecision {
  const reasons: string[] = [];
  if (!city.name.trim() || !/\p{Letter}/u.test(city.name)) reasons.push("invalid-city-name");
  if (!/^[a-z0-9-]+$/.test(city.slug) || city.slug !== diagnosticSlug(city.name)) reasons.push("city-slug-identity-mismatch");
  if (!state.slug || !state.name.trim()) reasons.push("invalid-state-identity");
  if (city.populationStatus === "confirmed-zero") reasons.push("confirmed-zero-population");
  else if (city.populationStatus === "unavailable") reasons.push("population-unavailable");
  else if (!Number.isFinite(city.pop) || (city.pop ?? 0) < LITE_CITY_MIN_POPULATION) reasons.push(`review-signal-population-below-${LITE_CITY_MIN_POPULATION}`);
  return {
    state: state.slug,
    slug: city.slug,
    name: city.name,
    status: reasons.length ? "excluded" : "indexed",
    reasons,
    populationStatus: city.populationStatus,
    populationYear: city.populationYear,
    populationSource: city.populationSource,
    populationEvidenceNote: city.populationEvidenceNote,
  };
}

function eligibleDirectoryCities(state: StateData, directory: CityDirectory, curated: CityData[]): DirectoryCity[] {
  const curatedSlugs = new Set(curated.filter((c) => c.stateSlug === state.slug).map((c) => c.slug));
  return (directory[state.slug] ?? []).filter((city) =>
    !curatedSlugs.has(city.slug)
    && !(state.slug === "missouri" && city.slug === "st-louis")
    && assessLiteCity(state, city).status === "indexed"
  );
}

function writeCityQualityReport(states: StateData[], directory: CityDirectory, curated: CityData[]) {
  const decisions = states.flatMap((state) => (directory[state.slug] ?? [])
    .filter((city) => !curated.some((c) => c.stateSlug === state.slug && c.slug === city.slug))
    .map((city) => assessLiteCity(state, city)));
  const anomalies = decisions.filter((d) => d.status === "excluded");
  const reviewed = curated.filter((city) => city.research && isReviewedCity(city));
  const drafts = curated.filter((city) => city.research && !isReviewedCity(city));
  const indexedDirectoryCount = decisions.filter((decision) => decision.status === "indexed").length;
  const directoryNoindexCount = decisions.length - indexedDirectoryCount;
  const report = {
    reportVersion: 3,
    policy: `Approved CityData pages and Census-verified incorporated places with population at or above ${LITE_CITY_MIN_POPULATION.toLocaleString("en-US")} are indexable as consolidated city-intent hubs. Smaller or incomplete directory records remain live noindex,follow.`,
    reviewedPromotions: reviewed.map((city) => ({
      state: city.stateSlug,
      slug: city.slug,
      lastVerified: city.research!.lastVerified,
      sourceCount: Object.values(city.research!.sources).flat().length,
      checks: { unique: "pass", sources: "pass", canonical: "pass", internalLinks: "pass" },
    })),
    grandfatheredCuratedCount: curated.filter((city) =>
      !city.research && LEGACY_CURATED_CITY_KEYS.has(`${city.stateSlug}/${city.slug}`)
    ).length,
    priorityQueue: CITY_PRIORITIES,
    populationReviewSignal: `confirmed zero-population and unavailable-population records remain excluded; population is not proof of page quality`,
    indexedDirectoryCount,
    indexedCount: indexedDirectoryCount + curated.filter(isReviewedCity).length + RETAINED_LEGACY_LOCATIONS.filter((retained) =>
      !curated.some((city) => city.stateSlug === retained.stateSlug && city.slug === retained.city.slug)
    ).length,
    noindexCount: directoryNoindexCount + drafts.length,
    excludedCount: directoryNoindexCount + drafts.length,
    excludedReasons: anomalies.reduce<Record<string, number>>((counts, d) => {
      for (const reason of d.reasons) counts[reason] = (counts[reason] ?? 0) + 1;
      return counts;
    }, {}),
    anomalies,
  };
  const reportDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "city-page-quality.json"), `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

function writeLlmsTxt() {
  const content = `# Apex Grid Engineering

> Apex Grid Engineering is a professional engineering firm providing structural, MEP, civil, geotechnical, building-assessment, energy-compliance, and municipal plan-check support. The company also publishes information about architecture and construction delivery.

This file is a concise map of canonical public information. It does not imply local offices, guaranteed coverage, or that every listed service is available for every project; scope and jurisdiction requirements should be confirmed with Apex Grid.

## Licensing
- Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska.
- The responsible professional's current license, firm authorization, discipline, and project-jurisdiction requirements are confirmed before work begins.

## High-value sections
- Services: ${SITE}/services
- Commercial engineering search hub: ${SITE}/engineering-intent/engineering-near-me/
- Industries: ${SITE}/industries
- Resources: ${SITE}/resources/
- Glossary: ${SITE}/glossary/
- Service-area information: ${SITE}/locations/
- Census metro engineering guides: ${SITE}/metros/
- Architecture information: ${SITE}/architecture/
- General contracting information: ${SITE}/general-contracting/
- About: ${SITE}/about
- Contact: ${SITE}/contact
- HTML sitemap: ${SITE}/sitemap/
- XML sitemap index: ${SITE}/sitemap_index.xml
`;
  fs.writeFileSync(path.join(PUBLIC, "llms.txt"), content);
}

function legacyLocationRedirectPage(fromPath: string, toPath: string): string {
  const canonical = `${SITE}${toPath}`;
  const body = `<section class="hero"><div class="container">
  <p class="kicker">Location URL Updated</p>
  <h1>This Apex Grid Location Page Has Moved</h1>
  <p class="lede">The U.S. Census place name and URL were normalized. Continue to the current canonical Apex Grid service-area page.</p>
  <a class="cta" href="${esc(toPath)}" style="display:inline-block;margin-top:28px">Open Current Location Page</a>
</div></section>`;
  return htmlShell({
    title: "Location Page Moved | Apex Grid Engineering",
    description: "This Apex Grid location page has moved to its current canonical Census-normalized URL.",
    canonical,
    schemaJson: [{
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: canonical,
      name: "Apex Grid Engineering Location Page",
    }],
    extraHead: `<meta name="robots" content="noindex,follow" /><meta http-equiv="refresh" content="0;url=${esc(toPath)}" />`,
    body: `${body}<span hidden data-legacy-location="${esc(fromPath)}"></span>`,
  });
}

/**
 * A city alias is an alias for the complete location subtree, not only the
 * city landing URL. Expand the reviewed base manifest to service children so
 * old bookmarks receive a real server 301 instead of a duplicate HTML page.
 */
function expandedLegacyLocationRedirects(): Record<string, string> {
  return { ...LEGACY_LOCATION_REDIRECTS };
}

/** Non-HTML data fields must not contain markup. */
function assertNoMarkup(state: StateData) {
  const flat = JSON.stringify(state);
  if (/<\s*(script|iframe|img|svg|style)/i.test(flat)) {
    throw new Error(`State ${state.slug} contains disallowed markup`);
  }
}

function breadcrumb(items: { name: string; href?: string }[]): string {
  return `<nav class="breadcrumb container">${items
    .map((i) => (i.href ? `<a href="${esc(i.href)}">${esc(i.name)}</a>` : esc(i.name)))
    .join(`<span>/</span>`)}</nav>`;
}

function breadcrumbSchema(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.name,
      ...(i.href ? { item: `${SITE}${i.href}` } : {}),
    })),
  };
}

type AduRenderedSection = { heading: string; body: string; bullets?: string[] };
type AduRenderedPage = {
  kind: "state" | "city";
  citySlug?: string;
  cityName?: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: AduRenderedSection[];
  permitSteps: string[];
  timeline: string;
  faqs: Array<{ question: string; answer: string }>;
  internalLinks: Array<{ label: string; href: string }>;
  sources: string[];
};

const CALIFORNIA_ADU_CITY_RECORDS: Array<CaliforniaAduPage | CaliforniaAduStructuralPage> = [
  ...CALIFORNIA_ADU_CITY_PAGES,
  ...CALIFORNIA_ADU_STRUCTURAL_PAGES,
];
const CALIFORNIA_ADU_STATE_URL = "/services/california-adu-structural-engineering/";
const CALIFORNIA_ADU_CITY_URLS = CALIFORNIA_ADU_CITY_RECORDS.map((page) => {
  const citySlug = page.slug.replace(/-adu-structural-engineering$/, "");
  return `/locations/california/${citySlug}/adu-structural-engineering/`;
});
const PLAN_CHECK_CORRECTIONS_URL = PLAN_CHECK_CORRECTIONS_PAGE.path;

function normalizeCaliforniaAduPage(
  page: CaliforniaAduPage | CaliforniaAduStructuralPage,
): AduRenderedPage {
  if ("kind" in page) {
    const citySlug = page.kind === "city"
      ? page.slug.replace(/-adu-structural-engineering$/, "")
      : undefined;
    const sections: AduRenderedSection[] = [
      { heading: "Local permitting authority", body: page.authority.name },
      { heading: "How the permit process works", body: page.authority.process },
      { heading: "Code conditions", body: page.codeConditions },
      { heading: "Physical and existing-building constraints", body: page.physicalConstraints },
      ...page.sections,
    ];
    return {
      kind: page.kind,
      citySlug,
      cityName: citySlug ? page.h1.replace(/ ADU Structural Engineering$/, "") : undefined,
      title: page.title,
      description: page.description,
      h1: page.h1,
      kicker: page.kicker,
      lede: page.lede,
      sections,
      permitSteps: page.permitSteps,
      timeline: page.timelineGuidance,
      faqs: page.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
      internalLinks: page.internalLinks,
      sources: page.sources,
    };
  }

  const citySlug = page.slug.replace(/-adu-structural-engineering$/, "");
  return {
    kind: "city",
    citySlug,
    cityName: page.city,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: page.kicker,
    lede: page.lede,
    sections: [
      { heading: "Local permitting authority and context", body: page.sections.localContext },
      { heading: "Structural engineering scope", body: page.sections.structuralEngineering },
      { heading: "Permit path", body: page.sections.permitPath },
      { heading: "Project timeline", body: page.sections.timeline },
    ],
    permitSteps: page.permitSteps,
    timeline: `${page.timelineGuidance.statutoryWindow} ${page.timelineGuidance.totalDuration}`,
    faqs: page.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
    internalLinks: page.internalLinks,
    sources: [
      ...page.sources.state,
      ...page.sources.city,
      ...page.sources.localConditions,
    ],
  };
}

function californiaAduPage(page: AduRenderedPage): string {
  const url = page.kind === "state"
    ? CALIFORNIA_ADU_STATE_URL
    : `/locations/california/${page.citySlug}/adu-structural-engineering/`;
  const crumbs = page.kind === "state"
    ? [
      { name: "Home", href: "/" },
      { name: "Engineering Services", href: "/services" },
      { name: "California ADU Structural Engineering" },
    ]
    : [
      { name: "Home", href: "/" },
      { name: "Service Areas", href: "/locations/" },
      { name: "California", href: "/locations/california/" },
      { name: page.cityName ?? "California city", href: `/locations/california/${page.citySlug}/` },
      { name: "ADU Structural Engineering" },
    ];
  const cityLinks = page.kind === "state"
    ? CALIFORNIA_ADU_CITY_RECORDS.map((candidate, index) => {
      const normalized = normalizeCaliforniaAduPage(candidate);
      return {
        label: `${normalized.cityName ?? "California"} ADU structural engineering`,
        href: CALIFORNIA_ADU_CITY_URLS[index],
      };
    })
    : [];
  const relatedLinks = [
    ...page.internalLinks,
    { label: "California ADU structural engineering statewide", href: CALIFORNIA_ADU_STATE_URL },
    { label: "Plan-check corrections engineering support", href: PLAN_CHECK_CORRECTIONS_URL },
    ...(page.kind === "city" && page.citySlug
      ? [{ label: `All engineering services in ${page.cityName ?? page.citySlug}`, href: `/locations/california/${page.citySlug}/` }]
      : []),
    ...cityLinks,
  ].filter((link, index, links) => links.findIndex((candidate) => candidate.href === link.href) === index);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: "ADU structural engineering",
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: page.kind === "state"
      ? { "@type": "State", name: "California" }
      : { "@type": "City", name: page.cityName, containedInPlace: { "@type": "State", name: "California" } },
  };
  const sourceLinks = page.sources.map((source, index) => {
    let host = source;
    try {
      host = new URL(source).hostname.replace(/^www\./, "");
    } catch {
      // Source URLs are validated by the source modules; retain the URL as label if parsing fails.
    }
    return `<a href="${esc(source)}" rel="noopener noreferrer">Official source ${index + 1}: ${esc(host)}</a>`;
  }).join("");
  const body = `<main>
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(page.kicker)}</p><h1>${esc(page.h1)}</h1><p class="lede">${esc(page.lede)}</p></div></section>
${page.sections.map((section) => `<section class="block"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p>${section.bullets ? `<ul class="scope">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}</div></div></section>`).join("")}
<section class="block"><div class="container"><h2>ADU permit and engineering <em>process</em></h2><ol class="scope">${page.permitSteps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol><p class="note">${esc(page.timeline)}</p></div></section>
<section class="block"><div class="container faq"><h2>${esc(page.h1)} <em>FAQs</em></h2>${page.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></section>
<section class="block"><div class="container"><h2>Related <em>engineering resources</em></h2><div class="linkrow">${relatedLinks.map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join("")}</div></div></section>
<section class="block"><div class="container"><h2>Official <em>sources</em></h2><p class="note">These government and technical sources provide the regulatory and hazard context described on this page. The current local authority and adopted code edition control the project.</p><div class="linkrow">${sourceLinks}</div></div></section>
<section class="ctaband"><div class="container"><h2>Discuss Your California ADU Scope</h2><p>Send the address, jurisdiction, ADU type, architectural plans, existing-condition records, photographs, and schedule. Scope, licensure, site access, and engineer availability are confirmed before work begins.</p><a class="cta" href="/contact">Request a Project Review</a></div></section>
</main>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, serviceSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function planCheckCorrectionsPage(page: PlanCheckCorrectionsPage): string {
  const url = page.path;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Services", href: "/services" },
    { name: "Plan-Check Corrections Engineering" },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: "Plan-check corrections engineering",
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
  };
  const sourceLinks = page.sources.map((source) =>
    `<a href="${esc(source.url)}" rel="noopener noreferrer">${esc(source.name)}</a>`,
  ).join("");
  const body = `<main>
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(page.kicker)}</p><h1>${esc(page.h1)}</h1><p class="lede">${esc(page.lede)}</p></div></section>
${page.sections.map((section) => `<section class="block"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p>${section.bullets ? `<ul class="scope">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}</div></div></section>`).join("")}
<section class="block"><div class="container"><h2>Correction response <em>process</em></h2><ol class="scope">${page.process.map((step) => `<li><strong>Step ${step.number}: ${esc(step.heading)}.</strong> ${esc(step.body)}</li>`).join("")}</ol></div></section>
<section class="block"><div class="container"><h2>Scope <em>boundaries</em></h2><ul class="scope">${page.boundaries.map((boundary) => `<li>${esc(boundary)}</li>`).join("")}</ul></div></section>
<section class="block"><div class="container faq"><h2>Plan-check corrections <em>FAQs</em></h2>${page.faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary><div class="a">${esc(faq.a)}</div></details>`).join("")}</div></section>
<section class="block"><div class="container"><h2>Related <em>permit resources</em></h2><div class="linkrow">${page.internalLinks.map((link) => `<a href="${esc(link.href)}" title="${esc(link.context)}">${esc(link.label)}</a>`).join("")}</div></div></section>
<section class="block"><div class="container"><h2>Official <em>sources</em></h2><div class="grid2">${page.sources.map((source) => `<div class="card"><h3><a href="${esc(source.url)}" rel="noopener noreferrer">${esc(source.name)}</a></h3><p>${esc(source.relevance)}</p></div>`).join("")}</div></div></section>
<section class="ctaband"><div class="container"><h2>Send the correction record for review</h2><p>${esc(page.audience)} can send the complete notice, submitted set, calculations, permit number, jurisdiction, and current backgrounds. The authority retains approval responsibility.</p><a class="cta" href="/contact">Request a Project Review</a></div></section>
</main>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, serviceSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function assertIndexableFaqPage(html: string, faqs: Array<{ question: string; answer: string }>, label: string): void {
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length;
  const main = html.match(/<main>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const visibleWords = main
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as { ["@type"]?: string; mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }> });
  const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
  if (h1Count !== 1 || visibleWords < 700 || html.includes('name="robots" content="noindex') || !faqSchema
    || faqSchema.mainEntity?.length !== faqs.length
    || faqs.some((faq) => !faqSchema.mainEntity?.some((entry) => entry.name === faq.question && entry.acceptedAnswer.text === faq.answer))) {
    throw new Error(`SEO assertion failed: malformed indexable source page: ${label} (${visibleWords} visible words, ${h1Count} H1s)`);
  }
}

const PHASE0_UPDATED_DATE = "2026-09-15";
const PHASE0_EDITORIAL_AUTHOR = "Apex Grid Engineering";
const PHASE0_JEREMY_AUTHOR = "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";
const ALL_AEO_PAGES: Array<Phase0AeoPage | Phase7AeoSeed> = [...PHASE0_AEO_PAGES, ...PHASE7_AEO_PAGES, ...WAVE_D_ANSWER_PAGES, ...WAVE_E_ANSWER_PAGES, ...WAVE_F_ANSWER_PAGES, ...WAVE_G_ANSWER_PAGES, ...WAVE_H_ANSWER_PAGES, ...WAVE_I_ANSWER_PAGES, ...WAVE_J_ANSWER_PAGES, ...WAVE_K_ANSWER_PAGES, ...WAVE_L_ANSWER_PAGES, ...WAVE_M_ANSWER_PAGES, ...WAVE_N_ANSWER_PAGES, ...WAVE_O_ANSWER_PAGES, ...WAVE_P_ANSWER_PAGES, ...WAVE_Q_ANSWER_PAGES, ...WAVE_R_ANSWER_PAGES, ...WAVE_S_ANSWER_PAGES, ...WAVE_T_ANSWER_PAGES, ...WAVE_U_ANSWER_PAGES, ...WAVE_V_ANSWER_PAGES, ...WAVE_W_ANSWER_PAGES, ...WAVE_X_ANSWER_PAGES, ...WAVE_Y_ANSWER_PAGES, ...WAVE_Z_ANSWER_PAGES, ...WAVE_AA_ANSWER_PAGES, ...WAVE_AB_ANSWER_PAGES, ...WAVE_AC_ANSWER_PAGES, ...WAVE_AD_ANSWER_PAGES, ...WAVE_AE_ANSWER_PAGES, ...WAVE_AF_ANSWER_PAGES, ...WAVE_AG_ANSWER_PAGES, ...WAVE_AH_ANSWER_PAGES, ...WAVE_AI_ANSWER_PAGES, ...WAVE_AJ_ANSWER_PAGES, ...WAVE_AK_ANSWER_PAGES, ...WAVE_AL_ANSWER_PAGES, ...WAVE_AM_ANSWER_PAGES, ...WAVE_AN_ANSWER_PAGES, ...WAVE_AO_ANSWER_PAGES, ...WAVE_AP_ANSWER_PAGES, ...WAVE_AQ_ANSWER_PAGES, ...WAVE_AR_ANSWER_PAGES, ...WAVE_AS_ANSWER_PAGES, ...WAVE_AT_ANSWER_PAGES, ...WAVE_AU_ANSWER_PAGES, ...WAVE_AV_ANSWER_PAGES, ...WAVE_AW_ANSWER_PAGES, ...WAVE_AX_ANSWER_PAGES, ...WAVE_AY_ANSWER_PAGES, ...WAVE_AZ_ANSWER_PAGES, ...WAVE_BA_ANSWER_PAGES, ...WAVE_BB_ANSWER_PAGES, ...WAVE_BC_ANSWER_PAGES, ...WAVE_BD_ANSWER_PAGES, ...WAVE_BE_ANSWER_PAGES, ...WAVE_BF_ANSWER_PAGES, ...WAVE_BG_ANSWER_PAGES, ...WAVE_BH_ANSWER_PAGES, ...WAVE_BI_ANSWER_PAGES, ...WAVE_BJ_ANSWER_PAGES, ...WAVE_BK_ANSWER_PAGES, ...WAVE_BL_ANSWER_PAGES, ...WAVE_BM_ANSWER_PAGES, ...WAVE_BN_ANSWER_PAGES, ...WAVE_BO_ANSWER_PAGES, ...WAVE_BP_ANSWER_PAGES, ...WAVE_BQ_ANSWER_PAGES, ...WAVE_BR_ANSWER_PAGES, ...WAVE_BS_ANSWER_PAGES, ...WAVE_BT_ANSWER_PAGES, ...WAVE_BU_ANSWER_PAGES, ...WAVE_BV_ANSWER_PAGES, ...WAVE_BW_ANSWER_PAGES, ...WAVE_BX_ANSWER_PAGES, ...WAVE_BY_ANSWER_PAGES, ...WAVE_BZ_ANSWER_PAGES, ...WAVE_CA_ANSWER_PAGES, ...WAVE_CB_ANSWER_PAGES, ...WAVE_CC_ANSWER_PAGES, ...WAVE_CD_ANSWER_PAGES, ...WAVE_CE_ANSWER_PAGES, ...WAVE_CF_ANSWER_PAGES, ...WAVE_CG_ANSWER_PAGES, ...WAVE_CH_ANSWER_PAGES, ...WAVE_CI_ANSWER_PAGES, ...WAVE_CJ_ANSWER_PAGES, ...WAVE_CK_ANSWER_PAGES, ...WAVE_CL_ANSWER_PAGES, ...WAVE_CM_ANSWER_PAGES, ...WAVE_CN_ANSWER_PAGES, ...WAVE_CO_ANSWER_PAGES, ...WAVE_CP_ANSWER_PAGES, ...WAVE_CQ_ANSWER_PAGES, ...WAVE_CR_ANSWER_PAGES, ...WAVE_CS_ANSWER_PAGES, ...WAVE_CT_ANSWER_PAGES, ...WAVE_CU_ANSWER_PAGES, ...WAVE_CV_ANSWER_PAGES, ...WAVE_CW_ANSWER_PAGES, ...WAVE_CX_ANSWER_PAGES, ...WAVE_CY_ANSWER_PAGES, ...WAVE_CZ_ANSWER_PAGES, ...WAVE_DA_ANSWER_PAGES, ...WAVE_DB_ANSWER_PAGES, ...WAVE_DC_ANSWER_PAGES, ...WAVE_DD_ANSWER_PAGES, ...WAVE_DE_ANSWER_PAGES, ...WAVE_DF_ANSWER_PAGES, ...WAVE_DG_ANSWER_PAGES, ...WAVE_DH_ANSWER_PAGES, ...WAVE_DI_ANSWER_PAGES, ...WAVE_DJ_ANSWER_PAGES, ...WAVE_DK_ANSWER_PAGES, ...WAVE_DL_ANSWER_PAGES, ...WAVE_DM_ANSWER_PAGES, ...WAVE_DN_ANSWER_PAGES, ...WAVE_DO_ANSWER_PAGES, ...WAVE_DP_ANSWER_PAGES, ...WAVE_DQ_ANSWER_PAGES, ...WAVE_DR_ANSWER_PAGES, ...WAVE_DS_ANSWER_PAGES, ...WAVE_DT_ANSWER_PAGES, ...WAVE_DU_ANSWER_PAGES, ...WAVE_DV_ANSWER_PAGES, ...WAVE_DW_ANSWER_PAGES, ...WAVE_DX_ANSWER_PAGES, ...WAVE_DY_ANSWER_PAGES, ...WAVE_DZ_ANSWER_PAGES, ...WAVE_EA_ANSWER_PAGES, ...WAVE_EB_ANSWER_PAGES, ...WAVE_EC_ANSWER_PAGES, ...WAVE_ED_ANSWER_PAGES, ...WAVE_EE_ANSWER_PAGES, ...WAVE_EF_ANSWER_PAGES, ...WAVE_EG_ANSWER_PAGES, ...WAVE_EH_ANSWER_PAGES, ...WAVE_EI_ANSWER_PAGES, ...WAVE_EJ_ANSWER_PAGES, ...WAVE_EK_ANSWER_PAGES, ...WAVE_EL_ANSWER_PAGES, ...WAVE_EM_ANSWER_PAGES, ...WAVE_EN_ANSWER_PAGES, ...WAVE_EO_ANSWER_PAGES, ...WAVE_EP_ANSWER_PAGES, ...WAVE_EQ_ANSWER_PAGES, ...WAVE_ER_ANSWER_PAGES, ...WAVE_ES_ANSWER_PAGES, ...WAVE_ET_ANSWER_PAGES, ...WAVE_EU_ANSWER_PAGES, ...WAVE_EV_ANSWER_PAGES, ...WAVE_EW_ANSWER_PAGES, ...WAVE_EX_ANSWER_PAGES, ...WAVE_EY_ANSWER_PAGES, ...WAVE_EZ_ANSWER_PAGES, ...WAVE_FA_ANSWER_PAGES, ...WAVE_FB_ANSWER_PAGES, ...WAVE_FC_ANSWER_PAGES, ...WAVE_FD_ANSWER_PAGES, ...WAVE_FE_ANSWER_PAGES, ...WAVE_FG_ANSWER_PAGES, ...WAVE_FH_ANSWER_PAGES, ...WAVE_FI_ANSWER_PAGES, ...WAVE_FJ_ANSWER_PAGES, ...WAVE_FK_ANSWER_PAGES, ...WAVE_FL_ANSWER_PAGES, ...WAVE_FM_ANSWER_PAGES, ...WAVE_FN_ANSWER_PAGES, ...WAVE_FO_ANSWER_PAGES, ...WAVE_FP_ANSWER_PAGES, ...WAVE_FQ_ANSWER_PAGES, ...WAVE_FR_ANSWER_PAGES, ...WAVE_FS_ANSWER_PAGES, ...WAVE_FT_ANSWER_PAGES, ...WAVE_FU_ANSWER_PAGES, ...WAVE_FV_ANSWER_PAGES, ...WAVE_FW_ANSWER_PAGES, ...WAVE_FX_ANSWER_PAGES, ...WAVE_FY_ANSWER_PAGES, ...WAVE_FZ_ANSWER_PAGES, ...WAVE_GA_ANSWER_PAGES, ...WAVE_GB_ANSWER_PAGES, ...WAVE_GC_ANSWER_PAGES, ...WAVE_GD_ANSWER_PAGES, ...WAVE_GE_ANSWER_PAGES, ...WAVE_GF_ANSWER_PAGES, ...WAVE_GG_ANSWER_PAGES, ...WAVE_GH_ANSWER_PAGES, ...WAVE_GI_ANSWER_PAGES, ...WAVE_GJ_ANSWER_PAGES, ...WAVE_GK_ANSWER_PAGES, ...WAVE_GL_ANSWER_PAGES, ...WAVE_GM_ANSWER_PAGES, ...WAVE_GN_ANSWER_PAGES, ...WAVE_GO_ANSWER_PAGES, ...WAVE_GP_ANSWER_PAGES, ...WAVE_GQ_ANSWER_PAGES, ...WAVE_GR_ANSWER_PAGES, ...WAVE_GS_ANSWER_PAGES, ...WAVE_GT_ANSWER_PAGES, ...WAVE_GU_ANSWER_PAGES, ...WAVE_GV_ANSWER_PAGES, ...WAVE_GW_ANSWER_PAGES, ...WAVE_GX_ANSWER_PAGES, ...WAVE_GY_ANSWER_PAGES, ...WAVE_GZ_ANSWER_PAGES, ...WAVE_HA_ANSWER_PAGES, ...WAVE_HB_ANSWER_PAGES, ...WAVE_HC_ANSWER_PAGES, ...WAVE_HD_ANSWER_PAGES, ...WAVE_HE_ANSWER_PAGES, ...WAVE_HF_ANSWER_PAGES, ...WAVE_HG_ANSWER_PAGES, ...WAVE_HH_ANSWER_PAGES, ...WAVE_HI_ANSWER_PAGES, ...WAVE_HJ_ANSWER_PAGES, ...WAVE_HK_ANSWER_PAGES, ...WAVE_HL_ANSWER_PAGES, ...WAVE_HM_ANSWER_PAGES, ...WAVE_HN_ANSWER_PAGES, ...WAVE_HO_ANSWER_PAGES, ...WAVE_HP_ANSWER_PAGES, ...WAVE_HQ_ANSWER_PAGES, ...WAVE_HR_ANSWER_PAGES, ...WAVE_HS_ANSWER_PAGES, ...WAVE_HT_ANSWER_PAGES, ...WAVE_HU_ANSWER_PAGES, ...WAVE_HV_ANSWER_PAGES, ...WAVE_HW_ANSWER_PAGES, ...WAVE_HX_ANSWER_PAGES, ...WAVE_HY_ANSWER_PAGES, ...WAVE_HZ_ANSWER_PAGES, ...WAVE_IA_ANSWER_PAGES, ...WAVE_IB_ANSWER_PAGES, ...WAVE_IC_ANSWER_PAGES, ...WAVE_ID_ANSWER_PAGES, ...WAVE_IE_ANSWER_PAGES, ...WAVE_IF_ANSWER_PAGES, ...WAVE_IG_ANSWER_PAGES, ...WAVE_IH_ANSWER_PAGES, ...WAVE_II_ANSWER_PAGES, ...WAVE_IJ_ANSWER_PAGES, ...WAVE_IK_ANSWER_PAGES, ...WAVE_IL_ANSWER_PAGES,...WAVE_IM_ANSWER_PAGES,...WAVE_IN_ANSWER_PAGES,...WAVE_IO_ANSWER_PAGES,...WAVE_IP_ANSWER_PAGES,...WAVE_IQ_ANSWER_PAGES,...WAVE_IR_ANSWER_PAGES,...WAVE_IS_ANSWER_PAGES,...WAVE_IT_ANSWER_PAGES,...WAVE_IU_ANSWER_PAGES,...WAVE_IV_ANSWER_PAGES,...WAVE_IW_ANSWER_PAGES,...WAVE_IX_ANSWER_PAGES,...WAVE_IY_ANSWER_PAGES,...WAVE_IZ_ANSWER_PAGES,...WAVE_JA_ANSWER_PAGES,...WAVE_JB_ANSWER_PAGES,...WAVE_JK_ANSWER_PAGES,...WAVE_JL_ANSWER_PAGES,...WAVE_JM_ANSWER_PAGES,...WAVE_JN_ANSWER_PAGES,...WAVE_JO_ANSWER_PAGES,...WAVE_JP_ANSWER_PAGES,...WAVE_JQ_ANSWER_PAGES,...WAVE_JR_ANSWER_PAGES,...WAVE_KS_ANSWER_PAGES,...WAVE_KT_ANSWER_PAGES,...WAVE_KU_ANSWER_PAGES,...WAVE_KV_ANSWER_PAGES,...WAVE_KW_ANSWER_PAGES,...WAVE_KX_ANSWER_PAGES,...WAVE_KY_ANSWER_PAGES,...WAVE_KZ_ANSWER_PAGES,...WAVE_JC_ANSWER_PAGES,...WAVE_JD_ANSWER_PAGES,...WAVE_JE_ANSWER_PAGES,...WAVE_JF_ANSWER_PAGES,...WAVE_JG_ANSWER_PAGES,...WAVE_JH_ANSWER_PAGES,...WAVE_JI_ANSWER_PAGES,...WAVE_JJ_ANSWER_PAGES,...WAVE_ID_B60_ANSWER_PAGES, ...WAVE_IE_B60_ANSWER_PAGES, ...WAVE_IF_B60_ANSWER_PAGES, ...WAVE_IG_B60_ANSWER_PAGES, ...WAVE_IH_B60_ANSWER_PAGES, ...WAVE_II_B60_ANSWER_PAGES,...WAVE_IJ_B61_ANSWER_PAGES, ...WAVE_IK_B61_ANSWER_PAGES, ...WAVE_IL_B61_ANSWER_PAGES, ...WAVE_IM_B61_ANSWER_PAGES, ...WAVE_IN_B61_ANSWER_PAGES, ...WAVE_IO_B61_ANSWER_PAGES,...WAVE_IP_B62_ANSWER_PAGES, ...WAVE_IQ_B62_ANSWER_PAGES, ...WAVE_IR_B62_ANSWER_PAGES, ...WAVE_IS_B62_ANSWER_PAGES, ...WAVE_IT_B62_ANSWER_PAGES, ...WAVE_IU_B62_ANSWER_PAGES,...WAVE_IV_B63_ANSWER_PAGES, ...WAVE_IW_B63_ANSWER_PAGES, ...WAVE_IX_B63_ANSWER_PAGES,...WAVE_IY_B64_ANSWER_PAGES, ...WAVE_IZ_B64_ANSWER_PAGES, ...WAVE_JA_B64_ANSWER_PAGES,...WAVE_JB_B65_ANSWER_PAGES, ...WAVE_JC_B65_ANSWER_PAGES, ...WAVE_JD_B65_ANSWER_PAGES, ...WAVE_JE_B65_ANSWER_PAGES, ...WAVE_JF_B65_ANSWER_PAGES, ...WAVE_JG_B65_ANSWER_PAGES,...WAVE_JH_B66_ANSWER_PAGES, ...WAVE_JI_B66_ANSWER_PAGES, ...WAVE_JJ_B66_ANSWER_PAGES, ...WAVE_JK_B66_ANSWER_PAGES, ...WAVE_JL_B66_ANSWER_PAGES, ...WAVE_JM_B66_ANSWER_PAGES,...WAVE_JN_B67_ANSWER_PAGES, ...WAVE_JO_B67_ANSWER_PAGES, ...WAVE_JP_B67_ANSWER_PAGES, ...WAVE_JQ_B67_ANSWER_PAGES, ...WAVE_JR_B67_ANSWER_PAGES, ...WAVE_JS_ANSWER_PAGES, ...WAVE_JT_ANSWER_PAGES,...WAVE_JU_ANSWER_PAGES, ...WAVE_JV_ANSWER_PAGES, ...WAVE_JW_ANSWER_PAGES, ...WAVE_JX_ANSWER_PAGES, ...WAVE_JY_ANSWER_PAGES, ...WAVE_JZ_ANSWER_PAGES, ...WAVE_KA_ANSWER_PAGES,...WAVE_KB_ANSWER_PAGES, ...WAVE_KC_ANSWER_PAGES, ...WAVE_KD_ANSWER_PAGES, ...WAVE_KE_ANSWER_PAGES, ...WAVE_KF_ANSWER_PAGES, ...WAVE_KG_ANSWER_PAGES, ...WAVE_KH_ANSWER_PAGES,...WAVE_KL_ANSWER_PAGES, ...WAVE_KM_ANSWER_PAGES, ...WAVE_KN_ANSWER_PAGES, ...WAVE_KO_ANSWER_PAGES, ...WAVE_KP_ANSWER_PAGES, ...WAVE_KQ_ANSWER_PAGES, ...WAVE_KR_ANSWER_PAGES, ...WAVE_KS_B71_ANSWER_PAGES, ...WAVE_KT_B71_ANSWER_PAGES, ...WAVE_KU_B71_ANSWER_PAGES, ...WAVE_KV_B71_ANSWER_PAGES, ...WAVE_KW_B71_ANSWER_PAGES, ...WAVE_KX_B71_ANSWER_PAGES, ...WAVE_KY_B71_ANSWER_PAGES, ...WAVE_LA_ANSWER_PAGES, ...WAVE_LB_ANSWER_PAGES, ...WAVE_LC_ANSWER_PAGES, ...WAVE_LD_ANSWER_PAGES, ...WAVE_LE_ANSWER_PAGES, ...WAVE_LF_ANSWER_PAGES, ...WAVE_LG_ANSWER_PAGES, ...WAVE_LN_ANSWER_PAGES, ...WAVE_LH_ANSWER_PAGES, ...WAVE_LI_ANSWER_PAGES, ...WAVE_LJ_ANSWER_PAGES, ...WAVE_LK_ANSWER_PAGES, ...WAVE_LL_ANSWER_PAGES, ...WAVE_LM_ANSWER_PAGES,];

const PHASE7_COMMON_FAQ = {
  question: "Does this answer guarantee a permit or project outcome?",
  answer: "No. The answer provides general engineering orientation. The responsible professional confirms the project scope and evidence, while the authority having jurisdiction controls its requirements, review, interpretation, and approval decision.",
};

function phase7Faqs(page: Phase7AeoSeed): Array<{ question: string; answer: string }> {
  return [
    { question: `What is the short answer about ${page.topic.toLowerCase()}?`, answer: page.answer },
    {
      question: `What does ${page.topic.toLowerCase()} depend on?`,
      answer: `The answer depends on the project scope, governing jurisdiction, current records, design inputs, and the responsible professional's independent review. ${page.answer}`,
    },
    PHASE7_COMMON_FAQ,
    {
      question: "What should I send for an initial engineering review?",
      answer: "Send the project address, plain-language scope, current drawings, existing-condition records, relevant calculations or comments, schedule, and the authority or code information already available. The responsible engineer will identify gaps.",
    },
  ];
}

function assertPhase7Corpus(): void {
  if (PHASE7_AEO_PAGES.length !== 101) {
    throw new Error(`SEO assertion failed: Phase 7 requires exactly 101 new seeds (found ${PHASE7_AEO_PAGES.length})`);
  }
  const existingSlugs = new Set([
    ...PHASE0_AEO_PAGES.map((page) => page.slug),
    ...PHASE0_PLAN_CHECK_PLAYBOOKS.map((page) => page.slug),
    ...PHASE0_RESOURCE_PAGES.map((page) => page.slug),
    ...GUIDE_PAGES.map((page) => page.slug),
  ]);
  const existingHeadings = new Set([
    ...PHASE0_AEO_PAGES.flatMap((page) => [page.title.toLowerCase(), page.h1.toLowerCase()]),
    ...PHASE0_PLAN_CHECK_PLAYBOOKS.flatMap((page) => [page.title, "h1" in page ? page.h1 : undefined].filter((value): value is string => Boolean(value)).map((value) => value.toLowerCase())),
    ...PHASE0_RESOURCE_PAGES.flatMap((page) => [page.title, "h1" in page ? page.h1 : undefined].filter((value): value is string => Boolean(value)).map((value) => value.toLowerCase())),
    ...GUIDE_PAGES.flatMap((page) => [page.title, "h1" in page ? page.h1 : undefined].filter((value): value is string => Boolean(value)).map((value) => value.toLowerCase())),
  ]);
  const slugs = new Set<string>();
  const counts = {} as Record<Phase7Cluster, number>;
  for (const page of PHASE7_AEO_PAGES) {
    if (slugs.has(page.slug) || existingSlugs.has(page.slug)
      || existingHeadings.has(page.title.toLowerCase()) || existingHeadings.has(page.h1.toLowerCase())) {
      throw new Error(`SEO assertion failed: Phase 7 slug overlaps an existing corpus route: ${page.slug}`);
    }
    slugs.add(page.slug);
    counts[page.cluster] = (counts[page.cluster] ?? 0) + 1;
    if (!/^\/(?:services|permit-engineering|pe-stamp|[a-z0-9-]+\/)/.test(page.serviceHref)
      || !page.answer.trim() || page.answer.length < 120
      || !/^[a-z0-9-]+$/.test(page.slug)) {
      throw new Error(`SEO assertion failed: incomplete Phase 7 seed: ${page.slug}`);
    }
  }
  for (const cluster of Object.keys(PHASE7_CLUSTER_COUNTS) as Phase7Cluster[]) {
    if (counts[cluster] !== PHASE7_CLUSTER_COUNTS[cluster]) {
      throw new Error(`SEO assertion failed: Phase 7 ${cluster} count is ${counts[cluster] ?? 0}, expected ${PHASE7_CLUSTER_COUNTS[cluster]}`);
    }
  }
  const reportDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "phase7-corpus.json"), `${JSON.stringify({
    generatedAt: "deterministic",
    existingAnswerPages: PHASE0_AEO_PAGES.length,
    phase7SeedPages: PHASE7_AEO_PAGES.length,
    answerLibraryPages: PHASE0_AEO_PAGES.length + PHASE7_AEO_PAGES.length,
    clusterCounts: PHASE7_CLUSTER_COUNTS,
  }, null, 2)}\n`);
}

function phase0FaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function phase0FaqMarkup(faqs: Array<{ question: string; answer: string }>): string {
  return `<section class="block"><div class="container"><h2>Frequently Asked Questions</h2><div class="faq">
    ${faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}
  </div></div></section>`;
}

function assertPhase0Page(html: string, canonical: string, faqs: Array<{ question: string; answer: string }>, label: string): void {
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as { "@type"?: string; mainEntity?: unknown[] });
  if ((!html.includes('data-phase0="true"') && !html.includes('data-phase7="true"'))
    || (html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length !== 1
    || !html.includes(`<link rel="canonical" href="${SITE}${canonical}"`)
    || html.includes('name="robots" content="noindex')
    || !html.includes("By ")
    || html.includes("Apex Grid Engineering PE Team")
    || !html.includes(`Updated ${PHASE0_UPDATED_DATE}`)
    || schemas.find((schema) => schema["@type"] === "FAQPage")?.mainEntity?.length !== faqs.length
  ) {
    throw new Error(`SEO assertion failed: malformed Phase 0 page ${label}`);
  }
}

function phase0ArticleFrame(
  opts: {
    canonical: string;
    title: string;
    description: string;
    h1: string;
    kicker: string;
    answer: string;
    sections: Array<{ heading: string; body: string; bullets?: string[] }>;
    faqs: Array<{ question: string; answer: string }>;
    links?: Array<{ label: string; href: string }>;
    schemaType?: "Article" | "Service" | "WebPage";
    author?: string;
    founderNote?: string;
    marker?: string;
    directAnswer?: string;
    facts?: Array<{ label: string; value: string }>;
    howTo?: boolean;
  },
): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: opts.h1 }];
  const author = opts.author ?? PHASE0_EDITORIAL_AUTHOR;
  const byline = `By ${esc(author)}${author === PHASE0_JEREMY_AUTHOR ? "." : ""}`;
  const authorSchema = author === PHASE0_JEREMY_AUTHOR
    ? {
      "@type": "Person",
      name: "Jeremy Mills",
      jobTitle: "CEO & Founder",
      description: "USAF Veteran",
      worksFor: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    }
    : { "@type": "Organization", name: PHASE0_EDITORIAL_AUTHOR, url: SITE };
  const schema = {
    "@context": "https://schema.org",
    "@type": opts.schemaType ?? "Article",
    headline: opts.h1,
    name: opts.h1,
    description: opts.description,
    url: `${SITE}${opts.canonical}`,
    datePublished: PHASE0_UPDATED_DATE,
    dateModified: PHASE0_UPDATED_DATE,
    author: authorSchema,
    publisher: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
  };
  const howToSchema = opts.howTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.h1,
    description: opts.directAnswer ?? opts.answer,
    step: opts.sections.map((section, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: section.heading,
      text: section.body,
      url: `${SITE}${opts.canonical}#step-${index + 1}`,
    })),
  } : undefined;
  const hero = opts.directAnswer
    ? `<section class="hero"><div class="container"><p class="kicker">${esc(opts.kicker)}</p><h1>${esc(opts.h1)}</h1>
      <p class="note">${byline} · Updated ${PHASE0_UPDATED_DATE}</p>
      <div class="direct-answer" aria-label="Direct answer"><p>${esc(opts.directAnswer)}</p></div>
      ${opts.founderNote ? `<p class="founder-note">${esc(opts.founderNote)}</p>` : ""}
    </div></section>`
    : `<section class="hero"><div class="container"><p class="kicker">${esc(opts.kicker)}</p><h1>${esc(opts.h1)}</h1><p class="lede">${esc(opts.answer)}</p>
      <p class="note">${byline} · Updated ${PHASE0_UPDATED_DATE}</p>${opts.founderNote ? `<p class="founder-note">${esc(opts.founderNote)}</p>` : ""}
    </div></section>`;
  const body = `<main ${opts.marker ? `data-${opts.marker}="true"` : 'data-phase0="true"'}>
  ${breadcrumb(crumbs)}
  ${hero}
  ${opts.facts?.length ? `<section class="block"><div class="container"><h2>What facts should you use to plan this scope?</h2><div class="prose"><table><thead><tr><th>Planning fact</th><th>Project-specific value</th></tr></thead><tbody>${opts.facts.map((fact) => `<tr><th scope="row">${esc(fact.label)}</th><td>${esc(fact.value)}</td></tr>`).join("")}</tbody></table></div></div></section>` : ""}
  ${opts.sections.map((section, index) => `<section class="block" id="step-${index + 1}"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p>${section.bullets ? `<ul class="scope">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}</div></div></section>`).join("")}
  ${opts.links?.length ? `<section class="block"><div class="container"><h2>${opts.directAnswer ? "Which related engineering resources can help?" : "Related Engineering Resources"}</h2><div class="linkrow">${opts.links.map((link) => `<a href="${esc(link.href)}"${/^https:\/\//.test(link.href) ? ' rel="noopener noreferrer"' : ""}>${esc(link.label)}</a>`).join("")}</div></div></section>` : ""}
  ${opts.directAnswer ? `<section class="block"><div class="container"><h2>What else do project teams ask?</h2><div class="faq">${opts.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></div></section>` : phase0FaqMarkup(opts.faqs)}
  <section class="ctaband"><div class="container"><h2>${opts.directAnswer ? "Ready to discuss your engineering scope?" : "Discuss your engineering scope"}</h2><p>Share the project address, current records, requested deliverable, authority information, and schedule. Apex Grid confirms professional responsibility, availability, and scope before work begins.</p><a class="cta" href="/estimate">Start an Engineering Estimate</a></div></section>
  </main>`;
  return htmlShell({
    title: opts.title,
    description: opts.description,
    canonical: `${SITE}${opts.canonical}`,
    schemaJson: [schema, phase0FaqSchema(opts.faqs), ...(howToSchema ? [howToSchema] : []), breadcrumbSchema(crumbs)],
    body,
  });
}

function phase0AeoPage(page: Phase0AeoPage | Phase7AeoSeed): string {
  const phase7 = "cluster" in page;
  const related = phase7
    ? PHASE7_AEO_PAGES
      .filter((candidate) => candidate.slug !== page.slug && candidate.cluster === page.cluster)
      .slice(0, 3)
      .map((candidate) => ({ label: candidate.h1, href: `/answers/${candidate.slug}/` }))
    : PHASE0_AEO_PAGES
      .filter((candidate) => candidate.slug !== page.slug).slice(0, 3)
      .map((candidate) => ({ label: candidate.h1, href: `/answers/${candidate.slug}/` }));
  const serviceHref = "cluster" in page ? page.serviceHref : (page.serviceHref ?? "/services/");
  const links = [
    ...related,
    ...("cluster" in page && page.cluster === "Cost and pricing"
      ? [{ label: "Use our instant estimator", href: "/estimate" }]
      : []),
    ...("cluster" in page ? [] : (page.extraLinks ?? [])),
    { label: "Engineering service for this question", href: serviceHref },
    { label: "Metro engineering guides", href: "/metros/" },
    { label: "Verified service areas", href: "/locations/" },
  ];
  const faqs = "cluster" in page ? phase7Faqs(page) : page.faqs;
  const customSections = "cluster" in page ? undefined : page.sections;
  const sections = !customSections?.length
    ? [
      { heading: "The concise answer", body: page.answer },
      { heading: "How the answer is applied", body: `The correct application of ${page.topic.toLowerCase()} starts with the actual project, not a generic promise. Confirm the jurisdiction, adopted code, design scope, existing conditions, required deliverables, and professional responsibility before relying on a conclusion. A responsible engineer documents assumptions and identifies information that still needs verification.` },
      { heading: "What can change the result", body: "Project type, occupancy, existing construction, site conditions, code edition, agency requirements, and changes made after the original design can change the work. A concise answer is useful for orientation, but the signed or sealed project record must reflect the current scope and the authority's process.", bullets: ["Confirm the authority having jurisdiction and current checklist", "Use current drawings, calculations, field evidence, and equipment information", "Separate engineering decisions from owner, architect, contractor, utility, and agency decisions", "Record assumptions, limitations, and questions requiring direct AHJ confirmation"] },
    ]
    : customSections;
  return phase0ArticleFrame({
    canonical: `/answers/${page.slug}/`,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: `AEO Answer · ${page.topic}`,
    answer: page.answer,
    sections,
    faqs,
    links,
    schemaType: "Article",
    author: PHASE0_JEREMY_AUTHOR,
    founderNote: "cluster" in page ? undefined : page.founderNote,
    marker: "cluster" in page ? "phase7" : undefined,
    directAnswer: "cluster" in page ? undefined : page.directAnswer,
    facts: "cluster" in page ? undefined : page.facts,
    howTo: "cluster" in page ? undefined : page.howTo,
  });
}

function phase0CollectionHub(
  canonical: string,
  title: string,
  description: string,
  h1: string,
  kicker: string,
  answer: string,
  links: Array<{ label: string; href: string }>,
): string {
  return phase0ArticleFrame({
    canonical,
    title,
    description,
    h1,
    kicker,
    answer,
    sections: [
      { heading: "How to use this collection", body: "These pages are national, general guidance. They explain useful questions and records without inventing local permit outcomes, county requirements, client records, or project pricing. Confirm the current jurisdiction, code edition, authority checklist, and responsible professional before relying on a page for a live project." },
      { heading: "A consistent professional boundary", body: "Apex Grid's public guidance does not replace a project proposal, site investigation, design analysis, permit review, inspection, or board decision. Scope, licensing, responsible charge, and deliverables are confirmed for each project." },
    ],
    faqs: [
      { question: "Are these pages static and indexable?", answer: "Yes. Phase 0 pages are generated as static HTML with a self-canonical URL and index,follow metadata, then included in the generated sitemap." },
      { question: "Do these pages contain local guarantees or pricing?", answer: "No. The corpus intentionally excludes invented local records, near-me doorway pages, county guides, and inline location pricing." },
    ],
    links,
    schemaType: "WebPage",
  });
}

function phase1MetroFaqs(metro: Phase1Metro, serviceLabel?: string): Array<{ question: string; answer: string }> {
  const subject = serviceLabel
    ? `${serviceLabel} for the ${metro.metroName} metro`
    : `engineering guides for the ${metro.metroName} metro`;
  return [
    {
      question: `What does ${subject} cover?`,
      answer: `This guide explains planning, records, coordination, and professional boundaries for ${subject}. The exact project scope, responsible professional, and deliverables are confirmed from current records.`,
    },
    {
      question: "Do these metro pages guarantee permit approval?",
      answer: "No. The authority having jurisdiction controls its checklist, interpretation, inspections, review, and approval. A general metro guide cannot promise a local outcome.",
    },
    {
      question: "What should I send for a metro engineering review?",
      answer: "Send the project address, scope, current drawings, existing-condition evidence, equipment or utility information, prior comments, applicable authority information, and requested deliverables. The responsible professional identifies what else is needed.",
    },
  ];
}

function phase0ServicePage(page: Phase0ServicePage): string {
  return phase0ArticleFrame({
    canonical: page.path,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: "Phase 0 Service Scope",
    answer: page.answer,
    sections: [
      ...page.sections,
      {
        heading: "A founder's standard for project clarity",
        body: "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran, emphasizes clear scope, traceable inputs, and direct communication about what remains unverified. That founder perspective does not replace the independent judgment or professional responsibility of the licensed engineer assigned to an accepted project.",
      },
    ],
    faqs: page.faqs,
    links: [
      { label: "Engineering answers library", href: "/answers/" },
      { label: "Plan-check correction playbooks", href: "/plan-check-playbooks/" },
      { label: "Engineering project resources", href: "/resources/phase-0/" },
      { label: "PE-stamped engineering hub", href: "/pe-stamp/" },
      { label: "Plan-check correction support", href: "/services/plan-check-corrections-engineer/" },
      { label: "Contact Apex Grid", href: "/contact/" },
    ],
    schemaType: "Service",
  });
}

function peStampHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "PE Stamp Resources" }];
  const stateLinks = Object.keys(PE_STATE_SOURCE_LINKS).sort().map((slug) => ({
    label: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} PE stamp information`,
    href: `/pe-stamp/${slug}/`,
  }));
  const faqs = [
    { question: "Is a PE stamp a stand-alone product?", answer: "No. A seal represents a responsible engineer's professional review and responsibility for eligible work within the engineer's authorization and applicable rules." },
    { question: "Where can I verify a professional engineer license?", answer: "Use the official board and license-verification resources linked for the relevant state, then confirm project-specific authorization and scope directly with the responsible professional." },
    { question: "Does a PE stamp guarantee permit approval?", answer: "No. The AHJ controls its completeness review, interpretation, comments, and approval decision." },
  ];
  return phase0ArticleFrame({
    canonical: "/pe-stamp/",
    title: "PE Stamp and License Verification Resources | Apex Grid",
    description: "State-by-state professional engineering board and license-verification resources, plus responsible PE document guidance from Apex Grid Engineering.",
    h1: "PE Stamp and Professional Engineer Verification Resources",
    kicker: "Professional Responsibility · State Resources",
    answer: "A PE seal belongs to defined engineering work that a responsible, authorized professional engineer has performed or independently reviewed. This hub links to official state board and license-verification resources without implying a project license, local office, or guaranteed approval.",
    sections: [
      { heading: "Use the official state source first", body: "Board rules, seal requirements, comity processes, and verification systems change. Open the relevant state page below, follow the board's current instructions, and confirm the engineer's authorization for the project's discipline, location, and scope. NCEES, a project owner, or a contractor cannot substitute for the state's official record.", bullets: ["State board landing page", "Official license lookup or verification page", "Project-specific authorization and responsible charge", "AHJ submission and signature requirements"] },
      { heading: "A seal is tied to professional responsibility", body: "Apex Grid does not sell a stamp-for-hire service. Where a project is accepted, the responsible engineer defines the scope, reviews the design basis, performs or verifies the necessary work, coordinates eligible documents, and determines whether signing or sealing is appropriate. Construction, agency, utility, architecture, survey, geotechnical, and specialty responsibilities remain distinct." },
      { heading: "Founder perspective", body: "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran, supports a verification-first approach: confirm the official license record, define the engineering scope, and identify the responsible licensed professional before relying on a seal. This founder statement does not represent Jeremy as a professional engineer." },
    ],
    faqs,
    links: stateLinks,
    schemaType: "WebPage",
  });
}

function peStampStatePage(state: StateData, slug: string): string {
  const links = PE_STATE_SOURCE_LINKS[slug];
  if (!links) throw new Error(`Missing official PE board links for ${slug}`);
  const stateName = state.name;
  const faqs = [
    { question: `How do I verify a PE license in ${stateName}?`, answer: `Start with the official ${stateName} board and license-verification links on this page. Confirm the record directly with the board and separately confirm that the engineer is authorized for the project's discipline and scope.` },
    { question: `Does a ${stateName} PE seal guarantee approval?`, answer: "No. A seal communicates professional responsibility for eligible engineering work. The authority having jurisdiction controls its review, comments, interpretation, and approval decision." },
    { question: `What should a ${stateName} project team confirm before sealing?`, answer: `Confirm the project location, discipline, adopted code, AHJ submission rules, existing-condition evidence, and the engineer's ability to accept responsible charge. ${state.licensure.notes}` },
  ];
  return phase0ArticleFrame({
    canonical: `/pe-stamp/${slug}/`,
    title: `PE Stamp and License Lookup in ${stateName} | Apex Grid`,
    description: `Official ${stateName} professional engineering board and license-verification resources, with project-specific PE responsibility guidance from Apex Grid Engineering.`,
    h1: `PE Stamp and License Verification in ${stateName}`,
    kicker: `${stateName} · Official Board Resources`,
    answer: `For a ${stateName} project, use the state's official engineering board and license-verification resources before relying on a professional credential. A PE seal still requires independent engineering review, professional responsibility, and compliance with the project jurisdiction's submission rules.`,
    sections: [
      { heading: `Official ${stateName} board and lookup links`, body: "These links are provided as starting points to the official state sources. A board's current instructions and online record control; confirm the page, status, discipline, and authorization directly before a project submission.", bullets: [`${stateName} engineering licensing board`, "Official license verification or lookup", `Project code and AHJ requirements for ${stateName}`, "Responsible engineer and scope confirmation"] },
      { heading: "Project-specific engineering responsibility", body: `The ${stateName} board resource does not approve a design or transfer responsibility to a contractor, owner, or another engineer. The responsible professional reviews the project inputs, code basis, calculations, drawings, and existing conditions, then determines which documents can be signed or sealed. ${state.buildingCode.notes} ${state.licensure.notes}` },
      { heading: "Useful project inputs", body: `A ${stateName} PE may need the project address, current architectural backgrounds, discipline scope, adopted code information, site and existing-condition evidence, equipment data, calculations, AHJ checklist, and any correction notice. ${state.permitting} ${state.climate.drivers.join("; ")} are examples of why project inputs must be confirmed rather than assumed.` },
    ],
    faqs,
    links: [
      { label: `${stateName} official board`, href: links.boardUrl },
      { label: `${stateName} official license lookup`, href: links.lookupUrl },
      { label: "PE stamp hub", href: "/pe-stamp/" },
    ],
    schemaType: "WebPage",
  });
}

function stampingServicePage(page: StampingServicePage): string {
  return phase0ArticleFrame({
    canonical: `/${page.serviceSlug}/${page.stateSlug}/`,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: page.kicker,
    answer: page.answer,
    sections: page.sections,
    faqs: page.faqs,
    links: page.links,
    schemaType: "Service",
  });
}

/** Query Matrix Tier 1 cluster page — one authoritative page per keyword cluster. */
function queryMatrixClusterPage(page: QueryMatrixPage): string {
  return phase0ArticleFrame({
    canonical: page.canonical,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: page.kicker,
    answer: page.answer,
    sections: page.sections,
    faqs: page.faqs,
    links: page.links,
    schemaType: "Service",
    directAnswer: page.directAnswer,
  });
}

// ── Query Matrix Tier 1: all cluster pages ─────────────────────────────
const QUERY_MATRIX_TIER1_PAGES: QueryMatrixPage[] = [
  ...WAVE_QM_TIER1_A,
  ...WAVE_QM_TIER1_B,
  ...WAVE_QM_TIER1_C,
  ...WAVE_QM_TIER1_D,
  ...WAVE_QM_TIER1_E,
];

function stampingServiceHub(hub: StampingServiceHub): string {
  return phase0ArticleFrame({
    canonical: `/${hub.serviceSlug}/`,
    title: hub.title,
    description: hub.description,
    h1: hub.h1,
    kicker: hub.kicker,
    answer: hub.answer,
    sections: hub.sections,
    faqs: hub.faqs,
    links: hub.links,
    schemaType: "Service",
  });
}

function estimatorLocationLinks(
  state: StateData,
  cities: CityData[],
  directory: CityDirectory,
): Array<{ name: string; href: string }> {
  const available = allDirectoryCitiesForState(state, directory, cities);
  const byName = new Map(available.map((city) => [diagnosticSlug(city.name), city]));
  const selected: DirectoryCity[] = [];
  for (const metro of state.metros) {
    const normalizedMetro = diagnosticSlug(metro);
    const city = byName.get(normalizedMetro)
      ?? byName.get(normalizedMetro.replace(/-city$/, ""))
      ?? available.find((candidate) =>
        candidate.slug === normalizedMetro || candidate.slug === normalizedMetro.replace(/-city$/, ""),
      );
    if (city && !selected.some((entry) => entry.slug === city.slug)) selected.push(city);
  }
  // A few reviewed metro labels (for example, a multi-city metro or an
  // island community) do not match a Census place slug exactly. Keep the
  // fallback within this state's existing generated location tree.
  for (const city of available) {
    if (selected.length >= 3) break;
    if (!selected.some((entry) => entry.slug === city.slug)) selected.push(city);
  }
  const links = [
    { name: `${state.name} service area`, href: `/locations/${state.slug}/` },
    ...selected.slice(0, 6).map((city) => ({
      name: city.name,
      href: `/locations/${state.slug}/${city.slug}/`,
    })),
  ];
  if (selected[0]) {
    links.push({
      name: `${selected[0].name} MEP engineering`,
      href: `/locations/${state.slug}/${selected[0].slug}/mep-engineering/`,
    });
  }
  for (const specialty of LOCATION_SERVICE_PAGES.filter((page) => page.stateSlug === state.slug).slice(0, 3)) {
    const href = `/locations/${specialty.stateSlug}/${specialty.citySlug}/${specialty.serviceSlug}/`;
    if (!links.some((link) => link.href === href)) {
      links.push({ name: specialty.title, href });
    }
  }
  return links;
}

function engineeringCostEstimatorPage(
  state: StateData,
  cities: CityData[],
  directory: CityDirectory,
): string {
  const canonicalPath = `/engineering-cost-estimator/${state.slug}/`;
  const officialPeSources = PE_STATE_SOURCE_LINKS[state.slug];
  if (!officialPeSources) throw new Error(`Missing official PE board links for estimator page: ${state.slug}`);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Cost Estimator", href: "/estimate" },
    { name: `${state.name} estimator` },
  ];
  const locationLinks = estimatorLocationLinks(state, cities, directory);
  const faqs = [
    ...state.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
    {
      question: `How much does a PE stamp cost in ${state.name}?`,
      answer: `There is no responsible flat rate for a PE stamp in ${state.name}. The engineering fee depends on the defined discipline and deliverables, project size and occupancy, current drawings and calculations, existing-condition evidence, site or geotechnical information where relevant, coordination and revision scope, schedule, and the ${state.licensure.board}'s applicable rules. A PE seal is part of professional engineering work and is not a detached signature, guarantee, or approval shortcut.`,
    },
  ];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@