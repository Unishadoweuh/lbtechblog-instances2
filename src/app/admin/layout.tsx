import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { can } from "@/lib/rbac"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = getUser()
  if (!user || !can("admin", user.role)) {
    redirect("/")
  }
  return <>{children}</>
}
