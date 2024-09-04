import { AnimatedNumber } from 'components/shared/AnimatedNumbers'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Checkbox } from 'components/ui/checkbox'
import { cn } from 'lib/utils'
import { FC } from 'react'
import { QuotationOption as QuotationOptionType } from 'types'

type Props = {
  option: QuotationOptionType
  checked: boolean
  multiplier: number
  onChange: (checked: boolean) => void
}

export const QuotationOption: FC<Props> = (props) => {
  const { option, checked, onChange } = props
  return (
    <label
      htmlFor={option.title}
      className={cn(
        'flex flex-col gap-2 p-4 rounded-xl transition-all shadow relative ring-1 select-none',
        checked ? 'bg-blue-200/20 ring-slate-300/30' : 'ring-slate-800',
        option.included ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <Checkbox
        id={option.title}
        aria-readonly="true"
        value={option.title}
        checked={checked}
        disabled={option.included}
        className="absolute top-4 right-4"
        onCheckedChange={onChange}
      />

      <p className="font-bold">{option.title}</p>

      <CustomPortableText
        value={option.description}
        className="text-slate-300 flex-1"
      />

      <p className="text-slate-300 tracking-tight font-medium text-right leading-none pt-2">
        <QuotationPrice {...props} />
      </p>
    </label>
  )
}

const QuotationPrice: FC<Props> = ({ option, multiplier }) => {
  if (option.included) {
    return <>Offert</>
  }

  if (!option.proportional) {
    return <>{option.price} € / titre</>
  }

  const price = option.price * multiplier
  return (
    <>
      <AnimatedNumber value={price} />€ / titre
    </>
  )
}
