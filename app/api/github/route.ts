import { NextResponse } from "next/server"
import { siteConfig } from "@/config/siteConfig"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${siteConfig.social.githubUsername}?y=last`,
      { next: { revalidate: 900 } } // upstream cached 15 min
    )
    if (!res.ok) throw new Error("upstream error")
    const data = await res.json()
    return NextResponse.json(
      {
        contributions: data.contributions as { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[],
        total: data.total as Record<string, number>,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=900, stale-while-revalidate=300",
        },
      }
    )
  } catch {
    return NextResponse.json(
      { contributions: [], total: {} },
      { headers: { "Cache-Control": "no-store" } }
    )
  }
}