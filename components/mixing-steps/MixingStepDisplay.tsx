import { FC, useState } from 'react'
import { MixingStep } from 'types'

import { MixingStepPreview } from './MixingStepPreview'

type Props = {
  index: number
  step: MixingStep
}

const stepNumber = (n: number) => {
  const index = n + 1
  return index < 10 ? `0${index}` : index
}

export const MixingStepDisplay: FC<Props> = ({ step, index }) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="flex flex-col gap-3"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <MixingStepPreview mixingStep={step} active={hover} />
      <p className="text-sm text-slate-500">{stepNumber(index)}</p>
      <h6>{step.title}</h6>
      <p className="text-slate-600">{step.description}</p>
    </div>
  )
}
