import { DiscIcon } from '@radix-ui/react-icons'
import { Badge } from 'components/ui/badge'
import { cn } from 'lib/utils'
import { FC } from 'react'

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
}) => {
  return (
    <div
      className={cn(
        'items-center justify-center transition-all flex lg:-space-x-28 -space-x-8 bg-slate-900 rounded-xl p-4',
        className,
      )}
    >
      {Array(titles)
        .fill('')
        .map((_, i) => (
          <PreviewTitle key={i} duration={`${minutes}:00`} />
        ))}
    </div>
  )
}

type PreviewTitleProps = {
  duration: string
}

const PreviewTitle: FC<PreviewTitleProps> = ({ duration }) => {
  return (
    <div className="flex justify-center items-center w-12 lg:w-32 aspect-square rounded lg:rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 animate-in fade-in relative">
      <DiscIcon className="w-6 h-6 lg:w-12 lg:h-12 text-slate-400" />
      <Badge variant="secondary" className="absolute bottom-2 right-2">
        {duration}
      </Badge>
    </div>
  )
}
