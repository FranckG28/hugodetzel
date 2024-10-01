
import { QuotationEmailTemplate } from 'components/email/QuotationEmailTemplate'
import { getResend } from 'lib/resend'
import { FormState } from 'types/form-state'
import { z } from 'zod'

const quotationFields = {
    name: z.string(),
    email: z.string().email(),
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

    console.log('sending email', validatedFields.data)

    const resend = getResend()

    const { data, error } = await resend.emails.send({
        from: 'Hugo Detzel <contact@franck-g.fr>',
        to: ['gutmann.franck@outlook.fr'],
        subject: 'Nouvelle demande de devis',
        react: QuotationEmailTemplate({
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            message: validatedFields.data.message,
            quotation: validatedFields.data.quotation,
        }),
    })

    console.log('email sent', data, error)

    if (error) {
        return Response.json({
            success: false,
            message: error.message,
        })
    }

    return Response.json({
        success: true,
        message: `Merci ${validatedFields.data.name} pour votre demande. Je vous recontacterai très bientôt à l'adresse ${validatedFields.data.email}.`,
    });

}
