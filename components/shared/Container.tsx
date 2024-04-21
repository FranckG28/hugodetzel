import { cn } from 'lib/utils'

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'container max-w-screen-2xl mx-auto px-4 md:px-16 lg:px-32',
        className,
      )}
    >
      {children}
    </div>
  )
}
