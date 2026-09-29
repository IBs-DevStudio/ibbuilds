/**
 * experience.ts
 * ─────────────────────────────────────────────────────────────
 *  - `experience`        → full cards shown in the Experience window
 *                          (click one to open a modal with achievements + links).
 *  - `resumeExperience`  → condensed bullets shown on the Résumé window.
 *  - `education`         → single degree entry for the Résumé.
 *  - `teaching`          → free-form bullets for the Teaching section.
 *
 * The two experience lists are separate on purpose: the main site shows
 * every role, while the résumé groups multiple roles into summaries.
 * ─────────────────────────────────────────────────────────────
 */

export interface ExperienceItem {
  company: string
  role: string
  /** e.g. "Jun 2024 – Present" or "2023". */
  period: string
  /** One-line summary shown on the card. */
  description: string
  tech: string[]
  /** Bullet points shown in the modal. */
  achievements: string[]
  /** Optional related links shown at the bottom of the modal. */
  links?: { type: string; url: string; label: string }[]
}

export const experience: ExperienceItem[] = [
  {
    company: "Upwork",
    role: "Freelance Full-Stack & AI Developer",
    period: "Sep 2026 – Present",
    description: "Building responsive full-stack web applications and engineering Generative AI solutions for enterprise and startup clients.",
    tech: ["React.js", "Next.js", "TypeScript", "Python", "Generative AI", "REST APIs", "Node.js"],
    achievements: [
      "Delivering custom full-stack web platforms and production AI SaaS products end-to-end with high responsiveness and 99%+ uptime.",
      "Contracted with Upwork Enterprise clients on AI model training, prompt engineering, and LLM evaluation workflows.",
      "Developing scalable frontends using React Hooks and Context API with TypeScript, reducing UI development overhead.",
    ],
    links: [
      { type: "upwork", url: "https://www.upwork.com/freelancers/~013fb349334b6d27af", label: "IBs-Upwork" },
    ],
  },
  {
    company: "Vinayak IT Solutions",
    role: "Web Development Intern (Completed)",
    period: "Jan 2026 – May 2026",
    description: "Completed internship building responsive client dashboards and validating data analytics pipelines in Agile sprints.",
    tech: ["React.js", "Next.js", "JavaScript", "REST APIs", "Python", "pandas", "NumPy"],
    achievements: [
      "Built 3+ responsive client dashboards with React.js, Next.js, and JavaScript using a reusable component architecture.",
      "Integrated RESTful APIs and resolved UI/performance bugs in Agile sprints, delivering cross-browser compatible interfaces.",
      "Validated datasets with Python, pandas, and NumPy, feeding accurate analytics into web dashboards.",
    ],
  },
  {
    company: "Smart India Hackathon 2024",
    role: "Grand Finalist — Team Lead",
    period: "2024",
    description: "Selected in top 50 out of 15,000+ teams nationally; led 6-member team building an AI-powered image processing system.",
    tech: ["Python", "AI / Computer Vision", "System Design", "Agile"],
    achievements: [
      "Selected as Grand Finalist in Smart India Hackathon 2024 among top 50 of 15,000+ teams nationally across India.",
      "Led a 6-member team engineering an AI-powered image processing system under strict 36-hour sprint constraints.",
      "Spearheaded architectural decisions, component hierarchy, and Git branching workflows to ensure reliable delivery.",
    ],
  },
]

// ── Résumé-only condensed version ────────────────────────────────────

export interface ResumeExperienceItem {
  company: string
  role: string
  period: string
  /** Optional list of sub-companies (e.g. for a contractor umbrella). */
  subRoles?: string[]
  bullets: string[]
}

export const resumeExperience: ResumeExperienceItem[] = [
  {
    company: "Upwork",
    role: "Freelance Full-Stack & AI Developer",
    period: "Sep 2026 – Present",
    bullets: [
      "Delivering custom full-stack web applications and AI SaaS solutions with Next.js, React, and TypeScript.",
      "Contracted with Upwork Enterprise clients on AI model training, prompt engineering, and LLM evaluation workflows.",
      "Engineering responsive client interfaces and robust API integrations across multiple freelance contracts.",
    ],
  },
  {
    company: "Vinayak IT Solutions",
    role: "Web Development Intern",
    period: "Jan 2026 – May 2026",
    bullets: [
      "Built 3+ responsive client dashboards with React.js, Next.js, and JavaScript using a reusable component architecture.",
      "Integrated RESTful APIs and resolved UI/performance bugs in Agile sprints, delivering cross-browser compatible interfaces.",
      "Validated datasets with Python, pandas, and NumPy, feeding accurate analytics into web dashboards.",
    ],
  },
  {
    company: "Smart India Hackathon 2024",
    role: "Grand Finalist & Team Lead",
    period: "2024",
    bullets: [
      "Selected among the top 50 of 15,000+ teams nationally across India in SIH 2024.",
      "Led a 6-member engineering team building an AI-powered image processing system under rapid 36-hour sprint deadlines.",
    ],
  },
]

// ── Education + Teaching + Achievements ──────────────────────────────

export interface EducationItem {
  school: string
  degree: string
  period: string
}

export const education: EducationItem = {
  school: "Kolhapur Institute of Technology (KITCOEK)",
  degree: "Bachelor of Technology in Computer Science (AI & ML) — Maharashtra, India",
  period: "2022 – 2026",
}

export interface AchievementItem {
  title: string
  detail: string
  badge?: string
}

export const certificationsAndAchievements: AchievementItem[] = [
  {
    title: "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    detail: "Official Oracle Cloud Credential",
    badge: "Credential",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    detail: "Official Oracle Cloud Credential",
    badge: "Credential",
  },
  {
    title: "Smart India Hackathon 2024 — Grand Finalist",
    detail: "Selected among the top 50 of 15,000+ teams nationally; led a 6-member team building an AI-powered image processing system.",
    badge: "Top 50 / 15k+",
  },
  {
    title: "Runner-Up — KITCOEK Competition",
    detail: "Ranked 2nd among 20+ teams for full-stack system design.",
    badge: "Rank 2",
  },
]

export const teaching: string[] = [
  "Smart India Hackathon 2024 Grand Finalist — Top 50 of 15,000+ teams nationally (Led 6-member AI team).",
  "Runner-Up — KITCOEK Competition: Ranked 2nd among 20+ teams for full-stack system design.",
  "Mentored junior engineering peers in React.js component architecture, Git branching, and RESTful API design.",
]
