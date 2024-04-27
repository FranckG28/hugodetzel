import { Container } from 'components/shared/Container'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { FC, useState } from 'react'
import { MixingStepsPayload } from 'types'

import { MixingStepDisplay } from './MixingStepDisplay'

type Props = {
  mixingSteps: MixingStepsPayload
}

export const MixingStepsSection: FC<Props> = ({ mixingSteps }) => {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <div className="py-12 lg:py-20 bg-white text-slate-950 bg-grid-slate-100/50">
      <Container className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-3 lg:gap-6">
          <h2 className="text-center">{mixingSteps.title}</h2>
          <p className="max-w-prose md:text-lg text-center mx-auto text-slate-700">
            {mixingSteps.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
        </div>
      </Container>
    </div>
  )
}
