
import { getClient } from '@/lib/sanity.client'
import { ContactEmailTemplate } from '@/components/email/ContactEmailTemplate'
import { getResend } from 'lib/resend'
import { FormState } from 'types/form-state'
import { z } from 'zod'
import { ConfirmationEmailTemplate } from '@/components/email/ConfirmationEmailTemplate'

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
        name: formData.get('name'),
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

    const client = getClient();

    console.log('sending email', validatedFields.data)

    const resend = getResend()

    const sourceUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?? 'hugodetzel.com'

    const mail = await resend.emails.send({
        from: `Hugo Detzel <contact@${sourceUrl}>`,
        to: ['gutmann.franck@outlook.fr'],
        replyTo: validatedFields.data.email,
        subject: `Demande de devis de la part de ${validatedFields.data.name}`,
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
        subject: `Votre demande de devis sur ${sourceUrl}`,
        react: ConfirmationEmailTemplate({
            name: validatedFields.data.name,
            introText: 'Merci pour votre demande de devis.',
            outroText: 'Je vous recontacterai très bientôt.',
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
        message: `Merci ${validatedFields.data.name} pour votre demande. Je vous recontacterai très bientôt à l'adresse ${validatedFields.data.email}.`,
    })


}
