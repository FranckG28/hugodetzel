'use client'

import { AudioPositionProvider } from 'lib/providers/audio-position.context'
import { Container } from 'components/shared/Container'
import { FC, useContext } from 'react'
import { MixingStepsPayload } from 'types'

import { MixingStepDisplay } from './MixingStepDisplay'
import { AudioContext } from 'lib/providers/audio-context.provider'

type Props = {
  mixingSteps: MixingStepsPayload
}

export const MixingStepsSection: FC<Props> = ({ mixingSteps }) => {
  const { isPlaying, pause, play } = useContext(AudioContext)

  return (
    <div className="py-16 lg:py-24 bg-slate-800 space-y-12 lg:space-y-16">
      <Container className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-3 lg:gap-6">
          <h2 className="text-center">{mixingSteps.title}</h2>
          <p className="max-w-prose md:text-lg text-center mx-auto text-slate-200">
            {mixingSteps.description}
          </p>
        </div>
      </Container>

      <AudioPositionProvider>
        <Container className="max-w-[1920px] grid sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-16">
          {mixingSteps.steps.map((step, idx) => (
            <MixingStepDisplay
              key={idx}
              index={idx}
              step={step}
              isPlaying={isPlaying(idx + '')}
              onPause={() => pause(idx + '')}
              onPlay={() => play(idx + '')}
            />
          ))}
        </Container>
      </AudioPositionProvider>
    </div>
  )
}
