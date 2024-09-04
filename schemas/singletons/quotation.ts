import { NumberIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { simpleBlocks } from 'schemas/objects/blocks'

export default defineType({
  name: 'quotation',
  title: 'Devis',
  type: 'document',
  icon: NumberIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'baseMinutes',
      description: 'Combien de minutes font un multiplicateur x1',
      title: 'Base de minutes',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'baseTracks',
      description: 'Combien de pistes font un multiplicateur x1',
      title: 'Base de pistes',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'options',
      title: 'Options',
      description: 'Options disponibles',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'option',
          title: 'Option',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
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
              title: 'Priux',
              type: 'number',
              initialValue: 0,
            }),
            defineField({
              name: 'included',
              title: 'Inclus',
              type: 'boolean',
              description: "L'option est facturée de manière transparente et il n'est pas possible de la décocher.",
              initialValue: false,
            }),
            defineField({
              name: 'proportional',
              title: 'Prix proportionnel',
              description: 'Est-ce que le prix de cette option est proportionnel au nombre de minutes ou de pistes.',
              type: 'boolean',
              initialValue: false,
            })
          ],
          preview: {
            select: {
              title: 'title',
              price: 'price',
              included: 'included',
              proportional: 'proportional',
            },
            prepare({ title, price, included, proportional }) {
              return {
                title: title,
                subtitle: `${price}€ ${included ? '(Inclus)' : ''} ${proportional ? '(Proportionnel)' : ''}`,
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
        title: 'Devis',
      }
    },
  },
})
