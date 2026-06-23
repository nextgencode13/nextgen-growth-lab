'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Bookmark, Flame, Clock, TrendingUp, Star } from 'lucide-react'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'

function getStreak(): number {
  try {
    const data = localStorage.getItem('nw_streak')
    if (!data) return 1
    const { count, lastDate } = JSON.parse(data)
    const today = new Date().toDateString()
    if (lastDate === today) return count
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    return lastDate === yesterday ? count : 1
  } catch {
    return 1
  }
}

function updateStreak() {
  const today = new Date().toDateString()
  try {
    const data = localStorage.getItem('nw_streak')
    if (data) {
      const { count, lastDate } = JSON.parse(data)
      if (lastDate === today) return
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const newCount = lastDate === yesterday ? count + 1 : 1
      localStorage.setItem('nw_streak', JSON.stringify({ count: newCount, lastDate: today }))
    } else {
      localStorage.setItem('nw_streak', JSON.stringify({ count: 1, lastDate: today }))
    }
  } catch {}
}

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [streak, setStreak] = useState(1)
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])

  useEffect(() => {
    const bm = localStorage.getItem('nw_bookmarks')
    if (bm) setBookmarks(JSON.parse(bm))
    updateStreak()
    setStreak(getStreak())
    const rv = localStorage.getItem('nw_recent')
    if (rv) setRecentlyViewed(JSON.parse(rv).slice(0, 4))
  }, [])

  const bookmarkedBooks = bookmarks
    .map(s => books.find(b => b.slug === s))
    .filter(Boolean) as typeof books

  const recentBooks = recentlyViewed
    .map(s => books.find(b => b.slug === s))
    .filter(Boolean) as typeof books

  const statCards = [
    { icon: <BookOpen size={20} />, label: 'Books Read', value: bookmarks.length || 0, color: 'var(--color-coral)' },
    { icon: <Flame size={20} />, label: 'Day Streak', value: streak, color: 'var(--color-amber)' },
    { icon: <Clock size={20} />, label: 'Hours Saved', value: `${bookmarks.length * 8}h`, color: 'var(--color-teal)' },
    { icon: <Star size={20} />, label: 'Bookmarked', value: bookmarks.length, color: '#8b5cf6' },
  ]

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
          <p style={{ color: 'var(--color-muted)' }}>Track your learning journey</p>
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
              <p className="text-xs" style={{ color: 'var(--color-muted-soft)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Streak card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-[12px] p-6 mb-10 flex items-center gap-5"
          style={{ backgroundColor: 'var(--color-surface-dark)' }}
        >
          <div className="text-5xl">🔥</div>
          <div>
            <p
              className="text-2xl font-normal mb-1"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-on-dark)' }}
            >
              {streak}-day streak
            </p>
            <p className="text-sm" style={{ color: 'var(--color-on-dark-soft)' }}>
              Keep reading to maintain your streak!
            </p>
          </div>
          <div className="ml-auto">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium"
              style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
            >
              Read Now
            </Link>
          </div>
        </motion.div>

        {/* Bookmarked books */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Bookmark size={18} style={{ color: 'var(--color-coral)' }} />
            <h2
              className="text-2xl font-normal"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              Bookmarked
            </h2>
          </div>

          {bookmarkedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {bookmarkedBooks.map((book, i) => (
                <motion.div
                  key={book.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <Link
                    href={`/books/${book.slug}`}
                    className="flex gap-3 p-3 rounded-[12px] border hover:shadow-md transition-all"
                    style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)' }}
                  >
                    <BookCover book={book} size="sm" />
                    <div>
                      <h3
                        className="text-sm font-normal leading-tight mb-1"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                      >
                        {book.title}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--color-muted-soft)' }}>{book.author}</p>
                      <span className="text-xs mt-2 block" style={{ color: 'var(--color-coral)' }}>Read →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-14 rounded-[12px] border"
              style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted-soft)' }}
            >
              <Bookmark size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm mb-3">No bookmarks yet</p>
              <Link href="/search" className="text-sm font-medium" style={{ color: 'var(--color-coral)' }}>
                Explore books →
              </Link>
            </div>
          )}
        </section>

        {/* Learning stats section */}
        <section className="rounded-[12px] p-6" style={{ backgroundColor: 'var(--color-surface-card)' }}>
          <h2
            className="text-2xl font-normal mb-6"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Learning Analytics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted-soft)' }}>Categories Explored</p>
              {['Productivity', 'Wealth', 'Psychology'].map(cat => {
                const count = bookmarkedBooks.filter(b => b.category === cat).length
                const pct = bookmarkedBooks.length ? (count / bookmarkedBooks.length) * 100 : 0
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
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted-soft)' }}>Reading Pace</p>
              <p className="text-3xl font-normal" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                {bookmarks.length > 0 ? `${Math.round(bookmarks.length / Math.max(streak, 1) * 7)}/week` : '0/week'}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted-soft)' }}>avg. books per week</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted-soft)' }}>Next Goal</p>
              <p
                className="text-base font-normal leading-snug"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                Read {Math.max(5 - bookmarks.length, 1)} more books to unlock the "Knowledge Seeker" badge
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
