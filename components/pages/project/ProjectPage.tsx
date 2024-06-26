import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import type { ProjectPayload, SettingsPayload } from 'types'

import Layout from '../../global/Layout'
import ProjectPageHead from './ProjectPageHead'

export interface ProjectPageProps {
  project: ProjectPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export function ProjectPage({
  project,
  settings,
  homePageTitle,
  preview,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { client, coverImage, description, overview, site, tags, title } =
    project || {}

  // const startYear = new Date(duration?.start).getFullYear()
  // const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  return (
    <>
      <ProjectPageHead project={project} title={homePageTitle} />

      <Layout settings={settings} preview={preview}>
        <div>
          <div className="mb-20 space-y-6">
            {/* Header */}
            <Header title={title} description={overview} />

            <div className="rounded-md border">
              {/* Image  */}
              <ImageBox
                image={coverImage}
                alt={`Cover image for ${title}`}
                classesWrapper="relative aspect-[16/9]"
              />

              <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
                {/* Duration */}
                {/* {!!(startYear && endYear) && (
                  <div className="p-3 lg:p-4">
                    <div className="text-xs md:text-sm">Duration</div>
                    <div className="text-md md:text-lg">{`${startYear} -  ${endYear}`}</div>
                  </div>
                )} */}

                {/* Client */}
                {client && (
                  <div className="p-3 lg:p-4">
                    <div className="text-xs md:text-sm">Client</div>
                    <div className="text-md md:text-lg">{client}</div>
                  </div>
                )}

                {/* Site */}
                {site && (
                  <div className="p-3 lg:p-4">
                    <div className="text-xs md:text-sm">Site</div>
                    {site && (
                      <Link
                        target="_blank"
                        className="text-md break-words md:text-lg"
                        href={site}
                      >
                        {site}
                      </Link>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="p-3 lg:p-4">
                  <div className="text-xs md:text-sm">Tags</div>
                  <div className="text-md flex flex-row flex-wrap md:text-lg">
                    {tags?.map((tag, key) => (
                      <div key={key} className="mr-1 break-words ">
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {description && <CustomPortableText value={description} />}
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  )
}
