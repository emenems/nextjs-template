"use client"

import { ReactNode } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { LocaleSwitcher } from "./locale-switcher"
import { Header } from "./header"
import { Footer } from "./footer"
import { NavigationItem } from "@/types/navigation"
import { SessionProvider } from "next-auth/react"

type Props = {
  children?: ReactNode
  title?: string
  headerLinks?: NavigationItem[]
  session?: any
}

export default function PageLayout({
  children,
  title,
  headerLinks,
  session,
}: Props) {
  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen flex-col">
        {headerLinks ? (
          <Header navigationItems={headerLinks} />
        ) : (
          <>
            <LocaleSwitcher />
            <ThemeSwitcher />
          </>
        )}
        <main className="mb-8 flex-grow">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  )
}
