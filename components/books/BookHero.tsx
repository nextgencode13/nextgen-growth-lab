'use client'
import { motion } from 'framer-motion'
import { Star, Clock, BookOpen, Share2, BookmarkPlus, BookOpenCheck, CheckCircle2, Printer } from 'lucide-react'
import Link from 'next/link'
import type { Book } from '@/lib/types'
import BookCover from '@/components/ui/BookCover'
import Badge from '@/components/ui/Badge'
import { useBookmarks } from '@/lib/hooks/useBookmarks'

const difficultyColor: Record<string, string> = {
  Beginner: '#5db872',
  Intermediate: '#e8a55a',
  Advanced: '#c64545',
}

const statusConfig = {
  null: {
    label: 'Add to List',
    Icon: BookmarkPlus,
    color: 'var(--color-on-dark-soft)',
    border: 'var(--color-surface-dark-elevated)',
  },
  want: {
    label: 'Want to Read',
    Icon: BookmarkPlus,
    color: '#f59e0b',
    border: '#f59e0b',
  },
  reading: {
    label: 'Reading',
    Icon: BookOpen,
    color: '#60a5fa',
    border: '#60a5fa',
  },
  finished: {
    label: 'Finished',
    Icon: BookOpenCheck,
    color: '#34d399',
    border: '#34d399',
  },
} as const

export default function BookHero({ book }: { book: Book }) {
  const { cycleStatus, getStatus } = useBookmarks()
  const status = getStatus(book.slug) ?? 'null'
  const config = statusConfig[status as keyof typeof statusConfig]

  function share() {
    if (navigator.share) {
      navigator.share({ title: book.title, text: book.keyInsight, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <section
      className="pt-32 pb-16"
      style={{ backgroundColor: 'var(--color-surface-dark)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
          {/* Cover with 3D flip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <BookCover book={{ ...book, keyInsight: book.keyInsight }} size="xl" flip />
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="coral">{book.category}</Badge>
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'var(--color-surface-dark-elevated)', color: difficultyColor[book.difficulty] }}
              >
                {book.difficulty}
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-[-0.03em] mb-3"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-on-dark)' }}
            >
              {book.title}
            </h1>

            <p className="text-lg mb-2" style={{ color: 'var(--color-on-dark-soft)' }}>
              by <span style={{ color: 'var(--color-on-dark)' }}>{book.author}</span>
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--color-on-dark-soft)' }}>
              Published {book.publishYear}
            </p>

            <div className="flex flex-wrap gap-5 mb-6 text-sm" style={{ color: 'var(--color-on-dark-soft)' }}>
              <span className="flex items-center gap-1.5">
                <Star size={14} style={{ color: 'var(--color-amber)' }} fill="var(--color-amber)" />
                {book.rating} rating
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {book.readTime} read
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} />
                {book.lessons.length} key lessons
              </span>
            </div>

            <p
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: 'var(--color-on-dark-soft)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}
            >
              "{book.keyInsight}"
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {book.tags.map(t => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: 'var(--color-surface-dark-elevated)', color: 'var(--color-on-dark-soft)' }}
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {/* 3-state reading status cycle button */}
              <button
                onClick={() => cycleStatus(book.slug)}
                className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium border transition-all"
                style={{
                  borderColor: config.border,
                  color: config.color,
                  backgroundColor: 'transparent',
                }}
              >
                <config.Icon size={14} />
                {config.label}
              </button>

              <button
                onClick={share}
                className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium border transition-all"
                style={{
                  borderColor: 'var(--color-surface-dark-elevated)',
                  color: 'var(--color-on-dark-soft)',
                  backgroundColor: 'transparent',
                }}
              >
                <Share2 size={14} />
                Share
              </button>

              <Link
                href={`/books/${book.slug}/print`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium border transition-all"
                style={{
                  borderColor: 'var(--color-surface-dark-elevated)',
                  color: 'var(--color-on-dark-soft)',
                  textDecoration: 'none',
                }}
              >
                <Printer size={14} />
                Export PDF
              </Link>

              <Link
                href={`/books/${book.slug}/quiz`}
                className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium border transition-all"
                style={{
                  borderColor: 'var(--color-surface-dark-elevated)',
                  color: 'var(--color-on-dark-soft)',
                  textDecoration: 'none',
                }}
              >
                <CheckCircle2 size={14} />
                Take Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
