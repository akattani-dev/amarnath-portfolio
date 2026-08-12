import { PlatformStrip } from "@/components/platform-strip";
import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { StatStrip } from "@/components/stat-strip";

export default function Home() {
  return (
    <>
      <Hero />
      {/* The stats substantiate the hero claim, then the platform marquee
          carries the eye into About. Both are full-bleed plates: they paint
          straight onto the canvas ramp and own their own padding. */}
      <StatStrip />
      <PlatformStrip />
      {/* One shell for the panelled sections. It runs wider than the reading
          measure so the comic frames read as cinematic panels; each section
          keeps its own max-width on the copy inside. */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-20 lg:gap-28 lg:px-10 lg:py-28">
        <About />
        <Work />
        <Experience />
        <Blog />
        <Contact />
      </div>
    </>
  );
}
