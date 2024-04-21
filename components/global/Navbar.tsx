import { useWindowScroll } from '@uidotdev/usehooks'
import { Button } from 'components/shared/Button'
import { Container } from 'components/shared/Container'
import { title } from 'lib/demo.data'
import { cn } from 'lib/utils'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  siteTitle?: string
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems, siteTitle }: NavbarProps) {
  const [{ y }] = useWindowScroll()

  const isScrolled = y > 100

  const scrolledStyle = 'bg-slate-950/80 backdrop-blur'

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-20 transition-all duration-500 bg-gradient-to-b from-slate-950/50 to-transparent',
        isScrolled && scrolledStyle,
      )}
    >
      <Container className="flex flex-wrap items-center gap-x-6 h-16">
        <Link
          key="home"
          className={`text-xl font-bold text-slate-200 hover:text-white md:text-2xl my-auto mr-auto tracking-tight`}
          href={'/'}
        >
          {siteTitle ?? title}
        </Link>
        {menuItems &&
          menuItems.map((menuItem) => {
            if (menuItem.button) {
              return (
                <Link
                  key={menuItem.link}
                  href={menuItem.link}
                  target={menuItem.newTab ? '_blank' : undefined}
                >
                  <Button className="!text-lg !font-medium" variant="outline">
                    {menuItem.title}
                  </Button>
                </Link>
              )
            }

            return (
              <Link
                key={menuItem.link}
                className="text-lg hover:text-slate-100 py-5 transition-all text-slate-300 font-medium tracking-tight"
                href={menuItem.link}
                target={menuItem.newTab ? '_blank' : undefined}
              >
                {menuItem.title}
              </Link>
            )
          })}
      </Container>
    </div>
  )
}
