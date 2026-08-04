import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start px-6 pt-40 pb-32 lg:px-10">
      <span className="font-mono text-xs text-brand">404</span>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
        Nothing here
      </h1>
      <p className="mt-4 text-[1.05rem] leading-[1.75] text-foreground/80">
        That page does not exist, or it moved. The writing and the work are both
        still where you left them.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild className="h-11 rounded-md bg-ink px-5 text-sm text-mist hover:bg-ink-2">
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-md px-5 text-sm">
          <Link href="/blog">Read the blog</Link>
        </Button>
      </div>
    </div>
  );
}
