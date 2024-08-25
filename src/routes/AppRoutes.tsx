import { Suspense, lazy } from 'react'

import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const MainPage = lazy(() => import('../pages/MainPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute redirectTo="/login" component={MainPage} />}
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute redirectTo="/login" component={SettingsPage} />
          }
        />

        <Route
          path="/login"
          element={<PublicRoute redirectTo="/" component={LoginPage} />}
        />

        <Route
          path="/register"
          element={<PublicRoute redirectTo="/" component={RegisterPage} />}
        />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
