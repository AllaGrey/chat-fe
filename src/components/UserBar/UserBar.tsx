import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { randomPhoto } from '../../mocks'
import { useAuthStore } from '../../store'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { SearchInput } from '../SearchInput'
import { UserAvatar } from '../UserAvatar'
import styles from './UserBar.module.css'

export const UserBar: FC = () => {
  const { currentUser, signOut } = useAuthStore()
  const handleClick = () => {
    signOut()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.userBar}>
        <div className={styles.userInfo}>
          <UserAvatar photo={randomPhoto} />
          <p>{currentUser?.name}</p>
        </div>
        <div className={styles.userInfo}>
          <NavLink className={styles.navLink} to={'/settings'}>
            <Icon width={30} height={30} iconName="settings" />
          </NavLink>
          <Button onClick={handleClick}>Logout</Button>
        </div>
      </div>
      <SearchInput />
    </div>
  )
}
