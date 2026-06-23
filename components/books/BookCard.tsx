'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, BookOpen } from 'lucide-react'
import type { Book } from '@/lib/types'
import BookCover from '@/components/ui/BookCover'
import Badge from '@/components/ui/Badge'

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} className="block group">
      <motion.article
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[12px] overflow-hidden border h-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-canvas)',
          borderColor: 'var(--color-hairline)',
        }}
      >
        {/* Cover strip */}
        <div className={`relative h-40 bg-gradient-to-br ${book.coverGradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end p-4">
            <div>
              <Badge variant="default" className="mb-2 text-[10px]">{book.category}</Badge>
              <h3
                className="text-white font-normal text-xl leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {book.title}
              </h3>
            </div>
          </div>
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(204,120,92,0.15)' }}
          />
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1" style={{ backgroundColor: 'var(--color-canvas)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--color-muted)' }}>{book.author}</p>

          <p
            className="text-sm leading-relaxed flex-1 mb-4 line-clamp-2"
            style={{ color: 'var(--color-body)' }}
          >
            {book.keyInsight}
          </p>

          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-muted-soft)' }}>
            <span className="flex items-center gap-1">
              <Star size={11} style={{ color: 'var(--color-amber)' }} fill="var(--color-amber)" />
              {book.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {book.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-coral)' }}>
              <BookOpen size={11} />
              Read →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
