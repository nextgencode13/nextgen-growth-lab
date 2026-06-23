'use client'
import Link from 'next/link'
import { useInView, motion } from 'framer-motion'
import { useRef } from 'react'
import { categories } from '@/lib/data/books'

export default function CategoriesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-4"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Browse by Category
          </h2>
          <p className="text-base" style={{ color: 'var(--color-muted)' }}>
            Find books that match your goals and interests
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/search?category=${cat.name}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-[12px] border transition-all hover:shadow-md"
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderColor: 'var(--color-hairline)',
                }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${cat.gradient} text-2xl`}
                >
                  {cat.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{cat.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted-soft)' }}>{cat.count} books</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
