import type { Metadata } from 'next'
import Link from 'next/link'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getDocsNav } from '@/components/Docs/getDocsNav'

const DOC_DESCRIPTION =
  'Learn how to build pricing templates, capture leads, embed quote forms, and track conversions with Quotespan.'

export const metadata: Metadata = {
  title: 'Documentation — Quotespan',
  description: DOC_DESCRIPTION,
  openGraph: mergeOpenGraph({
    title: 'Documentation — Quotespan',
    description: DOC_DESCRIPTION,
    url: '/doc',
    type: 'website',
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation — Quotespan',
    description: DOC_DESCRIPTION,
  },
}

export default async function DocIndexPage() {
  const sections = await getDocsNav()
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>Quotespan Docs</h1>
      <p className="lead">
        Everything you need to build pricing templates, capture leads from public quote
        forms, share polished quotes with customers, and track performance — all in one
        contractor-friendly app.
      </p>

      <h2>Browse by section</h2>
      <div className="not-prose grid sm:grid-cols-2 gap-4 mt-6">
        {sections.map((section) => (
          <div key={section.value} className="rounded-lg border p-5 bg-card">
            <div className="font-semibold mb-2">{section.label}</div>
            <ul className="text-sm space-y-1">
              {section.entries.slice(0, 6).map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/doc/${entry.slug}`}
                    className="text-primary hover:underline"
                  >
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
