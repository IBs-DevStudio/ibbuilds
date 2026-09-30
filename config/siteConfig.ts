/**
 * siteConfig.ts
 * ─────────────────────────────────────────────────────────────
 * Identity, social profiles, contact details, and page metadata.
 * ─────────────────────────────────────────────────────────────
 */

// ── Types ───────────────────────────────────────────────────────────

export interface Personal {
  firstName: string
  lastName: string
  fullName: string
  /** Two-letter badge shown in the mobile status bar (e.g. "JD"). */
  initials: string
  /** Short role shown under your name in the Hero (e.g. "Frontend Engineer"). */
  role: string
  /** Longer title shown on the résumé header. */
  shortRole: string
  /** One-paragraph bio shown in the Hero. */
  tagline: string
  /** "City, Country" — displayed in Hero footer and résumé header. */
  location: string
  age: number | string
  phone: string
  /** Path (in /public) to your avatar image. */
  avatar: string
  /** Handle shown next to the avatar (no @). */
  username: string
}

export interface Social {
  github: string
  twitter: string
  linkedin: string
  leetcode: string
  upwork: string
  /** Medium, Hashnode, personal blog, etc. */
  blog: string
  /** Bare GitHub username used in labels + API calls. */
  githubUsername: string
  /** Twitter/X handle, no @. */
  twitterHandle: string
  linkedinHandle: string
}

export interface ContactRow {
  icon: "mail" | "phone" | "calendar" | "twitter" | "github" | "linkedin" | "upwork"
  href: string
  label: string
  /** Short monospaced value shown on the right of each row. */
  mono: string
}

export interface Contact {
  email: string
  phone: string
  calendar: string
  heading: string
  subheading: string
  rows: ContactRow[]
}

export interface Seo {
  title: string
  description: string
}

export interface Features {
  /** If true, the arrow-arrow-b-a Konami code triggers an easter egg overlay. */
  konami: boolean
}

export interface SiteConfig {
  personal: Personal
  social: Social
  contact: Contact
  seo: Seo
  /** URL to an external résumé (Notion page, Google Doc, hosted PDF). */
  resumeLink: string
  features: Features
}

// ── EDIT BELOW ──────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  personal: {
    firstName: "Ikram",
    lastName: "Banadar",
    fullName: "Ikram Banadar",
    initials: "IB",
    role: "Full-Stack Developer & AI Developer",
    shortRole: "Freelance Full-Stack & AI Developer",
    tagline:
      "Freelance Full-Stack Web & AI Developer on Upwork. B.Tech in CS (AI & ML). Building production AI SaaS platforms, voice-first systems, and high-performance web applications.",
    location: "Belgaum, Karnataka, India",
    age: "", // fill in if you want this shown, or leave blank to hide
    phone: "+91 9110451262",
    avatar: "/Avatar.jpeg",
    username: "IBs-DevStudio",
  },

  social: {
    github: "https://github.com/IBs-DevStudio",
    twitter: "https://x.com/IkramBanadar",
    linkedin: "https://www.linkedin.com/in/ikrambanadarwebdev",
    leetcode: "https://leetcode.com/u/ikrambanadar04",
    upwork: "https://www.upwork.com/freelancers/~013fb349334b6d27af?mp_source=share",
    blog: "/blog",
    githubUsername: "IBs-DevStudio",
    twitterHandle: "IkramBanadar",
    linkedinHandle: "ikrambanadar",
  },

  contact: {
    email: "ikrambanadar04@gmail.com",
    phone: "+91 9110451262",
    calendar: "",
    heading: "Let's Connect",
    subheading: "Available for freelance contracts on Upwork, full-stack web apps, and AI engineering projects.",
    rows: [
      { icon: "upwork",   href: "https://www.upwork.com",          label: "Upwork",      mono: "Available for Hire" },
      { icon: "mail",     href: "mailto:ikrambanadar04@gmail.com", label: "Email",       mono: "ikrambanadar04@gmail.com" },
      { icon: "phone",    href: "tel:+919110451262",              label: "Phone",       mono: "+91 9110451262" },
      { icon: "github",   href: "https://github.com/IBs-DevStudio", label: "GitHub",      mono: "IBs-DevStudio" },
      { icon: "linkedin", href: "https://linkedin.com/in/ikrambanadar", label: "LinkedIn", mono: "in/ikrambanadar" },
      { icon: "twitter",  href: "https://x.com/IkramBanadar",      label: "X / Twitter", mono: "@IkramBanadar" },
    ],
  },

  seo: {
    title: "Ikram Banadar — Freelance Web & AI Developer",
    description: "Portfolio of Ikram Banadar (IB) — Freelance Full-Stack Web & AI Developer on Upwork. B.Tech in CS (AI & ML).",
  },

  resumeLink: "https://github.com/IBs-DevStudio",

  features: {
    konami: true,
  },
}