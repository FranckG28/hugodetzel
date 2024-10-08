'use client'

import { cn } from 'lib/utils'
import { FC, useState } from 'react'
import { Feature } from 'types'

import { Container } from '../shared/Container'
import { FeatureCards } from './FeatureCards'
import { FeatureImages } from './FeatureImages'

type FeatureSectionProps = {
  items: Feature[]
  className?: string
}

export const FeatureSection: FC<FeatureSectionProps> = ({
  className,
  items,
}) => {
  const [selected, setSelected] = useState(0)

  return (
    <Container
      className={cn(
        'grid lg:grid-cols-2 gap-10 bg-slate-950 lg:pb-24',
        className,
      )}
    >
      {items && (
        <>
          <FeatureImages
            items={items}
            selected={selected}
            setSelected={setSelected}
          />
          <FeatureCards
            items={items}
            selected={selected}
            setSelected={setSelected}
            className="max-lg:hidden"
          />
        </>
      )}
    </Container>
  )
}
