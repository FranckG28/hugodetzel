import classNames from 'classnames'

export const Button = ({
  children,
  onClick,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'primary' | 'outline'
  className?: string
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'px-6 py-2.5 rounded-full font-sans text-xl tracking-tight transition hover:ring-2 focus:ring-2',
        variant === 'default' &&
          'bg-slate-200/20 backdrop-blur font-medium hover:ring-slate-100 focus:ring-slate-100 text-slate-100 hover:bg-slate-400/20 focus:bg-slate-400/20',
        variant === 'primary' &&
          'bg-blue-600 shadow-xl font-bold shadow-blue-500/30 text-slate-100 hover:bg-blue-700 focus:bg-blue-700 hover:ring-slate-100 active:ring-slate-100 hover:shadow-blue-500/40 focus:shadow-blue-500/40',
        variant === 'outline' &&
          'bg-transparent ring-1 ring-slate-200/50 hover:ring-slate-100 focus:ring-slate-100 text-slate-100 hover:bg-slate-200/20 focus:bg-slate-200/20',
        className,
      )}
    >
      {children}
    </button>
  )
}
