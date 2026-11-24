"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { mockAnnouncements } from "@/lib/mock-data"
import { formatDate, cn } from "@/lib/utils"
import type { AnnouncementType } from "@/types"
import { Bell, AlertTriangle, BookOpen, Calendar } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import type { TranslationKey } from "@/lib/translations"

const TYPE_ICONS: Record<AnnouncementType, React.ElementType> = {
  GERAL: Bell,
  URGENTE: AlertTriangle,
  EVENTO: Calendar,
  ACADEMICO: BookOpen,
}

const TYPE_COLORS: Record<AnnouncementType, string> = {
  GERAL: "bg-gray-50 text-gray-700 border-gray-200",
  URGENTE: "bg-red-50 text-red-700 border-red-200",
  EVENTO: "bg-purple-50 text-purple-700 border-purple-200",
  ACADEMICO: "bg-blue-50 text-blue-700 border-blue-200",
}

const BORDER_COLORS: Record<AnnouncementType, string> = {
  GERAL: "border-l-gray-300",
  URGENTE: "border-l-red-500",
  EVENTO: "border-l-purple-500",
  ACADEMICO: "border-l-blue-500",
}

export default function ComunicadosEncarregadoPage() {
  const { t } = useI18n()

  function annTypeLabel(type: string): string {
    const map: Record<string, TranslationKey> = {
      GERAL: "annTypeGeral", URGENTE: "annTypeUrgente",
      EVENTO: "annTypeEvento", ACADEMICO: "annTypeAcademico",
    }
    const key = map[type]
    return key ? t(key) : type
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("announcementsTitle")} subtitle={t("announcementsSub")} />

      <div className="p-6 space-y-4">
        {mockAnnouncements.map((ann, i) => {
          const Icon = TYPE_ICONS[ann.type]
          const colorClass = TYPE_COLORS[ann.type]
          const borderClass = BORDER_COLORS[ann.type]
          return (
            <motion.div key={ann.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={cn("bg-white rounded-xl border-l-4 border border-gray-100 p-5", borderClass)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border", colorClass)}>
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium border", colorClass)}>{annTypeLabel(ann.type)}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{ann.content}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 shrink-0 mt-1">{formatDate(ann.createdAt)}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
