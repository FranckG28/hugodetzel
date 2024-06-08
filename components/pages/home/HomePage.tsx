import Layout from 'components/global/Layout'
import { MixingStepsSection } from 'components/mixing-steps/MixingStepsSection'
import { QuestionsSection } from 'components/questions/QuestionsSection'
import { FeatureSection } from 'components/shared/FeaturesSection'
import { Header } from 'components/shared/Header'
import { WhoAmISection } from 'components/whoami/WhoAmISection'
import type {
  HomePagePayload,
  MixingStepsPayload,
  Post,
  QuestionsPayload,
  WhoAmI,
} from 'types'
import { SettingsPayload } from 'types'

import { PostsSection } from '../post/PostsSection'
import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
  questions?: QuestionsPayload
  whoAmI?: WhoAmI
  mixingSteps?: MixingStepsPayload
  posts?: Post[]
}

export function HomePage({
  page,
  settings,
  preview,
  questions,
  whoAmI,
  mixingSteps,
  posts,
}: HomePageProps) {
  const {
    overview,
    features,
    heading = 'Personal website',
    links,
    coverImage,
  } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview}>
        {/* Header */}
        {heading && (
          <Header
            centered
            title={heading}
            description={overview}
            links={links}
            image={coverImage}
          />
        )}

        {features && <FeatureSection items={features} className="pb-20" />}
        {mixingSteps && <MixingStepsSection mixingSteps={mixingSteps} />}
        {posts && <PostsSection posts={posts} />}
        {whoAmI && <WhoAmISection whoAmI={whoAmI} />}
        {questions && <QuestionsSection questions={questions} />}
      </Layout>
    </>
  )
}
