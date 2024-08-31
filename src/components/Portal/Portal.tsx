import { FC, ReactNode } from 'react'

import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const portalRoot = document.getElementById('portal-root')
  return portalRoot ? createPortal(children, portalRoot) : null
}
