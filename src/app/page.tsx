import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Flat rhythm: one gap between sections rather than per-section padding
          and full-bleed dividers. */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:px-10 lg:py-20">
        <About />
        <Work />
        <Experience />
        <Contact />
      </div>
    </>
  );
}
