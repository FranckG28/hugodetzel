import { UserIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { bodyObject } from 'schemas/objects/blocks'

export default defineType({
  name: 'whoami',
  title: 'Qui suis-je',
  type: 'document',
  icon: UserIcon,
  fields: [
    bodyObject,
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'stat',
          title: 'Statistique',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Valeur',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'value',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'job',
      title: 'Métier',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Qui suis-je',
      }
    },
  },
})
