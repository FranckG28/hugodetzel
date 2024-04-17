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
    <div className="flex flex-col gap-2">
      <p className="font-medium text-slate-300">{label}</p>
      <p className="font-semibold text-2xl">{valueDisplay(value)}</p>
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
