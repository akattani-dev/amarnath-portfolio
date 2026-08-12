import { Fragment } from "react";

import { cn } from "@/lib/utils";

/**
 * The three channels a diagram can draw. The hues are not decorative: cyan is
 * data, magenta is agent communication, red is alerts and actions — the same
 * meaning they carry everywhere else on the site.
 */
export type FlowKind = "data" | "agent" | "alert";

export type ArchitectureNode = {
  /** Rendered uppercase by CSS; keep the DOM text readable for screen readers. */
  label: string;
  /** One short line under the label. */
  detail?: string;
  /** Tints the node's top plate. Neutral when omitted. */
  kind?: FlowKind;
};

/** `links[i]` joins node `i` to node `i + 1`. */
export type ArchitectureLink = { kind: FlowKind };

/** Bracket drawn back under the row: the channel that returns upstream. */
export type ArchitectureReturnPath = { label: string; kind?: FlowKind };

/**
 * A whole diagram as data, so a caller can spread one constant:
 * `<ArchitectureDiagram {...AGENT_INTEGRATION_FLOW} />`.
 */
export type ArchitectureFlow = {
  nodes: ArchitectureNode[];
  links?: ArchitectureLink[];
  returnPath?: ArchitectureReturnPath;
  /** Small-caps caption in the diagram's title bar. */
  title?: string;
  /** Replaces the generated `aria-label`. */
  description?: string;
};

type ArchitectureDiagramProps = ArchitectureFlow & { className?: string };

const KIND_ORDER: readonly FlowKind[] = ["data", "agent", "alert"];

type KindMeta = {
  /** Scoped class that sets the track's dim and glow colours. */
  channel: string;
  /** Short label for the legend strip. */
  legend: string;
  /** Long form, for the generated `aria-label`. */
  spoken: string;
  hue: string;
  plate: string;
  border: string;
  text: string;
};

const KIND_META: Record<FlowKind, KindMeta> = {
  data: {
    channel: "ad-data",
    legend: "Data",
    spoken: "data",
    hue: "cyan",
    plate: "bg-brand",
    border: "border-brand",
    text: "text-brand",
  },
  agent: {
    channel: "ad-agent",
    legend: "Agent comms",
    spoken: "agent communication",
    hue: "magenta",
    plate: "bg-brand-magenta",
    border: "border-brand-magenta",
    text: "text-brand-magenta",
  },
  alert: {
    channel: "ad-alert",
    legend: "Alerts & actions",
    spoken: "alerts and actions",
    hue: "red",
    plate: "bg-brand-red",
    border: "border-brand-red",
    text: "text-brand-red",
  },
};

/**
 * Structural CSS the Tailwind utility set cannot express: the dashed connector
 * tracks and the channel colours. Hoisted and deduped by React 19 style
 * precedence, so all copies of the diagram share one rule set.
 *
 * The travelling pulse itself is not here — it rides the `animate-flow-x` /
 * `animate-flow-y` utilities registered in globals.css, and its reduced-motion
 * stop lives in that file's consolidated block, keyed off `.flow-pulse`.
 *
 * These rules are unlayered and Tailwind's utilities are not, so anything
 * declared here outranks a utility on the same element no matter how specific
 * that utility is. `display` therefore stays out of it — the tracks are shown
 * and hidden per breakpoint with `block` / `hidden`.
 */
const DIAGRAM_CSS = `
.ad-track {
  position: relative;
  overflow: hidden;
  background-image: var(--ad-dash);
}
.ad-track-x {
  width: 100%;
  height: 2px;
  --ad-dash: repeating-linear-gradient(90deg, var(--ad-line) 0 3px, transparent 3px 7px);
}
.ad-track-y {
  width: 2px;
  height: 1.75rem;
  --ad-dash: repeating-linear-gradient(180deg, var(--ad-line) 0 3px, transparent 3px 7px);
}
.ad-data { --ad-line: color-mix(in oklab, var(--brand), transparent 58%); --ad-glow: var(--brand); }
.ad-agent { --ad-line: color-mix(in oklab, var(--brand-magenta), transparent 58%); --ad-glow: var(--brand-magenta); }
.ad-alert { --ad-line: color-mix(in oklab, var(--brand-red), transparent 58%); --ad-glow: var(--brand-red); }
.flow-pulse { position: absolute; }
.ad-pulse-x {
  inset-block: 0;
  left: 0;
  width: 40%;
  background: linear-gradient(90deg, transparent, var(--ad-glow), transparent);
}
.ad-pulse-y {
  inset-inline: 0;
  top: 0;
  height: 40%;
  background: linear-gradient(180deg, transparent, var(--ad-glow), transparent);
}
`;

/**
 * The path a natural-language request takes through an MCP-fronted integration
 * estate. Exported as data so any section can drop the same diagram in.
 */
export const AGENT_INTEGRATION_FLOW = {
  title: "Request path",
  nodes: [
    { label: "User", detail: "Natural language" },
    { label: "AI agent", detail: "Plans, calls tools", kind: "agent" },
    { label: "MCP", detail: "Tool contract", kind: "agent" },
    { label: "MuleSoft", detail: "APIs and events", kind: "data" },
    { label: "Enterprise systems", detail: "Salesforce · SAP · ServiceNow", kind: "data" },
  ],
  links: [{ kind: "agent" }, { kind: "agent" }, { kind: "data" }, { kind: "data" }],
  returnPath: { label: "Alerts & actions", kind: "alert" },
} satisfies ArchitectureFlow;

