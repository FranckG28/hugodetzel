import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { urlForImage } from 'lib/sanity.image'
import { cn } from 'lib/utils'
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
  youtubeId?: string
}
export function Header(props: HeaderProps) {
  const {
    title,
    description,
    centered = false,
    links,
    image,
    youtubeId,
  } = props
  if (!description && !title) {
    return null
  }
  const { cleaned: cleanedTitle, encoded: encodedTitle } = vercelStegaSplit(
    title || '',
  )

  return (
    <div className="relative overflow-hidden w-full h-[32rem] md:h-[40rem] flex flex-col items-center justify-center">
      {image && (
        <Image
          className="absolute h-full w-full z-0 object-cover"
          alt={title}
          src={urlForImage(image)?.height(600).width(1920).fit('crop').url()}
          fill
        />
      )}

      {youtubeId && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${youtubeId}&controls=0&disablekb=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={cn(`
            pointer-events-none absolute z-0
            max-aspect-16/9:w-[177.78vh] 
            aspect-16/9:w-full
            -top-16 left-1/2 -translate-x-1/2
            aspect-video`)}
        ></iframe>
      )}

      <div className="absolute h-full w-full bg-gradient-to-b from-slate-950/20 to-slate-950 z-0" />

      <Container className="z-10 relative m-auto grid gap-8">
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
