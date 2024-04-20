import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Checkbox } from 'components/ui/checkbox'
import { Slider } from 'components/ui/slider'
import useSet from 'lib/hooks/useSet'
import { FC, useEffect, useState } from 'react'
import { QuotationPayload } from 'types'
import { QuotationOption } from './QuotationOption'
import { QuotationSlider } from './QuotationSlider'
import { QuotationPreview } from './QuotationPreview'
import { Button } from 'components/shared/Button'

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
    <div className="grid lg:grid-cols-2 gap-8 rounded-xl shadow-xl bg-slate-900 p-8 border-t border-slate-800">
      <QuotationPreview />

      <div className="flex flex-col gap-10">
        <QuotationSlider
          label="Combien de titres souhaitez vous soumettre ?"
          valueDisplay={(value) => `${value} titre${value > 1 ? 's' : ''}`}
          value={titles}
          onChange={setTitles}
          min={1}
          max={MAX_TITLES}
        />

        <QuotationSlider
          label="Combien de minutes durent vos titres en moyenne ?"
          value={minutes}
          valueDisplay={(value) => `${value} minute${value > 1 ? 's' : ''}`}
          onChange={setMinutes}
          min={1}
          max={MAX_MINUTES}
        />

        <QuotationSlider
          label="De combien de pistes sont composés vos titres en moyenne ?"
          value={tracks}
          valueDisplay={(value) => `${value} piste${value > 1 ? 's' : ''}`}
          onChange={setTracks}
          min={1}
          max={MAX_TRACKS}
        />

        <div className="flex flex-col gap-6">
          <p className="font-medium text-slate-300 leading-tight">
            Prestations
          </p>

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

        <div className="flex gap-2 items-center justify-between">
          <h3 className="text-right">
            Total : <span className="font-bold">{Math.round(total)} €</span>
          </h3>
          <Button variant="primary">Réserver une session</Button>
        </div>
      </div>
    </div>
  )
}
