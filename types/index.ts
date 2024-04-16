import type { Image, PortableTextBlock } from 'sanity'

interface Color {
  label: string
  value: string
}

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

export interface Section {
  _type: string
  alignment?: 'left' | 'right'
  background: 'none' | 'primary' | 'secondary'
  content?: PortableTextBlock[]
  icon?: any
  images?: Image[]
  subtitle?: string
  title?: string
  cta?: Link
  color?: Color
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
  icon?: any
  coverImage?: Image
}

// Page payloads

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcasePages?: ShowcasePage[]
  heading?: string
  links?: Link[]
  coverImage?: Image
  body?: PortableTextBlock[]
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
  menuCta?: MenuItem
  ogImage?: Image
  title?: string
}

export interface QuotationOption {
  title: string
  description: PortableTextBlock[]
  price: number
  included: boolean
}

export interface QuotationPayload {
  baseMinutes: number
  baseTracks: number
  options: QuotationOption[]
}
