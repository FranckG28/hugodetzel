import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import DynamicIcon from 'components/shared/DynamicIcon'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'
import type { ShowcasePage } from 'types'

interface ProjectProps {
  page: ShowcasePage
}

export function PageListItem(props: ProjectProps) {
  const { page } = props

  const { cleaned: cleanedTitle, encoded: encodedTitle } = vercelStegaSplit(
    page.title || '',
  )

  const imageUrl = urlForImage(page.coverImage).width(300).height(600).url()

  return (
    <div
      className={`bg-slate-800 rounded-2xl shadow-2xl shadow-slate-400/20 h-full group relative overflow-hidden xl:aspect-[3/4] cursor-pointer hover:shadow-slate-400/40 focus:shadow-slate-400/40 hover:ring-2 hover:ring-white focus:ring-white transition-all min-h-80`}
    >
      <Image
        src={imageUrl}
        alt={`Cover image from ${page.title}`}
        fill
        className="absolute object-cover h-full w-full z-0 brightness-75 transition group-hover:brightness-100"
      />

      <div className="absolute h-full w-full bg-gradient-to-b from-transparent group to-slate-950/90 z-0"></div>

      <div className="relative z-10 flex flex-col gap-2 p-6 h-full group-hover:pb-14 transition-all">
        <DynamicIcon icon={page.icon} className="w-6 h-6 mb-auto" />

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight md:text-2xl">
          {cleanedTitle}
          {encodedTitle && (
            <span style={{ display: 'none' }}>{encodedTitle}</span>
          )}
        </h3>
        {/* Overview  */}
        <CustomPortableText
          paragraphClasses="font-serif text-slate-200 line-clamp-4 text-base leading-tight transition-all max-w-prose"
          value={page.overview}
        />

        <div className="font-medium font-sans text-xl text-white flex flex-row items-center gap-2 justify-between absolute bottom-4 opacity-0 group-hover:opacity-100 group-hover:bottom-6 transition-all">
          En savoir plus <FiArrowRight />
        </div>
      </div>
    </div>
  )
}
