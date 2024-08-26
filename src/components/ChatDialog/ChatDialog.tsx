import { FC } from 'react'

import { messages, randomPhoto } from '../../mocks'
import { Icon } from '../Icon'
import { MessageInput } from '../MessageInput'
import { MessageList } from '../MessageList'
import { UserAvatar } from '../UserAvatar'
import styles from './ChatDialog.module.css'

type Props = {
  isChatDialogOpened: boolean
  toggleOpenChat: () => void
}

export const ChatDialog: FC<Props> = ({
  isChatDialogOpened,
  toggleOpenChat,
}) => {
  return (
    <div
      className={[
        styles.wrapper,
        `${isChatDialogOpened ? styles.openedDialog : ''}`,
      ].join(' ')}
    >
      <div className={styles.topDialog}>
        <UserAvatar photo={randomPhoto} />
        <p>User Name</p>
        <button className={styles.closeButton} onClick={toggleOpenChat}>
          <Icon width={30} height={30} iconName="close" />
        </button>
      </div>

      <div className={styles.contentWrapper}>
        <MessageList messages={messages} />
        <MessageInput />
      </div>
    </div>
  )
}
