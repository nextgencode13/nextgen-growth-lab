import type { ReadingDNAScore } from '@/lib/types'

function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(v)))
}

export function computeReadingDNA(params: {
  wantCount: number
  readingCount: number
  finishedCount: number
  currentStreak: number
  uniqueCategories: number
  totalCategories: number
  quotesCount: number
  notesCount: number
  quizzesTaken: number
  flashcardDecks: number
  weeklySessionsAvg: number
}): ReadingDNAScore {
  const {
    wantCount,
    readingCount,
    finishedCount,
    currentStreak,
    uniqueCategories,
    totalCategories,
    quotesCount,
    notesCount,
    quizzesTaken,
    flashcardDecks,
    weeklySessionsAvg,
  } = params

  const started = wantCount + readingCount + finishedCount
  const depth = clamp(started > 0 ? (finishedCount / Math.max(started, 1)) * 100 : 0)
  const breadth = clamp((uniqueCategories / Math.max(totalCategories, 1)) * 100)
  const consistency = clamp((currentStreak / 30) * 100)
  const speed = clamp(weeklySessionsAvg * 20)
  const curiosity = clamp((quotesCount + notesCount * 2 + quizzesTaken * 5 + flashcardDecks * 8) / 1.5)

  const avg = (depth + breadth + consistency + speed + curiosity) / 5

  let personalityLabel = 'Curious Learner'
  let personalityDescription = "You're just getting started — every great reader began exactly where you are."

  if (avg >= 80) {
    personalityLabel = 'Philosopher King'
    personalityDescription = "You read deeply, broadly, and consistently. You don't just consume ideas — you live them."
  } else if (depth >= 70 && breadth < 40) {
    personalityLabel = 'Deep Specialist'
    personalityDescription = "You finish what you start and go deep. Consider branching into new categories to unlock your full range."
  } else if (breadth >= 70 && depth < 40) {
    personalityLabel = 'Wide Explorer'
    personalityDescription = "You love discovering new ideas across categories. Challenge yourself to finish a few books cover-to-cover."
  } else if (consistency >= 70) {
    personalityLabel = 'Habit Builder'
    personalityDescription = "Your reading streak shows remarkable discipline. That daily compound effect will take you far."
  } else if (curiosity >= 70) {
    personalityLabel = 'Active Engager'
    personalityDescription = "You don't just read — you interact, quiz, and reflect. Your retention is probably off the charts."
  } else if (avg >= 50) {
    personalityLabel = 'Steady Scholar'
    personalityDescription = "A balanced reader with room to push further in all dimensions. Keep the momentum going."
  }

  return { depth, breadth, consistency, speed, curiosity, personalityLabel, personalityDescription }
}
