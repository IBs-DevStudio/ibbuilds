"use client"

import { useEffect, useRef, useState } from "react"
import { Music2 } from "lucide-react"
import { motion, useDragControls } from "framer-motion"
import { musicConfig } from "@/config/music"

export default function MusicWidget() {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const dragControls = useDragControls()

  const track = musicConfig[index]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => handleNext()
    audio.addEventListener("ended", onEnded)
    return () => audio.removeEventListener("ended", onEnded)
  }, [index])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  function handleNext() {
    setIndex((i) => (i + 1) % musicConfig.length)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 50)
  }

  if (musicConfig.length === 0) return null

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      className="absolute select-none"
      style={{ bottom: 24, left: 24, zIndex: 5, width: 340 }}
    >
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <div className="widget-handle" onPointerDown={(e) => dragControls.start(e)}>
        <div style={{ width: 24, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
      </div>

      <button
        onClick={togglePlay}
        className="widget-body w-full flex items-center gap-3 px-3 py-3"
        style={{ textAlign: "left" }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            flexShrink: 0,
            background: "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {track.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={track.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Music2 size={15} style={{ color: "var(--text-faint)" }} />
          )}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            className="text-[12px] font-mono truncate"
            style={{ color: isPlaying ? "var(--text-secondary)" : "var(--text-muted)" }}
          >
            {isPlaying ? track.title : "not playing"}
          </div>
          {isPlaying && (
            <div className="text-[10px] font-mono truncate" style={{ color: "var(--text-faint)" }}>
              {track.artist}
            </div>
          )}
        </div>

        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isPlaying ? "rgba(30,215,96,0.15)" : "transparent",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={isPlaying ? "#1ED760" : "var(--text-faint)"}
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.32 9.72-.66 13.439 1.62.361.181.54.78.302 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      </button>
    </motion.div>
  )
}