"use client"

import { useFormState } from "react-dom"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"
import { inviteUser } from "@/actions/user"
import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { sk, enGB } from "date-fns/locale"
import { SubmitButton } from "@/components/submit-button"

export function InviteUserForm() {
  const [state, formAction] = useFormState(inviteUser, null)
  const [date, setDate] = useState<Date>(addDays(new Date(), 30))
  const t = useTranslations("User")
  const locale = useLocale()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Invite.title")}</CardTitle>
        <CardDescription>{t("Invite.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("Common.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("Invite.emailPlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">{t("Common.role")}</Label>
            <Select name="role" required defaultValue="user">
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">{t("Common.roleAdmin")}</SelectItem>
                <SelectItem value="user">{t("Common.roleUser")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiresAt">{t("Common.expires")}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="expiresAt"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date
                    ? format(date, "PPP", {
                        locale: locale === "sk" ? sk : enGB,
                      })
                    : t("Invite.datePlaceholder")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(day) => day && setDate(day)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              name="expiresAt"
              value={date?.toISOString() ?? ""}
            />
          </div>

          <div className="flex flex-col gap-3">
            <SubmitButton
              label={t("Invite.sendInvite")}
              statusText={t("Invite.sendiInviteStatus")}
            />
            {state?.message && (
              <p
                className={`text-sm ${
                  state.success ? "text-green-600" : "text-destructive"
                }`}
              >
                {state.message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
