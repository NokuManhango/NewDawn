"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { mockTimetable } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

const SUBJECT_COLORS: Record<string, string> = {
  PORT: "bg-blue-50 border-blue-200 text-blue-800",
  MAT: "bg-emerald-50 border-emerald-200 text-emerald-800",
  FIS: "bg-purple-50 border-purple-200 text-purple-800",
  QUIM: "bg-amber-50 border-amber-200 text-amber-800",
  BIO: "bg-teal-50 border-teal-200 text-teal-800",
  HIST: "bg-orange-50 border-orange-200 text-orange-800",
  GEO: "bg-cyan-50 border-cyan-200 text-cyan-800",
  ING: "bg-indigo-50 border-indigo-200 text-indigo-800",
  EF: "bg-red-50 border-red-200 text-red-800",
  EV: "bg-pink-50 border-pink-200 text-pink-800",
}

const TIME_SLOTS = ["07:00", "08:00", "09:30", "10:30", "11:30"]

export default function HorarioProfessorPage() {
  const { t } = useI18n()
  const dayNames = [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday")]
  const totalLessons = mockTimetable.filter((e) => e.classId === "c1").length

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("scheduleTitle")} subtitle={t("scheduleSub")} />

      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-24">{t("timeCol")}</th>
                  {dayNames.map((day) => (
                    <th key={day} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((slot, si) => (
                  <tr key={slot} className={cn("border-b border-gray-50", si % 2 === 0 ? "" : "bg-gray-50/30")}>
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono font-medium">{slot}</td>
                    {dayNames.map((_, di) => {
                      const entry = mockTimetable.find((e) => e.dayOfWeek === di && e.startTime === slot)
                      return (
                        <td key={di} className="px-2 py-2">
                          {entry ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (si * 5 + di) * 0.02 }}
                              className={cn("rounded-lg border px-3 py-2 text-xs", SUBJECT_COLORS[entry.subjectCode] ?? "bg-gray-50 border-gray-200 text-gray-700")}
                            >
                              <p className="font-semibold">{entry.subjectName}</p>
                              <p className="text-opacity-70 mt-0.5 opacity-70">{entry.room}</p>
                            </motion.div>
                          ) : (
                            <div className="h-10 rounded-lg border border-dashed border-gray-100" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <div className="w-4 h-px bg-gray-300" />
          <span>{t("breakTime")}: 09:00 – 09:30</span>
          <div className="flex-1 h-px bg-gray-100" />
          <span>{totalLessons} {t("lessonsPerWeek")}</span>
        </div>
      </div>
    </div>
  )
}
