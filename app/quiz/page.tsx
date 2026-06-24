import type { Metadata } from 'next'
import RecommendationQuiz from '@/components/RecommendationQuiz'

export const metadata: Metadata = {
  title: 'Find Your Next Book',
  description: 'Answer 5 questions and get 3 personalized book recommendations tailored to your goals.',
}

export default function QuizPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-canvas)' }}>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--color-coral)' }}>
            Book Recommendation Quiz
          </p>
          <h1
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-ink)' }}
          >
            Find Your Next Read
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
            5 quick questions → 3 books perfectly matched to you.
          </p>
        </div>
        <RecommendationQuiz />
      </div>
    </div>
  )
}
