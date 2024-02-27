import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    overview,
    showcasePages[]->{
      _type,
      icon,
      overview,
      "slug": slug.current,
      // tags,
      title,
      coverImage,
    },
    heading,
    links,
    coverImage,
    body,
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
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    menuCta->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
