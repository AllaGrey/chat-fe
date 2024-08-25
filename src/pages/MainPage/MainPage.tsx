import { FC } from 'react'

import { ChatDialog } from '../../components/ChatDialog'
import { ChatList } from '../../components/ChatList'
import { UserBar } from '../../components/UserBar'

const MainPage: FC = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ minWidth: '500px' }}>
          <UserBar />
          <ChatList />
        </div>
        <ChatDialog />
      </div>
    </>
  )
}

export default MainPage
