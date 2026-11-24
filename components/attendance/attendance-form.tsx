"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Save } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import { mockStudents } from "@/lib/mock-data"
import type { AttendanceStatus } from "@/types"

export function AttendanceForm() {
  const { t } = useI18n()
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({})
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const classStudents = mockStudents.filter((s) => s.classId === "c1" && s.status === "ACTIVE")

  const STATUS_OPTIONS: { value: AttendanceStatus; label: string; color: string }[] = [
    { value: "PRESENTE", label: "P", color: "bg-emerald-500 text-white" },
    { value: "AUSENTE", label: "A", color: "bg-red-500 text-white" },
    { value: "JUSTIFICADO", label: "J", color: "bg-amber-500 text-white" },
  ]

  function setStatus(studentId: string, status: AttendanceStatus) {
    setAttendance((prev) => ({ ...prev, [studentId]: status }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    setSaving(false)
    setSaved(true)
  }

  const stats = {
    presentes: Object.values(attendance).filter((s) => s === "PRESENTE").length,
    ausentes: Object.values(attendance).filter((s) => s === "AUSENTE").length,
    justificados: Object.values(attendance).filter((s) => s === "JUSTIFICADO").length,
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{t("attendanceTitle")} — 8ª Classe A</h3>
          <p className="text-xs text-gray-400 mt-0.5">{classStudents.length} {t("studentsInClass")}</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
          />
          <button
            onClick={handleSave}
            disabled={saving || Object.keys(attendance).length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? t("saved") : t("save")}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 px-5 py-3 bg-gray-50/50 border-b border-gray-100 text-xs">
        <span className="text-emerald-600 font-medium">{stats.presentes} {t("presentCount")}</span>
        <span className="text-red-500 font-medium">{stats.ausentes} {t("absentCount")}</span>
        <span className="text-amber-600 font-medium">{stats.justificados} {t("justifiedCount")}</span>
        <span className="text-gray-400 ml-auto">{classStudents.length - Object.keys(attendance).length} {t("toRegister")}</span>
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-5 py-2 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">P</span> {t("legendPresent")}</span>
        <span className="flex items-center gap-1"><span className="w-5 h-5 rounded bg-red-500 text-white flex items-center justify-center font-bold text-xs">A</span> {t("legendAbsent")}</span>
        <span className="flex items-center gap-1"><span className="w-5 h-5 rounded bg-amber-500 text-white flex items-center justify-center font-bold text-xs">J</span> {t("legendJustified")}</span>
      </div>

      <div className="divide-y divide-gray-50">
        {classStudents.map((student, i) => {
          const status = attendance[student.id]
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-semibold">
                  {getInitials(student.fullName)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                  <p className="text-xs text-gray-400 font-mono">{student.studentNumber}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(student.id, opt.value)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                      status === opt.value
                        ? opt.color + " ring-2 ring-offset-1 ring-current"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
