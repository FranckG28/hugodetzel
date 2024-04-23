import { ControlsIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { simpleBlocks } from 'schemas/objects/blocks'

export default defineType({
    name: 'mixingSteps',
    title: 'Étapes du mixage',
    type: 'document',
    icon: ControlsIcon,
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
            name: 'steps',
            title: 'Étapes',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'item',
                    title: 'Étape',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'audio',
                            title: 'Audio',
                            type: 'file',
                            validation: (rule) => rule.required(),
                            options: {
                                accept: 'audio/*',
                            }
                        }),
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description',
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'cta',
            type: 'object',
            title: 'Call to action',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre du bouton',
                    type: 'string',
                }),
                defineField({
                    name: 'link',
                    title: 'Lien du bouton',
                    type: 'string',
                }),
            ],
        })
    ],
    preview: {
        prepare() {
            return {
                title: 'Étapes du mixage',
            }
        },
    },
})
