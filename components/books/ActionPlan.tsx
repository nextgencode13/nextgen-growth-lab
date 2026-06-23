import { CheckCircle2, Zap } from 'lucide-react'

export default function ActionPlan({ steps }: { steps: string[] }) {
  return (
    <section className="py-16" style={{ backgroundColor: 'var(--color-surface-card)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-coral)' }}
          >
            <Zap size={16} color="#fff" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-normal tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            Action Plan
          </h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-base mb-8" style={{ color: 'var(--color-muted)' }}>
            Practical steps you can implement starting today:
          </p>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-4 p-4 rounded-[12px] border"
                style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-hairline)' }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{ backgroundColor: 'var(--color-coral)', color: '#fff' }}
                  >
                    {i + 1}
                  </div>
                </div>
                <p className="text-sm leading-relaxed pt-0.5" style={{ color: 'var(--color-body)' }}>
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
