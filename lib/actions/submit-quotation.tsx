import { FormState } from "lib/form-state"
import { z } from "zod"

const quotationFields = {
    name: z.string(),
    email: z.string().email(),
    message: z.string().optional(),
};

const quotationSchema = z.object(quotationFields)

export type SubmitQuotationState = FormState<typeof quotationFields>

export const submitQuotation = async (previousState: SubmitQuotationState, formData: FormData): Promise<SubmitQuotationState> => {

    console.log("submitting quotation", formData)

    const validatedFields = quotationSchema.safeParse(formData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.format()
        }
    }

    return {
        success: true,
        message: `Merci ${validatedFields.data.name} pour votre demande. Je vous recontacterai très bientôt à l'adresse ${validatedFields.data.email}.`
    }

}