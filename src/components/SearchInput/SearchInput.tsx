import { FC } from 'react'

import { Icon } from '../Icon'
import styles from './SearchInput.module.css'

export const SearchInput: FC = () => {
  return (
    <label className={styles.label}>
      <div className={styles.icon}>
        <Icon width={20} height={20} iconName="search" />
      </div>
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Search or start new chat"
      />
    </label>
  )
}
