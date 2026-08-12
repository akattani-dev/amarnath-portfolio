import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

// Satori (the renderer behind ImageResponse) can't read CSS custom properties
// or Tailwind classes, so these are the --ink/--mist/--brand values from
// globals.css, hardcoded.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08090D",
          color: "#F4F6F8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 260, height: 8 }}>
          <div style={{ flex: 1, background: "#00E5FF" }} />
          <div style={{ flex: 1, background: "#FF176B" }} />
          <div style={{ flex: 1, background: "#FF3B30" }} />
        </div>

        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#98A1AF",
            marginTop: 40,
          }}
        >
          {site.location}
        </div>

        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -1,
            textTransform: "uppercase",
            marginTop: 20,
            // Misregistered plates — the one effect from the site's visual
            // language that survives at card size.
            textShadow: "5px 5px 0 #FF176B, -5px -5px 0 #00E5FF",
          }}
        >
          {site.name}
        </div>

        <div style={{ fontSize: 32, color: "#00E5FF", marginTop: 30 }}>
          {site.role}
        </div>
      </div>
    ),
    size
  );
}
