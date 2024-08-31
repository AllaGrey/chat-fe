import { FC } from 'react'

import { useChatsStore } from '../../store'
import { Icon } from '../Icon'
import styles from './SearchInput.module.css'

export const SearchInput: FC = () => {
  const { filter, filterUsers } = useChatsStore()
  return (
    <label className={styles.label}>
      <span className={styles.icon}>
        <Icon width={20} height={20} iconName="search" />
      </span>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search or start new chat"
        value={filter}
        onChange={e => filterUsers(e.target.value)}
      />
    </label>
  )
}
