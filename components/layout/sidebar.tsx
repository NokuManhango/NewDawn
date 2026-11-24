"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, Users, School, BookOpen, BarChart3,
  ClipboardList, Calendar, MessageSquare, CreditCard,
  GraduationCap, Library, Bell, LogOut,
  ChevronLeft, ChevronRight, UserCog, Building2, ClipboardCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import type { TranslationKey } from "@/lib/translations"
import type { Role } from "@/types"
import { useState } from "react"

interface NavItem {
  labelKey: TranslationKey
  href: string
  icon: React.ElementType
}

const NAV_ITEMS: Record<Role, NavItem[]> = {
  SUPER_ADMIN: [
    { labelKey: "dashboard", href: "/admin", icon: LayoutDashboard },
    { labelKey: "schools", href: "/admin/escolas", icon: Building2 },
    { labelKey: "users", href: "/admin/utilizadores", icon: UserCog },
    { labelKey: "reports", href: "/admin/relatorios", icon: BarChart3 },
  ],
  DIRECTOR: [
    { labelKey: "dashboard", href: "/director", icon: LayoutDashboard },
    { labelKey: "enrollments", href: "/director/matriculas", icon: ClipboardList },
    { labelKey: "classes", href: "/director/turmas", icon: School },
    { labelKey: "teachers", href: "/director/professores", icon: Users },
    { labelKey: "timetable", href: "/director/horario", icon: Calendar },
    { labelKey: "communications", href: "/director/comunicacoes", icon: MessageSquare },
    { labelKey: "reports", href: "/director/relatorios", icon: BarChart3 },
  ],
  PROFESSOR: [
    { labelKey: "dashboard", href: "/professor", icon: LayoutDashboard },
    { labelKey: "attendance", href: "/professor/presenca", icon: ClipboardList },
    { labelKey: "grades", href: "/professor/notas", icon: GraduationCap },
    { labelKey: "assignments", href: "/professor/tarefas", icon: ClipboardCheck },
    { labelKey: "timetable", href: "/professor/horario", icon: Calendar },
  ],
  ALUNO: [
    { labelKey: "dashboard", href: "/aluno", icon: LayoutDashboard },
    { labelKey: "myGrades", href: "/aluno/notas", icon: GraduationCap },
    { labelKey: "assignments", href: "/aluno/tarefas", icon: ClipboardCheck },
    { labelKey: "timetable", href: "/aluno/horario", icon: Calendar },
    { labelKey: "library", href: "/aluno/biblioteca", icon: Library },
  ],
  ENCARREGADO: [
    { labelKey: "dashboard", href: "/encarregado", icon: LayoutDashboard },
    { labelKey: "myChildren", href: "/encarregado/filhos", icon: Users },
    { labelKey: "payments", href: "/encarregado/pagamentos", icon: CreditCard },
    { labelKey: "announcements", href: "/encarregado/comunicados", icon: Bell },
  ],
}

const ROOT_HREFS = new Set(["/admin", "/director", "/professor", "/aluno", "/encarregado"])

export function Sidebar() {
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  if (!user) return null

  const navItems = NAV_ITEMS[user.role] ?? []

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="relative flex flex-col bg-gray-900 text-white shrink-0 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-800">
        <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              <p className="font-bold text-white text-sm leading-tight">{t("appName")}</p>
              <p className="text-gray-400 text-xs">{t("appSubtitle")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {navItems.map((item) => {
          const isRoot = ROOT_HREFS.has(item.href)
          const active = isRoot
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="whitespace-nowrap"
                    >
                      {t(item.labelKey)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-gray-800 px-2 py-3 space-y-1">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-3 py-2"
            >
              <p className="text-xs text-white font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-900/40 hover:text-red-400 transition-colors text-sm"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {t("logout")}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  )
}
