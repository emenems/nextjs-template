"use client"

import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  Bug,
  Lightbulb,
  MessageCircle,
  HelpCircle,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { submitFeedback } from "@/actions/feedback"
import type { FeedbackTopic, FeedbackFormProps } from "@/types/feedback"
import { useTranslations } from "next-intl"

type SubmitButtonProps = {
  label?: string
  statusText?: string
}

function SubmitButton({
  label = "Send feedback",
  statusText = "Sending...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          {statusText}
        </>
      ) : (
        label
      )}
    </Button>
  )
}

export function FeedbackForm({ source, email }: FeedbackFormProps) {
  const [topic, setTopic] = useState<FeedbackTopic>()
  const [state, formAction] = useFormState(submitFeedback, null)
  const t = useTranslations("Feedback")

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-2 md:space-y-4">
          <input type="hidden" name="source" value={source} />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">
                {t("email")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={email}
                required
                placeholder={t("emailPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">{t("topic")}</Label>
              <Select
                name="topic"
                value={topic}
                onValueChange={(value) => setTopic(value as FeedbackTopic)}
              >
                <SelectTrigger id="topic">
                  <SelectValue placeholder={t("topicPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">
                    <div className="flex items-center">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t("topicOptions.general")}
                    </div>
                  </SelectItem>
                  <SelectItem value="bug">
                    <div className="flex items-center">
                      <Bug className="mr-2 h-4 w-4" />
                      {t("topicOptions.bug")}
                    </div>
                  </SelectItem>
                  <SelectItem value="feature">
                    <div className="flex items-center">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      {t("topicOptions.feature")}
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      {t("topicOptions.other")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {t("message")} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder={t("messagePlaceholder")}
              className="min-h-[150px]"
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton label={t("submit")} statusText={t("sending")} />
          </div>
          <AnimatePresence mode="wait">
            {state && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`rounded-md p-3 text-sm ${
                  state.success
                    ? "bg-green-500/10 text-green-500"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {state.message}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>
    </Card>
  )
}
