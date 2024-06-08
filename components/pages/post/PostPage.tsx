import Layout from 'components/global/Layout'
import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import * as demo from 'lib/demo.data'
import Error from 'next/error'
import { Post, SettingsPayload } from 'types'

import PostHeader from './PostHeader'
import PostPageHead from './PostPageHead'
import PostsPreviews from './PostsPreviews'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: Post[]
  settings: SettingsPayload
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings } = props

  const slug = post?.slug

  if (!slug && !preview) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <Layout preview={preview} settings={settings}>
        <Container className="py-16">
          {preview && !post ? (
            <h1>Loading…</h1>
          ) : (
            <div className="flex flex-col gap-2">
              <article>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />
                <CustomPortableText
                  value={post.content}
                  className="lg:text-lg max-w-prose"
                />
              </article>
              {morePosts?.length > 0 && (
                <>
                  <h3 className="py-8 mt-12 border-t border-slate-700 ">
                    Découvrez d&apos;autres articles
                  </h3>
                  <PostsPreviews posts={morePosts} />
                </>
              )}
            </div>
          )}
        </Container>
      </Layout>
    </>
  )
}
