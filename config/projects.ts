/**
 * projects.ts
 * ─────────────────────────────────────────────────────────────
 * All projects shown in the Projects window.
 * Split into two lists: `personal` (side projects) and `client`
 * (paid / contracted work). Both use the same ProjectItem shape.
 *
 *  - `tech`            → array of tags rendered beneath the description.
 *  - `stars`           → optional — shown next to the title if present.
 *  - `status`          → optional — rendered as a pill (e.g. "Featured", "Active").
 *  - `githubUrl`       → GitHub repo link (e.g. "https://github.com/...")
 *  - `liveUrl`         → Live deployment link (e.g. "https://...vercel.app")
 *  - `longDescription` → Expanded technical overview for the detail card modal.
 *  - `highlights`      → Key bullet-point architectural & feature achievements.
 * ─────────────────────────────────────────────────────────────
 */

export interface ProjectItem {
  title: string
  description: string
  longDescription?: string
  highlights?: string[]
  tech: string[]
  status?: string
  stars?: number
  link?: string
  githubUrl?: string
  liveUrl?: string
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
      longDescription: "Cogniva is a next-generation voice-first AI educational platform engineered for low-latency conversational tutoring. Built with bidirectional audio streaming, contextual memory retention across topics, and adaptive multi-agent learning modes to emulate a live 1-on-1 private tutor.",
      highlights: [
        "Sub-second voice response latency of 850ms (70% latency cut from 2.8s)",
        "Real-time speech synthesis & transcription pipeline leveraging OpenAI & Vapi",
        "5+ interactive modes with adaptive learning paths and persistent state",
        "High-throughput session caching and memory retention powered by Redis",
      ],
      tech: ["React.js", "TypeScript", "OpenAI", "Vapi", "Redis", "Context API"],
      status: "Featured",
      githubUrl: "https://github.com/IBs-DevStudio/cogniva",
      liveUrl: "https://cogniva-ai-lemon.vercel.app/",
      link: "https://cogniva-ai-lemon.vercel.app/",
    },
    {
      title: "Orynd — PR Pull Request AI Analyzer",
      description: "Automated AI code review and PR analysis platform providing instant context-aware diff breakdowns, security vulnerability scans, performance insights, and automated test suggestions.",
      longDescription: "Orynd acts as an autonomous senior code reviewer for software engineering teams. It connects directly with GitHub repositories to automatically parse incoming pull requests, evaluate architecture impacts across diffs, uncover security leaks and edge cases, and post high-signal inline code review comments with test recommendations.",
      highlights: [
        "Automated multi-file PR diff inspection and architectural summary generation",
        "Context-aware vulnerability scanning, credential detection, and security auditing",
        "Code smell alerts, cyclomatic complexity metrics, and performance optimizations",
        "Instant unit test suggestions covering edge cases across modified functions",
        "Streamlined GitHub webhooks and automated status check integrations",
      ],
      tech: ["Next.js", "TypeScript", "Claude / OpenAI", "GitHub API", "PostgreSQL", "Tailwind CSS"],
      status: "Active",
      githubUrl: "https://github.com/IBs-DevStudio/Code-Reviewer-AI",
      liveUrl: "https://orynd.vercel.app/",
      link: "https://orynd.vercel.app/",
    },
    {
      title: "JobFit — AI Resume Intelligence Platform",
      description: "Full-stack AI-powered ATS platform analyzing resumes against job descriptions across 5+ categories with automated scoring and actionable feedback in under 30 seconds.",
      longDescription: "JobFit is a full-stack applicant tracking system (ATS) analyzer that evaluates resumes against targeted job descriptions. Using Claude LLM and intelligent parsing, it scores alignment across multiple categories, pinpoints missing keywords, and provides actionable recommendations to optimize resumes for high-tier hiring pipelines.",
      highlights: [
        "Multi-category ATS scoring algorithm evaluating keyword match, tone, and experience",
        "Sub-30-second automated resume analysis with actionable bullet-point revisions",
        "Semantic JD keyword gap analysis and real-time optimization suggestions",
        "Cloud persistence via Puter storage and secure JWT authentication",
      ],
      tech: ["Next.js", "Puter", "TypeScript", "Claude LLM", "React Router v7", "JWT"],
      status: "Active",
      githubUrl: "https://github.com/IBs-DevStudio/jobfit",
      liveUrl: "https://jobfit-ats.vercel.app/",
      link: "https://jobfit-ats.vercel.app/",
    },
    {
      title: "GitIntellect — GitHub Codebase AI Engine",
      description: "Semantic codebase search and QA engine using Gemini embeddings with pgvector for natural language queries and sub-200ms retrieval, built with Next.js SSR/SSG.",
      longDescription: "GitIntellect turns complex GitHub repositories into searchable knowledge graphs. By chunking source code and indexing semantic embeddings via Google Gemini and PostgreSQL pgvector, it enables developers to explore unfamiliar codebases using conversational natural language.",
      highlights: [
        "High-dimensional vector embedding pipeline using Google Gemini and pgvector",
        "Sub-200ms semantic search retrieval over multi-directory source files",
        "Natural language query interface for understanding complex code architectures",
        "Built with Next.js SSR and SSG for fast static rendering and instant responses",
      ],
      tech: ["Next.js", "PostgreSQL", "pgvector", "Gemini", "TypeScript", "RAG"],
      status: "Active",
      githubUrl: "https://github.com/IBs-DevStudio/GitIntellect",
      liveUrl: "https://gitintellect.vercel.app/",
      link: "https://github.com/IBs-DevStudio/GitIntellect",
    },
  ],

  client: [
    {
      title: "Responsive Client Dashboards — Vinayak IT Solutions",
      description: "Production client analytics dashboards built with reusable component architecture, integrated RESTful APIs, and Python (pandas/NumPy) data analytics validation.",
      longDescription: "Production-ready enterprise client analytics dashboards developed for Vinayak IT Solutions. Built with reusable UI components, clean RESTful API contracts, and automated Python data validation pipelines for seamless analytics reporting.",
      highlights: [
        "Interactive analytics dashboards with real-time KPI metrics and data tables",
        "Modular component hierarchy with high reusability and cross-browser consistency",
        "Integrated RESTful API communication and Python-based data analytics validation",
      ],
      tech: ["React.js", "Next.js", "JavaScript", "REST APIs", "Python", "pandas"],
      githubUrl: "https://github.com/IBs-DevStudio",
      liveUrl: "https://github.com/IBs-DevStudio",
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
    name: "Orynd — PR Pull Request AI Analyzer",
    desc: "AI-powered PR review & code analysis platform. Performs automated diff breakdowns, security flaw checks, and unit test suggestions via GitHub integration.",
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
