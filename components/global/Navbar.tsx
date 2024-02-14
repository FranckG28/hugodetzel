import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems }: NavbarProps) {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-slate-950/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      <Link
        key="home"
        className={`text-lg font-extrabold text-slate-200 hover:text-white md:text-xl`}
        href={'/'}
      >
        {'Accueil'}
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
              className={`text-lg hover:text-slate-100 md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-white'
                  : 'text-slate-200'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
    </div>
  )
}
