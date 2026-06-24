'use client'
import { useState, useEffect, useRef } from 'react'
import { Check, Copy, FileText } from 'lucide-react'
import { useNotes } from '@/lib/hooks/useNotes'

export default function PersonalNotes({ bookSlug, bookTitle }: { bookSlug: string; bookTitle: string }) {
  const { note: value, onChange, saved } = useNotes(bookSlug)
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(180, el.scrollHeight)}px`
  }, [value])

  async function copy() {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0

  return (
    <div className="py-16" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-[800px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-surface-card)' }}
          >
            <FileText size={16} style={{ color: 'var(--color-coral)' }} />
          </div>
          <h2
            className="text-2xl font-normal tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            My Notes — {bookTitle}
          </h2>
        </div>

        <div
          className="rounded-[12px] border overflow-hidden"
          style={{ borderColor: 'var(--color-hairline)', backgroundColor: 'var(--color-canvas)' }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={`Write your thoughts, insights, and takeaways from ${bookTitle}...\n\nThis is your personal space — saved automatically.`}
            className="w-full p-5 bg-transparent resize-none outline-none text-sm leading-relaxed"
            style={{
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-sans)',
              minHeight: '200px',
            }}
          />

          <div
            className="flex items-center justify-between px-5 py-3 border-t"
            style={{ borderColor: 'var(--color-hairline)', backgroundColor: 'var(--color-surface-card)' }}
          >
            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-muted-soft)' }}>
              <span>{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
              {saved && (
                <span className="flex items-center gap-1" style={{ color: '#34d399' }}>
                  <Check size={12} />
                  Saved
                </span>
              )}
            </div>
            <button
              onClick={copy}
              disabled={!value}
              className="flex items-center gap-1.5 text-xs disabled:opacity-40 transition-all"
              style={{ color: copied ? '#34d399' : 'var(--color-muted-soft)' }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy notes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
