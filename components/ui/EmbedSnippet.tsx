'use client'
import { useState } from 'react'
import { Code, Copy, Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface EmbedSnippetProps {
  quote: string
  book: string
  author: string
}

export default function EmbedSnippet({ quote, book, author }: EmbedSnippetProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const params = new URLSearchParams({ q: quote, book, author }).toString()
  const src = `${typeof window !== 'undefined' ? window.location.origin : ''}/embed/quote?${params}`
  const snippet = `<iframe src="${src}" width="420" height="200" frameborder="0" style="border-radius:12px;" loading="lazy" title="Quote from ${book}"></iframe>`

  function copy() {
    navigator.clipboard.writeText(snippet).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-md transition-opacity"
        style={{ color: 'var(--color-muted)' }}
        title="Get embed code"
      >
        <Code size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="rounded-[16px] p-6 w-full max-w-lg relative"
              style={{ backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-hairline)' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
                style={{ color: 'var(--color-muted)' }}
              >
                <X size={16} />
              </button>

              <h3
                className="text-lg font-normal mb-1"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                Embed this quote
              </h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
                Paste the iframe snippet into any website or blog post.
              </p>

              <pre
                className="text-xs p-4 rounded-[8px] overflow-x-auto whitespace-pre-wrap break-all mb-4"
                style={{ backgroundColor: 'var(--color-surface-card)', color: 'var(--color-body)', border: '1px solid var(--color-hairline)' }}
              >
                {snippet}
              </pre>

              <button
                onClick={copy}
                className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: copied ? '#34d399' : 'var(--color-coral)' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy snippet'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
