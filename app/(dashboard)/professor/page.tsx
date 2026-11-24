"use client"

import { motion } from "framer-motion"
import { ClipboardList, Users, Calendar, TrendingUp } from "lucide-react"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { mockStudents, mockResults, mockTimetable } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { TranslationKey } from "@/lib/translations"

export default function ProfessorDashboard() {
  const { t } = useI18n()

  const classStudents = mockStudents.filter((s) => s.classId === "c1" && s.status === "ACTIVE")
  const classResults = mockResults.filter((r) => r.classId === "c1")
  const avg = classResults.length > 0 ? classResults.reduce((s, r) => s + r.nota, 0) / classResults.length : 0
  const todaySchedule = mockTimetable.filter((e) => e.dayOfWeek === new Date().getDay() - 1)
  const dayNames = [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday")]

  function gradeLabel(nota: number): { label: string; color: string } {
    if (nota >= 14) return { label: t("gradeGood"), color: "text-emerald-600" }
    if (nota >= 10) return { label: t("gradeSufficient"), color: "text-amber-600" }
    return { label: t("gradeFail"), color: "text-red-600" }
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("professorDashboardTitle")} subtitle={t("professorDashboardSub")} />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title={t("studentPlural")} value={classStudents.length} subtitle="8ª Classe A" icon={Users} color="emerald" index={0} />
          <StatsCard title={t("statPresentToday")} value={`${classStudents.length - 1}`} subtitle={`${t("of")} ${classStudents.length}`} icon={ClipboardList} color="blue" index={1} />
          <StatsCard title={t("statClassAvg")} value={avg.toFixed(1)} subtitle={t("statFirstTerm")} icon={TrendingUp} color="amber" index={2} />
          <StatsCard title={t("statLessonsToday")} value={todaySchedule.length || 3} subtitle={t("statPerSchedule")} icon={Calendar} color="purple" index={3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">{t("todaysLessons")}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{dayNames[new Date().getDay() - 1] ?? dayNames[0]}</p>
            </div>
            <div className="divide-y divide-gray-50">
              {mockTimetable.filter((e) => e.classId === "c1").slice(0, 4).map((entry, i) => (
                <motion.div key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 px-5 py-3.5">
                  <div className="text-right w-16 shrink-0">
                    <p className="text-xs font-semibold text-emerald-600">{entry.startTime}</p>
                    <p className="text-xs text-gray-400">{entry.endTime}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{entry.subjectName}</p>
                    <p className="text-xs text-gray-400">{entry.room ?? `${t("room")} —`}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">{t("studentPerformance")}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {mockStudents.filter((s) => s.classId === "c1").slice(0, 5).map((student, i) => {
                const studentResults = mockResults.filter((r) => r.studentId === student.id)
                const studentAvg = studentResults.length > 0 ? studentResults.reduce((s, r) => s + r.nota, 0) / studentResults.length : 0
                const { label, color } = gradeLabel(studentAvg)
                return (
                  <motion.div key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                      <p className="text-xs text-gray-400">Nº {student.studentNumber.split("/").pop()}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-lg font-bold", studentAvg > 0 ? color : "text-gray-300")}>
                        {studentAvg > 0 ? studentAvg.toFixed(1) : "—"}
                      </p>
                      {studentAvg > 0 && <p className={cn("text-xs", color)}>{label}</p>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
