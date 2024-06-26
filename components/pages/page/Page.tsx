import Layout from 'components/global/Layout'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import type { PagePayload, SettingsPayload } from 'types'

import PageHead from './PageHead'

export interface PageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export function Page({ page, settings, homePageTitle, preview }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title, coverImage } = page || {}

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <div>
          <div className="mb-14">
            {/* Header */}
            <Header title={title} description={overview} image={coverImage} />

            {/* Body */}
            {body && <CustomPortableText value={body} container />}
          </div>
        </div>
      </Layout>
    </>
  )
}
