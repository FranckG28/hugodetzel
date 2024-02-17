import classNames from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { Image as SanityImage } from 'sanity'

const width = 650
const height = 480

export const ImageStack = ({
  images,
  className,
}: {
  images: SanityImage[]
  className?: string
}) => {
  if (!images) {
    return null
  }

  if (images.length === 1) {
    const imageUrl = urlForImage(images[0])?.height(height).width(width).url()
    return (
      <div
        className={classNames(
          'aspect-[4/3] overflow-hidden object-cover relative',
          className,
        )}
      >
        <Image alt="" src={imageUrl} fill />
      </div>
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
              className="rounded-xl shadow-xl aspect-[4/3] object-cover"
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
