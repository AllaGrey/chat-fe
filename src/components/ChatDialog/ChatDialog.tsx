import { FC, useEffect } from 'react'

import useSocket from '../../hooks'
import { randomPhoto } from '../../mocks'
import { useAuthStore, useChatsStore } from '../../store'
import { Icon } from '../Icon'
import { MessageInput } from '../MessageInput'
import { MessageList } from '../MessageList'
import { UserAvatar } from '../UserAvatar'
import styles from './ChatDialog.module.css'

export const ChatDialog: FC = () => {
  const { onMessage } = useSocket()

  const { openedChat, closeChat, addMessage, receiveMessage } = useChatsStore()
  const { currentUser } = useAuthStore()

  useEffect(() => {
    onMessage(newMessage => {
      console.log(newMessage)
      receiveMessage(JSON.parse(newMessage))
    })
  }, [onMessage])

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !currentUser || !openedChat) return

    const messageObj = {
      user: currentUser.id,
      text: message.trim(),
      chat: openedChat._id,
    }

    addMessage(messageObj)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.topDialog}>
        <UserAvatar photo={openedChat?.otherUser?.avatar || randomPhoto} />
        <p>
          {openedChat?.otherUser.name} {openedChat?.otherUser.surname}
        </p>
        <button
          className={styles.closeButton}
          type="button"
          title="Close dialog"
          onClick={() => closeChat()}
        >
          <Icon width={30} height={30} iconName="close" />
        </button>
      </div>

      <div className={styles.content}>
        <MessageList />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
