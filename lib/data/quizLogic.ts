// Book recommendation quiz scoring logic

export interface QuizAnswer {
  questionIndex: number
  optionIndex: number
}

export interface RecommendationQuestion {
  question: string
  options: string[]
}

export const recommendationQuestions: RecommendationQuestion[] = [
  {
    question: "What's your main goal right now?",
    options: ['Build wealth & financial freedom', 'Improve my mindset & mental toughness', 'Start or grow a business', 'Be more productive & focused', 'Find purpose & meaning in life'],
  },
  {
    question: 'How much time do you have to read?',
    options: ['Just 5-10 minutes a day', 'About 30 minutes a day', 'An hour or more daily'],
  },
  {
    question: "What's your experience level with self-development books?",
    options: ['Complete beginner — first time reading these', 'Some background — I\'ve read a few', 'Very experienced — I read a lot of these'],
  },
  {
    question: 'Which topic excites you most right now?',
    options: ['Psychology & behavior change', 'Finance & investing', 'Entrepreneurship & startups', 'Habits & daily discipline', 'Philosophy & deeper meaning'],
  },
  {
    question: 'What kind of writing style do you prefer?',
    options: ['Story-based & narrative — real journeys and experiences', 'Data-driven & research-backed — studies and evidence', 'Step-by-step & practical — frameworks and checklists', 'Philosophical & contemplative — ideas and wisdom'],
  },
]

// Score matrix: [question][option] = { slug: points }
// Each entry adds points to the specified book slug
type ScoreEntry = Record<string, number>
type ScoreMatrix = ScoreEntry[][]

export const scoreMatrix: ScoreMatrix = [
  // Q0: Main goal
  [
    // 0: Build wealth
    { 'rich-dad-poor-dad': 5, 'the-psychology-of-money': 5, 'think-and-grow-rich': 4, 'the-almanack-of-naval-ravikant': 4, 'the-compound-effect': 3, 'zero-to-one': 3 },
    // 1: Improve mindset
    { 'mindset': 5, 'cant-hurt-me': 5, 'atomic-habits': 4, 'the-power-of-now': 4, 'essentialism': 3, 'the-7-habits': 3 },
    // 2: Start/grow business
    { 'zero-to-one': 5, 'the-lean-startup': 5, 'rework': 4, 'shoe-dog': 4, 'start-with-why': 3, 'principles': 3 },
    // 3: Productivity & focus
    { 'atomic-habits': 5, 'deep-work': 5, 'essentialism': 4, 'the-7-habits': 4, 'the-compound-effect': 3 },
    // 4: Purpose & meaning
    { 'ikigai': 5, 'start-with-why': 5, 'the-power-of-now': 4, 'shoe-dog': 3, 'the-almanack-of-naval-ravikant': 3, 'principles': 3 },
  ],
  // Q1: Time to read
  [
    // 0: 5-10 min/day (short, accessible books)
    { 'atomic-habits': 3, 'ikigai': 3, 'rework': 3, 'the-7-habits': 2 },
    // 1: 30 min/day (most books)
    { 'atomic-habits': 2, 'deep-work': 2, 'the-psychology-of-money': 2, 'mindset': 2, 'essentialism': 2 },
    // 2: 1 hour+ (deeper books)
    { 'principles': 3, 'shoe-dog': 3, 'zero-to-one': 2, 'cant-hurt-me': 2, 'the-lean-startup': 2 },
  ],
  // Q2: Experience level
  [
    // 0: Complete beginner
    { 'atomic-habits': 3, 'ikigai': 3, 'rich-dad-poor-dad': 3, 'the-power-of-now': 2, 'start-with-why': 2 },
    // 1: Some background
    { 'the-psychology-of-money': 2, 'deep-work': 2, 'essentialism': 2, 'mindset': 2, 'the-7-habits': 2 },
    // 2: Very experienced
    { 'principles': 3, 'zero-to-one': 3, 'the-almanack-of-naval-ravikant': 3, 'cant-hurt-me': 2 },
  ],
  // Q3: Topic interest
  [
    // 0: Psychology & behavior
    { 'mindset': 5, 'atomic-habits': 4, 'the-psychology-of-money': 4, 'the-power-of-now': 3, 'the-7-habits': 3 },
    // 1: Finance & investing
    { 'the-psychology-of-money': 5, 'rich-dad-poor-dad': 5, 'think-and-grow-rich': 4, 'the-almanack-of-naval-ravikant': 4, 'the-compound-effect': 3 },
    // 2: Entrepreneurship
    { 'zero-to-one': 5, 'the-lean-startup': 5, 'shoe-dog': 4, 'rework': 4, 'start-with-why': 3 },
    // 3: Habits & discipline
    { 'atomic-habits': 5, 'cant-hurt-me': 4, 'deep-work': 4, 'the-compound-effect': 4, 'essentialism': 3 },
    // 4: Philosophy & meaning
    { 'the-power-of-now': 5, 'ikigai': 5, 'the-almanack-of-naval-ravikant': 4, 'principles': 3, 'start-with-why': 3 },
  ],
  // Q4: Writing style
  [
    // 0: Story-based
    { 'shoe-dog': 5, 'cant-hurt-me': 4, 'the-alchemist': 4, 'think-and-grow-rich': 3, 'ikigai': 3 },
    // 1: Data-driven
    { 'mindset': 5, 'the-psychology-of-money': 5, 'deep-work': 4, 'the-lean-startup': 4, 'principles': 3 },
    // 2: Step-by-step
    { 'atomic-habits': 5, 'the-7-habits': 5, 'essentialism': 4, 'the-compound-effect': 4, 'rework': 3 },
    // 3: Philosophical
    { 'the-power-of-now': 5, 'the-almanack-of-naval-ravikant': 5, 'ikigai': 4, 'zero-to-one': 3, 'start-with-why': 3 },
  ],
]

export function calculateRecommendations(answers: QuizAnswer[]): string[] {
  const scores: Record<string, number> = {}

  for (const answer of answers) {
    const matrix = scoreMatrix[answer.questionIndex]?.[answer.optionIndex]
    if (!matrix) continue
    for (const [slug, points] of Object.entries(matrix)) {
      scores[slug] = (scores[slug] ?? 0) + points
    }
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([slug]) => slug)
}
