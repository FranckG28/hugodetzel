import { Container } from 'components/shared/Container'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { FC } from 'react'
import { MixingStepsPayload } from 'types'

import { MixingStepDisplay } from './MixingStepDisplay'

type Props = {
  mixingSteps: MixingStepsPayload
}

export const MixingStepsSection: FC<Props> = ({ mixingSteps }) => {
  return (
    <div className="py-8 lg:py-20 bg-slate-50 text-slate-950 bg-grid-slate-200/50">
      <Container className="flex flex-col gap-4">
        <h2 className="text-center">{mixingSteps.title}</h2>
        <p className="max-w-prose md:text-lg text-center mx-auto">
          {mixingSteps.description}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4 lg:py-8">
          {mixingSteps.steps.map((step, idx) => (
            <MixingStepDisplay key={idx} index={idx} step={step} />
          ))}
        </div>
      </Container>
    </div>
  )
}
