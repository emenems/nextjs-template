"use client"

import PageLayout from "@/components/page-layout"
import { useTranslations } from "next-intl"

export default function FeedbackLayout({
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
    { name: tNav("feedback"), href: "/feedback", isActive: true },
    { name: tNav("admin"), href: "/admin" },
  ]

  return (
    <PageLayout title={tFeed("title")} headerLinks={navigationItems}>
      <div className="mt-24 p-8">{children}</div>
    </PageLayout>
  )
}
