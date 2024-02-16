import classNames from 'classnames'

export const Button = ({
  children,
  onClick,
  variant = 'default',
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'primary'
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
          'bg-blue-500 shadow-xl font-bold shadow-blue-500/50 text-slate-100 hover:bg-blue-600 focus:bg-blue-600 hover:ring-slate-100 active:ring-slate-100',
      )}
    >
      {children}
    </button>
  )
}
