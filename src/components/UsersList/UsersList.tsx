import { FC } from 'react'

import { useChatsStore } from '../../store'
import { UserCard } from '../UserCard'
import styles from './UsersList.module.css'

export const UsersList: FC = () => {
  const filteredUsers = useChatsStore(state =>
    state.usersList.filter(user =>
      user.name.toLowerCase().includes(state.filter.toLowerCase())
    )
  )
  return (
    <div className={styles.wrapper}>
      <h2 className={filteredUsers.length > 0 ? styles.header : styles.hidden}>
        Users
      </h2>
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
