import { urlForImage } from 'lib/sanity.image'
import { cn } from 'lib/utils'
import Image from 'next/image'
import { FC } from 'react'
import { Image as SanityImage } from 'sanity'

type Props = {
  name: string
  role: string
  image: SanityImage
  avatarSide?: 'left' | 'right'
  className?: string
}

const avatarSize = 60

export const Person: FC<Props> = ({
  name,
  role,
  image,
  className,
  avatarSide = 'left',
}) => {
  return (
    <div
      className={cn(
        'flex gap-10 items-center',
        avatarSide === 'right' && 'ml-auto flex-row-reverse',
        className,
      )}
    >
      <Image
        src={urlForImage(image)
          ?.height(avatarSize)
          .width(avatarSize)
          .fit('crop')
          .url()}
        width={avatarSize}
        height={avatarSize}
        alt={name}
        className="rounded-full"
      />
      <div>
        <p className="font-bold text-lg">{name}</p>
        <p className="text-slate-700">{role}</p>
      </div>
    </div>
  )
}
