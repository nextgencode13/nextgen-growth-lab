'use client'
import { useEffect, useState, useCallback } from 'react'

const KEY = 'nw_notes'

type NotesMap = Record<string, string>

export function useNotes(slug: string) {
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    if (stored) {
      const map: NotesMap = JSON.parse(stored)
      setNote(map[slug] ?? '')
    }
  }, [slug])

  const save = useCallback(
    (value: string) => {
      const stored = localStorage.getItem(KEY)
      const map: NotesMap = stored ? JSON.parse(stored) : {}
      map[slug] = value
      localStorage.setItem(KEY, JSON.stringify(map))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    },
    [slug]
  )

  function onChange(value: string) {
    setNote(value)
    if (timer) clearTimeout(timer)
    setTimer(setTimeout(() => save(value), 1500))
  }

  function getAllNotes(): NotesMap {
    const stored = localStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : {}
  }

  return { note, onChange, saved, getAllNotes }
}
