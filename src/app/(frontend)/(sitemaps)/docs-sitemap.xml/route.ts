import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getDocsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'docs',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    return results.docs
      ? results.docs
          .filter((doc) => Boolean(doc?.slug))
          .map((doc) => ({
            loc: `${SITE_URL}/doc/${doc.slug}`,
            lastmod: doc.updatedAt || dateFallback,
          }))
      : []
  },
  ['docs-sitemap'],
  { tags: ['docs-sitemap'] },
)

export async function GET() {
  const sitemap = await getDocsSitemap()
  return getServerSideSitemap(sitemap)
}
