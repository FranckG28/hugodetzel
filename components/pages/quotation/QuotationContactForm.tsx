'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import { SubmitQuotationState } from 'app/api/submit-quotation/route'
import { FieldErrors } from 'components/shared/FieldErrors'
import { Button } from 'components/ui/button'
import {
  CredenzaBody,
  CredenzaClose,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from 'components/ui/credenza'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Textarea } from 'components/ui/textarea'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FC, FormEvent } from 'react'
import { QuotationOutput } from 'types/quotation-output'

type Props = {
  quotation: QuotationOutput
  onSubmit?: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isLoading?: boolean
  state: SubmitQuotationState
}

export const QuotationContactForm: FC<Props> = ({
  quotation,
  onSubmit,
  isLoading,
  state,
}) => {
  if (state.success) {
    return (
      <div className="flex flex-col gap-4 items-center my-8">
        <CheckIcon className="w-12 h-12 text-emerald-500" />
        <h4 className="text-center">Message envoyé !</h4>
        <p className="text-center">{state.message}</p>
        <CredenzaClose asChild>
          <Button variant="outline">Fermer</Button>
        </CredenzaClose>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <CredenzaHeader>
        <CredenzaTitle>Encore une dernière chose !</CredenzaTitle>
        <CredenzaDescription>
          Ajoutez votre adresse email afin que je puisse vous recontacter.
        </CredenzaDescription>
      </CredenzaHeader>
      <CredenzaBody className="flex flex-col gap-6 my-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Votre nom</Label>
          <Input type="text" id="name" name="name" placeholder="Votre nom" />
          <FieldErrors errors={state?.errors?.name?._errors} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Votre addresse email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Votre adresse email"
          />
          <FieldErrors errors={state?.errors?.email?._errors} />
        </div>
        <div className="flex flex-col gap-2">
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
        {state?.message && <FieldErrors errors={[state.message]} />}
      </CredenzaBody>
      <CredenzaFooter>
        <CredenzaClose asChild>
          <Button variant="outline">Fermer</Button>
        </CredenzaClose>
        <Button type="submit" disabled={isLoading}>
          Envoyer
          {isLoading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />}
        </Button>
      </CredenzaFooter>
    </form>
  )
}
