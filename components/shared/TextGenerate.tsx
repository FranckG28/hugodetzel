'use client'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from 'lib/utils'
import { useEffect } from 'react'

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
}) => {
  const [scope, animate] = useAnimate()
  let wordsArray = words.split(' ')
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      },
    )
  }, [animate])

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return <h1 className={cn('max-w-prose', className)}>{renderWords()}</h1>
}
