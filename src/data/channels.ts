import type { Channel } from '@/cores/types/channel'

export type { Channel }

// TODO: Replace placeholder content with real personal info
export const CHANNELS: Channel[] = [
  {
    id: 1,
    name: 'ABOUT ME',
    color: '#39ff14',
    component: null, // Replace with <AboutChannel />
  },
  {
    id: 2,
    name: 'EXPERIENCE',
    color: '#ffb000',
    component: null, // Replace with <ExperienceChannel />
  },
  {
    id: 3,
    name: 'SKILLS',
    color: '#00cfff',
    component: null, // Replace with <SkillsChannel />
  },
  {
    id: 4,
    name: 'CONTACT',
    color: '#ff6b6b',
    component: null, // Replace with <ContactChannel />
  },
]
