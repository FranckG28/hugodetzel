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
    <div className="py-12 lg:py-20 bg-slate-50 text-slate-950 bg-grid-slate-200/50">
      <Container className="flex flex-col gap-6">
        <h2 className="text-center">{mixingSteps.title}</h2>
        <p className="max-w-prose md:text-lg text-center mx-auto">
          {mixingSteps.description}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 py-4 lg:py-8">
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
