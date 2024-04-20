import { Waveform1 } from 'components/svg/Waveform1'
import { Waveform2 } from 'components/svg/Waveform2'
import { Waveform3 } from 'components/svg/Waveform3'
import { Waveform4 } from 'components/svg/Waveform4'
import { Waveform5 } from 'components/svg/Wevaform5'
import { cn } from 'lib/utils'
import { FC } from 'react'

type QuotationPreviewWaveformProps = {
  index: number
}

const classNames = [
  'bg-blue-400/10 text-blue-400 w-full',
  'bg-purple-400/10 ml-2 text-purple-400 w-1/2',
  'bg-red-400/10 text-red-400 w-2/3',
  'bg-yellow-400/10 ml-4 text-yellow-400 w-1/4',
  'bg-green-400/10 ml-8 text-green-400 w-3/4',
  'bg-orange-400/10 ml-12 text-orange-400 w-1/3',
  'bg-pink-400/10 ml-2 text-pink-400 w-2/3',
  'bg-teal-400/10 text-teal-400 w-1/2',
]
const waveforms = [Waveform1, Waveform2, Waveform3, Waveform4, Waveform5]

export const QuotationPreviewWaveform: FC<QuotationPreviewWaveformProps> = ({
  index,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg animate-in fade-in flex-1 flex items-center overflow-hidden',
        classNames[index % classNames.length],
      )}
    >
      {waveforms[index % waveforms.length]({
        className: 'w-full h-10 ',
      })}
    </div>
  )
}
