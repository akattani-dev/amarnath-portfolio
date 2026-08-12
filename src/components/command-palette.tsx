"use client";

import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { nav } from "@/content/site";
import type { PostMeta } from "@/lib/blog";

type CommandPaletteProps = {
  posts: PostMeta[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ posts, open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to a section or post…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Sections">
          {nav.map((item) => (
            <CommandItem key={item.href} onSelect={() => go(item.href)}>
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        {posts.length > 0 && (
          <CommandGroup heading="Writing">
            {posts.map((post) => (
              <CommandItem key={post.slug} onSelect={() => go(`/blog/${post.slug}`)}>
                {post.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
