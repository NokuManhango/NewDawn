"use client"

import { motion } from "framer-motion"
import { Building2, Users, GraduationCap, Activity } from "lucide-react"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart, AttendanceChart } from "@/components/dashboard/charts"
import { mockSchools, mockUsers } from "@/lib/mock-data"
import { useI18n } from "@/lib/i18n"

export default function AdminDashboard() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("adminDashboardTitle")} subtitle={t("adminDashboardSub")} />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title={t("statSchools")} value={mockSchools.length} subtitle={t("statInProvinces")} icon={Building2} color="emerald" trend={{ value: 25, label: t("vsLastYear") }} index={0} />
          <StatsCard title={t("statUsersLabel")} value={mockUsers.length} subtitle={t("statRegistered")} icon={Users} color="blue" trend={{ value: 12, label: t("vsLastMonth") }} index={1} />
          <StatsCard title={t("statTotalStudents")} value="2.420" subtitle={t("statInSystem")} icon={GraduationCap} color="purple" trend={{ value: 8, label: t("vsLastYear") }} index={2} />
          <StatsCard title={t("statAttendanceRate")} value="91.2%" subtitle={t("statThisWeek")} icon={Activity} color="amber" trend={{ value: 3, label: t("vsLastWeek") }} index={3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <AttendanceChart />
          <RevenueChart />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">{t("schoolsRegistered")}</h3>
            <span className="text-xs text-gray-400">{mockSchools.length} {t("schoolPlural").toLowerCase()}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {mockSchools.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Building2 className="w-[18px] h-[18px] text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{school.name}</p>
                    <p className="text-xs text-gray-400">{school.district}, {school.province}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{school.phone ?? "—"}</p>
                  <span className="text-xs text-emerald-600 font-medium">{t("schoolActive")}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
