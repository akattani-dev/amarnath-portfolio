import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      // Apex is the canonical host; www is attached to the project only so it
      // resolves rather than erroring.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.akattani.com" }],
        destination: "https://akattani.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
