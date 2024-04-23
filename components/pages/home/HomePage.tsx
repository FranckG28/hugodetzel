import Layout from 'components/global/Layout'
import { QuestionsSection } from 'components/questions/QuestionsSection'
import { FeatureSection } from 'components/shared/FeaturesSection'
import { Header } from 'components/shared/Header'
import { WhoAmISection } from 'components/whoami/WhoAmISection'
import type {
  HomePagePayload,
  MixingStepsPayload,
  QuestionsPayload,
  WhoAmI,
} from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
  questions?: QuestionsPayload
  whoAmI?: WhoAmI
  mixingSteps?: MixingStepsPayload
}

export function HomePage({
  page,
  settings,
  preview,
  questions,
  whoAmI,
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
        {whoAmI && <WhoAmISection whoAmI={whoAmI} />}
        {questions && <QuestionsSection questions={questions} />}
      </Layout>
    </>
  )
}
