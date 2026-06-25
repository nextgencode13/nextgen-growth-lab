'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share2, X } from 'lucide-react'
import { useBookmarks } from '@/lib/hooks/useBookmarks'
import { useSavedQuotes } from '@/lib/hooks/useSavedQuotes'
import { useReadingActivity } from '@/lib/hooks/useReadingActivity'
import { useBadges } from '@/lib/hooks/useBadges'
import { books } from '@/lib/data/books'

export default function ShareProgressCard() {
  const [open, setOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { finished } = useBookmarks()
  const { quotes } = useSavedQuotes()
  const { currentStreak } = useReadingActivity()
  const { earnedCount } = useBadges()

  function renderCard() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 420

    // Background
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, 800, 420)

    // Coral accent bar
    ctx.fillStyle = '#f97316'
    ctx.fillRect(0, 0, 6, 420)

    // Headline
    ctx.fillStyle = '#f97316'
    ctx.font = 'bold 13px system-ui'
    ctx.fillText('MY NEXTGEN WISDOM JOURNEY', 40, 48)

    // Stats grid
    const stats = [
      { label: 'Books Finished', value: String(finished.length) },
      { label: 'Day Streak', value: String(currentStreak || 1) },
      { label: 'Quotes Saved', value: String(quotes.length) },
      { label: 'Badges Earned', value: String(earnedCount) },
    ]
    stats.forEach((s, i) => {
      const x = 40 + i * 185
      const y = 100
      ctx.fillStyle = '#1e293b'
      ctx.beginPath()
      ctx.roundRect(x, y, 168, 100, 8)
      ctx.fill()
      ctx.fillStyle = '#f97316'
      ctx.font = 'bold 36px system-ui'
      ctx.fillText(s.value, x + 16, y + 52)
      ctx.fillStyle = '#94a3b8'
      ctx.font = '12px system-ui'
      ctx.fillText(s.label, x + 16, y + 76)
    })

    // Books row
    const recentFinished = finished.slice(-3).map(s => books.find(b => b.slug === s)).filter(Boolean)
    recentFinished.forEach((book, i) => {
      const x = 40 + i * 140
      const y = 230
      const [c1, c2] = getGradientColors(book!.coverGradient)
      const grad = ctx.createLinearGradient(x, y, x, y + 80)
      grad.addColorStop(0, c1)
      grad.addColorStop(1, c2)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.roundRect(x, y, 120, 80, 6)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.font = 'bold 10px system-ui'
      const title = book!.title.length > 18 ? book!.title.slice(0, 18) + '…' : book!.title
      ctx.fillText(title, x + 8, y + 52)
    })

    // Footer
    ctx.fillStyle = '#475569'
    ctx.font = '11px system-ui'
    ctx.fillText('nextgen-wisdom.app', 40, 400)
    ctx.fillStyle = '#334155'
    ctx.font = '11px system-ui'
    ctx.fillText(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), 660, 400)
  }

  function download() {
    renderCard()
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'my-reading-journey.png'
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  async function share() {
    renderCard()
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.toBlob(async blob => {
      if (!blob) return
      try {
        const file = new File([blob], 'reading-journey.png', { type: 'image/png' })
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'My NextGen Wisdom Journey' })
        } else {
          download()
        }
      } catch {}
    }, 'image/png')
  }

  return (
    <>
      <button
        onClick={() => { setOpen(true); setTimeout(renderCard, 100) }}
        className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium border transition-all"
        style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-muted)' }}
      >
        <Share2 size={14} />
        Share My Progress
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
              className="rounded-[16px] p-6 w-full max-w-xl relative"
              style={{ backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-hairline)' }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4" style={{ color: 'var(--color-muted)' }}>
                <X size={16} />
              </button>

              <h3 className="text-xl font-normal mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                Your Progress Card
              </h3>

              <canvas
                ref={canvasRef}
                className="w-full rounded-[8px] mb-4"
                style={{ border: '1px solid var(--color-hairline)' }}
              />

              <div className="flex gap-3">
                <button
                  onClick={download}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-medium text-white"
                  style={{ backgroundColor: 'var(--color-coral)' }}
                >
                  <Download size={14} />
                  Download PNG
                </button>
                <button
                  onClick={share}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-medium border"
                  style={{ borderColor: 'var(--color-hairline)', color: 'var(--color-body)' }}
                >
                  <Share2 size={14} />
                  Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function getGradientColors(gradient: string): [string, string] {
  if (gradient.includes('orange') || gradient.includes('amber')) return ['#f97316', '#d97706']
  if (gradient.includes('blue') || gradient.includes('sky')) return ['#3b82f6', '#1d4ed8']
  if (gradient.includes('green') || gradient.includes('emerald')) return ['#10b981', '#047857']
  if (gradient.includes('violet') || gradient.includes('purple')) return ['#8b5cf6', '#6d28d9']
  if (gradient.includes('rose') || gradient.includes('pink')) return ['#f43f5e', '#be123c']
  if (gradient.includes('red')) return ['#ef4444', '#b91c1c']
  return ['#64748b', '#334155']
}
