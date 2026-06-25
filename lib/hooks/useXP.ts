'use client'
import { useState, useEffect, useCallback } from 'react'

const KEY = 'nw_xp'

export type XPEvent =
  | 'open-book'
  | 'save-quote'
  | 'mark-reading'
  | 'mark-finished'
  | 'complete-quiz'
  | 'perfect-quiz'
  | 'complete-flashcards'
  | 'seven-day-streak'

const XP_VALUES: Record<XPEvent, number> = {
  'open-book': 5,
  'save-quote': 10,
  'mark-reading': 15,
  'mark-finished': 50,
  'complete-quiz': 30,
  'perfect-quiz': 70,
  'complete-flashcards': 25,
  'seven-day-streak': 100,
}

export const LEVELS = [
  { name: 'Novice', min: 0 },
  { name: 'Reader', min: 200 },
  { name: 'Explorer', min: 500 },
  { name: 'Scholar', min: 1000 },
  { name: 'Sage', min: 2000 },
  { name: 'Philosopher', min: 5000 },
]

export function getLevel(xp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) {
      const next = LEVELS[i + 1]
      return {
        name: LEVELS[i].name,
        current: xp - LEVELS[i].min,
        needed: next ? next.min - LEVELS[i].min : null,
        index: i,
      }
    }
  }
  return { name: 'Novice', current: xp, needed: 200, index: 0 }
}

export function useXP() {
  const [xp, setXP] = useState(0)
  const [toasts, setToasts] = useState<{ id: number; amount: number }[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (stored) setXP(parseInt(stored, 10))
    } catch {}
  }, [])

  const addXP = useCallback((event: XPEvent) => {
    const amount = XP_VALUES[event]
    setXP(prev => {
      const next = prev + amount
      try { localStorage.setItem(KEY, String(next)) } catch {}
      return next
    })
    const id = Date.now()
    setToasts(prev => [...prev, { id, amount }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2000)
  }, [])

  const level = getLevel(xp)
  const pct = level.needed ? Math.min((level.current / level.needed) * 100, 100) : 100

  return { xp, addXP, level, levelPct: pct, toasts }
}
