import classNames from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { Image as SanityImage } from 'sanity'

const WIDTH = 600
const HEIGHT = 440

const THUMBNAIL_RATIO = 0.5

export const ImageStack = ({
  images,
  className,
  thumbnail = false,
}: {
  images: SanityImage[]
  className?: string
  thumbnail?: boolean
}) => {
  if (!images) {
    return null
  }

  const width = thumbnail ? WIDTH * THUMBNAIL_RATIO : WIDTH
  const height = thumbnail ? HEIGHT * THUMBNAIL_RATIO : HEIGHT

  if (images.length === 1) {
    const imageUrl = urlForImage(images[0])?.height(height).width(width).url()
    return (
      <Image
        alt=""
        src={imageUrl}
        className={classNames('object-cover aspect-[4/3]', className)}
        sizes="(min-width: 1024px) 650px, 100vw"
        width={width}
        height={height}
      />
    )
  }

  return (
    <div
      className={classNames(
        'relative max-md:min-h-64 md:max-lg:min-h-96 h-full w-full max-h-96 max-w-lg lg:mx-auto',
        className,
      )}
    >
      {images.map((image, index) => {
        if (index > 1) {
          return null
        }

        const imageUrl = urlForImage(image)
          ?.height(height * 0.8)
          .width(width * 0.8)
          .url()

        return (
          <div
            key={index}
            className={classNames(
              'absolute w-3/4',
              index === 0 ? 'top-0 left-0 z-0' : 'bottom-0 right-0 z-10',
            )}
          >
            <Image
              alt=""
              className="rounded-xl shadow-xl aspect-[4/3] object-cover max-w-full"
              src={imageUrl}
              width={width}
              height={height}
            />
          </div>
        )
      })}
    </div>
  )
}
