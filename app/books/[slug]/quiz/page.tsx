import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { books } from '@/lib/data/books'
import { bookQuizzes } from '@/lib/data/quizzes'
import QuizCard from '@/components/books/QuizCard'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) return {}
  return { title: `${book.title} Quiz` }
}

export default async function QuizPage({ params }: PageProps) {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) notFound()

  const questions = bookQuizzes[slug] ?? []

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-canvas)' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link
          href={`/books/${slug}`}
          className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {book.title}
        </Link>

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
            Test Your Knowledge
          </p>
          <h1 className="font-bold text-3xl" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}>
            {book.title} Quiz
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-muted)' }}>
            {questions.length} questions · Based on the key concepts
          </p>
        </div>

        {questions.length > 0 ? (
          <QuizCard questions={questions} bookTitle={book.title} bookSlug={slug} />
        ) : (
          <div className="text-center py-16" style={{ color: 'var(--color-muted)' }}>
            <p className="text-lg">Quiz coming soon for this book.</p>
            <Link
              href={`/books/${slug}`}
              className="mt-4 inline-block text-sm underline"
            >
              Return to summary
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
