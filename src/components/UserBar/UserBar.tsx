import { FC } from 'react'

import { randomPhoto } from '../../mocks'
import { useAuthStore } from '../../store'
import { Button } from '../Button'
import { SearchInput } from '../SearchInput'
import { UserAvatar } from '../UserAvatar'
import styles from './UserBar.module.css'

export const UserBar: FC = () => {
  const { currentUser, signOut } = useAuthStore()
  const handleClick = () => {
    signOut()
    console.log(currentUser)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['user-bar']}>
        <UserAvatar photo={randomPhoto} />
        <p>{currentUser?.name}</p>

        <Button onClick={handleClick}>Logout</Button>
      </div>
      <SearchInput />
    </div>
  )
}
