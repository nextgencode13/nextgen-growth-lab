import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { books } from '@/lib/data/books'
import PersonalNotes from '@/components/books/PersonalNotes'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) return {}
  return { title: `My Notes — ${book.title}` }
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) notFound()

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
            Personal Notes
          </p>
          <h1 className="font-bold text-3xl" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}>
            {book.title}
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-muted)' }}>
            Your private notes — saved locally in your browser.
          </p>
        </div>

        <PersonalNotes bookSlug={slug} bookTitle={book.title} />
      </div>
    </div>
  )
}
