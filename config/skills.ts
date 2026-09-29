/**
 * skills.ts
 * ─────────────────────────────────────────────────────────────
 * Skills grouped by category. Keys become category labels on the
 * left; values become the chip list on the right.
 *
 * Add, remove, or rename categories freely — the Résumé section
 * iterates over Object.entries(skills), so the UI adapts.
 * ─────────────────────────────────────────────────────────────
 */

export type Skills = Record<string, string[]>

export const skills: Skills = {
  "Languages":        ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3"],
  "Frontend":         ["React.js", "Next.js (SSR/SSG)", "Redux", "React Hooks", "Context API", "Tailwind CSS", "Responsive Design", "Material-UI", "Accessibility (WCAG)"],
  "Backend":          ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "Prisma", "tRPC", "MongoDB", "Redis"],
  "AI Tools":         ["OpenAI", "LangChain", "Pinecone", "RAG Pipelines", "Gemini"],
  "DevOps & Cloud":   ["Git (branching, PRs)", "Docker", "AWS", "GCP", "CI/CD (GitHub Actions, Vercel)"],
  "Concepts":         ["Component Architecture", "System Design", "Agile/Scrum", "Debugging", "End-to-End Ownership"],
}
