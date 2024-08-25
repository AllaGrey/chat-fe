// /* eslint-disable react/prop-types */
import { FC } from 'react'

import { Navigate } from 'react-router-dom'

// import { useAuth } from '../hooks/useAuth/useAuth'

type Props = {
  component: React.ComponentType<any>
  redirectTo: string
}

const PublicRoute: FC<Props> = ({ component: Component, redirectTo = '/' }) => {
  // const { isLoggedIn } = useAuth()

  const isLoggedIn = false

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />
}

export default PublicRoute
