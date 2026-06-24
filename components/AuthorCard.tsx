'use client'
import Link from 'next/link'
import type { Author } from '@/lib/types'

export default function AuthorCard({ author }: { author: Author }) {
  const initials = author.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <Link
      href={`/authors/${author.slug}`}
      className="block rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-coral), #f97316)' }}
        >
          {initials}
        </div>
        <div>
          <h3 className="font-semibold text-base" style={{ color: 'var(--color-ink)' }}>{author.name}</h3>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{author.nationality}{author.birthYear ? ` · b. ${author.birthYear}` : ''}</p>
        </div>
      </div>
      <p className="text-sm italic line-clamp-2" style={{ color: 'var(--color-muted)' }}>
        &ldquo;{author.philosophy}&rdquo;
      </p>
      <p className="mt-3 text-xs" style={{ color: 'var(--color-muted)' }}>
        {author.books.length} book{author.books.length !== 1 ? 's' : ''} on platform
      </p>
    </Link>
  )
}
