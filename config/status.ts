
export interface StatusRow {
  /** Short label (5-10 chars reads best). */
  label: string
  value: string
}

export interface StatusConfig {
  available: boolean
  label: string
  currently: StatusRow[]
}

export const status: StatusConfig = {
  available: true,
  label: "Available Full Time",
  currently: [
    { label: "Role",     value: "Open to full-time roles" },
    { label: "Status",   value: "Freelance Web & AI Dev @ Upwork" },
    { label: "Base",     value: "Open to contract (>30 hrs/wk)" },
  ],
}
