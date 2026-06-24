'use client'
import { useReadingActivity } from '@/lib/hooks/useReadingActivity'

function getIntensityColor(count: number): string {
  if (count === 0) return 'var(--color-hairline)'
  if (count <= 2) return '#fca5a5'
  if (count <= 5) return '#f97316'
  if (count <= 10) return '#ea580c'
  return '#c2410c'
}

export default function StreakCalendar() {
  const { getWeeks, currentStreak, longestStreak } = useReadingActivity()
  const weeks = getWeeks(16)

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div>
      <div className="flex items-center gap-6 mb-4 text-sm">
        <div>
          <span
            className="text-2xl font-bold"
            style={{ color: 'var(--color-coral)', fontFamily: 'var(--font-serif)' }}
          >
            {currentStreak}
          </span>
          <span className="ml-1" style={{ color: 'var(--color-muted)' }}>day streak</span>
        </div>
        <div>
          <span className="font-medium" style={{ color: 'var(--color-ink)' }}>{longestStreak}</span>
          <span className="ml-1" style={{ color: 'var(--color-muted)' }}>best</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1">
            <div className="w-3 h-3" />
            {dayLabels.map((d, i) => (
              <div
                key={i}
                className="w-3 h-3 flex items-center justify-center text-[8px]"
                style={{ color: 'var(--color-muted-soft)' }}
              >
                {i % 2 === 1 ? d : ''}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {/* Month label placeholder */}
              <div className="w-3 h-3" />
              {week.map((day, di) => (
                <div
                  key={di}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getIntensityColor(day.count) }}
                  title={`${day.date}: ${day.count} section${day.count !== 1 ? 's' : ''} read`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: 'var(--color-muted-soft)' }}>
        <span>Less</span>
        {[0, 2, 5, 8, 12].map(v => (
          <div key={v} className="w-3 h-3 rounded-sm" style={{ backgroundColor: getIntensityColor(v) }} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
