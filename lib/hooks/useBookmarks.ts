'use client'
import { useEffect, useState } from 'react'

const KEY = 'nw_bookmarks'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored) setBookmarks(JSON.parse(stored))
  }, [])

  function toggle(slug: string) {
    setBookmarks(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function isBookmarked(slug: string) {
    return bookmarks.includes(slug)
  }

  return { bookmarks, toggle, isBookmarked }
}
