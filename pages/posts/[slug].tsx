import PostPage from 'components/pages/post/PostPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { Post, SettingsPayload, SharedPageProps } from 'types'

interface PageProps extends SharedPageProps {
  post: Post
  morePosts: Post[]
  settings?: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, morePosts, draftMode } = props

  //   if (draftMode) {
  //     return (
  //       <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
  //     )
  //   }

  return <PostPage post={post} morePosts={morePosts} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, params.slug),
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      morePosts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
    fallback: 'blocking',
  }
}
