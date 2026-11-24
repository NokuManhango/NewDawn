"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Plus } from "lucide-react"
import { Header } from "@/components/layout/header"
import { mockClasses } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

const GRADE_COLORS = [
  "from-emerald-400 to-emerald-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-amber-400 to-amber-600",
  "from-red-400 to-red-600",
  "from-teal-400 to-teal-600",
]

export default function TurmasPage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("classesTitle")} subtitle={t("classesSub")} />

      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" /> {t("newClassBtn")}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockClasses.map((cls, i) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className={cn("h-3 bg-gradient-to-r", GRADE_COLORS[i % GRADE_COLORS.length])} />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{t("schoolYear")} {cls.year}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-100 font-medium">
                    {cls.grade}{t("classFilter")}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{t("studentPlural")}</p>
                      <p className="text-sm font-semibold text-gray-900">{cls.studentCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{t("classShift")}</p>
                      <p className="text-sm font-semibold text-gray-900">{t("morning")}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                    {t("viewStudents")}
                  </button>
                  <button className="flex-1 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    {t("viewTimetable")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
