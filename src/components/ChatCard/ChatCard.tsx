import { FC } from 'react'

import { randomPhoto } from '../../mocks'
import { UserAvatar } from '../UserAvatar'
import styles, { chatDetails } from './ChatCard.module.css'

type Props = {
  chat: {
    id: string
    name: string
    lastMessage: string
    createdAt: string
  }
  openDialog: () => void
}

export const ChatCard: FC<Props> = ({ chat, openDialog }) => {
  const { name, lastMessage, createdAt } = chat
  return (
    <div className={styles.wrapper} onClick={openDialog}>
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
