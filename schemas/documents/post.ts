import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import { allBlocks } from 'schemas/objects/blocks'

import authorType from './author'

export default defineType({
    name: 'post',
    title: 'Post',
    icon: BookIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: allBlocks,
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: authorType.name }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            date: 'date',
            media: 'coverImage',
        },
        prepare({ title, media, author, date }) {
            const subtitles = [
                author && `by ${author}`,
                date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
            ].filter(Boolean)

            return { title, media, subtitle: subtitles.join(' ') }
        },
    },
})