"use client"

import { motion } from "framer-motion"
import { Twitter, Mail, Github, Calendar, Phone, Linkedin } from "lucide-react"
// Contact rows + headings come from /config/siteConfig.ts → contact.
import { siteConfig, type ContactRow } from "@/config/siteConfig"

function UpworkIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.449-5.439-5.449z" />
    </svg>
  )
}

const ICONS = {
  upwork:   <UpworkIcon size={15} />,
  mail:     <Mail size={15} />,
  phone:    <Phone size={15} />,
  calendar: <Calendar size={15} />,
  twitter:  <Twitter size={15} />,
  github:   <Github size={15} />,
  linkedin: <Linkedin size={15} />,
} as const

export default function Contact({ compact = false }: { compact?: boolean }) {
  const { contact } = siteConfig

  return (
    <div className={compact ? "px-6 py-6" : "py-20 px-6"}>
      <p
        className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        Contact
      </p>
      <h2 className="text-[22px] font-semibold text-white mb-1">{contact.heading}</h2>
      <p className="text-[13px] mb-7" style={{ color: "var(--text-secondary)" }}>
        {contact.subheading}
      </p>

      <div className="space-y-0">
        {contact.rows.map((c: ContactRow, i: number) => (
          <motion.a
            key={i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-4"
            style={{
              borderTop: i === 0 ? "1px solid var(--separator)" : undefined,
              borderBottom: "1px solid var(--separator)",
            }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex items-center gap-3">
              <span style={{ color: "var(--text-muted)" }}>{ICONS[c.icon]}</span>
              <span
                className="text-[13px] font-medium text-white/70 group-hover:text-white transition-colors"
              >
                {c.label}
              </span>
            </div>
            <span
              className="font-mono text-[10px] group-hover:text-white/50 transition-colors"
              style={{ color: "var(--text-faint)" }}
            >
              {c.mono}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
