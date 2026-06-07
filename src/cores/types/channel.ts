import type { ReactNode } from 'react'

export interface Channel {
  id: number
  name: string
  color: string
  component: ReactNode
}
