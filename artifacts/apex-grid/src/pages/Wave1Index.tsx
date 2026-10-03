import { Link } from "wouter";
import { useEffect } from "react";

/** Wave 1 index hub: /wave1/ — links to 6 service hubs. */
const SERVICE_HUBS = [
  { slug: "structural-engineering", title: "Structural Engineering", description: "Structural engineering for commercial, residential, and industrial buildings \u2014 foundation design, framing systems, lateral force resisting systems, and structur" },
  { slug: "mep-engineering", title: "MEP Engineering", description: "Full mechanical, electrical, and plumbing engineering \u2014 integrated MEP design for new construction, renovations, and tenant improvements. HVAC load calculations" },
  { slug: "electrical-engineering", title: "Electrical Engineering", description: "Electrical engineering for buildings and sites \u2014 power distribution, lighting design, fire alarm, and emergency systems. Service entrance sizing, panel schedule" },
  { slug: "mechanical-hvac-engineering", title: "Mechanical & HVAC Engineering", description: "Mechanical and HVAC engineering \u2014 heating, cooling, ventilation, and building controls designed for comfort, efficiency, and code compliance. ACCA Manual J/S/D " },
  { slug: "plumbing-engineering", title: "Plumbing Engineering", description: "Plumbing engineering for commercial and residential projects \u2014 domestic water, sanitary waste and vent, storm drainage, natural gas, and medical gas systems. Fi" },
  { slug: "civil-engineering", title: "Civil Engineering", description: "Civil engineering for land development and site infrastructure \u2014 grading and drainage, utilities, paving, and stormwater management. Site plans, erosion control" },
];

export default function Wave1Index() {
  useEffect(() => { document.title = "Engineering Services by Location | Apex Grid"; }, []);
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a>{" > "}
          <span>Engineering Services by Location</span>
        </nav>
        <h1 className="text-4xl font-bold mb-6">Engineering Services in Every Major Metro</h1>
        <p className="text-lg text-gray-700 mb-8">
          Apex Grid Engineering delivers structural, MEP, electrical, mechanical, plumbing, and civil 
          engineering in 49 states. Select a discipline to find licensed engineers in your market.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICE_HUBS.map((s) => (
            <Link key={s.slug} href={`/wave1/${s.slug}/`}>
              <a className="block border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-2">{s.title}</h2>
                <p className="text-gray-600">{s.description}...</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}