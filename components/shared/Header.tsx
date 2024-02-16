import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { Link as SanityLink } from 'types'

import { Button } from './Button'
import { Container } from './Container'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  links?: SanityLink[]
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

      <Container className="z-10 relative py-24 flex flex-col gap-6">
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
          <div className="font-serif text-xl text-slate-200 md:text-2xl max-w-prose text-balance">
            <CustomPortableText value={description} />
          </div>
        )}
        {links?.length > 0 && (
          <div className="space-x-4">
            {links.map((link, key) => {
              return (
                <Link key={key} href={link.href}>
                  <Button variant={key === 0 ? 'primary' : 'default'}>
                    {link.title}
                  </Button>
                </Link>
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}
