"use client"

import { useSession } from "next-auth/react"
import { NotAdmin } from "@/components/not-admin"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const { data: session } = useSession()

  if (!session) {
    return <NotAdmin />
  }

  if (session.user.role !== "admin") {
    return <NotAdmin />
  }

  return <AdminDashboard />
}
