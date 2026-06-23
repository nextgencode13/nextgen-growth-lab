'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import BookCover from '@/components/ui/BookCover'
import { books } from '@/lib/data/books'

const floatingBooks = books.slice(0, 5)
const ease = [0.22, 1, 0.36, 1] as const

function fadeIn(delay: number) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease },
  }
}

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-24 pb-8 md:pt-32 md:pb-16"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 20%, rgba(204,120,92,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Left */}
          <div>
            <motion.div
              {...fadeIn(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{ backgroundColor: 'var(--color-surface-card)', color: 'var(--color-coral)' }}
            >
              <Sparkles size={12} />
              20 Powerful Book Summaries
            </motion.div>

            <motion.h1
              {...fadeIn(0.1)}
              className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.04em] mb-5"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ink)',
                fontWeight: 400,
              }}
            >
              Read the World's Best Ideas{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-coral)' }}>in Minutes</em>
            </motion.h1>

            <motion.p
              {...fadeIn(0.2)}
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
            >
              Discover powerful insights from the most influential books ever written — beautifully designed and distilled for modern learners.
            </motion.p>

            <motion.div {...fadeIn(0.3)} className="flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-sm font-medium transition-all"
                style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
              >
                <BookOpen size={16} />
                Explore Books
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-sm font-medium border transition-all"
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  color: 'var(--color-ink)',
                  borderColor: 'var(--color-hairline)',
                }}
              >
                Start Learning
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.p
              {...fadeIn(0.4)}
              className="mt-8 text-xs"
              style={{ color: 'var(--color-muted-soft)' }}
            >
              Trusted by 50,000+ readers — avg. rating 4.8 ★
            </motion.p>
          </div>

          {/* Right: floating book stack */}
          <div className="relative flex items-center justify-center h-80 md:h-[440px]">
            <div
              className="absolute inset-0 rounded-[16px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(204,120,92,0.12) 0%, transparent 70%)',
              }}
            />

            {floatingBooks.map((book, i) => {
              const offsets = [
                { x: 0,    y: 0,    rotate: 0,  z: 50 },
                { x: -110, y: -30,  rotate: -8, z: 40 },
                { x: 120,  y: -20,  rotate: 6,  z: 40 },
                { x: -60,  y: 80,   rotate: 5,  z: 30 },
                { x: 70,   y: 90,   rotate: -5, z: 30 },
              ]
              const o = offsets[i]
              const coverSizes = ['xl', 'lg', 'md', 'md', 'md'] as const

              return (
                <motion.div
                  key={book.id}
                  className="absolute"
                  style={{ zIndex: o.z }}
                  initial={{ opacity: 0, scale: 0.8, rotate: o.rotate - 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: o.rotate, x: o.x, y: o.y }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease }}
                >
                  <motion.div
                    animate={{ y: [0, -(8 + i * 3), 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  >
                    <BookCover book={book} size={coverSizes[i]} />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
