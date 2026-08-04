export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  period?: string;
  href?: string;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  /**
   * Simple Icons slug, resolved through cdn.simpleicons.org. No role sets one
   * today: Simple Icons has dropped every enterprise mark used here over
   * trademark, and a slug that 404s costs a failed request and a console error
   * before the initial square takes over. Kept for self-hosted marks later.
   */
  slug?: string;
  /** Brand hex. Colours the CDN mark, and fills the initial square when no slug exists. */
  brand?: string;
};

export type Education = {
  institution: string;
  credential: string;
  period?: string;
};

export const site = {
  name: "Amarnath Kattani",
  shortName: "Amarnath Kattani",
  url: "https://akattani.com",
  role: "Senior Technical Consultant · Integration Architect · Agentic AI",
  location: "Bengaluru, India",
  description:
    "Integration architect and agentic AI practitioner. Enterprise platforms by day; experiments and writing on how AI reshapes technical work.",
  email: "hello.akattani@gmail.com",
} as const;

export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amarnath-kattani/",
    handle: "amarnath-kattani",
  },
  { label: "X", href: "https://x.com/AmarnathKattani", handle: "@AmarnathKattani" },
  { label: "GitHub", href: "https://github.com/akattani-dev", handle: "akattani-dev" },
];

export const hero = {
  eyebrow: site.location,
  headline: site.role,
  supporting:
    "Integration platforms that move enterprise data — and the agents starting to operate them.",
  ctas: [
    { label: "View work", href: "#work" },
    { label: "Read the blog", href: "/blog" },
    { label: "Get in touch", href: "#contact" },
  ],
} as const;

export const about = {
  title: "Enterprise integration, and what agents are doing to it",
  paragraphs: [
    "Senior Technical Consultant at Salesforce, in the Global Delivery Centre for MuleSoft, embedded with Heineken — nine-plus years on integration architecture. Much of it multi-cloud: Salesforce, SAP and ServiceNow, with Azure DevOps and Jenkins CI/CD that cut manual effort by around 40%, at 5/5 CSAT with zero escalations.",
    "A well-governed integration estate is, functionally, a catalogue of tools an agent can call — which turns integration architecture into agent architecture. My recent work sits on that line: agent fabrics, MCP servers and IDE tooling.",
  ],
  writingNote: {
    prefix: "I write about that shift on ",
    linkLabel: "the blog",
    suffix: ".",
  },
  /** First four render as chips; the rest collapse into a `+n` counter. */
  certifications: [
    "MuleSoft Certified Developer – L1",
    "MuleSoft Certified Developer – L2",
    "MuleSoft Certified Integration Architect",
    "MuleSoft Certified Platform Architect",
    "MuleSoft Integration Associate",
    "Salesforce AI Associate",
    "Microsoft Azure Fundamentals (AZ-900)",
    "API Academy – Designer, Product Manager & Security Architect",
  ],
  /** Focus, community, recognition and languages, flattened into one strip. */
  chips: [
    "Enterprise integration architecture",
    "Agentic AI & Model Context Protocol",
    "Developer experience tooling",
    "Multi-cloud integration",
    "MuleSoft Ambassador programme",
    "TrailGuide mentoring",
    "Catalyst session — \u201cStop Clicking, Start Conversing\u201d",
    "Culture Guide Hub coordinator, Bangalore",
    "Toastmasters — Salesforce Bangalore Club, Level 1",
    "AI Champion nomination — GDC leadership",
    "Innovation Gladiator (Dot of Fame)",
    "Trailhead Triple Star Ranger",
    "English, Kannada, Hindi",
  ],
} as const;

export const projects: Project[] = [
  {
    title: "Heineken Agent Fabric Network",
    period: "2026",
    summary:
      "Architected an end-to-end MuleSoft Agent Network V2 for Heineken — Broker orchestrator, MCP Server and Ops Agent in concert.",
    tags: ["Agent Network V2", "MuleSoft", "MCP", "Orchestration"],
  },
  {
    title: "TrailBrewer",
    summary:
      "Natural-language operation of the Anypoint Platform. 1st of nine teams; the win led to an invitation to present to Heineken's CTO.",
    tags: ["Agent Fabric", "Omni Gateway", "A2A", "MCP", "Anypoint Platform"],
  },
  {
    title: "MuleSoft MCP Server POC — Heineken Leadership Demo",
    summary:
      "A fast-turnaround MCP Server proof-of-concept: AI agents operating the MuleSoft Platform in natural language.",
    tags: ["MCP", "MuleSoft", "Agentic AI"],
  },
  {
    title: "Anypoint Studio Claude Code Plugin",
    summary:
      "A Claude Code chat panel inside Anypoint Studio, with a semantic view of Mule projects — flows, connectors, specs and MUnit suites.",
    tags: ["Anypoint Studio", "Claude Code", "Developer Tools", "Internal Beta"],
  },
  {
    title: "GDC Platform Vertex Agent (PVA) — VS Code Extension",
    summary:
      "Published a new version of the PVA VS Code extension: 60+ tools across 15+ use cases, on GitHub Copilot or Azure OpenAI.",
    tags: ["VS Code", "Anypoint Platform", "GitHub Copilot", "Azure OpenAI"],
  },
  {
    title: "Azure Key Vault Certificate Downloader Connector",
    summary:
      "A Mule 4 connector on the Heineken Exchange for downloading certificates from Azure Key Vault, with a utility on GitHub Pages.",
    tags: ["MuleSoft", "Azure Key Vault", "Mule 4 Connector"],
  },
  {
    title: "Certificate Rotation MCP Workflow",
    summary:
      "A Jira-coupled certificate rotation flow, redesigned into a source-agnostic MCP workflow where no secrets pass through the LLM.",
    tags: ["MCP", "Security", "Automation"],
  },
  {
    title: "Solace Reconnect-Interval Fix",
    summary:
      "Diagnosed and resolved a Solace reconnect-interval issue that had been creating a platform connectivity gap for Heineken.",
    tags: ["Solace", "Event-Driven"],
  },
];

export const experience: Role[] = [
  {
    company: "Salesforce",
    title: "Senior Technical Consultant",
    period: "Jan 2024 — Present",
    brand: "#00A1E0",
  },
  {
    company: "Deloitte",
    title: "Senior Technical Consultant",
    period: "May 2021 — Dec 2023",
    brand: "#86BC25",
  },
  {
    company: "Accenture",
    title: "Application Development Analyst",
    period: "Jan 2017 — Apr 2021",
    brand: "#A100FF",
  },
];

export const education: Education[] = [
  {
    credential: "B.E. Computer Science",
    institution: "Sir M. Visvesvaraya Institute of Technology",
  },
  {
    credential: "Design Thinking",
    institution: "Indian Institute of Management Bangalore",
  },
  {
    credential: "Advanced AI & Emerging Tech (AIET)",
    institution: "IIT Hyderabad",
    period: "2025–2026",
  },
];

export const contact = {
  title: "Contact",
  lead: "Open to conversations about integration architecture, agentic AI, and the tooling that sits between them.",
  email: site.email,
} as const;
