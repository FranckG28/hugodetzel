import { HomePage } from 'components/pages/home/HomePage'
import HomePagePreview from 'components/pages/home/HomePagePreview'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import {
  homePageQuery,
  questionsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import {
  HomePagePayload,
  QuestionsPayload,
  SettingsPayload,
  SharedPageProps,
} from 'types'

interface PageProps extends SharedPageProps {
  page: HomePagePayload
  settings: SettingsPayload
  questions: QuestionsPayload
}

interface Query {
  [key: string]: string
}

export default function IndexPage(props: PageProps) {
  const { page, settings, draftMode, questions } = props

  if (draftMode) {
    return <HomePagePreview page={page} settings={settings} />
  }

  return <HomePage page={page} settings={settings} questions={questions} />
}

const fallbackPage: HomePagePayload = {
  heading: '',
  overview: [],
  features: [],
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, page, questions] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<HomePagePayload | null>(homePageQuery),
    client.fetch<QuestionsPayload | null>(questionsQuery),
  ])

  return {
    props: {
      page: page ?? fallbackPage,
      settings: settings ?? {},
      questions,
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}
