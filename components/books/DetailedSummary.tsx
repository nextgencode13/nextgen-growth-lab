'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, PartyPopper } from 'lucide-react'
import type { SummarySection } from '@/lib/types'

interface Props {
  sections: SummarySection[]
  bookTitle: string
  introSummary: string
}

const CONFETTI_COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

function ConfettiBurst() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    x: (Math.sin(i * 26.25 * (Math.PI / 180)) * 120),
    y: (Math.cos(i * 26.25 * (Math.PI / 180)) * 120),
    rotate: i * 15,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: p.x * 5 + (Math.random() - 0.5) * 200,
            y: p.y * 5 + Math.random() * 200,
            opacity: 0,
            rotate: p.rotate * 8,
            scale: [1, 1.5, 0],
          }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function DetailedSummary({ sections, bookTitle, introSummary }: Props) {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [openedSections, setOpenedSections] = useState<Set<number>>(new Set())
  const [showConfetti, setShowConfetti] = useState(false)
  const [milestoneShown, setMilestoneShown] = useState(false)

  const handleToggle = useCallback((i: number) => {
    setExpandedIndex(prev => {
      const next = prev === i ? null : i
      return next
    })
    setActiveSection(i)

    // Track unique opens
    setOpenedSections(prev => {
      if (prev.has(i)) return prev
      const next = new Set(prev)
      next.add(i)
      // Check if all sections opened for the first time
      if (next.size === sections.length && !milestoneShown) {
        setMilestoneShown(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)
      }
      return next
    })
  }, [sections.length, milestoneShown])

  if (!sections.length) return null

  const progress = Math.round((openedSections.size / sections.length) * 100)

  return (
    <section style={{ backgroundColor: 'var(--color-canvas)' }}>
      {showConfetti && <ConfettiBurst />}

      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <h2
            className="text-3xl md:text-4xl font-normal tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Full Summary
          </h2>
          {/* Progress indicator */}
          <div className="flex items-center gap-3">
            <div
              className="text-sm font-medium"
              style={{ color: openedSections.size === sections.length ? 'var(--color-coral)' : 'var(--color-muted)' }}
            >
              {openedSections.size}/{sections.length}
              {openedSections.size === sections.length && (
                <span className="ml-2 inline-flex items-center gap-1">
                  <PartyPopper size={14} />
                  Complete!
                </span>
              )}
            </div>
            <div
              className="w-24 h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--color-hairline)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: 'var(--color-coral)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        <p
          className="text-base leading-relaxed max-w-2xl"
          style={{ color: 'var(--color-muted)' }}
        >
          {introSummary}
        </p>
        <div
          className="mt-4 flex items-center gap-2 text-xs font-medium"
          style={{ color: 'var(--color-coral)' }}
        >
          <span className="inline-block w-5 h-px" style={{ backgroundColor: 'var(--color-coral)' }} />
          {sections.length} sections — click any to expand
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="flex gap-8 items-start">

          {/* Sticky sidebar index — desktop only */}
          <nav
            className="hidden lg:block sticky top-24 w-56 shrink-0 self-start"
            style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-muted-soft)' }}
            >
              Sections
            </p>
            {sections.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  handleToggle(i)
                  document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="flex items-start gap-2 w-full text-left mb-1 px-2 py-1.5 rounded-[6px] transition-all text-xs leading-snug"
                style={{
                  backgroundColor: activeSection === i ? 'var(--color-surface-card)' : 'transparent',
                  color: activeSection === i ? 'var(--color-coral)' : openedSections.has(i) ? 'var(--color-muted)' : 'var(--color-muted-soft)',
                }}
              >
                <span className="shrink-0 mt-px">{openedSections.has(i) ? '✓' : s.emoji}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </nav>

          {/* Sections list */}
          <div className="flex-1 min-w-0 space-y-3">
            {sections.map((section, i) => (
              <SectionCard
                key={i}
                index={i}
                section={section}
                isExpanded={expandedIndex === i}
                wasOpened={openedSections.has(i)}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionCard({
  section,
  index,
  isExpanded,
  wasOpened,
  onToggle,
}: {
  section: SummarySection
  index: number
  isExpanded: boolean
  wasOpened: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      id={`section-${index}`}
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
      className="rounded-[12px] border overflow-hidden"
      style={{ borderColor: wasOpened ? 'var(--color-coral)' : 'var(--color-hairline)', borderWidth: wasOpened ? '1px' : '1px', opacity: wasOpened ? 1 : undefined }}
    >
      {/* Section header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-all"
        style={{
          backgroundColor: isExpanded ? 'var(--color-surface-card)' : 'var(--color-canvas)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-lg"
            style={{ backgroundColor: isExpanded ? 'var(--color-coral)' : wasOpened ? 'var(--color-coral)' : 'var(--color-surface-card)', opacity: wasOpened && !isExpanded ? 0.5 : 1 }}
          >
            {wasOpened && !isExpanded ? '✓' : section.emoji}
          </span>
          <div className="min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
              style={{ color: 'var(--color-muted-soft)' }}
            >
              Section {index + 1}
            </p>
            <h3
              className="text-sm font-medium leading-snug"
              style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
            >
              {section.title}
            </h3>
          </div>
        </div>
        <span style={{ color: 'var(--color-muted)', flexShrink: 0 }}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-5 py-5"
              style={{ backgroundColor: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)' }}
            >
              <ul className="space-y-2.5 mb-4">
                {section.points.map((point, pi) => (
                  <li key={pi} className="flex gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-coral)' }}
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-body)', fontFamily: 'var(--font-sans)' }}
                    >
                      {point}
                    </p>
                  </li>
                ))}
              </ul>

              {section.subsections && section.subsections.length > 0 && (
                <div className="space-y-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-hairline)' }}>
                  {section.subsections.map((sub, si) => (
                    <div
                      key={si}
                      className="pl-4 border-l-2"
                      style={{ borderColor: 'var(--color-coral)' }}
                    >
                      <p
                        className="text-xs font-semibold mb-2 uppercase tracking-wide"
                        style={{ color: 'var(--color-coral)' }}
                      >
                        {sub.heading}
                      </p>
                      <ul className="space-y-1.5">
                        {sub.points.map((p, pi) => (
                          <li key={pi} className="flex gap-3">
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-60"
                              style={{ backgroundColor: 'var(--color-coral)' }}
                            />
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: 'var(--color-body)', fontFamily: 'var(--font-sans)' }}
                            >
                              {p}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
