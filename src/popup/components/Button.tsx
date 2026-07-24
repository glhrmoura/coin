import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  title?: string
  type?: 'primary' | 'ghost'
  children?: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

const typeClassName = {
  primary:
    'bg-yellow-medium text-black disabled:bg-grey-darker disabled:cursor-default disabled:text-grey-medium',
  ghost: 'bg-transparent w-auto p-0 text-white',
}

const Button = ({
  title,
  type = 'primary',
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`p-3 border-none w-[100px] rounded text-[10px] uppercase font-bold cursor-pointer transition-colors active:opacity-90 ${typeClassName[type]} ${className}`}
      {...props}
    >
      {children ?? (title ? <span>{title}</span> : null)}
    </button>
  )
}

export default Button
