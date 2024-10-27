import { QuotationOutput } from 'types/quotation-output'
import { QuotationTemplate } from './QuotationTemplate'

type Props = {
  name: string
  introText: string
  outroText: string
  message: string
  quotation: QuotationOutput
  sourceUrl: string
}

export const ConfirmationEmailTemplate = ({
  name,
  introText,
  outroText,
  message,
  quotation,
  sourceUrl,
}: Props) => {
  return (
    <div>
      <h3>Bonjour {name},</h3>

      {introText && <p>{introText}</p>}

      {message && (
        <div>
          <h5>Votre message</h5>
          <p>{message}</p>
        </div>
      )}

      <QuotationTemplate quotation={quotation} sourceUrl={sourceUrl} />

      {outroText && <p>{outroText}</p>}
    </div>
  )
}
