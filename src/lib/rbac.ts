export type Role = "USER" | "ADMIN"

const permissions: Record<Role, string[]> = {
  USER: [],
  ADMIN: ["admin"],
}

export function can(action: string, role?: Role) {
  return !!role && permissions[role]?.includes(action)
}
