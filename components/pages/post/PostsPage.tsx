import Layout from 'components/global/Layout'
import { SiteMeta } from 'components/global/SiteMeta'
import { Container } from 'components/shared/Container'
import * as demo from 'lib/demo.data'
import { Post, SettingsPayload } from 'types'

import PostPreview from './PostPreview'

export interface PostPageProps {
  posts: Post[]
  settings: SettingsPayload
}

export default function PostsPage(props: PostPageProps) {
  const { posts, settings } = props
  const { title = demo.title } = settings || {}

  return (
    <>
      <SiteMeta
        baseTitle={title}
        //   description={project?.overview ? toPlainText(project.overview) : ''}
        title={'Blog'}
      />

      <Layout settings={settings}>
        <Container className="py-16 flex flex-col gap-10">
          <h2 className="my-12 lg:my-16 text-center">Blog</h2>

          <div className="mb-32 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-3 md:gap-y-32 lg:gap-x-12">
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
        </Container>
      </Layout>
    </>
  )
}
