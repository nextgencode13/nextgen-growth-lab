import type { Concept } from '@/lib/types'

export const concepts: Concept[] = [
  {
    slug: 'compound-effect',
    name: 'The Compound Effect',
    emoji: '📈',
    definition: 'Small, consistent actions repeated over time produce results that are exponentially larger than a one-time big effort. The power of compounding applies to habits, wealth, knowledge, and relationships.',
    tags: ['habits', 'productivity', 'wealth', 'finance'],
    books: [
      { slug: 'atomic-habits', angle: 'The 1% rule: small improvements compound to 37× improvement in a year' },
      { slug: 'the-compound-effect', angle: 'The central thesis: small smart choices + consistency + time = radical difference' },
      { slug: 'the-psychology-of-money', angle: 'Warren Buffett\'s wealth is mostly from the last 20 years — compound interest requires time above all' },
      { slug: 'the-almanack-of-naval-ravikant', angle: 'All returns in life come from compound interest — in relationships, knowledge, and money' },
    ],
  },
  {
    slug: 'growth-mindset',
    name: 'Growth vs. Fixed Mindset',
    emoji: '🧠',
    definition: 'The belief that your abilities can be developed through dedication and hard work (growth mindset) vs. the belief that your qualities are fixed traits (fixed mindset). This single belief shapes how you respond to challenges, setbacks, and success.',
    tags: ['mindset', 'psychology', 'education', 'self-improvement'],
    books: [
      { slug: 'mindset', angle: 'The foundational research — praising effort vs. talent creates fundamentally different children' },
      { slug: 'cant-hurt-me', angle: 'Goggins embodies growth mindset taken to its extreme: there are no limits, only current beliefs' },
      { slug: 'the-7-habits', angle: 'Proactivity is impossible without a growth mindset — believing you can choose your response to any stimulus' },
      { slug: 'atomic-habits', angle: 'Identity-based habits require a growth mindset: "I am becoming the person who does X"' },
    ],
  },
  {
    slug: 'identity-based-change',
    name: 'Identity-Based Change',
    emoji: '🎭',
    definition: 'Real, lasting change happens when you shift your identity — who you believe you are — rather than focusing only on outcomes or behaviors. Every action is a vote for the type of person you want to become.',
    tags: ['habits', 'psychology', 'mindset', 'self-improvement'],
    books: [
      { slug: 'atomic-habits', angle: 'Identity is the foundation of the habit system — "I am a runner" vs. "I\'m trying to run"' },
      { slug: 'mindset', angle: 'Your beliefs about your own nature shape all behavior — a growth mindset is an identity shift' },
      { slug: 'the-power-of-now', angle: 'The ego is an identity built from thought — letting go of it is the ultimate identity shift' },
      { slug: 'start-with-why', angle: 'People and brands with clear WHY have a stable identity that drives consistent behavior' },
    ],
  },
  {
    slug: 'deep-focus',
    name: 'Deep Focus / Flow State',
    emoji: '🎯',
    definition: 'The state of complete absorption in a challenging task, where time seems to disappear and performance is at its peak. This state is both rare and extraordinarily productive — it may be the most important skill of the knowledge economy.',
    tags: ['productivity', 'psychology', 'performance'],
    books: [
      { slug: 'deep-work', angle: 'Deep Work is the professional equivalent of flow — the ability to produce elite-level work through distraction-free concentration' },
      { slug: 'essentialism', angle: 'You can only experience flow when focused on the vital few — scattered attention prevents deep engagement' },
      { slug: 'ikigai', angle: 'Finding flow in daily activities is the key to ikigai — activities that produce flow are signals pointing toward your purpose' },
    ],
  },
  {
    slug: '80-20-principle',
    name: 'The 80/20 Principle',
    emoji: '📊',
    definition: '80% of outcomes come from 20% of causes. This pattern appears across business, economics, nature, and personal productivity. The insight: identify the vital few inputs that drive the majority of results.',
    tags: ['productivity', 'business', 'decision-making'],
    books: [
      { slug: 'essentialism', angle: 'The entire book is an application of 80/20: cut the nonessential 80% to give everything to the vital 20%' },
      { slug: 'rework', angle: '"Do less than your competitors" — focus on the 20% of features that matter most' },
      { slug: 'the-4-hour-workweek', angle: 'Ferriss built his lifestyle business by obsessively identifying and doing only the 20% of activities that produced 80% of income' },
    ],
  },
  {
    slug: 'systems-vs-goals',
    name: 'Systems vs. Goals',
    emoji: '⚙️',
    definition: 'Goals are the results you want to achieve; systems are the processes that lead to those results. Focusing on the system rather than the goal tends to produce better, more sustainable outcomes because the system runs every day, while the goal only matters at the end.',
    tags: ['productivity', 'habits', 'business'],
    books: [
      { slug: 'atomic-habits', angle: '"You do not rise to the level of your goals. You fall to the level of your systems." The entire book is about building better systems.' },
      { slug: 'the-lean-startup', angle: 'The Build-Measure-Learn loop is a system — one that generates learning regardless of any single goal\'s outcome' },
      { slug: 'principles', angle: 'Dalio is obsessed with building systems (algorithmic decision-making, radical transparency) that produce good outcomes reliably' },
    ],
  },
  {
    slug: 'financial-independence',
    name: 'Financial Independence',
    emoji: '💰',
    definition: 'Having enough assets and passive income that you no longer need to exchange your time for money. The goal is time freedom — being able to choose how you spend your days regardless of financial pressure.',
    tags: ['wealth', 'finance', 'freedom'],
    books: [
      { slug: 'rich-dad-poor-dad', angle: 'Assets vs. liabilities: build an asset column that generates passive income exceeding expenses' },
      { slug: 'the-psychology-of-money', angle: 'The highest form of wealth is controlling your time — not having expensive things' },
      { slug: 'the-almanack-of-naval-ravikant', angle: 'Earn with your mind, not your time — seek assets and leverage so you can retire early if you choose' },
      { slug: 'think-and-grow-rich', angle: 'Burning desire for financial success is the starting point — but it must be backed by a definite plan' },
    ],
  },
  {
    slug: 'purpose-and-meaning',
    name: 'Purpose & Meaning',
    emoji: '🌟',
    definition: 'Having a clear reason for being — a mission or calling that goes beyond survival or pleasure. Research consistently shows that people with strong purpose live longer, recover from setbacks faster, and report higher life satisfaction.',
    tags: ['philosophy', 'mindset', 'psychology', 'wellness'],
    books: [
      { slug: 'ikigai', angle: 'The entire concept of ikigai is about finding your reason for being — the intersection of passion, talent, mission, and livelihood' },
      { slug: 'start-with-why', angle: '"People don\'t buy what you do — they buy why you do it." WHY is the origin of meaning in business and life' },
      { slug: 'the-power-of-now', angle: 'Purpose is found in the present moment, not in future achievements — it is how you show up, not what you achieve' },
      { slug: 'shoe-dog', angle: '"Don\'t settle for a career. Seek a calling." Knight\'s sense of mission sustained Nike through near-bankruptcy' },
    ],
  },
  {
    slug: 'leverage',
    name: 'Leverage',
    emoji: '🏗️',
    definition: 'Using tools, systems, people, or capital to multiply your output far beyond what your personal effort alone could produce. The wealthy and successful scale their impact through leverage, not through working harder.',
    tags: ['wealth', 'business', 'productivity'],
    books: [
      { slug: 'the-almanack-of-naval-ravikant', angle: 'Three types of leverage: labor, capital, and products with no marginal replication cost (code, media)' },
      { slug: 'rich-dad-poor-dad', angle: 'The rich use other people\'s money and time (OPM and OPT) as financial and operational leverage' },
      { slug: 'zero-to-one', angle: 'Monopolies achieve massive leverage through network effects, proprietary tech, and economies of scale' },
      { slug: 'the-lean-startup', angle: 'Build-Measure-Learn is leverage: you scale learning faster than competitors by testing assumptions quickly' },
    ],
  },
  {
    slug: 'resilience',
    name: 'Resilience & Mental Toughness',
    emoji: '💪',
    definition: 'The ability to endure adversity, recover from failure, and continue moving forward despite difficulty. Not the absence of suffering, but the capacity to move through it without being destroyed by it.',
    tags: ['mindset', 'psychology', 'performance'],
    books: [
      { slug: 'cant-hurt-me', angle: 'The entire book is a masterclass in building resilience — the 40% rule, callousing the mind, using suffering as fuel' },
      { slug: 'mindset', angle: 'Growth mindset people see failure as information, not verdict — this is the psychological foundation of resilience' },
      { slug: 'the-obstacle-is-the-way', angle: 'Stoic philosophy applied to modern life: the obstacle itself is the path. Resistance builds strength.' },
      { slug: 'shoe-dog', angle: 'Nike nearly went bankrupt 8 times — Knight\'s resilience through each crisis is the story\'s spine' },
    ],
  },
  {
    slug: 'present-moment',
    name: 'Present-Moment Awareness',
    emoji: '🧘',
    definition: 'The practice of fully inhabiting the current moment rather than being lost in thoughts about the past or future. A growing body of research confirms that present-moment awareness reduces anxiety, improves performance, and increases life satisfaction.',
    tags: ['mindfulness', 'psychology', 'wellness', 'philosophy'],
    books: [
      { slug: 'the-power-of-now', angle: 'The entire book: the present moment is the only reality. All pain comes from living in memory or anticipation.' },
      { slug: 'ikigai', angle: 'Okinawan centenarians live in the present — doing simple tasks with full attention is a daily practice' },
      { slug: 'the-7-habits', angle: 'Sharpening the Saw includes spiritual renewal — practices like meditation that cultivate present awareness' },
    ],
  },
  {
    slug: 'contrarian-thinking',
    name: 'Contrarian Thinking',
    emoji: '🔄',
    definition: 'The practice of questioning consensus assumptions and looking for truths that most people overlook. The best opportunities — in business, investing, and life — exist precisely where conventional wisdom is wrong.',
    tags: ['business', 'investing', 'decision-making', 'innovation'],
    books: [
      { slug: 'zero-to-one', angle: '"What important truth do very few people agree with you on?" Great companies are built on contrarian insights.' },
      { slug: 'rework', angle: 'The entire book challenges conventional business wisdom: meetings are toxic, planning is guessing, growth isn\'t always good' },
      { slug: 'the-psychology-of-money', angle: 'Housel\'s most powerful insights run counter to conventional financial wisdom — e.g., wealth is what you don\'t see' },
      { slug: 'the-almanack-of-naval-ravikant', angle: 'Specific knowledge often comes from going against the grain — following genuine curiosity where others follow status' },
    ],
  },
]

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find(c => c.slug === slug)
}
