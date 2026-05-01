import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { DOC_SECTIONS } from '@/collections/Docs'

export type DocNavEntry = {
  id: string
  title: string
  slug: string
  section: string
  excerpt?: string | null
  order: number
}

export type DocNavSection = {
  value: string
  label: string
  entries: DocNavEntry[]
}

const fetchDocsNav = async (): Promise<DocNavSection[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'docs',
    draft: false,
    limit: 500,
    overrideAccess: false,
    pagination: false,
    sort: 'order',
    select: {
      title: true,
      slug: true,
      section: true,
      excerpt: true,
      order: true,
    },
  })

  const grouped: Record<string, DocNavEntry[]> = {}
  for (const doc of result.docs) {
    if (!doc.slug || !doc.section) continue
    grouped[doc.section] ??= []
    grouped[doc.section].push({
      id: String(doc.id),
      title: doc.title,
      slug: doc.slug,
      section: doc.section,
      excerpt: doc.excerpt,
      order: doc.order ?? 100,
    })
  }

  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
  }

  return DOC_SECTIONS.map((s) => ({
    value: s.value,
    label: s.label,
    entries: grouped[s.value] ?? [],
  })).filter((s) => s.entries.length > 0)
}

export const getDocsNav = unstable_cache(fetchDocsNav, ['docs-nav'], {
  tags: ['docs-nav'],
})
