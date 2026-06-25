import type { Metadata } from 'next'
import { insightThreads } from '@/lib/data/insights'
import ThreadCard from '@/components/insights/ThreadCard'

export const metadata: Metadata = {
  title: 'Insight Threads',
  description: 'Cross-book narratives connecting ideas across the world\'s most influential books.',
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-normal tracking-[-0.03em] mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Insight Threads
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            Cross-book narratives — how the greatest ideas connect across multiple books
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {insightThreads.map(thread => (
            <ThreadCard key={thread.slug} thread={thread} />
          ))}
        </div>
      </div>
    </div>
  )
}
