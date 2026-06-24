import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Quote, Lightbulb, Target, BookOpen } from 'lucide-react'
import { digestWeeks } from '@/lib/data/digest'
import { books } from '@/lib/data/books'

export const metadata: Metadata = {
  title: 'Weekly Digest',
  description: 'One concept, one quote, one challenge, one book — every week.',
}

export default function DigestPage() {
  const [current, ...archive] = digestWeeks
  const spotlightBook = books.find(b => b.slug === current.spotlight)

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-canvas)' }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--color-coral)' }}>
            Weekly Digest
          </p>
          <h1
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}
          >
            This Week&apos;s Theme
          </h1>
          <p className="text-2xl font-medium" style={{ color: 'var(--color-coral)' }}>
            {current.theme}
          </p>
        </div>

        {/* Quote of the week */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-4 h-4" style={{ color: 'var(--color-coral)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
              Quote of the Week
            </span>
          </div>
          <blockquote
            className="text-xl italic leading-relaxed mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}
          >
            &ldquo;{current.quote.text}&rdquo;
          </blockquote>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            — {current.quote.author}, <em>{current.quote.book}</em>
          </p>
        </div>

        {/* Concept deep dive */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4" style={{ color: 'var(--color-coral)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
              Key Concept
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}>
            {current.concept.title}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--color-body)' }}>
            {current.concept.body}
          </p>
        </div>

        {/* Weekly challenge */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ background: 'linear-gradient(135deg, var(--color-coral) 0%, #f97316 100%)', color: 'white' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider opacity-80">
              This Week&apos;s Challenge
            </span>
          </div>
          <p className="text-lg leading-relaxed">{current.challenge}</p>
        </div>

        {/* Book spotlight */}
        {spotlightBook && (
          <div
            className="rounded-2xl p-8 mb-16"
            style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4" style={{ color: 'var(--color-coral)' }} />
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
                Book Spotlight
              </span>
            </div>
            <Link href={`/books/${spotlightBook.slug}`} className="flex gap-5 group">
              <div
                className="w-16 h-22 rounded-xl shrink-0"
                style={{ background: `linear-gradient(160deg, ${spotlightBook.coverGradient})`, height: '88px', width: '64px' }}
              />
              <div>
                <h3 className="font-bold text-xl mb-1 group-hover:underline" style={{ color: 'var(--color-ink)' }}>
                  {spotlightBook.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--color-muted)' }}>by {spotlightBook.author}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-body)' }}>
                  {spotlightBook.summary.slice(0, 200)}…
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* Archive */}
        {archive.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-4 h-4" style={{ color: 'var(--color-muted)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>Previous Weeks</h2>
            </div>
            <div className="space-y-4">
              {archive.map(week => (
                <div
                  key={week.week}
                  className="p-5 rounded-xl flex items-center justify-between"
                  style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
                >
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--color-ink)' }}>{week.theme}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{week.week}</p>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>Archive</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
