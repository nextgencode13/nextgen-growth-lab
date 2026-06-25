'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SpikeMarkIcon from '@/components/ui/SpikeMarkIcon'
import ThemeToggle from '@/components/ui/ThemeToggle'

const links = [
  { href: '/',          label: 'Home' },
  { href: '/search',    label: 'Books' },
  { href: '/daily',     label: 'Daily' },
  { href: '/mood',      label: 'Mood' },
  { href: '/insights',  label: 'Insights' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/compare',   label: 'Compare' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          height: '64px',
          backgroundColor: 'var(--color-canvas)',
          borderBottom: scrolled ? '1px solid var(--color-hairline)' : '1px solid transparent',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <SpikeMarkIcon size={14} color="var(--color-coral)" />
            <span
              className="font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)', fontSize: '15px' }}
            >
              NextGen<span style={{ color: 'var(--color-coral)' }}>Wisdom</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/search"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-[8px] transition-colors"
              style={{ backgroundColor: 'var(--color-coral)', color: '#fff', fontFamily: 'var(--font-sans)' }}
            >
              <BookOpen size={14} />
              Explore Books
            </Link>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md"
              style={{ color: 'var(--color-ink)' }}
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-16 left-0 right-0 shadow-xl"
              style={{ backgroundColor: 'var(--color-canvas)', borderBottom: '1px solid var(--color-hairline)' }}
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col p-4 gap-1">
                {links.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 rounded-md text-sm font-medium"
                    style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/search"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-[8px]"
                  style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
                >
                  <BookOpen size={14} />
                  Explore Books
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
