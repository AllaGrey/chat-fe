import { useCallback, useEffect, useState } from 'react'

import io, { Socket } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_SOCKET_URL

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      transports: ['websocket'],
      addTrailingSlash: false,
    })
    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [])

  const sendMessage = useCallback(
    (message: string) => {
      if (socket) {
        socket.emit('sendMessage', message)
      }
    },
    [socket]
  )

  const onMessage = useCallback(
    (callback: (message: string) => void) => {
      if (socket) {
        socket.on('message', callback)

        return () => {
          socket.off('message', callback)
        }
      }
    },
    [socket]
  )

  return { socket, sendMessage, onMessage }
}

export default useSocket
