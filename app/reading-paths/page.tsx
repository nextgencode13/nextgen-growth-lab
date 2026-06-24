import type { Metadata } from 'next'
import { readingPaths } from '@/lib/data/readingPaths'
import ReadingPathCard from '@/components/ReadingPathCard'

export const metadata: Metadata = {
  title: 'Reading Paths | NextGen Wisdom',
  description: 'Curated learning tracks — read books in the right order to master any domain.',
}

export default function ReadingPathsPage() {
  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-10">
          <h1
            className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Reading Paths
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            Curated sequences of books to read in order — like a learning curriculum built for real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {readingPaths.map((path, i) => (
            <ReadingPathCard key={path.id} path={path} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
