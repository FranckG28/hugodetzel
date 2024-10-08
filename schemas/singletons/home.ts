import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { allBlocks } from 'schemas/objects/blocks'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID',
      description: "ID de la vidéo YouTube à afficher en arrière-plan.",
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      description: 'This is the big title.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Description',
      type: 'array',
      of: allBlocks,
    }),
    defineField({
      name: 'links',
      title: 'Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'features',
      type: 'array',
      title: 'Encouragements',
      of: [
        defineArrayMember({
          type: 'feature',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
      }
    },
  },
})
