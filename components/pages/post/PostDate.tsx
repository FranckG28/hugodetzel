import { format, parseISO } from 'date-fns'

type Props = {
  dateString: string
  className?: string
}

export default function PostDate({ dateString, className }: Props) {
  if (!dateString) return null

  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className={className}>
      {format(date, 'd LLLL yyyy')}
    </time>
  )
}
