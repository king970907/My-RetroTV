import type { Channel } from '@/cores/types/channel'
import styles from './ChannelContent.module.css'

interface Props {
  channel: Channel
}

export default function ChannelContent({ channel }: Props) {
  return (
    <div className={styles.wrapper} style={{ '--accent': channel.color } as React.CSSProperties}>
      <div className={styles.header}>
        <span className={styles.channelNum}>CH {channel.id.toString().padStart(2, '0')}</span>
        <span className={styles.channelName}>{channel.name}</span>
      </div>
      <div className={styles.body}>
        {channel.component}
      </div>
    </div>
  )
}
