import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import type { ShowcasePage } from 'types'

interface ProjectProps {
  page: ShowcasePage
}

export function PageListItem(props: ProjectProps) {
  const { page } = props

  const { cleaned: cleanedTitle, encoded: encodedTitle } = vercelStegaSplit(
    page.title || '',
  )

  return (
    <div className={`bg-slate-800 rounded-xl shadow p-4 flex flex-col gap-2`}>
      {/* <div className="w-full xl:w-9/12">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div> */}
      {/* Title */}
      <h3 className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
        {cleanedTitle}
        {encodedTitle && (
          <span style={{ display: 'none' }}>{encodedTitle}</span>
        )}
      </h3>
      {/* Overview  */}
      <CustomPortableText
        paragraphClasses="font-serif text-slate-300"
        value={page.overview}
      />
    </div>
  )
}
