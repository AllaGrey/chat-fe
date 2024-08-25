// import AppRoutes from '../../routes/AppRoutes'
// import { Background } from '../../shared/components/Background/Background'
// import { CookieModalBanner } from '../CookieModalBanner/CookieModalBanner'
// import { Header } from '../Header/Header'
// import { Main } from './SharedLayout.styled'
import { FC } from 'react'

import AppRoutes from '../../routes/AppRoutes'
import { Header } from '../Header'
import styles from './Layout.module.css'

export const Layout: FC = () => {
  return (
    <>
      <Header />
      {/* <Main>
        <AppRoutes />
      </Main> */}
      <main className={styles.container}>
        <AppRoutes />
      </main>
    </>
  )
}
