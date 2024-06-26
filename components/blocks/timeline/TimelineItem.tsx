import { vercelStegaSplit } from '@vercel/stega'
import ImageBox from 'components/shared/ImageBox'
import type { MilestoneItem } from 'types'

export function TimelineItem({
  isLast,
  milestone,
}: {
  isLast: boolean
  milestone: MilestoneItem
}) {
  const { description, image, tags, title } = milestone
  // const startYear = duration?.start
  //   ? new Date(vercelStegaSplit(duration.start).cleaned).getFullYear()
  //   : undefined
  // const endYear = duration?.end
  //   ? new Date(vercelStegaSplit(duration.end).cleaned).getFullYear()
  //   : 'Now'

  return (
    <div className={`flex min-h-[200px] ${!isLast && 'pb-2'}`}>
      <div className="flex flex-col">
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden rounded-md bg-slate-800"
          style={{ width: '65px', height: '65px' }}
        >
          <ImageBox
            image={image}
            alt={title || 'Timeline item icon'}
            size="10vw"
            width={65}
            height={65}
          />
        </div>
        {/* Vertical line */}
        {!isLast && <div className="mt-2 w-px grow self-center bg-slate-400" />}
      </div>
      <div className="flex-initial pl-4">
        {/* Title */}
        <div className="font-bold text-white">{title}</div>
        {/* Tags */}
        <div className="text-sm text-slate-200 ">
          {tags?.map((tag, key) => (
            <span key={key}>
              {tag}
              <span className="mx-1">●</span>
            </span>
          ))}
          {/* {startYear} - {endYear} */}
        </div>
        {/* Description */}
        <div className="pb-5 pt-3 text-slate-200">{description}</div>
      </div>
    </div>
  )
}
