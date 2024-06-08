import AuthorAvatar from 'components/shared/AuthorAvatar'
import Link from 'next/link'
import { Post } from 'types'

import CoverImage from './CoverImage'
import PostDate from './PostDate'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Omit<Post, '_id'>) {
  return (
    <Link href={`/posts/${slug}`} className="flex flex-col gap-3 group">
      <CoverImage
        // slug={slug}
        title={title}
        image={coverImage}
        priority={false}
      />
      <PostDate dateString={date} className="text-slate-300 text-sm pt-2" />
      <h5 className="group-hover:underline">{title}</h5>
      {excerpt && <p className="text-pretty text-slate-200">{excerpt}</p>}
      {/* {author && <AuthorAvatar name={author.name} picture={author.picture} />} */}
    </Link>
  )
}
