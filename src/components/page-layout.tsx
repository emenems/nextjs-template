"use client"

import { ReactNode } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { LocaleSwitcher } from "./locale-switcher"
import { Header } from "./header"
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
      <div>
        {headerLinks ? (
          <Header navigationItems={headerLinks} />
        ) : (
          <>
            <LocaleSwitcher />
            <ThemeSwitcher />
          </>
        )}
        {children}
      </div>
    </SessionProvider>
  )
}
