"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts"
import { useI18n } from "@/lib/i18n"
import { attendanceChartData, gradeDistribution, revenueChartData } from "@/lib/mock-data"

const GRADE_COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"]

export function AttendanceChart() {
  const { t } = useI18n()
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{t("chartAttendanceTitle")}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={attendanceChartData} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
          <Bar dataKey="presentes" name={t("chartPresent")} fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ausentes" name={t("chartAbsent")} fill="#fca5a5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function GradeDistributionChart() {
  const { t } = useI18n()
  const labeledData = [
    { ...gradeDistribution[0], label: t("gradeFail") },
    { ...gradeDistribution[1], label: t("gradeSufficient") },
    { ...gradeDistribution[2], label: t("gradeGood") },
    { ...gradeDistribution[3], label: t("gradeVeryGood") },
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{t("chartGradesTitle")}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={labeledData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="count" nameKey="label">
            {labeledData.map((_, index) => (
              <Cell key={index} fill={GRADE_COLORS[index]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
          <Legend formatter={(value) => <span style={{ fontSize: 12, color: "#6b7280" }}>{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RevenueChart() {
  const { t } = useI18n()
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{t("chartRevenueTitle")}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={revenueChartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
            formatter={(v) => [`MZN ${Number(v).toLocaleString()}`, t("chartRevenueTitle").split(" ")[0]]}
          />
          <Line type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
