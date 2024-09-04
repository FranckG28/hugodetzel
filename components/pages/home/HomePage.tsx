import { FeatureSection } from 'components/features/FeaturesSection'
import Layout from 'components/global/Layout'
import { MixingStepsSection } from 'components/mixing-steps/MixingStepsSection'
import { QuestionsSection } from 'components/questions/QuestionsSection'
import { ReferencesSection } from 'components/references/ReferencesSection'
import { Header } from 'components/shared/Header'
import { WhoAmISection } from 'components/whoami/WhoAmISection'
import type {
  HomePagePayload,
  MixingStepsPayload,
  Post,
  QuestionsPayload,
  Reference,
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
  references?: Reference[]
}

export function HomePage({
  page,
  settings,
  preview,
  questions,
  whoAmI,
  mixingSteps,
  posts,
  references,
}: HomePageProps) {
  const {
    overview,
    features,
    heading = 'Personal website',
    links,
    youtubeId,
  } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview}>
        {heading && (
          <Header
            centered
            title={heading}
            description={overview}
            links={links}
            youtubeId={youtubeId}
          />
        )}

        {features && (
          <FeatureSection items={features} className="pb-20 -mt-24" />
        )}
        {mixingSteps && <MixingStepsSection mixingSteps={mixingSteps} />}
        {references && <ReferencesSection references={references} />}
        {whoAmI && <WhoAmISection whoAmI={whoAmI} />}
        {posts && <PostsSection posts={posts} />}
        {questions && <QuestionsSection questions={questions} />}
      </Layout>
    </>
  )
}
