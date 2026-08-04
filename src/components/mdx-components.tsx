import type { ComponentProps } from "react";
import Link from "next/link";

import type { MDXRemoteProps } from "next-mdx-remote/rsc";

function Anchor({ href = "", ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return <Link href={href} {...props} />;
  }

  return <a href={href} target="_blank" rel="noreferrer noopener" {...props} />;
}

export const mdxComponents: MDXRemoteProps["components"] = {
  a: Anchor,
};
