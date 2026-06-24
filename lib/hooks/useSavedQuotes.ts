'use client'
import { useEffect, useState } from 'react'
import type { SavedQuote } from '@/lib/types'

const KEY = 'nw_saved_quotes'

export function useSavedQuotes() {
  const [quotes, setQuotes] = useState<SavedQuote[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored) setQuotes(JSON.parse(stored))
  }, [])

  function saveQuote(q: Omit<SavedQuote, 'savedAt'>) {
    setQuotes(prev => {
      const already = prev.some(s => s.text === q.text && s.bookSlug === q.bookSlug)
      if (already) return prev
      const next = [{ ...q, savedAt: new Date().toISOString() }, ...prev]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function removeQuote(text: string, bookSlug: string) {
    setQuotes(prev => {
      const next = prev.filter(q => !(q.text === text && q.bookSlug === bookSlug))
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function isSaved(text: string, bookSlug: string) {
    return quotes.some(q => q.text === text && q.bookSlug === bookSlug)
  }

  return { quotes, saveQuote, removeQuote, isSaved }
}
