import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { books } from '@/lib/data/books'
import { bookSummaries } from '@/lib/data/summaries'
import BookHero from '@/components/books/BookHero'
import DetailedSummary from '@/components/books/DetailedSummary'
import KeyLessons from '@/components/books/KeyLessons'
import ActionPlan from '@/components/books/ActionPlan'
import QuoteCards from '@/components/books/QuoteCards'
import VisualTakeaways from '@/components/books/VisualTakeaways'
import RelatedBooks from '@/components/books/RelatedBooks'
import ReadingProgress from '@/components/ui/ReadingProgress'
import WhatToReadNext from '@/components/books/WhatToReadNext'
import SummaryProgressSidebar from '@/components/books/SummaryProgressSidebar'

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

  const sections = bookSummaries[book.slug] ?? []
  const sectionIds = sections.map((_, i) => `section-${i}`)

  return (
    <>
      <ReadingProgress />
      <BookHero book={book} />
      <SummaryProgressSidebar
        sectionCount={sections.length}
        sectionIds={sectionIds}
        bookSlug={book.slug}
      />

      <DetailedSummary
        sections={sections}
        bookTitle={book.title}
        introSummary={book.summary}
      />

      <KeyLessons lessons={book.lessons} />
      <ActionPlan steps={book.actionSteps} />
      <QuoteCards quotes={book.quotes} bookTitle={book.title} bookSlug={book.slug} author={book.author} />
      <VisualTakeaways book={book} />
      <RelatedBooks slugs={book.relatedBooks} />
      <WhatToReadNext slug={book.slug} />
    </>
  )
}
