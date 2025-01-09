"use client"

import PageLayout from "@/components/page-layout"
import { useTranslations } from "next-intl"
// import { GITHUB_REPO_LINK } from "@/config/constants"
import { Hero } from "@/components/hero"
import { FeatureList } from "@/components/feature-list"
import type { Feature } from "@/types/feature"
import {
  KeyRound,
  Languages,
  Moon,
  ComponentIcon as Components,
  BarChart3,
  Github,
} from "lucide-react"
import { Session } from "next-auth"

type Props = {
  session: Session | null
}

export default function LandingPage({ session }: Props) {
  const tNav = useTranslations("Navigation")
  const tFeat = useTranslations("Index.features")

  const navigationItems = [
    { name: tNav("home"), href: "/docs", isActive: true },
    { name: tNav("login"), href: "/login" },
    { name: tNav("signup"), href: "/signup" },
    { name: tNav("feedback"), href: "/feedback" },
    { name: tNav("admin"), href: "/admin" },
  ]

  const features: Feature[] = [
    {
      title: tFeat("authentication.title"),
      description: tFeat("authentication.description"),
      icon: KeyRound,
    },
    {
      title: tFeat("internationalization.title"),
      description: tFeat("internationalization.description"),
      icon: Languages,
    },
    {
      title: tFeat("themes.title"),
      description: tFeat("themes.description"),
      icon: Moon,
    },
    {
      title: tFeat("components.title"),
      description: tFeat("components.description"),
      icon: Components,
    },
    {
      title: tFeat("analytics.title"),
      description: tFeat("analytics.description"),
      icon: BarChart3,
    },
    {
      title: tFeat("free.title"),
      description: tFeat("free.description"),
      icon: Github,
    },
  ]

  return (
    <PageLayout title="Home" headerLinks={navigationItems}>
      <Hero />
      <FeatureList features={features} />
    </PageLayout>
  )
}
