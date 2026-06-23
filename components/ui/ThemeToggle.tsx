'use client'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/hooks/useTheme'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
      style={{
        backgroundColor: 'var(--color-canvas)',
        borderColor: 'var(--color-hairline)',
        color: 'var(--color-muted)',
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </motion.button>
  )
}
