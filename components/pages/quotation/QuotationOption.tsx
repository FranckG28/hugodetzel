import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Badge } from 'components/ui/badge'
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
    <div className="flex gap-4">
      <Checkbox
        id={option.title}
        disabled={option.included}
        value={option.title}
        checked={checked}
        onCheckedChange={onChange}
      />
      <label
        htmlFor={option.title}
        className="peer-disabled:cursor-not-allowed cursor-pointer flex flex-col flex-1 gap-1"
      >
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold leading-none">{option.title} </p>
          <Badge variant={option.included ? 'outline' : 'secondary'}>
            {option.included ? <>Inclus</> : <>{option.price} € / titre</>}
          </Badge>
        </div>

        <CustomPortableText
          value={option.description}
          className="!text-base !text-slate-400"
        />
      </label>
    </div>
  )
}
