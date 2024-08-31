import { FC, useEffect } from 'react'

import { useChatsStore } from '../../store'
import { Message } from '../Message'
import styles from './MessageList.module.css'

export const MessageList: FC = () => {
  const { messageList, getMessageList, openedChat } = useChatsStore()

  useEffect(() => {
    getMessageList()
  }, [])

  return (
    <ul className={styles.wrapper}>
      {messageList.length > 0 &&
        messageList.map(message => (
          <Message
            key={message._id}
            message={message}
            avatar={openedChat?.otherUser.avatar}
          />
        ))}
    </ul>
  )
}
