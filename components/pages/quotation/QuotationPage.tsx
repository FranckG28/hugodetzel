import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Layout from 'components/shared/Layout'
import { Checkbox } from 'components/ui/checkbox'
import { Slider } from 'components/ui/slider'
import useSet from 'lib/hooks/useSet'
import { FC, useEffect, useState } from 'react'
import { QuotationPayload, SettingsPayload } from 'types'

const DEFAULT_TITLES = 1
const DEFAULT_MINUTES = 3
const DEFAULT_TRACKS = 5

const MAX_TITLES = 50
const MAX_MINUTES = 30
const MAX_TRACKS = 30

export const QuotationPage: FC<{
  quotation: QuotationPayload
  settings: SettingsPayload
}> = ({ quotation: { baseMinutes, baseTracks, options }, settings }) => {
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
    <Layout settings={settings}>
      <Container className="py-32 flex flex-col gap-8">
        <h1>Devis</h1>

        <p>Nombre de titres : {titles}</p>
        <Slider
          value={[titles]}
          onValueChange={([val]) => setTitles(val)}
          min={1}
          max={MAX_TITLES}
          step={1}
        />

        <p>Durée moyenne : {minutes} minutes</p>
        <Slider
          value={[minutes]}
          onValueChange={([val]) => setMinutes(val)}
          min={1}
          max={MAX_MINUTES}
          step={1}
        />

        <p>Nombre de pistes en moyenne : {tracks}</p>
        <Slider
          value={[tracks]}
          onValueChange={([val]) => setTracks(val)}
          min={1}
          max={MAX_TRACKS}
          step={1}
        />

        <p>Options</p>

        {options.map((option) => (
          <div className="flex items-center gap-4" key={option.title}>
            <Checkbox
              id={option.title}
              disabled={option.included}
              value={option.title}
              checked={has(option.title)}
              onCheckedChange={(checked) => {
                if (checked) {
                  add(option.title)
                } else {
                  remove(option.title)
                }
              }}
            />
            <label
              htmlFor={option.title}
              className="peer-disabled:cursor-not-allowed flex flex-col"
            >
              <p className="text-lg font-bold">{option.title}</p>
              <CustomPortableText
                value={option.description}
                className="text-xs"
              />
              <p className="text-sm font-bold">
                {option.included ? <>Inclus</> : <>{option.price} €</>}
              </p>
            </label>
          </div>
        ))}

        <h3>
          Total : <span className="font-bold">{Math.round(total)} €</span>
        </h3>
      </Container>
    </Layout>
  )
}
