"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Smartphone, Check, AlertCircle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { mockPayments, mockStudents } from "@/lib/mock-data"
import { formatDate, formatCurrency, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { Payment } from "@/types"
import type { TranslationKey } from "@/lib/translations"

const STATUS_COLORS: Record<string, string> = {
  PAID: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  OVERDUE: "bg-red-50 text-red-600 ring-1 ring-red-200",
  CANCELLED: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
}

export default function PagamentosPage() {
  const { t } = useI18n()
  const myChildren = mockStudents.filter((s) => s.guardianId === "u6")
  const myPayments = mockPayments.filter((p) => myChildren.some((c) => c.id === p.studentId))
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState<string[]>([])
  const [mpesaPhone, setMpesaPhone] = useState("+258 84 777 888")

  const totalPaid = myPayments.filter((p) => p.status === "PAID" || paid.includes(p.id)).reduce((s, p) => s + p.amount, 0)
  const totalPending = myPayments.filter((p) => (p.status === "PENDING" || p.status === "OVERDUE") && !paid.includes(p.id)).reduce((s, p) => s + p.amount, 0)

  async function handlePay() {
    if (!selectedPayment) return
    setPaying(true)
    await new Promise((r) => setTimeout(r, 1800))
    setPaid((p) => [...p, selectedPayment.id])
    setPaying(false)
    setTimeout(() => setSelectedPayment(null), 1500)
  }

  function paymentTypeLabel(type: string): string {
    const map: Record<string, TranslationKey> = {
      MATRICULA: "paymentTypeMatricula", MENSALIDADE: "paymentTypeMensalidade",
      EXAME: "paymentTypeExame", MULTA: "paymentTypeMulta",
    }
    const key = map[type]
    return key ? t(key) : type
  }

  function statusLabel(status: string): string {
    const map: Record<string, TranslationKey> = {
      PAID: "paid", PENDING: "pending", OVERDUE: "overdue", CANCELLED: "cancelled",
    }
    const key = map[status]
    return key ? t(key) : status
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("paymentsTitle")} subtitle={t("paymentsSub")} />

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{t("totalPaidLabel")}</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{t("amountDueLabel")}</p>
            <p className="text-2xl font-bold text-red-500">{formatCurrency(totalPending)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">{t("paymentHistory")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("colStudent")}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("colType")}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("colValue")}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">{t("colDueDate")}</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("colStatus")}</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myPayments.map((p, i) => {
                  const isPaid = p.status === "PAID" || paid.includes(p.id)
                  const effectiveStatus = paid.includes(p.id) ? "PAID" : p.status
                  return (
                    <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3.5 font-medium text-gray-900">{p.studentName}</td>
                      <td className="px-5 py-3.5 text-gray-600">{paymentTypeLabel(p.type)}</td>
                      <td className="px-5 py-3.5 font-semibold text-gray-900">{formatCurrency(p.amount)}</td>
                      <td className="px-5 py-3.5 text-gray-400 hidden sm:table-cell">{p.dueDate ? formatDate(p.dueDate) : "—"}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", STATUS_COLORS[effectiveStatus])}>
                          {statusLabel(effectiveStatus)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {!isPaid && (
                          <button onClick={() => setSelectedPayment(p)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                            <Smartphone className="w-3.5 h-3.5" /> {t("payBtn")}
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-white text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="w-6 h-6" />
                </div>
                <p className="font-bold text-lg">{t("mpesaPayment")}</p>
                <p className="text-red-100 text-sm mt-1">{paymentTypeLabel(selectedPayment.type)}</p>
                <p className="text-3xl font-bold mt-2">{formatCurrency(selectedPayment.amount)}</p>
              </div>
              <div className="p-6 space-y-4">
                {paid.includes(selectedPayment.id) ? (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-gray-900">{t("paymentDone")}</p>
                    <p className="text-sm text-gray-400 mt-1">{t("smsDone")}</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">{t("mpesaWarning")}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">{t("mpesaPhone")}</label>
                      <input value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedPayment(null)} className="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        {t("cancel")}
                      </button>
                      <button onClick={handlePay} disabled={paying}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-60 transition-colors">
                        {paying ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CreditCard className="w-4 h-4" />}
                        {paying ? t("processing") : t("confirmPayment")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
