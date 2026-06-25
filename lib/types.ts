export interface Lesson {
  icon: string
  title: string
  body: string
  application: string
}

export interface Quote {
  text: string
  context: string
}

export interface Book {
  id: string
  slug: string
  title: string
  author: string
  category: string
  rating: number
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  coverGradient: string
  coverAccent: string
  summary: string
  keyInsight: string
  lessons: Lesson[]
  actionSteps: string[]
  quotes: Quote[]
  relatedBooks: string[]
  tags: string[]
  publishYear: number
}

export type Category = {
  name: string
  icon: string
  count: number
  gradient: string
}

export interface SummarySubsection {
  heading: string
  points: string[]
}

export interface SummarySection {
  title: string
  emoji: string
  points: string[]
  subsections?: SummarySubsection[]
}

export type ReadingStatus = 'want' | 'reading' | 'finished'

export interface ReadingStatusEntry {
  status: ReadingStatus
  updatedAt: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  sectionRef: string
}

export interface FlashCard {
  front: string
  back: string
}

export interface ReadingPathBook {
  slug: string
  note: string
}

export interface ReadingPath {
  id: string
  title: string
  emoji: string
  tagline: string
  gradient: string
  accent: string
  books: ReadingPathBook[]
  estimatedTime: string
}

export interface Author {
  slug: string
  name: string
  bio: string
  philosophy: string
  books: string[]
  birthYear?: number
  nationality: string
}

export interface ConceptBook {
  slug: string
  angle: string
}

export interface Concept {
  slug: string
  name: string
  emoji: string
  definition: string
  tags: string[]
  books: ConceptBook[]
}

export interface DigestWeek {
  week: string
  theme: string
  quote: { text: string; book: string; author: string }
  concept: { title: string; body: string }
  challenge: string
  spotlight: string
}

export interface SavedQuote {
  text: string
  context: string
  bookSlug: string
  bookTitle: string
  savedAt: string
}

// F-01 Badge Achievement System
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  gradient: string
}

// F-08 Cross-Book Insight Threads
export interface InsightThread {
  slug: string
  title: string
  subtitle: string
  books: string[]
  body: string
  pullQuotes: { text: string; bookSlug: string }[]
  publishedDate: string
}

// F-11 One Idea a Day Feed
export type DailyCardType = 'quote' | 'insight' | 'action'
export interface DailyItem {
  type: DailyCardType
  content: string
  source: string
  bookSlug: string
  dayIndex: number
}

// F-20 Reading DNA Profile
export interface ReadingDNAScore {
  depth: number
  breadth: number
  consistency: number
  speed: number
  curiosity: number
  personalityLabel: string
  personalityDescription: string
}
