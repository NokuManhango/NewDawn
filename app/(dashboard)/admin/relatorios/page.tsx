"use client"

import { Header } from "@/components/layout/header"
import { AttendanceChart, GradeDistributionChart, RevenueChart } from "@/components/dashboard/charts"
import { Download, FileText, TrendingUp } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function RelatoriosPage() {
  const { t } = useI18n()

  const REPORTS = [
    { title: t("reportAttendance"), desc: t("reportAttendanceSub"), icon: FileText, date: "Mai 2025" },
    { title: t("reportGrades"), desc: t("reportGradesSub"), icon: TrendingUp, date: "1º Trim. 2025" },
    { title: t("reportFinance"), desc: t("reportFinanceSub"), icon: FileText, date: "Abr 2025" },
  ]

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("reportsTitle")} subtitle={t("reportsSub")} />

      <div className="p-6 space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {REPORTS.map((r, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <r.icon className="w-[18px] h-[18px] text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                  <p className="text-xs text-gray-300 mt-1">{r.date}</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shrink-0">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <AttendanceChart />
          <GradeDistributionChart />
        </div>
        <RevenueChart />
      </div>
    </div>
  )
}
