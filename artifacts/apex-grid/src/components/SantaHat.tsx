// SEASONAL — Christmas hat, added 2026-11-10, REMOVE by 2027-01-02.
// Shared Santa hat used on the homepage hero "4" and the header logo mark.
// Flat deeper-red body (contrasts the headline gradient / logo red), thick
// white fur brim + pom-pom do the separation work. Static — no animation.
export function SantaHat({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 84"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {/* Hat body — floppy cone, tip curling to the right */}
      <path
        d="M16 63 C14 31 34 6 58 4 C82 2 100 16 104 34 C106 44 103 53 96 57 L83 51 C87 41 82 29 68 24 C48 17 30 31 28 49 C27 55 28 60 30 63 Z"
        fill="#9E1420"
        stroke="#5E0A10"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Fur brim — thick white band (~20% of hat height) */}
      <rect x="8" y="58" width="98" height="17" rx="8.5" fill="#FFFFFF" />
      <rect
        x="8"
        y="58"
        width="98"
        height="17"
        rx="8.5"
        fill="none"
        stroke="rgba(0,0,0,0.10)"
        strokeWidth="1"
      />
      {/* Pom-pom at the flopped tip */}
      <circle cx="97" cy="56" r="11.5" fill="#FFFFFF" />
      <circle
        cx="97"
        cy="56"
        r="11.5"
        fill="none"
        stroke="rgba(0,0,0,0.10)"
        strokeWidth="1"
      />
    </svg>
  );
}
