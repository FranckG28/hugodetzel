import { SiteMeta } from 'components/global/SiteMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import Head from 'next/head'
import { Post, SettingsPayload } from 'types'

export interface PostPageHeadProps {
  settings: SettingsPayload
  post: Post
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <Head>
      <title>{post.title ? `${post.title} | ${title}` : title}</title>
      <SiteMeta />
      {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
