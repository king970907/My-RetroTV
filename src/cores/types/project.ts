export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  url: string
  thumbnail?: string // path under /public/thumbnails/
}
