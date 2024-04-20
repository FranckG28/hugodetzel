import { Container } from 'components/shared/Container'
import Layout from 'components/shared/Layout'
import { FC } from 'react'
import { QuotationPayload, SettingsPayload } from 'types'
import { QuotationForm } from './QuotationForm'

export const QuotationPage: FC<{
  quotation: QuotationPayload
  settings: SettingsPayload
}> = ({ quotation, settings }) => {
  return (
    <Layout settings={settings}>
      <Container className="pt-28 pb-10 flex flex-col gap-8">
        <QuotationForm quotation={quotation} />
      </Container>
    </Layout>
  )
}
