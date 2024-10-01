import { Slider } from 'components/ui/slider'
import { Dispatch, FC, SetStateAction } from 'react'

export const QuotationSlider: FC<{
  label: string
  value: number
  valueDisplay: (value: number) => string
  onChange: Dispatch<SetStateAction<number>>
  min?: number
  max?: number
}> = ({ valueDisplay, label, value, onChange, min = 0, max = 10 }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex lg:items-center justify-between gap-2 max-lg:flex-col select-none">
        <p className="font-medium ">{label}</p>
        <h6 className="font-semibold text-xl">{valueDisplay(value)}</h6>
      </div>
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
        step={1}
      />
    </div>
  )
}
