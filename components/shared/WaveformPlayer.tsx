'use client'

import { PauseIcon, PlayIcon } from '@radix-ui/react-icons'
import WavesurferPlayer from '@wavesurfer/react'
import { Button } from 'components/ui/button'
import { cn } from 'lib/utils'
import { FC, useEffect, useState } from 'react'

export type WaveformPlayerProps = {
  className?: string
  showButton?: boolean
  onPlay?: () => void
  onPause?: () => void
  onTimeupdate?: (time: number) => void
  isPlaying?: boolean
  setDuration?: (duration: number) => void
}

export const WaveformPlayer: FC<WaveformPlayerProps & { audio: string }> = ({
  className,
  audio,
  showButton = true,
  onPause,
  onPlay,
  onTimeupdate,
  isPlaying,
  setDuration,
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
    setDuration && setDuration(ws.getDuration())
  }

  return (
    <div className={cn('flex gap-3 items-center', className)}>
      {showButton && (
        <Button
          onClick={() => wavesurfer && wavesurfer.playPause()}
          size="icon"
          className="rounded-full"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      )}

      <div className="flex-1">
        <WavesurferPlayer
          height={50}
          barWidth={2}
          barGap={2}
          waveColor="#94a3b8"
          progressColor="#93c5fd"
          url={audio}
          onReady={onReady}
          onPlay={() => onPlay && onPlay()}
          onPause={() => onPause && onPause()}
          onInteraction={() => wavesurfer && wavesurfer.play()}
          onAudioprocess={(time) =>
            time && onTimeupdate && onTimeupdate(time.getCurrentTime())
          }
        />
      </div>
    </div>
  )
}
