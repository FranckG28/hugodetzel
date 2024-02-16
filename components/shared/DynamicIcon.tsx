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
}: {
  icon: any
  className?: string
}) {
  const Icon = getIconProvider(icon.provider)[icon.name]
  return <Icon className={className} />
}
