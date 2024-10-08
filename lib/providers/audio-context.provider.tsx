'use client'

import { createContext, FC, useState } from 'react'

type AudioContextType = {
  play: (id: string) => void
  pause: (id: string) => void
  isPlaying: (id: string) => boolean
}

export const AudioContext = createContext<AudioContextType>({
  play: () => {
    console.error('AudioContext not initialized')
  },
  pause: () => {
    console.error('AudioContext not initialized')
  },
  isPlaying: () => {
    console.error('AudioContext not initialized')
    return false
  },
})

export const AudioContextProvider: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [playing, setPlaying] = useState<boolean>(false)

  const play = (id: string) => {
    if (playingId !== id) {
      setPlayingId(id)
    }
    setPlaying(true)
  }

  const pause = (id: string) => {
    if (playingId !== id) {
      return
    }
    setPlaying(false)
  }

  const toggle = (id: string) => {
    if (isPlaying(id)) {
      pause(id)
    } else {
      play(id)
    }
  }

  const isPlaying = (id: string) => playing && playingId === id

  const value = { play, pause, isPlaying, toggle }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
