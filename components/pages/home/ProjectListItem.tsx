import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import type { ShowcaseProject } from 'types'

interface ProjectProps {
  project: ShowcaseProject
  odd: number
}

export function ProjectListItem(props: ProjectProps) {
  const { project, odd } = props

  return (
    <div
      className={`flex flex-col gap-x-5 p-2 transition hover:bg-gray-50/50 xl:flex-row ${
        odd && 'border-b border-t xl:flex-row-reverse'
      }`}
    >
      <div className="w-full xl:w-9/12">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="flex xl:w-1/4">
        <TextBox project={project} />
      </div>
    </div>
  )
}

function TextBox({ project }: { project: ShowcaseProject }) {
  const { cleaned: cleanedTitle, encoded: encodedTitle } = vercelStegaSplit(
    project.title || '',
  )
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
      <div>
        {/* Title */}
        <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
          {cleanedTitle}
          {encodedTitle && (
            <span style={{ display: 'none' }}>{encodedTitle}</span>
          )}
        </div>
        {/* Overview  */}
        <div className="font-serif text-slate-500">
          <CustomPortableText value={project.overview} />
        </div>
      </div>
      {/* Tags */}
      <div className="mt-4 flex flex-row gap-x-2">
        {project.tags?.map((tag, key) => (
          <div className="text-sm font-medium lowercase md:text-lg" key={key}>
            #{tag}
          </div>
        ))}
      </div>
    </div>
  )
}
