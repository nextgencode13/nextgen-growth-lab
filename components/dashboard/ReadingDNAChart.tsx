'use client'
import { useMemo } from 'react'
import { useBookmarks } from '@/lib/hooks/useBookmarks'
import { useSavedQuotes } from '@/lib/hooks/useSavedQuotes'
import { useReadingActivity } from '@/lib/hooks/useReadingActivity'
import { computeReadingDNA } from '@/lib/utils/readingDNA'
import { books } from '@/lib/data/books'

const DIMS = ['Depth', 'Breadth', 'Consistency', 'Speed', 'Curiosity']
const TOTAL_CATEGORIES = 9

function polarToXY(angle: number, r: number, cx: number, cy: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function buildPolygon(scores: number[], size: number, cx: number, cy: number): string {
  const n = scores.length
  return scores
    .map((s, i) => {
      const angle = (360 / n) * i
      const r = (s / 100) * size
      const { x, y } = polarToXY(angle, r, cx, cy)
      return `${x},${y}`
    })
    .join(' ')
}

export default function ReadingDNAChart() {
  const { wantToRead, currentlyReading, finished, statusMap } = useBookmarks()
  const { quotes } = useSavedQuotes()
  const { currentStreak } = useReadingActivity()

  const finishedBooks = finished.map(s => books.find(b => b.slug === s)).filter(Boolean)
  const uniqueCategories = new Set(finishedBooks.map(b => b!.category)).size

  const notesCount = useMemo(() => {
    try {
      const notes = JSON.parse(localStorage.getItem('nw_notes') ?? '{}')
      return Object.values(notes as Record<string, string>).filter(v => v.trim().length > 0).length
    } catch { return 0 }
  }, [])

  const quizzesTaken = useMemo(() => {
    try {
      const scores = JSON.parse(localStorage.getItem('nw_quiz_scores') ?? '{}')
      return Object.keys(scores).length
    } catch { return 0 }
  }, [])

  const flashcardDecks = useMemo(() => {
    try {
      const mastery = JSON.parse(localStorage.getItem('nw_flashcard_mastery') ?? '{}')
      return Object.values(mastery as Record<string, number>).filter(v => v >= 5).length
    } catch { return 0 }
  }, [])

  const dna = computeReadingDNA({
    wantCount: wantToRead.length,
    readingCount: currentlyReading.length,
    finishedCount: finished.length,
    currentStreak,
    uniqueCategories,
    totalCategories: TOTAL_CATEGORIES,
    quotesCount: quotes.length,
    notesCount,
    quizzesTaken,
    flashcardDecks,
    weeklySessionsAvg: Math.min(currentStreak / 7, 7),
  })

  const scores = [dna.depth, dna.breadth, dna.consistency, dna.speed, dna.curiosity]
  const cx = 110
  const cy = 110
  const size = 90
  const n = scores.length

  const maxPolygon = buildPolygon(Array(n).fill(100), size, cx, cy)
  const scorePolygon = buildPolygon(scores, size, cx, cy)

  return (
    <section>
      <h2
        className="text-2xl font-normal mb-6"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        Reading DNA
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* SVG Radar */}
        <svg width="220" height="220" viewBox="0 0 220 220" className="flex-shrink-0">
          {/* Grid rings */}
          {[25, 50, 75, 100].map(pct => (
            <polygon
              key={pct}
              points={buildPolygon(Array(n).fill(pct), size, cx, cy)}
              fill="none"
              stroke="var(--color-hairline)"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          {Array.from({ length: n }, (_, i) => {
            const angle = (360 / n) * i
            const { x, y } = polarToXY(angle, size, cx, cy)
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--color-hairline)" strokeWidth="1" />
          })}

          {/* Score polygon */}
          <polygon
            points={scorePolygon}
            fill="var(--color-coral)"
            fillOpacity="0.25"
            stroke="var(--color-coral)"
            strokeWidth="2"
          />

          {/* Labels */}
          {DIMS.map((dim, i) => {
            const angle = (360 / n) * i
            const { x, y } = polarToXY(angle, size + 20, cx, cy)
            return (
              <text
                key={dim}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="var(--color-muted)"
                fontFamily="var(--font-sans)"
              >
                {dim}
              </text>
            )
          })}
        </svg>

        {/* Personality text */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>
            Your Reading Profile
          </p>
          <h3
            className="text-2xl font-normal mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            {dna.personalityLabel}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-body)' }}>
            {dna.personalityDescription}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {DIMS.map((dim, i) => (
              <div key={dim}>
                <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-body)' }}>
                  <span>{dim}</span>
                  <span>{scores[i]}%</span>
                </div>
                <div className="h-1 rounded-full" style={{ backgroundColor: 'var(--color-hairline)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${scores[i]}%`, backgroundColor: 'var(--color-coral)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
