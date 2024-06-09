'use client'

import { PauseIcon, PlayIcon } from '@radix-ui/react-icons'
import WavesurferPlayer from '@wavesurfer/react'
import { Button } from 'components/ui/button'
import { cn } from 'lib/utils'
import { FC, useState } from 'react'

type Props = {
  className?: string
  audio: string
}

export const WaveformPlayer: FC<Props> = ({ className, audio }) => {
  const [wavesurfer, setWavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  if (!audio) return null

  const onReady = (ws) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  return (
    <div className={cn('flex gap-3 items-center', className)}>
      <Button
        onClick={onPlayPause}
        size="icon"
        variant="secondary"
        className="rounded-full"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>

      <div className="flex-1">
        <WavesurferPlayer
          height={50}
          barWidth={2}
          barGap={2}
          waveColor="#94a3b8"
          progressColor="#1e40af"
          url={audio}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onInteraction={() => wavesurfer && wavesurfer.play()}
        />
      </div>
    </div>
  )
}
