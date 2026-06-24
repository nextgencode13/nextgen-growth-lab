import type { DigestWeek } from '@/lib/types'

export const digestWeeks: DigestWeek[] = [
  {
    week: '2026-W26',
    theme: 'Building Habits That Actually Stick',
    quote: {
      text: 'You do not rise to the level of your goals. You fall to the level of your systems.',
      book: 'Atomic Habits',
      author: 'James Clear',
    },
    concept: {
      title: 'The 1% Rule',
      body: 'Getting 1% better every day doesn\'t sound impressive — but the math is extraordinary. 1.01^365 = 37.78. Getting 1% worse? 0.99^365 = 0.03. The gap between people who improve slightly every day and those who slip slightly isn\'t just about willpower — it\'s the mathematics of compounding applied to behavior. The key insight: stop measuring outcomes and start measuring systems. Did you do the 10 pages today? That\'s the question. Not "am I better than last year?"',
    },
    challenge: 'Choose ONE habit you want to build this week. Make it so small it feels ridiculous — 2 pushups, 1 page, 5 minutes. Do it every day for 7 days. Track it on paper.',
    spotlight: 'atomic-habits',
  },
  {
    week: '2026-W25',
    theme: 'The Wealth Mindset Shift',
    quote: {
      text: 'The secret to wealth is simple: find a way to do more for others than anyone else does. Become more valuable. Do more. Give more. Be more. Serve more.',
      book: 'The Psychology of Money',
      author: 'Morgan Housel',
    },
    concept: {
      title: 'Assets vs. Liabilities',
      body: 'Most people think of wealth as income — how much money comes in each month. Rich Dad Poor Dad reframes everything: wealth is your asset column. An asset puts money in your pocket. A liability takes money out. Your job? Earn money, buy assets. Let assets buy more assets. The trap most people fall into: they earn money, spend on liabilities (nicer car, bigger house), then work harder to afford more liabilities. The wealthy do the opposite: assets first, lifestyle second — once the assets are generating income.',
    },
    challenge: 'This week, calculate your real asset-to-liability ratio. List everything you own. Which items put money in your pocket? Which take money out? Identify one small action you can take to add an asset this month.',
    spotlight: 'rich-dad-poor-dad',
  },
  {
    week: '2026-W24',
    theme: 'The Power of Deep Focus',
    quote: {
      text: 'The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.',
      book: 'Deep Work',
      author: 'Cal Newport',
    },
    concept: {
      title: 'Attention Residue',
      body: 'Every time you switch tasks — check email, glance at Slack, scroll briefly — you don\'t fully return to what you were doing. A residue of attention stays on the prior task. The more task-switching you do, the shallower your remaining attention becomes. This is why an hour of truly focused work often produces more than an entire fragmented day. The solution isn\'t willpower — it\'s time architecture: scheduling blocks of real focus where you commit to one thing only, and protecting those blocks aggressively.',
    },
    challenge: 'Block one 90-minute deep work session this week. Phone off. No tabs. One task. When it\'s done, rate your output compared to a typical 90 minutes of fragmented work.',
    spotlight: 'deep-work',
  },
  {
    week: '2026-W23',
    theme: 'Embracing Discomfort as Growth',
    quote: {
      text: 'The most important conversations you will ever have are the ones you have with yourself.',
      book: "Can't Hurt Me",
      author: 'David Goggins',
    },
    concept: {
      title: 'The 40% Rule',
      body: 'When your mind tells you that you\'re done — that you can\'t take another step, write another paragraph, make another call — you\'re at approximately 40% of your actual capacity. Your brain is a protection mechanism, not a performance gauge. It pulls the alarm long before you\'re actually in danger. The 40% rule doesn\'t mean you should hurt yourself — it means most of us live in a comfort bubble that represents a fraction of our real potential. The only way to find your real ceiling is to start pushing past the fake one.',
    },
    challenge: 'This week, choose one physical or mental challenge you normally quit early. When you want to stop, go 10% further. Notice what happens. Track the experience.',
    spotlight: 'cant-hurt-me',
  },
  {
    week: '2026-W22',
    theme: 'Finding Your Purpose',
    quote: {
      text: 'Find something you love to do so much, you can\'t wait for the sun to rise to do it all over again.',
      book: 'Ikigai',
      author: 'Héctor García',
    },
    concept: {
      title: 'The Ikigai Intersection',
      body: 'The ikigai framework asks four questions simultaneously: What do you love? What are you good at? What does the world need? What can you be paid for? Where all four overlap is your ikigai — your reason for being. Most people optimize for one or two: passion (love + talent) without market fit, or career (talent + paid) without love or mission. The extraordinary lives happen at the intersection of all four. Finding it takes time and experimentation — but the search itself is worthwhile.',
    },
    challenge: 'Take 20 minutes this week and write answers to all four ikigai questions. Don\'t filter — just write. Look for patterns at the overlaps. What surprise shows up?',
    spotlight: 'ikigai',
  },
  {
    week: '2026-W21',
    theme: 'The Art of Saying No',
    quote: {
      text: 'If it\'s not a "hell yeah!", it\'s a no.',
      book: 'Essentialism',
      author: 'Greg McKeown',
    },
    concept: {
      title: 'The Sunk-Cost Trap',
      body: 'You\'re halfway through a project, a relationship, or a career path that isn\'t working — but you keep going because you\'ve already invested so much. This is the sunk-cost trap. The hours, money, or energy already spent are gone. They don\'t change the question of what to do now. The Essentialist asks: "If I didn\'t already have this, would I choose to start it today?" If the honest answer is no — that\'s your answer. The courage to walk away from a sunk cost is the courage to reclaim your future.',
    },
    challenge: 'Identify one commitment in your life that you\'re continuing due to sunk costs, not future value. Honestly evaluate: if you started fresh today, would you choose this? Then decide.',
    spotlight: 'essentialism',
  },
]

export const currentDigest = digestWeeks[0]
