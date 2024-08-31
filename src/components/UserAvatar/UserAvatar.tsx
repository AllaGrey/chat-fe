import { FC } from 'react'

import styles from './UserAvatar.module.css'

type Props = {
  photo: string
  title?: string
}

export const UserAvatar: FC<Props> = ({ photo, title = "user's photo" }) => {
  return (
    <div className={styles.userAvatar}>
      <img src={photo} alt={title} />
    </div>
  )
}
