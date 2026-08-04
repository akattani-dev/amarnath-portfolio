import type { ComponentProps } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";

import type { MDXRemoteProps } from "next-mdx-remote/rsc";

import { ZoomableImage } from "@/components/zoomable-image";

function Anchor({ href = "", ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return <Link href={href} {...props} />;
  }

  return <a href={href} target="_blank" rel="noreferrer noopener" {...props} />;
}

/**
 * Fenced blocks get sugar-high tokens; inline code keeps the prose treatment.
 * The injected HTML is safe: sugar-high escapes its input, and the only source
 * of MDX is the repo's own `content/blog` directory, rendered at build time.
 */
function Code({ children, className, ...props }: ComponentProps<"code">) {
  const isFenced =
    typeof className === "string" &&
    className.startsWith("language-") &&
    typeof children === "string";

  if (!isFenced) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <code
      className={className}
      dangerouslySetInnerHTML={{ __html: highlight(children as string) }}
      {...props}
    />
  );
}

export const mdxComponents: MDXRemoteProps["components"] = {
  a: Anchor,
  code: Code,
  img: ZoomableImage,
};
