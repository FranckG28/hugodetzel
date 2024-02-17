import { useWindowScroll } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { Button } from 'components/shared/Button'
import { Container } from 'components/shared/Container'
import { title } from 'lib/demo.data'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  siteTitle?: string
  menuItems?: MenuItem[]
  menuCta?: MenuItem
}

export function Navbar({ menuItems, menuCta, siteTitle }: NavbarProps) {
  const [{ y }] = useWindowScroll()

  const isScrolled = y > 100

  const scrolledStyle = 'bg-slate-950/80 backdrop-blur shadow-xl'

  const ctaHref = menuCta ? resolveHref(menuCta?._type, menuCta?.slug) : null

  console.log(menuCta)

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 right-0 z-20 transition-all duration-500 bg-gradient-to-b from-slate-950/50 to-transparent',
        isScrolled && scrolledStyle,
      )}
    >
      <Container className="flex flex-wrap items-center gap-x-5">
        <Link
          key="home"
          className={`text-xl font-bold text-slate-200 hover:text-white md:text-2xl h-full mr-auto tracking-tight`}
          href={'/'}
        >
          {siteTitle ?? title}
        </Link>
        {menuItems &&
          menuItems.map((menuItem) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={href}
                className={`text-lg hover:text-slate-100 py-5 transition-all ${
                  menuItem?._type === 'home'
                    ? 'font-extrabold text-white'
                    : 'text-slate-300'
                }`}
                href={href}
              >
                {menuItem.title}
              </Link>
            )
          })}
        {ctaHref && (
          <Link href={ctaHref}>
            <Button className="!text-lg" variant="outline">
              {menuCta.title}
            </Button>
          </Link>
        )}
      </Container>
    </div>
  )
}
