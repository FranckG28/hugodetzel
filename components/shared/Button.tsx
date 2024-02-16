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
        'px-6 py-2.5 rounded-full font-sans text-xl font-medium tracking-tight border-2 transition',
        variant === 'default' &&
          'bg-slate-600/20 backdrop-blur border-slate-600 hover:border-slate-100 active:border-slate-100 text-slate-100 hover:bg-slate-900 focus:bg-slate-900',
        variant === 'primary' &&
          'bg-blue-500 shadow-xl shadow-blue-500/50 text-slate-100 hover:bg-blue-600 focus:bg-blue-600 border-blue-500 hover:border-slate-100 active:border-slate-100',
      )}
    >
      {children}
    </button>
  )
}
