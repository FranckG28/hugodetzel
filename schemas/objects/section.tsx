import { SectionItem } from 'components/blocks/section/SectionItem'
import { iconPickerOptions } from 'lib/iconPicker'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Up to 2 images to be displayed in the section.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'color',
      title: 'Accent color',
      type: 'simplerColor',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'iconPicker',
      options: iconPickerOptions,
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'link',
    }),
    defineField({
      name: 'alignment',
      title: 'Image alignment',
      type: 'string',
      options: {
        list: ['left', 'right'],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {
        list: ['none', 'primary', 'secondary'],
      },
      initialValue: 'none',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      icon: 'icon',
      color: 'color',
      images: 'images',
      cta: 'cta',
      alignment: 'alignment',
      content: 'content',
    },
  },
  components: {
    preview: (props) => {
      const { renderDefault } = props

      return (
        <div>
          {renderDefault({ ...props, title: 'Section', subtitle: props.title })}
          <SectionItem
            // @ts-expect-error
            section={props}
            thumbnail={true}
          />
        </div>
      )
    },
  },
})
