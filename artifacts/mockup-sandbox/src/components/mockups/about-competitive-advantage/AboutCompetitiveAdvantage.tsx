import "./_group.css";

export function AboutCompetitiveAdvantage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-card py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Apex Grid is a multifaceted organization built around three
              connected capabilities: Engineering, Architecture, and General
              Contracting.
            </p>
            <p>
              With in-house Professional Engineers and more than 20 engineers
              on staff, every project is engineered domestically and stamped by
              PEs licensed in 49 states.
            </p>
          </div>
          <div className="border border-border bg-background p-10">
            <h3 className="mb-8 text-2xl font-bold">By The Numbers</h3>
            <div className="grid grid-cols-2 gap-8">
              <Metric value="49" label="States Licensed" />
              <Metric value="20+" label="Licensed Engineers" />
              <Metric value="12-24hr" label="Initial Review Response" />
              <Metric value="4" label="Core Disciplines" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-14 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Apex Grid Advantage
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Why Top Developers Choose Apex Grid
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Our PEs take on jobs directly, so technical leadership is present
              from scoping through final submission—not added only at the end.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            <Advantage
              title="Direct PE Accountability"
              body="Every project is overseen and stamped by a licensed Professional Engineer (PE) to ensure absolute compliance and zero-correction submittals."
            />
            <Advantage
              title="Unmatched Engineering Scale"
              body="With a powerful internal roster of 20+ licensed engineers, we provide senior-level oversight without the project delays typical of smaller boutique firms."
            />
            <Advantage
              title="Nationwide Agility, Regional Mastery"
              body="Licensed in 49 states with dedicated local hubs across the Southwest, delivering cross-country reach with deep municipal expertise."
            />
          </div>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-14 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Apex Grid Organization
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Three capabilities.{" "}
              <span className="text-muted-foreground">One accountable team.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            <Capability
              title="Engineering"
              body="Structural, MEP, civil, and assessment services designed for code compliance and constructability."
            />
            <Capability
              title="Architecture"
              body="Concept through permit-ready documents, coordinated directly with the engineering team."
            />
            <Capability
              title="General Contracting"
              body="Construction delivery through Phoenix Construction & Management (PCM), our construction branch."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="mb-2 text-5xl font-bold text-primary">{value}</div>
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Advantage({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-card p-8">
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Capability({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-background p-8">
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}