import { ImageIcon } from '@sanity/icons'
import { iconPickerOptions } from 'lib/iconPicker'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Encouragement',
  type: 'object',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'iconPicker',
      name: 'icon',
      title: 'Icon',
      options: iconPickerOptions,
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
    defineField({
      type: 'text',
      name: 'description',
      title: 'Description',
      validation: (rule) => rule.required(),
    }),
  ],
})
