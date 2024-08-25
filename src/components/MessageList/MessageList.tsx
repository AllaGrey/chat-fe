import { FC } from 'react'

import { Message } from '../Message'
import styles from './MessageList.module.css'

interface IMessage {
  id: string
  sender: string
  text: string
  createdAt: string
}

type Props = {
  messages: IMessage[]
}

export const MessageList: FC<Props> = ({ messages }) => {
  console.log(messages, 'message list')

  return (
    <ul className={styles.wrapper}>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  )
}
