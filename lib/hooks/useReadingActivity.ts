'use client'
import { useEffect, useState } from 'react'

const KEY = 'nw_activity'

type ActivityMap = Record<string, number> // ISO date string -> sections opened

function computeStreaks(activity: ActivityMap) {
  const today = new Date().toISOString().slice(0, 10)
  let current = 0
  let longest = 0
  let streak = 0
  const d = new Date()

  // Walk backwards from today
  for (let i = 0; i < 365; i++) {
    const key = d.toISOString().slice(0, 10)
    if ((activity[key] ?? 0) > 0) {
      streak++
      if (key === today && current === 0) current = streak
    } else {
      if (key === today) {
        // No activity today — check yesterday
        current = 0
      }
      if (i > 0) break
    }
    d.setDate(d.getDate() - 1)
  }

  // Walk full history for longest
  const dates = Object.keys(activity).filter(k => activity[k] > 0).sort()
  let run = 0
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) { run = 1; continue }
    const prev = new Date(dates[i - 1])
    prev.setDate(prev.getDate() + 1)
    if (prev.toISOString().slice(0, 10) === dates[i]) {
      run++
    } else {
      run = 1
    }
    if (run > longest) longest = run
  }
  if (run > longest) longest = run

  // currentStreak: consecutive days up through today
  const today2 = new Date()
  current = 0
  for (let i = 0; i < 365; i++) {
    const k = today2.toISOString().slice(0, 10)
    if ((activity[k] ?? 0) > 0) {
      current++
    } else if (i > 0) {
      break
    }
    today2.setDate(today2.getDate() - 1)
  }

  return { currentStreak: current, longestStreak: Math.max(longest, current) }
}

export function useReadingActivity() {
  const [activity, setActivity] = useState<ActivityMap>({})

  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored) setActivity(JSON.parse(stored))
  }, [])

  function recordActivity(count = 1) {
    const today = new Date().toISOString().slice(0, 10)
    setActivity(prev => {
      const next = { ...prev, [today]: (prev[today] ?? 0) + count }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function getWeeks(n = 12): { date: string; count: number }[][] {
    const result: { date: string; count: number }[][] = []
    const now = new Date()
    const dayOfWeek = now.getDay()
    const startDate = new Date(now)
    startDate.setDate(now.getDate() - dayOfWeek - (n - 1) * 7)

    for (let w = 0; w < n; w++) {
      const week: { date: string; count: number }[] = []
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + w * 7 + d)
        const key = date.toISOString().slice(0, 10)
        week.push({ date: key, count: activity[key] ?? 0 })
      }
      result.push(week)
    }
    return result
  }

  const { currentStreak, longestStreak } = computeStreaks(activity)

  return { activity, recordActivity, getWeeks, currentStreak, longestStreak }
}
