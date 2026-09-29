/**
 * music.ts
 * ─────────────────────────────────────────────────────────────
 * Local tracks played by <MusicWidget />.
 *
 * 1. Drop your MP3 files into /public/music/
 * 2. Drop matching cover art into /public/music/covers/ (optional —
 *    falls back to /avatar.svg if you skip this)
 * 3. Add an entry below for each track.
 *
 * Only use tracks you have the rights to host (your own downloads
 * from royalty-free sources, music you own, or your own recordings).
 * Don't upload copyrighted commercial tracks to a public repo/site.
 * ─────────────────────────────────────────────────────────────
 */

export interface Track {
  id: string
  title: string
  artist: string
  /** Path under /public, e.g. "/music/song.mp3" */
  src: string
  /** Path under /public, e.g. "/music/covers/song.jpg". Optional. */
  cover?: string
}

export const musicConfig: Track[] = [
    {
      id: "track-1",
      title: "Chill",
      artist: "The Weekend",
      src: "/music/track-1.mp3",
      cover: "/music/covers/track-1.jpg",
    },
    {
      id: "track-1",
      title: "Chill",
      artist: "The Weekend",
      src: "/music/track-1.mp3",
      cover: "/music/covers/track-1.jpg",
    },
    {
    id: "track-2",
    title: "Another Song",
    artist: "Another Artist",
    src: "/music/track-2.mp3",
    cover: "/music/covers/track-2.jpg",
  },
  // Add as many as you like — the widget will shuffle/cycle through these.
]