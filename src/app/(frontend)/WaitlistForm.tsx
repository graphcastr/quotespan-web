'use client'

import { useState } from 'react'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081'

interface WaitlistResult {
  ok: boolean
  alreadySignedUp: boolean
}

async function joinWaitlist(payload: {
  email: string
  businessName?: string
  source?: string
}): Promise<WaitlistResult> {
  const res = await fetch(`${API_BASE_URL}/api/v1/public/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed (${res.status})`)
  }
  const json = (await res.json()) as { data?: WaitlistResult } & WaitlistResult
  return json.data ?? json
}

export default function WaitlistForm({ source }: { source: string }) {
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'dupe' | 'err'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setError(null)
    try {
      const res = await joinWaitlist({
        email: email.trim(),
        businessName: businessName.trim() || undefined,
        source,
      })
      setStatus(res.alreadySignedUp ? 'dupe' : 'ok')
    } catch (err) {
      setStatus('err')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'ok' || status === 'dupe') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="font-semibold">
          {status === 'ok' ? "You're on the list." : "You're already on the list."}
        </p>
        <p className="mt-1 text-sm">
          We&rsquo;ll email <span className="font-mono">{email}</span> the moment your invite is
          ready.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@yourbusiness.com"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
      />
      <input
        type="text"
        autoComplete="organization"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Business name (optional)"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
      >
        {status === 'loading' ? 'Joining…' : 'Get early access'}
      </button>
      {status === 'err' && (
        <p className="sm:col-span-3 text-sm text-rose-600">{error}</p>
      )}
    </form>
  )
}
