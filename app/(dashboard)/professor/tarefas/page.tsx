"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { mockAssignments, mockSubmissions, mockSubjects } from "@/lib/mock-data"
import { formatDate, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { Assignment, Submission, SubmissionStatus, SubmissionType } from "@/types"
import {
  Plus, X, CheckCircle2, AlertCircle, Clock,
  ChevronRight, Check, Users, ClipboardCheck,
} from "lucide-react"

const SUBJECT_COLORS: Record<string, string> = {
  "Português":  "bg-purple-100 text-purple-700",
  "Matemática": "bg-blue-100 text-blue-700",
  "Física":     "bg-cyan-100 text-cyan-700",
  "Química":    "bg-orange-100 text-orange-700",
  "Biologia":   "bg-emerald-100 text-emerald-700",
  "História":   "bg-amber-100 text-amber-700",
  "Geografia":  "bg-green-100 text-green-700",
  "Inglês":     "bg-indigo-100 text-indigo-700",
}

const STATUS_CONFIG: Record<SubmissionStatus, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  PENDING:   { bg: "bg-gray-50",    text: "text-gray-500",    border: "border-gray-200",   icon: Clock },
  SUBMITTED: { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   icon: CheckCircle2 },
  LATE:      { bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200", icon: AlertCircle },
  GRADED:    { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",icon: Check },
  OVERDUE:   { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",    icon: AlertCircle },
}

interface NewAssignment {
  title: string
  description: string
  subjectId: string
  dueDate: string
  maxGrade: string
  submissionType: SubmissionType
}

export default function ProfessorTarefasPage() {
  const { t } = useI18n()

  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments)
  const [gradesState, setGradesState] = useState<Record<string, { grade: number; feedback: string }>>({})

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [gradingSubmission, setGradingSubmission] = useState<Submission | null>(null)
  const [gradeInput, setGradeInput] = useState("")
  const [feedbackInput, setFeedbackInput] = useState("")
  const [gradeSaving, setGradeSaving] = useState(false)
  const [savedGrades, setSavedGrades] = useState<Set<string>>(new Set())

  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createDone, setCreateDone] = useState(false)
  const [newAssignment, setNewAssignment] = useState<NewAssignment>({
    title: "", description: "", subjectId: "sub1", dueDate: "", maxGrade: "20", submissionType: "text",
  })

  function getSubmissionsFor(assignmentId: string): Submission[] {
    return mockSubmissions.filter((s) => s.assignmentId === assignmentId)
  }

  function getSubmissionProgress(assignmentId: string): { submitted: number; total: number; toGrade: number; graded: number } {
    const subs = getSubmissionsFor(assignmentId)
    const submitted = subs.filter((s) => s.status === "SUBMITTED" || s.status === "LATE" || s.status === "GRADED").length
    const toGrade = subs.filter((s) => (s.status === "SUBMITTED" || s.status === "LATE") && !savedGrades.has(s.id)).length
    const graded = subs.filter((s) => s.status === "GRADED" || savedGrades.has(s.id)).length
    return { submitted, total: subs.length, toGrade, graded }
  }

  const totalToGrade = assignments.reduce((sum, a) => sum + getSubmissionProgress(a.id).toGrade, 0)
  const totalGraded = assignments.reduce((sum, a) => sum + getSubmissionProgress(a.id).graded, 0)

  function statusLabel(status: SubmissionStatus): string {
    const labels: Record<SubmissionStatus, string> = {
      PENDING:   t("tabPending"),
      SUBMITTED: t("submittedLabel"),
      LATE:      t("lateLabel"),
      GRADED:    t("gradedLabel"),
      OVERDUE:   t("tabOverdue"),
    }
    return labels[status]
  }

  async function handleSaveGrade() {
    if (!gradingSubmission) return
    const gradeNum = parseFloat(gradeInput)
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > gradingSubmission.maxGrade) return
    setGradeSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setGradesState((prev) => ({ ...prev, [gradingSubmission.id]: { grade: gradeNum, feedback: feedbackInput } }))
    setSavedGrades((prev) => new Set([...prev, gradingSubmission.id]))
    setGradeSaving(false)
    setGradingSubmission(null)
    setGradeInput("")
    setFeedbackInput("")
  }

  async function handleCreate() {
    if (!newAssignment.title.trim() || !newAssignment.dueDate) return
    setCreating(true)
    await new Promise((r) => setTimeout(r, 1200))
    const subject = mockSubjects.find((s) => s.id === newAssignment.subjectId)
    const created: Assignment = {
      id: `as${Date.now()}`,
      title: newAssignment.title,
      description: newAssignment.description,
      subjectId: newAssignment.subjectId,
      subjectName: subject?.name ?? "",
      classId: "c1",
      className: "8ª Classe A",
      teacherId: "u3",
      teacherName: "Maria Cossa",
      dueDate: newAssignment.dueDate,
      maxGrade: parseInt(newAssignment.maxGrade) || 20,
      createdAt: "2025-05-10",
      submissionType: newAssignment.submissionType,
    }
    setAssignments((prev) => [created, ...prev])
    setCreating(false)
    setCreateDone(true)
    setTimeout(() => {
      setShowCreate(false)
      setCreateDone(false)
      setNewAssignment({ title: "", description: "", subjectId: "sub1", dueDate: "", maxGrade: "20", submissionType: "text" })
    }, 1800)
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("profAssignmentsTitle")} subtitle={t("profAssignmentsSub")} />

      <div className="p-6 space-y-5">
        {/* Stats + Create button */}
        <div className="flex items-stretch gap-4">
          <div className="grid grid-cols-3 gap-3 flex-1">
            {[
              { label: t("tabAll"),       val: assignments.length,  color: "text-gray-700",    bg: "bg-gray-50",    border: "border-gray-200" },
              { label: t("gradeSubmission"), val: totalToGrade,    color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-100" },
              { label: t("gradedLabel"),  val: totalGraded,         color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className={cn("rounded-xl border p-4", s.bg, s.border)}>
                <p className={cn("text-2xl font-bold", s.color)}>{s.val}</p>
                <p className={cn("text-xs mt-0.5 font-medium", s.color)}>{s.label}</p>
              </motion.div>
            ))}
          </div>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors self-center shrink-0">
            <Plus className="w-4 h-4" />
            {t("createAssignment")}
          </button>
        </div>

        {/* Assignment cards */}
        <div className="space-y-3">
          {assignments.map((assignment, i) => {
            const { submitted, total, toGrade, graded } = getSubmissionProgress(assignment.id)
            const subjectColor = SUBJECT_COLORS[assignment.subjectName] ?? "bg-gray-100 text-gray-600"
            const pct = total > 0 ? Math.round((submitted / total) * 100) : 0

            return (
              <motion.div key={assignment.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", subjectColor)}>
                        {assignment.subjectName}
                      </span>
                      <span className="text-xs text-gray-400">{assignment.className}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-snug">{assignment.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{assignment.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400">{t("dueOn")}</p>
                    <p className="text-sm font-medium text-gray-700">{formatDate(assignment.dueDate)}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{submitted} / {total} {t("tabSubmitted").toLowerCase()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {toGrade > 0 && (
                        <span className="text-amber-600 font-medium">{toGrade} {t("gradeSubmission").toLowerCase()}</span>
                      )}
                      <span className="text-emerald-600 font-medium">{graded} {t("gradedLabel").toLowerCase()}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors">
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  {t("viewSubmissionsBtn")} ({submitted})
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Submissions Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">{selectedAssignment.subjectName}</p>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">{selectedAssignment.title}</h3>
                </div>
                <button onClick={() => { setSelectedAssignment(null); setGradingSubmission(null) }}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("submissionsTitle")}</p>

                {getSubmissionsFor(selectedAssignment.id).map((sub) => {
                  const isGradedNow = savedGrades.has(sub.id)
                  const displayStatus: SubmissionStatus = isGradedNow ? "GRADED" : sub.status
                  const cfg = STATUS_CONFIG[displayStatus]
                  const StatusIcon = cfg.icon
                  const savedGradeData = gradesState[sub.id]
                  const displayGrade = isGradedNow ? savedGradeData?.grade : sub.grade
                  const isGrading = gradingSubmission?.id === sub.id
                  const canGrade = (displayStatus === "SUBMITTED" || displayStatus === "LATE") && !isGradedNow

                  return (
                    <div key={sub.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{sub.studentName}</p>
                          {sub.submittedAt && (
                            <p className="text-xs text-gray-400">{t("submittedOn")} {formatDate(sub.submittedAt)}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {(displayStatus === "GRADED") && displayGrade !== undefined && (
                            <span className="text-sm font-bold text-emerald-600">{displayGrade}/{sub.maxGrade}</span>
                          )}
                          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium border flex items-center gap-1", cfg.bg, cfg.text, cfg.border)}>
                            <StatusIcon className="w-3 h-3" />
                            {statusLabel(displayStatus)}
                          </span>
                        </div>
                      </div>

                      {sub.content && displayStatus !== "GRADED" && (
                        <p className="text-xs text-gray-600 bg-white rounded-lg p-2.5 line-clamp-3 leading-relaxed whitespace-pre-line">{sub.content}</p>
                      )}

                      {/* Show existing feedback if graded from original data */}
                      {displayStatus === "GRADED" && (sub.feedback || savedGradeData?.feedback) && (
                        <div className="bg-blue-50 rounded-lg p-2.5">
                          <p className="text-xs text-blue-700 leading-relaxed">{savedGradeData?.feedback ?? sub.feedback}</p>
                        </div>
                      )}

                      {/* Grade form */}
                      {canGrade && !isGrading && (
                        <button
                          onClick={() => { setGradingSubmission(sub); setGradeInput(""); setFeedbackInput("") }}
                          className="w-full py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors">
                          {t("gradeSubmission")}
                        </button>
                      )}

                      {isGrading && (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <label className="text-xs text-gray-500 block mb-1">{t("maxGradeLabel")}: {sub.maxGrade}</label>
                              <input
                                type="number"
                                min={0}
                                max={sub.maxGrade}
                                value={gradeInput}
                                onChange={(e) => setGradeInput(e.target.value)}
                                placeholder="0–20"
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                              />
                            </div>
                          </div>
                          <textarea
                            value={feedbackInput}
                            onChange={(e) => setFeedbackInput(e.target.value)}
                            placeholder={t("feedbackLabel") + "..."}
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => setGradingSubmission(null)}
                              className="flex-1 py-2 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              {t("cancel")}
                            </button>
                            <button
                              onClick={handleSaveGrade}
                              disabled={gradeSaving || !gradeInput}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition-colors">
                              {gradeSaving ? (
                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                              {t("saveGradeBtn")}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Assignment Modal */}
      <AnimatePresence>
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{t("createAssignment")}</h3>
                <button onClick={() => setShowCreate(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {createDone ? (
                <div className="flex flex-col items-center py-10 px-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{t("assignmentCreated")}</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">{t("colName")}</label>
                    <input
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Ex: Exercícios capítulo 3"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">{t("assignmentDescription")}</label>
                    <textarea
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Instruções detalhadas..."
                      rows={3}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1.5">{t("colSubject")}</label>
                      <select
                        value={newAssignment.subjectId}
                        onChange={(e) => setNewAssignment((p) => ({ ...p, subjectId: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white">
                        {mockSubjects.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1.5">{t("maxGradeLabel")}</label>
                      <input
                        type="number"
                        value={newAssignment.maxGrade}
                        onChange={(e) => setNewAssignment((p) => ({ ...p, maxGrade: e.target.value }))}
                        min={1}
                        max={100}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">{t("submissionTypeLabel")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["text", "document", "image", "any"] as SubmissionType[]).map((st) => {
                        const labels: Record<SubmissionType, string> = {
                          text: t("submissionTypeText"),
                          document: t("submissionTypeDocument"),
                          image: t("submissionTypeImage"),
                          any: t("submissionTypeAny"),
                        }
                        return (
                          <button key={st} type="button"
                            onClick={() => setNewAssignment((p) => ({ ...p, submissionType: st }))}
                            className={cn("py-2 text-xs font-medium rounded-lg border transition-colors",
                              newAssignment.submissionType === st
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 text-gray-500 hover:bg-gray-50"
                            )}>
                            {labels[st]}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">{t("assignmentDueDate")}</label>
                    <input
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment((p) => ({ ...p, dueDate: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setShowCreate(false)}
                      className="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      {t("cancel")}
                    </button>
                    <button
                      onClick={handleCreate}
                      disabled={creating || !newAssignment.title.trim() || !newAssignment.dueDate}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-60 transition-colors">
                      {creating ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      {creating ? t("saving") : t("createAssignment")}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
