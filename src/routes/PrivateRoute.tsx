import { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuthStore } from '../store'

type Props = {
  component: React.ComponentType<unknown>
  redirectTo: string
}

const PrivateRoute: FC<Props> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { isLoggedIn, isLoading } = useAuthStore()

  const shouldRedirect = !isLoggedIn && !isLoading

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />
}

export default PrivateRoute
