"use client"

import { Header } from "@/components/layout/header"
import { AttendanceChart, GradeDistributionChart, RevenueChart } from "@/components/dashboard/charts"
import { useI18n } from "@/lib/i18n"

export default function DirectorRelatoriosPage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("schoolReportsTitle")} subtitle={t("directorReportsSub")} />
      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <AttendanceChart />
          <GradeDistributionChart />
        </div>
        <RevenueChart />
      </div>
    </div>
  )
}
