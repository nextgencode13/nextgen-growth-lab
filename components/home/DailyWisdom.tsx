'use client'
import Link from 'next/link'
import { useInView, motion } from 'framer-motion'
import { useRef } from 'react'
import { quotes, books } from '@/lib/data/books'
import { ArrowRight } from 'lucide-react'

function getDailyQuote() {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return quotes[dayOfYear % quotes.length]
}

export default function DailyWisdom() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const q = getDailyQuote()
  const book = books.find(b => b.title === q.book)

  return (
    <section
      id="newsletter"
      ref={ref}
      className="py-6 px-6"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[12px] p-10 md:p-16 relative overflow-hidden"
          style={{ backgroundColor: 'var(--color-coral)' }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
            <div className="w-full h-full rounded-full bg-white" style={{ transform: 'translate(30%, -30%)' }} />
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[2px] mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Today's Wisdom
            </p>
            <blockquote
              className="text-2xl md:text-3xl leading-snug tracking-[-0.02em] mb-6 font-normal"
              style={{ fontFamily: 'var(--font-serif)', color: '#fff' }}
            >
              "{q.text}"
            </blockquote>
            <cite className="not-italic text-sm mb-8 block" style={{ color: 'rgba(255,255,255,0.8)' }}>
              — {q.author}, {q.book}
            </cite>

            <div className="flex flex-wrap gap-3">
              {book && (
                <Link
                  href={`/books/${book.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-medium transition-all"
                  style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: 'var(--color-coral)' }}
                >
                  Read Summary
                  <ArrowRight size={14} />
                </Link>
              )}
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-medium border transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
              >
                Browse All Books
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
