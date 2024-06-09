import { WaveformPlayer } from 'components/shared/WaveformPlayer'
import { Label } from 'components/ui/label'
import { Switch } from 'components/ui/switch'
import { FC, useState } from 'react'
import { Reference } from 'types'

type Props = {
  reference: Reference
}

export const ReferencePlayer: FC<Props> = ({ reference }) => {
  const [isMixed, setIsMixed] = useState(true)

  return (
    <>
      {reference.unmixedAudio && (
        <div className="flex items-center justify-end gap-3">
          <Label htmlFor="isMixed" className="text-slate-600">
            {isMixed ? 'Après mixage' : 'Avant mixage'}
          </Label>
          <Switch
            name="isMixed"
            checked={isMixed}
            onCheckedChange={setIsMixed}
          />
        </div>
      )}
      <WaveformPlayer
        audio={isMixed ? reference.mixedAudio : reference.unmixedAudio}
      />
    </>
  )
}
