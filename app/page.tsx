"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ROLE_ROUTES } from "@/lib/auth-context"
import { GraduationCap } from "lucide-react"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(ROLE_ROUTES[user.role])
    } else {
      router.push("/login")
    }
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm text-gray-500">A carregar...</p>
      </div>
    </div>
  )
}
