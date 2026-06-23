'use client'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Books Summarized', value: 20,     suffix: '+' },
  { label: 'Key Insights',     value: 180,    suffix: '+' },
  { label: 'Categories',       value: 9,      suffix: '' },
  { label: 'Hours Saved',      value: 160,    suffix: 'h+' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = 0
    const duration = 1600
    const startTime = performance.now()

    function update(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + (target - start) * eased))
      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-16"
      style={{ backgroundColor: 'var(--color-surface-card)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-normal leading-none tracking-tight mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-coral)' }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
