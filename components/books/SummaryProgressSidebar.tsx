'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useReadingActivity } from '@/lib/hooks/useReadingActivity'

interface Props {
  sectionCount: number
  sectionIds: string[]
  bookSlug: string
}

export default function SummaryProgressSidebar({ sectionCount, sectionIds, bookSlug }: Props) {
  const [visible, setVisible] = useState<Set<number>>(new Set())
  const [complete, setComplete] = useState(false)
  const { recordActivity } = useReadingActivity()
  const hasRecorded = useRef(false)

  useEffect(() => {
    if (sectionIds.length === 0) return

    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id, idx) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => {
              const next = new Set(prev)
              next.add(idx)
              return next
            })
          }
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [sectionIds])

  useEffect(() => {
    if (visible.size >= sectionCount && sectionCount > 0 && !complete) {
      setComplete(true)
      if (!hasRecorded.current) {
        hasRecorded.current = true
        recordActivity()
      }
    }
  }, [visible, sectionCount, complete, recordActivity])

  const pct = sectionCount > 0 ? Math.round((visible.size / sectionCount) * 100) : 0
  const r = 18
  const circumference = 2 * Math.PI * r

  return (
    <div
      className="hidden lg:flex flex-col items-center gap-2 z-40"
      style={{ position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '48px' }}
    >
      {/* Ring */}
      <div className="relative w-12 h-12 mb-1" title={`${pct}% read`}>
        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
          <circle cx="22" cy="22" r={r} fill="none" strokeWidth="3" style={{ stroke: 'var(--color-hairline)' }} />
          <motion.circle
            cx="22" cy="22" r={r} fill="none" strokeWidth="3"
            strokeLinecap="round"
            style={{ stroke: 'var(--color-coral)' }}
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
            transition={{ duration: 0.4 }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[9px] font-medium"
          style={{ color: 'var(--color-ink)' }}
        >
          {pct}%
        </span>
      </div>

      {/* Dots */}
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: sectionCount }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              const el = document.getElementById(sectionIds[i])
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            animate={{ scale: visible.has(i) ? 1 : 0.8 }}
            title={`Section ${i + 1}`}
            className="rounded-full transition-all"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: visible.has(i) ? 'var(--color-coral)' : 'var(--color-hairline)',
            }}
          />
        ))}
      </div>

      {/* Complete message */}
      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col items-center gap-1"
          >
            <CheckCircle size={16} style={{ color: '#34d399' }} />
            <p
              className="text-[9px] text-center leading-tight"
              style={{ color: 'var(--color-muted)', maxWidth: '48px' }}
            >
              Done!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
