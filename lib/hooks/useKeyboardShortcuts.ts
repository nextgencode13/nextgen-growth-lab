'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useKeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      // Don't fire when user is typing in inputs
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      switch (e.key) {
        case '/':
          e.preventDefault()
          router.push('/search')
          setTimeout(() => {
            const input = document.querySelector<HTMLInputElement>('input[type="search"], input[placeholder*="search" i], input[placeholder*="Search" i]')
            input?.focus()
          }, 150)
          break
        case 'd':
        case 'D':
          if (!e.metaKey && !e.ctrlKey) router.push('/dashboard')
          break
        case 't':
        case 'T':
          if (!e.metaKey && !e.ctrlKey) {
            document.querySelector<HTMLButtonElement>('[data-theme-toggle]')?.click()
          }
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [router])
}
