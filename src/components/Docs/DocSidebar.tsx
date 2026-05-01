'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utilities/ui'
import type { DocNavSection } from './getDocsNav'

type Props = {
  sections: DocNavSection[]
}

export const DocSidebar: React.FC<Props> = ({ sections }) => {
  const pathname = usePathname() || ''
  const isOverview = pathname === '/doc' || pathname === '/doc/'
  const activeSlug = isOverview ? null : pathname.replace(/^\/doc\//, '').replace(/\/$/, '')
  return (
    <nav
      aria-label="Documentation"
      className="text-sm w-full lg:max-w-[260px] lg:sticky lg:top-24 lg:self-start"
    >
      <Link
        href="/doc"
        className={cn(
          'block px-3 py-2 mb-3 rounded-md font-semibold border',
          !activeSlug ? 'bg-muted border-border' : 'border-transparent hover:bg-muted',
        )}
      >
        Overview
      </Link>
      {sections.map((section) => (
        <div key={section.value} className="mb-5">
          <div className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {section.label}
          </div>
          <ul className="space-y-0.5">
            {section.entries.map((entry) => {
              const isActive = activeSlug === entry.slug
              return (
                <li key={entry.id}>
                  <Link
                    href={`/doc/${entry.slug}`}
                    className={cn(
                      'block px-3 py-1.5 rounded-md transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground/80 hover:text-foreground',
                    )}
                    title={entry.excerpt ?? undefined}
                  >
                    {entry.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
