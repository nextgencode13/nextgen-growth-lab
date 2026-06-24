import { notFound } from 'next/navigation'
import { books } from '@/lib/data/books'
import { bookSummaries } from '@/lib/data/summaries'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }))
}

export default async function PrintPage({ params }: PageProps) {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) notFound()

  const sections = bookSummaries[slug] ?? []

  return (
    <div className="print-page max-w-3xl mx-auto px-8 py-12">
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          body { background: white; color: black; }
          h1, h2 { page-break-after: avoid; }
          .section-block { page-break-inside: avoid; }
        }
        @media screen {
          body { background: #f9f9f7; }
        }
      `}</style>

      <div className="no-print mb-6 flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-black text-white cursor-pointer"
        >
          Print / Save PDF
        </button>
        <a href={`/books/${slug}`} className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300">
          ← Back
        </a>
      </div>

      <header className="mb-10 border-b pb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">NextGen Wisdom · Book Summary</p>
        <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-600">by {book.author}</p>
        <p className="mt-3 text-sm text-gray-500">{book.readTime} read · {book.category} · ★ {book.rating}</p>
        <p className="mt-4 text-gray-700">{book.summary}</p>
      </header>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="section-block">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>{section.emoji}</span>
              <span>{section.title}</span>
            </h2>
            <ul className="space-y-2">
              {section.points.map((point, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="text-gray-400 mt-0.5 shrink-0">·</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <footer className="mt-12 pt-8 border-t text-xs text-gray-400 text-center">
        Printed from NextGen Wisdom · nextgen-wisdom.app · {new Date().getFullYear()}
      </footer>
    </div>
  )
}
