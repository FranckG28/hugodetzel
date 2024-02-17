import classNames from 'classnames'
import Link from 'next/link'
import { Section } from 'types'

import { Button } from './Button'
import { CustomPortableText } from './CustomPortableText'
import DynamicIcon from './DynamicIcon'
import { ImageStack } from './ImageStack'

export const SectionItem = ({ section }: { section: Section }) => {
  const { title, icon, images, subtitle, content, cta, alignment, color } =
    section

  const hex = color?.value

  return (
    <section className="grid lg:grid-cols-2 gap-8 lg:gap-16 py-10 items-center">
      <ImageStack
        images={images}
        className={classNames(
          alignment === 'right' ? 'order-last' : 'order-first',
        )}
      />

      <div className="flex flex-col gap-5 py-6">
        {icon && <DynamicIcon icon={icon} className="text-2xl" color={hex} />}

        {subtitle && <h5 style={{ color: hex }}>{subtitle}</h5>}

        <h2 className="leading-1">{title}</h2>

        <CustomPortableText value={content} className="text-balance" />

        {cta && (
          <Link href={cta.href}>
            <Button>{cta.title}</Button>
          </Link>
        )}
      </div>
    </section>
  )
}
