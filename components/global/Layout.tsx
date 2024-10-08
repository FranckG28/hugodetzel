import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { title } from 'lib/demo.data'
import { SettingsPayload } from 'types'

const fallbackSettings: SettingsPayload = {
  menuItems: [],
  footer: [],
  title: title,
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
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 dark">
      <Navbar menuItems={settings?.menuItems} siteTitle={settings?.title} />
      <div className="flex-1">{children}</div>
      <Footer footer={settings?.footer} siteName={settings.title} />
    </div>
  )
}
