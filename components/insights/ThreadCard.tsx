import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import type { InsightThread } from '@/lib/types'

export default function ThreadCard({ thread }: { thread: InsightThread }) {
  return (
    <Link
      href={`/insights/${thread.slug}`}
      className="block rounded-[16px] p-6 transition-all hover:scale-[1.01] hover:shadow-lg"
      style={{
        backgroundColor: 'var(--color-surface-dark)',
        border: '1px solid var(--color-surface-dark-elevated)',
        textDecoration: 'none',
      }}
    >
      {/* Book count badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
        >
          <BookOpen size={10} />
          {thread.books.length} books
        </span>
        <span className="text-xs" style={{ color: 'var(--color-on-dark-soft)' }}>
          {new Date(thread.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      <h2
        className="text-2xl font-normal leading-tight mb-2"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-on-dark)' }}
      >
        {thread.title}
      </h2>

      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-on-dark-soft)' }}>
        {thread.subtitle}
      </p>

      {/* Pull quote preview */}
      <blockquote
        className="text-sm italic leading-relaxed mb-4 pl-3 border-l-2 line-clamp-2"
        style={{ color: 'var(--color-on-dark-soft)', borderColor: 'var(--color-coral)' }}
      >
        {thread.pullQuotes[0]?.text}
      </blockquote>

      <span
        className="flex items-center gap-1 text-sm font-medium"
        style={{ color: 'var(--color-coral)' }}
      >
        Read thread <ArrowRight size={14} />
      </span>
    </Link>
  )
}
