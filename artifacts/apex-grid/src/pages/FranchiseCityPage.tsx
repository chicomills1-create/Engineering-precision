import { useParams } from "wouter";
import { useMemo } from "react";

/**
 * Dynamic franchise rollout page: /franchise/:category/:city/:state/
 * 
 * Serves all franchise × city combinations dynamically.
 * Example: /franchise/fast-food-franchise/austin/texas/
 * 
 * 10 categories × 19,355 cities = 193,550 URLs
 */

const CATEGORIES: Record<string, { name: string; title: string; description: string }> = {
  "fast-food-franchise": {
    name: "Fast Food Franchise",
    title: "Fast Food Franchise Engineering",
    description: "MEP and structural engineering for fast food franchise locations. Rapid prototype adaptation, health department compliance, grease interceptor design, and 49-state PE stamping for multi-site rollouts."
  },
  "coffee-shop-franchise": {
    name: "Coffee Shop Franchise", 
    title: "Coffee Shop Franchise Engineering",
    description: "Engineering for coffee shop franchise buildouts. Plumbing for espresso systems, electrical for commercial equipment, HVAC design, and streamlined permitting across all 49 licensed states."
  },
  "fitness-franchise": {
    name: "Fitness Franchise",
    title: "Fitness Franchise Engineering", 
    description: "Structural and MEP engineering for fitness franchise locations. Floor loading for heavy equipment, locker room plumbing, HVAC for high-occupancy spaces, and rapid multi-site deployment."
  },
  "retail-franchise": {
    name: "Retail Franchise",
    title: "Retail Franchise Engineering",
    description: "Engineering services for retail franchise locations. Storefront structural design, MEP systems for retail spaces, lighting design, and 49-state rollout support with 24-hour quotes."
  },
  "restaurant-franchise": {
    name: "Restaurant Franchise",
    title: "Restaurant Franchise Engineering",
    description: "Full-service engineering for restaurant franchise locations. Commercial kitchen MEP, dining room HVAC, plumbing and grease waste systems, with prototype-to-permit in weeks not months."
  },
  "hotel-franchise": {
    name: "Hotel Franchise",
    title: "Hotel Franchise Engineering",
    description: "MEP and structural engineering for hotel franchise properties. Guest room HVAC, fire protection, plumbing risers, and multi-story structural design backed by 49-state licensure."
  },
  "automotive-franchise": {
    name: "Automotive Franchise",
    title: "Automotive Franchise Engineering",
    description: "Engineering for automotive franchise locations — dealerships, service centers, car washes. Structural bays, compressed air systems, oil/water separators, and EV charging infrastructure."
  },
  "healthcare-franchise": {
    name: "Healthcare Franchise",
    title: "Healthcare Franchise Engineering",
    description: "Specialized engineering for healthcare franchise locations. Medical gas systems, exam room HVAC, ADA compliance, infection control, and expedited permitting for urgent care and dental franchises."
  },
  "education-franchise": {
    name: "Education Franchise",
    title: "Education Franchise Engineering",
    description: "Engineering for education franchise locations — tutoring centers, daycares, martial arts studios. Classroom HVAC, playground structural, fire safety, and child-care code compliance."
  },
  "convenience-store-franchise": {
    name: "Convenience Store Franchise",
    title: "Convenience Store Franchise Engineering",
    description: "Engineering for convenience store and gas station franchises. Fuel system design, canopy structural, refrigeration MEP, and 24-hour turnaround on multi-site rollouts."
  }
};

function slugToCity(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugToState(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function FranchiseCityPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const citySlug = params.city as string;
  const stateSlug = params.state as string;

  const category = CATEGORIES[categorySlug];
  const city = useMemo(() => slugToCity(citySlug || ''), [citySlug]);
  const state = useMemo(() => slugToState(stateSlug || ''), [stateSlug]);

  if (!category || !city || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p>The requested franchise engineering page could not be found.</p>
        </div>
      </div>
    );
  }

  const pageTitle = `${category.title} in ${city}, ${state} | Apex Grid`;
  const metaDescription = `${category.description} ${category.name} engineering services in ${city}, ${state} with 49-state PE licensure and 24-hour quotes.`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO meta would be handled by react-helmet or similar */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> {' > '}
          <a href="/franchise-rollouts" className="hover:underline">Franchise Rollouts</a> {' > '}
          <span>{category.name}</span> {' > '}
          <span>{city}, {state}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">
          {category.title} in {city}, {state}
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          {metaDescription}
        </p>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {category.name} Engineering Services in {city}
          </h2>
          <p className="mb-4">
            Apex Grid Engineering delivers {category.name.toLowerCase()} engineering services 
            in {city}, {state} with the speed national brands demand. Our 49-state PE licensure 
            means one contract covers your entire rollout — no juggling local engineers in 
            every market.
          </p>
          <p className="mb-4">
            {category.description}
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Why National Franchises Choose Apex Grid
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>49-State Licensure:</strong> One firm, one contract, all locations. No coordinating with 20 different local engineers.</li>
            <li><strong>24-Hour Quotes:</strong> Get your engineering quote in 12-24 hours, not 2-4 weeks. Keep your rollout on schedule.</li>
            <li><strong>Prototype-to-Permit:</strong> We adapt your prototype plans for local codes and get them permit-ready in weeks.</li>
            <li><strong>Multi-Site Expertise:</strong> We've engineered franchise locations across the country. We know what works.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {category.name} Engineering in {city}, {state}: What We Deliver
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>MEP engineering (mechanical, electrical, plumbing) stamped for {state} permits</li>
            <li>Structural engineering and calculations</li>
            <li>Local code compliance review for {city} building department</li>
            <li>Permit expediting support</li>
            <li>Prototype plan adaptation for {city}-specific requirements</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-3">Get Your {city} Site Engineered</h3>
            <p className="mb-4">
              Send us your site address and prototype plans. We'll have a quote back 
              in 24 hours and permit-ready drawings in weeks.
            </p>
            <a 
              href="/estimate" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send Us Your Site Address
            </a>
          </div>
        </div>

        <div className="border-t pt-8 mt-12">
          <p className="text-sm text-gray-500">
            Apex Grid Engineering PLLC is licensed in 49 states, including {state}. 
            Professional engineering services for {category.name.toLowerCase()} locations 
            in {city} and surrounding areas.
          </p>
        </div>
      </main>
    </div>
  );
}
