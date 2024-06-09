import { QuotationPage } from 'components/pages/quotation/QuotationPage'
import { readToken } from 'lib/sanity.api'
import { getClient, getQuotation, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { QuotationPayload, SettingsPayload, SharedPageProps } from 'types'

interface PageProps extends SharedPageProps {
  quotation: QuotationPayload
  settings: SettingsPayload
}

export default function Page(props: PageProps) {
  const { quotation, settings } = props

  // if (draftMode) {
  //   return <HomePagePreview page={page} settings={settings} />
  // }

  return <QuotationPage quotation={quotation} settings={settings} />
}

const fallback: QuotationPayload = {
  baseTracks: 5,
  baseMinutes: 3,
  options: [],
}

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, quotation] = await Promise.all([
    getSettings(client),
    getQuotation(client),
  ])

  return {
    props: {
      quotation: quotation ?? fallback,
      settings: settings ?? {},
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}
