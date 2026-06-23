import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/components/ui/ThemeProvider'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | NextGen Wisdom',
    default: "NextGen Wisdom — Read the World's Best Ideas in Minutes",
  },
  description:
    'Discover powerful insights from the most influential books ever written. Beautiful, concise summaries designed to make you wiser in minutes.',
  keywords: ['book summaries', 'self improvement', 'learning', 'productivity', 'business books'],
  openGraph: {
    type: 'website',
    siteName: 'NextGen Wisdom',
    title: "NextGen Wisdom — Read the World's Best Ideas in Minutes",
    description:
      'Discover powerful insights from the most influential books ever written.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NextGen Wisdom — Read the World's Best Ideas in Minutes",
    description:
      'Discover powerful insights from the most influential books ever written.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-sans)' }}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
