'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, X } from 'lucide-react'
import {
  BookOpen, BookMarked, GraduationCap, Brain, Star, Flame, Zap, Trophy,
  Compass, Quote, Lightbulb, Map, Moon, Sunrise,
} from 'lucide-react'
import { useBadges } from '@/lib/hooks/useBadges'
import type { Badge } from '@/lib/types'

const iconMap: Record<string, React.ElementType> = {
  BookOpen, BookMarked, GraduationCap, Brain, Star, Flame, Zap, Trophy,
  Compass, Quote, Lightbulb, Map, Moon, Sunrise,
}

export default function BadgeShelf() {
  const { badges, isEarned, earnedCount, totalCount } = useBadges()
  const [selected, setSelected] = useState<Badge | null>(null)

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Trophy size={18} style={{ color: 'var(--color-coral)' }} />
          <h2
            className="text-2xl font-normal"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Achievements
          </h2>
        </div>
        <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {earnedCount}/{totalCount} earned
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
        {badges.map((badge, i) => {
          const earned = isEarned(badge.id)
          const Icon = iconMap[badge.icon] ?? Star

          return (
            <motion.button
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              onClick={() => earned && setSelected(badge)}
              className="flex flex-col items-center gap-1.5 group"
              disabled={!earned}
            >
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: earned
                      ? `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`
                      : 'var(--color-surface-card)',
                    backgroundImage: earned
                      ? `linear-gradient(135deg, ${getBadgeColors(badge.gradient)})`
                      : undefined,
                    filter: earned ? 'none' : 'grayscale(1)',
                    opacity: earned ? 1 : 0.4,
                    boxShadow: earned ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  <Icon size={20} color={earned ? '#fff' : 'var(--color-muted)'} />
                </div>
                {!earned && (
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-surface-card)', border: '1px solid var(--color-hairline)' }}
                  >
                    <Lock size={8} style={{ color: 'var(--color-muted)' }} />
                  </div>
                )}
              </div>
              <p
                className="text-[10px] text-center leading-tight"
                style={{ color: earned ? 'var(--color-ink)' : 'var(--color-muted)', maxWidth: '56px' }}
              >
                {badge.name}
              </p>
            </motion.button>
          )
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-[16px] p-8 w-full max-w-sm text-center relative"
              style={{ backgroundColor: 'var(--color-canvas)', border: '1px solid var(--color-hairline)' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4"
                style={{ color: 'var(--color-muted)' }}
              >
                <X size={16} />
              </button>

              {(() => {
                const Icon = iconMap[selected.icon] ?? Star
                return (
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundImage: `linear-gradient(135deg, ${getBadgeColors(selected.gradient)})` }}
                  >
                    <Icon size={36} color="#fff" />
                  </div>
                )
              })()}

              <h3
                className="text-2xl font-normal mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                {selected.name}
              </h3>
              <p style={{ color: 'var(--color-muted)' }}>{selected.description}</p>
              <div
                className="mt-4 px-3 py-1.5 rounded-full inline-block text-xs font-medium"
                style={{ backgroundColor: '#34d39920', color: '#34d399' }}
              >
                Unlocked ✓
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function getBadgeColors(gradient: string): string {
  const map: Record<string, string> = {
    'from-sky-400 to-blue-500': '#38bdf8, #3b82f6',
    'from-emerald-400 to-green-600': '#34d399, #16a34a',
    'from-violet-400 to-purple-600': '#a78bfa, #9333ea',
    'from-amber-400 to-orange-500': '#fbbf24, #f97316',
    'from-yellow-300 to-amber-500': '#fde047, #f59e0b',
    'from-orange-400 to-red-500': '#fb923c, #ef4444',
    'from-red-400 to-rose-600': '#f87171, #e11d48',
    'from-coral-400 to-pink-600': '#f97316, #db2777',
    'from-teal-400 to-cyan-600': '#2dd4bf, #0891b2',
    'from-pink-400 to-rose-500': '#f472b6, #f43f5e',
    'from-indigo-400 to-blue-600': '#818cf8, #2563eb',
    'from-lime-400 to-green-600': '#a3e635, #16a34a',
    'from-slate-500 to-indigo-700': '#64748b, #4338ca',
    'from-amber-300 to-orange-400': '#fcd34d, #fb923c',
  }
  return map[gradient] ?? '#f97316, #ef4444'
}
