import { FC, MouseEvent, ReactNode } from 'react'

import styles from './Button.module.css'

type Props = {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  title?: string
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
}

export const Button: FC<Props> = ({
  children,
  onClick,
  title = 'Login button',
  type = 'button',
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick ? e => onClick(e) : undefined}
      className={styles.button}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
