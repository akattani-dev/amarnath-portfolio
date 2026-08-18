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
  /** Overrides the panel's generic link wording, e.g. "View on GitHub". */
  linkLabel?: string;
};

/**
 * A post published somewhere other than this repo. Mirrors the fields of
 * `PostMeta` that the shared cover chrome reads, so the Blog section can feed
 * internal and external posts through one card.
 */
export type ExternalPost = {
  title: string;
  description: string;
  /** ISO date string, matching `Frontmatter["date"]`. */
  date: string;
  /** Absent when the post ran on the personal profile rather than under a masthead. */
  publication?: string;
  href: string;
};

export type Writing = {
  /** Where the rest of the shelf lives. */
  profileUrl: string;
  /** Newest first. */
  posts: ExternalPost[];
};

export type Role = {
  company: string;
  title: string;
  period: string;
  /**
   * Local mark filename *with* its extension, under /public/logos, resolved to
   * /logos/{mark}. Simple Icons dropped most enterprise marks used here over
   * trademark, so this reads bundled assets rather than a CDN — and the
   * extension lives in the value because those assets arrive in whatever
   * format the company publishes. No mark means no bundled file exists, and
   * LogoPlate falls back to the brand-filled initial square instead.
   */
  mark?: string;
  /**
   * Brand hex. Colours the misregistered plate behind the mark, and fills the
   * initial-square fallback when no mark exists.
   */
  brand?: string;
};

export type Education = {
  institution: string;
  credential: string;
  period?: string;
};

export type Volunteering = {
  organisation: string;
  role: string;
  period: string;
  cause: string;
  summary: string;
  /** Same contract as `Role["mark"]`. */
  mark?: string;
  brand?: string;
};

/**
 * One line of the Off the clock community shelf — a commitment or an award.
 * `detail` is optional because several of these are verified only as far as
 * their name, and a made-up second line is worse than none.
 */
export type CommunityEntry = {
  title: string;
  detail?: string;
};

export type OffTheClock = {
  label: string;
  title: string;
  /** One per block, in render order. */
  headings: {
    formulaOne: string;
    volunteering: string;
    community: string;
    languages: string;
  };
  formulaOne: {
    team: string;
    driver: string;
    note: string;
  };
  community: CommunityEntry[];
  recognitions: CommunityEntry[];
  languages: string[];
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
  resumeUrl: "/resume.pdf",
} as const;

export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Off the clock", href: "/#off-the-clock" },
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
    "Senior Technical Consultant at Salesforce, in the Global Delivery Centre for MuleSoft — nine-plus years on integration architecture.",
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
  /**
   * Focus areas, then recognitions. The community commitments and the
   * languages live in `offTheClock` instead — they are that section's subject,
   * and repeating them here is what made this strip read as a list rather
   * than a selection.
   */
  chips: [
    "Enterprise integration architecture",
    "Agentic AI & Model Context Protocol",
    "Developer experience tooling",
    "Multi-cloud integration",
    "AI Champion nomination — GDC leadership",
    "Innovation Gladiator (Dot of Fame)",
    "Trailhead Triple Star Ranger",
  ],
} as const;

export const projects: Project[] = [
  {
    title: "Anypoint Studio Claude Code Plugin",
    summary:
      "A Claude Code chat panel inside Anypoint Studio, with a semantic view of Mule projects — flows, connectors, specs and MUnit suites.",
    tags: ["Anypoint Studio", "Claude Code", "Developer Tools", "Internal Beta"],
  },
  {
    title: "SonarQube XML Rule Validator",
    summary:
      "A local port of SonarQube’s XPath rule engine: import a quality profile, write and edit custom XML rules, and see exactly what they flag before anything reaches the server.",
    tags: ["Python", "FastAPI", "XPath", "Static Analysis"],
    href: "https://github.com/akattani-dev/sonarqube-utility",
    linkLabel: "View on GitHub",
  },
];

