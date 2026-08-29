import { usePageMeta } from "@/lib/seo";

const content = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        h: "Information We Collect",
        p: "When you submit a project inquiry, we collect the information you provide — name, email, company, phone, and project details — solely to respond to your request and scope your project.",
      },
      {
        h: "How We Use It",
        p: "Your information is used to evaluate and respond to your inquiry. We do not sell, rent, or share your information with third parties for marketing purposes.",
      },
      {
        h: "Retention & Contact",
        p: "Inquiry records are retained for business purposes only. To request removal of your information, contact us through the contact page and we will process your request promptly.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        h: "Use of This Site",
        p: "This website is provided for informational purposes about Apex Grid Engineering's services. Content on this site does not constitute engineering advice, a proposal, or a contract.",
      },
      {
        h: "No Professional Relationship",
        p: "Submitting an inquiry does not create a client relationship. Engineering services are provided only under a signed written agreement defining scope, deliverables, and fees.",
      },
      {
        h: "Intellectual Property",
        p: "All content, imagery, and branding on this site are the property of Apex Grid Engineering and may not be reproduced without written permission.",
      },
    ],
  },
};

export default function Legal({ page }: { page: "privacy" | "terms" }) {
  const data = content[page];
  usePageMeta({
    title: `${data.title} | Apex Grid Engineering`,
    description: page === "privacy"
      ? "How Apex Grid Engineering collects, uses, and protects information submitted through its website."
      : "Terms governing use of the Apex Grid Engineering website and project inquiry process.",
    path: page === "privacy" ? "/privacy" : "/terms",
  });
  return (
    <div className="flex flex-col">
      <section className="pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Legal
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            {data.title}
          </h1>
        </div>
      </section>
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-12">
          {data.sections.map((s) => (
            <div key={s.h} className="border-l-2 border-primary/40 pl-6">
              <h2 className="font-display text-xl font-bold tracking-tight mb-3">
                {s.h}
              </h2>
              <p className="text-foreground/70 leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
