'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Image, X } from 'lucide-react'

interface Props {
  quote: string
  bookTitle: string
  author: string
}

type Style = 'light' | 'dark'
type Format = 'square' | 'landscape'

const STYLES: Record<Style, { bg: string; text: string; accent: string; sub: string }> = {
  light: { bg: '#fef9f0', text: '#1a1a1a', accent: '#f97316', sub: '#78716c' },
  dark: { bg: '#0f172a', text: '#f8fafc', accent: '#f97316', sub: '#94a3b8' },
}
const FORMATS: Record<Format, { w: number; h: number }> = {
  square: { w: 1080, h: 1080 },
  landscape: { w: 1200, h: 628 },
}

export default function QuoteImageGenerator({ quote, bookTitle, author }: Props) {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<Style>('light')
  const [format, setFormat] = useState<Format>('square')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number) {
    const words = text.split(' ')
    let line = ''
    const lines: string[] = []
    for (const w of words) {
      const test = line ? `${line} ${w}` : w
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line)
        line = w
      } else {
        line = test
      }
    }
    if (line) lines.push(line)
    lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineH))
    return lines.length
  }

  function renderCard() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = FORMATS[format]
    canvas.width = w
    canvas.height = h
    const s = STYLES[style]

    ctx.fillStyle = s.bg
    ctx.fillRect(0, 0, w, h)

    const pad = w * 0.1
    const maxW = w - pad * 2

    // Coral accent bar top
    ctx.fillStyle = s.accent
    ctx.fillRect(pad, pad, 4, h - pad * 2)

    // Opening quote mark
    ctx.fillStyle = s.accent
    ctx.font = `bold ${w * 0.12}px Georgia, serif`
    ctx.fillText('“', pad + 20, pad + w * 0.1)

    // Quote text
    ctx.fillStyle = s.text
    const fontSize = format === 'square' ? 52 : 42
    ctx.font = `${fontSize}px Georgia, serif`
    const linesCount = wrapText(ctx, quote, pad + 24, h * 0.3, maxW - 24, fontSize * 1.4)

    // Attribution
    const attrY = h * 0.3 + linesCount * fontSize * 1.4 + 40
    ctx.fillStyle = s.accent
    ctx.font = `bold 22px system-ui`
    ctx.fillText(bookTitle, pad + 24, attrY)
    ctx.fillStyle = s.sub
    ctx.font = `18px system-ui`
    ctx.fillText(`— ${author}`, pad + 24, attrY + 32)

    // Watermark
    ctx.fillStyle = s.sub
    ctx.font = '16px system-ui'
    ctx.fillText('nextgen-wisdom.app', w - pad - 180, h - pad)
  }

  function download() {
    renderCard()
    canvasRef.current?.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `quote-${bookTitle.toLowerCase().replace(/\s+/g, '-')}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  return (
    <>
      <button
        onClick={() => { setOpen(true); setTimeout(renderCard, 100) }}
        className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--color-muted)' }}
        title="Create image card"
      >
        <Image size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-[16px] p-6 w-full max-w-lg relative"
              style={{ backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-hairline)' }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4" style={{ color: 'var(--color-muted)' }}>
                <X size={16} />
              </button>

              <h3 className="text-xl font-normal mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                Quote Image
              </h3>

              {/* Style toggle */}
              <div className="flex gap-2 mb-3">
                {(['light', 'dark'] as Style[]).map(s => (
                  <button
                    key={s}
                    onClick={() => { setStyle(s); setTimeout(renderCard, 50) }}
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{
                      backgroundColor: style === s ? 'var(--color-coral)' : 'var(--color-surface-card)',
                      color: style === s ? '#fff' : 'var(--color-body)',
                    }}
                  >
                    {s}
                  </button>
                ))}
                <div className="w-px mx-1" style={{ backgroundColor: 'var(--color-hairline)' }} />
                {(['square', 'landscape'] as Format[]).map(f => (
                  <button
                    key={f}
                    onClick={() => { setFormat(f); setTimeout(renderCard, 50) }}
                    className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{
                      backgroundColor: format === f ? 'var(--color-ink)' : 'var(--color-surface-card)',
                      color: format === f ? '#fff' : 'var(--color-body)',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <canvas
                ref={canvasRef}
                className="w-full rounded-[8px] mb-4"
                style={{ border: '1px solid var(--color-hairline)' }}
              />

              <button
                onClick={download}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--color-coral)' }}
              >
                <Download size={14} />
                Download PNG
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
