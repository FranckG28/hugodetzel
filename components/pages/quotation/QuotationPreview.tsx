import { DiscIcon } from '@radix-ui/react-icons'
import { Badge } from 'components/ui/badge'
import { cn } from 'lib/utils'
import { FC } from 'react'
import { QuotationPreviewWaveform } from './QuotationPreviewWaveform'

type QuestionPreviewProps = {
  titles: number
  minutes: number
  tracks: number
  className?: string
}

export const QuotationPreview: FC<QuestionPreviewProps> = ({
  className,
  titles,
  minutes,
  tracks,
}) => {
  return (
    <div
      className={cn(
        'items-center justify-center transition-all flex lg:-space-x-28 -space-x-8 bg-slate-900 rounded-xl p-4 lg:hover:-space-x-24',
        className,
      )}
    >
      {Array(titles)
        .fill('')
        .map((_, i) => (
          <PreviewTitle
            key={i}
            duration={`${minutes}:00`}
            tracks={tracks}
            displayContent={i === titles - 1}
          />
        ))}
    </div>
  )
}

type PreviewTitleProps = {
  duration: string
  tracks: number
  displayContent?: boolean
}

const MAX_TRACKS = 12

const PreviewTitle: FC<PreviewTitleProps> = ({
  duration,
  tracks,
  displayContent,
}) => {
  return (
    <div className="flex w-12 lg:w-32 aspect-square rounded lg:rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 relative flex-col gap-1 justify-start overflow-hidden p-1 transition-all">
      {displayContent && (
        <>
          {Array(Math.min(tracks, MAX_TRACKS))
            .fill('')
            .map((_, i) => (
              <QuotationPreviewWaveform key={i} index={i} />
            ))}
          {/* <DiscIcon className="w-6 h-6 lg:w-12 lg:h-12 text-slate-400" /> */}
          <Badge variant="secondary" className="absolute bottom-2 right-2">
            {duration}
          </Badge>
        </>
      )}
    </div>
  )
}
