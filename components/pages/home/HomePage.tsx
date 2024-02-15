import { PageListItem } from 'components/pages/home/PageListItem'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
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
  } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview}>
        <div className="space-y-20">
          {/* Header */}
          {heading && (
            <Header
              centered
              title={heading}
              description={overview}
              links={links}
            />
          )}
          {/* Showcase pages */}
          {showcasePages && showcasePages.length > 0 && (
            <div className="gap-2 grid md:grid-cols-2 lg:grid-cols-4">
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

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
