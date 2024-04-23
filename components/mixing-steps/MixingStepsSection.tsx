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
    <div className="bg-indigo-600 py-8 lg:py-20">
      <Container className="flex flex-col gap-4">
        <h2>{mixingSteps.title}</h2>
        <p className="max-w-prose md:text-lg">{mixingSteps.description}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4 lg:py-8">
          {mixingSteps.steps.map((step, idx) => (
            <MixingStepDisplay key={idx} index={idx} step={step} />
          ))}
        </div>

        {mixingSteps.cta && (
          <Link href={mixingSteps.cta.link}>
            <Button>{mixingSteps.cta.title}</Button>
          </Link>
        )}
      </Container>
    </div>
  )
}
