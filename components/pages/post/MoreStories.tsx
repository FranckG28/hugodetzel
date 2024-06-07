import { Post } from 'types'

import PostPreview from './PostPreview'

export default function MoreStories({ posts }: { posts: Post[] }) {
  return (
    <section className="flex flex-col gap-4 py-24">
      <h3>Découvrez d&apos;autres articles</h3>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
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
    </section>
  )
}
