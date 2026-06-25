'use client'
import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { books } from '@/lib/data/books'
import { getAllReadingTimes } from '@/lib/hooks/useReadingTimer'

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const mins = Math.floor(seconds / 60)
  if (mins < 60) return `${mins}m`
  return `${Math.floor(mins / 60)}h ${mins % 60}m`
}

export default function ReadingTimeChart() {
  const [times, setTimes] = useState<Record<string, number>>({})

  useEffect(() => {
    setTimes(getAllReadingTimes())
  }, [])

  const entries = Object.entries(times)
    .map(([slug, secs]) => ({ slug, secs, book: books.find(b => b.slug === slug) }))
    .filter(e => e.book)
    .sort((a, b) => b.secs - a.secs)
    .slice(0, 8)

  const totalSeconds = Object.values(times).reduce((sum, s) => sum + s, 0)
  const maxSecs = Math.max(...entries.map(e => e.secs), 1)

  if (entries.length === 0) {
    return (
      <div className="text-center py-6" style={{ color: 'var(--color-muted)' }}>
        <Clock size={24} className="mx-auto mb-2 opacity-40" />
        <p className="text-sm">Start reading to track your time</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} style={{ color: 'var(--color-coral)' }} />
          <h3 className="text-lg font-normal" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
            Reading Time
          </h3>
        </div>
        <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Total: {formatTime(totalSeconds)}
        </span>
      </div>

      <div className="space-y-3">
        {entries.map(({ slug, secs, book }) => (
          <div key={slug}>
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-body)' }}>
              <span className="truncate max-w-[200px]">{book!.title}</span>
              <span className="ml-2 flex-shrink-0">{formatTime(secs)}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-hairline)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(secs / maxSecs) * 100}%`, backgroundColor: 'var(--color-coral)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
