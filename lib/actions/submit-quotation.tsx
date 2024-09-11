"use server";

import { QuotationEmailTemplate } from "components/email/QuotationEmailTemplate";
import { getResend } from "lib/resend";
import { FormState } from "types/form-state";
import { z } from "zod"

const quotationFields = {
    name: z.string(),
    email: z.string().email(),
    message: z.string().optional(),
    quotation: z.any()
};

const quotationSchema = z.object(quotationFields)

export type SubmitQuotationState = FormState<typeof quotationFields>

export const submitQuotation = async (previousState: SubmitQuotationState, formData: FormData): Promise<SubmitQuotationState> => {

    console.log("submitting quotation", formData)

    const validatedFields = quotationSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        quotation: formData.get('quotation')
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.format()
        }
    }

    
    console.log("sending email", validatedFields.data)
    
    return;
    const resend = getResend();

    const {data, error} = await resend.emails.send({
        from: 'Hugo Detzel <lessichler@gmail.com>',
        to: ['gutmann.franck@outlook.fr'],
        subject: 'Nouvelle demande de devis',
        react: QuotationEmailTemplate({
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            message: validatedFields.data.message,
            quotation: validatedFields.data.quotation
        })
    })

    if (error) {
        return {
            success: false,
            message: error.message
        }
    }

    return {
        success: true,
        message: `Merci ${validatedFields.data.name} pour votre demande. Je vous recontacterai très bientôt à l'adresse ${validatedFields.data.email}.`
    }

}