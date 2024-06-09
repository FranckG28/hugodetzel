import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { FC } from 'react'
import { Reference } from 'types'

import { ReferencePlayer } from './ReferencePlayer'

type Props = {
  reference: Reference
}

const imageSize = 64

export const ReferenceItem: FC<Props> = ({ reference }) => {
  return (
    <div className="rounded-2xl shadow-lg border border-slate-200 p-6 bg-white flex flex-col gap-5">
      {reference.picture && (
        <Image
          src={urlForImage(reference.picture)
            .width(imageSize)
            .height(imageSize)
            .url()}
          alt={reference.name}
          width={imageSize}
          height={imageSize}
          className="rounded-md shadow aspect-square shrink-0"
        />
      )}
      <div className="flex flex-col gap-1">
        <p className="text-slate-500 text-sm uppercase font-medium">
          {reference.category.name}
        </p>
        <h5 className="text-slate-900">{reference.name}</h5>
      </div>
      {reference.description && (
        <p className="text-slate-600 text-sm">{reference.description}</p>
      )}

      <ReferencePlayer reference={reference} />
    </div>
  )
}
