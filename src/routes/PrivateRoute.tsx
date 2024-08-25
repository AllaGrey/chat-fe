import { FC } from 'react'

import { Navigate } from 'react-router-dom'

// import { useAuth } from '../hooks/useAuth/useAuth'

type Props = {
  component: React.ComponentType<any>
  redirectTo: string
}

const PrivateRoute: FC<Props> = ({
  component: Component,
  redirectTo = '/',
}) => {
  // const { isLoggedIn, isRefreshing } = useAuth()

  const isLoggedIn = false
  const isRefreshing = false
  const shouldRedirect = !isLoggedIn && !isRefreshing

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />
}

export default PrivateRoute
