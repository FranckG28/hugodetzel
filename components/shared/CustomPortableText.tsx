import { PortableText, PortableTextComponents } from '@portabletext/react'
import classNames from 'classnames'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import getYouTubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import type { Image, PortableTextBlock } from 'sanity'

import { Container } from './Container'
import { SectionItem } from './SectionItem'

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
          <p
            className={classNames(
              'font-serif text-lg md:text-xl text-slate-300 max-w-prose',
              className,
            )}
          >
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
        return (
          <Container className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-slate-200">
                {value.caption}
              </div>
            )}
          </Container>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return (
          <Container>
            <TimelineSection timelines={items} />
          </Container>
        )
      },
      youtube: ({ value }) => {
        const { url, title, aspectHeight, aspectWidth } = value
        const id = getYouTubeId(url)
        return (
          <Container>
            <LiteYouTubeEmbed
              id={id}
              title={title}
              aspectHeight={aspectHeight}
              aspectWidth={aspectWidth}
            />
          </Container>
        )
      },
      section: ({ value }) => {
        return <SectionItem section={value} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}
