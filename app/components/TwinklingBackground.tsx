"use client"

import { useEffect, useRef } from "react"

export interface TwinklingBackgroundProps {
  interactive?: boolean
  className?: string
  // Optional backwards compatibility props
  mode?: "boot" | "ambient"
  progress?: number
}

interface Sparkle {
  id: number
  col: number
  row: number
  x: number
  y: number
  startTime: number
  duration: number
  maxFlare: number
  maxCore: number
  palette: ThemePalette
}

interface ThemePalette {
  coreColor: string
  glowColor: string
  glintColor: string
}

const PALETTES: Record<string, ThemePalette> = {
  midnight: {
    coreColor: "#ffffff",
    glowColor: "rgba(220, 235, 255, __A__)",
    glintColor: "rgba(255, 255, 255, __A__)",
  },
  amber: {
    coreColor: "#fff6e5",
    glowColor: "rgba(255, 175, 65, __A__)",
    glintColor: "rgba(255, 220, 160, __A__)",
  },
  crimson: {
    coreColor: "#fff0f3",
    glowColor: "rgba(210, 30, 55, __A__)",
    glintColor: "rgba(255, 175, 190, __A__)",
  },
  rust: {
    coreColor: "#fff2ea",
    glowColor: "rgba(255, 120, 35, __A__)",
    glintColor: "rgba(255, 190, 140, __A__)",
  },
}

const GRID_SIZE = 28
const OFFSET_X = 14
const OFFSET_Y = 14

export default function TwinklingBackground({
  interactive = true,
  className = "",
}: TwinklingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparklesRef = useRef<Sparkle[]>([])
  const nextIdRef = useRef(1)
  const currentPaletteRef = useRef<ThemePalette>(PALETTES.midnight)
  const lastSpawnRef = useRef(0)
  const lastMouseSpawnRef = useRef(0)

  // Track active CSS theme via MutationObserver on <html>
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.dataset.theme || "midnight"
      currentPaletteRef.current = PALETTES[theme] || PALETTES.midnight
    }
    updateTheme()

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          updateTheme()
        }
      }
    })
    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  const addSparkle = (
    col: number,
    row: number,
    startTime: number,
    sizeMult = 1.0
  ) => {
    // Avoid double-sparkling the same dot simultaneously
    const existing = sparklesRef.current.some(
      (s) =>
        s.col === col &&
        s.row === row &&
        s.startTime <= startTime &&
        s.startTime + s.duration > startTime
    )
    if (existing) return

    const x = col * GRID_SIZE + OFFSET_X
    const y = row * GRID_SIZE + OFFSET_Y

    // Subtle, calm duration & flare sized for refined grid twinkling
    const duration = (1200 + Math.random() * 600)
    const maxFlare = (6 + Math.random() * 4.5) * sizeMult
    const maxCore = (1.1 + Math.random() * 0.4) * sizeMult

    sparklesRef.current.push({
      id: nextIdRef.current++,
      col,
      row,
      x,
      y,
      startTime,
      duration,
      maxFlare,
      maxCore,
      palette: currentPaletteRef.current,
    })

    // Keep sparkles list bounded
    if (sparklesRef.current.length > 50) {
      sparklesRef.current.shift()
    }
  }

  // Subtle mouse & touch interaction on grid dots
  useEffect(() => {
    if (!interactive) return

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseSpawnRef.current > 70) {
        lastMouseSpawnRef.current = now
        const col = Math.round((e.clientX - OFFSET_X) / GRID_SIZE)
        const row = Math.round((e.clientY - OFFSET_Y) / GRID_SIZE)
        // 25% chance of gently twinkling nearest grid dot on move
        if (Math.random() < 0.25) {
          addSparkle(col, row, now, 0.9)
        }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const touch = e.touches[0]
      const now = performance.now()
      if (now - lastMouseSpawnRef.current > 90) {
        lastMouseSpawnRef.current = now
        const col = Math.round((touch.clientX - OFFSET_X) / GRID_SIZE)
        const row = Math.round((touch.clientY - OFFSET_Y) / GRID_SIZE)
        if (Math.random() < 0.3) {
          addSparkle(col, row, now, 0.9)
        }
      }
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [interactive])

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height)

      const cols = Math.ceil(width / GRID_SIZE)
      const rows = Math.ceil(height / GRID_SIZE)

      // Spontaneous calm background twinkling on the grid
      const spawnInterval = 600 + Math.random() * 400 // ~600-1000ms
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now
        const col = Math.floor(Math.random() * cols)
        const row = Math.floor(Math.random() * rows)
        addSparkle(col, row, now)
      }

      // Draw all active sparkles
      const remainingSparkles: Sparkle[] = []

      for (let i = 0; i < sparklesRef.current.length; i++) {
        const s = sparklesRef.current[i]
        const elapsed = now - s.startTime
        if (elapsed < 0) {
          remainingSparkles.push(s)
          continue
        }
        if (elapsed >= s.duration) {
          continue
        }

        const t = elapsed / s.duration // 0 -> 1
        // Smooth sine bell curve for gradual fade-in and fade-out
        const curve = Math.sin(t * Math.PI)
        const alpha = Math.min(1, Math.max(0, Math.pow(curve, 1.2) * 0.9))

        if (alpha > 0.01) {
          drawGridTwinkle(ctx, s, curve, alpha)
        }

        remainingSparkles.push(s)
      }

      sparklesRef.current = remainingSparkles
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      aria-hidden="true"
    />
  )
}

function drawGridTwinkle(
  ctx: CanvasRenderingContext2D,
  s: Sparkle,
  curve: number,
  alpha: number
) {
  const { x, y, maxFlare, maxCore, palette } = s

  ctx.save()
  ctx.translate(x, y)

  // 1. Soft radial glow illuminating the grid dot
  const glowRadius = maxFlare * 1.2 * curve
  if (glowRadius > 1) {
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius)
    grad.addColorStop(0, palette.glowColor.replace("__A__", (alpha * 0.55).toFixed(3)))
    grad.addColorStop(0.5, palette.glowColor.replace("__A__", (alpha * 0.15).toFixed(3)))
    grad.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(0, 0, glowRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  // 2. Clean 4-pointed micro diamond glint aligned with the dot
  const flareLen = maxFlare * Math.pow(curve, 1.1)
  const flareThickness = Math.max(0.5, 1.1 * curve)

  if (flareLen > 1.2) {
    ctx.fillStyle = palette.glintColor.replace("__A__", Math.min(1, alpha * 0.85).toFixed(3))

    // Horizontal glint needle
    ctx.beginPath()
    ctx.moveTo(-flareLen, 0)
    ctx.quadraticCurveTo(0, -flareThickness, flareLen, 0)
    ctx.quadraticCurveTo(0, flareThickness, -flareLen, 0)
    ctx.fill()

    // Vertical glint needle
    const vLen = flareLen * 0.8
    ctx.beginPath()
    ctx.moveTo(0, -vLen)
    ctx.quadraticCurveTo(-flareThickness, 0, 0, vLen)
    ctx.quadraticCurveTo(flareThickness, 0, 0, -vLen)
    ctx.fill()
  }

  // 3. Crisp bright core dot directly highlighting the grid intersection
  const coreRadius = Math.max(0.8, maxCore * curve)
  ctx.beginPath()
  ctx.arc(0, 0, coreRadius, 0, Math.PI * 2)
  ctx.fillStyle = palette.coreColor
  ctx.globalAlpha = Math.min(1, alpha * 1.05)
  ctx.fill()

  ctx.restore()
}
