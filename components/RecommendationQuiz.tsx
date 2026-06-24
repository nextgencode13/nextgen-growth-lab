'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { recommendationQuestions, calculateRecommendations } from '@/lib/data/quizLogic'
import type { QuizAnswer } from '@/lib/data/quizLogic'
import { books } from '@/lib/data/books'
import BookCover from '@/components/ui/BookCover'

export default function RecommendationQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [results, setResults] = useState<string[] | null>(null)

  const q = recommendationQuestions[step]
  const total = recommendationQuestions.length

  function choose(optIdx: number) {
    setSelected(optIdx)
  }

  function next() {
    if (selected === null) return
    const newAnswers = [...answers, { questionIndex: step, optionIndex: selected }]
    setAnswers(newAnswers)
    setSelected(null)

    if (step < total - 1) {
      setStep(step + 1)
    } else {
      const recs = calculateRecommendations(newAnswers)
      setResults(recs)
    }
  }

  function reset() {
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResults(null)
  }

  const recommendedBooks = results
    ? results.map(slug => books.find(b => b.slug === slug)).filter(Boolean) as typeof books
    : []

  return (
    <div className="max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {results ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} style={{ color: 'var(--color-coral)' }} />
              <h3
                className="text-2xl font-normal"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                Your Perfect Reads
              </h3>
            </div>
            <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
              Based on your answers, we think you'll love these books:
            </p>

            <div className="space-y-4 mb-8">
              {recommendedBooks.map((book, i) => (
                <Link
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="flex gap-4 p-4 rounded-[12px] border transition-all group block"
                  style={{
                    backgroundColor: 'var(--color-canvas)',
                    borderColor: 'var(--color-hairline)',
                    textDecoration: 'none',
                  }}
                >
                  <div className="flex-shrink-0 relative">
                    <BookCover book={book} size="sm" />
                    <span
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: i === 0 ? 'var(--color-coral)' : 'var(--color-muted-soft)' }}
                    >
                      #{i + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm leading-snug mb-1" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-serif)' }}>
                      {book.title}
                    </p>
                    <p className="text-xs mb-2" style={{ color: 'var(--color-muted-soft)' }}>
                      {book.author}
                    </p>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                      {book.keyInsight}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--color-muted-soft)' }}
            >
              <RotateCcw size={14} />
              Retake quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-2 text-xs" style={{ color: 'var(--color-muted-soft)' }}>
              <span>Question {step + 1} of {total}</span>
              <span>{Math.round(((step) / total) * 100)}%</span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden mb-6"
              style={{ backgroundColor: 'var(--color-hairline)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(step / total) * 100}%`, backgroundColor: 'var(--color-coral)' }}
              />
            </div>

            <h3
              className="text-xl font-medium leading-relaxed mb-5"
              style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-serif)' }}
            >
              {q.question}
            </h3>

            <div className="space-y-2.5 mb-6">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className="w-full px-4 py-3 rounded-[8px] border text-left text-sm transition-all"
                  style={{
                    backgroundColor: selected === i ? 'var(--color-coral)' : 'var(--color-surface-card)',
                    borderColor: selected === i ? 'var(--color-coral)' : 'var(--color-hairline)',
                    color: selected === i ? '#fff' : 'var(--color-body)',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              disabled={selected === null}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-medium text-white disabled:opacity-40 transition-all"
              style={{ backgroundColor: 'var(--color-coral)' }}
            >
              {step === total - 1 ? 'Get My Recommendations' : 'Next'}
              <ChevronRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
