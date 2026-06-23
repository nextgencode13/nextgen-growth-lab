interface SpikeMarkIconProps {
  size?: number
  color?: string
  className?: string
}

export default function SpikeMarkIcon({ size = 16, color = 'currentColor', className = '' }: SpikeMarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="8" y1="0" x2="8" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="8" x2="16" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="2.34" y1="2.34" x2="13.66" y2="13.66" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.66" y1="2.34" x2="2.34" y2="13.66" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
