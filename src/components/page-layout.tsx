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
            <div className="ml-auto flex items-center space-x-4">
              <LocaleSwitcher />
              <ThemeSwitcher />
            </div>
          </>
        )}
        <main className="mb-8 flex-grow">{children}</main>
        {headerLinks ? <Footer /> : null}
      </div>
    </SessionProvider>
  )
}
