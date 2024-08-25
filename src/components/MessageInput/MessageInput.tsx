import { FC } from 'react'

import { Icon } from '../Icon'
import styles from './MessageInput.module.css'

export const MessageInput: FC = () => {
  return (
    <label className={styles.label}>
      <input className={styles.input} type="text" />
      <button className={styles.sendButton}>
        <Icon width={20} height={20} iconName="send" />
      </button>
    </label>
  )
}
