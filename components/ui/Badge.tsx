interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'coral' | 'teal' | 'amber'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

  const styles: Record<string, React.CSSProperties> = {
    default: { backgroundColor: 'var(--color-surface-card)', color: 'var(--color-ink)' },
    coral:   { backgroundColor: 'var(--color-coral)',       color: '#fff' },
    teal:    { backgroundColor: 'var(--color-teal)',        color: '#fff' },
    amber:   { backgroundColor: 'var(--color-amber)',       color: '#fff' },
  }

  return (
    <span className={`${base} ${className}`} style={styles[variant]}>
      {children}
    </span>
  )
}
