"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, Home } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function NotAdmin() {
  const t = useTranslations("Login")
  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Alert
          variant="destructive"
          className="mb-6 border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive/30 dark:bg-destructive/20 dark:text-destructive-foreground"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("denied")}</AlertTitle>
          <AlertDescription>{t("notAdmin")}</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button asChild variant="outline" className="w-1/2 justify-center">
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" />
              {t("goHome")}
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
