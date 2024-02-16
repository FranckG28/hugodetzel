import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { Link } from 'types'

import { Container } from './Container'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  links?: Link[]
  image?: { asset?: any }
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false, links, image } = props
  if (!description && !title) {
    return null
  }
  const { cleaned: cleanedTitle, encoded: encodedTitle } = vercelStegaSplit(
    title || '',
  )

  const imageUrl =
    image && urlForImage(image)?.height(600).width(1920).fit('crop').url()

  return (
    <div className="relative">
      <Image
        className="absolute h-full w-full z-0 object-cover"
        alt={title}
        src={imageUrl}
        fill
      />

      <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-slate-950 z-0" />

      <Container className="z-10 relative py-24">
        {/* Title */}
        {cleanedTitle && (
          <h1
            className="text-3xl font-extrabold tracking-tight md:text-5xl text-balance max-w-prose"
            data-vercel-edit-target
          >
            {cleanedTitle}
            {encodedTitle && (
              <span style={{ display: 'none' }}>{encodedTitle}</span>
            )}
          </h1>
        )}
        {/* Description */}
        {description && (
          <div className="mt-4 font-serif text-xl text-slate-200 md:text-2xl max-w-prose text-balance">
            <CustomPortableText value={description} />
          </div>
        )}
        {links?.length > 0 && (
          <div className="mt-4 space-x-4">
            {links.map((link, key) => {
              return (
                <a
                  key={key}
                  href={link.href}
                  className="text-blue-500 underline"
                >
                  {link.title}
                </a>
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}
