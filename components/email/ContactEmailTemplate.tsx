import { QuotationOutput } from 'types/quotation-output'
import { QuotationTemplate } from './QuotationTemplate'

type Props = {
  name: string
  email: string
  message: string
  quotation: QuotationOutput
  date: Date
  sourceUrl: string
}

export const ContactEmailTemplate = ({
  name,
  email,
  message,
  quotation,
  date,
  sourceUrl,
}: Props) => {
  return (
    <div>
      <p>
        Le {date.toLocaleDateString()} par {name} ({email})
      </p>

      {message && <p>{message}</p>}

      <QuotationTemplate quotation={quotation} sourceUrl={sourceUrl} />
    </div>
  )
}
