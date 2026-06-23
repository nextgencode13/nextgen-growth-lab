import type { Book } from '@/lib/types'

interface BookCoverProps {
  book: Pick<Book, 'title' | 'author' | 'coverGradient'>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: 'w-16 h-24',
  md: 'w-24 h-36',
  lg: 'w-36 h-52',
  xl: 'w-48 h-72',
}

export default function BookCover({ book, size = 'md', className = '' }: BookCoverProps) {
  return (
    <div
      className={`relative rounded-[8px] overflow-hidden shadow-lg flex-shrink-0 bg-gradient-to-br ${book.coverGradient} ${sizes[size]} ${className}`}
    >
      {/* spine highlight */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col justify-end p-2">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <p
          className="relative text-white font-semibold leading-tight z-10"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size === 'sm' ? '9px' : size === 'md' ? '11px' : size === 'lg' ? '13px' : '15px',
          }}
        >
          {book.title}
        </p>
        <p
          className="relative text-white/70 z-10 mt-0.5"
          style={{ fontSize: size === 'sm' ? '7px' : size === 'md' ? '9px' : '11px' }}
        >
          {book.author}
        </p>
      </div>

      {/* decorative circles */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10" />
      <div className="absolute top-6 right-1 w-5 h-5 rounded-full bg-white/10" />
    </div>
  )
}
