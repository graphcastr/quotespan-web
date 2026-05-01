import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateDoc, revalidateDocDelete } from './hooks/revalidateDoc'

export const DOC_SECTIONS = [
  { label: 'Getting started', value: 'getting-started' },
  { label: 'Templates', value: 'templates' },
  { label: 'Quotes & quote builder', value: 'quotes' },
  { label: 'Public forms', value: 'forms' },
  { label: 'Leads', value: 'leads' },
  { label: 'Sharing & embedding', value: 'sharing' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Account & notifications', value: 'account' },
  { label: 'Reference', value: 'reference' },
] as const

export const Docs: CollectionConfig<'docs'> = {
  slug: 'docs',
  labels: {
    singular: 'Doc page',
    plural: 'Documentation',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    section: true,
    order: true,
    excerpt: true,
  },
  admin: {
    defaultColumns: ['title', 'section', 'order', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Documentation',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description:
          'Short one-line summary shown in the sidebar tooltip and SEO description.',
      },
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      options: DOC_SECTIONS.map((s) => ({ label: s.label, value: s.value })),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Order within the section (ascending).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateDoc],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDocDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 200 },
    },
    maxPerDoc: 25,
  },
}
