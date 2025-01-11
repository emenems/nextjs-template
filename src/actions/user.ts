"use server"
import { sql } from "@vercel/postgres"
import { UserRole } from "@/types/user"
import type { User } from "@/types/user"
import dotenv from "dotenv"

dotenv.config()

export async function inviteUser(
  prevState: { success: boolean; message: string } | null,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const expiresAt = formData.get("expiresAt") as string

    // Insert invitation into the database
    await sql`
      INSERT INTO auth.invited_users (email, role, expired_at)
      VALUES (${email}, ${role}, ${expiresAt})
    `

    return {
      success: true,
      message: "Invitation sent successfully!",
    }
  } catch (error) {
    console.error("Error inviting user:", error)
    return {
      success: false,
      message: "Failed to send invitation. Please try again.",
    }
  }
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<{ success: boolean; message: string }> {
  try {
    // Update user role in the database
    await sql`
      UPDATE auth.users
      SET role = ${role}
      WHERE id = ${userId}
    `

    return {
      success: true,
      message: "Role updated successfully",
    }
  } catch (error) {
    console.error("Error updating user role:", error)
    return {
      success: false,
      message: "Failed to update role",
    }
  }
}

export async function updateUserStatus(
  userId: string,
  status: "active" | "inactive",
): Promise<{ success: boolean; message: string }> {
  try {
    // Update user status in the database
    await sql`
      UPDATE auth.users
      SET status = ${status}
      WHERE id = ${userId}
    `

    return {
      success: true,
      message: "Status updated successfully",
    }
  } catch (error) {
    console.error("Error updating user status:", error)
    return {
      success: false,
      message: "Failed to update status",
    }
  }
}

export async function deleteInvitation(
  email: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // Delete invitation from the database
    await sql`
      DELETE FROM auth.invited_users
      WHERE email = ${email}
    `

    return {
      success: true,
      message: "Invitation deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting invitation:", error)
    return {
      success: false,
      message: "Failed to delete invitation",
    }
  }
}
const dummyUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    role: "admin" as UserRole,
    status: "active",
    joined_at: "2024-01-01",
    name: "Admin",
    surname: "User",
    avatar_url: "",
  },
]

export async function getUsers(): Promise<{
  success: boolean
  data?: any[]
  message?: string
}> {
  try {
    const users = await sql<User>`
      SELECT id, email, name, surname, role, avatar_url, language, created_at, updated_at
      FROM auth.users
    `

    return {
      success: true,
      data: users.rows ?? dummyUsers,
      message: "Users fetched successfully",
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    // throw new Error("Failed to fetch the latest invoices.")
    return {
      success: false,
      data: dummyUsers,
      message: "Failed to fetch users",
    }
  }
}
