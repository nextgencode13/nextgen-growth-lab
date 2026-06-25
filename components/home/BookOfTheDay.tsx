import Link from 'next/link'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'

function getDailyBook() {
  const now = new Date()
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )
  return books[dayOfYear % books.length]
}

export default function BookOfTheDay() {
  const book = getDailyBook()

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--color-surface-dark)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center">
          {/* Cover */}
          <div className="flex justify-center">
            <BookCover book={book} size="lg" />
          </div>

          {/* Content */}
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
            >
              Today&apos;s Pick
            </span>

            <h2
              className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3 leading-tight"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-on-dark)' }}
            >
              {book.title}
            </h2>

            <p className="text-base mb-6" style={{ color: 'var(--color-on-dark-soft)' }}>
              by {book.author} &middot; {book.category} &middot; {book.readTime} read
            </p>

            <blockquote
              className="text-lg italic leading-relaxed mb-8 pl-5 border-l-2"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-on-dark-soft)',
                borderColor: 'var(--color-coral)',
              }}
            >
              &ldquo;{book.keyInsight}&rdquo;
            </blockquote>

            <Link
              href={`/books/${book.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
            >
              Read Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
