'use client'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function KeyboardShortcutsProvider() {
  useKeyboardShortcuts()
  return null
}
