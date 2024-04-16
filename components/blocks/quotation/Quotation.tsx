import { FC } from 'react'
import { QuotationPayload } from 'types'

export const Quotation: FC<QuotationPayload> = ({
  baseMinutes,
  baseTracks,
  options,
}) => {
  return (
    <div>
      <>base minutes : {baseMinutes}</>
      <>base tracks : {baseTracks}</>
      {options.map((option) => (
        <div key={option.title}>
          <>title : {option.title}</>
          <>description : {option.description}</>
          <>price : {option.price}</>
        </div>
      ))}
    </div>
  )
}
