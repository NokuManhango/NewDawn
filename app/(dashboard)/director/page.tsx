"use client"

import { motion } from "framer-motion"
import { Users, School, ClipboardList, TrendingUp, Smartphone } from "lucide-react"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AttendanceChart } from "@/components/dashboard/charts"
import { mockDashboardStats, mockAnnouncements, mockPayments } from "@/lib/mock-data"
import { formatDate, getPaymentTypeLabel, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { TranslationKey } from "@/lib/translations"

export default function DirectorDashboard() {
  const { t } = useI18n()
  const { totalStudents, totalTeachers, totalClasses, presentToday, pendingPayments, averageGrade } = mockDashboardStats
  const overduePayments = mockPayments.filter((p) => p.status === "OVERDUE")

  function paymentTypeLabel(type: string): string {
    const map: Record<string, TranslationKey> = {
      MATRICULA: "paymentTypeMatricula",
      MENSALIDADE: "paymentTypeMensalidade",
      EXAME: "paymentTypeExame",
      MULTA: "paymentTypeMulta",
    }
    const key = map[type]
    return key ? t(key) : type
  }

  function annTypeLabel(type: string): string {
    const map: Record<string, TranslationKey> = {
      GERAL: "annTypeGeral", URGENTE: "annTypeUrgente",
      EVENTO: "annTypeEvento", ACADEMICO: "annTypeAcademico",
    }
    const key = map[type]
    return key ? t(key) : type
  }

  const typeColors: Record<string, string> = {
    URGENTE: "bg-red-50 text-red-600 ring-1 ring-red-200",
    ACADEMICO: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
    EVENTO: "bg-purple-50 text-purple-600 ring-1 ring-purple-200",
    GERAL: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("directorDashboardTitle")} subtitle={t("directorDashboardSub")} />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title={t("statTotalStudents")} value={totalStudents} subtitle={t("statEnrolled")} icon={Users} color="emerald" trend={{ value: 6, label: t("vsLastYear") }} index={0} />
          <StatsCard title={t("statClasses")} value={totalClasses} subtitle={t("statThisYear")} icon={School} color="blue" index={1} />
          <StatsCard title={t("statPresentToday")} value={presentToday} subtitle={`${t("of")} ${totalStudents} ${t("studentPlural").toLowerCase()}`} icon={ClipboardList} color="purple" index={2} />
          <StatsCard title={t("statAvgGrade")} value={`${averageGrade}/20`} subtitle={t("statFirstTerm")} icon={TrendingUp} color="amber" trend={{ value: 4, label: t("vsLastYear") }} index={3} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">{t("overduePaymentsTitle")}</h3>
            <div className="space-y-3">
              {overduePayments.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.studentName}</p>
                    <p className="text-xs text-gray-400">{paymentTypeLabel(p.type)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-500">MZN {p.amount}</p>
                    <p className="text-xs text-gray-400">{p.dueDate ? formatDate(p.dueDate) : "—"}</p>
                  </div>
                </div>
              ))}
              {overduePayments.length === 0 && <p className="text-sm text-gray-400 text-center py-4">{t("noPaymentsDue")}</p>}
            </div>
            <p className="text-xs text-gray-400 mt-3">{pendingPayments} {t("totalPendingLabel")}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">{t("recentAnnouncementsTitle")}</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {mockAnnouncements.slice(0, 3).map((ann, i) => (
              <motion.div key={ann.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", typeColors[ann.type])}>{annTypeLabel(ann.type)}</span>
                      {ann.sendSMS && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <Smartphone className="w-3 h-3" /> {t("smsSentBadge")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{ann.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{ann.content}</p>
                  </div>
                  <p className="text-xs text-gray-400 shrink-0">{formatDate(ann.createdAt)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
