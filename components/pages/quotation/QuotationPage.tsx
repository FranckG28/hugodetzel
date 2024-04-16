import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Layout from 'components/shared/Layout'
import { Slider } from 'components/ui/slider'
import { FC, useEffect, useState } from 'react'
import { QuotationPayload, SettingsPayload } from 'types'

const DEFAULT_TITLES = 1
const DEFAULT_MINUTES = 2
const DEFAULT_TRACKS = 1

const MAX_TITLES = 50
const MAX_MINUTES = 30
const MAX_TRACKS = 10

export const QuotationPage: FC<{
  quotation: QuotationPayload
  settings: SettingsPayload
}> = ({ quotation: { baseMinutes, baseTracks, options }, settings }) => {
  const [total, setTotal] = useState(0)
  const [titles, setTitles] = useState(DEFAULT_TITLES)
  const [tracks, setTracks] = useState(DEFAULT_TRACKS)
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES)

  useEffect(() => {
    setTotal(50 * titles * (tracks / baseTracks) * (minutes / baseMinutes))
  }, [titles, tracks, minutes, baseMinutes, baseTracks])

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
        {/* {options.map((option) => (
          <div key={option.title}>
            <>title : {option.title}</>
            <>
              description : <CustomPortableText value={option.description} />
            </>
            <>price : {option.price}</>
          </div>
        ))} */}

        <h3>
          Total : <span className="font-bold">{Math.round(total)} €</span>
        </h3>
      </Container>
    </Layout>
  )
}
