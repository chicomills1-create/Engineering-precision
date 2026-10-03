import { useParams, Link } from "wouter";
import { useEffect } from "react";

/** Wave 1 service hub: /wave1/:service/ — links to state hubs for that service. */
const SERVICE_TITLES: Record<string, string> = {
  "structural-engineering": "Structural Engineering",
  "mep-engineering": "MEP Engineering",
  "electrical-engineering": "Electrical Engineering",
  "mechanical-hvac-engineering": "Mechanical & HVAC Engineering",
  "plumbing-engineering": "Plumbing Engineering",
  "civil-engineering": "Civil Engineering",
};

// service slug -> [{state, state_slug}]
const SERVICE_STATES: Record<string, Array<{state: string; state_slug: string}>> = {
  "civil-engineering": [
    { state: "Alabama", state_slug: "alabama" },
    { state: "Arizona", state_slug: "arizona" },
    { state: "Arkansas", state_slug: "arkansas" },
    { state: "California", state_slug: "california" },
    { state: "Colorado", state_slug: "colorado" },
    { state: "Florida", state_slug: "florida" },
    { state: "Georgia", state_slug: "georgia" },
    { state: "Illinois", state_slug: "illinois" },
    { state: "Indiana", state_slug: "indiana" },
    { state: "Kentucky", state_slug: "kentucky" },
    { state: "Louisiana", state_slug: "louisiana" },
    { state: "Maryland", state_slug: "maryland" },
    { state: "Massachusetts", state_slug: "massachusetts" },
    { state: "Michigan", state_slug: "michigan" },
    { state: "Minnesota", state_slug: "minnesota" },
    { state: "Missouri", state_slug: "missouri" },
    { state: "Nevada", state_slug: "nevada" },
    { state: "New Mexico", state_slug: "new-mexico" },
    { state: "New York", state_slug: "new-york" },
    { state: "North Carolina", state_slug: "north-carolina" },
    { state: "Ohio", state_slug: "ohio" },
    { state: "Oklahoma", state_slug: "oklahoma" },
    { state: "Oregon", state_slug: "oregon" },
    { state: "Pennsylvania", state_slug: "pennsylvania" },
    { state: "Tennessee", state_slug: "tennessee" },
    { state: "Texas", state_slug: "texas" },
    { state: "Utah", state_slug: "utah" },
    { state: "Virginia", state_slug: "virginia" },
    { state: "Washington", state_slug: "washington" },
    { state: "Wisconsin", state_slug: "wisconsin" },
  ],
  "electrical-engineering": [
    { state: "Alabama", state_slug: "alabama" },
    { state: "Arizona", state_slug: "arizona" },
    { state: "Arkansas", state_slug: "arkansas" },
    { state: "California", state_slug: "california" },
    { state: "Colorado", state_slug: "colorado" },
    { state: "Florida", state_slug: "florida" },
    { state: "Georgia", state_slug: "georgia" },
    { state: "Illinois", state_slug: "illinois" },
    { state: "Indiana", state_slug: "indiana" },
    { state: "Kentucky", state_slug: "kentucky" },
    { state: "Louisiana", state_slug: "louisiana" },
    { state: "Maryland", state_slug: "maryland" },
    { state: "Massachusetts", state_slug: "massachusetts" },
    { state: "Michigan", state_slug: "michigan" },
    { state: "Minnesota", state_slug: "minnesota" },
    { state: "Missouri", state_slug: "missouri" },
    { state: "Nevada", state_slug: "nevada" },
    { state: "New Mexico", state_slug: "new-mexico" },
    { state: "New York", state_slug: "new-york" },
    { state: "North Carolina", state_slug: "north-carolina" },
    { state: "Ohio", state_slug: "ohio" },
    { state: "Oklahoma", state_slug: "oklahoma" },
    { state: "Oregon", state_slug: "oregon" },
    { state: "Pennsylvania", state_slug: "pennsylvania" },
    { state: "Tennessee", state_slug: "tennessee" },
    { state: "Texas", state_slug: "texas" },
    { state: "Utah", state_slug: "utah" },
    { state: "Virginia", state_slug: "virginia" },
    { state: "Washington", state_slug: "washington" },
    { state: "Wisconsin", state_slug: "wisconsin" },
  ],
  "mechanical-hvac-engineering": [
    { state: "Alabama", state_slug: "alabama" },
    { state: "Arizona", state_slug: "arizona" },
    { state: "Arkansas", state_slug: "arkansas" },
    { state: "California", state_slug: "california" },
    { state: "Colorado", state_slug: "colorado" },
    { state: "Florida", state_slug: "florida" },
    { state: "Georgia", state_slug: "georgia" },
    { state: "Illinois", state_slug: "illinois" },
    { state: "Indiana", state_slug: "indiana" },
    { state: "Kentucky", state_slug: "kentucky" },
    { state: "Louisiana", state_slug: "louisiana" },
    { state: "Maryland", state_slug: "maryland" },
    { state: "Massachusetts", state_slug: "massachusetts" },
    { state: "Michigan", state_slug: "michigan" },
    { state: "Minnesota", state_slug: "minnesota" },
    { state: "Missouri", state_slug: "missouri" },
    { state: "Nevada", state_slug: "nevada" },
    { state: "New Mexico", state_slug: "new-mexico" },
    { state: "New York", state_slug: "new-york" },
    { state: "North Carolina", state_slug: "north-carolina" },
    { state: "Ohio", state_slug: "ohio" },
    { state: "Oklahoma", state_slug: "oklahoma" },
    { state: "Oregon", state_slug: "oregon" },
    { state: "Pennsylvania", state_slug: "pennsylvania" },
    { state: "Tennessee", state_slug: "tennessee" },
    { state: "Texas", state_slug: "texas" },
    { state: "Utah", state_slug: "utah" },
    { state: "Virginia", state_slug: "virginia" },
    { state: "Washington", state_slug: "washington" },
    { state: "Wisconsin", state_slug: "wisconsin" },
  ],
  "mep-engineering": [
    { state: "Alabama", state_slug: "alabama" },
    { state: "Arizona", state_slug: "arizona" },
    { state: "Arkansas", state_slug: "arkansas" },
    { state: "California", state_slug: "california" },
    { state: "Colorado", state_slug: "colorado" },
    { state: "Florida", state_slug: "florida" },
    { state: "Georgia", state_slug: "georgia" },
    { state: "Illinois", state_slug: "illinois" },
    { state: "Indiana", state_slug: "indiana" },
    { state: "Kentucky", state_slug: "kentucky" },
    { state: "Louisiana", state_slug: "louisiana" },
    { state: "Maryland", state_slug: "maryland" },
    { state: "Massachusetts", state_slug: "massachusetts" },
    { state: "Michigan", state_slug: "michigan" },
    { state: "Minnesota", state_slug: "minnesota" },
    { state: "Missouri", state_slug: "missouri" },
    { state: "Nevada", state_slug: "nevada" },
    { state: "New Mexico", state_slug: "new-mexico" },
    { state: "New York", state_slug: "new-york" },
    { state: "North Carolina", state_slug: "north-carolina" },
    { state: "Ohio", state_slug: "ohio" },
    { state: "Oklahoma", state_slug: "oklahoma" },
    { state: "Oregon", state_slug: "oregon" },
    { state: "Pennsylvania", state_slug: "pennsylvania" },
    { state: "Tennessee", state_slug: "tennessee" },
    { state: "Texas", state_slug: "texas" },
    { state: "Utah", state_slug: "utah" },
    { state: "Virginia", state_slug: "virginia" },
    { state: "Washington", state_slug: "washington" },
    { state: "Wisconsin", state_slug: "wisconsin" },
  ],
  "plumbing-engineering": [
    { state: "Alabama", state_slug: "alabama" },
    { state: "Arizona", state_slug: "arizona" },
    { state: "Arkansas", state_slug: "arkansas" },
    { state: "California", state_slug: "california" },
    { state: "Colorado", state_slug: "colorado" },
    { state: "Florida", state_slug: "florida" },
    { state: "Georgia", state_slug: "georgia" },
    { state: "Illinois", state_slug: "illinois" },
    { state: "Indiana", state_slug: "indiana" },
    { state: "Kentucky", state_slug: "kentucky" },
    { state: "Louisiana", state_slug: "louisiana" },
    { state: "Maryland", state_slug: "maryland" },
    { state: "Massachusetts", state_slug: "massachusetts" },
    { state: "Michigan", state_slug: "michigan" },
    { state: "Minnesota", state_slug: "minnesota" },
    { state: "Missouri", state_slug: "missouri" },
    { state: "Nevada", state_slug: "nevada" },
    { state: "New Mexico", state_slug: "new-mexico" },
    { state: "New York", state_slug: "new-york" },
    { state: "North Carolina", state_slug: "north-carolina" },
    { state: "Ohio", state_slug: "ohio" },
    { state: "Oklahoma", state_slug: "oklahoma" },
    { state: "Oregon", state_slug: "oregon" },
    { state: "Pennsylvania", state_slug: "pennsylvania" },
    { state: "Tennessee", state_slug: "tennessee" },
    { state: "Texas", state_slug: "texas" },
    { state: "Utah", state_slug: "utah" },
    { state: "Virginia", state_slug: "virginia" },
    { state: "Washington", state_slug: "washington" },
    { state: "Wisconsin", state_slug: "wisconsin" },
  ],
  "structural-engineering": [
    { state: "Alabama", state_slug: "alabama" },
    { state: "Arizona", state_slug: "arizona" },
    { state: "Arkansas", state_slug: "arkansas" },
    { state: "California", state_slug: "california" },
    { state: "Colorado", state_slug: "colorado" },
    { state: "Florida", state_slug: "florida" },
    { state: "Georgia", state_slug: "georgia" },
    { state: "Illinois", state_slug: "illinois" },
    { state: "Indiana", state_slug: "indiana" },
    { state: "Kentucky", state_slug: "kentucky" },
    { state: "Louisiana", state_slug: "louisiana" },
    { state: "Maryland", state_slug: "maryland" },
    { state: "Massachusetts", state_slug: "massachusetts" },
    { state: "Michigan", state_slug: "michigan" },
    { state: "Minnesota", state_slug: "minnesota" },
    { state: "Missouri", state_slug: "missouri" },
    { state: "Nevada", state_slug: "nevada" },
    { state: "New Mexico", state_slug: "new-mexico" },
    { state: "New York", state_slug: "new-york" },
    { state: "North Carolina", state_slug: "north-carolina" },
    { state: "Ohio", state_slug: "ohio" },
    { state: "Oklahoma", state_slug: "oklahoma" },
    { state: "Oregon", state_slug: "oregon" },
    { state: "Pennsylvania", state_slug: "pennsylvania" },
    { state: "Tennessee", state_slug: "tennessee" },
    { state: "Texas", state_slug: "texas" },
    { state: "Utah", state_slug: "utah" },
    { state: "Virginia", state_slug: "virginia" },
    { state: "Washington", state_slug: "washington" },
    { state: "Wisconsin", state_slug: "wisconsin" },
  ],
};

export default function Wave1ServiceHub() {
  const params = useParams();
  const serviceSlug = params.service as string;
  const title = SERVICE_TITLES[serviceSlug];
  const states = SERVICE_STATES[serviceSlug];
  useEffect(() => { if (title) document.title = `${title} by State | Apex Grid`; }, [title]);
  if (!title || !states) {
    return (<div className="min-h-screen flex items-center justify-center"><p>Page not found.</p></div>);
  }
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a>{" > "}
          <a href="/wave1/" className="hover:underline">Services by Location</a>{" > "}
          <span>{title}</span>
        </nav>
        <h1 className="text-4xl font-bold mb-6">{title} by State</h1>
        <p className="text-lg text-gray-700 mb-8">
          Select your state to find licensed {title.toLowerCase()} engineers in your metro.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {states.map((s) => (
            <Link key={s.state_slug} href={`/wave1/${serviceSlug}/${s.state_slug}/`}>
              <a className="block border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold">{s.state}</h2>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}