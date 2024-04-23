import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from 'components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useBreakpoint } from 'lib/hooks/useBreakpoint'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Feature } from 'types'

import { FeatureCard } from './FeatureCard'

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

  const isDesktop = useBreakpoint('lg')

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
      className="overflow-hidden rounded-2xl"
      orientation={isDesktop ? 'vertical' : 'horizontal'}
      opts={{
        align: 'start',
      }}
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
    >
      <CarouselContent className="h-[500px] sm:h-[600px] lg:h-[800px]">
        {items.map((feature, index) => {
          const imageUrl =
            feature.image &&
            urlForImage(feature.image)?.height(800).width(600).fit('crop').url()

          return (
            <CarouselItem key={index} className="relative">
              <Image
                className="object-cover rounded-2xl h-full w-full"
                alt={feature.title}
                src={imageUrl}
                fill
              />
              <div className="absolute lg:hidden bottom-0 left-0 right-0 top-0">
                <FeatureCard
                  feature={feature}
                  className="bg-gradient-to-b from-slate-900/10 to-slate-900 rounded-none justify-end pb-6"
                />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
