'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReadingGoal } from '@/lib/hooks/useReadingGoal'

export default function ReadingGoalRing({ finishedCount }: { finishedCount: number }) {
  const { goal, setGoal, progress, pct, completed, monthName, motivational, goalOptions } = useReadingGoal(finishedCount)
  const [showPicker, setShowPicker] = useState(false)

  const r = 32
  const circumference = 2 * Math.PI * r

  return (
    <div
      className="rounded-[12px] p-5 border flex flex-col items-center text-center"
      style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)' }}
    >
      <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted)' }}>
        {monthName} Goal
      </p>

      <div className="relative w-20 h-20 mb-3">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" strokeWidth="6" style={{ stroke: 'var(--color-hairline)' }} />
          <motion.circle
            cx="40" cy="40" r={r} fill="none" strokeWidth="6" strokeLinecap="round"
            style={{ stroke: completed ? '#34d399' : 'var(--color-coral)' }}
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-xl font-normal leading-none"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            {progress}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-muted)' }}>/{goal}</span>
        </div>
      </div>

      <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>{motivational}</p>

      <button
        onClick={() => setShowPicker(v => !v)}
        className="flex items-center gap-1 text-xs"
        style={{ color: 'var(--color-coral)' }}
      >
        Change goal <ChevronDown size={12} />
      </button>

      {showPicker && (
        <div className="flex gap-2 mt-2">
          {goalOptions.map(g => (
            <button
              key={g}
              onClick={() => { setGoal(g); setShowPicker(false) }}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: goal === g ? 'var(--color-coral)' : 'var(--color-surface-card)',
                color: goal === g ? '#fff' : 'var(--color-body)',
              }}
            >
              {g}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
