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
