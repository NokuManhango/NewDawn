"use client"

import { Header } from "@/components/layout/header"
import { AttendanceForm } from "@/components/attendance/attendance-form"
import { mockAttendance } from "@/lib/mock-data"
import { formatDate, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

const STATUS_COLORS: Record<string, string> = {
  PRESENTE: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  AUSENTE: "bg-red-50 text-red-600 ring-1 ring-red-200",
  JUSTIFICADO: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
}

export default function PresencaPage() {
  const { t } = useI18n()
  const recentAttendance = mockAttendance.slice(0, 8)

  function statusLabel(status: string): string {
    const map: Record<string, string> = {
      PRESENTE: t("present"), AUSENTE: t("absent"), JUSTIFICADO: t("justified"),
      ACTIVE: t("active"), INACTIVE: t("inactive"), PAID: t("paid"),
      PENDING: t("pending"), OVERDUE: t("overdue"), CANCELLED: t("cancelled"),
    }
    return map[status] ?? status
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("attendanceTitle")} subtitle={t("attendanceSub")} />

      <div className="p-6 space-y-6">
        <AttendanceForm />

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">{t("attendanceHistory")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("colStudent")}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("colDate")}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("colStatus")}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">{t("colObservations")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAttendance.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-900">{a.studentName}</td>
                    <td className="px-5 py-3 text-gray-500">{formatDate(a.date)}</td>
                    <td className="px-5 py-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", STATUS_COLORS[a.status])}>
                        {statusLabel(a.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs hidden sm:table-cell">{a.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
