"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { ResultsTable } from "@/components/results/results-table"
import { mockStudents, mockResults, mockAttendance } from "@/lib/mock-data"
import { formatDate, getInitials, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export default function FilhosPage() {
  const { t } = useI18n()
  const myChildren = mockStudents.filter((s) => s.guardianId === "u6")

  function gradeLabel(nota: number): { label: string; color: string } {
    if (nota >= 14) return { label: t("gradeGood"), color: "text-emerald-600" }
    if (nota >= 10) return { label: t("gradeSufficient"), color: "text-amber-600" }
    return { label: t("gradeFail"), color: "text-red-600" }
  }

  function statusLabel(status: string): string {
    const map: Record<string, string> = {
      ACTIVE: t("active"), INACTIVE: t("inactive"), TRANSFERRED: t("transferred"),
      GRADUATED: t("graduated"), PRESENTE: t("present"), AUSENTE: t("absent"),
      JUSTIFICADO: t("justified"),
    }
    return map[status] ?? status
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("myChildrenTitle")} subtitle={t("myChildrenSub")} />

      <div className="p-6 space-y-8">
        {myChildren.map((child, ci) => {
          const childResults = mockResults.filter((r) => r.studentId === child.id)
          const childAttendance = mockAttendance.filter((a) => a.studentId === child.id)
          const avg = childResults.length > 0 ? childResults.reduce((s, r) => s + r.nota, 0) / childResults.length : 0
          const { label, color } = avg > 0 ? gradeLabel(avg) : { label: t("noDataLabel"), color: "text-gray-400" }
          const presentes = childAttendance.filter((a) => a.status === "PRESENTE").length
          const total = childAttendance.length

          return (
            <motion.div key={child.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}
              className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white text-lg font-semibold">
                      {getInitials(child.fullName)}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{child.fullName}</p>
                      <p className="text-sm text-gray-500">{child.className} • Nº {child.studentNumber}</p>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block",
                        child.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-gray-50 text-gray-600 ring-1 ring-gray-200")}>
                        {statusLabel(child.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <p className={cn("text-2xl font-bold", color)}>{avg > 0 ? avg.toFixed(1) : "—"}</p>
                      <p className={cn("text-xs", color)}>{label}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{total > 0 ? Math.round((presentes / total) * 100) : "—"}{total > 0 ? "%" : ""}</p>
                      <p className="text-xs text-gray-400">{t("presenceLabel")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {childResults.length > 0 && <ResultsTable results={childResults} />}

              {childAttendance.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700">{t("recentAttendance")}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 p-4">
                    {childAttendance.map((a) => (
                      <div key={a.id} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium",
                        a.status === "PRESENTE" ? "bg-emerald-50 text-emerald-700" : a.status === "AUSENTE" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700")}>
                        {formatDate(a.date)} — {statusLabel(a.status)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
