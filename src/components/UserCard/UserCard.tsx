import { FC } from 'react'

import { useChatsStore } from '../../store'
import { IUser } from '../../types'
import { Icon } from '../Icon'
import { UserAvatar } from '../UserAvatar'
import styles from './UserCard.module.css'

type Props = {
  user: Omit<IUser, 'accessToken'>
}

export const UserCard: FC<Props> = ({ user }) => {
  const { id, name, surname, avatar } = user

  const { openedChat, closeChat, createChat } = useChatsStore()

  const handleCreateChat = async (userId: string) => {
    if (openedChat) closeChat()
    createChat(userId)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatContent}>
        <UserAvatar photo={avatar} />
        <div className={styles.chatDetails}>
          <div className={styles.chatName}>
            <p>{name}</p>
            <p>{surname}</p>
          </div>
        </div>
      </div>
      <button
        className={styles.addChatButton}
        onClick={() => handleCreateChat(id)}
      >
        <Icon width={30} height={30} iconName="add" />
      </button>
    </div>
  )
}
