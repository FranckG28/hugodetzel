import { PortableText, PortableTextComponents } from '@portabletext/react'
import { TimelineSection } from 'components/blocks/timeline/TimelineSection'
import ImageBox from 'components/shared/ImageBox'
import getYouTubeId from 'get-youtube-id'
import { cn } from 'lib/utils'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import type { Image, PortableTextBlock } from 'sanity'

import { SectionItem } from '../blocks/section/SectionItem'
import { Container } from './Container'

export function CustomPortableText({
  className,
  value,
  container = false,
}: {
  className?: string
  value: PortableTextBlock[]
  container?: boolean
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        const content = (
          <p className={cn('text-slate-200 max-w-prose', className)}>
            {children}
          </p>
        )

        if (container) {
          return <Container>{content}</Container>
        }

        return content
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        const content = (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="text-sm text-slate-200">{value.caption}</div>
            )}
          </div>
        )

        if (container) {
          return <Container>{content}</Container>
        }

        return content
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        const content = <TimelineSection timelines={items} />

        if (container) {
          return <Container>{content}</Container>
        }
        return content
      },
      youtube: ({ value }) => {
        const { url, title, aspectHeight, aspectWidth } = value
        const id = getYouTubeId(url)
        const content = (
          <LiteYouTubeEmbed
            id={id}
            title={title}
            aspectHeight={aspectHeight}
            aspectWidth={aspectWidth}
          />
        )
        if (container) {
          return <Container>{content}</Container>
        }
        return content
      },
      section: ({ value }) => {
        return <SectionItem section={value} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}
