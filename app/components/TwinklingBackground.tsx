"use client"

import { useEffect, useRef } from "react"

export interface TwinklingBackgroundProps {
  mode?: "boot" | "ambient"
  progress?: number // 0 to 1
  interactive?: boolean
  className?: string
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
  angle: number
  hasDiagonal: boolean
  shimmerFreq: number
  peakAlpha: number
  palette: ThemePalette
}


interface Wave {
  cx: number
  cy: number
  startTime: number
  duration: number
  maxRadius: number
  ignitedCols: Set<string>
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
  mode = "ambient",
  progress = 0,
  interactive = true,
  className = "",
}: TwinklingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparklesRef = useRef<Sparkle[]>([])
  const wavesRef = useRef<Wave[]>([])
  const nextIdRef = useRef(1)
  const lastProgressRef = useRef(progress)
  const currentPaletteRef = useRef<ThemePalette>(PALETTES.midnight)
  const lastSpawnRef = useRef(0)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)
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

  // Handle milestone shockwaves during boot
  useEffect(() => {
    if (mode !== "boot") return

    const prev = lastProgressRef.current
    const curr = progress
    lastProgressRef.current = curr

    const milestones = [0.2, 0.45, 0.7, 0.9, 1.0]
    for (const m of milestones) {
      if (prev < m && curr >= m) {
        triggerShockwave(m === 1.0 ? 1.5 : 1.0)
        if (m === 1.0) {
          triggerCelebrationBurst()
        }
        break
      }
    }
  }, [progress, mode])



  const triggerShockwave = (intensityMultiplier = 1.0) => {
    if (typeof window === "undefined") return
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const maxRadius = Math.hypot(cx, cy) * 1.1

    wavesRef.current.push({
      cx,
      cy,
      startTime: performance.now(),
      duration: 900 * intensityMultiplier,
      maxRadius,
      ignitedCols: new Set(),
    })
  }

  const triggerCelebrationBurst = () => {
    if (typeof window === "undefined") return
    const now = performance.now()
    const cols = Math.ceil(window.innerWidth / GRID_SIZE)
    const rows = Math.ceil(window.innerHeight / GRID_SIZE)

    // Sparkle 45 random dots across the grid simultaneously
    for (let i = 0; i < 45; i++) {
      const c = Math.floor(Math.random() * cols)
      const r = Math.floor(Math.random() * rows)
      addSparkle(c, r, now + Math.random() * 300, 1.4)
    }
  }

  const addSparkle = (
    col: number,
    row: number,
    startTime: number,
    sizeMult = 1.0
  ) => {
  
    const existing = sparklesRef.current.some(
      (s) => s.col === col && s.row === row && s.startTime <= startTime && s.startTime + s.duration > startTime
    )
    if (existing) return

    const x = col * GRID_SIZE + OFFSET_X
    const y = row * GRID_SIZE + OFFSET_Y
    const isBoot = mode === "boot"

    const duration = (isBoot ? 750 + Math.random() * 450 : 1200 + Math.random() * 1000) * (0.85 + Math.random() * 0.3)
    const maxFlare = (isBoot ? 10 + Math.random() * 12 : 7 + Math.random() * 8) * sizeMult
    const maxCore = (isBoot ? 1.8 + Math.random() * 1.0 : 1.2 + Math.random() * 0.8) * sizeMult

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
      angle: (Math.random() - 0.5) * 0.3,
      hasDiagonal: Math.random() > 0.4,
      shimmerFreq: 1 + Math.random() * 2.5,
      peakAlpha: 0.85 + Math.random() * 0.15,
      palette: currentPaletteRef.current,
    })

    // Keep sparkles list bounded
    if (sparklesRef.current.length > 200) {
      sparklesRef.current.shift()
    }
  }

  // Mouse trail listener
  useEffect(() => {
    if (!interactive) return

    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      const now = performance.now()
      if (now - lastMouseSpawnRef.current > 40) {
        lastMouseSpawnRef.current = now
        const col = Math.round((e.clientX - OFFSET_X) / GRID_SIZE)
        const row = Math.round((e.clientY - OFFSET_Y) / GRID_SIZE)
        // 40% chance of sparking nearest dot on move
        if (Math.random() < 0.4) {
          addSparkle(col, row, now, 0.95)
        }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const touch = e.touches[0]
      const now = performance.now()
      if (now - lastMouseSpawnRef.current > 60) {
        lastMouseSpawnRef.current = now
        const col = Math.round((touch.clientX - OFFSET_X) / GRID_SIZE)
        const row = Math.round((touch.clientY - OFFSET_Y) / GRID_SIZE)
        addSparkle(col, row, now, 0.95)
      }
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [interactive, mode])

  // Main canvas animation loop
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

      // Spontaneous background spawning
      const spawnInterval = mode === "boot" ? Math.max(50, 180 - progress * 140) : 450
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now
        const batch = mode === "boot" ? 2 + Math.floor(progress * 4) : 1
        for (let b = 0; b < batch; b++) {
          const col = Math.floor(Math.random() * cols)
          const row = Math.floor(Math.random() * rows)
          addSparkle(col, row, now, mode === "boot" ? 1.1 : 0.9)
        }
      }

      // Process and ignite shockwaves
      if (wavesRef.current.length > 0) {
        wavesRef.current = wavesRef.current.filter((wave) => {
          const elapsed = now - wave.startTime
          const waveProgress = elapsed / wave.duration
          if (waveProgress >= 1) return false

          const currentRadius = waveProgress * wave.maxRadius
          const waveBandwidth = 38 // px wide active wave crest

          // Check grid dots near this radius
          const minCol = Math.max(0, Math.floor((wave.cx - currentRadius - waveBandwidth) / GRID_SIZE))
          const maxCol = Math.min(cols, Math.ceil((wave.cx + currentRadius + waveBandwidth) / GRID_SIZE))

          for (let c = minCol; c <= maxCol; c++) {
            const dotX = c * GRID_SIZE + OFFSET_X
            const dx = dotX - wave.cx
            if (Math.abs(dx) > currentRadius + waveBandwidth) continue

            const dySq = currentRadius * currentRadius - dx * dx
            if (dySq < 0) continue
            const dy = Math.sqrt(dySq)

            const targetY1 = wave.cy + dy
            const targetY2 = wave.cy - dy

            const r1 = Math.round((targetY1 - OFFSET_Y) / GRID_SIZE)
            const r2 = Math.round((targetY2 - OFFSET_Y) / GRID_SIZE)

            for (const r of [r1, r2]) {
              if (r >= 0 && r <= rows) {
                const key = `${c},${r}`
                if (!wave.ignitedCols.has(key)) {
                  wave.ignitedCols.add(key)
                  // 60% chance to spark as wave passes
                  if (Math.random() < 0.65) {
                    addSparkle(c, r, now, 1.25)
                  }
                }
              }
            }
          }

          return true
        })
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
        // Smooth sine bell curve for fade in & out
        const curve = Math.sin(t * Math.PI)
        const shimmer = 0.88 + 0.12 * Math.sin(now * 0.025 * s.shimmerFreq)
        const alpha = Math.min(1, Math.max(0, Math.pow(curve, 1.3) * s.peakAlpha * shimmer))

        if (alpha > 0.01) {
          drawGlitterSparkle(ctx, s, curve, alpha)
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
  }, [mode, progress])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      aria-hidden="true"
    />
  )
}

