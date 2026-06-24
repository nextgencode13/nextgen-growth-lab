'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Bookmark, Flame, CheckCircle, Quote, Copy, Trash2 } from 'lucide-react'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'
import StreakCalendar from '@/components/StreakCalendar'
import { useBookmarks } from '@/lib/hooks/useBookmarks'
import { useSavedQuotes } from '@/lib/hooks/useSavedQuotes'
import { useReadingActivity } from '@/lib/hooks/useReadingActivity'

function BookGrid({ slugs, emptyMsg }: { slugs: string[]; emptyMsg: string }) {
  const bookList = slugs.map(s => books.find(b => b.slug === s)).filter(Boolean) as typeof books

  if (bookList.length === 0) {
    return (
      <div
        className="text-center py-10 rounded-[12px] border"
        style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted)' }}
      >
        <p className="text-sm">{emptyMsg}</p>
        <Link href="/search" className="text-sm font-medium mt-2 inline-block" style={{ color: 'var(--color-coral)' }}>
          Explore books →
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {bookList.map((book, i) => (
        <motion.div
          key={book.slug}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Link
            href={`/books/${book.slug}`}
            className="flex gap-3 p-3 rounded-[12px] border hover:shadow-md transition-all"
            style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)' }}
          >
            <BookCover book={book} size="sm" />
            <div className="min-w-0">
              <h3
                className="text-sm font-normal leading-tight mb-1 line-clamp-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                {book.title}
              </h3>
              <p className="text-xs truncate" style={{ color: 'var(--color-muted)' }}>{book.author}</p>
              <span className="text-xs mt-2 block" style={{ color: 'var(--color-coral)' }}>Read →</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span style={{ color: 'var(--color-coral)' }}>{icon}</span>
      <h2
        className="text-2xl font-normal"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        {title}
      </h2>
    </div>
  )
}

export default function DashboardPage() {
  const { wantToRead, currentlyReading, finished, bookmarks } = useBookmarks()
  const { quotes, removeQuote } = useSavedQuotes()
  const { currentStreak, longestStreak } = useReadingActivity()
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const statCards = [
    {
      icon: <CheckCircle size={20} />,
      label: 'Books Finished',
      value: finished.length,
      color: 'var(--color-coral)',
    },
    {
      icon: <BookOpen size={20} />,
      label: 'Reading Now',
      value: currentlyReading.length,
      color: '#10b981',
    },
    {
      icon: <Flame size={20} />,
      label: 'Day Streak',
      value: currentStreak || 1,
      color: '#f97316',
    },
    {
      icon: <Bookmark size={20} />,
      label: 'Want to Read',
      value: wantToRead.length,
      color: '#8b5cf6',
    },
  ]

  function copyQuote(text: string, idx: number) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Your Dashboard
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>Track your reading journey</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-[12px] p-5 border"
              style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>
              <p
                className="text-2xl font-normal mb-0.5"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                {s.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Streak Calendar */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-[12px] p-6 mb-10 border"
          style={{ backgroundColor: 'var(--color-surface-card)', borderColor: 'var(--color-hairline)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <SectionHeader icon={<Flame size={18} />} title="Reading Activity" />
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>Best: {longestStreak} days</span>
          </div>
          <StreakCalendar />
        </motion.section>

        {/* Currently Reading */}
        <section className="mb-10">
          <SectionHeader icon={<BookOpen size={18} />} title="Currently Reading" />
          <BookGrid slugs={currentlyReading} emptyMsg="Not reading anything yet." />
        </section>

        {/* Want to Read */}
        <section className="mb-10">
          <SectionHeader icon={<Bookmark size={18} />} title="Want to Read" />
          <BookGrid slugs={wantToRead} emptyMsg="No books queued up yet." />
        </section>

        {/* Finished */}
        <section className="mb-10">
          <SectionHeader icon={<CheckCircle size={18} />} title="Finished" />
          <BookGrid slugs={finished} emptyMsg="No finished books yet — start reading!" />
        </section>

        {/* Saved Quotes */}
        {quotes.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <SectionHeader icon={<Quote size={18} />} title="My Saved Quotes" />
            <div className="grid gap-4 md:grid-cols-2">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  className="rounded-[12px] p-5 border relative group"
                  style={{
                    backgroundColor: 'var(--color-surface-card)',
                    borderColor: 'var(--color-hairline)',
                  }}
                >
                  <p
                    className="text-base leading-relaxed mb-3 italic"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                  >
                    &ldquo;{q.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/books/${q.bookSlug}`}
                      className="text-xs font-medium"
                      style={{ color: 'var(--color-coral)' }}
                    >
                      {q.bookTitle}
                    </Link>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyQuote(q.text, i)}
                        className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-muted)' }}
                        title="Copy quote"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => removeQuote(q.text, q.bookSlug)}
                        className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-muted)' }}
                        title="Remove quote"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {copiedIdx === i && (
                    <div
                      className="absolute top-3 right-3 text-xs px-2 py-1 rounded-md"
                      style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
                    >
                      Copied!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Learning Analytics */}
        <section className="rounded-[12px] p-6" style={{ backgroundColor: 'var(--color-surface-card)' }}>
          <h2
            className="text-2xl font-normal mb-6"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Learning Analytics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted)' }}>
                Categories Explored
              </p>
              {['Productivity', 'Wealth', 'Psychology'].map(cat => {
                const allBooks = bookmarks.map(s => books.find(b => b.slug === s)).filter(Boolean) as typeof books
                const count = allBooks.filter(b => b.category === cat).length
                const pct = allBooks.length ? (count / allBooks.length) * 100 : 0
                return (
                  <div key={cat} className="mb-3">
                    <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-body)' }}>
                      <span>{cat}</span>
                      <span>{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-hairline)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: 'var(--color-coral)' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted)' }}>
                Reading Pace
              </p>
              <p className="text-3xl font-normal" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                {finished.length > 0
                  ? `${Math.round(finished.length / Math.max(currentStreak, 1) * 7)}/week`
                  : '0/week'}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>avg. books per week</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted)' }}>
                Next Goal
              </p>
              <p
                className="text-base font-normal leading-snug"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                Read {Math.max(5 - finished.length, 1)} more book{Math.max(5 - finished.length, 1) !== 1 ? 's' : ''} to unlock the &ldquo;Knowledge Seeker&rdquo; badge
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
