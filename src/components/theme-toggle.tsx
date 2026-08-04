"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md transition-colors duration-150",
        className
      )}
    >
      {/* Swapped in CSS off the root `.dark` class so the markup is identical on
          the server and the client, with no mount guard and no flash. */}
      <Sun className="hidden size-[1.05rem] dark:block" />
      <Moon className="size-[1.05rem] dark:hidden" />
    </button>
  );
}
