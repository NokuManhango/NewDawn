"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Building2, MapPin, Phone, Mail, X, Check } from "lucide-react"
import { Header } from "@/components/layout/header"
import { mockSchools } from "@/lib/mock-data"
import { PROVINCES } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { School } from "@/types"

export default function EscolasPage() {
  const { t } = useI18n()
  const [schools, setSchools] = useState<School[]>(mockSchools)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: "", province: "Maputo Cidade", district: "", address: "", phone: "", email: "" })

  function update(k: string, v: string) { setForm((p) => ({ ...p, [k]: v })) }

  async function handleAdd() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    setSchools((prev) => [...prev, { ...form, id: `s${Date.now()}`, createdAt: new Date().toISOString() }])
    setSaving(false)
    setShowForm(false)
    setForm({ name: "", province: "Maputo Cidade", district: "", address: "", phone: "", email: "" })
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("schoolsTitle")} subtitle={t("schoolsSub")} />

      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" /> {t("newSchoolBtn")}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {schools.map((school, i) => (
            <motion.div key={school.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{school.name}</p>
                  <div className="mt-2 space-y-1">
                    <p className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin className="w-3 h-3" />{school.district}, {school.province}</p>
                    {school.phone && <p className="flex items-center gap-1.5 text-xs text-gray-500"><Phone className="w-3 h-3" />{school.phone}</p>}
                    {school.email && <p className="flex items-center gap-1.5 text-xs text-gray-500"><Mail className="w-3 h-3" />{school.email}</p>}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full ring-1 ring-emerald-200 font-medium">{t("schoolActive")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">{t("addSchoolTitle")}</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("schoolNameLabel")} *</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Escola Primária ..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">{t("provinceLabel")} *</label>
                    <select value={form.province} onChange={(e) => update("province", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                      {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">{t("district")} *</label>
                    <input value={form.district} onChange={(e) => update("district", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="KaMpfumo" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("addressLabel")}</label>
                  <input value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Av. ..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">{t("schoolPhoneLabel")}</label>
                    <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="+258 21 ..." />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">{t("schoolEmailLabel")}</label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="escola@edu.mz" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">{t("cancel")}</button>
                <button onClick={handleAdd} disabled={saving || !form.name || !form.district}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                  {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                  {t("add")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
