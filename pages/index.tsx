import { HomePage } from 'components/pages/home/HomePage'
import HomePagePreview from 'components/pages/home/HomePagePreview'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import {
  homePageQuery,
  questionsQuery,
  settingsQuery,
  whoAmIQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import {
  HomePagePayload,
  QuestionsPayload,
  SettingsPayload,
  SharedPageProps,
  WhoAmI,
} from 'types'

interface PageProps extends SharedPageProps {
  page: HomePagePayload
  settings: SettingsPayload
  questions: QuestionsPayload
  whoami: WhoAmI
}

interface Query {
  [key: string]: string
}

export default function IndexPage(props: PageProps) {
  const { page, settings, draftMode, questions, whoami } = props

  if (draftMode) {
    return <HomePagePreview page={page} settings={settings} />
  }

  return (
    <HomePage
      page={page}
      settings={settings}
      questions={questions}
      whoAmI={whoami}
    />
  )
}

const fallbackPage: HomePagePayload = {
  heading: '',
  overview: [],
  features: [],
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, page, questions, whoami] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<HomePagePayload | null>(homePageQuery),
    client.fetch<QuestionsPayload | null>(questionsQuery),
    client.fetch<WhoAmI | null>(whoAmIQuery),
  ])

  return {
    props: {
      page: page ?? fallbackPage,
      settings: settings ?? {},
      questions,
      draftMode,
      whoami,
      token: draftMode ? readToken : null,
    },
  }
}
