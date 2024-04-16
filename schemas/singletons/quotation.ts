import { NumberIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { simpleBlocks } from 'schemas/objects/custom-blocks'

export default defineType({
  name: 'quotation',
  title: 'Quotation',
  type: 'document',
  icon: NumberIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'baseMinutes',
      description: 'How much minutes makes a x1 multiplier.',
      title: 'Base minutes',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'baseTracks',
      description: 'How much tracks makes a x1 multiplier.',
      title: 'Base tracks',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'options',
      title: 'Options',
      description: 'Available options.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'option',
          title: 'Option',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [simpleBlocks],
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              initialValue: 0,
            }),
            defineField({
              name: 'included',
              title: 'Included',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              price: 'price',
              included: 'included',
            },
            prepare({ title, price, included }) {
              return {
                title: title,
                subtitle: `${price}€ ${included ? '(Included)' : ''}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Quotation',
      }
    },
  },
})
