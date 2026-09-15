export type Phase7Cluster =
  | "Cost and pricing"
  | "Project timelines"
  | "Hiring and vetting"
  | "PE licensing"
  | "Plan check and permits"
  | "Technical explainers";

export type Phase7AeoSeed = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  topic: string;
  cluster: Phase7Cluster;
  serviceHref: string;
};