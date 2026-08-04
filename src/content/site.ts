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
    "I work at the intersection of enterprise integration and agentic AI — building the platforms that move data between systems, and the agents that are starting to operate them.",
  ctas: [
    { label: "View work", href: "#work" },
    { label: "Read the blog", href: "/blog" },
    { label: "Get in touch", href: "#contact" },
  ],
} as const;

export const about = {
  title: "Enterprise integration, and what agents are doing to it",
  paragraphs: [
    "I am a Senior Technical Consultant at Salesforce, in the Global Delivery Centre for MuleSoft, currently embedded with Heineken. That is nine-plus years into a career spent on integration architecture — the APIs, event flows and platform plumbing that hold a large organisation together.",
    "Much of that work has been multi-cloud: integrating Salesforce, SAP and ServiceNow, and putting delivery on rails with CI/CD through Azure DevOps and Jenkins, which cut manual effort by around 40%. Across those engagements I have held a 5/5 CSAT with zero escalations.",
    "The part I find most interesting right now is what happens when agents get access to that plumbing. A well-governed integration estate is, functionally, a catalogue of tools an agent can call — which turns integration architecture into agent architecture. Most of my recent work sits on that line: agent fabrics, MCP servers and IDE tooling.",
    "Alongside delivery I run enablement — including a Catalyst session, \u201cStop Clicking, Start Conversing\u201d, demoing natural-language operations against the Anypoint Platform. GDC leadership nominated me as an AI Champion for embodying an AI-first mindset and applying Salesforce-approved AI tools to real problems.",
  ],
  writingNote: {
    prefix:
      "I write about that shift — agents, developer tooling, and the shape of technical work — over on ",
    linkLabel: "the blog",
    suffix: ".",
  },
  lists: [
    {
      title: "Focus",
      items: [
        "Enterprise integration architecture",
        "Agentic AI & Model Context Protocol",
        "Developer experience tooling",
        "Multi-cloud integration",
      ],
    },
    {
      title: "Certifications",
      items: [
        "MuleSoft Certified Developer – Level 1 (MCD-L1)",
        "MuleSoft Certified Developer – Level 2 (MCD-L2)",
        "MuleSoft Certified Integration Architect (MCIA)",
        "MuleSoft Certified Platform Architect (MCPA)",
        "MuleSoft Integration Associate (MIA)",
        "Salesforce AI Associate",
        "Microsoft Azure Fundamentals (AZ-900)",
        "API Academy Certified – API Designer, Product Manager & Security Architect",
      ],
    },
    {
      title: "Community",
      items: [
        "MuleSoft Ambassador programme",
        "TrailGuide mentoring",
        "Culture Guide Hub coordinator, Bangalore",
        "Toastmasters International — Salesforce Bangalore Club, Level 1",
        "Writing at akattani.com/blog",
      ],
    },
    {
      title: "Recognition",
      items: [
        "AI Champion nomination — GDC leadership",
        "Innovation Gladiator (Dot of Fame)",
        "Trailhead Triple Star Ranger",
      ],
    },
    {
      title: "Languages",
      items: ["English", "Kannada", "Hindi"],
    },
  ],
} as const;

export const projects: Project[] = [
  {
    title: "Heineken Agent Fabric Network",
    period: "2026",
    summary:
      "Architected and set up an end-to-end MuleSoft Agent Network V2 (agent-network.yaml) for Heineken, with a Broker orchestrator, MCP Server and Ops Agent working in concert. It became the foundation for the award-winning hackathon solution and a live demo to Heineken leadership.",
    tags: ["Agent Network V2", "MuleSoft", "MCP", "Orchestration"],
  },
  {
    title: "TrailBrewer",
    summary:
      "An agentic AI solution built with MuleSoft Agent Fabric, Omni Gateway, A2A and MCP, enabling natural-language operation of the Anypoint Platform. It won 1st place among nine teams, and the win led to an invitation to present to Heineken's CTO and EMEA North Professional Services leadership.",
    tags: ["Agent Fabric", "Omni Gateway", "A2A", "MCP", "Anypoint Platform"],
  },
  {
    title: "MuleSoft MCP Server POC — Heineken Leadership Demo",
    summary:
      "Delivered a fast-turnaround MCP Server proof-of-concept that directly enabled a successful executive demo, showcasing AI agents operating the MuleSoft Platform via natural language.",
    tags: ["MCP", "MuleSoft", "Agentic AI"],
  },
  {
    title: "Anypoint Studio Claude Code Plugin",
    summary:
      "A plugin that brings a Claude Code chat panel directly into Anypoint Studio, giving Claude a structured semantic view of Mule projects — flows, connectors, RAML/OAS specs and MUnit suites. It supports diff-based edits, a live lint pass with quick-fixes, and ingests runtime failures and MUnit results for context-aware debugging. Currently in internal beta for macOS (Anypoint Studio 7.24).",
    tags: ["Anypoint Studio", "Claude Code", "Developer Tools", "Internal Beta"],
  },
  {
    title: "GDC Platform Vertex Agent (PVA) — VS Code Extension",
    summary:
      "Contributed to the GDC Platform Vertex Agent initiative, publishing a new version of the PVA VS Code extension covering 60+ tools across 15+ use cases, usable with GitHub Copilot or Azure OpenAI model providers.",
    tags: ["VS Code", "Anypoint Platform", "GitHub Copilot", "Azure OpenAI"],
  },
  {
    title: "Azure Key Vault Certificate Downloader Connector",
    summary:
      "A Mule 4 connector published to the Heineken Exchange for downloading certificates from Azure Key Vault, with a supporting utility published on GitHub Pages, built as part of Heineken's certificate rotation POC work.",
    tags: ["MuleSoft", "Azure Key Vault", "Mule 4 Connector"],
  },
  {
    title: "Certificate Rotation MCP Workflow",
    summary:
      "Redesigned a Jira-coupled certificate rotation flow (download → unpack → validate → rotate) into a source-agnostic, security-hardened MCP workflow (stage → preflight → rotate → read-back verify), ensuring certificates, keys and passphrases never pass through the LLM.",
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
  },
  {
    company: "Deloitte",
    title: "Senior Technical Consultant",
    period: "May 2021 — Dec 2023",
  },
  {
    company: "Accenture",
    title: "Application Development Analyst",
    period: "Jan 2017 — Apr 2021",
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
