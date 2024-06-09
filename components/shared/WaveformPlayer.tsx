'use client'

import { PauseIcon, PlayIcon } from '@radix-ui/react-icons'
import WavesurferPlayer from '@wavesurfer/react'
import { Button } from 'components/ui/button'
import { cn } from 'lib/utils'
import { FC, useEffect, useState } from 'react'

export type WaveformPlayerProps = {
  className?: string
  audio: string
  showButton?: boolean
  onPlay?: () => void
  onPause?: () => void
  isPlaying?: boolean
}

export const WaveformPlayer: FC<WaveformPlayerProps> = ({
  className,
  audio,
  showButton = true,
  onPause,
  onPlay,
  isPlaying,
}) => {
  const [wavesurfer, setWavesurfer] = useState(null)

  useEffect(() => {
    if (!wavesurfer) return

    if (isPlaying) {
      wavesurfer.play()
    } else {
      wavesurfer.pause()
    }
  }, [isPlaying, wavesurfer])

  if (!audio) return null

  const onReady = (ws) => {
    setWavesurfer(ws)
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      onPause && onPause()
    } else {
      onPlay && onPlay()
    }
  }

  return (
    <div className={cn('flex gap-3 items-center', className)}>
      {showButton && (
        <Button onClick={togglePlayPause} size="icon" className="rounded-full">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      )}

      <div className="flex-1">
        <WavesurferPlayer
          height={50}
          barWidth={2}
          barGap={2}
          waveColor="#94a3b8"
          progressColor="#1e40af"
          url={audio}
          onReady={onReady}
          onPlay={() => onPlay && onPlay()}
          onPause={() => onPause && onPause()}
          onInteraction={() => wavesurfer && wavesurfer.play()}
        />
      </div>
    </div>
  )
}
