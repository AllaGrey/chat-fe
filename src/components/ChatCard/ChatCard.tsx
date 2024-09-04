import { FC, MouseEvent, useEffect, useState } from 'react'

import moment from 'moment'

import useSocket from '../../hooks'
import { useAuthStore, useChatsStore } from '../../store'
import { IChat } from '../../types'
import { truncateString } from '../../utils'
import { Icon } from '../Icon'
import { Modal } from '../Modal'
import { UserAvatar } from '../UserAvatar'
import styles from './ChatCard.module.css'

type Props = {
  chat: IChat
}

export const ChatCard: FC<Props> = ({ chat }) => {
  const { _id, latestMessage, unreadMessagesCount } = chat
  const { name, surname, avatar } = chat.otherUser

  const {
    openedChat,
    openChat,
    closeChat,
    getMessageList,
    deleteChat,
    receiveMessage,
    updateChatUnreadCount,
  } = useChatsStore()

  const { currentUser } = useAuthStore()

  const { onMessage } = useSocket()

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    onMessage(newMessage => {
      const parsedMessage = JSON.parse(newMessage)

      if (
        parsedMessage.chat === chat._id &&
        parsedMessage.user !== currentUser?.id
      ) {
        receiveMessage(parsedMessage)

        if (openedChat?._id !== chat._id) {
          updateChatUnreadCount(chat._id)
        }
      }
    })
  }, [
    onMessage,
    chat._id,
    openedChat,
    currentUser?.id,
    receiveMessage,
    updateChatUnreadCount,
  ])

  const cutMessage = latestMessage ? truncateString(latestMessage.text, 16) : ''
  const formattedDate = latestMessage
    ? moment(latestMessage.createdAt).format('MMM D, YYYY')
    : ''

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleOpenChat = async (chat: IChat) => {
    if (openedChat) closeChat()
    await getMessageList()
    openChat(chat)
  }

  const handleDeleteChat = () => {
    deleteChat(_id)
    setIsModalOpen(false)
  }

  return (
    <>
      <div className={styles.wrapper} onClick={() => handleOpenChat(chat)}>
        <div className={styles.chatContent}>
          <UserAvatar title={`${name} ${surname} photo`} photo={avatar} />
          <div className={styles.chatDetails}>
            <div className={styles.chatName}>
              <p>{name}</p>
              <p>{surname}</p>
            </div>
            <p className={styles.chatMessage}>{cutMessage}</p>
          </div>
        </div>
        <p className={styles.chatTimestamp}>{formattedDate}</p>
        <button
          type="button"
          title="Delete chat"
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          <Icon width={20} height={20} iconName="close" />
        </button>
        {unreadMessagesCount > 0 && (
          <span className={styles.unreadMessageCount}>
            {unreadMessagesCount}
          </span>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteChat}
      />
    </>
  )
}
