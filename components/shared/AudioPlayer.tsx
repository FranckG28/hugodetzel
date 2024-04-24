import { cn } from 'lib/utils'
import { FC } from 'react'
import { PiPlayCircle, PiWaveform } from 'react-icons/pi'

type Props = {
  playing: boolean
  duration: string
  className?: string
}

export const AudioPlayer: FC<Props> = ({ playing, duration, className }) => {
  return (
    <div
      className={cn(
        'bg-white/30 backdrop-blur-xl rounded-md py-1.5 px-2 flex items-center gap-2 text-white',
        className,
      )}
    >
      {playing ? <PiWaveform /> : <PiPlayCircle />}
      <span className="text-xs">{duration}</span>
    </div>
  )
}
