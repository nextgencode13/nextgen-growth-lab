'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy } from 'lucide-react'
import type { QuizQuestion } from '@/lib/types'

interface Props {
  questions: QuizQuestion[]
  bookTitle: string
  bookSlug: string
}

const SCORE_LABELS: Record<number, string> = {
  10: 'Perfect Score! You\'re a master!',
  9: 'Excellent! Near perfect!',
  8: 'Great job! Knowledge Seeker!',
  7: 'Good work! Keep learning!',
  6: 'Decent! Review a few sections.',
  5: 'Halfway there — keep going!',
}

export default function QuizCard({ questions, bookTitle, bookSlug }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [revealed, setRevealed] = useState(false)

  if (!questions.length) return null

  const q = questions[current]
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length
  const pct = Math.round((score / questions.length) * 10)
  const scoreLabel = SCORE_LABELS[pct] ?? `${score}/${questions.length} — Keep reading!`

  function choose(optIdx: number) {
    if (revealed) return
    setSelected(optIdx)
    setRevealed(true)
    setAnswers(prev => {
      const next = [...prev]
      next[current] = optIdx
      return next
    })
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      setShowResult(true)
    }
  }

  function reset() {
    setCurrent(0)
    setSelected(null)
    setAnswers(Array(questions.length).fill(null))
    setShowResult(false)
    setRevealed(false)
  }

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto text-center py-8 px-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: score >= 8 ? '#34d39920' : score >= 6 ? '#f59e0b20' : '#ef444420' }}
        >
          <Trophy size={36} style={{ color: score >= 8 ? '#34d399' : score >= 6 ? '#f59e0b' : '#ef4444' }} />
        </div>
        <h3
          className="text-3xl font-normal mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
        >
          {score}/{questions.length}
        </h3>
        <p className="text-base mb-6" style={{ color: 'var(--color-muted)' }}>
          {scoreLabel}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-[8px] text-sm font-medium text-white"
          style={{ backgroundColor: 'var(--color-coral)' }}
        >
          <RotateCcw size={14} />
          Retake Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-xs" style={{ color: 'var(--color-muted-soft)' }}>
        <span>Question {current + 1} of {questions.length}</span>
        <span>{answers.filter(a => a !== null).length} answered</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden mb-6" style={{ backgroundColor: 'var(--color-hairline)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / questions.length) * 100}%`, backgroundColor: 'var(--color-coral)' }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className="text-lg font-medium leading-relaxed mb-6"
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-serif)' }}
          >
            {q.question}
          </h3>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = i === q.correctIndex
              let bg = 'var(--color-surface-card)'
              let border = 'var(--color-hairline)'
              let color = 'var(--color-body)'

              if (revealed) {
                if (isCorrect) { bg = '#34d39920'; border = '#34d399'; color = '#059669' }
                else if (isSelected) { bg = '#ef444420'; border = '#ef4444'; color = '#dc2626' }
              } else if (isSelected) {
                bg = 'var(--color-coral)'; border = 'var(--color-coral)'; color = '#fff'
              }

              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-[8px] border text-left text-sm transition-all"
                  style={{ backgroundColor: bg, borderColor: border, color }}
                >
                  {revealed && isCorrect && <CheckCircle2 size={16} style={{ color: '#34d399', flexShrink: 0 }} />}
                  {revealed && isSelected && !isCorrect && <XCircle size={16} style={{ color: '#ef4444', flexShrink: 0 }} />}
                  {(!revealed || (!isCorrect && !isSelected)) && (
                    <span
                      className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium flex-shrink-0"
                      style={{ borderColor: 'currentColor' }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                  )}
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 rounded-[8px]"
              style={{ backgroundColor: 'var(--color-surface-card)', borderLeft: '3px solid var(--color-coral)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-coral)' }}>
                Explanation
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-body)' }}>
                {q.explanation}
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--color-muted-soft)' }}>
                From section: {q.sectionRef}
              </p>
            </motion.div>
          )}

          {revealed && (
            <button
              onClick={next}
              className="flex items-center gap-2 mt-6 px-5 py-2.5 rounded-[8px] text-sm font-medium text-white ml-auto"
              style={{ backgroundColor: 'var(--color-coral)' }}
            >
              {current < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight size={14} />
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
