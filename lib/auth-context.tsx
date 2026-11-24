"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User, Role } from "@/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const DEMO_USERS: User[] = [
  { id: "u1", name: "Admin Geral", email: "admin@edumoz.mz", role: "SUPER_ADMIN", createdAt: "2020-01-01" },
  { id: "u2", name: "João Muiambo", email: "director@edumoz.mz", role: "DIRECTOR", schoolId: "s1", createdAt: "2020-02-01" },
  { id: "u3", name: "Maria Cossa", email: "professor@edumoz.mz", role: "PROFESSOR", schoolId: "s1", phone: "+258 84 111222", createdAt: "2020-03-01" },
  { id: "u6", name: "Carlos Sitoe", email: "encarregado@edumoz.mz", role: "ENCARREGADO", phone: "+258 84 777888", createdAt: "2021-01-10" },
  { id: "st1", name: "Anita Sitoe", email: "aluno@edumoz.mz", role: "ALUNO", schoolId: "s1", createdAt: "2025-01-15" },
]

const ROLE_ROUTES: Record<Role, string> = {
  SUPER_ADMIN: "/admin",
  DIRECTOR: "/director",
  PROFESSOR: "/professor",
  ALUNO: "/aluno",
  ENCARREGADO: "/encarregado",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function login(email: string, _password: string): Promise<boolean> {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const found = DEMO_USERS.find((u) => u.email === email)
    if (found) {
      setUser(found)
      setIsLoading(false)
      return true
    }
    setIsLoading(false)
    return false
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}

export { ROLE_ROUTES }
