import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { insightThreads } from '@/lib/data/insights'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return insightThreads.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const thread = insightThreads.find(t => t.slug === slug)
  if (!thread) return {}
  return {
    title: thread.title,
    description: thread.subtitle,
  }
}

export default async function InsightThreadPage({ params }: PageProps) {
  const { slug } = await params
  const thread = insightThreads.find(t => t.slug === slug)
  if (!thread) notFound()

  const threadBooks = thread.books.map(s => books.find(b => b.slug === s)).filter(Boolean)

  const bodyWithQuotes = thread.body.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <h3
          key={i}
          className="text-xl font-medium mt-8 mb-3"
          style={{ color: 'var(--color-ink)' }}
        >
          {line.slice(2, -2)}
        </h3>
      )
    }
    if (!line.trim()) return <br key={i} />
    return (
      <p key={i} className="mb-4 leading-relaxed" style={{ color: 'var(--color-body)' }}>
        {line}
      </p>
    )
  })

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[760px] mx-auto px-6">
        {/* Back */}
        <Link
          href="/insights"
          className="flex items-center gap-1.5 text-sm mb-10"
          style={{ color: 'var(--color-muted)' }}
        >
          <ArrowLeft size={14} />
          All Insight Threads
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
            >
              <BookOpen size={10} />
              {thread.books.length} books
            </span>
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
              {new Date(thread.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            {thread.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>{thread.subtitle}</p>
        </div>

        {/* Books in this thread */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {threadBooks.map(book => book && (
            <Link
              key={book.slug}
              href={`/books/${book.slug}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all hover:shadow-sm"
              style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-body)' }}
            >
              <BookCover book={book} size="sm" />
              {book.title}
            </Link>
          ))}
        </div>

        {/* Pull quotes */}
        {thread.pullQuotes.map((pq, i) => {
          const book = books.find(b => b.slug === pq.bookSlug)
          return (
            <blockquote
              key={i}
              className="my-8 pl-5 py-2 border-l-4"
              style={{ borderColor: 'var(--color-coral)' }}
            >
              <p
                className="text-xl italic mb-2 leading-relaxed"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                &ldquo;{pq.text}&rdquo;
              </p>
              {book && (
                <cite className="text-sm not-italic" style={{ color: 'var(--color-muted)' }}>
                  — {book.title}
                </cite>
              )}
            </blockquote>
          )
        })}

        {/* Body */}
        <div className="text-base">{bodyWithQuotes}</div>

        {/* Related books grid */}
        <div
          className="mt-16 pt-10 border-t"
          style={{ borderColor: 'var(--color-hairline)' }}
        >
          <h2
            className="text-2xl font-normal mb-6"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Books in this thread
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {threadBooks.map(book => book && (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="flex gap-4 p-4 rounded-[12px] border transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--color-surface-card)', borderColor: 'var(--color-hairline)' }}
              >
                <BookCover book={book} size="sm" />
                <div className="min-w-0">
                  <h3
                    className="text-sm font-normal leading-tight mb-1 line-clamp-2"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{book.author}</p>
                  <span className="text-xs mt-2 block" style={{ color: 'var(--color-coral)' }}>Read summary →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
