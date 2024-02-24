import { PageListItem } from 'components/pages/home/PageListItem'
import { Container } from 'components/shared/Container'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
}

export function HomePage({ page, settings, preview }: HomePageProps) {
  const {
    overview,
    showcasePages,
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

        <Container>
          {/* Showcase pages */}
          {showcasePages && showcasePages.length > 0 && (
            <div className="gap-6 grid md:grid-cols-2 xl:grid-cols-4 items-stretch">
              {showcasePages.map((project, key) => {
                const href = resolveHref(project._type, project.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link key={key} href={href}>
                    <PageListItem page={project} />
                  </Link>
                )
              })}
            </div>
          )}
        </Container>
      </Layout>
    </>
  )
}
