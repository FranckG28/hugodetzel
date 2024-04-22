import { PortableText, PortableTextComponents } from '@portabletext/react'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/blocks/timeline/TimelineSection'
import getYouTubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import type { Image, PortableTextBlock } from 'sanity'

import { Container } from './Container'
import { SectionItem } from '../blocks/section/SectionItem'
import { cn } from 'lib/utils'

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
          <p className={cn('md:text-lg text-slate-200 max-w-prose', className)}>
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
