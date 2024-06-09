import { cn } from 'lib/utils'
import { FC } from 'react'
import { Feature } from 'types'

import DynamicIcon from '../shared/DynamicIcon'

export const FeatureCard: FC<{
  feature: Feature
  className?: string
}> = ({ feature, className }) => {
  return (
    <Card className={className}>
      <div className="bg-slate-700 rounded-full p-2 mb-2">
        <DynamicIcon icon={feature.icon} className="w-6 h-6" />
      </div>
      <CardTitle>{feature.title}</CardTitle>
      <CardDescription>{feature.description}</CardDescription>
    </Card>
  )
}

type Props = {
  className?: string
  children: React.ReactNode
}

const Card: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'h-full w-full p-8 overflow-hidden relative z-20 flex flex-col gap-3 rounded-2xl text-left items-start',
        className,
      )}
    >
      {children}
    </div>
  )
}

const CardTitle: FC<Props> = ({ className, children }) => {
  return <h5 className={cn('text-white', className)}>{children}</h5>
}

const CardDescription: FC<Props> = ({ className, children }) => {
  return (
    <p className={cn('text-slate-300 max-md:text-sm', className)}>{children}</p>
  )
}
