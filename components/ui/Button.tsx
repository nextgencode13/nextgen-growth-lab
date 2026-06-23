import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-50'

    const variants = {
      primary: 'text-white rounded-[8px]',
      secondary: 'rounded-[8px] border',
      ghost: 'rounded-[8px]',
      outline: 'rounded-[8px] border',
    }

    const sizes = {
      sm:  'text-xs px-3 py-1.5 h-8',
      md:  'text-sm px-5 py-2.5 h-10',
      lg:  'text-sm px-7 py-3 h-12',
    }

    const styles: Record<string, React.CSSProperties> = {
      primary:  { backgroundColor: 'var(--color-coral)', color: 'var(--color-on-primary)' },
      secondary:{ backgroundColor: 'var(--color-canvas)', color: 'var(--color-ink)', borderColor: 'var(--color-hairline)' },
      ghost:    { backgroundColor: 'transparent', color: 'var(--color-ink)' },
      outline:  { backgroundColor: 'transparent', color: 'var(--color-coral)', borderColor: 'var(--color-coral)' },
    }

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        style={styles[variant]}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
