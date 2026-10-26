"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExternalLink, Github, Star } from "lucide-react"
import type { ProjectItem } from "@/config/projects"

interface ProjectModalProps {
  project: ProjectItem | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  const githubUrl = project.githubUrl || (project.link?.includes("github.com") ? project.link : undefined)
  const liveUrl = project.liveUrl || (!project.link?.includes("github.com") ? project.link : undefined)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden sm:max-w-xl max-h-[85vh] flex flex-col"
        style={{
          background: "var(--widget-bg)",
          border: "1px solid var(--widget-border)",
          borderRadius: 12,
          boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Header with window controls & title */}
        <div
          className="px-6 pt-5 pb-4 pr-14 flex-none"
          style={{ borderBottom: "1px solid var(--separator)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(254,188,46,0.7)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(40,200,64,0.7)" }} />
              <span
                className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em]"
                style={{ color: "var(--text-faint)" }}
              >
                Project Overview
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.stars !== undefined && (
                <span
                  className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--widget-border)",
                    color: "var(--text-faint)",
                  }}
                >
                  <Star size={10} className="fill-current text-amber-400" />
                  {project.stars}
                </span>
              )}
              {project.status && (
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded font-medium"
                  style={{
                    color: "var(--accent)",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--widget-border)",
                  }}
                >
                  {project.status}
                </span>
              )}
            </div>
          </div>

          <DialogTitle className="text-[17px] font-semibold text-white tracking-tight leading-snug">
            {project.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {project.description}
          </DialogDescription>
        </div>

        {/* Scrollable details */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1">
          {/* Overview */}
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2"
              style={{ color: "var(--text-faint)" }}
            >
              Description
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Capabilities */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2.5"
                style={{ color: "var(--text-faint)" }}
              >
                Key Highlights
              </p>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="font-mono text-[10px] flex-none pt-[2px]"
                      style={{ color: "var(--accent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2.5"
              style={{ color: "var(--text-faint)" }}
            >
              Technologies & Frameworks
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--widget-border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons: GitHub & Live Link side-by-side */}
        <div
          className="px-6 py-4 flex items-center gap-3 flex-none"
          style={{
            borderTop: "1px solid var(--separator)",
            background: "rgba(0, 0, 0, 0.25)",
          }}
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2.5 rounded-md transition-all duration-150 group"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--widget-border)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"
                e.currentTarget.style.borderColor = "var(--widget-border)"
              }}
            >
              <Github size={14} className="group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2.5 rounded-md transition-all duration-150 group font-semibold"
              style={{
                background: "#ffffff",
                color: "#0a0a0a",
                boxShadow: "0 2px 10px rgba(255, 255, 255, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)"
                e.currentTarget.style.transform = "translateY(-1px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
              <span>Live Link</span>
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
