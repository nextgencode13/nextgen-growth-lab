import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { authors } from '@/lib/data/authors'
import { books } from '@/lib/data/books'
import BookCard from '@/components/books/BookCard'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return authors.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = authors.find(a => a.slug === slug)
  if (!author) return {}
  return {
    title: author.name,
    description: author.philosophy,
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = authors.find(a => a.slug === slug)
  if (!author) notFound()

  const authorBooks = author.books
    .map(s => books.find(b => b.slug === s))
    .filter(Boolean) as typeof books

  const initials = author.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  const bioParagraphs = author.bio.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-canvas)' }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Books
        </Link>

        {/* Author header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--color-coral), #f97316)' }}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)' }}>
              Author
            </p>
            <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}>
              {author.name}
            </h1>
            <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
              {author.nationality}{author.birthYear ? ` · b. ${author.birthYear}` : ''}
            </p>
            <blockquote
              className="text-base italic border-l-4 pl-4"
              style={{ borderColor: 'var(--color-coral)', color: 'var(--color-ink)' }}
            >
              &ldquo;{author.philosophy}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Bio */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>About</h2>
          <div className="space-y-4">
            {bioParagraphs.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--color-body)' }}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Books on platform */}
        {authorBooks.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5" style={{ color: 'var(--color-coral)' }} />
              <h2 className="text-xl font-semibold" style={{ color: 'var(--color-ink)' }}>
                Books on NextGen Wisdom
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorBooks.map(book => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
