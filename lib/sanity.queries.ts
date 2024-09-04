import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    overview,
    features,
    heading,
    links,
    youtubeId,
  }
`

export const siteTitleQuery = groq`
  *[_type == "settings"][0].title`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    coverImage,
    icon,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    // duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    title,
    footer,
    menuItems,
    ogImage,
  }
`

export const quotationQuery = groq`
  *[_type == "quotation"][0]{
    baseMinutes,
    baseTracks,
    options[]{
      title,
      description,
      price,
      included,
      proportional
    }
  }
`

export const questionsQuery = groq`
  *[_type == "questions"][0]{
    questions,
    title,
    description,
  }
`

export const whoAmIQuery = groq`
  *[_type == "whoami"][0]{
    avatar,
    body,
    name,
    job,
    stats,
  }
`

export const mixingStepsQuery = groq`
  *[_type == "mixingSteps"][0]{
    title,
    description,
    cta,
    steps[]{
      title,
      description,
      image,
      "audioUrl": audio.asset->url,
    }
  }
`

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const postsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`


export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const latestPostsPreview = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) [0...2] {
  ${postFields}
}
`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

const referenceFields = groq`
  _id,
  category->{name},
  description,
  name,
  date,
  picture,
  "unmixedAudio": unmixedAudio.asset->url,
  "mixedAudio": mixedAudio.asset->url,
`

export const referencesQuery = groq`
  *[_type == "workReference"]{
    ${referenceFields}
  }
`