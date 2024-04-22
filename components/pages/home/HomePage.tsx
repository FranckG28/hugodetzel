import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import Layout from 'components/global/Layout'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { HomePagePayload, QuestionsPayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'
import { FeatureCards } from 'components/shared/FeatureCards'
import { FeatureSection } from 'components/shared/FeaturesSection'
import { QuestionsSection } from 'components/questions/QuestionsSection'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
  questions?: QuestionsPayload
}

export function HomePage({
  page,
  settings,
  preview,
  questions,
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

        <FeatureSection items={features} className="pb-16" />

        <QuestionsSection questions={questions} />
      </Layout>
    </>
  )
}
