import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, MoreHorizontal, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { InvitedUser } from "@/types/user"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { deleteInvitation } from "@/actions/user"

interface InvitedUsersTableProps {
  users: InvitedUser[]
}

export function InvitedUsersTable({
  users: initialUsers,
}: InvitedUsersTableProps) {
  const t = useTranslations("User")
  const [users, setUsers] = useState(initialUsers)
  const [loading, setLoading] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDeleteInvitation = async (email: string) => {
    setLoading(email)
    const result = await deleteInvitation(email)
    setLoading(null)
    setDeleteConfirm(null)

    if (result.success) {
      setUsers(users.filter((user) => user.email !== email))
      toast({
        title: "Invitation deleted",
        description: result.message,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
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
              <TableHead>{t("Common.invited")}</TableHead>
              <TableHead>{t("Common.expires")}</TableHead>
              <TableHead className="w-[80px]">{t("Common.action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
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
                    variant={
                      user.status === "pending" ? "outline" : "secondary"
                    }
                  >
                    {user.status === "pending"
                      ? t("Common.statusPanding")
                      : t("Common.statusExpired")}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.invitedAt).toLocaleDateString("sk-SK", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.expiresAt).toLocaleDateString("sk-SK", {
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
                        disabled={loading === user.email}
                      >
                        {loading === user.email ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreHorizontal className="h-4 w-4" />
                        )}
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setDeleteConfirm(user.email)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t("Invite.title")}
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
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Invite.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Invite.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Invite.Modify.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteConfirm && handleDeleteInvitation(deleteConfirm)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("Invite.Modify.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
