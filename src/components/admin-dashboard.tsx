import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "./users-table"
import { InvitedUsersTable } from "./invited-users-table"
import { InviteUserForm } from "./invite-users-form"
import type { User, InvitedUser, UserRole } from "@/types/user"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

// Sample data - replace with your actual data fetching logic
const users: User[] = [
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
  {
    id: "2",
    email: "user@example.com",
    role: "user" as UserRole,
    status: "active",
    joined_at: "2024-01-02",
    name: "Regular",
    surname: "User",
    avatar_url: "",
  },
  {
    id: "3",
    email: "inactive@example.com",
    role: "user" as UserRole,
    status: "inactive",
    joined_at: "2024-01-03",
    name: "Inactive",
    surname: "User",
    avatar_url: "",
  },
]

const invitedUsers: InvitedUser[] = [
  {
    email: "pending@example.com",
    role: "user",
    status: "pending",
    invitedAt: "2024-01-04",
    expiresAt: "2024-02-04",
  },
  {
    email: "expired@example.com",
    role: "admin",
    status: "expired",
    invitedAt: "2024-01-05",
    expiresAt: "2024-02-05",
  },
]

export default function AdminDashboard() {
  const t = useTranslations("User")
  return (
    <div className="container space-y-8 pb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t("Management.title")}
          </h2>
          <p className="text-muted-foreground">{t("Management.description")}</p>
        </div>
      </div>
      <div className="grid gap-8">
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">
              {t("Management.activeTab")}
            </TabsTrigger>
            <TabsTrigger value="invited">
              {t("Management.invitedTab")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <UsersTable users={users} />
          </TabsContent>
          <TabsContent value="invited" className="space-y-4">
            <InvitedUsersTable users={invitedUsers} />
            <div className="flex flex-col gap-6">
              <InviteUserForm />
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            {t("Management.logout")}
          </Button>
        </div>
      </div>
    </div>
  )
}
