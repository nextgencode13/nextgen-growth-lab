'use client'
import { useState } from 'react'
import type { Book } from '@/lib/types'

interface BookCoverProps {
  book: Pick<Book, 'title' | 'author' | 'coverGradient'> & { keyInsight?: string }
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  flip?: boolean
}

const sizes = {
  sm: 'w-16 h-24',
  md: 'w-24 h-36',
  lg: 'w-36 h-52',
  xl: 'w-48 h-72',
}

export default function BookCover({ book, size = 'md', className = '', flip = false }: BookCoverProps) {
  const [flipped, setFlipped] = useState(false)

  if (!flip) {
    return (
      <div
        className={`relative rounded-[8px] overflow-hidden shadow-lg flex-shrink-0 bg-gradient-to-br ${book.coverGradient} ${sizes[size]} ${className}`}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />
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
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10" />
        <div className="absolute top-6 right-1 w-5 h-5 rounded-full bg-white/10" />
      </div>
    )
  }

  return (
    <div
      className={`${sizes[size]} ${className} flex-shrink-0`}
      style={{ perspective: '1000px', cursor: 'pointer' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Inner wrapper that rotates */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 rounded-[8px] overflow-hidden shadow-lg bg-gradient-to-br ${book.coverGradient}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-2">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p
              className="relative text-white font-semibold leading-tight z-10"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: size === 'xl' ? '15px' : size === 'lg' ? '13px' : '11px',
              }}
            >
              {book.title}
            </p>
            <p className="relative text-white/70 z-10 mt-0.5" style={{ fontSize: '11px' }}>
              {book.author}
            </p>
          </div>
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10" />
          <div className="absolute top-6 right-1 w-5 h-5 rounded-full bg-white/10" />
        </div>

        {/* Back face */}
        <div
          className={`absolute inset-0 rounded-[8px] overflow-hidden shadow-lg bg-gradient-to-br ${book.coverGradient} flex flex-col items-center justify-center p-3`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <p
            className="relative z-10 text-white text-center italic leading-snug"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: size === 'xl' ? '12px' : '10px',
            }}
          >
            "{book.keyInsight ?? book.title}"
          </p>
          <p className="relative z-10 text-white/60 text-center mt-2" style={{ fontSize: '9px' }}>
            — {book.author}
          </p>
        </div>
      </div>
    </div>
  )
}
