import type { Metadata } from 'next'
import { concepts } from '@/lib/data/concepts'
import ConceptCard from '@/components/ConceptCard'

export const metadata: Metadata = {
  title: 'Concept Dictionary',
  description: 'Explore key ideas from the world\'s best books — cross-book knowledge connections.',
}

const allTags = Array.from(new Set(concepts.flatMap(c => c.tags))).sort()

export default function ConceptsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-canvas)' }}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--color-coral)' }}>
            Cross-Book Knowledge
          </p>
          <h1
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}
          >
            Concept Dictionary
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            The biggest ideas that appear across multiple books — your cross-book knowledge base.
          </p>
        </div>

        {/* Tag filter pills (static display) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full font-medium capitalize"
              style={{ background: 'var(--color-surface-soft)', color: 'var(--color-muted)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Concepts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map(concept => (
            <ConceptCard key={concept.slug} concept={concept} />
          ))}
        </div>
      </div>
    </div>
  )
}
