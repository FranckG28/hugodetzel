import * as FiIcons from 'react-icons/fi'
import * as HiIcons from 'react-icons/hi'
import * as SiIcons from 'react-icons/si'

type IconProvider = typeof FiIcons | typeof HiIcons | typeof SiIcons;

function getIconProvider(provider: string): IconProvider {
  switch (provider) {
    case 'fi':
      return FiIcons;
    case 'hi':
      return HiIcons;
    case 'si':
      return SiIcons;
    default:
      return FiIcons;
  }
}

export default function DynamicIcon({
  icon,
  className = '',
  color = 'currentColor',
}: {
  icon: { provider: string; name: string }
  className?: string
  color?: string
}) {
  if (!icon) {
    console.error('No icon provided', icon)
    return null
  }
  const Icon = getIconProvider(icon.provider)[icon.name as keyof IconProvider] as React.ElementType
  if (!Icon) return null
  return <Icon className={className} style={{ color }} />
}
