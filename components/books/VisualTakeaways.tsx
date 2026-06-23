'use client'
import { useInView, motion } from 'framer-motion'
import { useRef } from 'react'
import type { Book } from '@/lib/types'
import { TrendingUp, Users, Clock, Star } from 'lucide-react'

export default function VisualTakeaways({ book }: { book: Book }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const cards = [
    {
      icon: <Star size={20} />,
      label: 'Rating',
      value: `${book.rating}/5.0`,
      sub: 'Reader satisfaction',
      color: 'var(--color-amber)',
    },
    {
      icon: <Clock size={20} />,
      label: 'Read Time',
      value: book.readTime,
      sub: `vs. hours for full book`,
      color: 'var(--color-teal)',
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Key Lessons',
      value: `${book.lessons.length}`,
      sub: 'Actionable insights',
      color: 'var(--color-coral)',
    },
    {
      icon: <Users size={20} />,
      label: 'Category',
      value: book.category,
      sub: `${book.difficulty} level`,
      color: '#8b5cf6',
    },
  ]

  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: 'var(--color-surface-dark)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-normal tracking-[-0.03em] mb-10"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-on-dark)' }}
        >
          At a Glance
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-[12px] p-6"
              style={{ backgroundColor: 'var(--color-surface-dark-elevated)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${card.color}20`, color: card.color }}
              >
                {card.icon}
              </div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-on-dark-soft)' }}>{card.label}</p>
              <p
                className="text-xl font-normal mb-1"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-on-dark)' }}
              >
                {card.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-on-dark-soft)', opacity: 0.6 }}>{card.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