function drawGlitterSparkle(
  ctx: CanvasRenderingContext2D,
  s: Sparkle,
  curve: number,
  alpha: number
) {
  const { x, y, maxFlare, maxCore, angle, hasDiagonal, palette } = s

  ctx.save()
  ctx.translate(x, y)
  if (angle !== 0) ctx.rotate(angle)

  // 1. Soft radial bloom glow
  const glowRadius = maxFlare * 1.35 * curve
  if (glowRadius > 1) {
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius)
    grad.addColorStop(0, palette.glowColor.replace("__A__", (alpha * 0.65).toFixed(3)))
    grad.addColorStop(0.4, palette.glowColor.replace("__A__", (alpha * 0.22).toFixed(3)))
    grad.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(0, 0, glowRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  // 2. Specular 4-pointed diamond glint (horizontal & vertical needle spikes)
  const flareLen = maxFlare * Math.pow(curve, 1.15)
  const flareThickness = Math.max(0.6, 1.6 * curve)

  if (flareLen > 2) {
    ctx.fillStyle = palette.glintColor.replace("__A__", Math.min(1, alpha * 0.95).toFixed(3))

    // Horizontal spike
    ctx.beginPath()
    ctx.moveTo(-flareLen, 0)
    ctx.quadraticCurveTo(0, -flareThickness, flareLen, 0)
    ctx.quadraticCurveTo(0, flareThickness, -flareLen, 0)
    ctx.fill()

    // Vertical spike
    const vLen = flareLen * 0.85
    ctx.beginPath()
    ctx.moveTo(0, -vLen)
    ctx.quadraticCurveTo(-flareThickness, 0, 0, vLen)
    ctx.quadraticCurveTo(flareThickness, 0, 0, -vLen)
    ctx.fill()

    // 3. Secondary 45° diagonal glint (diamond facet sparkle)
    if (hasDiagonal && curve > 0.35) {
      const diagLen = flareLen * 0.42
      const diagThick = flareThickness * 0.6
      ctx.save()
      ctx.rotate(Math.PI / 4)
      ctx.beginPath()
      ctx.moveTo(-diagLen, 0)
      ctx.quadraticCurveTo(0, -diagThick, diagLen, 0)
      ctx.quadraticCurveTo(0, diagThick, -diagLen, 0)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, -diagLen)
      ctx.quadraticCurveTo(-diagThick, 0, 0, diagLen)
      ctx.quadraticCurveTo(diagThick, 0, 0, -diagLen)
      ctx.fill()
      ctx.restore()
    }
  }

  // 4. Brilliant bright core dot
  const coreRadius = Math.max(1, maxCore * curve)
  ctx.beginPath()
  ctx.arc(0, 0, coreRadius, 0, Math.PI * 2)
  ctx.fillStyle = palette.coreColor
  ctx.globalAlpha = Math.min(1, alpha * 1.1)
  ctx.fill()

  ctx.restore()
}
