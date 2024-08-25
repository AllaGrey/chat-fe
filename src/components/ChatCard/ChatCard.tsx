import { FC } from 'react'

import { randomPhoto } from '../../mocks'
import { UserAvatar } from '../UserAvatar'
import styles, { chatDetails } from './ChatCard.module.css'

type Props = {
  chat: {
    id: number
    name: string
    lastMessage: string
    createdAt: string
  }
}

export const ChatCard: FC<Props> = ({ chat }) => {
  const { name, lastMessage, createdAt } = chat
  return (
    <div className={styles.wrapper}>
      <div className={styles.chatContent}>
        <UserAvatar photo={randomPhoto} />
        <div className={chatDetails}>
          <p className={styles.chatName}>{name}</p>
          <p className={styles.chatMessage}>{lastMessage}</p>
        </div>
      </div>
      <p className={styles.chatTimestamp}>{createdAt}</p>
    </div>
  )
}
