import { MenuIcon } from '@sanity/icons'
import { Button } from 'components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from 'components/ui/drawer'
import Link from 'next/link'
import { FC } from 'react'
import { MenuItem } from 'types'

type Props = {
  items: MenuItem[]
}

export const MobileNav: FC<Props> = ({ items }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon width={24} height={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 flex flex-col gap-1">
        <MobileNavItem item={{ title: 'Accueil', link: '/' }} />
        {items.map((menuItem) => {
          return <MobileNavItem key={menuItem.link} item={menuItem} />
        })}
      </DrawerContent>
    </Drawer>
  )
}

const MobileNavItem: FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <Link
      key={item.link}
      href={item.link}
      target={item.newTab ? '_blank' : undefined}
    >
      <Button
        variant={item.button ? 'outline' : 'ghost'}
        className="w-full text-left justify-start"
      >
        {item.title}
      </Button>
    </Link>
  )
}
