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
      type: 'text',
      name: 'description',
      title: 'Description',
      validation: (rule) => rule.required(),
    }),
  ],
})
