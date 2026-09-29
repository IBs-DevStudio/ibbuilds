"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"
import { windows } from "@/config/windows"

function UpworkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.449-5.439-5.449z" />
    </svg>
  )
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

type DockItem =
  | { kind: "window"; id: string; label: string; icon: React.ReactNode }
  | { kind: "link"; id: string; label: string; icon: React.ReactNode; url: string }

const dockApps: DockItem[] = windows.map((w) => ({
  kind: "window",
  id: w.id,
  label: w.title,
  icon: <w.icon size={22} strokeWidth={1.5} aria-hidden="true" />,
}))

const dockLinks: DockItem[] = [
  { kind: "link", id: "upwork",   label: "Upwork",   icon: <UpworkIcon size={18} />,                                  url: siteConfig.social.upwork || "https://www.upwork.com" },
  { kind: "link", id: "github",   label: "GitHub",   icon: <Github size={20} strokeWidth={1.5} aria-hidden="true" />, url: siteConfig.social.github },
  { kind: "link", id: "linkedin", label: "LinkedIn", icon: <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />, url: siteConfig.social.linkedin },
  { kind: "link", id: "twitter",  label: "X",        icon: <XIcon size={18} />,                                       url: siteConfig.social.twitter },
]

function DockIcon({
  item,
  mouseX,
  isOpen,
  onActivate,
}: {
  item: DockItem
  mouseX: ReturnType<typeof useMotionValue<number>>
  isOpen: boolean
  onActivate: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeTransform = useTransform(distance, [-120, 0, 120], [40, 62, 40])
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 200, damping: 14 })

  return (
    <div className="relative flex flex-col items-center gap-1">
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-full mb-2 px-2.5 py-1 rounded font-mono text-[10px] uppercase tracking-[0.06em] whitespace-nowrap pointer-events-none"
            style={{
              background: "var(--tooltip-bg)",
              border: "1px solid var(--widget-border)",
              color: "var(--text-primary)",
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.1 }}
            aria-hidden="true"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        type="button"
        aria-label={item.label}
        aria-pressed={item.kind === "window" ? isOpen : undefined}
        style={{ width: size, height: size }}
        animate={{
          background: isOpen ? "rgba(255,255,255,0.1)" : hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
          color: isOpen ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
        }}
        transition={{ duration: 0.15 }}
        className="rounded-xl flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        whileTap={{ scale: 0.88 }}
        onClick={onActivate}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {item.icon}
      </motion.button>

      <span
        aria-hidden="true"
        className="w-1 h-1 rounded-full"
        style={{
          background: isOpen ? "var(--accent)" : "transparent",
          transition: "background 0.2s",
        }}
      />
    </div>
  )
}

export default function Dock({
  openWindows,
  onToggleWindow,
}: {
  openWindows: string[]
  onToggleWindow: (id: string, url?: string) => void
}) {
  const mouseX = useMotionValue(Infinity)

  return (
    <nav
      aria-label="Application dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]"
    >
      <motion.div
        className="flex items-end gap-2 px-3 pb-2 pt-2.5 rounded-2xl"
        style={{
          background: "var(--dock-bg)",
          border: "1px solid var(--widget-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockApps.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isOpen={openWindows.includes(item.id)}
            onActivate={() => onToggleWindow(item.id)}
          />
        ))}

        <span
          aria-hidden="true"
          className="h-8 self-center mx-1 rounded-full"
          style={{ width: 1, background: "var(--widget-border)" }}
        />

        {dockLinks.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isOpen={false}
            onActivate={() => onToggleWindow(item.id, item.kind === "link" ? item.url : undefined)}
          />
        ))}
      </motion.div>
    </nav>
  )
}
