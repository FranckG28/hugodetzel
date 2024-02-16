import type { Image, PortableTextBlock } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  image?: Image
  tags?: string[]
  title?: string
}

export interface Link {
  href?: string
  title?: string
}

export interface ShowcasePage {
  _type: string
  // coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  // tags?: string[]
  title?: string
  icon?: string
  coverImage?: Image
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcasePages?: ShowcasePage[]
  heading?: string
  links?: Link[]
  coverImage?: Image
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  coverImage?: Image
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  // duration?: {
  //   start?: string
  //   end?: string
  // }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
  title?: string
}
