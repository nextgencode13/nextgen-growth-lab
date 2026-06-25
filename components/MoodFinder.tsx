'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { moodOptions } from '@/lib/data/moodMatrix'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'
import { useBookmarks } from '@/lib/hooks/useBookmarks'

export default function MoodFinder() {
  const [selected, setSelected] = useState<number | null>(null)
  const { setStatus } = useBookmarks()

  const mood = selected !== null ? moodOptions[selected] : null
  const recommendations = mood
    ? mood.books.map(s => books.find(b => b.slug === s)).filter(Boolean)
    : []

  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <AnimatePresence mode="wait">
        {selected === null ? (
          <motion.div
            key="picker"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
          >
            <h1
              className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3 text-center"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              How are you feeling today?
            </h1>
            <p className="text-center mb-10" style={{ color: 'var(--color-muted)' }}>
              Choose your mood — we&apos;ll match you to the perfect book.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {moodOptions.map((option, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={() => setSelected(i)}
                  className="flex items-center gap-4 p-5 rounded-[16px] text-left border transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--color-surface-card)', borderColor: 'var(--color-hairline)' }}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span
                    className="text-base font-normal"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                  >
                    {option.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1.5 text-sm mb-8"
              style={{ color: 'var(--color-muted)' }}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="text-center mb-10">
              <span className="text-4xl mb-3 block">{mood!.emoji}</span>
              <h2
                className="text-3xl font-normal mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                For you right now
              </h2>
              <p style={{ color: 'var(--color-muted)' }}>
                These books {mood!.reason}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {recommendations.map((book, i) => book && (
                <motion.div
                  key={book.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-[16px] p-6 border"
                  style={{ backgroundColor: 'var(--color-surface-card)', borderColor: 'var(--color-hairline)' }}
                >
                  <div className="flex gap-4 mb-4">
                    <BookCover book={book} size="sm" />
                    <div className="min-w-0">
                      <h3
                        className="text-lg font-normal leading-tight mb-1"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                      >
                        {book.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{book.author}</p>
                    </div>
                  </div>

                  <p className="text-sm italic mb-4" style={{ color: 'var(--color-muted)' }}>
                    &ldquo;{book.keyInsight}&rdquo;
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/books/${book.slug}`}
                      className="flex-1 text-center py-2 rounded-[8px] text-sm font-medium text-white"
                      style={{ backgroundColor: 'var(--color-coral)' }}
                    >
                      Read Now
                    </Link>
                    <button
                      onClick={() => setStatus(book.slug, 'want')}
                      className="px-3 py-2 rounded-[8px] text-sm border"
                      style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-body)' }}
                    >
                      + List
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
