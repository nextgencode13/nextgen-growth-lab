'use client'
import { useState, useEffect } from 'react'

const KEY = 'nw_reading_goal'
const GOAL_OPTIONS = [1, 3, 5, 10]

interface GoalData {
  goal: number
  month: string
}

export function useReadingGoal(finishedCount: number) {
  const [goal, setGoalState] = useState(5)
  const [month, setMonth] = useState('')

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7)
    try {
      const stored: GoalData = JSON.parse(localStorage.getItem(KEY) ?? '{}')
      if (stored.goal) setGoalState(stored.goal)
      setMonth(stored.month ?? currentMonth)
    } catch {
      setMonth(currentMonth)
    }
  }, [])

  function setGoal(g: number) {
    const currentMonth = new Date().toISOString().slice(0, 7)
    const data: GoalData = { goal: g, month: currentMonth }
    try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
    setGoalState(g)
  }

  const progress = Math.min(finishedCount, goal)
  const pct = goal > 0 ? (progress / goal) * 100 : 0
  const completed = progress >= goal
  const monthName = month
    ? new Date(month + '-01').toLocaleString('default', { month: 'long' })
    : new Date().toLocaleString('default', { month: 'long' })

  const motivational = completed
    ? 'Goal complete! Set a new challenge.'
    : progress === goal - 1
    ? 'One more book to go!'
    : progress === 0
    ? `Read ${goal} books this ${monthName}.`
    : `${goal - progress} more to reach your goal.`

  return { goal, setGoal, progress, pct, completed, monthName, motivational, goalOptions: GOAL_OPTIONS }
}
