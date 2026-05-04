'use client'

import { useEffect, useState } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.quotespan.com'

type PlanId = 'starter' | 'pro' | 'business'
type BillingInterval = 'monthly' | 'yearly'

interface Plan {
  id: PlanId
  name: string
  tagline: string
  monthly: number
  yearly: number
  features: string[]
  highlight?: string
  cta: string
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For solo contractors getting their first leads online.',
    monthly: 29,
    yearly: 290,
    cta: 'Start 14-day trial',
    features: [
      '3 quote templates',
      '100 leads / month',
      'Public share links',
      'Email & SMS lead alerts',
      'Quotespan branding on shared quotes',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Everything you need to run a busy quoting operation.',
    monthly: 79,
    yearly: 790,
    highlight: 'Most popular',
    cta: 'Start 14-day trial',
    features: [
      '25 templates',
      '2,000 leads / month',
      'Custom brand color & logo',
      'Remove Quotespan branding',
      'AI assist (50 / month)',
      'Integrations (Zapier, webhooks)',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For teams scaling beyond a single estimator.',
    monthly: 199,
    yearly: 1990,
    cta: 'Start 14-day trial',
    features: [
      'Unlimited templates',
      'Unlimited leads',
      '5 team seats',
      'Custom domain',
      'Unlimited AI assist',
      'Priority support',
    ],
  },
]

function yearlySavingsPercent(plan: Plan): number {
  const annualised = plan.monthly * 12
  if (annualised <= 0) return 0
  return Math.round(((annualised - plan.yearly) / annualised) * 100)
}

function priceLabel(plan: Plan, interval: BillingInterval): { amount: string; suffix: string } {
  if (interval === 'monthly') {
    return { amount: `$${plan.monthly}`, suffix: '/ month' }
  }
  const perMonth = Math.round(plan.yearly / 12)
  return { amount: `$${perMonth}`, suffix: '/ month, billed yearly' }
}

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 flex-none text-emerald-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function PricingPageClient() {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const [interval, setInterval] = useState<BillingInterval>('monthly')

  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 text-sm shadow-sm">
          <button
            type="button"
            onClick={() => setInterval('monthly')}
            className={`rounded-full px-4 py-1.5 font-medium transition ${
              interval === 'monthly'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-pressed={interval === 'monthly'}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval('yearly')}
            className={`rounded-full px-4 py-1.5 font-medium transition ${
              interval === 'yearly'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-pressed={interval === 'yearly'}
          >
            Yearly <span className="ml-1 text-xs text-emerald-500">save ~17%</span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const { amount, suffix } = priceLabel(plan, interval)
          const isHighlighted = Boolean(plan.highlight)
          const savings = yearlySavingsPercent(plan)
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-8 shadow-sm ${
                isHighlighted
                  ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow">
                  {plan.highlight}
                </span>
              ) : null}
              <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-slate-900">{amount}</span>
                <span className="text-sm text-slate-500">{suffix}</span>
              </div>
              {interval === 'yearly' && savings > 0 ? (
                <p className="mt-1 text-xs font-medium text-emerald-600">
                  Save {savings}% vs monthly
                </p>
              ) : (
                <p className="mt-1 text-xs text-slate-400">14-day free trial · no card required</p>
              )}
              <a
                href={`${APP_URL}/auth/register?plan=${plan.id}&interval=${interval}`}
                className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  isHighlighted
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </a>
              <ul className="mt-8 space-y-3 text-sm text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}
