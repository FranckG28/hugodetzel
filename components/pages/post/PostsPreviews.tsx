import { cn } from 'lib/utils'
import { Post } from 'types'

import PostPreview from './PostPreview'

type Props = {
  posts: Post[]
  className?: string
}

export default function PostsPreviews({ posts, className }: Props) {
  return (
    <div
      className={cn(
        'grid gap-4 md:gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {posts.map((post) => (
        <PostPreview
          key={post._id}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </div>
  )
}
