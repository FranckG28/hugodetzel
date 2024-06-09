import {
  WaveformPlayer,
  WaveformPlayerProps,
} from 'components/shared/WaveformPlayer'
import { urlForImage } from 'lib/sanity.image'
import { cn } from 'lib/utils'
import Image from 'next/image'
import { FC } from 'react'
import { MixingStep } from 'types'

interface Props extends WaveformPlayerProps {
  index: number
  step: MixingStep
}

const stepNumber = (n: number) => {
  const index = n + 1
  return index < 10 ? `0${index}` : index
}

export const MixingStepDisplay: FC<Props> = ({
  step,
  index,
  isPlaying,
  onPause,
  onPlay,
  onTimeupdate,
}) => {
  const imageUrl =
    step.image &&
    urlForImage(step.image)?.height(600).width(1920).fit('crop').url()

  return (
    <div className="flex flex-col gap-2 text-left group">
      <div className="w-full aspect-[4/3] mb-5 group/preview relative rounded-2xl overflow-hidden shadow-lg max-h-48">
        <Image
          className={cn(
            'rounded-xl object-cover transition-all brightness-50',
            isPlaying && 'brightness-90',
          )}
          alt={step.title}
          src={imageUrl}
          fill
          loading="lazy"
        />
        <div className="absolute z-20 left-0 right-0 bottom-0 pt-10 pb-2 px-3.5 bg-gradient-to-b from-transparent to-black">
          <WaveformPlayer
            audio={step.audioUrl}
            isPlaying={isPlaying}
            onPause={onPause}
            onPlay={onPlay}
            onTimeupdate={onTimeupdate}
          />
        </div>
      </div>
      <p className="text-sm text-slate-400">{stepNumber(index)}</p>
      <h5>{step.title}</h5>
      <p className="text-slate-300 text-sm leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}
