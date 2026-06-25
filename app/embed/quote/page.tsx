import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quote — NextGen Wisdom',
  robots: { index: false },
}

type PageProps = { searchParams: Promise<{ q?: string; book?: string; author?: string }> }

export default async function EmbedQuotePage({ searchParams }: PageProps) {
  const { q = '', book = '', author = '' } = await searchParams

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: '#fef9f0' }}
    >
      <div
        className="w-full max-w-sm rounded-[12px] p-6"
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e0d8',
          borderLeft: '4px solid #f97316',
        }}
      >
        <p
          className="text-base italic leading-relaxed mb-4"
          style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}
        >
          &ldquo;{q || 'Quote text'}&rdquo;
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold" style={{ color: '#f97316' }}>{book}</p>
            {author && <p className="text-xs" style={{ color: '#78716c' }}>— {author}</p>}
          </div>
          <p className="text-xs" style={{ color: '#a8a29e' }}>NextGen Wisdom</p>
        </div>
      </div>
    </div>
  )
}
