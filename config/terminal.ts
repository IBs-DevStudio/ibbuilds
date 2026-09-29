/**
 * terminal.ts
 * ─────────────────────────────────────────────────────────────
 * Payloads for the interactive Terminal window. Each entry is the
 * content printed by a command or a virtual file. Lines are shown
 * verbatim — an empty string renders as a blank line.
 * ─────────────────────────────────────────────────────────────
 */

export interface TerminalConfig {
  /** Content of `cat about.txt`. */
  about: string[]
  /** Content of `cat projects.txt`. */
  projects: string[]
  /** Content of `cat skills.txt`. */
  skills: string[]
  /** Content of `cat experience.txt`. */
  experience: string[]
  /** Content of `cat contact.txt`. */
  contact: string[]
  /** Content of `cat resume.pdf`. */
  resume: string[]
  /** Output of `whoami`. */
  whoami: string[]
  /** Fake JSON returned by `curl github.com/<user>`. */
  githubJson: string
}

export const terminal: TerminalConfig = {
  about: [
    "Name:     Ikram Banadar (IB)",
    "Degree:   B.Tech in Computer Science (AI & ML) — KITCOEK (2022–2026)",
    "Location: Belgaum, Karnataka, India",
    "Role:     Freelance Full-Stack & AI Developer",
    "Current:  Freelance Web & AI Developer on Upwork (Sep 2026 – Present)",
    "Focus:    Full-Stack Web · Generative AI · Voice SaaS",
    "",
    "Delivering production AI SaaS platforms and modern web applications",
    "for global clients on Upwork.",
  ],
  projects: [
    "★ Featured Projects:",
    "1. Cogniva (Voice-First AI Assistant)",
    "   Stack:  Next.js 14, FastAPI, Deepgram STT, Gemini 1.5 Flash, PostgreSQL",
    "   Key:    Sub-second (850ms) voice interaction, multi-agent tool execution.",
    "   Links:  Live: https://cogniva-ai.vercel.app | github.com/IBs-DevStudio/cogniva",
    "",
    "2. JobFit (Intelligent ATS & Resume Matcher)",
    "   Stack:  React.js, Node.js, Express, NLP, Gemini API, Tailwind CSS",
    "   Key:    Semantic JD parsing, ATS compatibility score & keyword gap analysis.",
    "   Links:  Live: https://jobfit-ai.vercel.app | github.com/IBs-DevStudio/jobfit",
    "",
    "3. GitIntellect (Codebase RAG & Repository Intelligence)",
    "   Stack:  Next.js 14, TypeScript, Gemini Pro, pgvector, LangChain",
    "   Key:    AST-based code chunking for cross-file architecture queries.",
    "   Links:  Live: https://gitintellect.vercel.app | github.com/IBs-DevStudio/gitintellect",
    "",
    "Client Work:",
    "• Vinayak IT Solutions Client Dashboards (Next.js, Tailwind, REST APIs)",
  ],
  skills: [
    "Languages:   JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3",
    "Frontend:    React.js, Next.js (SSR/SSG), Redux, Context API, Tailwind CSS",
    "Backend:     Node.js, Express.js, REST APIs, PostgreSQL, Prisma, Redis",
    "AI & ML:     OpenAI, LangChain, Pinecone, Gemini, RAG Pipelines, pandas, NumPy",
    "Cloud/Dev:   Git (branching, PRs), Docker, AWS, GCP, CI/CD (GitHub Actions, Vercel)",
  ],
  experience: [
    "Upwork (Freelance)       Sep 2026 – Present    Full-Stack Web & AI Developer (>30 hrs/wk)",
    "Vinayak IT Solutions     Jan 2026 – May 2026   Web Development Intern (Completed)",
    "Smart India Hackathon    2024                  Grand Finalist & Team Lead (Top 50 / 50k+)",
  ],
  contact: [
    "upwork:    https://www.upwork.com",
    "email:     ikrambanadar04@gmail.com",
    "phone:     +91 9110451262",
    "github:    github.com/IBs-DevStudio",
    "linkedin:  linkedin.com/in/ikrambanadar",
    "twitter:   x.com/IkramBanadar",
    "leetcode:  leetcode.com/u/ikrambanadar04",
  ],
  resume: [
    "Opening résumé window for Ikram Banadar…",
    "→ B.Tech in CS (AI & ML) — KITCOEK (2022–2026)",
    "→ github.com/IBs-DevStudio",
  ],
  whoami: [
    "Ikram Banadar (IB)",
    "Freelance Full-Stack & AI Developer · Belgaum, Karnataka, India",
    "",
    "Building full-stack web applications and AI platforms for clients on Upwork,",
    "with expertise in Next.js, React, TypeScript, and Generative AI.",
  ],
  githubJson: `{"login":"IBs-DevStudio","name":"Ikram Banadar","bio":"Freelance Full-Stack & AI Developer on Upwork · B.Tech CS (AI & ML)","location":"Belgaum, Karnataka, India","public_repos":15}`,
}
