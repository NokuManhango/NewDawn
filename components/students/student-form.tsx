"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, MapPin, ChevronRight, Check } from "lucide-react"
import { cn, PROVINCES } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import { mockClasses } from "@/lib/mock-data"

interface StudentFormProps {
  onClose: () => void
  onSuccess?: () => void
}

export function StudentForm({ onClose, onSuccess }: StudentFormProps) {
  const { t } = useI18n()
  const STEPS = [t("stepPersonal"), t("stepContacts"), t("stepAcademic")]

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "MASCULINO",
    address: "",
    province: "Maputo Cidade",
    guardianName: "",
    guardianPhone: "",
    classId: "",
  })

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setDone(true)
    setTimeout(() => { onSuccess?.(); onClose() }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-900">{t("newEnrollment")}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{t("stepLabel")} {step + 1} {t("stepOf")} {STEPS.length}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex px-6 pt-4 gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-emerald-500" : "bg-gray-100")} />
              <p className={cn("text-xs mt-1 font-medium", i === step ? "text-emerald-600" : "text-gray-400")}>{s}</p>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="font-semibold text-gray-900">{t("enrollmentDone")}</p>
                <p className="text-sm text-gray-500 mt-1">{t("enrollmentDoneMsg")}</p>
              </motion.div>
            ) : step === 0 ? (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">{t("firstName")} *</label>
                    <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Ana" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">{t("lastName")} *</label>
                    <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Sitoe" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("dateOfBirth")} *</label>
                  <input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("gender")} *</label>
                  <div className="flex gap-3">
                    {[["MASCULINO", t("male")], ["FEMININO", t("female")]].map(([val, label]) => (
                      <button key={val} onClick={() => update("gender", val)} className={cn("flex-1 py-2 text-sm rounded-lg border transition-colors", form.gender === val ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium" : "border-gray-200 text-gray-600 hover:bg-gray-50")}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("guardianName")} *</label>
                  <input value={form.guardianName} onChange={(e) => update("guardianName", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("guardianPhone")} *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={form.guardianPhone} onChange={(e) => update("guardianPhone", e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="+258 84 000 0000" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("addressLabel")}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" placeholder="Bairro, Cidade" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("provinceLabel")}</label>
                  <select value={form.province} onChange={(e) => update("province", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                    {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </motion.div>
            ) : (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("classLabel")}</label>
                  <select value={form.classId} onChange={(e) => update("classId", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                    <option value="">{t("selectClass")}</option>
                    {mockClasses.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.studentCount} {t("studentsLabel")})</option>)}
                  </select>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-xs text-amber-700 font-medium">{t("enrollmentNote")}</p>
                  <p className="text-xs text-amber-600 mt-1">{t("enrollmentNoteText")}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!done && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <button onClick={() => step > 0 ? setStep(step - 1) : onClose()} className="text-sm text-gray-500 hover:text-gray-700">
              {step === 0 ? t("cancel") : t("previous")}
            </button>
            <button
              onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : handleSubmit()}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition-colors"
            >
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("saving")}</>
              ) : step < STEPS.length - 1 ? (
                <>{t("next")} <ChevronRight className="w-4 h-4" /></>
              ) : t("registerStudent")}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
