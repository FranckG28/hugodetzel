import { HomePage, HomePageProps } from 'components/pages/home/HomePage'
import HomePagePreview from 'components/pages/home/HomePagePreview'
import { readToken } from 'lib/sanity.api'
import {
  getClient,
  getHomepage,
  getLatestPosts,
  getMixingSteps,
  getQuestions,
  getReferences,
  getSettings,
  getWhoAmI,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { HomePagePayload, SharedPageProps } from 'types'

interface PageProps extends SharedPageProps, HomePageProps {}

interface Query {
  [key: string]: string
}

export default function IndexPage({
  page,
  settings,
  draftMode,
  questions,
  whoAmI,
  mixingSteps,
  posts,
  references,
}: PageProps) {
  if (draftMode) {
    return <HomePagePreview page={page} settings={settings} />
  }

  return (
    <HomePage
      page={page}
      settings={settings}
      questions={questions}
      whoAmI={whoAmI}
      mixingSteps={mixingSteps}
      posts={posts}
      references={references}
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

  const [settings, page, questions, whoAmI, mixingSteps, posts, references] =
    await Promise.all([
      getSettings(client),
      getHomepage(client),
      getQuestions(client),
      getWhoAmI(client),
      getMixingSteps(client),
      getLatestPosts(client),
      getReferences(client),
    ])

  return {
    props: {
      page: page ?? fallbackPage,
      settings: settings ?? {},
      questions,
      draftMode,
      whoAmI,
      mixingSteps,
      posts,
      references,
      token: draftMode ? readToken : null,
    },
  }
}
