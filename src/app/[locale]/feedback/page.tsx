"use client"

import { FeedbackForm } from "@/components/feedback-form"
import { useSession } from "next-auth/react"

export default function FeedbackPage() {
  const { data: session } = useSession()

  return (
    <div className="mt-8 flex justify-center">
      <FeedbackForm
        source="feedback-page"
        email={session?.user?.email || undefined}
      />
    </div>
  )
}
