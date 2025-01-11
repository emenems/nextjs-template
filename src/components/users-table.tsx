import { useState } from "react"
import { Loader2, MoreHorizontal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { updateUserRole, updateUserStatus } from "@/actions/user"
import type { User } from "@/types/user"
import { useTranslations } from "next-intl"

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const t = useTranslations("User")
  const [users, setUsers] = useState(initialUsers)
  const [loading, setLoading] = useState<string | null>(null)
  const [statusConfirm, setStatusConfirm] = useState<{
    userId: string
    newStatus: "active" | "inactive"
  } | null>(null)
  const { toast } = useToast()

  const handleUpdateRole = async (
    userId: string,
    newRole: "admin" | "user",
  ) => {
    setLoading(`${userId}-role`)
    const result = await updateUserRole(userId, newRole)
    setLoading(null)

    if (result.success) {
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user,
        ),
      )
      toast({
        title: t("Management.Modify.Toast.successTitle"),
        description: t("Management.Modify.Toast.successDescription"),
      })
    } else {
      toast({
        variant: "destructive",
        title: t("Management.Modify.Toast.failedTitle"),
        description: t("Management.Modify.Toast.failedDescription"),
      })
    }
  }

  const handleUpdateStatus = async (
    userId: string,
    newStatus: "active" | "inactive",
  ) => {
    setStatusConfirm({ userId, newStatus })
  }

  const confirmUpdateStatus = async () => {
    if (!statusConfirm) return

    const { userId, newStatus } = statusConfirm
    setLoading(`${userId}-status`)
    const result = await updateUserStatus(userId, newStatus)
    setLoading(null)
    setStatusConfirm(null)

    if (result.success) {
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user,
        ),
      )
      toast({
        title: t("Management.Modify.Toast.successTitle"),
        description: t("Management.Modify.Toast.successDescription"),
      })
    } else {
      toast({
        variant: "destructive",
        title: t("Management.Modify.Toast.failedTitle"),
        description: t("Management.Modify.Toast.failedDescription"),
      })
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Common.email")}</TableHead>
              <TableHead>{t("Common.role")}</TableHead>
              <TableHead>{t("Common.status")}</TableHead>
              <TableHead>{t("Common.joined")}</TableHead>
              <TableHead className="w-[80px]">{t("Common.action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    className="min-w-16 max-w-16 justify-center truncate"
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {user.role === "admin"
                      ? t("Common.roleAdmin")
                      : t("Common.roleUser")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className="min-w-16 max-w-16 justify-center truncate"
                    variant={user.status === "active" ? "default" : "secondary"}
                  >
                    {user.status === "active"
                      ? t("Common.statusActive")
                      : t("Common.statusInactive")}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.joined_at).toLocaleDateString("sk-SK", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={loading?.startsWith(user.id)}
                      >
                        {loading?.startsWith(user.id) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateRole(
                            user.id,
                            user.role === "admin" ? "user" : "admin",
                          )
                        }
                      >
                        {t("Management.make")}{" "}
                        {user.role === "admin" ? "User" : "Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(
                            user.id,
                            user.status === "active" ? "inactive" : "active",
                          )
                        }
                      >
                        {t("Management.mark")}{" "}
                        {user.status === "active" ? "Inactive" : "Active"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog
        open={!!statusConfirm}
        onOpenChange={() => setStatusConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Management.Modify.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Management.Modify.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("Management.Modify.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmUpdateStatus}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("Management.Modify.update")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
