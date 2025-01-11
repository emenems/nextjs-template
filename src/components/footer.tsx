import Link from "next/link"
import {
  LayoutTemplate,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react"
import {
  LINKEDIN_LINK,
  TWITTER_LINK,
  INSTAGRAM_LINK,
  FACEBOOK_LINK,
} from "@/config/constants"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("Footer")
  return (
    <footer className="w-full bg-muted py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col space-y-8 md:w-1/2">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <LayoutTemplate className="h-5 w-5" />
                <span className="inline-block font-bold">{t("title")}</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                {t("description")}
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                {FACEBOOK_LINK && (
                  <Link href={FACEBOOK_LINK} className="hover:text-primary">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                )}
                {TWITTER_LINK && (
                  <Link href={TWITTER_LINK} className="hover:text-primary">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                )}
                {INSTAGRAM_LINK && (
                  <Link href={INSTAGRAM_LINK} className="hover:text-primary">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                )}
                {LINKEDIN_LINK && (
                  <Link href={LINKEDIN_LINK} className="hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 space-y-4 md:mt-0 md:text-right">
            <h3 className="font-semibold">{t("quickLinks")}</h3>
            <nav className="flex flex-col space-y-2 md:items-end">
              <Link href="/about" className="text-sm hover:underline">
                {t("aboutUs")}
              </Link>
              <Link href="/feedback" className="text-sm hover:underline">
                {t("contact")}
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                {t("privacy")}
              </Link>
              <Link href="/terms" className="text-sm hover:underline">
                {t("terms")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
