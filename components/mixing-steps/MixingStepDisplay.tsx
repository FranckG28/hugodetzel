import { FC } from 'react'
import { MixingStep } from 'types'

type Props = {
  index: number
  step: MixingStep
}

const stepNumber = (n: number) => {
  const index = n + 1
  return index < 10 ? `0${index}` : index
}

export const MixingStepDisplay: FC<Props> = ({ step, index }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl shadow-lg bg-blue-400/40 w-full aspect-video mb-3 backdrop-blur"></div>
      <p className="text-sm text-slate-500">{stepNumber(index)}</p>
      <h6>{step.title}</h6>
      <p className="text-slate-600">{step.description}</p>
    </div>
  )
}
