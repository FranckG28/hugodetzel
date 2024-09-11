"use client";

import { FieldErrors } from "components/shared/FieldErrors";
import { SubmitButton } from "components/shared/SubmitButton";
import { Button } from "components/ui/button";
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "components/ui/credenza";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { submitQuotation } from "lib/actions/submit-quotation";
import { FC } from "react";
import { useFormState } from "react-dom";

type Props = {
    children: React.ReactNode;
}

export const QuotationDialog: FC<Props> = ({ children }) => {

    const [state, formAction] = useFormState(submitQuotation, {success: false})

    return <Credenza>
        <CredenzaTrigger asChild>
         {children}
        </CredenzaTrigger>
        <CredenzaContent>
            <form action={formAction}>
            <CredenzaHeader>
                <CredenzaTitle>
                    Encore une dernière chose !
                </CredenzaTitle>
                <CredenzaDescription>
                    Ajoutez votre adresse email afin que je puisse vous recontacter. 
                </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className="flex flex-col gap-4 my-4">
                <div>
                    <Label htmlFor="name">Votre nom</Label>
                    <Input type="text" id="name" name="name" placeholder="Votre nom" />
                    <FieldErrors errors={state?.errors?.name?._errors} />
                </div>
                <div>
                    <Label htmlFor="mail">Votre addresse mail</Label>
                    <Input type="email" id="mail" name="mail" placeholder="Votre adresse mail" />
                    <FieldErrors errors={state?.errors?.email?._errors} />
                </div>
                <div>
                    <Label htmlFor="message">Ajouter un message (facultatif)</Label>
                    <Textarea id="message" name="message" placeholder="Décrivez votre projet afin que je puisse m'adapter à vos besoins." />
                    <FieldErrors errors={state?.errors?.message?._errors} />
                </div>
            </CredenzaBody>
            <CredenzaFooter>
                <CredenzaClose asChild>
                    <Button variant="secondary">Fermer</Button>
                </CredenzaClose>
                {state?.message && <p>{state.message}</p>}
                <SubmitButton>
                    Envoyer
                </SubmitButton>
            </CredenzaFooter>
            </form>
        </CredenzaContent>
    </Credenza>

}