"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Github, LayoutTemplate, Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { LocaleSwitcher } from "@/components/locale-switcher"

export default function LoginPage() {
  const t = useTranslations("User")
  const h = useTranslations("Index.hero")
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex min-h-screen">
      {/* Left side - Dark section */}
      <div className="relative hidden w-1/2 bg-black lg:block">
        <div className="flex h-full flex-col p-8">
          {/* <Link href="/" className="flex items-center space-x-2 text-white">
            <LayoutTemplate className="h-5 w-5" />
            <span className="font-bold">Template</span>
          </Link> */}
          <div className="mt-auto flex items-center gap-4">
            <div className="w-20">
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full"
                initial="hidden"
                animate="visible"
              >
                {/* Top rectangle */}
                <motion.path
                  d="M20 20 L80 20 Q85 20 85 25 L85 40 Q85 45 80 45 L20 45 Q15 45 15 40 L15 25 Q15 20 20 20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: {
                      pathLength: 1,
                      transition: { duration: 2, ease: "easeInOut" },
                    },
                  }}
                />
                {/* Bottom left rectangle */}
                <motion.path
                  d="M20 55 L50 55 Q55 55 55 60 L55 75 Q55 80 50 80 L20 80 Q15 80 15 75 L15 60 Q15 55 20 55"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: {
                      pathLength: 1,
                      transition: {
                        duration: 2,
                        ease: "easeInOut",
                        delay: 0.5,
                      },
                    },
                  }}
                />
                {/* Bottom right rectangle */}
                <motion.path
                  d="M65 55 L80 55 Q85 55 85 60 L85 75 Q85 80 80 80 L65 80 Q60 80 60 75 L60 60 Q60 55 65 55"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: {
                      pathLength: 1,
                      transition: {
                        duration: 2,
                        ease: "easeInOut",
                        delay: 1,
                      },
                    },
                  }}
                />
              </motion.svg>
            </div>
            <div className="space-y-1">
              <motion.p
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3 }}
              >
                Template
              </motion.p>
              <motion.p
                className="text-sm text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.2 }}
              >
                {h("title-1")} {h("title-2")}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex justify-end p-8">
          <Link
            className="mt-2 text-sm font-medium hover:underline"
            href="/login"
          >
            {t("Login.title")}
          </Link>
          <div className="ml-2">
            <LocaleSwitcher />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-8">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">{t("Create.description")}</h1>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("Common.email")}</Label>
                <Input
                  id="email"
                  className="w-full"
                  placeholder={t("Common.emailPlaceholder")}
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("Common.password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    className="w-full pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("Common.passwordPlaceholder")}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-none leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("Create.iAgree")}{" "}
                    <Link
                      href="/terms"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      {t("Create.terms")}
                    </Link>{" "}
                    {t("Common.and")}{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      {t("Create.privacy")}
                    </Link>{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="marketing" />
                  <Label
                    htmlFor="marketing"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("Create.marketing")}
                  </Label>
                </div>
              </div>
              <Button
                className="w-full bg-black text-white hover:bg-black/90"
                type="submit"
              >
                {t("Create.title")}
              </Button>
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button className="w-full" variant="outline" type="button">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
