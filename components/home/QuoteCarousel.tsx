'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { quotes } from '@/lib/data/books'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function QuoteCarousel() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIdx(i => (i + 1) % quotes.length) }, 5000)
    return () => clearInterval(t)
  }, [])

  function go(delta: number) {
    setDir(delta)
    setIdx(i => (i + delta + quotes.length) % quotes.length)
  }

  const q = quotes[idx]

  return (
    <section className="py-24" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[2px] mb-10" style={{ color: 'var(--color-muted-soft)' }}>
          Daily Wisdom
        </p>

        <div className="relative min-h-[120px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={idx}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: -d * 40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p
                className="text-2xl md:text-3xl leading-snug tracking-[-0.02em] mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)', fontWeight: 400 }}
              >
                "{q.text}"
              </p>
              <cite className="not-italic text-sm" style={{ color: 'var(--color-muted)' }}>
                — {q.author}, <span style={{ color: 'var(--color-coral)' }}>{q.book}</span>
              </cite>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
            style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted)' }}
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-1.5">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? '20px' : '6px',
                  height: '6px',
                  backgroundColor: i === idx ? 'var(--color-coral)' : 'var(--color-hairline)',
                }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
            style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted)' }}
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
