/**
 * links.ts
 * ─────────────────────────────────────────────────────────────
 * Curated external reading list shown in the LinksWidget on the
 * desktop. Each entry is an outbound link with a short tag used
 * for display only.
 * ─────────────────────────────────────────────────────────────
 */

export interface LinkItem {
  title: string
  author: string
  url: string
  /** Freeform short label displayed under the author (e.g. "rust"). */
  tag: string
}

export const links: LinkItem[] = [
  { title: "Voice AI & Low-Latency Streaming", author: "Vapi Docs",           url: "https://docs.vapi.ai",                    tag: "voice-ai" },
  { title: "Vector Similarity with pgvector",   author: "PostgreSQL pgvector", url: "https://github.com/pgvector/pgvector",    tag: "rag" },
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann",url: "https://dataintensive.net",              tag: "systems" },
  { title: "RAG & Multimodal with Gemini",     author: "Google AI",           url: "https://ai.google.dev",                   tag: "ai-ml" },
  { title: "Next.js App Architecture",         author: "Vercel",              url: "https://nextjs.org/docs",                 tag: "nextjs" },
]
