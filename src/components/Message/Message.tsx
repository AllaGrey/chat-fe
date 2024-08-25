import { FC } from 'react'

import { randomPhoto } from '../../mocks'
import { UserAvatar } from '../UserAvatar'
import styles from './Message.module.css'

type Props = {
  message: {
    id: string
    sender: string
    text: string
    createdAt: string
  }
}

export const Message: FC<Props> = ({ message }) => {
  const { sender, text, createdAt } = message

  const isMe = sender === 'Doogy'

  return (
    <li
      className={[styles.wrapper, `${isMe ? styles.myMessage : null}`].join(
        ' '
      )}
    >
      <div
        className={[
          styles.messageContentWrapper,
          `${isMe ? styles.myMessage : null}`,
        ].join(' ')}
      >
        {!isMe && <UserAvatar photo={randomPhoto} />}
        <p className={styles.messageContent}>{text}</p>
      </div>
      <p className={styles.messageDate}>{createdAt}</p>
    </li>
  )
}
