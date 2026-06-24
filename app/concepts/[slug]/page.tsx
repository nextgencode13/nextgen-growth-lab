import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { concepts } from '@/lib/data/concepts'
import { books } from '@/lib/data/books'
import BookCard from '@/components/books/BookCard'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return concepts.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const concept = concepts.find(c => c.slug === slug)
  if (!concept) return {}
  return { title: concept.name, description: concept.definition.slice(0, 160) }
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { slug } = await params
  const concept = concepts.find(c => c.slug === slug)
  if (!concept) notFound()

  const relatedBooks = concept.books
    .map(cb => {
      const book = books.find(b => b.slug === cb.slug)
      return book ? { book, angle: cb.angle } : null
    })
    .filter(Boolean) as { book: (typeof books)[0]; angle: string }[]

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-canvas)' }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/concepts"
          className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          All Concepts
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="text-5xl mb-4">{concept.emoji}</div>
          <p className="text-sm font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
            Core Concept
          </p>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}
          >
            {concept.name}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {concept.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full capitalize"
                style={{ background: 'var(--color-surface-soft)', color: 'var(--color-muted)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-body)' }}>
            {concept.definition}
          </p>
        </div>

        {/* Books that cover this concept */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-ink)' }}>
            How different books approach this idea
          </h2>
          <div className="space-y-6">
            {relatedBooks.map(({ book, angle }) => (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="flex gap-4 p-5 rounded-2xl transition-all hover:shadow-md"
                style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
              >
                <div
                  className="w-12 h-16 rounded-lg shrink-0"
                  style={{ background: `linear-gradient(to bottom, ${book.coverGradient.split(' ')[1] ?? '#888'}, ${book.coverGradient.split(' ')[3] ?? '#555'})` }}
                />
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-ink)' }}>{book.title}</p>
                  <p className="text-xs mb-2" style={{ color: 'var(--color-muted)' }}>by {book.author}</p>
                  <p className="text-sm" style={{ color: 'var(--color-body)' }}>{angle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
