'use client'
import Link from 'next/link'
import type { Concept } from '@/lib/types'

export default function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <Link
      href={`/concepts/${concept.slug}`}
      className="block rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{concept.emoji}</span>
        <div>
          <h3 className="font-semibold text-base" style={{ color: 'var(--color-ink)' }}>{concept.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {concept.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--color-surface-soft)', color: 'var(--color-muted)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm line-clamp-3" style={{ color: 'var(--color-muted)' }}>
        {concept.definition}
      </p>
      <p className="mt-3 text-xs font-medium" style={{ color: 'var(--color-coral)' }}>
        Appears in {concept.books.length} book{concept.books.length !== 1 ? 's' : ''}
      </p>
    </Link>
  )
}
