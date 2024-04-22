import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Checkbox } from 'components/ui/checkbox'
import { Slider } from 'components/ui/slider'
import useSet from 'lib/hooks/useSet'
import { FC, useEffect, useState } from 'react'
import { QuotationPayload } from 'types'
import { QuotationOption } from './QuotationOption'
import { QuotationSlider } from './QuotationSlider'
import { QuotationPreview } from './QuotationPreview'
import { Button } from 'components/ui/button'
import { AnimatedNumber } from 'components/shared/AnimatedNumbers'
import { BackgroundGradient } from 'components/shared/BackgroundGradient'

const DEFAULT_TITLES = 1
const DEFAULT_MINUTES = 3
const DEFAULT_TRACKS = 5

const MAX_TITLES = 50
const MAX_MINUTES = 30
const MAX_TRACKS = 30

export const QuotationForm: FC<{
  quotation: QuotationPayload
}> = ({ quotation: { baseMinutes, baseTracks, options } }) => {
  const [total, setTotal] = useState(0)
  const [titles, setTitles] = useState(DEFAULT_TITLES)
  const [tracks, setTracks] = useState(DEFAULT_TRACKS)
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES)

  const [selectedOptions, { add, remove, has }] = useSet<string>(
    options.reduce((acc, option) => {
      if (option.included) {
        acc.add(option.title)
      }
      return acc
    }, new Set([])),
  )

  useEffect(() => {
    const optionsPrice = options
      .filter((option) => has(option.title))
      .reduce((acc, option) => acc + option.price, 0)

    setTotal(
      optionsPrice * titles * (tracks / baseTracks) * (minutes / baseMinutes),
    )
  }, [titles, tracks, minutes, baseMinutes, baseTracks, options, has])

  return (
    <BackgroundGradient className="grid xl:grid-cols-2 gap-12 rounded-[22px] shadow-xl bg-slate-900 p-6 xl:p-8">
      <div className="flex flex-col gap-6">
        <p className="font-medium text-slate-400 leading-tight">
          Obtenez un devis
        </p>
        <QuotationPreview
          className="flex-1"
          titles={titles}
          minutes={minutes}
          tracks={tracks}
        />
        <QuotationSlider
          label="Nombre de titre"
          valueDisplay={(value) => `${value} titre${value > 1 ? 's' : ''}`}
          value={titles}
          onChange={setTitles}
          min={1}
          max={MAX_TITLES}
        />

        <QuotationSlider
          label="Durée moyenne d'un titre"
          value={minutes}
          valueDisplay={(value) => `${value} minute${value > 1 ? 's' : ''}`}
          onChange={setMinutes}
          min={1}
          max={MAX_MINUTES}
        />

        <QuotationSlider
          label="Nombre moyen de pistes par titre"
          value={tracks}
          valueDisplay={(value) => `${value} piste${value > 1 ? 's' : ''}`}
          onChange={setTracks}
          min={1}
          max={MAX_TRACKS}
        />
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <p className="font-medium text-slate-400 leading-tight">
            Prestations
          </p>

          <div className="grid lg:grid-cols-2 gap-4">
            {options.map((option) => (
              <QuotationOption
                key={option.title}
                option={option}
                checked={has(option.title)}
                onChange={(checked) => {
                  if (checked) {
                    add(option.title)
                  } else {
                    remove(option.title)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed xl:relative max-xl:bottom-0 max-xl:left-4 max-xl:right-4 max-xl:border-t max-xl:border-slate-800 max-xl:bg-slate-900/80 rounded-t-xl max-xl:backdrop-blur max-xl:p-4 flex gap-2 items-center justify-between xl:col-start-2 max-md:flex-col">
        <h3 className="tracking-tight">
          <span className="text-slate-500">Total :</span>{' '}
          <AnimatedNumber value={total}></AnimatedNumber>€
        </h3>
        <Button variant="primary">Réserver une session</Button>
      </div>
    </BackgroundGradient>
  )
}
