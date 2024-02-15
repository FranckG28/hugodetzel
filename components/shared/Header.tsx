import { vercelStegaSplit } from '@vercel/stega'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Link } from 'types'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  links: Link[]
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false, links } = props
  if (!description && !title) {
    return null
  }
  const { cleaned: cleanedTitle, encoded: encodedTitle } = vercelStegaSplit(
    title || '',
  )
  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
      {/* Title */}
      {cleanedTitle && (
        <h1
          className="text-3xl font-extrabold tracking-tight md:text-5xl"
          data-vercel-edit-target
        >
          {cleanedTitle}
          {encodedTitle && (
            <span style={{ display: 'none' }}>{encodedTitle}</span>
          )}
        </h1>
      )}
      {/* Description */}
      {description && (
        <div className="mt-4 font-serif text-xl text-slate-200 md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
      {links?.length > 0 && (
        <div className="mt-4 space-x-4">
          {links.map((link, key) => {
            return (
              <a key={key} href={link.href} className="text-blue-500 underline">
                {link.title}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
