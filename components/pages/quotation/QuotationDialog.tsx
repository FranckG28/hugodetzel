'use client'

import { SubmitQuotationState } from 'app/api/submit-quotation/route'
import { FieldErrors } from 'components/shared/FieldErrors'
import { Button } from 'components/ui/button'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from 'components/ui/credenza'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Textarea } from 'components/ui/textarea'
import { FC, FormEvent, useState } from 'react'
import { QuotationOutput } from 'types/quotation-output'

type Props = {
  children: React.ReactNode
  quotation: QuotationOutput
}

export const QuotationDialog: FC<Props> = ({ children, quotation }) => {
  const [state, setState] = useState<SubmitQuotationState>({ success: false })
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isLoading) {
      return
    }

    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit-quotation', {
      method: 'POST',
      body: formData,
    })

    setIsLoading(false)
    // Handle response if necessary
    setState(await response.json())
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent>
        <form onSubmit={onSubmit}>
          <CredenzaHeader>
            <CredenzaTitle>Encore une dernière chose !</CredenzaTitle>
            <CredenzaDescription>
              Ajoutez votre adresse email afin que je puisse vous recontacter.
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody className="flex flex-col gap-4 my-4">
            <div>
              <Label htmlFor="name">Votre nom</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Votre nom"
              />
              <FieldErrors errors={state?.errors?.name?._errors} />
            </div>
            <div>
              <Label htmlFor="email">Votre addresse email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Votre adresse email"
              />
              <FieldErrors errors={state?.errors?.email?._errors} />
            </div>
            <div>
              <Label htmlFor="message">Ajouter un message (facultatif)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Décrivez votre projet afin que je puisse m'adapter à vos besoins."
              />
              <FieldErrors errors={state?.errors?.message?._errors} />
            </div>
            <input
              type="hidden"
              name="quotation"
              value={JSON.stringify(quotation)}
            />
            {state?.message && <p>{state.message}</p>}
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button variant="outline">Fermer</Button>
            </CredenzaClose>
            <Button type="submit" disabled={isLoading}>
              Envoyer
            </Button>
          </CredenzaFooter>
        </form>
      </CredenzaContent>
    </Credenza>
  )
}