export const experience: Role[] = [
  {
    company: "Salesforce",
    title: "Senior Technical Consultant",
    period: "Jan 2024 — Present",
    mark: "salesforce.png",
    brand: "#00A1E0",
  },
  {
    company: "Deloitte",
    title: "Senior Technical Consultant",
    period: "May 2021 — Dec 2023",
    mark: "deloitte.png",
    brand: "#86BC25",
  },
  {
    company: "Accenture",
    title: "Application Development Analyst",
    period: "Jan 2017 — Apr 2021",
    mark: "accenture.png",
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

/**
 * The Medium back catalogue. Three of these carry only "Introduction" as their
 * Medium subtitle — and therefore as their og:description — so those three
 * descriptions are written from what the post actually covers rather than
 * lifted from a field that says nothing.
 */
export const writing: Writing = {
  profileUrl: "https://medium.com/@amar.kattani",
  posts: [
    {
      title: "Part 2: Beyond the Basics",
      description:
        "Part two of the DataWeave series: nested and hierarchical structures, conditional logic, custom functions, performance tuning and streaming.",
      date: "2023-06-17",
      publication: "Another Integration Blog",
      href: "https://medium.com/another-integration-blog/part-2-beyond-the-basics-fce60ae39cbd",
    },
    {
      title: "Anypoint API Experience Hub: Empowering Seamless API Experiences",
      description:
        "A tour of Salesforce’s API Experience Hub: personalised portals, out-of-the-box templates, governance, security and usage analytics.",
      date: "2023-06-17",
      publication: "Another Integration Blog",
      href: "https://medium.com/another-integration-blog/anypoint-api-experience-hub-empowering-seamless-api-experiences-76adadc3f286",
    },
    {
      title: "Part 1: DataWeave 101",
      description:
        "The DataWeave primer: syntax and language constructs, the functions you reach for most, and a first transform written in Anypoint Studio.",
      date: "2023-05-12",
      publication: "Another Integration Blog",
      href: "https://medium.com/another-integration-blog/part-1-dataweave-101-84a6be108c82",
    },
    {
      title:
        "Unleashing the Power of Anypoint Code Builder: A Guide to Customizing Your Platform",
      description:
        "As a developer, you’re always on the lookout for the best tools to help you streamline your workflow and get the job done right.",
      date: "2023-02-02",
      publication: "Another Integration Blog",
      href: "https://medium.com/another-integration-blog/unleashing-the-power-of-anypoint-code-builder-a-guide-to-customizing-your-platform-c4e5082d42a9",
    },
    {
      title: "Efficiency Unleashed: Automate Your MuleSoft Deployments",
      description:
        "Transform Your MuleSoft Deployments with Automation for Unmatched Efficiency",
      date: "2023-01-30",
      publication: "Another Integration Blog",
      href: "https://medium.com/another-integration-blog/efficiency-unleashed-automate-your-mulesoft-deployments-e2b7583a41e3",
    },
    {
      title: "Tips and best practices for designing and building APIs",
      description:
        "APIs, or application programming interfaces, have become an essential tool for businesses and developers to share data and functionality.",
      date: "2023-01-25",
      href: "https://medium.com/@amar.kattani/tips-and-best-practices-for-designing-and-building-apis-66fd99356b0c",
    },
    {
      title: "Dataweave libraries",
      description:
        "Dataweave libraries are a powerful tool for data transformation and integration in MuleSoft’s Anypoint Platform.",
      date: "2023-01-25",
      href: "https://medium.com/@amar.kattani/dataweave-libraries-be068eec4631",
    },
    {
      title: "Deploying to Cloudhub 2.0 Using Maven in Mule",
      description:
        "Cloudhub 2.0 is the latest version of the popular cloud-based platform for running Mule applications. It offers improved scalability.",
      date: "2023-01-13",
      href: "https://medium.com/@amar.kattani/deploying-to-cloudhub-2-0-using-maven-in-mule-2e068b8d00c5",
    },
  ],
};

/**
 * Stored as an open range rather than LinkedIn's elapsed "3 yrs 8 mos", which
 * would go stale the moment it shipped.
 */
export const volunteering: Volunteering[] = [
  {
    organisation: "MuleSoft",
    role: "MuleSoft Mentor",
    period: "Jan 2023 — Present",
    cause: "Education",
    summary:
      "Creating technical content, interacting with individuals on online forums to address their inquiries, and taking part in MuleSoft Meetups.",
    mark: "mulesoft.png",
    brand: "#00A0DF",
  },
];

export const offTheClock: OffTheClock = {
  label: "Off the clock",
  title: "How I show up outside delivery",
  headings: {
    formulaOne: "Formula 1",
    volunteering: "Volunteering",
    community: "Community & speaking",
    languages: "Languages",
  },
  formulaOne: {
    team: "Ferrari",
    driver: "Lewis Hamilton",
    /**
     * Placeholder, to be rewritten in Amarnath's own voice. The allegiance is
     * the whole of what is known here, so the line claims nothing beyond it —
     * no sessions watched, no strategy read, no Grand Prix attended.
     */
    note: "The one allegiance on this page that has nothing to do with integration.",
  },
  community: [
    {
      title: "Catalyst session",
      detail: "\u201cStop Clicking, Start Conversing\u201d",
    },
    { title: "Toastmasters", detail: "Salesforce Bangalore Club, Level 1" },
    { title: "Culture Guide Hub coordinator", detail: "Bangalore" },
    { title: "TrailGuide mentoring" },
    { title: "MuleSoft Ambassador programme" },
  ],
  recognitions: [
    {
      title: "Impact Grant Award",
      detail: "For contributions to non-profits and volunteering through Impactis.",
    },
    {
      title: "Hero Volunteer Recognition",
      detail: "100-plus hours leading GDC events and CSR initiatives.",
    },
  ],
  languages: ["English", "Kannada", "Hindi"],
};

export const contact = {
  title: "Contact",
  lead: "Open to conversations about integration architecture, agentic AI, and the tooling that sits between them.",
  email: site.email,
} as const;
