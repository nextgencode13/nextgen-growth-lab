'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import type { ReadingPath } from '@/lib/types'
import { books } from '@/lib/data/books'
import { useBookmarks } from '@/lib/hooks/useBookmarks'

interface Props {
  path: ReadingPath
  index: number
}

export default function ReadingPathCard({ path, index }: Props) {
  const { getStatus } = useBookmarks()

  const pathBooks = path.books
    .map(pb => books.find(b => b.slug === pb.slug))
    .filter(Boolean) as typeof books

  const readCount = pathBooks.filter(b => getStatus(b.slug) === 'finished').length
  const progress = Math.round((readCount / pathBooks.length) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-[16px] border overflow-hidden"
      style={{ borderColor: 'var(--color-hairline)', backgroundColor: 'var(--color-canvas)' }}
    >
      {/* Gradient strip */}
      <div className={`h-2 bg-gradient-to-r ${path.gradient}`} />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-3xl">{path.emoji}</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-muted)' }}
          >
            {readCount}/{pathBooks.length} complete
          </span>
        </div>

        <h3
          className="text-xl font-normal leading-tight mb-1"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
        >
          {path.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
          {path.tagline}
        </p>

        {/* Progress bar */}
        {readCount > 0 && (
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mb-4"
            style={{ backgroundColor: 'var(--color-hairline)' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: path.accent }}
            />
          </div>
        )}

        {/* Book list */}
        <ol className="space-y-2 mb-5">
          {path.books.map((pb, i) => {
            const book = books.find(b => b.slug === pb.slug)
            const status = getStatus(pb.slug)
            return (
              <li key={pb.slug} className="flex items-start gap-2.5">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                  style={{
                    backgroundColor: status === 'finished' ? path.accent + '30' : 'var(--color-hairline)',
                    color: status === 'finished' ? path.accent : 'var(--color-muted-soft)',
                  }}
                >
                  {status === 'finished' ? '✓' : i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug" style={{ color: 'var(--color-ink)' }}>
                    {book?.title ?? pb.slug}
                  </p>
                  {pb.note && (
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted-soft)' }}>
                      {pb.note}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted-soft)' }}>
            <Clock size={12} />
            {path.estimatedTime}
          </div>
          <Link
            href={`/books/${path.books[0].slug}`}
            className="flex items-center gap-1.5 text-sm font-medium transition-all"
            style={{ color: path.accent, textDecoration: 'none' }}
          >
            {readCount === 0 ? 'Start Track' : readCount === pathBooks.length ? 'Review' : 'Continue'}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
