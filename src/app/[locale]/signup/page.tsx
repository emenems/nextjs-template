"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { LogoAnimated } from "@/components/logo-animated"
import { Eye, EyeOff } from "lucide-react"
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
          <LogoAnimated invert={true} />
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
