import Link from 'next/link'
import SpikeMarkIcon from '@/components/ui/SpikeMarkIcon'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Browse Books', href: '/search' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Compare Books', href: '/compare' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Productivity', href: '/search?category=Productivity' },
      { label: 'Wealth', href: '/search?category=Wealth' },
      { label: 'Psychology', href: '/search?category=Psychology' },
      { label: 'Leadership', href: '/search?category=Leadership' },
    ],
  },
  {
    title: 'Popular Books',
    links: [
      { label: 'Atomic Habits', href: '/books/atomic-habits' },
      { label: 'Deep Work', href: '/books/deep-work' },
      { label: 'Zero to One', href: '/books/zero-to-one' },
      { label: 'Essentialism', href: '/books/essentialism' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Newsletter', href: '/#newsletter' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-surface-dark)' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Top */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:w-64 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <SpikeMarkIcon size={14} color="var(--color-coral)" />
              <span
                className="font-semibold"
                style={{ color: 'var(--color-on-dark)', fontSize: '15px', fontFamily: 'var(--font-sans)' }}
              >
                NextGen<span style={{ color: 'var(--color-coral)' }}>Wisdom</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-dark-soft)' }}>
              Powerful insights from the world's greatest books — beautifully designed for modern learners.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {cols.map(col => (
              <div key={col.title}>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'var(--color-on-dark-soft)', letterSpacing: '1.5px' }}
                >
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm transition-colors hover:opacity-100"
                        style={{ color: 'var(--color-on-dark-soft)', opacity: 0.8 }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid var(--color-surface-dark-elevated)', color: 'var(--color-on-dark-soft)' }}
        >
          <p>© 2026 NextGen Wisdom. All rights reserved.</p>
          <p>Built with Next.js 16 · Framer Motion · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
