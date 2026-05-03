import type { Metadata } from 'next'
import HomePageClient from './page.client'
import WaitlistForm from './WaitlistForm'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.quotespan.com'

const VERTICALS = [
  'General Contractors',
  'Landscaping',
  'Pool Maintenance',
  'Plumbing',
  'Roofing',
  'Painting',
]

const STEPS = [
  {
    n: '1',
    title: 'Build your pricing template',
    body:
      'Drag together materials, labor, waste, and markup rules. Quotespan handles the math so your numbers stay consistent across every quote.',
  },
  {
    n: '2',
    title: 'Share a link, embed, or email',
    body:
      'Drop a Quotespan form on your website, send a public link from your phone, or email a finished quote to a customer in two clicks.',
  },
  {
    n: '3',
    title: 'Capture leads automatically',
    body:
      "Every submission lands in your inbox with a pre-priced quote attached — no spreadsheets, no missed follow-ups, no more 'I'll get back to you'.",
  },
]

const FEATURES = [
  {
    title: 'Per-quote share links',
    body:
      'Send the customer a private URL they can open on any device — no login, no app to install.',
  },
  {
    title: 'Embeddable forms',
    body:
      'Paste one snippet on your website and your visitors get instant, on-brand pricing 24/7.',
  },
  {
    title: 'PDF + email delivery',
    body:
      'One click to email the customer a polished PDF quote — Mailgun-backed, deliverable, branded.',
  },
  {
    title: 'Real pricing logic',
    body:
      "Materials, labor rates, waste %, markup, conditional features. The same engine you'd build in a spreadsheet — but reusable.",
  },
]

const FAQ = [
  {
    q: 'How is Quotespan different from a contact form?',
    a: 'A contact form gives you a name and a maybe. Quotespan gives you a name, a scoped job, and a real price the customer already saw — so the next call is about scheduling, not quoting.',
  },
  {
    q: 'Do my customers need an account?',
    a: 'No. Customers fill out a public form or open a share link. Accounts are only for you and your team.',
  },
  {
    q: 'What does it cost?',
    a: 'Early-access users get a free forever tier with no lead caps. Paid plans unlock team seats, advanced templates, and CRM sync.',
  },
  {
    q: 'Can I use my own pricing rules?',
    a: "Yes — that's the point. Quotespan models materials, labor, waste, markup, and conditional add-ons. If you can express it on paper, you can express it in a Quotespan template.",
  },
]

export const metadata: Metadata = {
  title: 'Quotespan — Stop losing leads to slow quotes',
  description:
    'Quotespan turns your contractor pricing into instant, embeddable quote forms. Capture leads with the price already calculated.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HomePageClient />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Now in private beta
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Stop losing leads to slow quotes.
            </h1>
            <p className="mt-6 text-lg text-slate-600 sm:text-xl">
              Quotespan turns your pricing — materials, labor, markup, the works — into a
              shareable form your customers fill out in 60 seconds. They get an instant quote.
              You get a qualified lead.
            </p>
            <div id="waitlist" className="mt-10">
              <WaitlistForm source="hero" />
              <p className="mt-3 text-xs text-slate-500">
                Free forever tier · No lead caps · No credit card required
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Already have an account?{' '}
                <a
                  href={`${APP_URL}/auth/login`}
                  className="font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verticals strip */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            Built for trades that quote complex jobs
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-700">
            {VERTICALS.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-slate-600">
            From spreadsheet to shareable quote form in an afternoon.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features wedge */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to quote — nothing you don&rsquo;t.
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Quotespan is the lightest path from &ldquo;customer asked for a price&rdquo; to
              &ldquo;customer signed off on a price.&rdquo;
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust panel */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:grid-cols-3">
          {[
            { k: 'No lead caps', v: 'Capture every quote, every visitor, every month.' },
            { k: 'Free forever tier', v: 'Get going without a credit card.' },
            {
              k: 'Smart upgrades',
              v: 'Pay only when teams, CRM sync, or AI features make sense.',
            },
          ].map((item) => (
            <div key={item.k}>
              <p className="text-base font-semibold text-slate-900">{item.k}</p>
              <p className="mt-1 text-sm text-slate-600">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked
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
            Quote faster. Win more jobs.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Join the early-access list and we&rsquo;ll get you set up the week your invite drops.
          </p>
          <div className="mt-8">
            <WaitlistForm source="footer" />
          </div>
        </div>
      </section>
    </div>
  )
}
