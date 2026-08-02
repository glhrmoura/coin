import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  title?: string
  variant?: 'primary' | 'ghost' | 'icon'
  children?: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

const variantClassName = {
  icon: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-grey-darker text-grey-light transition hover:border-yellow-medium/40 hover:text-yellow-medium',
  primary:
    'h-11 w-full justify-center gap-2 rounded-2xl bg-yellow-medium px-4 text-sm font-semibold text-black transition hover:bg-yellow-soft disabled:cursor-not-allowed disabled:bg-grey-border disabled:text-grey-medium',
  ghost:
    'h-11 w-auto justify-center gap-2 rounded-2xl border border-white/10 bg-transparent px-4 text-sm font-semibold text-white transition hover:bg-white/5',
}

const Button = ({
  title,
  variant = 'primary',
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center border-none outline-none ${variantClassName[variant]} ${className}`}
      {...props}
    >
      {children ?? (title ? <span>{title}</span> : null)}
    </button>
  )
}

export default Button
