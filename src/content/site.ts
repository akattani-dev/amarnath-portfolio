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
  role: string;
  period: string;
  summary: string;
  tags: string[];
  href?: string;
};

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  highlights: string[];
};

export type Education = {
  institution: string;
  credential: string;
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
    "I am a Senior Technical Consultant at Salesforce, in the Global Delivery Centre for MuleSoft, currently embedded with Heineken. My day job is enterprise integration: the APIs, event flows and platform plumbing that hold a large organisation together.",
    "The part I find most interesting right now is what happens when agents get access to that plumbing. A well-governed integration estate is, functionally, a catalogue of tools an agent can call — which turns integration architecture into agent architecture. Most of my recent work sits on that line: MCP servers, IDE agents, and agent fabrics that keep approvals and observability intact.",
    "Before Salesforce I spent close to three years at Deloitte and four at Accenture, mostly on integration and platform engineering for large enterprises.",
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
        "Platform engineering & governance",
      ],
    },
    {
      title: "Certifications",
      items: [
        "MuleSoft Certified Integration Architect",
        "MuleSoft Certified Developer",
        "Salesforce Certified AI Associate",
      ],
    },
    {
      title: "Community",
      items: [
        "Internal enablement & speaking",
        "Hackathons and internal demos",
        "Writing at akattani.com/blog",
      ],
    },
    {
      title: "Languages",
      items: ["English", "Hindi", "Kannada"],
    },
  ],
} as const;

export const projects: Project[] = [
  {
    title: "Heineken Agent Fabric Network",
    role: "Integration Architect",
    period: "2025",
    summary:
      "An agent fabric that lets AI agents discover and invoke a governed catalogue of enterprise integrations. The interesting problem was not calling the APIs — it was keeping approvals, observability and blast-radius controls intact once a non-human caller is on the other end.",
    tags: ["Agentic AI", "MuleSoft", "MCP", "Enterprise Architecture"],
  },
  {
    title: "TrailBrewer",
    role: "Hackathon — 1st place of 9 teams",
    period: "2025",
    summary:
      "Built for an internal hackathon and placed first out of nine teams. Turns scattered enablement material into a guided, conversational path so people can ask for what they need instead of hunting through a content library.",
    tags: ["Hackathon", "Agentforce", "Enablement"],
  },
  {
    title: "Anypoint MCP Server",
    role: "Proof of concept",
    period: "2025",
    summary:
      "Exposes Anypoint Platform operations as Model Context Protocol tools, so an agent can plan, pre-check and execute platform actions — private spaces, environments, deployments — with a dry run and an explicit human approval before anything destructive runs.",
    tags: ["MCP", "Anypoint Platform", "Agentic AI"],
  },
  {
    title: "Anypoint Studio Claude plugin",
    role: "Developer tooling",
    period: "2025",
    summary:
      "Puts an AI pair-programmer inside the IDE developers already live in. Generates and reviews Mule flows, DataWeave and tests against the project in front of you, rather than in a browser tab that has no idea what your project looks like.",
    tags: ["Developer Tools", "Anypoint Studio", "LLM"],
  },
  {
    title: "Platform Vertex Agent — VS Code extension",
    role: "Creator",
    period: "2025",
    summary:
      "A guided expert for Anypoint Platform setup: networking, access management, application lifecycle and deployment troubleshooting. Deterministic guidance routes the request, the model does the reasoning, and destructive actions pause for approval.",
    tags: ["VS Code", "Developer Experience", "Agentic AI"],
  },
  {
    title: "Key Vault connector + certificate-rotation MCP",
    role: "Integration & security tooling",
    period: "2024–2025",
    summary:
      "A MuleSoft connector for Azure Key Vault, paired with an MCP surface for TLS certificate rotation. Replaced a manual, calendar-driven renewal ritual with a repeatable and auditable flow across private spaces and gateway consumers.",
    tags: ["MuleSoft", "Azure", "Security", "Automation"],
  },
  {
    title: "Solace event-flow remediation",
    role: "Integration Architect",
    period: "2024",
    summary:
      "Diagnosed and resolved a Solace messaging failure that was stalling production event flow, then closed the gap in monitoring that let it go unnoticed for as long as it did.",
    tags: ["Event-Driven", "Solace", "Production Support"],
  },
];

export const experience: Role[] = [
  {
    company: "Salesforce",
    title: "Senior Technical Consultant — Global Delivery Centre, MuleSoft",
    period: "Jan 2024 — Present",
    location: "Bengaluru, India",
    highlights: [
      "Integration architecture for Heineken across API-led and event-driven estates.",
      "Built the agent fabric, MCP servers and IDE tooling that let agents operate the platform safely.",
      "Internal enablement on agentic AI for integration teams.",
    ],
  },
  {
    company: "Deloitte",
    title: "Integration Consultant",
    period: "May 2021 — Dec 2023",
    location: "India",
    highlights: [
      "Delivered enterprise integration programmes across MuleSoft and adjacent platforms.",
      "Owned design and delivery of API-led connectivity layers for large clients.",
    ],
  },
  {
    company: "Accenture",
    title: "Integration Developer",
    period: "Jan 2017 — Apr 2021",
    location: "India",
    highlights: [
      "Built and supported integration services for global enterprise clients.",
      "Grew from development into design ownership across long-running programmes.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Sir M. Visvesvaraya Institute of Technology",
    credential: "Bachelor of Engineering",
  },
  { institution: "IIM Bangalore", credential: "Design Thinking" },
  {
    institution: "IIT Hyderabad",
    credential: "AI & Emerging Technologies",
  },
];

export const contact = {
  title: "Contact",
  lead: "Open to conversations about integration architecture, agentic AI, and the tooling that sits between them.",
  email: site.email,
} as const;
