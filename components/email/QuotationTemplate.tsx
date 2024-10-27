import { QuotationOutput } from '@/types/quotation-output'
import { FC } from 'react'

type Props = {
  sourceUrl: string
  quotation: QuotationOutput
}

export const QuotationTemplate: FC<Props> = ({ quotation, sourceUrl }) => {
  return (
    <>
      <h2>Devis</h2>
      <p>
        <b>{quotation.titles} titre(s)</b>
      </p>
      <p>
        Durée moyenne d'un titre: <b>{quotation.minutes} minute(s)</b>
      </p>
      <p>
        Nombre de pistes par titre: <b>{quotation.tracks} minute(s)</b>
      </p>
      <p>
        <b>Options demandés:</b>
      </p>
      <ul>
        {quotation.options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
      <p>
        Prix suggéré: <b>{Math.trunc(quotation.total)} €</b>
      </p>

      <p style={{ marginTop: '2rem' }}>
        <i>
          Ce devis est une estimation et peut varier en fonction des besoins
          spécifiques de votre projet.
        </i>
      </p>

      <p style={{ marginTop: '2rem', color: 'gray', fontSize: '0.8rem' }}>
        Devis généré via <a href={'https://' + sourceUrl}>{sourceUrl}</a>
      </p>
    </>
  )
}
