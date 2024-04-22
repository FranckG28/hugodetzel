import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from 'components/ui/carousel'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Feature } from 'types'

type FeatureImagesProps = {
  items: Feature[]
  selected: number
  setSelected: (index: number) => void
}

export const FeatureImages: FC<FeatureImagesProps> = ({
  items,
  selected,
  setSelected,
}) => {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    api.scrollTo(selected)
  }, [api, selected])

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setSelected(api.selectedScrollSnap())
    })
  }, [api, setSelected])

  return (
    <Carousel
      className="w-fit overflow-hidden rounded-2xl"
      orientation="vertical"
      opts={{
        align: 'start',
      }}
      setApi={setApi}
    >
      <CarouselContent className="h-[800px]">
        {items.map(({ image, title }, index) => {
          const imageUrl =
            image &&
            urlForImage(image)?.height(800).width(600).fit('crop').url()

          return (
            <CarouselItem key={index} className="md:basis-full relative">
              <Image
                className="object-cover rounded-2xl"
                alt={title}
                src={imageUrl}
                width={600}
                height={800}
              />
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )

  // const [api, setApi] = useState<CarouselApi>()

  // useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  //   api.scrollTo(selected)
  // }, [api, selected])

  // return (
  //   <Carousel orientation="vertical" setApi={setApi} className="h-full">
  //     <CarouselContent className="h-full">
  //       {items.map(({ image, title }) => {
  //         const imageUrl =
  //           image &&
  //           urlForImage(image)?.height(800).width(600).fit('crop').url()

  //         return (
  //           <CarouselItem key={title} className="basis-1">
  //             <Image
  //               className="absolute aspect-[3/4] object-cover rounded-xl"
  //               alt={title}
  //               src={imageUrl}
  //               width={600}
  //               height={800}
  //             />
  //           </CarouselItem>
  //         )
  //       })}
  //     </CarouselContent>
  //   </Carousel>
  // )
}
