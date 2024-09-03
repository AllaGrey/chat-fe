import { useCallback, useEffect, useState } from 'react'

import Ably from 'ably'

const ABLY_API_KEY = import.meta.env.VITE_ABLY_API_KEY

const useSocket = () => {
  const [ably, setAbly] = useState<Ably.Realtime | null>(null)
  const [channel, setChannel] = useState<Ably.RealtimeChannel | null>(null)

  useEffect(() => {
    const ablyInstance = new Ably.Realtime({ key: ABLY_API_KEY })
    setAbly(ablyInstance)

    ablyInstance.connection.on('connected', () => {
      console.log('Connected to Ably')
    })

    ablyInstance.connection.on('disconnected', () => {
      console.log('Disconnected from Ably')
    })

    const ablyChannel = ablyInstance.channels.get('chat')
    setChannel(ablyChannel)

    return () => {
      ablyInstance.close()
    }
  }, [])

  const sendMessage = useCallback(
    (message: string) => {
      if (channel) {
        console.log('Sending message to Ably:', message)
        channel
          .publish('message', message)
          .then(() => {
            console.log('Message sent successfully to Ably')
          })
          .catch(err => {
            console.error('Failed to send message to Ably:', err)
          })
      }
    },
    [channel]
  )

  const onMessage = useCallback(
    (callback: (message: string) => void) => {
      if (channel) {
        channel.subscribe('message', msg => {
          console.log('Received message from Ably:', msg.data)
          callback(msg.data as string)
        })

        return () => {
          channel.unsubscribe('message')
        }
      }
    },
    [channel]
  )

  return { ably, sendMessage, onMessage }
}

export default useSocket
