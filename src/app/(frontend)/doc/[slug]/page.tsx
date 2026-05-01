import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import Link from 'next/link'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import RichText from '@/components/RichText'
import { getDocsNav } from '@/components/Docs/getDocsNav'
import { DOC_SECTIONS } from '@/collections/Docs'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'docs',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return result.docs
    .filter((d) => Boolean(d.slug))
    .map((d) => ({ slug: d.slug as string }))
}

const queryDocBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'docs',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] ?? null
})

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const doc = await queryDocBySlug(slug)
  if (!doc) return { title: 'Not found' }

  const SITE_URL = getServerSideURL()
  const title = `${doc.title} — Quotespan Docs`
  const description =
    doc.excerpt ??
    'Learn how to use Quotespan to build pricing templates, capture leads, and send instant quotes.'

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      url: `${SITE_URL}/doc/${slug}`,
      type: 'article',
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function DocPage({ params }: Args) {
  const { slug } = await params
  const doc = await queryDocBySlug(slug)
  if (!doc) notFound()

  const sections = await getDocsNav()
  const section = sections.find((s) => s.value === doc.section)
  const idx = section?.entries.findIndex((e) => e.slug === doc.slug) ?? -1
  const prev = section && idx > 0 ? section.entries[idx - 1] : null
  const next =
    section && idx >= 0 && idx < (section.entries.length - 1)
      ? section.entries[idx + 1]
      : null
  const sectionLabel =
    DOC_SECTIONS.find((s) => s.value === doc.section)?.label ?? doc.section

  return (
    <article>
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
        {sectionLabel}
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold mb-4">{doc.title}</h1>
      {doc.excerpt && (
        <p className="text-lg text-muted-foreground mb-8">{doc.excerpt}</p>
      )}

      <RichText
        data={doc.content as Parameters<typeof RichText>[0]['data']}
        enableGutter={false}
        enableProse
      />

      {(prev || next) && (
        <nav className="not-prose mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 sm:justify-between">
          {prev ? (
            <Link
              href={`/doc/${prev.slug}`}
              className="block rounded-md border p-4 hover:bg-muted flex-1"
            >
              <div className="text-xs text-muted-foreground mb-1">← Previous</div>
              <div className="font-medium">{prev.title}</div>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/doc/${next.slug}`}
              className="block rounded-md border p-4 hover:bg-muted flex-1 sm:text-right"
            >
              <div className="text-xs text-muted-foreground mb-1">Next →</div>
              <div className="font-medium">{next.title}</div>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      )}
    </article>
  )
}
