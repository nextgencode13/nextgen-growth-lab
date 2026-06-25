'use client'
import { useState, useEffect } from 'react'

const KEY = 'nw_daily_seen'

interface DailyData {
  seenDays: string[]
  startDate: string
}

export function useDailyProgress() {
  const [seenDays, setSeenDays] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string>('')

  useEffect(() => {
    try {
      const stored: DailyData = JSON.parse(localStorage.getItem(KEY) ?? '{}')
      const today = new Date().toISOString().slice(0, 10)
      if (!stored.startDate) {
        const init: DailyData = { seenDays: [], startDate: today }
        localStorage.setItem(KEY, JSON.stringify(init))
        setStartDate(today)
      } else {
        setSeenDays(stored.seenDays ?? [])
        setStartDate(stored.startDate)
      }
    } catch {}
  }, [])

  function markSeen(dayIndex: number) {
    const key = String(dayIndex)
    if (seenDays.includes(key)) return
    const next = [...seenDays, key]
    setSeenDays(next)
    try {
      const stored: DailyData = JSON.parse(localStorage.getItem(KEY) ?? '{}')
      stored.seenDays = next
      localStorage.setItem(KEY, JSON.stringify(stored))
    } catch {}
  }

  function getDayIndex(): number {
    if (!startDate) return 0
    const start = new Date(startDate)
    const now = new Date()
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff % 90
  }

  const dayIndex = getDayIndex()
  const journeyDay = startDate
    ? Math.floor((new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 1

  return {
    seenDays,
    markSeen,
    isSeen: (idx: number) => seenDays.includes(String(idx)),
    dayIndex,
    journeyDay,
    startDate,
  }
}
