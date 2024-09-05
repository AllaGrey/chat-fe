import { FC } from 'react'

import moment from 'moment'

import { useAuthStore } from '../../store'
import { IMessage } from '../../types/types'
import { UserAvatar } from '../UserAvatar'
import styles from './Message.module.css'

type Props = {
  message: IMessage
  avatar?: string
}

export const Message: FC<Props> = ({ message, avatar }) => {
  const { user, text, createdAt } = message
  const { currentUser } = useAuthStore()

  const isMe = user === currentUser?.id

  const formattedDate = moment(createdAt).format('MMM/D/YYYY, h:mm A')

  return (
    <div
      className={[styles.wrapper, `${isMe ? styles.myMessage : null}`].join(
        ' '
      )}
    >
      <div
        className={[
          styles.messageContentWrapper,
          isMe ? styles.myMessage : null,
        ].join(' ')}
      >
        {!isMe && avatar && <UserAvatar photo={avatar} />}
        <p className={styles.messageContent}>{text}</p>
      </div>
      <p className={styles.messageDate}>{formattedDate}</p>
    </div>
  )
}
