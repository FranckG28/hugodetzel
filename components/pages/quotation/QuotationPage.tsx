import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Layout from 'components/shared/Layout'
import { FC } from 'react'
import { QuotationPayload, SettingsPayload } from 'types'

export const QuotationPage: FC<{
  quotation: QuotationPayload
  settings: SettingsPayload
}> = ({ quotation: { baseMinutes, baseTracks, options }, settings }) => {
  return (
    <Layout settings={settings}>
      <Container className="py-32">
        <h1>Devis</h1>

        {options.map((option) => (
          <div key={option.title}>
            <>title : {option.title}</>
            <>
              description : <CustomPortableText value={option.description} />
            </>
            <>price : {option.price}</>
          </div>
        ))}
      </Container>
    </Layout>
  )
}
