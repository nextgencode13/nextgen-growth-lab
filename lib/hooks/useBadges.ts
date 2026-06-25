'use client'
import { useMemo } from 'react'
import { badges } from '@/lib/data/badges'
import { useBookmarks } from '@/lib/hooks/useBookmarks'
import { useSavedQuotes } from '@/lib/hooks/useSavedQuotes'
import { useReadingActivity } from '@/lib/hooks/useReadingActivity'
import { books } from '@/lib/data/books'

export interface EarnedBadge {
  id: string
  earnedAt?: string
}

export function useBadges() {
  const { finished, currentlyReading, wantToRead, statusMap } = useBookmarks()
  const { quotes } = useSavedQuotes()
  const { currentStreak } = useReadingActivity()

  const earned = useMemo<EarnedBadge[]>(() => {
    const result: EarnedBadge[] = []
    const allInteracted = Object.keys(statusMap)
    const hour = new Date().getHours()

    const finishedBooks = finished.map(s => books.find(b => b.slug === s)).filter(Boolean)
    const uniqueCategories = new Set(finishedBooks.map(b => b!.category)).size

    if (allInteracted.length > 0 || currentlyReading.length > 0) result.push({ id: 'first-page' })
    if (finished.length >= 5) result.push({ id: 'bookworm' })
    if (finished.length >= 10) result.push({ id: 'scholar' })
    if (currentStreak >= 3) result.push({ id: 'streak-starter' })
    if (currentStreak >= 7) result.push({ id: 'on-fire' })
    if (currentStreak >= 30) result.push({ id: 'unstoppable' })
    if (uniqueCategories >= 5) result.push({ id: 'category-explorer' })
    if (quotes.length >= 10) result.push({ id: 'quote-collector' })
    if (hour >= 22 || hour < 2) result.push({ id: 'night-owl' })
    if (hour >= 5 && hour < 7) result.push({ id: 'early-bird' })

    // Check quiz scores from localStorage
    try {
      const scores: Record<string, number> = JSON.parse(localStorage.getItem('nw_quiz_scores') ?? '{}')
      const scoreValues = Object.values(scores)
      if (scoreValues.some(s => s >= 8)) result.push({ id: 'knowledge-seeker' })
      if (scoreValues.some(s => s === 10)) result.push({ id: 'perfect-score' })
    } catch {}

    // Check flashcard mastery
    try {
      const mastered: Record<string, number> = JSON.parse(localStorage.getItem('nw_flashcard_mastery') ?? '{}')
      const deckCount = Object.values(mastered).filter(v => v >= 5).length
      if (deckCount >= 3) result.push({ id: 'deep-thinker' })
    } catch {}

    // Check reading path completion
    try {
      const pathProgress: Record<string, string[]> = JSON.parse(localStorage.getItem('nw_path_progress') ?? '{}')
      const anyComplete = Object.entries(pathProgress).some(([, slugs]) => slugs.length >= 5)
      if (anyComplete) result.push({ id: 'path-finisher' })
    } catch {}

    return result
  }, [finished, currentlyReading, wantToRead, statusMap, quotes, currentStreak])

  const earnedIds = new Set(earned.map(e => e.id))

  return {
    badges,
    earned,
    earnedIds,
    isEarned: (id: string) => earnedIds.has(id),
    earnedCount: earned.length,
    totalCount: badges.length,
  }
}
