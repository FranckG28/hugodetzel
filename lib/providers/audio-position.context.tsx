'use client'

import { createContext, FC, useState } from 'react'

export const AudioPositionContext = createContext({
  position: 0,
  setPosition: (position: number) => {},
  registerWavesurfer: (wavesurfer: any) => {},
})

type Props = {
  children: React.ReactNode
}

export const AudioPositionProvider: FC<Props> = ({ children }) => {
  const [position, setPosition] = useState(0)

  const registerWavesurfer = (wavesurfer: any) => {
    wavesurfer.on('audioprocess', () => {
      setPosition(wavesurfer.getCurrentTime())
    })
    wavesurfer.on('seek', () => {
      setPosition(wavesurfer.getCurrentTime())
    })
  }

  return (
    <AudioPositionContext.Provider
      value={{ position, setPosition, registerWavesurfer }}
    >
      {children}
    </AudioPositionContext.Provider>
  )
}
