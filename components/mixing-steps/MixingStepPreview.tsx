import { urlForImage } from 'lib/sanity.image'
import { cn } from 'lib/utils'
import Image from 'next/image'
import { FC } from 'react'
import { MixingStep } from 'types'

type Props = {
  mixingStep: MixingStep
  active: boolean
}

export const MixingStepPreview: FC<Props> = ({ mixingStep, active }) => {
  const imageUrl =
    mixingStep.image &&
    urlForImage(mixingStep.image)?.height(600).width(1920).fit('crop').url()

  return (
    <div className="rounded-xl shadow-lg bg-slate-400 w-full aspect-video mb-3 backdrop-blur p-4">
      <Image
        className={cn('rounded-xl m-3 object-cover transition-all')}
        alt={mixingStep.title}
        src={imageUrl}
        fill
        loading="lazy"
      />
    </div>
  )
}
