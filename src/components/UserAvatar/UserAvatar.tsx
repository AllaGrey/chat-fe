import { FC } from 'react'

import styles from './UserAvatar.module.css'

type Props = {
  photo: string
}

export const UserAvatar: FC<Props> = ({ photo }) => {
  return (
    <div className={styles.userAvatar}>
      <img src={photo} alt="avatar photo" />
    </div>
  )
}
