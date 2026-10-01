/**
 * projects.ts
 * ─────────────────────────────────────────────────────────────
 * All projects shown in the Projects window.
 * Split into two lists: `personal` (side projects) and `client`
 * (paid / contracted work). Both use the same ProjectItem shape.
 *
 *  - `tech`   → array of tags rendered beneath the description.
 *  - `stars`  → optional — shown next to the title if present.
 *  - `status` → optional — rendered as a pill (e.g. "Paused").
 * ─────────────────────────────────────────────────────────────
 */

export interface ProjectItem {
  title: string
  description: string
  tech: string[]
  status?: string
  stars?: number
  link: string
}

export interface ProjectsConfig {
  personal: ProjectItem[]
  client: ProjectItem[]
}

export const projects: ProjectsConfig = {
  personal: [
    {
      title: "Cogniva — Voice-First AI Learning Platform",
      description: "Voice-first AI learning platform with personalized tutoring, interactive modes, and real-time conversations using OpenAI and Vapi. Reduced response latency by 70% (2.8s to 850ms).",
      tech: ["React.js", "TypeScript", "OpenAI", "Vapi", "Redis", "Context API"],
      status: "Featured",
      link: "https://cogniva-ai-lemon.vercel.app/",
    },
    {
      title: "JobFit — AI Resume Intelligence Platform",
      description: "Full-stack AI-powered ATS platform analyzing resumes against job descriptions across 5+ categories with automated scoring and actionable feedback in under 30 seconds.",
      tech: ["Next.js", "Puter", "TypeScript", "Claude LLM", "React Router v7", "JWT"],
      status: "Active",
      link: "https://jobfit-ats.vercel.app/",
    },
    {
      title: "GitIntellect — GitHub Codebase AI Engine",
      description: "Semantic codebase search and QA engine using Gemini embeddings with pgvector for natural language queries and sub-200ms retrieval, built with Next.js SSR/SSG.",
      tech: ["Next.js", "PostgreSQL", "pgvector", "Gemini", "TypeScript", "RAG"],
      status: "Active",
      link: "https://github.com/IBs-DevStudio/GitIntellect",
    },
  ],

  client: [
    {
      title: "Responsive Client Dashboards — Vinayak IT Solutions",
      description: "Production client analytics dashboards built with reusable component architecture, integrated RESTful APIs, and Python (pandas/NumPy) data analytics validation.",
      tech: ["React.js", "Next.js", "JavaScript", "REST APIs", "Python", "pandas"],
      link: "https://github.com/IBs-DevStudio",
    },
  ],
}

/** Résumé-only condensed project highlights (short names + long descriptions). */
export interface ResumeProjectItem {
  name: string
  desc: string
}

export const resumeProjects: ResumeProjectItem[] = [
  {
    name: "Cogniva — Voice-First AI Learning Platform",
    desc: "Voice-first AI platform with real-time conversations (OpenAI + Vapi). Cut latency by 70% (2.8s to 850ms), built 5+ learning modes, and reduced UI dev time by 40%.",
  },
  {
    name: "JobFit — AI Resume Intelligence Platform",
    desc: "Full-stack AI ATS platform using React Router v7 & Claude LLM. Delivers multi-category resume scoring in under 30s with JWT authentication & 99%+ uptime.",
  },
  {
    name: "GitIntellect — GitHub Codebase AI Engine",
    desc: "Optimized RAG pipeline over GitHub repos using Gemini embeddings and pgvector, enabling natural language codebase queries with sub-200ms retrieval.",
  },
]
