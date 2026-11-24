"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus, Search, Shield, Users, GraduationCap, UserCheck } from "lucide-react"
import { Header } from "@/components/layout/header"
import { mockUsers } from "@/lib/mock-data"
import { getRoleLabel, getInitials, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { Role } from "@/types"

const ROLE_COLORS: Record<Role, string> = {
  SUPER_ADMIN: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  DIRECTOR: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  PROFESSOR: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  ALUNO: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  ENCARREGADO: "bg-gray-50 text-gray-700 ring-1 ring-gray-200",
}

const ROLE_ICONS: Record<Role, React.ElementType> = {
  SUPER_ADMIN: Shield,
  DIRECTOR: Users,
  PROFESSOR: GraduationCap,
  ALUNO: GraduationCap,
  ENCARREGADO: UserCheck,
}

export default function UtilizadoresPage() {
  const { t } = useI18n()
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState("ALL")

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = filterRole === "ALL" || u.role === filterRole
    return matchSearch && matchRole
  })

  const stats = {
    total: mockUsers.length,
    admins: mockUsers.filter((u) => u.role === "SUPER_ADMIN").length,
    directors: mockUsers.filter((u) => u.role === "DIRECTOR").length,
    professors: mockUsers.filter((u) => u.role === "PROFESSOR").length,
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("usersTitle")} subtitle={t("usersSub")} />

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: t("totalLabel"), value: stats.total, color: "text-gray-900" },
            { label: t("admins"), value: stats.admins, color: "text-purple-600" },
            { label: t("directors"), value: stats.directors, color: "text-blue-600" },
            { label: t("teacherPlural"), value: stats.professors, color: "text-emerald-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className={cn("text-2xl font-bold", color)}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("searchUserPlaceholder")} className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white" />
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none bg-white">
            <option value="ALL">{t("allProfiles")}</option>
            {(["SUPER_ADMIN", "DIRECTOR", "PROFESSOR", "ALUNO", "ENCARREGADO"] as Role[]).map((r) => (
              <option key={r} value={r}>{getRoleLabel(r)}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors">
            <UserPlus className="w-4 h-4" /> {t("newUserBtn")}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colUser")}</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colEmail")}</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide hidden sm:table-cell">{t("colProfile")}</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide hidden lg:table-cell">{t("colPhone")}</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colStatus")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user, i) => {
                const RoleIcon = ROLE_ICONS[user.role]
                return (
                  <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          {getInitials(user.name)}
                        </div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{user.email}</td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", ROLE_COLORS[user.role])}>
                        <RoleIcon className="w-3 h-3" />
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden lg:table-cell">{user.phone ?? "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full ring-1 ring-emerald-200 font-medium">{t("active")}</span>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">{t("noUserFound")}</div>}
        </div>
      </div>
    </div>
  )
}
