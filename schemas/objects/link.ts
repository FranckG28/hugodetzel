import { defineType } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    },
    {
      name: 'href',
      type: 'string',
      title: 'Url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      }
    },
  },
})
