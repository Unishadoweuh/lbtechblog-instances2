import { cookies } from "next/headers"
import type { Role } from "./rbac"

const API_BASE = process.env.NEXT_PUBLIC_AUTH_API || ""

export interface User {
  id: string
  email: string
  role: Role
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

const ACCESS_TOKEN = "access_token"
const REFRESH_TOKEN = "refresh_token"
const USER_COOKIE = "user"

function setSession(data: AuthResponse) {
  const cookieStore = cookies()
  cookieStore.set(ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })
  cookieStore.set(REFRESH_TOKEN, data.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })
  cookieStore.set(USER_COOKIE, JSON.stringify(data.user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error("Login failed")
  }

  const data = (await res.json()) as AuthResponse
  setSession(data)
  return data.user
}

export async function refreshToken() {
  const refresh = cookies().get(REFRESH_TOKEN)?.value
  if (!refresh) {
    throw new Error("No refresh token")
  }

  const res = await fetch(`${API_BASE}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refresh }),
  })

  if (!res.ok) {
    throw new Error("Refresh token failed")
  }

  const data = (await res.json()) as {
    accessToken: string
    refreshToken: string
    user?: User
  }

  setSession({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: data.user || getUser()!,
  })
}

export function getUser(): User | null {
  const value = cookies().get(USER_COOKIE)?.value
  return value ? (JSON.parse(value) as User) : null
}
