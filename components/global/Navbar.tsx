import { useWindowScroll } from '@uidotdev/usehooks'
import { Container } from 'components/shared/Container'
import { Button } from 'components/ui/button'
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

  const scrolledStyle = 'bg-slate-950/90 backdrop-blur'

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled && scrolledStyle,
      )}
    >
      <Container className="flex flex-wrap items-center gap-x-2 h-14">
        <Link
          key="home"
          className={`text-lg font-bold text-slate-200 hover:text-white md:text-xl my-auto mr-auto tracking-tight`}
          href={'/'}
        >
          {siteTitle ?? title}
        </Link>
        {menuItems &&
          menuItems.map((menuItem) => {
            return (
              <Link
                key={menuItem.link}
                href={menuItem.link}
                target={menuItem.newTab ? '_blank' : undefined}
              >
                <Button variant={menuItem.button ? 'outline' : 'ghost'}>
                  {menuItem.title}
                </Button>
              </Link>
            )
          })}
      </Container>
    </div>
  )
}
