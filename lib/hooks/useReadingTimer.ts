'use client'
import { useEffect, useRef } from 'react'

const KEY = 'nw_reading_time'

type TimeMap = Record<string, number>

export function getAllReadingTimes(): TimeMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function getBookReadingTime(slug: string): number {
  return getAllReadingTimes()[slug] ?? 0
}

export function useReadingTimer(slug: string) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const accRef = useRef(0)

  useEffect(() => {
    if (!slug) return

    function startTimer() {
      if (document.hidden) return
      intervalRef.current = setInterval(() => {
        accRef.current += 1
        if (accRef.current % 10 === 0) {
          try {
            const times: TimeMap = JSON.parse(localStorage.getItem(KEY) ?? '{}')
            times[slug] = (times[slug] ?? 0) + 10
            localStorage.setItem(KEY, JSON.stringify(times))
          } catch {}
        }
      }, 1000)
    }

    function stopTimer() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (accRef.current > 0) {
        try {
          const times: TimeMap = JSON.parse(localStorage.getItem(KEY) ?? '{}')
          times[slug] = (times[slug] ?? 0) + (accRef.current % 10)
          localStorage.setItem(KEY, JSON.stringify(times))
        } catch {}
        accRef.current = 0
      }
    }

    function handleVisibility() {
      if (document.hidden) stopTimer()
      else startTimer()
    }

    startTimer()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      stopTimer()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [slug])
}