/** The diagram as a sentence, for the `aria-label`. */
function describeFlow({ nodes, links, returnPath }: ArchitectureFlow) {
  const path = nodes.map((node) => node.label).join(", then ");
  const channels = KIND_ORDER.filter((kind) =>
    links?.some((link) => link.kind === kind)
  ).map((kind) => `${KIND_META[kind].hue} carries ${KIND_META[kind].spoken}`);

  const sentences = [`Architecture diagram. Flow: ${path}.`];
  if (channels.length > 0) {
    sentences.push(`Connector colour marks the channel: ${channels.join(", ")}.`);
  }
  if (returnPath) {
    const meta = KIND_META[returnPath.kind ?? "alert"];
    sentences.push(`A ${meta.hue} path labelled ${returnPath.label} returns upstream.`);
  }
  return sentences.join(" ");
}

function DiagramNode({ node, index }: { node: ArchitectureNode; index: number }) {
  return (
    <div className="relative flex w-full min-w-0 flex-col gap-1 border-2 border-ink-line bg-ink-2 px-2.5 py-2.5 @xl:w-auto @xl:flex-1">
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-[3px]",
          node.kind ? KIND_META[node.kind].plate : "bg-mist-2/45"
        )}
      />
      <span className="font-mono text-[0.5625rem] leading-none text-mist-2">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="font-display text-[0.75rem] leading-[1.15] tracking-[0.08em] text-mist uppercase">
        {node.label}
      </span>
      {node.detail && (
        <span className="text-[0.625rem] leading-[1.35] text-mist-2">{node.detail}</span>
      )}
    </div>
  );
}

/**
 * A pulse travelling a dashed track — vertical while the nodes are stacked,
 * horizontal once they sit in a row. Both orientations are rendered and one is
 * hidden, which is cheaper than rotating a single element and keeps the dash
 * pattern from smearing.
 */
function Connector({ kind, index }: { kind: FlowKind; index: number }) {
  const channel = KIND_META[kind].channel;
  const delay = `${(index % 4) * 0.4}s`;

  return (
    <div className="flex shrink-0 items-center justify-center py-1.5 @xl:w-7 @xl:py-0">
      <span className={cn("ad-track ad-track-y block @xl:hidden", channel)}>
        <span
          className="flow-pulse ad-pulse-y animate-flow-y"
          style={{ animationDelay: delay }}
        />
      </span>
      <span className={cn("ad-track ad-track-x hidden @xl:block", channel)}>
        <span
          className="flow-pulse ad-pulse-x animate-flow-x"
          style={{ animationDelay: delay }}
        />
      </span>
    </div>
  );
}

/** Dashed bracket under the row, with the label knocked out of the line. */
function ReturnPath({ label, kind = "alert" }: ArchitectureReturnPath) {
  const meta = KIND_META[kind];

  return (
    <div className="relative mt-3 h-7">
      <span
        className={cn(
          "absolute inset-x-5 inset-y-0 border-x-2 border-b-2 border-dashed opacity-55",
          meta.border
        )}
      />
      {/* A square carrying only its top and left edges: rotated 45°, that
          corner becomes a chevron pointing back up into the row. */}
      <span
        className={cn(
          "absolute top-0 left-5 size-2 -translate-x-1/2 -translate-y-px rotate-45 border-t-2 border-l-2",
          meta.border
        )}
      />
      <span
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-ink px-2 font-display text-[0.5625rem] leading-none tracking-[0.16em] uppercase",
          meta.text
        )}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * A hand-built flow diagram: HTML nodes so the labels stay real, selectable
 * text that reflows, with CSS connectors between them. No SVG viewBox to fight
 * on small screens, and nothing to download.
 *
 * The whole thing is one `role="img"` with a generated `aria-label`, so assistive
 * tech gets the flow as a sentence instead of a pile of orphaned labels.
 *
 * The row turns horizontal on a container query, not a viewport one, so the
 * same diagram can sit full-bleed or inside a narrow column and pick the right
 * orientation on its own.
 */
export function ArchitectureDiagram({
  nodes,
  links,
  returnPath,
  title,
  description,
  className,
}: ArchitectureDiagramProps) {
  const legend = KIND_ORDER.filter(
    (kind) =>
      links?.some((link) => link.kind === kind) ||
      (returnPath ? (returnPath.kind ?? "alert") === kind : false)
  );

  return (
    <>
      <style href="architecture-diagram" precedence="medium">
        {DIAGRAM_CSS}
      </style>

      <div
        role="img"
        aria-label={description ?? describeFlow({ nodes, links, returnPath })}
        className={cn(
          "@container relative border-2 border-ink-line bg-ink p-3 @md:p-4",
          className
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-ink-line pb-2">
          <span className="font-display text-[0.625rem] tracking-[0.18em] text-mist-2 uppercase">
            {title ?? "Architecture"}
          </span>
          {/* Printer's registration strip. */}
          <span className="flex gap-[3px]">
            <span className="size-1.5 bg-brand" />
            <span className="size-1.5 bg-brand-magenta" />
            <span className="size-1.5 bg-brand-red" />
          </span>
        </div>

        <div className="flex flex-col @xl:flex-row">
          {nodes.map((node, index) => (
            <Fragment key={node.label}>
              <DiagramNode node={node} index={index} />
              {index < nodes.length - 1 && (
                <Connector kind={links?.[index]?.kind ?? "data"} index={index} />
              )}
            </Fragment>
          ))}
        </div>

        {returnPath && <ReturnPath {...returnPath} />}

        {legend.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-ink-line pt-2.5">
            {legend.map((kind) => (
              <span key={kind} className="flex items-center gap-1.5">
                <span className={cn("h-[3px] w-4", KIND_META[kind].plate)} />
                <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-mist-2 uppercase">
                  {KIND_META[kind].legend}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
