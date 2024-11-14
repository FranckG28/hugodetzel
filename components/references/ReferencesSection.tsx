import { Container } from 'components/shared/Container'
import { FC, useContext } from 'react'
import { Reference, ReferencesSection } from 'types'

import { ReferenceItem } from './ReferenceItem'
import { AudioContext } from 'lib/providers/audio-context.provider'

type Props = {
  references: Reference[]
  section: ReferencesSection
}

export const ReferencesSectionComponent: FC<Props> = ({
  references,
  section,
}) => {
  const { pause, play, isPlaying } = useContext(AudioContext)

  return (
    <section className="space-y-12 lg:space-y-16 py-16 lg:py-24 bg-slate-100 light">
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-6 items-center text-center">
          <h2 className="text-black">{section?.title}</h2>
          <p className="text-lg text-slate-700">{section?.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {references.map((reference) => (
            <ReferenceItem
              key={reference._id}
              reference={reference}
              onPause={() => pause(reference._id)}
              onPlay={() => play(reference._id)}
              isPlaying={isPlaying(reference._id)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
