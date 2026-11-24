"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Check } from "lucide-react"
import { Header } from "@/components/layout/header"
import { mockStudents, mockSubjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export default function NotasProfessorPage() {
  const { t } = useI18n()
  const [selectedSubject, setSelectedSubject] = useState("sub1")
  const [trimester, setTrimester] = useState("1")
  const [grades, setGrades] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const classStudents = mockStudents.filter((s) => s.classId === "c1" && s.status === "ACTIVE")

  function gradeLabel(nota: number): { label: string; color: string } {
    if (nota >= 14) return { label: t("gradeGood"), color: "text-emerald-600" }
    if (nota >= 10) return { label: t("gradeSufficient"), color: "text-amber-600" }
    return { label: t("gradeFail"), color: "text-red-600" }
  }

  function termLabel(num: string): string {
    return num === "1" ? t("term1") : num === "2" ? t("term2") : t("term3")
  }

  function setGrade(studentId: string, val: string) {
    const num = parseFloat(val)
    if (val === "" || (!isNaN(num) && num >= 0 && num <= 20)) {
      setGrades((p) => ({ ...p, [studentId]: val }))
      setSaved(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
  }

  const subject = mockSubjects.find((s) => s.id === selectedSubject)

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("gradeInputTitle")} subtitle={t("gradeInputSub")} />

      <div className="p-6 space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-700 mb-1 block">{t("disciplineLabel")}</label>
              <select value={selectedSubject} onChange={(e) => { setSelectedSubject(e.target.value); setSaved(false) }}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                {mockSubjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="w-40">
              <label className="text-xs font-medium text-gray-700 mb-1 block">{t("trimesterLabel")}</label>
              <select value={trimester} onChange={(e) => { setTrimester(e.target.value); setSaved(false) }}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                <option value="1">{t("term1")}</option>
                <option value="2">{t("term2")}</option>
                <option value="3">{t("term3")}</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={handleSave} disabled={saving || Object.keys(grades).length === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? t("saved") : t("saveGrades")}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">{subject?.name} — {termLabel(trimester)}</h3>
            <p className="text-xs text-gray-400">{t("gradeScale")}</p>
          </div>
          <div className="divide-y divide-gray-50">
            {classStudents.map((student, i) => {
              const grade = grades[student.id] !== undefined ? parseFloat(grades[student.id]) : NaN
              const { label, color } = !isNaN(grade) ? gradeLabel(grade) : { label: "", color: "" }

              return (
                <motion.div key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                      <p className="text-xs text-gray-400 font-mono">{student.studentNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {!isNaN(grade) && (
                      <span className={cn("text-xs font-medium", color)}>{label}</span>
                    )}
                    <input
                      type="number"
                      min={0}
                      max={20}
                      step={0.5}
                      value={grades[student.id] ?? ""}
                      onChange={(e) => setGrade(student.id, e.target.value)}
                      placeholder="—"
                      className={cn(
                        "w-16 text-center px-2 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors",
                        !isNaN(grade) && grade < 10
                          ? "border-red-200 focus:ring-red-500/20 focus:border-red-400 text-red-600"
                          : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-400 text-gray-900"
                      )}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
