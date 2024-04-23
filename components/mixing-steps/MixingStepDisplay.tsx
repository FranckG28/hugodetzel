import { FC } from 'react'
import { MixingStep } from 'types'

type Props = {
  index: number
  step: MixingStep
}

export const MixingStepDisplay: FC<Props> = ({ step, index }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl shadow-lg bg-indigo-200 w-full aspect-video mb-3"></div>
      <p className="text-sm text-slate-300">{index}</p>
      <h6>{step.title}</h6>
      <p className="text-slate-200">{step.description}</p>
    </div>
  )
}
