"use server"
const FORMSPARK_FEEDBACK_URL = process.env.FORMSPARK_FEEDBACK_URL!

export async function submitFeedback(
  prevState: { success: boolean; message: string } | null,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    const email = formData.get("email") as string
    const topic = formData.get("topic") as string
    const message = formData.get("message") as string
    const source = formData.get("source") as string

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Send feedback to FormSpark
    const apiResponse = await fetch(FORMSPARK_FEEDBACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, topic, message, source }),
    })

    if (!apiResponse.ok) {
      throw new Error("Failed to send feedback")
    }

    return {
      success: true,
      message: "Thank you for your feedback!",
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}
