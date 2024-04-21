import { AnimatePresence, motion } from 'framer-motion'
import { cn } from 'lib/utils'
import { FC, useState } from 'react'
import { Feature } from 'types'
import DynamicIcon from './DynamicIcon'

type FeatureCardsProps = {
  items: Feature[]
  className?: string
  selected: number
  setSelected: (index: number) => void
}

export const FeatureCards: FC<FeatureCardsProps> = ({
  items,
  className,
  selected,
  setSelected,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {items.map((item, idx) => (
        <button
          key={item?.title}
          className="relative group block h-full w-full"
          onClick={() => setSelected(idx)}
        >
          <AnimatePresence>
            {selected === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-200 dark:bg-slate-900 block rounded-xl z-0"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
            className={
              selected !== idx && 'hover:bg-slate-200/5 transition-all'
            }
          >
            <div className="bg-slate-700 rounded-full p-2 mb-2">
              <DynamicIcon icon={item.icon} className="w-6 h-6" />
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </button>
      ))}
    </div>
  )
}

const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'h-full w-full p-8 overflow-hidden relative z-20 flex flex-col gap-3 rounded-xl text-left items-start',
        className,
      )}
    >
      {children}
    </div>
  )
}
const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <h4 className={cn('text-white font-bold', className)}>{children}</h4>
}
const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p className={cn('text-slate-300 font-serif', className)}>{children}</p>
  )
}
