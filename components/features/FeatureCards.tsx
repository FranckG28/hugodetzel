import { AnimatePresence, motion } from 'framer-motion'
import { cn } from 'lib/utils'
import { FC } from 'react'
import { Feature } from 'types'

import { FeatureCard } from './FeatureCard'

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
                className="absolute inset-0 h-full w-full bg-slate-200 dark:bg-slate-900 block rounded-2xl z-0"
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
          <FeatureCard
            feature={item}
            className={cn(
              idx !== selected && 'hover:bg-slate-900/80 transition-all',
            )}
          />
        </button>
      ))}
    </div>
  )
}
