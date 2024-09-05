import * as FiIcons from 'react-icons/fi'
import * as HiIcons from 'react-icons/hi'
import * as SiIcons from 'react-icons/si'

function getIconProvider(provider: string) {
  switch (provider) {
    case 'fi':
      return FiIcons
    case 'fi':
      return HiIcons
    case 'fi':
      return SiIcons
    default:
      return FiIcons
  }
}

export default function DynamicIcon({
  icon,
  className = '',
  color = 'currentColor',
}: {
  icon: any
  className?: string
  color?: string
}) {
  if (!icon) return null
  const Icon = getIconProvider(icon.provider)[icon.name]
  if (!Icon) return null
  return <Icon className={className} style={{ color }} />
}
