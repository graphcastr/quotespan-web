import type { RequiredDataFromCollectionSlug } from 'payload'

import { type Block, lexical } from './docs/lexical'

// Small helper so each column / cta richText is a one-liner below.
const rt = (blocks: Block[]) => lexical(blocks) as unknown as Record<string, unknown>

// Used as a fallback when the homepage hasn't been seeded yet.
// Modeled after the marketing structure of quoteflow.com but written for
// Quotespan and assembled exclusively out of the existing Payload blocks
// (lowImpact hero, content columns, and CTA blocks).
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Home',
  meta: {
    description:
      'Quotespan turns your contractor pricing into instant, embeddable quote forms. Capture leads with their price already calculated.',
    title: 'Quotespan — Stop losing leads to slow quotes',
  },
  hero: {
    type: 'lowImpact',
    richText: rt([
      { h: 1, text: 'Stop losing leads to slow quotes.' },
      {
        p: [
          'Build a pricing template once. Embed a self-serve quote form on your website. ',
          'Capture qualified leads with the price already calculated — before your competitors ',
          'even check their voicemail.',
        ],
      },
    ]) as RequiredDataFromCollectionSlug<'pages'>['hero']['richText'],
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: 'Get started free',
          url: '/q/new',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: 'Read the documentation',
          url: '/doc',
          newTab: false,
        },
      },
    ],
  },
  layout: [
    // ─── Section: How it works ──────────────────────────────────────────────
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          enableLink: false,
          richText: rt([
            { h: 2, text: 'How it works' },
            {
              p:
                'Turn your mental pricing checklist into an automated process. Three steps to ' +
                'go from a blank page to a live quote form on your website.',
            },
          ]) as never,
        },
        {
          size: 'oneThird',
          enableLink: false,
          richText: rt([
            { h: 3, text: '1. Build' },
            {
              p:
                'Use the visual editor to map your sales process. Add sections, fields, and ' +
                'pricing rules — request the photos, measurements, and specs you would ask ' +
                'for on a site visit.',
            },
          ]) as never,
        },
        {
          size: 'oneThird',
          enableLink: false,
          richText: rt([
            { h: 3, text: '2. Embed' },
            {
              p:
                'Publish the template and drop a single snippet onto your website. Works ' +
                'with WordPress, Squarespace, Wix, Webflow, and any custom site — no ' +
                'rebuild required.',
            },
          ]) as never,
        },
        {
          size: 'oneThird',
          enableLink: false,
          richText: rt([
            { h: 3, text: '3. Capture' },
            {
              p:
                'Every submission becomes a qualified lead with the price already ' +
                'calculated, the customer details captured, and a shareable PDF you can ' +
                'send back instantly.',
            },
          ]) as never,
        },
      ],
    },

    // ─── Section: Build quotes the way you think (CTA-style) ───────────────
    {
      blockType: 'cta',
      richText: rt([
        { h: 2, text: 'Build quotes the way you think.' },
        {
          p:
            'Weed out tire kickers, skip the phone tag, and deliver the instant quote that ' +
            'locks in the job. Quotespan handles the messy "it depends" pricing that ' +
            'generic contact forms cannot.',
        },
      ]) as never,
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'See an example template',
            url: '/doc',
            newTab: false,
          },
        },
      ],
    },

    // ─── Section: Feature trio ─────────────────────────────────────────────
    {
      blockType: 'content',
      columns: [
        {
          size: 'oneThird',
          enableLink: false,
          richText: rt([
            { h: 3, text: 'Conditional logic' },
            {
              p:
                'Ask the right questions based on previous answers. Hide irrelevant ' +
                'sections, branch by service type, and qualify leads accurately.',
            },
          ]) as never,
        },
        {
          size: 'oneThird',
          enableLink: false,
          richText: rt([
            { h: 3, text: 'Dynamic pricing' },
            {
              p:
                'Adjust costs automatically based on complexity, access, materials, and ' +
                'site conditions. Math formulas, tiered pricing, and minimum trip charges ' +
                'are first-class citizens.',
            },
          ]) as never,
        },
        {
          size: 'oneThird',
          enableLink: false,
          richText: rt([
            { h: 3, text: 'Embed anywhere' },
            {
              p:
                'Share by link or paste a single embed snippet onto your existing site. ' +
                'Quotespan is a smart widget that lives on your site — not a replacement ' +
                'for it.',
            },
          ]) as never,
        },
      ],
    },

    // ─── Section: Free forever (CTA) ───────────────────────────────────────
    {
      blockType: 'cta',
      richText: rt([
        { h: 2, text: 'No lost leads. Free forever.' },
        {
          p:
            'If we are not helping you make money, we should not be costing you money. ' +
            'Standard quote forms are free, with no lead caps, no contracts, and no ' +
            'surprises. Pay only when you need the advanced logic builder.',
        },
      ]) as never,
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Start your first template',
            url: '/q/new',
            newTab: false,
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'See pricing details',
            url: '/doc',
            newTab: false,
          },
        },
      ],
    },

    // ─── Section: FAQ ──────────────────────────────────────────────────────
    {
      blockType: 'content',
      columns: [
        {
          size: 'full',
          enableLink: false,
          richText: rt([{ h: 2, text: 'Everything you need to know' }]) as never,
        },
        {
          size: 'half',
          enableLink: false,
          richText: rt([
            { h: 4, text: 'Do I need to know how to code?' },
            {
              p:
                'Zero coding required. The visual editor lets you build sections, fields, ' +
                'and pricing rules with a few clicks. If you can fill out a form, you can ' +
                'build a Quotespan template.',
            },
          ]) as never,
        },
        {
          size: 'half',
          enableLink: false,
          richText: rt([
            { h: 4, text: 'Does this replace my current website?' },
            {
              p:
                'No. Quotespan is a smart widget that lives on your existing site. It ' +
                'works seamlessly with WordPress, Squarespace, Wix, Webflow, and custom ' +
                'sites.',
            },
          ]) as never,
        },
        {
          size: 'half',
          enableLink: false,
          richText: rt([
            { h: 4, text: 'Do I have to move all my pricing online at once?' },
            {
              p:
                'Not at all. Start with a single service to test the waters and keep ' +
                'complex jobs manual. Automate what you are comfortable with and scale up ' +
                'when you are ready.',
            },
          ]) as never,
        },
        {
          size: 'half',
          enableLink: false,
          richText: rt([
            { h: 4, text: 'What if my pricing is really complex?' },
            {
              p:
                'Quotespan was built for trades, not e-commerce. The builder supports math ' +
                'formulas, conditional logic, tiered pricing, and minimum trip charges out ' +
                'of the box.',
            },
          ]) as never,
        },
        {
          size: 'half',
          enableLink: false,
          richText: rt([
            { h: 4, text: 'Can I review the quote before the customer sees it?' },
            {
              p:
                'Yes. You decide whether to show an exact price, a price range, or simply ' +
                'confirm the quote was submitted. Quotespan captures the data — you keep ' +
                'the final say on the dollar amount.',
            },
          ]) as never,
        },
        {
          size: 'half',
          enableLink: false,
          richText: rt([
            { h: 4, text: 'Is there a setup fee?' },
            {
              p:
                'No, self-service setup is completely free. Reach out if you would like a ' +
                'hand mapping your first pricing flow.',
            },
          ]) as never,
        },
      ],
    },

    // ─── Final CTA ─────────────────────────────────────────────────────────
    {
      blockType: 'cta',
      richText: rt([
        { h: 2, text: 'Ready to send your first instant quote?' },
        {
          p:
            'Most customers sign the first quote they receive. Automate your intake and ' +
            'win the job before your competitors even pick up the phone.',
        },
      ]) as never,
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Get started free',
            url: '/q/new',
            newTab: false,
          },
        },
      ],
    },
  ],
}
