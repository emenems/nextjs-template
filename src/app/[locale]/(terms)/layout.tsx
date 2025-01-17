"use client"

import PageLayout from "@/components/page-layout"
import { useTranslations } from "next-intl"

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tNav = useTranslations("Navigation")
  const navigationItems = [
    { name: tNav("home"), href: "/" },
    { name: tNav("login"), href: "/login" },
    { name: tNav("signup"), href: "/signup" },
    { name: tNav("feedback"), href: "/feedback" },
    { name: tNav("admin"), href: "/admin" },
  ]

  return (
    <PageLayout title={"Terms of use"} headerLinks={navigationItems}>
      <div className="mt-24 p-8">{children}</div>
    </PageLayout>
  )
}
