const CENTER = 360;
const RING = 205;
const OUTER = 285;

/** Six spokes, clock positions 12 / 2 / 4 / 6 / 8 / 10. */
const SPOKES = [-90, -30, 30, 90, 150, 210];

/** The two spokes that print on the magenta plate instead of the cyan one. */
const MAGENTA_SPOKES = new Set([-30, 150]);

const BUS_LINES = [300, 360, 420];

function point(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Number((CENTER + radius * Math.cos(rad)).toFixed(1)),
    y: Number((CENTER + radius * Math.sin(rad)).toFixed(1)),
  };
}

/**
 * The "ghost graphic" behind the hero portrait: an integration topology — hub,
 * spokes, satellite nodes, an inbound bus — drawn as geometry only. Strokes are
 * `currentColor`, so the caller sets the plate colour and its opacity through a
 * text utility.
 */
export function HeroGhostDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 720"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1">
        <circle cx={CENTER} cy={CENTER} r="130" strokeDasharray="3 9" />
        <circle cx={CENTER} cy={CENTER} r={RING} />
        <circle cx={CENTER} cy={CENTER} r={OUTER} strokeDasharray="15 11" />
        <circle cx={CENTER} cy={CENTER} r="345" strokeDasharray="2 13" />

        <rect
          x="316"
          y="316"
          width="88"
          height="88"
          transform={`rotate(45 ${CENTER} ${CENTER})`}
        />
        <circle cx={CENTER} cy={CENTER} r="27" />
        <circle cx={CENTER} cy={CENTER} r="4.5" fill="currentColor" stroke="none" />

        {BUS_LINES.map((y) => (
          <g key={y}>
            <path d={`M0 ${y}H${CENTER - RING}`} strokeDasharray="26 8" />
            <rect x="46" y={y - 5} width="10" height="10" />
            <rect x="104" y={y - 5} width="10" height="10" />
          </g>
        ))}
      </g>

      {SPOKES.map((angle) => {
        const node = point(angle, RING);
        const tip = point(angle, OUTER);
        const magenta = MAGENTA_SPOKES.has(angle);

        return (
          <g
            key={angle}
            stroke={magenta ? "var(--brand-magenta)" : "currentColor"}
            strokeWidth="1"
            opacity={magenta ? 0.85 : 1}
          >
            <path d={`M${CENTER} ${CENTER}L${tip.x} ${tip.y}`} />
            <rect
              x={node.x - 8}
              y={node.y - 8}
              width="16"
              height="16"
              transform={`rotate(45 ${node.x} ${node.y})`}
              fill="var(--ink)"
            />
            <circle cx={tip.x} cy={tip.y} r="5.5" />
          </g>
        );
      })}
    </svg>
  );
}
