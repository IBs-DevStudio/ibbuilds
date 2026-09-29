"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Twitter, Github, BookOpen, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react'

import { siteConfig } from '@/config/siteConfig'

function UpworkIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.449-5.439-5.449z" />
    </svg>
  )
}

export default function Hero({ compact = false }: { compact?: boolean }) {
  const { personal, social, contact } = siteConfig
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="px-6 pt-6 pb-5 flex flex-col h-full overflow-y-auto" style={{ minHeight: 0 }}>

      {/* Name — edit siteConfig.personal.firstName / lastName */}
      <div className="mb-4">
        <h1
          className="font-semibold tracking-tight text-white leading-[0.92] mb-2.5"
          style={{ fontSize: compact ? 42 : 52 }}
        >
          {personal.firstName}<br />{personal.lastName}
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-secondary)" }}>
          {personal.role}
        </p>
      </div>

      <div style={{ height: 1, background: "var(--separator)", marginBottom: 16 }} />

      {/* Bio — edit siteConfig.personal.tagline */}
      <p className="text-[12.5px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
        {personal.tagline}
      </p>

      {/* Action CTA Buttons */}
      <div className="flex items-center gap-2.5 mt-3.5 flex-wrap">
        <a
          href={social.upwork || "https://www.upwork.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all group"
          style={{
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            color: "#4ade80",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Hire on Upwork
          <ArrowUpRight size={11} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
          style={{
            background: "var(--separator)",
            border: "1px solid var(--widget-border)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          {copied ? "Email Copied!" : "Copy Email"}
        </button>
      </div>

      {/* Highlights Strip */}
      <div
        className="grid grid-cols-4 gap-2 my-4 py-2.5 px-3 rounded-lg"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid var(--separator)",
        }}
      >
        <div>
          <p className="font-semibold text-white text-[12.5px] leading-tight">
            SIH 2024
          </p>
          <p className="font-mono text-[8.5px] uppercase tracking-wider text-[var(--text-muted)] mt-0.5">
            Finalist
          </p>
        </div>

        <div>
          <p className="font-semibold text-white text-[12.5px] leading-tight">
            100+
          </p>
          <p className="font-mono text-[8.5px] uppercase tracking-wider text-[var(--text-muted)] mt-0.5">
            Personalised AI Sessions
          </p>
        </div>

        <div>
          <p className="font-semibold text-white text-[12.5px] leading-tight">
            2×
          </p>
          <p className="font-mono text-[8.5px] uppercase tracking-wider text-[var(--text-muted)] mt-0.5">
            OCI Certified
          </p>
        </div>

        <div>
          <p className="font-semibold text-emerald-400 text-[12.5px] leading-tight">
            -95%
          </p>
          <p className="font-mono text-[8.5px] uppercase tracking-wider text-[var(--text-muted)] mt-0.5">
            API latency
          </p>
        </div>

      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between mt-auto pt-4"
        style={{ borderTop: "1px solid var(--separator)" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-md overflow-hidden flex-none">
            <Image src={personal.avatar} alt="" fill priority className="object-cover" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
              {personal.username}
            </p>
            <p className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
              {personal.location}{personal.age ? ` · ${personal.age}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[
            { href: social.upwork, icon: <UpworkIcon size={14} />, label: "Upwork" },
            { href: social.github, icon: <Github size={15} />, label: "GitHub" },
            { href: social.linkedin, icon: <Linkedin size={15} />, label: "LinkedIn" },
            { href: social.twitter, icon: <Twitter size={15} />, label: "X" },
            { href: social.blog, icon: <BookOpen size={15} />, label: "Blog" },
          ].filter(item => Boolean(item.href)).map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
