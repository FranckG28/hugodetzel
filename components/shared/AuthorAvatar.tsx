import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { Author } from 'types'

const size = 64

export default function AuthorAvatar(props: Author) {
  const { name, picture } = props
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-10 w-10">
        <Image
          src={
            picture?.asset?._ref
              ? urlForImage(picture).height(size).width(size).fit('crop').url()
              : 'https://source.unsplash.com/96x96/?face'
          }
          className="rounded-full"
          height={size}
          width={size}
          alt={picture?.alt ?? name}
        />
      </div>
      <div className="font-medium text-balance">{name}</div>
    </div>
  )
}
