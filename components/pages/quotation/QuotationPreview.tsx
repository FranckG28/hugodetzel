import { cn } from 'lib/utils'
import { FC } from 'react'

export const QuotationPreview: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex', className)}>
      <p>Preview</p>
    </div>
  )
}
