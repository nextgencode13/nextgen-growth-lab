import { books } from '@/lib/data/books'

export interface NoteEntry {
  bookSlug: string
  content: string
}

export function exportNotesAsMarkdown(notes: NoteEntry[]): string {
  const lines: string[] = ['# My NextGen Wisdom Notes\n']

  for (const note of notes) {
    if (!note.content.trim()) continue
    const book = books.find(b => b.slug === note.bookSlug)
    const title = book?.title ?? note.bookSlug
    const author = book?.author ?? ''
    lines.push(`## ${title}`)
    if (author) lines.push(`> ${author}`)
    lines.push('---')
    lines.push(note.content.trim())
    lines.push('')
  }

  return lines.join('\n')
}

export function downloadMarkdown(content: string, filename = 'my-notes.md') {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
