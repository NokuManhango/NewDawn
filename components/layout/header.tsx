"use client"

import { useState } from "react"
import { Bell, Search, Globe, AlertTriangle, Calendar, BookOpen, X } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"
import { getRoleLabel, getInitials, formatDate, cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { mockAnnouncements } from "@/lib/mock-data"
import type { AnnouncementType } from "@/types"

interface HeaderProps {
  title: string
  subtitle?: string
}

const NOTIF_ICONS: Record<AnnouncementType, React.ElementType> = {
  GERAL:     Bell,
  URGENTE:   AlertTriangle,
  EVENTO:    Calendar,
  ACADEMICO: BookOpen,
}

const NOTIF_COLORS: Record<AnnouncementType, string> = {
  GERAL:     "bg-gray-100 text-gray-600",
  URGENTE:   "bg-red-100 text-red-600",
  EVENTO:    "bg-purple-100 text-purple-600",
  ACADEMICO: "bg-blue-100 text-blue-600",
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth()
  const { lang, setLang, t } = useI18n()

  const [notifOpen, setNotifOpen] = useState(false)
  const [readIds, setReadIds] = useState<Set<string>>(new Set())

  const unreadCount = mockAnnouncements.filter((a) => !readIds.has(a.id)).length

  function handleBellClick() {
    if (!notifOpen) {
      setReadIds(new Set(mockAnnouncements.map((a) => a.id)))
    }
    setNotifOpen((o) => !o)
  }

  function toggleLang() {
    setLang(lang === "pt" ? "en" : "pt")
  }

  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6 shrink-0 z-30">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={lang === "pt" ? "Pesquisar..." : "Search..."}
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 w-48"
          />
        </div>

        {/* Language toggle */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
        >
          <Globe className="w-3.5 h-3.5" />
          <AnimatePresence mode="wait">
            <motion.span
              key={lang}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
            >
              {lang === "pt" ? "EN" : "PT"}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={handleBellClick}
            className={cn(
              "relative w-9 h-9 rounded-lg border flex items-center justify-center transition-colors",
              notifOpen
                ? "bg-gray-100 border-gray-300 text-gray-700"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            )}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{t("notificationsTitle")}</p>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                    {mockAnnouncements.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-8">{t("noNotifications")}</p>
                    ) : (
                      mockAnnouncements.map((ann) => {
                        const Icon = NOTIF_ICONS[ann.type]
                        const colorClass = NOTIF_COLORS[ann.type]
                        return (
                          <div key={ann.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", colorClass)}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 leading-snug">{ann.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{ann.content}</p>
                              <p className="text-xs text-gray-300 mt-1">{formatDate(ann.createdAt)}</p>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>

                  <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50/50">
                    <p className="text-xs text-gray-400 text-center">{t("markAllRead")}</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
            {getInitials(user?.name ?? "U")}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name}</p>
            <p className="text-xs text-gray-500">{getRoleLabel(user?.role ?? "")}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
