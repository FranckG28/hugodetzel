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
import { useBreakpoint } from 'lib/hooks/useBreakpoint'
import Autoplay from 'embla-carousel-autoplay'
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
      className="lg:w-fit overflow-hidden rounded-2xl"
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
      <CarouselContent className="h-[600px] lg:h-[800px]">
        {items.map((feature, index) => {
          const imageUrl =
            feature.image &&
            urlForImage(feature.image)?.height(800).width(600).fit('crop').url()

          return (
            <CarouselItem key={index} className="relative">
              <Image
                className="object-cover rounded-2xl mx-auto"
                alt={feature.title}
                src={imageUrl}
                width={600}
                height={800}
              />
              <div className="absolute lg:hidden bottom-4 left-8 right-4 h-fit">
                <FeatureCard
                  feature={feature}
                  className="bg-slate-900/80 backdrop-blur rounded-xl"
                />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
