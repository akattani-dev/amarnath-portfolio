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
        "Writing at akattani.com/blog",
      ],
    },
    {
      title: "Recognition",
      items: ["Innovation Gladiator (Dot of Fame)", "Trailhead Triple Star Ranger"],
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
    summary:
      "An agent fabric network built on the Heineken engagement, connecting enterprise integrations to AI agents.",
    tags: ["Agent Fabric", "MuleSoft", "Agentic AI"],
  },
  {
    title: "TrailBrewer",
    summary:
      "An agentic AI solution built with MuleSoft Agent Fabric, Omni Gateway, A2A and MCP, enabling natural-language operation of the Anypoint Platform. It won 1st place among nine teams, and the win led to an invitation to present to Heineken's CTO and EMEA North Professional Services leadership.",
    tags: ["Agent Fabric", "Omni Gateway", "A2A", "MCP", "Anypoint Platform"],
  },
  {
    title: "Anypoint MCP Server",
    summary:
      "A proof of concept exposing Anypoint Platform operations as Model Context Protocol tools.",
    tags: ["MCP", "Anypoint Platform", "Agentic AI"],
  },
  {
    title: "Anypoint Studio Claude plugin",
    summary: "A Claude plugin for Anypoint Studio, bringing an AI assistant into the IDE.",
    tags: ["Anypoint Studio", "Developer Tools", "Claude"],
  },
  {
    title: "Platform Vertex Agent",
    summary: "A VS Code extension for working with the Anypoint Platform.",
    tags: ["VS Code", "Anypoint Platform", "Developer Tools"],
  },
  {
    title: "Azure Key Vault connector + certificate-rotation MCP",
    summary:
      "A MuleSoft connector for Azure Key Vault, paired with an MCP server for certificate rotation.",
    tags: ["MuleSoft", "Azure Key Vault", "MCP", "Security"],
  },
  {
    title: "Solace messaging fix",
    summary: "Diagnosed and resolved a Solace messaging failure affecting event flow.",
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
