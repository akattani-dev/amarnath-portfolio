import Image from "next/image";

import { LogoPlate } from "@/components/logo-plate";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { offTheClock, volunteering, type CommunityEntry } from "@/content/site";

/**
 * The Education sub-block's heading, lifted so all four blocks here share it.
 * Deliberately unnumbered: the page already runs several independent numbered
 * sequences, and a fifth one inside a single section would read as noise.
 */
function BlockHeading({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <h3 className="font-display text-[0.6875rem] tracking-[0.2em] text-mist-2 uppercase">
        {children}
      </h3>
      <span aria-hidden className="h-px flex-1 bg-ink-line" />
    </div>
  );
}

/** The bordered mono tag the timeline uses for a role's dates. */
function MetaChip({ children }: { children: string }) {
  return (
    <span className="border border-ink-line px-2 py-[3px] font-mono text-[0.625rem] tracking-[0.06em] text-mist-2 uppercase">
      {children}
    </span>
  );
}

/**
 * The page's one red plate — the accent went nearly unused once the project
 * wall dropped to two panels, so this spends a token already budgeted rather
 * than introducing a hue.
 *
 * A team and a driver is the entire extent of what is known here, so that is
 * the entire extent of what this renders: no standings, no lap times, no
 * session or timing furniture, none of which would be true.
 */
function FormulaOnePanel() {
  const { team, driver, note } = offTheClock.formulaOne;

  return (
    <div className="misreg-frame relative flex h-full flex-col overflow-hidden bg-ink-2 p-6 [--misreg-1:var(--brand-red)] lg:p-7">
      <div
        aria-hidden
        className="halftone halftone-red absolute inset-0 [--halftone-opacity:0.18]"
      />

      <div className="relative flex-1">
        <dl>
          <div>
            <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-brand-red uppercase">
              Team
            </dt>
            {/* Plain display type, not a display-pop plate: the car below and
                the frame's red misregistration are already the loud parts of
                this panel, and a third treatment on seven characters only
                muddied them. */}
            <dd className="mt-3 font-display text-[clamp(1.6rem,4vw,2.35rem)] leading-none tracking-[0.04em] text-mist uppercase">
              {team}
            </dd>
          </div>

          <div className="mt-6 border-t border-ink-line pt-5">
            <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-mist-2 uppercase">
              Driver
            </dt>
            <dd className="mt-2.5 font-display text-lg leading-none tracking-[0.04em] text-mist uppercase">
              {driver}
            </dd>
          </div>
        </dl>

        <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-[1.7] text-foreground/75">
          {note}
        </p>
      </div>

      {/* The car as the panel's floor, bled to the edges. Decorative: the team
          and driver above already say everything it says, so it carries no alt.
          Its own ground is black and the plate is near-black, so only the top
          edge needs a scrim to stop the crop reading as a seam. */}
      <div aria-hidden className="relative -mx-6 -mb-6 mt-8 lg:-mx-7 lg:-mb-7">
        <Image
          src="/images/ferrari-f1.jpg"
          alt=""
          width={1024}
          height={512}
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          className="w-full"
        />
        <span
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--ink-2) 0%, transparent 42%)",
          }}
        />
      </div>
    </div>
  );
}

function VolunteeringPanel() {
  return (
    <ul className="grid h-full gap-6">
      {volunteering.map((entry) => (
        <li
          key={`${entry.organisation}-${entry.role}`}
          className="misreg-frame relative bg-ink-2 p-6 lg:p-7"
        >
          <div
            aria-hidden
            className="halftone halftone-cyan absolute inset-0 [--halftone-opacity:0.14]"
          />

          <div className="relative">
            <LogoPlate
              name={entry.organisation}
              mark={entry.mark}
              brand={entry.brand}
              className="size-10"
            />

            <h4 className="mt-5 font-display text-lg leading-none tracking-[0.03em] text-mist uppercase">
              {entry.role}
            </h4>
            <p className="mt-2.5 text-[0.9375rem] leading-6 text-foreground/80">
              {entry.organisation}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <MetaChip>{entry.period}</MetaChip>
              <MetaChip>{entry.cause}</MetaChip>
            </div>

            <p className="mt-5 text-[0.9375rem] leading-[1.7] text-foreground/75">
              {entry.summary}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** A standing commitment: hairline-separated rows, cyan tick. */
function CommitmentRow({ entry }: { entry: CommunityEntry }) {
  return (
    <li className="flex gap-3 border-b border-ink-line py-3.5 first:pt-0 last:border-b-0 last:pb-0">
      <span aria-hidden className="plate-mark plate-mark-sm mt-[5px] text-brand" />
      <div>
        <p className="font-display text-[0.8125rem] leading-snug tracking-[0.07em] text-mist uppercase">
          {entry.title}
        </p>
        {entry.detail && (
          <p className="mt-1.5 text-[0.8125rem] leading-5 text-foreground/70">
            {entry.detail}
          </p>
        )}
      </div>
    </li>
  );
}

/** What came of it: plated cells, magenta tick, so awards do not read as more commitments. */
function RecognitionCell({ entry }: { entry: CommunityEntry }) {
  return (
    <li className="border border-ink-line bg-ink-2 p-4">
      <div className="flex gap-2.5">
        <span
          aria-hidden
          className="plate-mark plate-mark-sm mt-[5px] text-brand-magenta"
        />
        <p className="font-display text-[0.8125rem] leading-snug tracking-[0.07em] text-mist uppercase">
          {entry.title}
        </p>
      </div>
      {entry.detail && (
        <p className="mt-2.5 text-[0.8125rem] leading-5 text-foreground/70">
          {entry.detail}
        </p>
      )}
    </li>
  );
}

/**
 * Commitments and recognitions share the one heading rather than taking a
 * numbered run each — the split is carried by treatment and tick colour, which
 * is enough for two groups that read as "what I do" and "what came of it".
 */
function CommunityBlock() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10">
      <ul>
        {offTheClock.community.map((entry) => (
          <CommitmentRow key={entry.title} entry={entry} />
        ))}
      </ul>

      <ul className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {offTheClock.recognitions.map((entry) => (
          <RecognitionCell key={entry.title} entry={entry} />
        ))}
      </ul>
    </div>
  );
}

/**
 * Hero, work, writing, then this — Formula 1, volunteering, the community
 * commitments that moved out of About's chip strip, and the languages.
 */
export function OffTheClock() {
  return (
    <section id="off-the-clock" className="scroll-mt-20">
      <FadeIn>
        <SectionHeading
          index="05"
          label={offTheClock.label}
          title={offTheClock.title}
        />
      </FadeIn>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <FadeIn delay={0.06} className="flex flex-col">
          <BlockHeading>{offTheClock.headings.formulaOne}</BlockHeading>
          <div className="mt-5 flex-1">
            <FormulaOnePanel />
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="flex flex-col">
          <BlockHeading>{offTheClock.headings.volunteering}</BlockHeading>
          <div className="mt-5 flex-1">
            <VolunteeringPanel />
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.16} className="mt-14">
        <BlockHeading>{offTheClock.headings.community}</BlockHeading>
        <div className="mt-5">
          <CommunityBlock />
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-12">
        <BlockHeading>{offTheClock.headings.languages}</BlockHeading>
        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {offTheClock.languages.map((language, index) => (
            <li
              key={language}
              className="flex items-center gap-4 font-display text-sm tracking-[0.1em] text-mist uppercase"
            >
              {index > 0 && (
                <span aria-hidden className="size-1 shrink-0 rotate-45 bg-brand/60" />
              )}
              {language}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
