'use client'
import { useInView, motion } from 'framer-motion'
import { useRef } from 'react'
import type { Lesson } from '@/lib/types'
import { Lightbulb } from 'lucide-react'

export default function KeyLessons({ lessons }: { lessons: Lesson[] }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-surface-card)' }}
          >
            <Lightbulb size={16} style={{ color: 'var(--color-coral)' }} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-normal tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Key Lessons
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[12px] p-6 border"
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderColor: 'var(--color-hairline)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--color-surface-card)' }}>
                  {lesson.icon}
                </div>
                <div>
                  <h3
                    className="font-medium mb-2"
                    style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
                  >
                    {lesson.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-body)' }}>
                    {lesson.body}
                  </p>
                  <div
                    className="text-xs leading-relaxed p-3 rounded-[8px]"
                    style={{ backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-muted)', borderLeft: '3px solid var(--color-coral)' }}
                  >
                    <strong style={{ color: 'var(--color-coral)' }}>Apply it: </strong>
                    {lesson.application}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
