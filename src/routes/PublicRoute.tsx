import { FC } from 'react'

import { Navigate } from 'react-router-dom'

type Props = {
  component: React.ComponentType
  redirectTo: string
}

const PublicRoute: FC<Props> = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = false

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />
}

export default PublicRoute
