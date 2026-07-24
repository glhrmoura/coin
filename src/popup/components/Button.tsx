import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  title?: string
  variant?: 'primary' | 'ghost' | 'icon'
  children?: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

const variantClassName = {
  primary:
    'h-11 w-full justify-center gap-2 rounded-xl bg-yellow-medium px-4 text-sm font-semibold text-black transition hover:bg-yellow-soft disabled:cursor-not-allowed disabled:bg-grey-border disabled:text-grey-medium',
  ghost:
    'h-11 w-auto justify-center gap-2 rounded-xl border border-grey-border bg-transparent px-4 text-sm font-semibold text-white transition hover:bg-white/5',
  icon: 'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-grey-border bg-grey-dark text-grey-light transition hover:border-yellow-medium/50 hover:bg-grey-border hover:text-yellow-medium',
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
