import AuthorAvatar from 'components/shared/AuthorAvatar'
import { Post } from 'types'

import CoverImage from './CoverImage'
import PostDate from './PostDate'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, author, slug } = props
  return (
    <>
      <div className="mb-8 sm:mx-0">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <h1 className="pb-6">{title}</h1>
      <div className="md:mb-12 flex items-center gap-12 flex-wrap">
        {author && <AuthorAvatar name={author.name} picture={author.picture} />}
        <PostDate dateString={date} />
      </div>
    </>
  )
}
