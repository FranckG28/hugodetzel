import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: "email",
            invert: false,
          }
        ),
    }),
    defineField({
      name: 'successMessage',
      description: 'Le message affiché à l\'utilisateur après l\'envoi du formulaire',
      title: 'Message de remerciement',
      type: 'text',
      initialValue: "Merci pour votre message, je vous répondrai dès que possible.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'confirmationEmail',
      description: 'Le message envoyé à l\'utilisateur après l\'envoi du formulaire',
      title: 'Message de confirmation',
      type: 'object',
      fields: [
        defineField({
          name: 'subject',
          title: 'Sujet du mail',
          type: 'string',
          initialValue: "Merci pour votre message",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'introText',
          title: 'Texte d\'introduction',
          type: 'text',
          description: 'Message affiché en haut du mail, juste après le bonjour et juste avant le devis',
          initialValue: "Merci pour votre message.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'outroText',
          title: 'Texte de conclusion',
          type: 'text',
          description: 'Message affiché à la fin du mail, après le devis',
          initialValue: "Je vous répondrai dès que possible.",
          validation: (rule) => rule.required(),
        }),
      ],
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact',
      }
    },
  },
})
