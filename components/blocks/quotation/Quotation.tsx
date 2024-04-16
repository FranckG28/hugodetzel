import { FC } from 'react'

type QuotationProps = {
  unitPrice?: number
  baseMinutes?: number
  baseTracks?: number
  options: {
    title: string
    description: string
    price: number
  }[]
}

export const Quotiation: FC<QuotationProps> = ({
  unitPrice,
  baseMinutes,
  baseTracks,
  options,
}) => {
  return (
    <div>
      <>unit price : {unitPrice}</>
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
