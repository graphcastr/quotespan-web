import type { Payload } from 'payload'

import { type Block, lexical } from './lexical'

type DocSeed = {
  title: string
  slug: string
  section: string
  order: number
  excerpt: string
  blocks: Block[]
}

const docs: DocSeed[] = [
  // ───────────────────────────────────────── Getting started
  {
    section: 'getting-started',
    order: 10,
    slug: 'welcome',
    title: 'Welcome to Quotespan',
    excerpt:
      'Quotespan is an instant-quote tool for contractors: build pricing templates, share embeddable forms, and capture leads.',
    blocks: [
      { p: 'Quotespan helps contractors turn their pricing logic into shareable, embeddable quote forms. Customers fill in a few details, get an instant price, and you get a qualified lead in your inbox.' },
      { h: 2, text: 'What you can do today' },
      {
        ul: [
          'Build pricing templates with dimensions, categories, variants, conditional rules, materials, labor, waste and markup.',
          'Publish a public quote form for each template and share it as a link or iframe.',
          'Capture leads with contact info and the customer-facing quote attached.',
          'Send a polished, brandable share link that customers can accept or decline.',
          'Track form views, starts, completions, accept rate, revenue and per-variant pick-rate from the analytics dashboard.',
        ],
      },
      { h: 2, text: 'How the docs are organized' },
      {
        ul: [
          [{ b: 'Getting started' }, ' — sign up, take the onboarding tour, learn where things live.'],
          [{ b: 'Templates' }, ' — the pricing engine: dimensions, categories, variants, rules, labor, markup.'],
          [{ b: 'Quotes & quote builder' }, ' — building a saved quote, the breakdown, the bill of materials.'],
          [{ b: 'Public forms' }, ' — what end-customers see and how to customize it per template.'],
          [{ b: 'Leads' }, ' — the inbox, statuses, notes, CSV export and notifications.'],
          [{ b: 'Sharing & embedding' }, ' — share links, iframes and PDF export.'],
          [{ b: 'Analytics' }, ' — KPIs, funnel, daily series and variant pick-rate.'],
          [{ b: 'Account & notifications' }, ' — profile, branding and per-user notification preferences.'],
          [{ b: 'Reference' }, ' — data model overview and what is on the roadmap.'],
        ],
      },
    ],
  },
  {
    section: 'getting-started',
    order: 20,
    slug: 'create-an-account',
    title: 'Create an account',
    excerpt: 'Sign up with email + password or Google, verify your email and log in.',
    blocks: [
      { h: 2, text: 'Sign up' },
      {
        ol: [
          [
            'Go to ',
            { link: { text: '/auth/signup', url: 'https://app.quotespan.com/auth/signup' } },
            ' and enter your email and a password (an optional name field is available).',
          ],
          'You will be sent a 4-digit verification code by email. The code is valid for 10 minutes.',
          [
            'Enter the code on ',
            { code: '/auth/verify-email' },
            ' to activate your account.',
          ],
        ],
      },
      { h: 2, text: 'Sign in with Google' },
      { p: 'On the login or signup page choose “Continue with Google”. After consenting on Google we set your session cookies and redirect you straight to the dashboard.' },
      { h: 2, text: 'Forgot your password?' },
      {
        ol: [
          [
            'From the login page click ',
            { b: 'Forgot password' },
            ', enter your email and submit.',
          ],
          'You will receive a 4-digit reset code by email.',
          'Enter the code, then choose a new password.',
        ],
      },
      { h: 2, text: 'How sessions work' },
      { p: 'Quotespan signs you in with HTTP-only cookies (`access_token` + `refresh_token`). Tokens are never exposed to JavaScript or stored in localStorage.' },
    ],
  },
  {
    section: 'getting-started',
    order: 30,
    slug: 'onboarding-tour',
    title: 'Onboarding tour',
    excerpt: 'A guided three-step path: pick an industry, clone a starter template, build your first quote.',
    blocks: [
      { p: 'On first login Quotespan walks you through a short onboarding flow so you have something to share by the end of it.' },
      {
        ol: [
          [{ b: 'Splash screen' }, ' — a quick welcome and the option to skip if you already know what you are doing.'],
          [{ b: 'Industry picker' }, ' — choose the trade closest to your business (fencing, landscaping, plumbing, roofing, painting, pool service and more).'],
          [{ b: 'Starter template' }, ' — pick a sub-category and we clone a working pricing template into your account.'],
          [{ b: 'First quote' }, ' — open the quote builder in demo mode (URL flag `?demo=1`) so we can walk you through dimensions and required categories.'],
          [{ b: 'Share' }, ' — copy the public form link or iframe snippet, and you are done.'],
        ],
      },
      { p: 'Your progress is tracked on your user record. You can reset it during development from the route /onboarding/reset.' },
    ],
  },
  {
    section: 'getting-started',
    order: 40,
    slug: 'dashboard-tour',
    title: 'Dashboard tour',
    excerpt: 'Where every screen lives and how to navigate between Quotes, Templates, Forms, Leads, Analytics and Account.',
    blocks: [
      { h: 2, text: 'Top-level pages' },
      {
        ul: [
          [{ code: '/dashboard' }, ' — entry point after login (also redirects to onboarding if you have not finished it).'],
          [{ code: '/quotes' }, ' — list of every saved quote (draft, sent, accepted, declined, expired) with search, filters and sort.'],
          [{ code: '/quotes/new' }, ' — the multi-step quote builder.'],
          [{ code: '/quote/[id]/detail' }, ' — contractor detail view of a single quote (breakdown tab, bill of materials tab, share, status).'],
          [{ code: '/admin/templates' }, ' — your template library.'],
          [{ code: '/admin/forms' }, ' — overview of every public form (status, slug, lead count).'],
          [{ code: '/admin/leads' }, ' — the lead inbox.'],
          [{ code: '/admin/analytics' }, ' — KPIs, funnel and series.'],
          [{ code: '/admin/audit' }, ' — semantic audit log (superuser only).'],
          [{ code: '/account' }, ' — profile, notifications and business branding.'],
        ],
      },
      { h: 2, text: 'Public-facing pages' },
      {
        ul: [
          [{ code: '/q/[slug]' }, ' — the public quote form for one of your templates (no login).'],
          [{ code: '/quote/share/[token]' }, ' — the share link a customer opens to view, accept or decline a saved quote.'],
        ],
      },
    ],
  },

  // ───────────────────────────────────────── Templates
  {
    section: 'templates',
    order: 10,
    slug: 'templates-overview',
    title: 'Templates overview',
    excerpt: 'A template is a reusable pricing model with dimensions, categories, variants, labor, waste and markup.',
    blocks: [
      { p: 'A template is the recipe Quotespan uses to compute a price. Once you have a template you can build saved quotes from it and publish a public form so customers can self-serve.' },
      { h: 2, text: 'Anatomy of a template' },
      {
        ul: [
          [{ b: 'Dimensions' }, ' — the numeric inputs the customer (or you) enter, e.g. fence length, wall height, square footage.'],
          [{ b: 'Derived dimensions' }, ' — values computed from other dimensions using a formula (see the Dimensions & derived values page).'],
          [{ b: 'Categories' }, ' — line items in the price. Materials are ', { code: 'consumable' }, ' categories; labor add-ons and features are ', { code: 'feature' }, ' categories.'],
          [{ b: 'Variants' }, ' — the choices inside a category, each with a price and an optional capacity.'],
          [{ b: 'Conditional rules' }, ' — show / hide a category or a variant based on a dimension value.'],
          [{ b: 'Labor' }, ' — flat fee or per-dimension rate.'],
          [{ b: 'Waste %' }, ' applied to materials, and ', { b: 'Markup %' }, ' applied to the whole job cost.'],
          [{ b: 'Customer display config' }, ' — what the customer sees on the public form (price visibility, branding, lead fields).'],
        ],
      },
      { h: 2, text: 'Editing a template' },
      { p: 'Open /admin/templates and click any row to edit. The editor has five tabs:' },
      {
        ol: [
          [{ b: 'Basic' }, ' — name, trade, description.'],
          [{ b: 'Inputs' }, ' — dimensions and derived values.'],
          [{ b: 'Items' }, ' — categories and variants (materials and features).'],
          [{ b: 'Labor' }, ' — labor rate model.'],
          [{ b: 'Share & embed' }, ' — public form configuration, slug, branding, embed snippet.'],
        ],
      },
    ],
  },
  {
    section: 'templates',
    order: 20,
    slug: 'dimensions-and-derived-values',
    title: 'Dimensions & derived values',
    excerpt: 'Numeric inputs with units and defaults, plus formulas that compute other values from them.',
    blocks: [
      { h: 2, text: 'Dimensions (numeric inputs)' },
      { p: 'Each dimension has a label, a unit (e.g. ft, sqft, hours) and a default value. The default is what we use on the public form when the customer has not changed it yet.' },
      { h: 2, text: 'Derived dimensions' },
      { p: 'A derived dimension is computed from a formula referencing other dimensions. They are evaluated whenever inputs change so the price updates in real time.' },
      { h: 3, text: 'Supported functions' },
      { p: [{ code: 'ceil' }, ', ', { code: 'floor' }, ', ', { code: 'round' }, ', ', { code: 'abs' }, ', ', { code: 'min' }, ', ', { code: 'max' }, ' and the basic operators ', { code: '+' }, ' ', { code: '-' }, ' ', { code: '*' }, ' ', { code: '/' }, '.'] },
      { h: 3, text: 'Examples' },
      {
        ul: [
          [{ code: 'ceil(length / 8) + 2' }, ' — number of fence posts when posts are spaced 8 ft apart, plus two end posts.'],
          [{ code: 'max(height, 1)' }, ' — clamp height to at least 1.'],
          [{ code: 'length * height' }, ' — total surface area.'],
        ],
      },
      { quote: 'Derived dimensions can be referenced by other derived dimensions, but the engine will throw if you create a cycle.' },
    ],
  },
  {
    section: 'templates',
    order: 30,
    slug: 'categories-and-variants',
    title: 'Categories & variants',
    excerpt: 'How line items are structured: consumable vs feature, required vs optional, variant prices and capacity.',
    blocks: [
      { h: 2, text: 'Category type' },
      {
        ul: [
          [{ b: 'Consumable' }, ' — materials. Quantities are computed and waste % is applied to the subtotal.'],
          [{ b: 'Feature' }, ' — labor add-ons, upgrades and other line items. Treated as part of the features total (waste does not apply).'],
        ],
      },
      { h: 2, text: 'Required vs optional' },
      { p: 'Required categories must always have a variant selected. Optional categories can be turned on or off by the customer (or the contractor) and only contribute to the price when enabled.' },
      { h: 2, text: 'Variants' },
      { p: 'Variants are the picklist of choices in a category. Each variant has a fixed unit price and an optional capacity declaration so the engine can compute the right purchase quantity.' },
      { h: 3, text: 'Capacity' },
      { p: [{ b: 'Capacity' }, ' tells Quotespan how much one unit of this variant covers. Example: a 12 ft rail variant has capacity ', { code: '12 ft' }, ', so the engine will purchase ', { code: 'ceil(length / 12)' }, ' rails to cover the run.'] },
      { h: 3, text: 'Quantity computation' },
      {
        ul: [
          [{ b: 'Spaced' }, ' — based on a spacing formula, e.g. ', { code: 'ceil(length / 8) + 2 end posts' }, '.'],
          [{ b: 'Per-dimension' }, ' — like ', { code: 'rows = width × factor' }, '.'],
          [{ b: 'Fixed' }, ' — an absolute count, regardless of dimensions.'],
        ],
      },
    ],
  },
  {
    section: 'templates',
    order: 40,
    slug: 'conditional-rules',
    title: 'Conditional rules',
    excerpt: 'Show or hide an entire category or just a single variant based on a dimension value.',
    blocks: [
      { p: 'Conditional rules let you tailor the price model to the customer. They evaluate dimension values against simple comparators and gate either a category or one variant inside a category.' },
      { h: 2, text: 'Comparators' },
      {
        ul: [
          [{ code: 'input_gte' }, ' — show only when the dimension is greater than or equal to a threshold.'],
          [{ code: 'input_lte' }, ' — show only when the dimension is less than or equal to a threshold.'],
          [{ code: 'input_eq' }, ' — show only when the dimension equals a value.'],
        ],
      },
      { h: 2, text: 'Where you can apply rules' },
      {
        ul: [
          [{ b: 'On a variant' }, ' (', { code: 'availableWhen' }, ') — hide one option in a category. Example: an 8 ft gate variant is only offered when fence height ≥ 6 ft.'],
          [{ b: 'On a category' }, ' (', { code: 'availableWhen' }, ' / ', { code: 'requirement_rule' }, ') — hide an entire category. Example: the “Gate” category only appears when the customer says they want gates.'],
        ],
      },
      { quote: 'Rules apply to both the public form and the internal quote builder so previewed prices match what the customer sees.' },
    ],
  },
  {
    section: 'templates',
    order: 50,
    slug: 'labor-pricing',
    title: 'Labor pricing',
    excerpt: 'Pick a flat labor fee or a per-dimension rate and let the engine compute labor cost.',
    blocks: [
      { p: 'Labor is configured on the Labor tab of the template editor. Two models are supported.' },
      { h: 2, text: 'Flat labor' },
      { p: 'A single number added to every quote built from this template, regardless of dimensions.' },
      { h: 2, text: 'Per-dimension labor' },
      { p: [
        'A rate multiplied by a dimension. Example: ',
        { code: '$50/hr × hours' },
        ' where ',
        { code: 'hours' },
        ' is itself a derived dimension like ',
        { code: 'ceil(length / 20)' },
        '.',
      ] },
      { h: 2, text: 'Where labor lands in the breakdown' },
      { p: 'Labor is its own subtotal in the quote breakdown. It is part of the “job cost” that markup is applied to (see Waste & markup).' },
    ],
  },
  {
    section: 'templates',
    order: 60,
    slug: 'waste-and-markup',
    title: 'Waste & markup',
    excerpt: 'Waste % is added to materials only; markup % is applied to the entire job cost.',
    blocks: [
      { h: 2, text: 'Waste %' },
      { p: 'A per-template percentage applied to the materials subtotal only (consumable categories). It accounts for offcuts, breakage and over-purchasing.' },
      { p: [{ code: 'wasteAmount = materialsSubtotal × wastePercent' }] },
      { h: 2, text: 'Markup %' },
      { p: 'A flat percentage applied to the entire job cost (materials + waste + features + labor) to produce the customer-facing quote price.' },
      { p: [{ code: 'jobCost = materials + waste + features + labor' }] },
      { p: [{ code: 'quotePrice = jobCost × (1 + markupPercent)' }] },
      { h: 2, text: 'In the breakdown' },
      { p: 'Both numbers are visible to you on the contractor detail view (`/quote/[id]/detail`). Whether the customer sees them is controlled by the share-link financial visibility setting.' },
    ],
  },
  {
    section: 'templates',
    order: 70,
    slug: 'starter-templates',
    title: 'Starter templates',
    excerpt: 'Clone a fully working template for common trades to skip the blank page.',
    blocks: [
      { p: 'Starter templates are pre-built pricing models for common contractor trades. They are available during onboarding and from the “New template” flow at /admin/templates/new.' },
      { h: 2, text: 'How to use them' },
      {
        ol: [
          'Open /admin/templates/new (or follow the onboarding industry picker).',
          'Drill from industry → sub-category → starter.',
          'Click clone — Quotespan copies the starter into your account so you can edit it freely. The original is unaffected.',
        ],
      },
      { h: 2, text: 'Industries that ship with starters' },
      { p: 'Fencing, landscaping, plumbing, roofing, painting, pool service and several more.' },
    ],
  },
  {
    section: 'templates',
    order: 80,
    slug: 'drift-and-versioning',
    title: 'Drift detection & quote snapshots',
    excerpt: 'Draft quotes auto-recompute when the template changes; sent and accepted quotes are frozen.',
    blocks: [
      { p: 'When you change a template you do not want to silently break quotes you have already sent to customers. Quotespan handles this with template snapshots and drift checksums.' },
      { h: 2, text: 'Drafts auto-recompute' },
      { p: 'A quote in draft status is recomputed every time you open it. If the underlying template moved, prices update.' },
      { h: 2, text: 'Sent / accepted are frozen' },
      { p: 'Once a quote leaves draft, the numbers never change automatically. The quote stores a snapshot of the template it was built from, so even if you delete the template later the quote still renders correctly.' },
      { h: 2, text: 'Drift indicator' },
      { p: 'A checksum on each draft quote tells you when the template has changed underneath it, so you know what got recomputed and why.' },
    ],
  },

  // ───────────────────────────────────────── Quotes
  {
    section: 'quotes',
    order: 10,
    slug: 'quote-builder',
    title: 'The quote builder',
    excerpt: 'A multi-step wizard: pick a template, enter dimensions, choose categories, review and save.',
    blocks: [
      { p: 'The quote builder lives at /quotes/new and walks you through five steps:' },
      {
        ol: [
          [{ b: 'Template' }, ' — pick a template from your library.'],
          [{ b: 'Dimensions' }, ' — enter the numeric inputs (or accept the defaults).'],
          [{ b: 'Required categories' }, ' — choose a variant for every required line item.'],
          [{ b: 'Optional categories' }, ' — toggle on any add-ons and pick variants.'],
          [{ b: 'Review' }, ' — confirm the breakdown then save the quote.'],
        ],
      },
      { p: 'Prices update in real time as you change inputs and selections. The price the engine produces on save is what the customer will see; nothing is recomputed at view time for sent quotes.' },
      { quote: 'Variants that are gated by a conditional rule appear and disappear automatically as you edit dimensions.' },
    ],
  },
  {
    section: 'quotes',
    order: 20,
    slug: 'quote-detail',
    title: 'Quote detail page',
    excerpt: 'Breakdown, bill of materials, share link controls and status changes for one saved quote.',
    blocks: [
      { p: 'Open any saved quote from /quotes to land on /quote/[id]/detail. This page has two tabs and a sidebar of actions.' },
      { h: 2, text: 'Breakdown tab' },
      { p: 'Materials subtotal, waste, features total, labor, job cost, markup amount and the final quote price. Each line drills into the variants that contributed to it.' },
      { h: 2, text: 'Bill of materials tab' },
      { p: 'A purchase-ready list of every consumable variant. See the Bill of materials page for what each column means and the CSV export format.' },
      { h: 2, text: 'Status' },
      { p: 'Statuses follow a simple pipeline: draft → sent → accepted | declined | expired. Change status from the sidebar at any time.' },
      { h: 2, text: 'Share' },
      { p: 'Generate a one-time URL the customer can open without an account. See the Share link page for details.' },
    ],
  },
  {
    section: 'quotes',
    order: 30,
    slug: 'bill-of-materials',
    title: 'Bill of materials',
    excerpt: 'Per-quote purchase list with required vs purchase quantity, overage and a CSV export.',
    blocks: [
      { p: 'Every quote has a bill of materials (BOM) tab on /quote/[id]/detail. It shows the consumable variants only — features and labor are excluded.' },
      { h: 2, text: 'Columns' },
      {
        ul: [
          [{ b: 'Category' }, ' — the line-item group.'],
          [{ b: 'Item' }, ' — the variant name.'],
          [{ b: 'Required' }, ' — the engine-computed amount and unit (e.g. 47 ft).'],
          [{ b: 'Purchase' }, ' — the rounded-up purchase quantity using variant capacity (e.g. 4 × 12 ft rails).'],
          [{ b: 'Overage' }, ' — the % over what is strictly required, useful for spotting wasteful spec.'],
          [{ b: 'Unit price / Total' }, ' — the line cost.'],
        ],
      },
      { h: 2, text: 'CSV export' },
      { p: [
        'Click ',
        { b: 'Export CSV' },
        ' on the BOM tab. The file is named ',
        { code: 'bom-{customer-name}.csv' },
        '.',
      ] },
    ],
  },

  // ───────────────────────────────────────── Public forms
  {
    section: 'forms',
    order: 10,
    slug: 'public-forms-overview',
    title: 'Public forms overview',
    excerpt: 'Every template gets a public form at /q/[slug] — turn it on, copy the link, you’re live.',
    blocks: [
      { p: 'A public form is the customer-facing version of one of your templates. It lives at a stable URL on your account and is the primary way to capture leads.' },
      { h: 2, text: 'Where it lives' },
      { p: [{ code: 'https://app.quotespan.com/q/[slug]' }, ' — the slug is set per template on the Share & embed tab.'] },
      { h: 2, text: 'The forms inbox' },
      { p: '/admin/forms shows every template with a configurable public form. For each you see its status (live or off), its slug, the lead count and the date of the most recent lead. Click any row to jump to the configuration tab.' },
      { h: 2, text: 'Switching it on or off' },
      { p: 'On the Share & embed tab of the template, toggle the form live. Public traffic hitting /q/[slug] gets a friendly “form is closed” page when it is off.' },
    ],
  },
  {
    section: 'forms',
    order: 20,
    slug: 'customizing-the-form',
    title: 'Customizing the form',
    excerpt: 'Hide inputs and categories per template, control which lead fields are required.',
    blocks: [
      { h: 2, text: 'Per-input visibility' },
      { p: 'Each dimension can be shown or hidden on the public form. Hidden dimensions still feed the price calculation using their default value.' },
      { h: 2, text: 'Per-category visibility' },
      {
        ul: [
          [{ b: 'Show' }, ' — the customer can pick a variant.'],
          [{ b: 'Hidden' }, ' — the category is not shown but its cost is still included in the total (great for default add-ons).'],
          [{ b: 'Internal' }, ' — the category is excluded from the customer-facing price entirely.'],
        ],
      },
      { h: 2, text: 'Lead fields' },
      { p: 'Toggle which fields are collected when the customer submits: name, email, phone, description (free-text). All four are shipped today.' },
      { h: 2, text: 'Lead-set quantities' },
      { p: 'For some categories you can let the customer pick the quantity directly (e.g. number of gates) instead of having the engine compute it from a dimension. This setting lives on the category in the template editor.' },
    ],
  },
  {
    section: 'forms',
    order: 30,
    slug: 'price-display',
    title: 'Price display & lead gating',
    excerpt: 'Show prices instantly, blur them, or hide behind a “get my price” modal — and choose between exact figures and rounded ranges.',
    blocks: [
      { h: 2, text: 'Gate modes' },
      {
        ul: [
          [{ b: 'Modal reveal' }, ' — the price area shows a “Get my price” button. Clicking it opens a modal asking for contact info; on submit, the price is revealed and the lead is captured.'],
          [{ b: 'Inline blur' }, ' — the price area is rendered blurred with a contact form on top. Submitting the form unblurs the price.'],
          [{ b: 'No gate' }, ' — the price is always visible.'],
        ],
      },
      { h: 2, text: 'Display modes' },
      {
        ul: [
          [{ b: 'Exact' }, ' — show the engine number to the dollar.'],
          [{ b: 'Range' }, ' — show ±X% bands (you choose X) with optional rounding to the nearest $50 / $100 / $500.'],
        ],
      },
      { h: 2, text: 'Hide price entirely' },
      { p: 'You can also choose to never show a price on the form. Submissions land as leads with status `awaiting_review` so you can quote manually.' },
      { quote: 'No matter what the form shows, the server always recomputes the authoritative price on submit so you can trust the lead amount.' },
    ],
  },
  {
    section: 'forms',
    order: 40,
    slug: 'branding',
    title: 'Branding the public form',
    excerpt: 'Logo, primary color, intro and thank-you copy — all per template.',
    blocks: [
      { p: 'Each template carries its own branding so multi-trade businesses can have a different look per service.' },
      {
        ul: [
          [{ b: 'Company name' }, ' and ', { b: 'tagline' }, ' shown above the form.'],
          [{ b: 'Logo' }, ' — uploaded in the template editor.'],
          [{ b: 'Primary color' }, ' applied to buttons, links and the price callout.'],
          [{ b: 'Intro text' }, ' — a paragraph rendered above the inputs.'],
          [{ b: 'Thank-you message' }, ' — shown after the customer submits the lead.'],
        ],
      },
      { p: 'Account-level defaults (company name, brand color) live under /account → Business and feed any template that has not overridden them.' },
    ],
  },

  // ───────────────────────────────────────── Leads
  {
    section: 'leads',
    order: 10,
    slug: 'leads-inbox',
    title: 'Leads inbox',
    excerpt: 'Filter, sort, archive, export. Statuses: new, awaiting_review, contacted, won, lost.',
    blocks: [
      { p: 'Every form submission becomes a lead in /admin/leads. The inbox is built around fast triage.' },
      { h: 2, text: 'List columns' },
      { p: 'Submitted-on date, customer name, email, template, computed total, status.' },
      { h: 2, text: 'Filters & sort' },
      {
        ul: [
          'Active / archived / all toggle.',
          'Filter by status (new, awaiting_review, contacted, won, lost).',
          'Filter by template.',
          'Search by name, email or template name.',
          'Sort by date or by lead amount.',
        ],
      },
      { h: 2, text: 'CSV export' },
      { p: [
        'The ',
        { b: 'Export CSV' },
        ' action exports the visible (filtered) rows with columns: date, name, email, phone, template, total, status.',
      ] },
    ],
  },
  {
    section: 'leads',
    order: 20,
    slug: 'lead-detail',
    title: 'Working a lead',
    excerpt: 'Open the lead drawer to see contact info, the full computed quote, change status, add notes.',
    blocks: [
      { p: 'Click any row in the inbox to open the lead drawer. From here you can:' },
      {
        ul: [
          'See the customer’s name, email, phone and free-text description.',
          'See the full computed quote (totals + breakdown) the customer was shown at submit time.',
          'Change the status from a dropdown.',
          'Add or edit a free-text note (saved to the lead).',
          'Archive the lead (it stays searchable, just out of the active view) or delete it permanently.',
          'Resend the notification email — useful if the original delivery failed or got missed.',
        ],
      },
    ],
  },
  {
    section: 'leads',
    order: 30,
    slug: 'notifications',
    title: 'Lead notifications',
    excerpt: 'Email via Mailgun (always); SMS via Twilio (optional). Retried with backoff and resendable.',
    blocks: [
      { p: 'When a lead is captured Quotespan enqueues a notification to you. The work is done by a queue with retries so a transient provider hiccup does not lose the alert.' },
      { h: 2, text: 'Channels' },
      {
        ul: [
          [{ b: 'Email' }, ' — sent through Mailgun. Always available.'],
          [{ b: 'SMS' }, ' — sent through Twilio. Only enabled when the Twilio credentials are configured on the server.'],
        ],
      },
      { h: 2, text: 'Lifecycle' },
      { p: [
        'Each notification is persisted with a status: ',
        { code: 'pending' },
        ' → ',
        { code: 'sending' },
        ' → ',
        { code: 'sent' },
        '. On failure it is requeued with exponential backoff up to 5 attempts, then moved to ',
        { code: 'dead' },
        '.',
      ] },
      { h: 2, text: 'Per-user preferences' },
      { p: [
        'Toggle ',
        { code: 'notifyByEmail' },
        ' and ',
        { code: 'notifyBySms' },
        ' under /account → Notifications. The dispatcher respects them before enqueueing.',
      ] },
      { h: 2, text: 'Resend from a lead' },
      { p: 'Open any lead in the inbox and click Resend notification — useful if the original landed in spam or you simply missed it.' },
    ],
  },

  // ───────────────────────────────────────── Sharing
  {
    section: 'sharing',
    order: 10,
    slug: 'share-link',
    title: 'Share link',
    excerpt: 'Generate a per-quote token URL that the customer can open and accept (or decline).',
    blocks: [
      { p: 'A share link is the polished, customer-facing version of a saved quote. It lives at a token URL — no login required, the token is the credential.' },
      { p: [{ code: 'https://app.quotespan.com/quote/share/[token]' }] },
      { h: 2, text: 'Generating one' },
      { p: 'On /quote/[id]/detail click Share. A token is created and the URL is copied to your clipboard.' },
      { h: 2, text: 'What the customer sees' },
      { p: 'Branding from the template, the line items they care about, and Accept / Decline buttons. Their decision is recorded against the quote and bumps its status.' },
      { h: 2, text: 'Hiding financials' },
      { p: 'For each share link you can choose whether to expose the full price breakdown or just the bottom line. The customer never sees waste %, markup % or your cost numbers.' },
    ],
  },
  {
    section: 'sharing',
    order: 20,
    slug: 'iframe-embed',
    title: 'Embed the form on your site',
    excerpt: 'Paste an iframe snippet on any website to host the public form in-page.',
    blocks: [
      { p: 'You can embed the public form on your own marketing site by copying the iframe snippet from the template editor.' },
      { h: 2, text: 'Where to find it' },
      { p: 'Open the template, go to the Share & embed tab. The snippet is generated for you using the template’s slug.' },
      { h: 2, text: 'The snippet' },
      {
        p: [
          { code: '<iframe src="https://app.quotespan.com/q/[slug]?embed=1" style="width:100%;height:900px;border:0"></iframe>' },
        ],
      },
      { p: [
        'The ',
        { code: '?embed=1' },
        ' flag tells the form to drop the standalone Quotespan chrome (no app header / footer) so it slots cleanly into your page.',
      ] },
      { quote: 'A standalone JavaScript widget (script-tag embed) and custom domains for forms are on the roadmap — see Reference → Roadmap.' },
    ],
  },
  {
    section: 'sharing',
    order: 30,
    slug: 'pdf-export',
    title: 'PDF export',
    excerpt: 'Append ?print=1 to a quote URL to open the browser print dialog and save as PDF.',
    blocks: [
      { p: 'Quotespan does not generate PDFs server-side. Instead any quote view supports a print mode that triggers your browser’s built-in PDF export.' },
      { h: 2, text: 'How to use it' },
      {
        ol: [
          'Open a quote share URL or your own contractor detail view.',
          [
            'Append ',
            { code: '?print=1' },
            ' to the URL (e.g. ',
            { code: '/quote/share/abc123?print=1' },
            ').',
          ],
          'Your browser opens the print dialog. Choose “Save as PDF”.',
        ],
      },
      { p: 'The print stylesheet hides navigation chrome and renders a clean, single-document layout.' },
    ],
  },

  // ───────────────────────────────────────── Analytics
  {
    section: 'analytics',
    order: 10,
    slug: 'analytics-overview',
    title: 'Analytics dashboard',
    excerpt: 'KPIs, conversion funnel, daily series, per-template breakdown and variant pick rate — all per contractor account.',
    blocks: [
      { p: '/admin/analytics gives you a single view of how your forms and quotes are performing over a chosen date range.' },
      { h: 2, text: 'Date range & scope' },
      {
        ul: [
          'Date range: 7 / 30 / 90 day presets, or a custom start and end.',
          'Scope: all events / public forms only / quotes only.',
          'Filter to a specific form via dropdown.',
        ],
      },
      { h: 2, text: 'KPIs' },
      {
        ul: [
          'Form views, starts, abandons, completions.',
          'Quote views, accepts, declines.',
          'Lead total, accept rate %, revenue (sum of computed quote prices on captured leads).',
          'Cost-per-lead and acceptance rate are surfaced as percentage changes vs. the previous period.',
        ],
      },
      { h: 2, text: 'Visualizations' },
      {
        ul: [
          'KPI cards with metric + change %.',
          [{ b: 'Funnel ribbon' }, ' for ', { code: 'form_view → form_start → form_complete' }, '.'],
          [{ b: 'Daily series' }, ' chart (line or bar).'],
          [{ b: 'Per-template breakdown' }, ' table.'],
          [{ b: 'Variant pick rate' }, ' — which add-on options are most often chosen.'],
        ],
      },
      { h: 2, text: 'UTM tracking' },
      { p: [
        'When the form is opened with ',
        { code: 'utm_source' },
        ', ',
        { code: 'utm_medium' },
        ' or ',
        { code: 'utm_campaign' },
        ' parameters, those are stored on the analytics events so you can attribute leads to their source.',
      ] },
      { h: 2, text: 'Privacy' },
      { p: 'Quotespan never stores email, phone or name on analytics events. IP addresses are SHA-256 hashed and session IDs are anonymous. Lead PII lives only on the leads collection.' },
    ],
  },

  // ───────────────────────────────────────── Account
  {
    section: 'account',
    order: 10,
    slug: 'account',
    title: 'Account settings',
    excerpt: 'Profile, business branding and notification preferences in one place.',
    blocks: [
      { p: '/account has three tabs.' },
      { h: 2, text: 'Profile' },
      { p: 'First name, last name, email, phone, country, change password.' },
      { h: 2, text: 'Notifications' },
      { p: 'Per-user toggles for email and SMS lead notifications. The dispatcher reads these before enqueueing each notification.' },
      { h: 2, text: 'Business' },
      { p: 'Company name, brand color and other display defaults that feed any template that has not overridden them on its Share & embed tab.' },
    ],
  },

  // ───────────────────────────────────────── Reference
  {
    section: 'reference',
    order: 10,
    slug: 'data-model',
    title: 'Data model overview',
    excerpt: 'How templates, dimensions, categories, variants, quotes and leads relate.',
    blocks: [
      { p: 'A high-level view of the entities in Quotespan and the fields you will see referenced throughout the docs.' },
      { h: 2, text: 'Template' },
      { p: [
        { code: 'dimensions[]' },
        ', ',
        { code: 'derived[]' },
        ', ',
        { code: 'categories[]' },
        ' (each with ',
        { code: 'variants[]' },
        '), ',
        { code: 'wastePercent' },
        ', ',
        { code: 'markupPercent' },
        ', ',
        { code: 'labor' },
        ', ',
        { code: 'customerDisplay' },
        '.',
      ] },
      { h: 2, text: 'Category' },
      { p: [
        { code: 'type' },
        ' (', { code: 'consumable' }, ' | ', { code: 'feature' }, '), ',
        { code: 'required' },
        ', ',
        { code: 'occurrence_rule' },
        ', ',
        { code: 'requirement_rule' },
        ', ',
        { code: 'variants[]' },
        ', ',
        { code: 'availableWhen' },
        ' rules.',
      ] },
      { h: 2, text: 'Variant' },
      { p: [
        { code: 'price' },
        ', ',
        { code: 'capacity' },
        ' (amount + unit), ',
        { code: 'availableWhen' },
        ' rules.',
      ] },
      { h: 2, text: 'Quote' },
      { p: [
        { code: 'dimensions' },
        ', ',
        { code: 'selections[]' },
        ' (categoryId, variantId, enabled, qty), ',
        { code: 'materialsSubtotal' },
        ', ',
        { code: 'wasteAmount' },
        ', ',
        { code: 'featuresTotal' },
        ', ',
        { code: 'laborTotal' },
        ', ',
        { code: 'jobCost' },
        ', ',
        { code: 'markupAmount' },
        ', ',
        { code: 'quotePrice' },
        '.',
      ] },
      { h: 2, text: 'Lead' },
      { p: 'Captured contact info (name, email, phone, description), the computed quote at submit time, status, notes, archived flag.' },
    ],
  },
  {
    section: 'reference',
    order: 20,
    slug: 'roadmap',
    title: 'Roadmap — what is not (yet) shipped',
    excerpt: 'A list of features people often expect but that are not in the product today.',
    blocks: [
      { p: 'These are commonly-requested features that are NOT in Quotespan today. We list them here so the docs stay honest and you don’t go hunting for a setting that doesn’t exist.' },
      { h: 2, text: 'Not shipped' },
      {
        ul: [
          [{ b: 'Stripe billing & paid tiers' }, ' — every account is currently on a single tier with no usage limits.'],
          [{ b: 'Team seats / multi-user accounts' }, ' — one user per account today.'],
          [{ b: 'Public REST or GraphQL API' }, ' — there is no token-issuing flow and no public API surface.'],
          [{ b: 'Webhooks' }, ' — there is no outbound webhook configuration in the admin.'],
          [{ b: 'Zapier / Make triggers' }, ' — no Zapier app or Make module is published; this depends on the public API + webhooks above.'],
          [{ b: 'CRM sync' }, ' (Jobber, HubSpot, Pipedrive, Salesforce) — not implemented.'],
          [{ b: 'JavaScript widget / script-tag embed' }, ' — only the iframe embed is supported.'],
          [{ b: 'Custom domain for public forms' }, ' — forms today live under app.quotespan.com/q/[slug].'],
          [{ b: 'Server-generated PDFs' }, ' — PDF export today goes through the browser print dialog (see PDF export).'],
        ],
      },
      { quote: 'If you are evaluating Quotespan and one of these is a deal-breaker, please get in touch — we want to know what to build next.' },
    ],
  },
]

export const seedDocs = async ({ payload }: { payload: Payload }) => {
  payload.logger.info('— Seeding docs...')

  for (const d of docs) {
    await payload.create({
      collection: 'docs',
      data: {
        title: d.title,
        slug: d.slug,
        section: d.section as any,
        order: d.order,
        excerpt: d.excerpt,
        content: lexical(d.blocks) as any,
        _status: 'published',
      },
      context: { disableRevalidate: true },
    })
  }

  payload.logger.info(`  Seeded ${docs.length} doc pages.`)
}
