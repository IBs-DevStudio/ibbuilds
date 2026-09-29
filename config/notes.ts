/**
 * notes.ts
 * ─────────────────────────────────────────────────────────────
 * Short, informal journal-style notes rendered in the Notes
 * window. Paragraphs are separated by blank lines (\n\n) — single
 * newlines are preserved as line breaks.
 *
 * Sort order is as written — newest first is the convention.
 * ─────────────────────────────────────────────────────────────
 */

export interface NoteItem {
  /** Display date, e.g. "Mar 2026". */
  date: string
  /** Body text. Separate paragraphs with a blank line. */
  body: string
}

export const notes: NoteItem[] = [
  {
    date: "Mar 2026",
    body: `Engineering sub-second voice AI (Cogniva):

Cutting response latency in voice AI from 2.8s down to 850ms taught me that perceptual speed matters far more than raw model benchmarks.

When you stream token chunks directly into audio synthesizers via Vapi and OpenAI callbacks, the conversation becomes natural. If response latency is above 1.5s, users talk over the AI. Below 900ms, the interface disappears and it feels like a real tutor sitting across the table.`,
  },
  {
    date: "Feb 2026",
    body: `Lessons on Codebase RAG with Gemini & pgvector (GitIntellect):

Naive character-based chunking fails on code. A function split across chunks loses all contextual semantic meaning.

Preserving AST boundaries (class definitions, function signatures, module exports) in vector metadata dropped retrieval misses drastically. Sub-200ms retrieval is fast, but precise indexing is what actually makes the answers trustworthy.`,
  },
  {
    date: "Jan 2026",
    body: `Smart India Hackathon reflections:

Leading a 6-developer team through 36 continuous hours of building an AI image processing system was intense.

The biggest lesson wasn't the AI model—it was architectural discipline. Clear interface contracts established in the first two hours prevented massive merge conflicts at 3 AM. Small, atomic PRs beat big hero pushes every time.`,
  },
  {
    date: "Dec 2025",
    body: `Component architecture in React & Next.js:

Reusable component systems aren't just about clean code; they are about iteration velocity.

At Vinayak IT Solutions and across my AI projects, establishing strict component boundaries and pushing state to where it actually belongs reduced UI development overhead by nearly 40%.`,
  },
]
