"use client"

import PageLayout from "@/components/page-layout"
import { useTranslations } from "next-intl"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tFeed = useTranslations("Feedback")
  const tNav = useTranslations("Navigation")
  const navigationItems = [
    { name: tNav("home"), href: "/" },
    { name: tNav("login"), href: "/login" },
    { name: tNav("signup"), href: "/signup" },
    { name: tNav("feedback"), href: "/feedback" },
    { name: tNav("admin"), href: "/admin", isActive: true },
  ]

  return (
    <PageLayout title={tFeed("title")} headerLinks={navigationItems}>
      <div className="mt-24 p-8">{children}</div>
      <Toaster />
    </PageLayout>
  )
}
