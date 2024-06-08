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
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div>
      <h4>
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h4>
      <div className="mb-4 text-slate-300">
        <PostDate dateString={date} />
      </div>
      {excerpt && (
        <p className="mb-4 text-lg leading-relaxed text-pretty text-slate-200">
          {excerpt}
        </p>
      )}
      {author && <AuthorAvatar name={author.name} picture={author.picture} />}
    </div>
  )
}
