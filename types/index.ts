import type { File, Image, PortableTextBlock } from 'sanity'

interface Color {
  label: string
  value: string
}

export interface MenuItem {
  link: string
  title: string
  newTab?: boolean
  button?: boolean
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

export type Feature = {
  icon?: any
  title: string
  description: string
  image?: Image
}

export type QuestionsPayload = {
  questions: QuestionItem[]
  title: string
  description: string
}

export type QuestionItem = {
  question: string
  answer: PortableTextBlock[]
}

export type Stat = {
  title: string
  value: string
}

export type WhoAmI = {
  stats: Stat[]
  body: PortableTextBlock[]
  avatar: Image
  name: string
  job: string
}

// Page payloads

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  heading?: string
  links?: Link[]
  youtubeId?: string
  features: Feature[]
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

export interface QuotationOption {
  title: string
  description: PortableTextBlock[]
  price: number
  included: boolean
  proportional: boolean
}

export interface QuotationPayload {
  baseMinutes: number
  baseTracks: number
  options: QuotationOption[]
}

export type MixingStep = {
  _id: string
  title: string
  description: string
  image: Image
  audioUrl: string
}

export type MixingStepsPayload = {
  title: string
  description: string;
  steps: MixingStep[]
}

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export type Reference = {
  _id: string
  name: string
  date: string
  description?: string
  picture: Image
  category: {
    name: string
  }
  mixedAudio: string
  unmixedAudio?: string
}

export type Contact = {
  email: string
  successMessage: string
  confirmationEmail: {
    subject: string
    introText: string
    outroText: string
  }
}