export type UserRole = "admin" | "user"

export interface User {
  id: string
  email: string
  name: string
  surname: string
  role: UserRole
  avatar_url: string
  status: "active" | "inactive"
  joined_at: string
}

export interface InvitedUser {
  email: string
  role: UserRole
  invitedAt: string
  expiresAt: string
  status: "pending" | "expired"
}
