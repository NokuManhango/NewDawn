"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Download, MoreVertical, Eye, Edit, Trash2, UserPlus } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { Student } from "@/types"

interface StudentTableProps {
  students: Student[]
  onAdd?: () => void
  onView?: (student: Student) => void
  onEdit?: (student: Student) => void
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  INACTIVE: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
  TRANSFERRED: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  GRADUATED: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
}

export function StudentTable({ students, onAdd, onView, onEdit }: StudentTableProps) {
  const { t } = useI18n()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = students.filter((s) => {
    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentNumber.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "ALL" || s.status === filterStatus
    return matchSearch && matchStatus
  })

  function statusLabel(s: string) {
    const map: Record<string, string> = {
      ACTIVE: t("active"),
      INACTIVE: t("inactive"),
      TRANSFERRED: t("transferred"),
      GRADUATED: t("graduated"),
    }
    return map[s] ?? s
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-100">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchStudentPlaceholder")}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
          >
            <option value="ALL">{t("allStatuses")}</option>
            <option value="ACTIVE">{t("active")}</option>
            <option value="INACTIVE">{t("inactive")}</option>
            <option value="TRANSFERRED">{t("transferred")}</option>
            <option value="GRADUATED">{t("graduated")}</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("export")}</span>
          </button>
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">{t("newStudentBtn")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colStudent")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colNumber")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide hidden md:table-cell">{t("colClass")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide hidden lg:table-cell">{t("colGuardian")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colStatus")}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence>
              {filtered.map((student, i) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 overflow-hidden flex items-center justify-center text-emerald-700 text-xs font-semibold shrink-0">
                        {student.photoUrl ? (
                          <img src={student.photoUrl} alt={student.fullName} className="w-full h-full object-cover" />
                        ) : (
                          getInitials(student.fullName)
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.fullName}</p>
                        <p className="text-xs text-gray-400">
                          {student.gender === "MASCULINO" ? t("genderMasc") : t("genderFem")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{student.studentNumber}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{student.className ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                    <div>
                      <p className="text-xs">{student.guardianName ?? "—"}</p>
                      <p className="text-xs text-gray-400">{student.guardianPhone ?? ""}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", STATUS_COLORS[student.status])}>
                      {statusLabel(student.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative flex justify-end">
                      <button
                        onClick={() => setOpenMenu(openMenu === student.id ? null : student.id)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenu === student.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1 w-40">
                          <button onClick={() => { onView?.(student); setOpenMenu(null) }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Eye className="w-3.5 h-3.5" /> {t("viewDetails")}
                          </button>
                          <button onClick={() => { onEdit?.(student); setOpenMenu(null) }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit className="w-3.5 h-3.5" /> {t("edit")}
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5" /> {t("remove")}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">{t("noStudents")}</div>
        )}
      </div>
      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
        {filtered.length} {t("ofLabel")} {students.length} {t("studentsLabel")}
      </div>
    </div>
  )
}
