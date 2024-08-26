import { FC, useEffect } from 'react'

import AppRoutes from '../../routes/AppRoutes'
import { useAuthStore } from '../../store'
import { Header } from '../Header'
import styles from './Layout.module.css'

export const Layout: FC = () => {
  const { getUser } = useAuthStore()

  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <Header />

      <main className={styles.container}>
        <AppRoutes />
      </main>
    </>
  )
}
