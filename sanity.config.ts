/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  basePath,
  dataset,
  previewSecretId,
  projectId,
} from 'lib/sanity.api'
import { productionUrl } from 'plugins/productionUrl'
import { pageStructure, singletonPlugin } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { iconPicker } from 'sanity-plugin-icon-picker'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import page from 'schemas/documents/page'
import project from 'schemas/documents/project'
import link from 'schemas/objects/link'
import milestone from 'schemas/objects/milestone'
import section from 'schemas/objects/section'
import timeline from 'schemas/objects/timeline'
import youtube from 'schemas/objects/youtube'
import home from 'schemas/singletons/home'
import settings from 'schemas/singletons/settings'
import quotation from 'schemas/singletons/quotation'
import feature from 'schemas/objects/feature'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
  home.name,
  page.name,
  project.name,
  quotation.name,
]

export default defineConfig({
  basePath,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      quotation,
      // Documents
      page,
      project,
      // Objects
      milestone,
      timeline,
      youtube,
      link,
      feature,
      section,
    ],
  },
  plugins: [
    deskTool({
      structure: pageStructure([home, settings, quotation]),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name, quotation.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    iconPicker(),
    simplerColorInput({
      defaultColorList: [
        { label: 'Slate', value: '#94a3b8' },
        { label: 'Gray', value: '#9ca3af' },
        { label: 'Zinc', value: '#a1a1aa' },
        { label: 'Neutral', value: '#a3a3a3' },
        { label: 'Stone', value: '#a8a29e' },
        { label: 'Red', value: '#f87171' },
        { label: 'Orange', value: '#fb923c' },
        { label: 'Amber', value: '#fbbf24' },
        { label: 'Yellow', value: '#facc15' },
        { label: 'Lime', value: '#a3e635' },
        { label: 'Green', value: '#4ade80' },
        { label: 'Emerald', value: '#34d399' },
        { label: 'Teal', value: '#2dd4bf' },
        { label: 'Cyan', value: '#22d3ee' },
        { label: 'Sky', value: '#38bdf8' },
        { label: 'Blue', value: '#60a5fa' },
        { label: 'Indigo', value: '#818cf8' },
        { label: 'Violet', value: '#a78bfa' },
        { label: 'Purple', value: '#d8b4fe' },
        { label: 'Fuchsia', value: '#e879f9' },
        { label: 'Pink', value: '#f472b6' },
        { label: 'Rose', value: '#fb7185' },
      ],
    }),
  ],
})
