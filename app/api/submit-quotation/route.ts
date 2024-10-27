
import { getClient } from '@/lib/sanity.client'
import { ContactEmailTemplate } from '@/components/email/ContactEmailTemplate'
import { getResend } from 'lib/resend'
import { FormState } from 'types/form-state'
import { z } from 'zod'
import { ConfirmationEmailTemplate } from '@/components/email/ConfirmationEmailTemplate'
import { Contact } from '@/types'
import { contactQuery } from '@/lib/sanity.queries'
import { Resend } from 'resend'

const quotationFields = {
    name: z.string({ message: 'Veuillez entrer votre nom' }),
    email: z.string().email({ message: 'Veuillez entrer une adresse email valide' }),
    message: z.string().optional(),
    quotation: z.any(),
}

const quotationSchema = z.object(quotationFields)

export type SubmitQuotationState = FormState<typeof quotationFields>

export async function POST(request: Request) {
    const formData = await request.formData()

    console.log('submitting quotation', formData)

    const validatedFields = quotationSchema.safeParse({
        name: formData.get('name') ?? null,
        email: formData.get('email'),
        message: formData.get('message'),
        quotation: formData.get('quotation'),
    })

    if (!validatedFields.success) {
        return Response.json({
            success: false,
            errors: validatedFields.error.format(),
        });
    }

    console.log('sending email', validatedFields.data)

    let contact: Contact;

    try {
        const client = getClient();
        contact = await client.fetch<Contact>(contactQuery);
    } catch (error) {
        console.error('error fetching contact', error);
        return Response.json({
            success: false,
            message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.',
        })
    }

    let resend: Resend;

    try {
        resend = getResend();
    } catch (error) {
        console.error('error initializing resend', error);
        return Response.json({
            success: false,
            message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.',
        })
    }

    const sourceUrl = 'hugodetzel.com'

    const mail = await resend.emails.send({
        from: `Hugo Detzel <contact@${sourceUrl}>`,
        to: contact.email,
        replyTo: validatedFields.data.email,
        subject: `Devis de ${validatedFields.data.name} sur ${sourceUrl}`,
        react: ContactEmailTemplate({
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            message: validatedFields.data.message,
            quotation: JSON.parse(validatedFields.data.quotation),
            date: new Date(),
            sourceUrl
        }),
    })

    if (mail.error) {
        console.error('error sending email', mail.error);
        return Response.json({
            success: false,
            message: mail.error.message,
        })
    } else {
        console.log('email sent', mail.data);
    }

    const confirm = await resend.emails.send({
        from: `Hugo Detzel <contact@${sourceUrl}>`,
        to: validatedFields.data.email,
        subject: contact.confirmationEmail.subject,
        replyTo: contact.email,
        react: ConfirmationEmailTemplate({
            name: validatedFields.data.name,
            introText: contact.confirmationEmail.introText,
            outroText: contact.confirmationEmail.outroText,
            message: validatedFields.data.message,
            quotation: JSON.parse(validatedFields.data.quotation),
            sourceUrl,
        }),
    })

    if (confirm.error) {
        console.error('error sending confirmation email', confirm.error);
        return Response.json({
            success: false,
            message: confirm.error.message,
        })
    } else {
        console.log('confirmation email sent', confirm.data);
    }

    return Response.json({
        success: true,
        message: contact.successMessage,
    })


}
