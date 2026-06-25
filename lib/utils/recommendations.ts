import type { Book } from '@/lib/types'
import type { ReadingStatus } from '@/lib/types'

export interface RecommendedBook {
  book: Book
  score: number
  reason: string
}

export function getNextBooks(
  slug: string,
  books: Book[],
  statusMap: Record<string, { status: ReadingStatus }>
): RecommendedBook[] {
  const source = books.find(b => b.slug === slug)
  if (!source) return []

  return books
    .filter(b => b.slug !== slug)
    .map(b => {
      let score = 0
      const reasons: string[] = []

      const sharedTags = b.tags.filter(t => source.tags.includes(t))
      if (sharedTags.length > 0) {
        score += sharedTags.length * 3
        reasons.push(`shares the ${sharedTags[0]} theme`)
      }

      if (b.category === source.category) {
        score += 2
        reasons.push(`same ${b.category} category`)
      }

      if (b.difficulty === source.difficulty) {
        score += 1
      }

      if (statusMap[b.slug]?.status === 'finished') {
        score -= 10
      }

      return {
        book: b,
        score,
        reason: reasons[0] ?? `popular in ${b.category}`,
      }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
