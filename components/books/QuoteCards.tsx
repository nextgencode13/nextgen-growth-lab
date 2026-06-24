'use client'
import { useInView, motion } from 'framer-motion'
import { useRef } from 'react'
import type { Quote } from '@/lib/types'
import { Quote as QuoteIcon, Bookmark, BookmarkCheck } from 'lucide-react'
import { useSavedQuotes } from '@/lib/hooks/useSavedQuotes'

export default function QuoteCards({
  quotes,
  bookTitle,
  bookSlug,
}: {
  quotes: Quote[]
  bookTitle: string
  bookSlug: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { saveQuote, removeQuote, isSaved } = useSavedQuotes()

  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-surface-card)' }}
          >
            <QuoteIcon size={16} style={{ color: 'var(--color-coral)' }} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-normal tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Key Quotes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quotes.map((q, i) => {
            const saved = isSaved(q.text, bookSlug)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-[12px] p-6 flex flex-col group relative"
                style={{ backgroundColor: 'var(--color-surface-card)' }}
              >
                <span
                  className="text-3xl mb-4 opacity-30"
                  style={{ color: 'var(--color-coral)', fontFamily: 'Georgia, serif', lineHeight: 1 }}
                >
                  "
                </span>
                <blockquote
                  className="flex-1 text-base leading-relaxed mb-4 font-normal italic"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                >
                  {q.text}
                </blockquote>
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: 'var(--color-muted-soft)' }}>
                    — {bookTitle} · {q.context}
                  </p>
                  <button
                    onClick={() =>
                      saved
                        ? removeQuote(q.text, bookSlug)
                        : saveQuote({ text: q.text, context: q.context, bookSlug, bookTitle })
                    }
                    className="ml-2 flex-shrink-0 p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    style={{ color: saved ? 'var(--color-coral)' : 'var(--color-muted-soft)' }}
                    title={saved ? 'Remove from saved' : 'Save quote'}
                  >
                    {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
