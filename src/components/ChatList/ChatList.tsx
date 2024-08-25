import { FC } from 'react'

import { chatListData } from '../../mocks/chatListData'
import { ChatCard } from '../ChatCard'
import styles from './ChatList.module.css'

export const ChatList: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Chats</h2>
      {chatListData.map(chat => (
        <ChatCard key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
