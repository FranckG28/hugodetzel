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

const MAX_TITLES = 12

export const QuotationPreview: FC<QuestionPreviewProps> = ({
  className,
  titles,
  minutes,
  tracks,
}) => {
  const displayedTitles = Math.min(titles, MAX_TITLES)

  return (
    <div
      className={cn(
        'items-center justify-center transition-all flex lg:-space-x-28 -space-x-16 bg-slate-800 rounded-xl p-4 lg:hover:-space-x-24 overflow-hidden',
        className,
      )}
    >
      {Array(displayedTitles)
        .fill('')
        .map((_, i) => (
          <PreviewTitle
            key={i}
            duration={`${minutes}:00`}
            tracks={tracks}
            displayContent={i === displayedTitles - 1}
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
    <div className="flex w-20 lg:w-32 aspect-square rounded lg:rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 relative flex-col gap-1 justify-start overflow-hidden p-1 transition-all">
      {displayContent && (
        <>
          {Array(Math.min(tracks, MAX_TRACKS))
            .fill('')
            .map((_, i) => (
              <QuotationPreviewWaveform key={i} index={i} />
            ))}
          <Badge variant="secondary" className="absolute bottom-2 right-2">
            {duration}
          </Badge>
        </>
      )}
    </div>
  )
}
