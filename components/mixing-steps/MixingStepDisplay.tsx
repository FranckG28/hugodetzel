import { PauseIcon } from '@radix-ui/react-icons'
import { AudioPlayer } from 'components/shared/AudioPlayer'
import { WavyBackground } from 'components/ui/wavy'
import { AnimatePresence, motion } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import { cn, formatDuration } from 'lib/utils'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import { FiVolume2 } from 'react-icons/fi'
import { MixingStep } from 'types'
import useSound from 'use-sound'

type Props = {
  index: number
  step: MixingStep
  playing: boolean
  setPlaying: (index: number) => void
}

const stepNumber = (n: number) => {
  const index = n + 1
  return index < 10 ? `0${index}` : index
}

export const MixingStepDisplay: FC<Props> = ({
  step,
  index,
  playing,
  setPlaying,
}) => {
  const [play, { stop, duration }] = useSound(step.audioUrl)

  const imageUrl =
    step.image &&
    urlForImage(step.image)?.height(600).width(1920).fit('crop').url()

  useEffect(() => {
    if (playing) {
      play()
    } else {
      stop()
    }
  }, [play, playing, stop])

  return (
    <button
      className="flex flex-col gap-2 text-left group"
      onClick={() => {
        setPlaying(index)
      }}
    >
      <div className="w-full aspect-video mb-5 group/preview relative rounded-2xl overflow-hidden shadow-lg max-h-48">
        <Image
          className={cn(
            'rounded-xl object-cover transition-all brightness-75',
            playing && 'brightness-50',
          )}
          alt={step.title}
          src={imageUrl}
          fill
          loading="lazy"
        />
        <AnimatePresence>
          {playing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl overflow-hidden relative h-full w-full"
            >
              <PauseIcon className="text-transparent w-8 h-8 group-hover/preview:text-white transition-all absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" />
              <WavyBackground
                className="rounded-xl overflow-hidden"
                speed={'fast'}
              ></WavyBackground>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <FiVolume2 className="text-white/50 w-8 h-8 group-hover:text-white transition-all" />
            </motion.div>
          )}
        </AnimatePresence>
        <AudioPlayer
          playing={playing}
          duration={formatDuration(duration / 1000)}
          className="absolute bottom-2 left-2"
        />
      </div>
      <p className="text-sm text-slate-400">{stepNumber(index)}</p>
      <h5>{step.title}</h5>
      <p className="text-slate-300 text-sm leading-relaxed">
        {step.description}
      </p>
    </button>
  )
}
