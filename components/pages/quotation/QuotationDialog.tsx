'use client'

import { SubmitQuotationState } from 'app/api/submit-quotation/route'
import {
  Credenza,
  CredenzaContent,
  CredenzaTrigger,
} from 'components/ui/credenza'
import { FC, FormEvent, useState } from 'react'
import { QuotationOutput } from 'types/quotation-output'

import { QuotationContactForm } from './QuotationContactForm'

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
    setState(await response.json())
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent>
        <QuotationContactForm
          quotation={quotation}
          state={state}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </CredenzaContent>
    </Credenza>
  )
}
