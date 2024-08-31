import { FC } from 'react'

import { useForm } from 'react-hook-form'

import { Icon } from '../Icon'
import styles from './MessageInput.module.css'

type Props = {
  onSendMessage: (message: string) => void
}

export const MessageInput: FC<Props> = ({ onSendMessage }) => {
  const { register, handleSubmit, reset } = useForm<{ message: string }>()

  const onSubmit = handleSubmit(({ message }) => {
    onSendMessage(message)
    reset()
  })

  return (
    <form onSubmit={onSubmit}>
      <label className={styles.label}>
        <input className={styles.input} type="text" {...register('message')} />
        <button className={styles.sendButton} type="submit">
          <Icon width={20} height={20} iconName="send" />
        </button>
      </label>
    </form>
  )
}
