import classNames from 'classnames'
import Link from 'next/link'
import { Section } from 'types'

import { Button } from './Button'
import { Container } from './Container'
import { CustomPortableText } from './CustomPortableText'
import DynamicIcon from './DynamicIcon'
import { ImageStack } from './ImageStack'

export const SectionItem = ({
  section,
  thumbnail = false,
}: {
  section: Section
  thumbnail?: boolean
}) => {
  const {
    title,
    icon,
    images,
    subtitle,
    content,
    cta,
    alignment = 'left',
    color,
    background = 'none',
  } = section

  const hex = color?.value

  return (
    <section
      className={classNames(
        background === 'primary' && 'bg-blue-800 border-blue-700/50',
        background === 'secondary' && 'bg-slate-900 border-t border-slate-800',
        background !== 'none' && 'shadow border-t my-8',
      )}
    >
      <Container
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
          thumbnail={thumbnail}
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
      </Container>
    </section>
  )
}
