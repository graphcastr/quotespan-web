import { getDocsNav } from '@/components/Docs/getDocsNav'
import { DocSidebar } from '@/components/Docs/DocSidebar'

export default async function DocLayout({ children }: { children: React.ReactNode }) {
  const sections = await getDocsNav()
  return (
    <div className="container py-10 lg:py-14">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        <DocSidebar sections={sections} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
