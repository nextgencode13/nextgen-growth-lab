'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import BookCover from '@/components/ui/BookCover'
import { books } from '@/lib/data/books'
import { useBookmarks } from '@/lib/hooks/useBookmarks'
import { getNextBooks } from '@/lib/utils/recommendations'

export default function WhatToReadNext({ slug }: { slug: string }) {
  const { statusMap, getStatus, setStatus } = useBookmarks()
  const status = getStatus(slug)

  if (status !== 'finished') return null

  const recommendations = getNextBooks(slug, books, statusMap)
  if (recommendations.length === 0) return null

  return (
    <section className="py-16" style={{ backgroundColor: 'var(--color-coral)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
            You finished this one
          </p>
          <h2
            className="text-3xl font-normal tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-serif)', color: '#fff' }}
          >
            What to Read Next
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.book.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4 p-4 rounded-[12px]"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <BookCover book={rec.book} size="sm" />
              <div className="min-w-0 flex-1">
                <h3
                  className="text-base font-normal leading-tight mb-1 line-clamp-2"
                  style={{ fontFamily: 'var(--font-serif)', color: '#fff' }}
                >
                  {rec.book.title}
                </h3>
                <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {rec.book.author}
                </p>
                <p className="text-xs italic mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Because it {rec.reason}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStatus(rec.book.slug, 'want')}
                    disabled={!!statusMap[rec.book.slug]}
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all disabled:opacity-50"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                  >
                    <Plus size={10} />
                    {statusMap[rec.book.slug] ? 'In your list' : 'Want to Read'}
                  </button>
                  <Link
                    href={`/books/${rec.book.slug}`}
                    className="text-xs flex items-center gap-0.5"
                    style={{ color: 'rgba(255,255,255,0.8)' }}
                  >
                    Read <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
