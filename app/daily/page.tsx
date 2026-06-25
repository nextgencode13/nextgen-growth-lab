'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { dailyFeed } from '@/lib/data/dailyFeed'
import { useDailyProgress } from '@/lib/hooks/useDailyProgress'
import DailyCard from '@/components/daily/DailyCard'

export default function DailyPage() {
  const { dayIndex, markSeen, isSeen, journeyDay } = useDailyProgress()
  const [viewIndex, setViewIndex] = useState<number | null>(null)

  const currentIndex = viewIndex ?? dayIndex
  const item = dailyFeed[currentIndex % dailyFeed.length]

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  // Last 7 day indices for the history pills
  const historyDays = Array.from({ length: 7 }, (_, i) => {
    const idx = ((dayIndex - 6 + i) + dailyFeed.length) % dailyFeed.length
    return idx
  })

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[800px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="text-sm mb-2" style={{ color: 'var(--color-muted)' }}>
            Day {journeyDay} of your learning journey
          </p>
          <h1
            className="text-4xl md:text-5xl font-normal tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            {dateStr}
          </h1>
        </motion.div>

        {/* Main card */}
        <DailyCard
          item={item}
          isSeen={isSeen(currentIndex)}
          onMarkSeen={() => markSeen(currentIndex)}
        />

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setViewIndex(i => Math.max(0, (i ?? dayIndex) - 1))}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border disabled:opacity-30 transition-all"
            style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Day {currentIndex + 1} of 90
          </span>
          <button
            onClick={() => setViewIndex(i => Math.min(dayIndex, (i ?? dayIndex) + 1))}
            disabled={currentIndex >= dayIndex}
            className="p-2 rounded-full border disabled:opacity-30 transition-all"
            style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-ink)' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* History pills */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {historyDays.map(idx => (
            <button
              key={idx}
              onClick={() => setViewIndex(idx)}
              className="px-3 py-1 rounded-full text-xs transition-all"
              style={{
                backgroundColor: currentIndex === idx
                  ? 'var(--color-coral)'
                  : isSeen(idx)
                  ? 'var(--color-surface-card)'
                  : 'transparent',
                color: currentIndex === idx ? '#fff' : 'var(--color-muted)',
                border: `1px solid ${isSeen(idx) || currentIndex === idx ? 'transparent' : 'var(--color-hairline)'}`,
              }}
            >
              Day {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
