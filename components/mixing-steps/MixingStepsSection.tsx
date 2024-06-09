import { Container } from 'components/shared/Container'
import { FC, useState } from 'react'
import { MixingStepsPayload } from 'types'

import { MixingStepDisplay } from './MixingStepDisplay'

type Props = {
  mixingSteps: MixingStepsPayload
}

export const MixingStepsSection: FC<Props> = ({ mixingSteps }) => {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <div className="py-16 lg:py-24 bg-slate-800 space-y-12">
      <Container className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-3 lg:gap-6">
          <h2 className="text-center">{mixingSteps.title}</h2>
          <p className="max-w-prose md:text-lg text-center mx-auto text-slate-200">
            {mixingSteps.description}
          </p>
        </div>
      </Container>

      <Container className="max-w-[1920px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mixingSteps.steps.map((step, idx) => (
          <MixingStepDisplay
            key={idx}
            index={idx}
            step={step}
            playing={playing === idx}
            setPlaying={() => {
              if (playing === idx) {
                setPlaying(null)
              } else {
                setPlaying(idx)
              }
            }}
          />
        ))}
      </Container>
    </div>
  )
}
