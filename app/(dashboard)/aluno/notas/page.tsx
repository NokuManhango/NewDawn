"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText } from "lucide-react"
import { Header } from "@/components/layout/header"
import { ResultsTable } from "@/components/results/results-table"
import { mockResults } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export default function NotasAlunoPage() {
  const { t } = useI18n()
  const [trimester, setTrimester] = useState("1")
  const myResults = mockResults.filter((r) => r.studentId === "st1" && r.trimester === parseInt(trimester))
  const avg = myResults.length > 0 ? myResults.reduce((s, r) => s + r.nota, 0) / myResults.length : 0
  const passed = myResults.filter((r) => r.nota >= 10).length
  const failed = myResults.filter((r) => r.nota < 10).length

  function gradeLabel(nota: number): { label: string; color: string } {
    if (nota >= 14) return { label: t("gradeGood"), color: "text-emerald-600" }
    if (nota >= 10) return { label: t("gradeSufficient"), color: "text-amber-600" }
    return { label: t("gradeFail"), color: "text-red-600" }
  }

  function termLabel(num: string): string {
    return num === "1" ? t("term1") : num === "2" ? t("term2") : t("term3")
  }

  const { label, color } = gradeLabel(avg)

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("myGradesTitle")} subtitle={t("myGradesSub")} />

      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          {["1", "2", "3"].map((num) => (
            <button key={num} onClick={() => setTrimester(num)}
              className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                trimester === num ? "bg-emerald-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50")}>
              {termLabel(num)}
            </button>
          ))}
          <div className="flex-1" />
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> {t("downloadPDF")}
          </button>
        </div>

        {myResults.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className={cn("text-3xl font-bold", color)}>{avg.toFixed(1)}</p>
              <p className="text-xs text-gray-400 mt-1">{t("averageLabel")} ({label})</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-3xl font-bold text-emerald-600">{passed}</p>
              <p className="text-xs text-gray-400 mt-1">{t("approvedLabel")}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-3xl font-bold text-red-500">{failed}</p>
              <p className="text-xs text-gray-400 mt-1">{t("failedLabel")}</p>
            </div>
          </div>
        )}

        <ResultsTable results={myResults} />

        {myResults.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">{t("noGradesYet")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
