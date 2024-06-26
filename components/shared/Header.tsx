import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { Link as SanityLink } from 'types'

import { Button } from '../ui/button'
import { Container } from './Container'
import { TextGenerateEffect } from './TextGenerate'

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

      <div className="absolute h-full w-full bg-gradient-to-b from-slate-950/40 to-slate-950 z-0" />

      <Container className="z-10 relative py-48 grid gap-8">
        {/* Title */}
        <div className="flex flex-col gap-6 text-center items-center max-w-screen-md mx-auto">
          {cleanedTitle && <TextGenerateEffect words={cleanedTitle} />}
          {/* Description */}
          {description && (
            <CustomPortableText
              value={description}
              className="text-slate-300 md:text-lg max-w-prose text-balance animate-in fade-in duration-1000"
            />
          )}
          {links?.length > 0 && (
            <div className="flex gap-4 flex-wrap animate-in fade-in duration-1000 justify-center">
              {links.map((link, key) => {
                return (
                  <Link key={key} href={link.href}>
                    <Button variant={key === 0 ? 'default' : 'outline'}>
                      {link.title}
                    </Button>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
        <div></div>
      </Container>
    </div>
  )
}
