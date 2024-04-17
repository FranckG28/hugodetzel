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
        className="peer-disabled:cursor-not-allowed cursor-pointer flex flex-col gap-1"
      >
        <p className="text-lg font-bold leading-none">
          {option.title}{' '}
          <span
            className={cn(
              'px-2.5 py-1 rounded-full font-medium tracking-tighter ml-1',
              option.included
                ? 'bg-green-200/10 text-green-300'
                : 'bg-slate-200/10 text-slate-300',
            )}
          >
            {option.included ? <>Inclus</> : <>{option.price} €</>}
          </span>
        </p>
        <CustomPortableText
          value={option.description}
          className="!text-base !text-slate-400"
        />
      </label>
    </div>
  )
}
