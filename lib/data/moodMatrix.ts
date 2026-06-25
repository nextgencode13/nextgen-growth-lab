export interface MoodOption {
  emoji: string
  label: string
  books: string[]
  reason: string
}

export const moodOptions: MoodOption[] = [
  {
    emoji: '😵‍💫',
    label: 'Overwhelmed & Scattered',
    books: ['essentialism', 'deep-work'],
    reason: 'helps you cut through noise and find focus',
  },
  {
    emoji: '😴',
    label: 'Unmotivated & Stuck',
    books: ['cant-hurt-me', 'atomic-habits'],
    reason: 'will reignite your drive with science-backed systems',
  },
  {
    emoji: '💰',
    label: 'Want to Build Wealth',
    books: ['rich-dad-poor-dad', 'the-psychology-of-money'],
    reason: 'shifts your mindset around money from the ground up',
  },
  {
    emoji: '🔍',
    label: 'Searching for Meaning',
    books: ['ikigai', 'the-power-of-now'],
    reason: 'guides you toward purpose and present-moment clarity',
  },
  {
    emoji: '🚀',
    label: 'Ready to Build Something',
    books: ['zero-to-one', 'lean-startup'],
    reason: 'gives you the frameworks to go from zero to product',
  },
  {
    emoji: '👑',
    label: 'Want to Lead Better',
    books: ['start-with-why', 'the-7-habits-of-highly-effective-people'],
    reason: 'reveals what truly moves people and lasting habits of excellence',
  },
]
