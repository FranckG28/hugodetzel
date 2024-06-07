import { createClient, SanityClient } from '@sanity/client/stega'
import {
  apiVersion,
  basePath,
  dataset,
  projectId,
  useCdn,
} from 'lib/sanity.api'
import { Post } from 'types'

import { postAndMoreStoriesQuery, postBySlugQuery, postSlugsQuery, postsQuery } from './sanity.queries'

export function getClient(preview?: { token: string }) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
      studioUrl: basePath,
      logger: console,
      filter: (props) => {
        if (typeof props.sourcePath.at(-1) === 'number') {
          return false
        }
        if (
          props.sourcePath.at(-2) === 'marks' &&
          typeof props.sourcePath.at(-1) === 'number'
        ) {
          return false
        }
        switch (props.sourcePath.at(-1)) {
          case 'href':
          case 'listItem':
          case 'site':
            return false
        }
        return props.filterDefault(props)
      },
    },
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}


export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(postsQuery)) || []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}