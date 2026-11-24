"use client"

import { motion } from "framer-motion"
import { TrendingUp, CreditCard, Bell, ClipboardList } from "lucide-react"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { mockStudents, mockResults, mockPayments, mockAnnouncements } from "@/lib/mock-data"
import { formatDate, formatCurrency, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { TranslationKey } from "@/lib/translations"

export default function EncarregadoDashboard() {
  const { t } = useI18n()
  const myChildren = mockStudents.filter((s) => s.guardianId === "u6")
  const myPayments = mockPayments.filter((p) => myChildren.some((c) => c.id === p.studentId))
  const pending = myPayments.filter((p) => p.status === "PENDING" || p.status === "OVERDUE")
  const totalOwed = pending.reduce((s, p) => s + p.amount, 0)

  const childResults = mockResults.filter((r) => myChildren.some((c) => c.id === r.studentId))
  const avg = childResults.length > 0 ? childResults.reduce((s, r) => s + r.nota, 0) / childResults.length : 0

  function gradeLabel(nota: number): { label: string; color: string } {
    if (nota >= 14) return { label: t("gradeGood"), color: "text-emerald-600" }
    if (nota >= 10) return { label: t("gradeSufficient"), color: "text-amber-600" }
    return { label: t("gradeFail"), color: "text-red-600" }
  }

  function paymentTypeLabel(type: string): string {
    const map: Record<string, TranslationKey> = {
      MATRICULA: "paymentTypeMatricula", MENSALIDADE: "paymentTypeMensalidade",
      EXAME: "paymentTypeExame", MULTA: "paymentTypeMulta",
    }
    const key = map[type]
    return key ? t(key) : type
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("guardianDashboardTitle")} subtitle="Carlos Sitoe" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title={t("statChildren")} value={myChildren.length} subtitle={t("statEnrolled")} icon={ClipboardList} color="emerald" index={0} />
          <StatsCard title={t("statAvgGrade")} value={avg > 0 ? avg.toFixed(1) : "—"} subtitle={t("statFirstTerm")} icon={TrendingUp} color="blue" index={1} />
          <StatsCard title={t("statAmountDue")} value={formatCurrency(totalOwed)} subtitle={`${pending.length} ${t("payments").toLowerCase()}`} icon={CreditCard} color={pending.length > 0 ? "red" : "emerald"} index={2} />
          <StatsCard title={t("statAnnouncements")} value={mockAnnouncements.length} subtitle={t("statNotRead")} icon={Bell} color="amber" index={3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">{t("myChildrenSection")}</h3>
            {myChildren.map((child) => {
              const childResultsList = mockResults.filter((r) => r.studentId === child.id)
              const childAvg = childResultsList.length > 0 ? childResultsList.reduce((s, r) => s + r.nota, 0) / childResultsList.length : 0
              const { label, color } = childAvg > 0 ? gradeLabel(childAvg) : { label: t("noGradesLabel"), color: "text-gray-400" }

              return (
                <motion.div key={child.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{child.fullName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{child.className} • {child.studentNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-2xl font-bold", color)}>{childAvg > 0 ? childAvg.toFixed(1) : "—"}</p>
                      <p className={cn("text-xs", color)}>{label}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {childResultsList.slice(0, 3).map((r) => {
                      const { color: rColor } = gradeLabel(r.nota)
                      return (
                        <div key={r.id} className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-400 truncate">{r.subjectName}</p>
                          <p className={cn("text-sm font-bold mt-0.5", rColor)}>{r.nota.toFixed(1)}</p>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">{t("pendingPaymentsSection")}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {pending.map((p) => (
                  <div key={p.id} className="px-5 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{p.studentName}</p>
                      <p className="text-xs text-gray-400">{paymentTypeLabel(p.type)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-red-500">MZN {p.amount}</p>
                      <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-0.5">{t("payMPesaBtn")}</button>
                    </div>
                  </div>
                ))}
                {pending.length === 0 && <p className="text-center py-6 text-sm text-gray-400">{t("noPaymentsDue")}</p>}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700">{t("latestAnnouncements")}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {mockAnnouncements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="px-5 py-3.5">
                    <p className="text-sm font-medium text-gray-900">{ann.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{ann.content}</p>
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
