"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/siteConfig"

interface PreloaderProps {
  onProgress: (progress: number) => void
  onComplete: () => void
}

const STATUS_STAGES = [
  { at: 0, text: "INITIALIZING ENVIRONMENT" },
  { at: 22, text: "CALIBRATING INTERFACE MATRIX" },
  { at: 48, text: "SYNCHRONIZING AI & WORKSPACE" },
  { at: 74, text: "ENABLING INTERACTIVE SHADERS" },
  { at: 92, text: "FINALIZING SYSTEM" },
  { at: 100, text: "SYSTEM READY" },
]

export default function Preloader({ onProgress, onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0)
  const [statusText, setStatusText] = useState(STATUS_STAGES[0].text)
  const isCompletingRef = useRef(false)
  const animFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const handleFinish = useCallback(() => {
    if (isCompletingRef.current) return
    isCompletingRef.current = true
    setPercent(100)
    setStatusText("SYSTEM READY")
    onProgress(1.0)
    setTimeout(() => {
      onComplete()
    }, 320)
  }, [onProgress, onComplete])

  useEffect(() => {
    const TOTAL_DURATION = 1900 // ms

    const tick = (now: number) => {
      if (isCompletingRef.current) return
      if (!startTimeRef.current) startTimeRef.current = now

      const elapsed = now - startTimeRef.current
      const rawProgress = Math.min(1, elapsed / TOTAL_DURATION)

      // Nonlinear organic pacing (snappy start -> organic hesitation -> sprint to 100)
      let displayProgress: number
      if (rawProgress < 0.35) {
        displayProgress = (rawProgress / 0.35) * 0.42
      } else if (rawProgress < 0.65) {
        const sub = (rawProgress - 0.35) / 0.3
        displayProgress = 0.42 + sub * 0.28
      } else {
        const sub = (rawProgress - 0.65) / 0.35
        displayProgress = 0.70 + Math.pow(sub, 1.4) * 0.30
      }

      const p = Math.min(1, Math.max(0, displayProgress))
      const intVal = Math.floor(p * 100)

      setPercent(intVal)
      onProgress(p)

      // Update status line
      for (let i = STATUS_STAGES.length - 1; i >= 0; i--) {
        if (intVal >= STATUS_STAGES[i].at) {
          setStatusText(STATUS_STAGES[i].text)
          break
        }
      }

      if (rawProgress >= 1) {
        handleFinish()
      } else {
        animFrameRef.current = requestAnimationFrame(tick)
      }
    }

    animFrameRef.current = requestAnimationFrame(tick)

    // Keyboard shortcut to skip (Escape or Space or Enter)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault()
        handleFinish()
      }
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [handleFinish, onProgress])

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center select-none cursor-pointer"
      style={{
        background: "radial-gradient(circle at center, rgba(11,11,11,0.25) 0%, rgba(11,11,11,0.75) 100%)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(12px)",
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={handleFinish}
    >
      <motion.div
        className="flex flex-col items-center text-center px-8 py-7 rounded-2xl"
        style={{
          background: "rgba(11, 11, 11, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.03)",
        }}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Monogram squircle tile */}
        <div className="relative mb-5 group">
          <div
            className="w-16 h-16 rounded-[18px] flex items-center justify-center relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 0 35px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            }}
          >
            {/* Shimmer line across monogram icon */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
            />
            <span
              className="font-mono text-xl font-bold tracking-tight text-white/90"
              style={{ textShadow: "0 0 12px rgba(255,255,255,0.4)" }}
            >
              {siteConfig.personal.initials}
            </span>
          </div>

          {/* Micro pulsing online indicator */}
          <div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
            style={{ background: "#0b0b0b" }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
        </div>

        {/* Identity & Role */}
        <div className="mb-6 space-y-1">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/90 font-medium">
            {siteConfig.personal.fullName}
          </h2>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
            {siteConfig.personal.role}
          </p>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-56 mb-3">
          <div
            className="h-[2.5px] w-full rounded-full overflow-hidden relative"
            style={{ background: "rgba(255, 255, 255, 0.08)" }}
          >
            <motion.div
              className="h-full rounded-full relative"
              style={{
                width: `${percent}%`,
                background: "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, var(--accent, #ffffff) 100%)",
                boxShadow: percent > 0 ? "0 0 10px rgba(255,255,255,0.6), 0 0 18px var(--accent, rgba(255,255,255,0.3))" : "none",
              }}
            >
              {/* Sparkle leading head */}
              {percent > 2 && percent < 99 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Status Line + Percentage Counter */}
        <div className="w-56 flex items-center justify-between font-mono text-[10px] text-white/45">
          <span className="tracking-wider flex items-center gap-1.5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: percent === 100 ? "#34d399" : "var(--accent, #ffffff)",
                boxShadow: percent === 100 ? "0 0 6px #34d399" : "0 0 6px var(--accent, #ffffff)",
              }}
            />
            {statusText}
          </span>
          <span className="tabular-nums text-white/70 font-semibold">{percent}%</span>
        </div>

        {/* Subtle skip prompt */}
        <p
          className="font-mono text-[9px] uppercase tracking-widest text-white/25 mt-7 transition-opacity duration-300 hover:text-white/45"
          onClick={handleFinish}
        >
          Click anywhere or press ESC to enter
        </p>
      </motion.div>
    </motion.div>
  )
}
