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
        'flex flex-col gap-2 p-4 rounded-xl transition-all shadow relative ring-1',
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
        {option.included ? <>Offert</> : <>{option.price} € / titre</>}
      </p>
    </label>
  )
}
