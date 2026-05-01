import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Doc } from '../../../payload-types'

const docPath = (slug?: string | null) => (slug ? `/doc/${slug}` : '/doc')

export const revalidateDoc: CollectionAfterChangeHook<Doc> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    const path = docPath(doc.slug)
    payload.logger.info(`Revalidating doc at path: ${path}`)
    revalidatePath(path)
    revalidatePath('/doc')
    revalidateTag('docs-nav', 'max')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = docPath(previousDoc.slug)
    payload.logger.info(`Revalidating old doc at path: ${oldPath}`)
    revalidatePath(oldPath)
    revalidatePath('/doc')
    revalidateTag('docs-nav', 'max')
  }

  return doc
}

export const revalidateDocDelete: CollectionAfterDeleteHook<Doc> = ({
  doc,
  req: { context },
}) => {
  if (context.disableRevalidate) return doc
  revalidatePath(docPath(doc?.slug))
  revalidatePath('/doc')
  revalidateTag('docs-nav', 'max')
  return doc
}
