import Link from "next/link"
import { ReactNode } from "react"
import { SidebarNav } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "設定",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "プロフィール",
    href: "/settings",
  },
  {
    title: "アカウント",
    href: "/settings/account",
  },
]

export default function SettingsLayout({ children }: {
  children: ReactNode
}) {
  return (
    <main className='p-12 space-y-4'>
      <h1 className='text-2xl font-semibold'>設定</h1>
      <Separator />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </main>
  )
}
