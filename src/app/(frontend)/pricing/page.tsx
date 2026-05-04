import type { Metadata } from 'next'
import PricingPageClient from './PricingPageClient'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.quotespan.com'
const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://quotespan.com'

export const metadata: Metadata = {
  title: 'Pricing — Quotespan',
  description:
    'Simple, transparent pricing for contractors. Start with a 14-day free trial — no credit card required. Plans from $29/month.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Pricing — Quotespan',
    description:
      'Simple, transparent pricing for contractors. Start with a 14-day free trial — no credit card required.',
    url: `${SITE_URL}/pricing`,
    type: 'website',
  },
}

const FAQ = [
  {
    q: 'Do I need a credit card to start?',
    a: 'No. Every plan includes a 14-day free trial. We only ask for payment details when the trial ends and you decide to continue.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes — upgrade or downgrade any time from your billing settings. We prorate the difference automatically.',
  },
  {
    q: 'What happens if I exceed my monthly lead limit?',
    a: 'Your existing leads stay accessible and your share links keep working. New submissions are paused until the next billing cycle, or you can upgrade for instant headroom.',
  },
  {
    q: 'Is there a discount for paying yearly?',
    a: 'Yes — yearly billing saves roughly 17% on every plan (about two months free).',
  },
  {
    q: 'Can I cancel any time?',
    a: 'Yes. Cancel from the customer portal in one click. You keep access until the end of the current billing period.',
  },
  {
    q: 'Do you offer a free plan?',
    a: 'Not at the moment — every paid plan starts with a 14-day free trial so you can build templates, send real quotes, and decide before you pay.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-8 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              14-day free trial · no credit card
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Pricing that scales with your quoting.
            </h1>
            <p className="mt-6 text-lg text-slate-600 sm:text-xl">
              Pick a plan when you&rsquo;re ready. Every tier ships with the full pricing engine,
              public share links, and email lead alerts.
            </p>
          </div>

          <PricingPageClient />
        </div>
      </section>

      {/* Comparison strip */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                k: 'No setup fees',
                v: 'Onboard yourself, or we&rsquo;ll help — either way, no implementation invoice.',
              },
              {
                k: 'Cancel anytime',
                v: 'One click in the customer portal. No clawbacks, no retention calls.',
              },
              {
                k: 'Your data, exportable',
                v: 'CSV export of every lead and quote, on every plan, forever.',
              },
            ].map((item) => (
              <div key={item.k}>
                <p className="text-base font-semibold text-slate-900">{item.k}</p>
                <p
                  className="mt-1 text-sm text-slate-600"
                  dangerouslySetInnerHTML={{ __html: item.v }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Pricing questions
        </h2>
        <dl className="mt-10 space-y-6">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6">
              <dt className="text-base font-semibold text-slate-900">{item.q}</dt>
              <dd className="mt-2 text-sm text-slate-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Try Quotespan free for 14 days.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Build a template, send a real quote, and decide before you pay a cent.
          </p>
          <div className="mt-8">
            <a
              href={`${APP_URL}/auth/register`}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Start free trial
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
