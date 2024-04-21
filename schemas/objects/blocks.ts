import { BlockContentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'

export const simpleBlocks = defineArrayMember({
  type: 'block',
  marks: {
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'Url',
          },
        ],
      },
    ],
    decorators: [
      {
        title: 'Italic',
        value: 'em',
      },
      {
        title: 'Strong',
        value: 'strong',
      },
    ],
  },
  styles: [],
})

export const allBlocks = [
  // Paragraphs
  simpleBlocks,
  // Custom blocks
  defineArrayMember({
    name: 'section',
    type: 'section',
    icon: BlockContentIcon,
  }),
  defineArrayMember({
    name: 'timeline',
    type: 'timeline',
  }),
  defineField({
    type: 'image',
    icon: ImageIcon,
    name: 'image',
    title: 'Image',
    options: {
      hotspot: true,
    },
    preview: {
      select: {
        imageUrl: 'asset.url',
        title: 'caption',
      },
    },
    fields: [
      defineField({
        title: 'Caption',
        name: 'caption',
        type: 'string',
      }),
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alt text',
        description:
          'Alternative text for screenreaders. Falls back on caption if not set',
      }),
    ],
  }),
  defineField({ type: 'youtube' as any }),
]

export const bodyObject = defineField({
  type: 'array',
  name: 'body',
  title: 'Body',
  description:
    "This is where you can write the page's content. Including custom blocks for more a more visual display of information.",
  of: allBlocks,
})
