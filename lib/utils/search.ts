import type { Book } from '@/lib/types'

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

export interface ScoredBook {
  book: Book
  score: number
  matchedTag?: string
}

export function scoreSearch(query: string, books: Book[]): ScoredBook[] {
  if (!query.trim()) return books.map(b => ({ book: b, score: 0 }))

  const q = query.toLowerCase().trim()

  return books.map(book => {
    let score = 0
    let matchedTag: string | undefined

    const titleLower = book.title.toLowerCase()
    const authorLower = book.author.toLowerCase()

    if (titleLower === q) score += 100
    else if (titleLower.includes(q)) score += 60

    if (authorLower.includes(q)) score += 50

    for (const tag of book.tags) {
      const tagLower = tag.toLowerCase()
      if (tagLower === q || tagLower.includes(q) || q.includes(tagLower)) {
        score += 40
        if (!matchedTag) matchedTag = tag
      }
    }

    if (book.keyInsight.toLowerCase().includes(q)) score += 20
    if (book.category.toLowerCase().includes(q)) score += 30

    const words = q.split(' ')
    for (const word of words) {
      if (word.length > 3) {
        for (const tag of book.tags) {
          if (levenshtein(word, tag.toLowerCase()) <= 2) {
            score += 30
            if (!matchedTag) matchedTag = tag
          }
        }
        if (levenshtein(word, titleLower.split(' ')[0]) <= 2) score += 20
      }
    }

    return { book, score, matchedTag }
  })
}
