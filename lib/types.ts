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
