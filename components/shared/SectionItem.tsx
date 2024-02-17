import classNames from 'classnames'
import Link from 'next/link'
import { Section } from 'types'

import { Button } from './Button'
import { CustomPortableText } from './CustomPortableText'
import DynamicIcon from './DynamicIcon'

export const SectionItem = ({ section }: { section: Section }) => {
  const { title, icon, images, subtitle, content, cta, alignment } = section

  return (
    <section className="grid lg:grid-cols-2 gap-6 py-12">
      <div
        className={classNames(
          alignment === 'right' ? 'order-last' : 'order-first',
          'flex items-center justify-center',
        )}
      >
        <div className="h-40 aspect-video bg-slate-700 rounded-xl"></div>
      </div>

      <div className="flex flex-col gap-4">
        {icon && <DynamicIcon icon={icon} className="text-2xl mb-3" />}

        {subtitle && <h6>{subtitle}</h6>}

        <h2 className="leading-1">{title}</h2>

        <CustomPortableText value={content} />

        {cta && (
          <Link href={cta.href}>
            <Button variant="primary">{cta.title}</Button>
          </Link>
        )}
      </div>
    </section>
  )
}
