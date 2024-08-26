import { FC } from 'react'

import { chatListData } from '../../mocks/chatListData'
import { ChatCard } from '../ChatCard'
import styles from './ChatList.module.css'

type Props = {
  openDialog: () => void
}

export const ChatList: FC<Props> = ({ openDialog }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Chats</h2>
      {chatListData.map(chat => (
        <ChatCard key={chat.id} chat={chat} openDialog={openDialog} />
      ))}
    </div>
  )
}
