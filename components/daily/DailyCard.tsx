'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Quote, Lightbulb, Zap } from 'lucide-react'
import type { DailyItem } from '@/lib/types'

interface Props {
  item: DailyItem
  isSeen: boolean
  onMarkSeen: () => void
}

const TYPE_CONFIG = {
  quote: {
    label: 'Quote',
    Icon: Quote,
    bg: 'var(--color-surface-dark)',
    accent: 'var(--color-coral)',
    textColor: 'var(--color-on-dark)',
    subColor: 'var(--color-on-dark-soft)',
  },
  insight: {
    label: 'Key Insight',
    Icon: Lightbulb,
    bg: 'var(--color-surface-card)',
    accent: '#f59e0b',
    textColor: 'var(--color-ink)',
    subColor: 'var(--color-muted)',
  },
  action: {
    label: 'Action Step',
    Icon: Zap,
    bg: 'var(--color-surface-soft)',
    accent: '#10b981',
    textColor: 'var(--color-ink)',
    subColor: 'var(--color-muted)',
  },
}

export default function DailyCard({ item, isSeen, onMarkSeen }: Props) {
  const cfg = TYPE_CONFIG[item.type]
  const { Icon } = cfg

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[20px] p-8 md:p-12 max-w-2xl mx-auto relative"
      style={{ backgroundColor: cfg.bg, border: `2px solid ${cfg.accent}20` }}
    >
      {/* Type pill */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${cfg.accent}20` }}
        >
          <Icon size={14} style={{ color: cfg.accent }} />
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: cfg.accent }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Content */}
      {item.type === 'quote' ? (
        <blockquote
          className="text-2xl md:text-3xl font-normal leading-relaxed mb-6 italic"
          style={{ fontFamily: 'var(--font-serif)', color: cfg.textColor }}
        >
          &ldquo;{item.content}&rdquo;
        </blockquote>
      ) : (
        <p
          className="text-xl md:text-2xl font-normal leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-serif)', color: cfg.textColor }}
        >
          {item.content}
        </p>
      )}

      {/* Source */}
      <div className="flex items-center justify-between">
        <Link
          href={`/books/${item.bookSlug}`}
          className="text-sm font-medium"
          style={{ color: cfg.accent }}
        >
          {item.source} →
        </Link>

        {isSeen ? (
          <span className="flex items-center gap-1 text-sm" style={{ color: '#34d399' }}>
            <CheckCircle size={14} />
            Seen
          </span>
        ) : (
          <button
            onClick={onMarkSeen}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-[8px]"
            style={{ backgroundColor: cfg.accent, color: '#fff' }}
          >
            <CheckCircle size={14} />
            Mark as Seen
          </button>
        )}
      </div>
    </motion.div>
  )
}
