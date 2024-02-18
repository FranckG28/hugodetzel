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
    <section
      className={classNames(
        'grid gap-8 lg:gap-16 py-10 items-center',
        images?.length ? 'lg:grid-cols-2' : 'justify-center',
      )}
    >
      <ImageStack
        images={images}
        className={classNames(
          alignment === 'right' ? 'order-last' : 'order-first',
        )}
      />

      <div
        className={classNames(
          'flex flex-col gap-5 py-6',
          !images?.length && 'text-center',
        )}
      >
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
