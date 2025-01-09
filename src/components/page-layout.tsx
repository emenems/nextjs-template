import { ReactNode } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { LocaleSwitcher } from "./locale-switcher"
import { Header } from "./header"
import { NavigationItem } from "@/types/navigation"

type Props = {
  children?: ReactNode
  title?: string
  headerLinks?: NavigationItem[]
}

export default function PageLayout({ children, title, headerLinks }: Props) {
  return (
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
  )
}
