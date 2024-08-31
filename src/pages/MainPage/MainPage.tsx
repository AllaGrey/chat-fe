import { FC, useEffect } from 'react'

import { ChatDialog } from '../../components/ChatDialog'
import { ChatList } from '../../components/ChatList'
import { UserBar } from '../../components/UserBar'
import { UsersList } from '../../components/UsersList'
import { useChatsStore } from '../../store'
import styles from './MainPage.module.css'

const MainPage: FC = () => {
  const { chats, usersList, openedChat, getChats, getAllUsers } =
    useChatsStore()

  useEffect(() => {
    getChats()
  }, [openedChat])

  useEffect(() => {
    getAllUsers()
  }, [chats])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chatsMenu}>
          {openedChat ? (
            <ChatDialog />
          ) : (
            <>
              <UserBar />
              {chats.length > 0 && <ChatList />}
              {usersList.length > 0 && <UsersList />}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MainPage
