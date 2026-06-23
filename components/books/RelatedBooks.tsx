import Link from 'next/link'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'
import { ArrowRight } from 'lucide-react'

export default function RelatedBooks({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map(s => books.find(b => b.slug === s))
    .filter(Boolean) as typeof books

  if (!related.length) return null

  return (
    <section className="py-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-normal tracking-[-0.03em] mb-10"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
        >
          Read Next
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map(book => (
            <Link
              key={book.slug}
              href={`/books/${book.slug}`}
              className="group flex gap-4 p-4 rounded-[12px] border transition-all hover:shadow-md"
              style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)' }}
            >
              <BookCover book={book} size="sm" />
              <div className="flex-1 min-w-0">
                <h3
                  className="font-normal text-base leading-tight mb-1 line-clamp-2"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                >
                  {book.title}
                </h3>
                <p className="text-xs mb-2" style={{ color: 'var(--color-muted)' }}>{book.author}</p>
                <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-coral)' }}>
                  Read summary <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
