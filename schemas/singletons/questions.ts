import { HelpCircleIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { simpleBlocks } from 'schemas/objects/blocks'

export default defineType({
  name: 'questions',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description de la section',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'item',
          title: 'FAQ',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Réponse',
              type: 'array',
              of: [simpleBlocks],
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'FAQ',
      }
    },
  },
})
