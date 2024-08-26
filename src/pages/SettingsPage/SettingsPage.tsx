import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { Icon } from '../../components/Icon'
import { UserSettingsForm } from '../../components/UserSettingsForm'
import styles from './SettingsPage.module.css'

const SettingsPage: FC = () => {
  return (
    <div>
      <NavLink className={styles.backLink} to={'/'}>
        <Icon width={30} height={30} iconName="arrow" />
        <span>Go back</span>
      </NavLink>
      <UserSettingsForm />
    </div>
  )
}

export default SettingsPage
