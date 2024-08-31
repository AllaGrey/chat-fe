import { FC } from 'react'

import { useChatsStore } from '../../store'
import { ChatCard } from '../ChatCard'
import styles from './ChatList.module.css'

export const ChatList: FC = () => {
  const filteredChats = useChatsStore(state =>
    state.chats.filter(chat =>
      chat.otherUser.name.toLowerCase().includes(state.filter.toLowerCase())
    )
  )
  return (
    <div className={styles.wrapper}>
      <h2 className={filteredChats.length > 0 ? styles.header : styles.hidden}>
        Chats
      </h2>
      {filteredChats.map(chat => (
        <ChatCard key={chat._id} chat={chat} />
      ))}
    </div>
  )
}
