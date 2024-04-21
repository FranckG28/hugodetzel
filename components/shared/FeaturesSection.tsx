import { FC, useState } from 'react'
import { Feature } from 'types'
import { Container } from './Container'
import { FeatureCards } from './FeatureCards'
import { cn } from 'lib/utils'

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
      className={cn('grid lg:grid-cols-2 gap-2 bg-slate-950 py-4', className)}
    >
      <div></div>
      {items && (
        <FeatureCards
          items={items}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </Container>
  )
}
