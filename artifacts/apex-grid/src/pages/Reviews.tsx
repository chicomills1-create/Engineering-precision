import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/lib/seo";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Apex+Grid+Engineering+PLLC+Queen+Creek+AZ";

const REVIEWS = [
  {
    name: "Nayon Iovino",
    date: "1 week ago",
    quote:
      "Great costumer service. Speedy work with quality. I strongly recommend!",
  },
  {
    name: "Griffin Phillips",
    date: "1 week ago",
    quote:
      "Apex was great to work with! We had a project that required both structural and MEP engineering and they got us taken care of promptly! They will definitely be getting our next projects.",
  },
  {
    name: "James Wadlund",
    date: "2 weeks ago",
    quote:
      "I had an issue at my home that required an engineer to draw plans and stamp them. Most firms turned me down, but not APEX Grid. Jeremy Mills was fantastic to work with. Honestly some of the best communication I've received from a business in years.",
  },
  {
    name: "Ammad Riaz",
    date: "3 weeks ago",
    quote:
      "Jeremy is a great communicator. I trust him on projects to be responsive until the job is done. I would definitely consider him for engineering projects!",
  },
];

function GoogleG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
  );
}

export default function Reviews() {
  usePageMeta({
    title: "Google Reviews | Apex Grid Engineering",
    description: "Read real Google reviews from Apex Grid Engineering clients — 5.0 stars for MEP, structural, and civil engineering services.",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GoogleG size={36} />
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white">
              Google Reviews
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-6" aria-label="Rated 5.0 out of 5 on Google">
            <span className="text-[#FBBC05] text-2xl tracking-tight" aria-hidden="true">★★★★★</span>
            <span className="text-muted-foreground font-medium">5.0 · 4 reviews on Google</span>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every review below is from a real client on Google. Click through to verify any of them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="bg-card border border-border hover:border-primary/60 p-8 rounded-sm flex flex-col transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#FBBC05] text-lg" aria-hidden="true">★★★★★</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <blockquote className="text-foreground/90 leading-relaxed mb-6 flex-1">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <GoogleG size={20} />
                <div>
                  <div className="text-white font-bold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">Posted on Google</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <GoogleG size={20} />
            See all reviews on Google
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
