export type FeedbackTopic = "general" | "bug" | "feature" | "other"

export interface FeedbackFormData {
  email: string
  topic?: FeedbackTopic
  message: string
  source?: string
}

export interface FeedbackFormProps {
  source?: string
  email?: string
}
