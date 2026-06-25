'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw, Zap, Maximize2, X } from 'lucide-react'
import type { FlashCard } from '@/lib/types'

export default function FlashCards({ cards, bookTitle }: { cards: FlashCard[]; bookTitle: string }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [mastered, setMastered] = useState<Set<number>>(new Set())
  const [direction, setDirection] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    if (!fullscreen) return
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') { setFullscreen(false); return }
      if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f); return }
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'm' || e.key === 'M') markMastered()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  if (!cards.length) return null

  const card = cards[index]
  const progress = mastered.size

  function go(dir: number) {
    setFlipped(false)
    setDirection(dir)
    setIndex(i => Math.max(0, Math.min(cards.length - 1, i + dir)))
  }

  function markMastered() {
    setMastered(prev => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
    if (index < cards.length - 1) go(1)
  }

  function reset() {
    setIndex(0)
    setFlipped(false)
    setMastered(new Set())
  }

  const CardFace = (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-lg cursor-pointer"
        style={{ perspective: '1200px', minHeight: '220px' }}
        onClick={() => setFlipped(f => !f)}
      >
        <motion.div
          style={{
            position: 'relative',
            width: '100%',
            height: fullscreen ? '320px' : '220px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className="absolute inset-0 rounded-[16px] flex flex-col items-center justify-center p-8 shadow-md"
            style={{ backfaceVisibility: 'hidden', backgroundColor: fullscreen ? 'var(--color-surface-dark-elevated)' : 'var(--color-canvas)', border: '1px solid var(--color-hairline)' }}
          >
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted-soft)' }}>
              {index + 1} / {cards.length}
            </p>
            <p className="text-xl text-center font-medium leading-relaxed" style={{ color: fullscreen ? 'var(--color-on-dark)' : 'var(--color-ink)', fontFamily: 'var(--font-serif)' }}>
              {card.front}
            </p>
            <p className="text-xs mt-6" style={{ color: 'var(--color-muted-soft)' }}>
              {fullscreen ? 'Space to flip' : 'Tap to reveal answer'}
            </p>
          </div>
          <div
            className="absolute inset-0 rounded-[16px] flex flex-col items-center justify-center p-8 shadow-md"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', backgroundColor: 'var(--color-coral)' }}
          >
            <p className="text-xl text-center font-medium leading-relaxed text-white" style={{ fontFamily: 'var(--font-serif)' }}>
              {card.back}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button onClick={() => go(-1)} disabled={index === 0} className="p-2 rounded-full border transition-all disabled:opacity-30" style={{ borderColor: fullscreen ? 'var(--color-surface-dark-elevated)' : 'var(--color-hairline)', color: fullscreen ? 'var(--color-on-dark)' : 'var(--color-ink)' }}>
          <ChevronLeft size={20} />
        </button>
        {flipped && (
          <button onClick={markMastered} className="flex items-center gap-2 px-5 py-2 rounded-[8px] text-sm font-medium text-white transition-all" style={{ backgroundColor: mastered.has(index) ? '#64748b' : '#34d399' }}>
            {mastered.has(index) ? 'Review again' : 'Got it!'}
          </button>
        )}
        <button onClick={() => go(1)} disabled={index === cards.length - 1} className="p-2 rounded-full border transition-all disabled:opacity-30" style={{ borderColor: fullscreen ? 'var(--color-surface-dark-elevated)' : 'var(--color-hairline)', color: fullscreen ? 'var(--color-on-dark)' : 'var(--color-ink)' }}>
          <ChevronRight size={20} />
        </button>
      </div>

      <button onClick={reset} className="flex items-center gap-1.5 mt-4 text-xs" style={{ color: 'var(--color-muted-soft)' }}>
        <RotateCcw size={12} />
        Reset deck
      </button>

      {fullscreen && (
        <p className="mt-4 text-xs" style={{ color: 'var(--color-on-dark-soft)' }}>
          ← → navigate · Space flip · M mastered · Esc exit
        </p>
      )}
    </div>
  )

  return (
    <>
      <section className="py-16" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface-card)' }}>
                <Zap size={16} style={{ color: 'var(--color-coral)' }} />
              </div>
              <div>
                <h2 className="text-3xl font-normal tracking-[-0.03em]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                  Flashcards
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted-soft)' }}>
                  {progress}/{cards.length} mastered · click card to flip
                </p>
              </div>
            </div>
            <button
              onClick={() => setFullscreen(true)}
              className="flex items-center gap-1.5 text-xs border px-3 py-1.5 rounded-full"
              style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted)' }}
              title="Full-screen mode (F)"
            >
              <Maximize2 size={12} />
              Full Screen
            </button>
          </div>

          <div className="w-full h-1.5 rounded-full overflow-hidden mb-8" style={{ backgroundColor: 'var(--color-hairline)' }}>
            <motion.div className="h-full rounded-full" style={{ backgroundColor: 'var(--color-coral)' }} animate={{ width: `${(progress / cards.length) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>

          {CardFace}
        </div>
      </section>

      {/* Full-screen portal */}
      <AnimatePresence>
        {fullscreen && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8"
            style={{ backgroundColor: 'var(--color-surface-dark)' }}
          >
            <div className="w-full max-w-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium" style={{ color: 'var(--color-on-dark-soft)' }}>{bookTitle}</span>
                <button onClick={() => setFullscreen(false)} style={{ color: 'var(--color-on-dark-soft)' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="w-full h-1 rounded-full overflow-hidden mb-8" style={{ backgroundColor: 'var(--color-surface-dark-elevated)' }}>
                <div className="h-full rounded-full transition-all duration-400" style={{ width: `${(progress / cards.length) * 100}%`, backgroundColor: 'var(--color-coral)' }} />
              </div>

              {CardFace}
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  )
}
