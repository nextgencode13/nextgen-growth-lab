'use client'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = stored ?? preferred
    applyTheme(initial)
    setTheme(initial)
  }, [])

  function applyTheme(t: Theme) {
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
    localStorage.setItem('theme', next)
  }

  return { theme, toggle, isDark: theme === 'dark' }
}
