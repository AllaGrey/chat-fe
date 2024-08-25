import { FC } from 'react'

import { randomPhoto } from '../../mocks'
import { useAuthStore } from '../../store'
import { Button } from '../Button'
import { SearchInput } from '../SearchInput'
import { UserAvatar } from '../UserAvatar'
import styles from './UserBar.module.css'

export const UserBar: FC = () => {
  const currentUser = useAuthStore()
  const handleClick = () => {
    console.log('User logged in')
    console.log(currentUser)
    useAuthStore()

    // Perform login logic here
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles['user-bar']}>
        <UserAvatar photo={randomPhoto} />
        <Button onClick={handleClick}>Login</Button>
      </div>
      <SearchInput />
    </div>
  )
}
