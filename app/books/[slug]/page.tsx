import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { books } from '@/lib/data/books'
import BookHero from '@/components/books/BookHero'
import KeyLessons from '@/components/books/KeyLessons'
import ActionPlan from '@/components/books/ActionPlan'
import QuoteCards from '@/components/books/QuoteCards'
import VisualTakeaways from '@/components/books/VisualTakeaways'
import RelatedBooks from '@/components/books/RelatedBooks'
import ReadingProgress from '@/components/ui/ReadingProgress'

// Next.js 16: params is a Promise
type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) return {}
  return {
    title: book.title,
    description: book.summary.slice(0, 160),
    openGraph: {
      title: `${book.title} Summary | NextGen Wisdom`,
      description: book.summary.slice(0, 160),
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${book.title} Summary | NextGen Wisdom`,
      description: book.keyInsight,
    },
  }
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) notFound()

  return (
    <>
      <ReadingProgress />
      <BookHero book={book} />

      {/* Quick Summary */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl">
            <h2
              className="text-3xl md:text-4xl font-normal tracking-[-0.03em] mb-6"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              Quick Summary
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-body)' }}>
              {book.summary}
            </p>
          </div>
        </div>
      </section>

      <KeyLessons lessons={book.lessons} />
      <ActionPlan steps={book.actionSteps} />
      <QuoteCards quotes={book.quotes} bookTitle={book.title} />
      <VisualTakeaways book={book} />
      <RelatedBooks slugs={book.relatedBooks} />
    </>
  )
}
