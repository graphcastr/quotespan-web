import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import { seedDocs } from './docs'
import { homeStatic } from './home-static'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'docs',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding Quotespan content...')
  payload.logger.info('— Clearing collections and globals...')

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: { navItems: [] },
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info('— Seeding home page...')
  await payload.create({
    collection: 'pages',
    depth: 0,
    data: homeStatic,
    context: { disableRevalidate: true },
  })

  payload.logger.info('— Seeding navigation...')
  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Documentation', url: '/doc' } },
          {
            link: {
              type: 'custom',
              label: 'Sign in',
              url: 'https://app.quotespan.com/auth/login',
              newTab: true,
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Documentation', url: '/doc' } },
          { link: { type: 'custom', label: 'Admin', url: '/admin' } },
        ],
      },
    }),
  ])

  await seedDocs({ payload })

  // Bust caches so the freshly seeded docs and nav show up immediately
  revalidateTag('docs-nav')
  revalidateTag('global_header')
  revalidateTag('global_footer')
  revalidatePath('/', 'layout')
  revalidatePath('/doc', 'layout')

  payload.logger.info('Quotespan content seeded successfully.')
}
