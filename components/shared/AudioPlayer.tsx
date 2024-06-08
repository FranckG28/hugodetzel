import { cn } from 'lib/utils'
import { FC } from 'react'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { PiWaveform } from 'react-icons/pi'

type Props = {
  playing: boolean
  duration: string
  className?: string
}

export const AudioPlayer: FC<Props> = ({ playing, duration, className }) => {
  return (
    <div
      className={cn(
        'bg-white/20 backdrop-blur-xl rounded-lg py-1.5 px-2 flex items-center gap-2 text-white text-sm',
        className,
      )}
    >
      {playing ? <PiWaveform size={18} /> : <IoPlayCircleOutline size={18} />}
      <span>{duration}</span>
    </div>
  )
}
