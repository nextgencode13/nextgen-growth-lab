'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { books } from '@/lib/data/books'

export default function BookShelf() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-12" style={{ backgroundColor: 'var(--color-surface-card)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <p
          className="text-xs font-medium uppercase tracking-widest mb-6 text-center"
          style={{ color: 'var(--color-muted)' }}
        >
          The Full Library
        </p>

        <div className="flex items-end gap-1 overflow-x-auto pb-4" style={{ minHeight: '160px' }}>
          {books.map(book => (
            <div key={book.slug} className="relative flex-shrink-0">
              <motion.div
                onMouseEnter={() => setHovered(book.slug)}
                onMouseLeave={() => setHovered(null)}
                animate={{ y: hovered === book.slug ? -16 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="cursor-pointer rounded-sm"
                style={{
                  width: '28px',
                  height: '120px',
                  background: `linear-gradient(to bottom, var(--tw-gradient-from, #888), var(--tw-gradient-to, #555))`,
                  backgroundImage: `linear-gradient(to bottom, ${getSpineColors(book.coverGradient)})`,
                  boxShadow: hovered === book.slug ? '2px 4px 16px rgba(0,0,0,0.3)' : '1px 2px 4px rgba(0,0,0,0.15)',
                }}
              />

              <AnimatePresence>
                {hovered === book.slug && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-3 left-1/2 z-50 w-40 rounded-[8px] p-3 shadow-xl pointer-events-none"
                    style={{
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--color-canvas)',
                      border: '1px solid var(--color-hairline)',
                    }}
                  >
                    <p
                      className="text-xs font-medium leading-tight mb-1 line-clamp-2"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                    >
                      {book.title}
                    </p>
                    <p className="text-xs mb-2" style={{ color: 'var(--color-muted)' }}>{book.author}</p>
                    <Link
                      href={`/books/${book.slug}`}
                      className="text-xs font-medium pointer-events-auto"
                      style={{ color: 'var(--color-coral)' }}
                    >
                      Read →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Shelf plank */}
        <div
          className="h-3 rounded-sm mt-0"
          style={{ backgroundColor: 'var(--color-hairline)' }}
        />
      </div>
    </section>
  )
}

function getSpineColors(gradient: string): string {
  if (gradient.includes('orange') || gradient.includes('amber')) return '#f97316, #d97706'
  if (gradient.includes('blue') || gradient.includes('sky')) return '#3b82f6, #1d4ed8'
  if (gradient.includes('green') || gradient.includes('emerald')) return '#10b981, #047857'
  if (gradient.includes('violet') || gradient.includes('purple')) return '#8b5cf6, #6d28d9'
  if (gradient.includes('rose') || gradient.includes('pink')) return '#f43f5e, #be123c'
  if (gradient.includes('red')) return '#ef4444, #b91c1c'
  if (gradient.includes('indigo')) return '#6366f1, #4338ca'
  if (gradient.includes('teal') || gradient.includes('cyan')) return '#14b8a6, #0f766e'
  if (gradient.includes('slate') || gradient.includes('gray')) return '#64748b, #334155'
  return '#78716c, #44403c'
}
