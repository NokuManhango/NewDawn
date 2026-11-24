"use client"

import { motion } from "framer-motion"
import { UserPlus, Phone, Mail, BookOpen } from "lucide-react"
import { Header } from "@/components/layout/header"
import { mockUsers } from "@/lib/mock-data"
import { getInitials } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

const SUBJECTS = ["Português", "Matemática", "Física/Química", "Biologia", "História/Geografia", "Inglês"]

export default function ProfessoresPage() {
  const { t } = useI18n()
  const professors = mockUsers.filter((u) => u.role === "PROFESSOR")

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("teachersTitle")} subtitle={t("teachersSub")} />

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{professors.length} {t("teachersRegistered")}</p>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
            <UserPlus className="w-4 h-4" /> {t("addTeacherBtn")}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {professors.map((prof, i) => (
            <motion.div
              key={prof.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(prof.name)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{prof.name}</p>
                  <p className="text-xs text-gray-400">{t("teacherRole")}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{prof.email}</span>
                </div>
                {prof.phone && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{prof.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{SUBJECTS[i % SUBJECTS.length]}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full ring-1 ring-emerald-200 font-medium">{t("active")}</span>
                <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{t("viewProfile")}</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
