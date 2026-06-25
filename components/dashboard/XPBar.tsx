'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useXP } from '@/lib/hooks/useXP'

export default function XPBar() {
  const { xp, level, levelPct, toasts } = useXP()

  return (
    <div className="relative mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
        >
          {level.name}
        </span>
        <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {xp.toLocaleString()} XP
          {level.needed && (
            <> · {(level.needed - level.current).toLocaleString()} to next level</>
          )}
        </span>
      </div>

      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-hairline)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'var(--color-coral)' }}
          animate={{ width: `${levelPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* XP Toast notifications */}
      <div className="absolute -top-8 left-0 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.span
              key={toast.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -32 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8 }}
              className="inline-block text-xs font-semibold mr-2"
              style={{ color: 'var(--color-coral)' }}
            >
              +{toast.amount} XP
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
