"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { Result } from "@/types"

interface ResultsTableProps {
  results: Result[]
  showStudent?: boolean
}

export function ResultsTable({ results, showStudent = false }: ResultsTableProps) {
  const { t } = useI18n()
  const avg = results.length > 0 ? results.reduce((s, r) => s + r.nota, 0) / results.length : 0

  function gradeLabel(nota: number) {
    if (nota >= 17) return { label: t("gradeVeryGood"), color: "text-blue-600" }
    if (nota >= 14) return { label: t("gradeGood"), color: "text-emerald-600" }
    if (nota >= 10) return { label: t("gradeSufficient"), color: "text-amber-600" }
    return { label: t("gradeFail"), color: "text-red-600" }
  }

  function avgColor(v: number) {
    if (v >= 14) return "text-emerald-600"
    if (v >= 10) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{t("academicResults")}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{t("averageShort")}:</span>
          <span className={cn("text-sm font-bold", avgColor(avg))}>{avg.toFixed(1)}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {showStudent && <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colStudent")}</th>}
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colSubject")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colTrimester")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colGrade")}</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{t("colClassification")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {results.map((result, i) => {
              const { label, color } = gradeLabel(result.nota)
              return (
                <motion.tr
                  key={result.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {showStudent && <td className="px-4 py-3 font-medium text-gray-900">{result.studentName}</td>}
                  <td className="px-4 py-3 text-gray-700">{result.subjectName}</td>
                  <td className="px-4 py-3 text-gray-500">{result.trimester}{t("termSuffix")}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-lg font-bold", color)}>{result.nota.toFixed(1)}</span>
                    <span className="text-gray-400 text-xs ml-1">{t("scaleLabel")}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      result.nota >= 10 ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-red-50 text-red-600 ring-1 ring-red-200"
                    )}>
                      {result.nota >= 10 ? t("gradeApproved") : t("gradeFail")}
                    </span>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
        {results.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">{t("noResults")}</div>
        )}
      </div>
    </div>
  )
}
