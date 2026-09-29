import { NextResponse } from "next/server"

/**
 * Add as many songs as you want here. One is picked at random
 * each time the widget loads/refreshes (every 30s, per your
 * NowPlaying component's polling interval).
 */
const songs = [
  {
    title: "It's My Life",
    artist: "Bon Jovi",
    album: "Crush",
    albumImageUrl: "/music/covers/track-1.jpg",
    songUrl: "https://open.spotify.com/track/0v1XpBHnsbkCn7iJ9Ucr1l",
  },
  {
    title: "Cry For Me",
    artist: "The Weeknd",
    album: "Starboy",
    albumImageUrl: "/music/covers/cryforme.jpg",
    songUrl: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
  },
  {
    title: "Die For You",
    artist: "The Weeknd",
    album: "Starboy",
    albumImageUrl: null,
    songUrl: "https://open.spotify.com/track/2Wo6QQVwmoBseWM2vDpNqx",
  },
  // add more songs the same way
]

export async function GET() {
  const song = songs[Math.floor(Math.random() * songs.length)]
  return NextResponse.json({
    isPlaying: true,
    configured: true,
    ...song,
  })
}