import { FC, useState } from 'react'

import { ChatDialog } from '../../components/ChatDialog'
import { ChatList } from '../../components/ChatList'
import { UserBar } from '../../components/UserBar'
import styles from './MainPage.module.css'

const MainPage: FC = () => {
  const [isChatDialogOpened, setIsChatDialogOpened] = useState<boolean>(false)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.chatsMenu}>
          <UserBar />
          <ChatList openDialog={() => setIsChatDialogOpened(true)} />
        </div>
        <ChatDialog
          isChatDialogOpened={isChatDialogOpened}
          toggleOpenChat={() => setIsChatDialogOpened(!isChatDialogOpened)}
        />
      </div>
    </>
  )
}

export default MainPage
