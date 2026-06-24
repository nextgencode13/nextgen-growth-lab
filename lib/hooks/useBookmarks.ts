'use client'
import { useEffect, useState } from 'react'
import type { ReadingStatus, ReadingStatusEntry } from '@/lib/types'

const KEY = 'nw_reading_status'
const LEGACY_KEY = 'nw_bookmarks'

type StatusMap = Record<string, ReadingStatusEntry>

export function useBookmarks() {
  const [statusMap, setStatusMap] = useState<StatusMap>({})

  useEffect(() => {
    // Migrate legacy bookmarks (simple string array) to new status map
    const stored = localStorage.getItem(KEY)
    if (stored) {
      setStatusMap(JSON.parse(stored))
    } else {
      const legacy = localStorage.getItem(LEGACY_KEY)
      if (legacy) {
        const slugs: string[] = JSON.parse(legacy)
        const migrated: StatusMap = {}
        slugs.forEach(s => {
          migrated[s] = { status: 'finished', updatedAt: new Date().toISOString() }
        })
        localStorage.setItem(KEY, JSON.stringify(migrated))
        setStatusMap(migrated)
      }
    }
  }, [])

  function setStatus(slug: string, status: ReadingStatus | null) {
    setStatusMap(prev => {
      const next = { ...prev }
      if (status === null) {
        delete next[slug]
      } else {
        next[slug] = { status, updatedAt: new Date().toISOString() }
      }
      localStorage.setItem(KEY, JSON.stringify(next))
      // Keep legacy key in sync for streak/stats code that reads nw_bookmarks
      const bookmarkSlugs = Object.keys(next)
      localStorage.setItem(LEGACY_KEY, JSON.stringify(bookmarkSlugs))
      return next
    })
  }

  function cycleStatus(slug: string) {
    const current = statusMap[slug]?.status
    if (!current) setStatus(slug, 'want')
    else if (current === 'want') setStatus(slug, 'reading')
    else if (current === 'reading') setStatus(slug, 'finished')
    else setStatus(slug, null)
  }

  function toggle(slug: string) {
    cycleStatus(slug)
  }

  function isBookmarked(slug: string) {
    return !!statusMap[slug]
  }

  function getStatus(slug: string): ReadingStatus | null {
    return statusMap[slug]?.status ?? null
  }

  // For backward compat — returns all slugs with any status
  const bookmarks = Object.keys(statusMap)

  const byStatus = (s: ReadingStatus) =>
    Object.entries(statusMap)
      .filter(([, v]) => v.status === s)
      .map(([k]) => k)

  return {
    bookmarks,
    statusMap,
    toggle,
    cycleStatus,
    setStatus,
    isBookmarked,
    getStatus,
    wantToRead: byStatus('want'),
    currentlyReading: byStatus('reading'),
    finished: byStatus('finished'),
  }
}
