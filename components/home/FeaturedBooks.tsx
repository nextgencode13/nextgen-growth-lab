'use client'
import Link from 'next/link'
import { useInView, motion } from 'framer-motion'
import { useRef } from 'react'
import { books } from '@/lib/data/books'
import BookCard from '@/components/books/BookCard'

const featured = [books[0], books[3], books[1], books[5], books[8], books[11]]

export default function FeaturedBooks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: 'var(--color-surface-card)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2
              className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              Essential Reading
            </h2>
            <p className="text-base" style={{ color: 'var(--color-muted)' }}>
              The most transformative books, beautifully summarized
            </p>
          </div>
          <Link
            href="/search"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: 'var(--color-coral)' }}
          >
            View all books →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
