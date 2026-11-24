"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, TrendingUp, Star } from "lucide-react"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { mockResults, mockTimetable, mockAnnouncements } from "@/lib/mock-data"
import { formatDate, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export default function AlunoDashboard() {
  const { t } = useI18n()
  const myResults = mockResults.filter((r) => r.studentId === "st1")
  const avg = myResults.length > 0 ? myResults.reduce((s, r) => s + r.nota, 0) / myResults.length : 0
  const best = myResults.length > 0 ? myResults.reduce((a, b) => a.nota > b.nota ? a : b) : null
  const todaySchedule = mockTimetable.filter((e) => e.dayOfWeek === 0).slice(0, 4)

  function gradeLabel(nota: number): { label: string; color: string } {
    if (nota >= 14) return { label: t("gradeGood"), color: "text-emerald-600" }
    if (nota >= 10) return { label: t("gradeSufficient"), color: "text-amber-600" }
    return { label: t("gradeFail"), color: "text-red-600" }
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("studentDashboardTitle")} subtitle={t("studentDashboardSub")} />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title={t("statAvgGrade")} value={avg.toFixed(1)} subtitle={t("statFirstTerm")} icon={TrendingUp} color={avg >= 10 ? "emerald" : "red"} index={0} />
          <StatsCard title={t("subjectPlural")} value={myResults.length} subtitle={t("statSubjectsGraded")} icon={GraduationCap} color="blue" index={1} />
          <StatsCard title={t("statBestGrade")} value={best ? `${best.nota}/20` : "—"} subtitle={best?.subjectName ?? ""} icon={Star} color="amber" index={2} />
          <StatsCard title={t("statLessonsToday")} value={todaySchedule.length} subtitle={t("statPerSchedule")} icon={Calendar} color="purple" index={3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">{t("myGradesSection")}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {myResults.map((result, i) => {
                const { color } = gradeLabel(result.nota)
                const barWidth = (result.nota / 20) * 100
                return (
                  <motion.div key={result.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    className="px-5 py-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-700">{result.subjectName}</span>
                      <span className={cn("text-sm font-bold", color)}>{result.nota.toFixed(1)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ delay: i * 0.06 + 0.2, duration: 0.6, ease: "easeOut" }}
                        className={cn("h-full rounded-full", result.nota >= 14 ? "bg-emerald-500" : result.nota >= 10 ? "bg-amber-500" : "bg-red-500")}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">{t("todaySchedule")}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {todaySchedule.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="text-right w-12 shrink-0">
                      <p className="text-xs font-semibold text-emerald-600">{entry.startTime}</p>
                    </div>
                    <div className="w-px h-6 bg-gray-100" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{entry.subjectName}</p>
                      <p className="text-xs text-gray-400">{entry.teacherName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">{t("announcementsSection")}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {mockAnnouncements.slice(0, 2).map((ann) => (
                  <div key={ann.id} className="px-5 py-3">
                    <p className="text-sm font-medium text-gray-900">{ann.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{ann.content}</p>
                    <p className="text-xs text-gray-300 mt-1">{formatDate(ann.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
