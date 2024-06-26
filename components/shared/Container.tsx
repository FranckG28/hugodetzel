import { cn } from 'lib/utils'

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('container mx-auto px-6 lg:px-16 xl:px-32', className)}>
      {children}
    </div>
  )
}
