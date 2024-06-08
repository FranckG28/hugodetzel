import PostsPage from 'components/pages/post/PostsPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { postsQuery, settingsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { Post, SettingsPayload, SharedPageProps } from 'types'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function IndexPage(props: PageProps) {
  const { settings, draftMode, posts } = props

  //   if (draftMode) {
  //     return <HomePagePreview page={page} settings={settings} />
  //   }

  return <PostsPage posts={posts} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<Post[] | null>(postsQuery),
  ])

  return {
    props: {
      settings: settings ?? {},
      posts,
      draftMode,
      token: draftMode ? readToken : null,
    },
  }
}
