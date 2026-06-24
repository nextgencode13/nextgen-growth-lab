'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { TrendingUp, Flame } from 'lucide-react'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'

// Manually curated trending picks — rotated weekly
const TRENDING_SLUGS = [
  { slug: 'atomic-habits', reason: 'Most read this week', rank: 1 },
  { slug: 'thinking-fast-and-slow', reason: 'Trending in Psychology', rank: 2 },
  { slug: 'never-split-the-difference', reason: 'Rising in Leadership', rank: 3 },
]

export default function TrendingBooks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const trendingBooks = TRENDING_SLUGS
    .map(({ slug, reason, rank }) => {
      const book = books.find(b => b.slug === slug)
      return book ? { book, reason, rank } : null
    })
    .filter(Boolean) as { book: typeof books[0]; reason: string; rank: number }[]

  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-surface-card)' }}
          >
            <Flame size={16} style={{ color: 'var(--color-coral)' }} />
          </div>
          <div>
            <h2
              className="text-3xl md:text-4xl font-normal tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              Currently Trending
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted-soft)' }}>
              What the community is reading this week
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {trendingBooks.map(({ book, reason, rank }, i) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/books/${book.slug}`}
                className="flex gap-4 p-5 rounded-[12px] border transition-all group block"
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderColor: 'var(--color-hairline)',
                  textDecoration: 'none',
                }}
              >
                <div className="relative flex-shrink-0">
                  <BookCover book={book} size="md" />
                  <span
                    className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: rank === 1 ? '#f97316' : rank === 2 ? '#64748b' : '#92400e' }}
                  >
                    #{rank}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp size={12} style={{ color: 'var(--color-coral)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--color-coral)' }}>
                      {reason}
                    </span>
                  </div>
                  <h3
                    className="font-medium leading-snug mb-1 group-hover:text-coral transition-colors"
                    style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-serif)', fontSize: '15px' }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: 'var(--color-muted-soft)' }}>
                    {book.author}
                  </p>
                  <p
                    className="text-xs leading-relaxed line-clamp-2"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {book.keyInsight}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
