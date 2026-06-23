'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'
import { Star, Clock, BookOpen, Check, X } from 'lucide-react'

const suggestions = [
  ['atomic-habits', 'deep-work'],
  ['rich-dad-poor-dad', 'the-psychology-of-money'],
  ['zero-to-one', 'the-lean-startup'],
  ['essentialism', 'rework'],
]

export default function ComparePage() {
  const [slugA, setSlugA] = useState<string>('')
  const [slugB, setSlugB] = useState<string>('')

  const bookA = books.find(b => b.slug === slugA)
  const bookB = books.find(b => b.slug === slugB)

  function loadSuggestion([a, b]: string[]) {
    setSlugA(a)
    setSlugB(b)
  }

  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
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
            Compare Books
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            Side-by-side comparison of two books to help you decide what to read next
          </p>
        </motion.div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-8">
          <p className="text-xs font-medium self-center mr-2" style={{ color: 'var(--color-muted-soft)' }}>Quick compare:</p>
          {suggestions.map(([a, b], i) => {
            const ba = books.find(bk => bk.slug === a)
            const bb = books.find(bk => bk.slug === b)
            return (
              <button
                key={i}
                onClick={() => loadSuggestion([a, b])}
                className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:border-coral"
                style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-body)', backgroundColor: 'var(--color-canvas)' }}
              >
                {ba?.title} vs {bb?.title}
              </button>
            )
          })}
        </div>

        {/* Selectors */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            { value: slugA, setter: setSlugA, label: 'Book A' },
            { value: slugB, setter: setSlugB, label: 'Book B' },
          ].map(({ value, setter, label }) => (
            <div key={label}>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>{label}</label>
              <select
                value={value}
                onChange={e => setter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[8px] border text-sm outline-none"
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderColor: 'var(--color-hairline)',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                <option value="">Select a book...</option>
                {books.map(b => (
                  <option key={b.slug} value={b.slug}>{b.title}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison */}
        {bookA && bookB ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[bookA, bookB].map(book => (
                <div
                  key={book.slug}
                  className="flex gap-4 p-5 rounded-[12px] border"
                  style={{ backgroundColor: 'var(--color-surface-card)', borderColor: 'var(--color-hairline)' }}
                >
                  <BookCover book={book} size="md" />
                  <div>
                    <h3
                      className="text-lg font-normal leading-tight mb-1"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                    >
                      {book.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: 'var(--color-muted)' }}>{book.author}</p>
                    <p className="text-xs italic" style={{ color: 'var(--color-body)' }}>"{book.keyInsight}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div
              className="rounded-[12px] border overflow-hidden"
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              {[
                { label: 'Category', a: bookA.category, b: bookB.category },
                {
                  label: 'Rating',
                  a: <span className="flex items-center gap-1"><Star size={12} fill="var(--color-amber)" style={{color:'var(--color-amber)'}}/>{bookA.rating}</span>,
                  b: <span className="flex items-center gap-1"><Star size={12} fill="var(--color-amber)" style={{color:'var(--color-amber)'}}/>{bookB.rating}</span>,
                },
                { label: 'Read Time', a: bookA.readTime, b: bookB.readTime },
                { label: 'Difficulty', a: bookA.difficulty, b: bookB.difficulty },
                { label: 'Key Lessons', a: `${bookA.lessons.length} lessons`, b: `${bookB.lessons.length} lessons` },
                { label: 'Published', a: bookA.publishYear, b: bookB.publishYear },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_2fr_2fr]"
                  style={{ borderBottom: '1px solid var(--color-hairline)', backgroundColor: i % 2 === 0 ? 'var(--color-canvas)' : 'var(--color-surface-soft)' }}
                >
                  <div
                    className="px-5 py-3.5 text-xs font-medium flex items-center"
                    style={{ color: 'var(--color-muted)', borderRight: '1px solid var(--color-hairline)' }}
                  >
                    {row.label}
                  </div>
                  <div className="px-5 py-3.5 text-sm flex items-center" style={{ color: 'var(--color-body)', borderRight: '1px solid var(--color-hairline)' }}>
                    {row.a}
                  </div>
                  <div className="px-5 py-3.5 text-sm flex items-center" style={{ color: 'var(--color-body)' }}>
                    {row.b}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags comparison */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {[bookA, bookB].map(book => (
                <div
                  key={book.slug}
                  className="p-5 rounded-[12px] border"
                  style={{ backgroundColor: 'var(--color-surface-card)', borderColor: 'var(--color-hairline)' }}
                >
                  <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-muted)' }}>Topics covered</p>
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: 'var(--color-canvas)', color: 'var(--color-body)', border: '1px solid var(--color-hairline)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div
            className="text-center py-20 rounded-[12px] border"
            style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted-soft)' }}
          >
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">Select two books above to compare them</p>
          </div>
        )}
      </div>
    </div>
  )
}
