'use client'

import Link from "next/link"
import {cn } from "@/lib/utils"
import type { HeaderProps } from "@/types/navigation"
import { LayoutTemplate } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme-switcher";

const defaultNavigationItems = [
  { name: "Docs", href: "/docs", isActive: true },
  { name: "Components", href: "/components" },
  { name: "Blocks", href: "/blocks" },
  { name: "Charts", href: "/charts" },
  { name: "Themes", href: "/themes" },
  { name: "Colors", href: "/colors" }
]

export function Header({ 
  navigationItems = defaultNavigationItems 
}: HeaderProps) {
  return (
    <div className="border-b">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LayoutTemplate className="h-5 w-5" />
            <span className="hidden font-bold sm:inline-block">
              Template
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  item.isActive ? "text-foreground font-medium" : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}

