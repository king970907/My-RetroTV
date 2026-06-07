import type { Project } from '@/cores/types/project'

export type { Project }

// TODO: Replace with real projects
export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'Short description of what this project does.',
    tech: ['React', 'TypeScript'],
    url: '#',
    thumbnail: undefined,
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'Short description of what this project does.',
    tech: ['Vue', 'Node.js'],
    url: '#',
    thumbnail: undefined,
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description: 'Short description of what this project does.',
    tech: ['React Native', 'Firebase'],
    url: '#',
    thumbnail: undefined,
  },
]
