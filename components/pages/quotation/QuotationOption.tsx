import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Checkbox } from 'components/ui/checkbox'
import { cn } from 'lib/utils'
import { FC } from 'react'
import { QuotationOption as QuotationOptionType } from 'types'

export const QuotationOption: FC<{
  option: QuotationOptionType
  checked: boolean
  onChange: (checked: boolean) => void
}> = ({ option, checked, onChange }) => {
  return (
    <label
      htmlFor={option.title}
      className={cn(
        'flex flex-col gap-2 p-4 rounded-xl transition-all shadow relative',
        checked ? 'bg-blue-200/30 ring-1 ring-blue-200/50' : 'bg-slate-800',
        option.included && 'cursor-not-allowed',
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

      <p className="text-lg font-bold leading-none">{option.title}</p>

      <CustomPortableText
        value={option.description}
        className="!text-sm !text-slate-400 !text-left flex-1"
      />

      <p className="text-sm text-slate-300 font-medium leading-none pt-1">
        {option.included ? <>Offert</> : <>{option.price} € / titre</>}
      </p>
    </label>
  )
}
