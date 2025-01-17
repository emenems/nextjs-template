"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { HeaderProps } from "@/types/navigation"
import { LayoutTemplate, Menu } from "lucide-react"
import { LocaleSwitcher } from "./locale-switcher"
import { ThemeSwitcher } from "./theme-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

const defaultNavigationItems = [
  { name: "Docs", href: "/docs", isActive: true },
  { name: "Components", href: "/components" },
  { name: "Blocks", href: "/blocks" },
  { name: "Charts", href: "/charts" },
  { name: "Themes", href: "/themes" },
  { name: "Colors", href: "/colors" },
]

export function Header({
  navigationItems = defaultNavigationItems,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed left-0 right-0 top-0 z-50 border-b bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <LayoutTemplate className="h-5 w-5" />
                  <span>Template</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-2 py-1 transition-colors hover:text-foreground/80",
                      item.isActive
                        ? "font-medium text-foreground"
                        : "text-foreground/60",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - Visible on all screens */}
        <Link href="/" className="flex items-center space-x-2">
          <LayoutTemplate className="h-5 w-5" />
          <span className="font-bold">Template</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-6 hidden items-center gap-6 text-sm md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                item.isActive
                  ? "font-medium text-foreground"
                  : "text-foreground/60",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side items */}
        <div className="ml-auto flex items-center space-x-4">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
