"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MessageSquare, Smartphone, X, Check, AlertTriangle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { mockAnnouncements } from "@/lib/mock-data"
import { formatDate, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { AnnouncementType } from "@/types"
import type { TranslationKey } from "@/lib/translations"

const TYPE_COLORS: Record<AnnouncementType, string> = {
  GERAL: "bg-gray-50 text-gray-700 ring-1 ring-gray-200",
  URGENTE: "bg-red-50 text-red-700 ring-1 ring-red-200",
  EVENTO: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  ACADEMICO: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
}

export default function ComunicacoesPage() {
  const { t } = useI18n()
  const [showForm, setShowForm] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ title: "", content: "", type: "GERAL" as AnnouncementType, sendSMS: false })

  function update(k: string, v: string | boolean) { setForm((p) => ({ ...p, [k]: v })) }

  async function handleSend() {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    setTimeout(() => { setSent(false); setShowForm(false); setForm({ title: "", content: "", type: "GERAL", sendSMS: false }) }, 2000)
  }

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
      <Header title={t("commsTitle")} subtitle={t("commsSub")} />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: t("smsSentCount"), value: "284", icon: Smartphone, color: "text-emerald-600 bg-emerald-50" },
            { label: t("announceCount"), value: mockAnnouncements.length, icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
            { label: t("urgentCount"), value: mockAnnouncements.filter((a) => a.type === "URGENTE").length, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-2", color)}>
                <Icon className="w-[18px] h-[18px]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
            <Send className="w-4 h-4" /> {t("newAnnouncementBtn")}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">{t("announceHistory")}</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {mockAnnouncements.map((ann, i) => (
              <motion.div key={ann.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", TYPE_COLORS[ann.type])}>
                        {annTypeLabel(ann.type)}
                      </span>
                      {ann.sendSMS && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <Smartphone className="w-3 h-3" /> {t("smsSentBadge")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{ann.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                  </div>
                  <p className="text-xs text-gray-400 shrink-0 mt-1">{formatDate(ann.createdAt)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">{t("newAnnouncementBtn")}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                {sent ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-gray-900">{t("announcementSent")}</p>
                    {form.sendSMS && <p className="text-sm text-gray-500 mt-1">{t("smsSentToAll")}</p>}
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">{t("announceType")} *</label>
                      <select value={form.type} onChange={(e) => update("type", e.target.value as AnnouncementType)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                        <option value="GERAL">{t("annTypeGeral")}</option>
                        <option value="ACADEMICO">{t("annTypeAcademico")}</option>
                        <option value="EVENTO">{t("annTypeEvento")}</option>
                        <option value="URGENTE">{t("annTypeUrgente")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">{t("announceTitle")} *</label>
                      <input value={form.title} onChange={(e) => update("title", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                        placeholder={t("announceTitle")} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">{t("announceMessage")} *</label>
                      <textarea value={form.content} onChange={(e) => update("content", e.target.value)} rows={4}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
                        placeholder={t("announceMessage")} />
                      {form.sendSMS && <p className="text-xs text-amber-600 mt-1">{form.content.length}/160 {t("smsCharCount")}</p>}
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => update("sendSMS", !form.sendSMS)}
                        className={cn("w-10 h-5 rounded-full transition-colors relative", form.sendSMS ? "bg-emerald-500" : "bg-gray-200")}
                      >
                        <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform", form.sendSMS ? "translate-x-5" : "translate-x-0.5")} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{t("sendViaSMS")}</p>
                        <p className="text-xs text-gray-400">{t("notifyGuardians")}</p>
                      </div>
                    </label>
                  </>
                )}
              </div>
              {!sent && (
                <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">{t("cancel")}</button>
                  <button onClick={handleSend} disabled={sending || !form.title || !form.content}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                    {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                    {sending ? t("sending") : t("send")}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
