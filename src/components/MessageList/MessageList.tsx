import { FC, useEffect, useRef } from 'react'

import { useChatsStore } from '../../store'
import { Message } from '../Message'
import styles from './MessageList.module.css'

export const MessageList: FC = () => {
  const { messageList, getMessageList, openedChat } = useChatsStore()

  const lastMessageRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    getMessageList()
  }, [])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messageList])

  return (
    <ul className={styles.wrapper}>
      {messageList.length > 0 &&
        messageList.map((message, index) => (
          <li ref={index === messageList.length - 1 ? lastMessageRef : null}>
            <Message
              key={message._id}
              message={message}
              avatar={openedChat?.otherUser.avatar}
            />
          </li>
        ))}
    </ul>
  )
}
