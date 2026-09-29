/**
 * uses.ts
 * ─────────────────────────────────────────────────────────────
 * Data for the /uses-style window. Group your tools by category;
 * each item has a name and an optional short note.
 *
 * Categories and counts are fully flexible — the UI iterates over
 * whatever you provide.
 * ─────────────────────────────────────────────────────────────
 */

export interface UseItem {
  name: string
  /** Optional short descriptor shown in the faint mono style. */
  note?: string
}

export interface UseGroup {
  category: string
  items: UseItem[]
}

export const uses: UseGroup[] = [
  {
    category: "Hardware",
    items: [
      { name: "Development Laptop", note: "Core i7 / 16GB RAM" },
      { name: "External Monitor", note: "high-res dual workflow" },
      { name: "Mechanical Keyboard", note: "tactile switches" },
      { name: "Noise-Cancelling Headphones", note: "deep work" },
    ],
  },
  {
    category: "Editor & Terminal",
    items: [
      { name: "VS Code", note: "daily driver with Vim bindings" },
      { name: "Cursor / Neovim", note: "rapid editing & experiments" },
      { name: "Windows Terminal / PowerShell", note: "CLI workflow" },
      { name: "Git Bash", note: "version control" },
    ],
  },
  {
    category: "AI & Data Tools",
    items: [
      { name: "OpenAI & Vapi", note: "real-time voice & LLM pipelines" },
      { name: "Gemini AI & Claude", note: "multimodal & embeddings" },
      { name: "pgvector & Pinecone", note: "vector databases" },
      { name: "Postman", note: "REST API testing" },
      { name: "Docker", note: "isolated container runtimes" },
    ],
  },
  {
    category: "Stack Defaults",
    items: [
      { name: "Next.js & React 19", note: "full-stack SSR/SSG" },
      { name: "TypeScript", note: "strict type safety" },
      { name: "PostgreSQL & Prisma", note: "relational data" },
      { name: "Redis", note: "caching & queues" },
      { name: "Tailwind CSS", note: "styling" },
      { name: "Vercel", note: "deployment & edge" },
    ],
  },
]
