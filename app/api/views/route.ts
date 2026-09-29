import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"


let fallbackViews = 1482

export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (url && token) {
    try {
      const res = await fetch(`${url}/incr/portfolio:views`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      })
      const data = await res.json()
      if (typeof data.result === "number") {
        return NextResponse.json({ count: data.result })
      }
    } catch {
      // Fallback below
    }
  }

  // Graceful fallback for local development or until Upstash env vars are added
  fallbackViews += 1
  return NextResponse.json({ count: fallbackViews })
}
