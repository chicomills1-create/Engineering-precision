import {
  LICENSED_STATES,
  LICENSING_COVERAGE_STATEMENT,
  PROJECT_JURISDICTION_NOTE,
} from "@/lib/licensing";

export function LicensingCoverage() {
  return (
    <section className="border-y border-border bg-card py-20 md:py-24" aria-labelledby="licensing-coverage-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Licensing coverage
          </p>
          <h2 id="licensing-coverage-heading" className="mb-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Licensed in 49 states
          </h2>
          <p className="mb-3 text-xl leading-relaxed text-foreground/90">
            {LICENSING_COVERAGE_STATEMENT}
          </p>
          <p className="mb-8 text-sm text-muted-foreground">{PROJECT_JURISDICTION_NOTE}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-foreground/80 sm:grid-cols-3 lg:grid-cols-5">
            {LICENSED_STATES.map((state) => <li key={state}>{state}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}