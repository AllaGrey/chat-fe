import { FC, MouseEvent, ReactNode } from 'react'

import styles from './Button.module.css'

type Props = {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  title?: 'button' | 'submit'
  type?: 'button' | 'submit' | 'reset'
}

export const Button: FC<Props> = ({
  children,
  onClick,
  title = 'Login button',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick ? e => onClick(e) : undefined}
      className={styles.button}
    >
      {children}
    </button>
  )
}
