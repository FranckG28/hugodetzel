import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import categorySchema from './category'

export default defineType({
    name: 'workReference',
    title: 'References',
    icon: PlayIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'picture',
            title: 'Picture',
            type: 'image',
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
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: categorySchema.name }],
        }),
        defineField({
            name: 'unmixedAudio',
            title: 'Audio non mixé',
            type: 'file',
            options: {
                accept: 'audio/*',
            }
        }),
        defineField({
            name: 'mixedAudio',
            title: 'Audio mixé',
            type: 'file',
            validation: (rule) => rule.required(),
            options: {
                accept: 'audio/*',
            }
        }),
    ],
})