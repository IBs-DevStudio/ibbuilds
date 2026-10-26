"use client"

import { useState } from "react"
import { ArrowUpRight, Star } from "lucide-react"
import { motion } from "framer-motion"
// Project lists live in /config/projects.ts.
import { projects, type ProjectItem } from "@/config/projects"
import ProjectModal from "../modals/ProjectModal"

function ProjectList({
  projects,
  onSelectProject,
}: {
  projects: ProjectItem[]
  onSelectProject: (p: ProjectItem) => void
}) {
  return (
    <div>
      {projects.map((p, i) => (
        <motion.div
          key={p.title}
          role="button"
          tabIndex={0}
          onClick={() => onSelectProject(p)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onSelectProject(p)
            }
          }}
          className="group flex items-start justify-between gap-4 py-4 cursor-pointer select-none transition-all duration-150 px-2.5 -mx-2.5 rounded-lg hover:bg-white/[0.03]"
          style={{
            borderTop: i === 0 ? "1px solid var(--separator)" : undefined,
            borderBottom: "1px solid var(--separator)",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[13px] font-semibold text-white group-hover:text-white/80 transition-colors">
                {p.title}
              </span>
              {p.stars !== undefined && (
                <span
                  className="flex items-center gap-0.5 font-mono text-[10px]"
                  style={{ color: "var(--text-faint)" }}
                >
                  <Star size={9} className="fill-current text-amber-400" />
                  {p.stars}
                </span>
              )}
              {p.status && (
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded"
                  style={{
                    color: "var(--text-muted)",
                    border: "1px solid var(--widget-border)",
                  }}
                >
                  {p.status}
                </span>
              )}
            </div>
            <p className="text-[12px] leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
              {p.description}
            </p>
            <p className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
              {p.tech.join(" · ")}
            </p>
          </div>

          <div className="flex-none flex items-center gap-1 mt-0.5 opacity-30 group-hover:opacity-100 transition-opacity">
            <span
              className="font-mono text-[10px] hidden sm:inline uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Details
            </span>
            <ArrowUpRight
              size={14}
              style={{ color: "white" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Projects({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = useState<"personal" | "client">("personal")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const { personal: personalProjects, client: clientProjects } = projects

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={compact ? "px-6 py-6" : "py-20 px-6"}
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.14em] mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          Projects
        </p>

        {/* Tabs */}
        <div
          className="flex gap-5 mb-5"
          style={{ borderBottom: "1px solid var(--separator)" }}
        >
          {(["personal", "client"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="font-mono text-[10px] uppercase tracking-[0.1em] pb-2 transition-colors cursor-pointer"
              style={{
                color: tab === t ? "var(--text-primary)" : "var(--text-muted)",
                borderBottom: tab === t ? "1px solid var(--accent)" : "1px solid transparent",
                marginBottom: -1,
              }}
            >
              {t === "personal" ? "Personal" : "Client Work"}
            </button>
          ))}
        </div>

        {tab === "personal" ? (
          <ProjectList projects={personalProjects} onSelectProject={setSelectedProject} />
        ) : (
          <ProjectList projects={clientProjects} onSelectProject={setSelectedProject} />
        )}
      </motion.section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
