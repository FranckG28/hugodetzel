import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { SettingsPayload } from 'types'

const fallbackSettings: SettingsPayload = {
  menuItems: [],
  footer: [],
}

export interface LayoutProps {
  children: React.ReactNode
  settings: SettingsPayload | undefined
  preview?: boolean
}

export default function Layout({
  children,
  settings = fallbackSettings,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar menuItems={settings?.menuItems} siteTitle={settings?.title} />
      <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">{children}</div>
      <Footer footer={settings?.footer} />
    </div>
  )
}
