"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { mockSubmissions, mockAssignments } from "@/lib/mock-data"
import { formatDate, cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { TranslationKey } from "@/lib/translations"
import type { Submission, SubmissionStatus, SubmissionType } from "@/types"
import {
  Clock, CheckCircle2, AlertCircle, BookOpen,
  ChevronRight, X, Check, ClipboardList,
  FileText, Image as ImageIcon, Upload, File,
} from "lucide-react"

const STATUS_CONFIG: Record<SubmissionStatus, { bg: string; text: string; border: string; icon: React.ElementType; leftBorder: string }> = {
  PENDING:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  icon: Clock,         leftBorder: "border-l-amber-400" },
  SUBMITTED: { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   icon: CheckCircle2,  leftBorder: "border-l-blue-500" },
  LATE:      { bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200", icon: AlertCircle,   leftBorder: "border-l-orange-500" },
  GRADED:    { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",icon: Check,         leftBorder: "border-l-emerald-500" },
  OVERDUE:   { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",    icon: AlertCircle,   leftBorder: "border-l-red-500" },
}

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

type Tab = "all" | "pending" | "submitted" | "overdue" | "graded"

export default function AlunoTarefasPage() {
  const { t } = useI18n()
  const mySubmissions = mockSubmissions.filter((s) => s.studentId === "st1")

  const [activeTab, setActiveTab] = useState<Tab>("all")
  const [selected, setSelected] = useState<Submission | null>(null)
  const [responseText, setResponseText] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitDone, setSubmitDone] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState<string[]>([])
  const [fileError, setFileError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  function openModal(sub: Submission) {
    setSelected(sub)
    setResponseText("")
    setSelectedFile(null)
    setImagePreview(null)
    setSubmitDone(false)
    setFileError("")
  }

  function closeModal() {
    setSelected(null)
    setSubmitDone(false)
  }

  function getAssignment(id: string) {
    return mockAssignments.find((a) => a.id === id)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileError("")
    const assignment = selected ? getAssignment(selected.assignmentId) : null
    const type = assignment?.submissionType ?? "any"

    if (type === "image" || (type === "any" && file.type.startsWith("image/"))) {
      if (!file.type.startsWith("image/")) {
        setFileError("Seleccione uma imagem (JPG, PNG, WEBP).")
        return
      }
      if (file.size > 5 * 1024 * 1024) { setFileError("A imagem não pode exceder 5MB."); return }
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    } else {
      const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
      if (!allowed.includes(file.type) && type === "document") {
        setFileError("Seleccione um ficheiro PDF ou DOC.")
        return
      }
      if (file.size > 10 * 1024 * 1024) { setFileError("O ficheiro não pode exceder 10MB."); return }
    }
    setSelectedFile(file)
  }

  async function handleSubmit() {
    const assignment = selected ? getAssignment(selected.assignmentId) : null
    const type = assignment?.submissionType ?? "text"
    const hasContent = type === "text" ? responseText.trim().length > 0 : selectedFile !== null
    if (!selected || !hasContent) return

    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setJustSubmitted((prev) => [...prev, selected.id])
    setSubmitting(false)
    setSubmitDone(true)
    setTimeout(() => closeModal(), 2000)
  }

  function getEffectiveStatus(sub: Submission): SubmissionStatus {
    return justSubmitted.includes(sub.id) ? "SUBMITTED" : sub.status
  }

  function statusLabel(status: SubmissionStatus): string {
    const map: Record<SubmissionStatus, TranslationKey> = {
      PENDING:   "tabPending",
      SUBMITTED: "submittedLabel",
      LATE:      "lateLabel",
      GRADED:    "gradedLabel",
      OVERDUE:   "tabOverdue",
    }
    return t(map[status])
  }

  function getDueDateInfo(dueDate: string): { text: string; color: string } {
    const due = new Date(dueDate)
    const now = new Date("2025-05-10")
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / 86400000)
    if (diffDays < 0)   return { text: t("overdueLabel"),   color: "text-red-600" }
    if (diffDays === 0) return { text: "Hoje!",             color: "text-red-600" }
    if (diffDays === 1) return { text: t("dueTomorrow"),    color: "text-amber-600" }
    if (diffDays <= 4)  return { text: `${diffDays} ${t("daysLeft")}`, color: "text-amber-600" }
    return { text: `${diffDays} ${t("daysLeft")}`, color: "text-gray-400" }
  }

  const counts = {
    all:       mySubmissions.length,
    pending:   mySubmissions.filter((s) => getEffectiveStatus(s) === "PENDING").length,
    submitted: mySubmissions.filter((s) => ["SUBMITTED", "LATE"].includes(getEffectiveStatus(s))).length,
    overdue:   mySubmissions.filter((s) => getEffectiveStatus(s) === "OVERDUE").length,
    graded:    mySubmissions.filter((s) => getEffectiveStatus(s) === "GRADED").length,
  }

  const TABS: { key: Tab; labelKey: TranslationKey }[] = [
    { key: "all",       labelKey: "tabAll" },
    { key: "pending",   labelKey: "tabPending" },
    { key: "submitted", labelKey: "tabSubmitted" },
    { key: "overdue",   labelKey: "tabOverdue" },
    { key: "graded",    labelKey: "tabGraded" },
  ]

  const filtered = mySubmissions.filter((s) => {
    const st = getEffectiveStatus(s)
    if (activeTab === "all")       return true
    if (activeTab === "pending")   return st === "PENDING"
    if (activeTab === "submitted") return st === "SUBMITTED" || st === "LATE"
    if (activeTab === "overdue")   return st === "OVERDUE"
    if (activeTab === "graded")    return st === "GRADED"
    return true
  })

  function SubmissionTypeTag({ type }: { type: SubmissionType }) {
    const configs: Record<SubmissionType, { icon: React.ElementType; label: TranslationKey; color: string }> = {
      text:     { icon: FileText,   label: "submissionTypeText",     color: "bg-gray-100 text-gray-600" },
      document: { icon: File,       label: "submissionTypeDocument", color: "bg-blue-100 text-blue-600" },
      image:    { icon: ImageIcon,  label: "submissionTypeImage",    color: "bg-purple-100 text-purple-600" },
      any:      { icon: Upload,     label: "submissionTypeAny",      color: "bg-gray-100 text-gray-600" },
    }
    const cfg = configs[type]
    const Icon = cfg.icon
    return (
      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1", cfg.color)}>
        <Icon className="w-3 h-3" />
        {t(cfg.label)}
      </span>
    )
  }

  // Determine if we can submit
  const selectedAssignment = selected ? getAssignment(selected.assignmentId) : null
  const submissionType = selectedAssignment?.submissionType ?? "text"
  const canSubmit = submissionType === "text" ? responseText.trim().length > 0 : selectedFile !== null

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("myAssignmentsTitle")} subtitle={t("myAssignmentsSub")} />

      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: t("tabPending"),    val: counts.pending,   textColor: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100" },
            { label: t("submittedLabel"),val: counts.submitted, textColor: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100" },
            { label: t("tabOverdue"),    val: counts.overdue,   textColor: "text-red-600",     bg: "bg-red-50",     border: "border-red-100" },
            { label: t("gradedLabel"),   val: counts.graded,    textColor: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={cn("rounded-xl border p-4", s.bg, s.border)}>
              <p className={cn("text-2xl font-bold", s.textColor)}>{s.val}</p>
              <p className={cn("text-xs mt-0.5 font-medium", s.textColor)}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                activeTab === tab.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}>
              {t(tab.labelKey)}
              <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-semibold",
                activeTab === tab.key ? "bg-gray-100 text-gray-700" : "bg-gray-200 text-gray-500")}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-center py-12 text-sm text-gray-400">{t("noAssignments")}</p>
          )}
          {filtered.map((sub, i) => {
            const eff = getEffectiveStatus(sub)
            const cfg = STATUS_CONFIG[eff]
            const StatusIcon = cfg.icon
            const subjectColor = SUBJECT_COLORS[sub.subjectName] ?? "bg-gray-100 text-gray-600"
            const assignment = getAssignment(sub.assignmentId)
            const dueInfo = getDueDateInfo(sub.dueDate)

            return (
              <motion.div key={sub.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                onClick={() => openModal(sub)}
                className={cn("bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:shadow-md transition-all border-l-4", cfg.leftBorder)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", subjectColor)}>
                        {sub.subjectName}
                      </span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium border flex items-center gap-1", cfg.bg, cfg.text, cfg.border)}>
                        <StatusIcon className="w-3 h-3" />
                        {statusLabel(eff)}
                      </span>
                      {assignment && <SubmissionTypeTag type={assignment.submissionType} />}
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-snug">{sub.assignmentTitle}</h3>
                    {assignment && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">{assignment.description}</p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-1" />
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-400">{t("dueOn")}</span>
                    <span className="text-gray-600 font-medium">{formatDate(sub.dueDate)}</span>
                  </div>
                  <div className="text-xs font-medium">
                    {eff === "GRADED" && sub.grade !== undefined && (
                      <span className="text-emerald-600 font-bold">{sub.grade} / {sub.maxGrade}</span>
                    )}
                    {(eff === "PENDING" || eff === "OVERDUE") && (
                      <span className={dueInfo.color}>{dueInfo.text}</span>
                    )}
                    {(eff === "SUBMITTED" || eff === "LATE") && (
                      <span className="text-blue-500">{t("awaitingGrade")}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Detail / Submit Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

              {/* Sticky header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                    SUBJECT_COLORS[selected.subjectName] ?? "bg-gray-100 text-gray-600")}>
                    {selected.subjectName}
                  </span>
                  {selectedAssignment && <SubmissionTypeTag type={selectedAssignment.submissionType} />}
                </div>
                <button onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Title + description */}
                <div>
                  <h2 className="text-base font-bold text-gray-900 leading-snug">{selected.assignmentTitle}</h2>
                  {selectedAssignment && (
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{selectedAssignment.description}</p>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs bg-gray-50 rounded-lg p-3">
                  <div className="text-gray-500">
                    <span className="font-medium text-gray-700">{t("dueOn")}</span>{" "}
                    {formatDate(selected.dueDate)}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium text-gray-700">{t("maxGradeLabel")}:</span>{" "}
                    {selected.maxGrade}
                  </div>
                </div>

                {/* GRADED state */}
                {getEffectiveStatus(selected) === "GRADED" && (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-800">{t("yourGrade")}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-emerald-600">{selected.grade}</span>
                        <span className="text-sm text-emerald-400">{t("outOf")} {selected.maxGrade}</span>
                      </div>
                    </div>
                    {selected.feedback && (
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <p className="text-xs font-semibold text-blue-800 mb-1.5">{t("feedbackLabel")}</p>
                        <p className="text-sm text-blue-700 leading-relaxed">{selected.feedback}</p>
                      </div>
                    )}
                    {selected.content && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1.5">{t("yourSubmission")}</p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed whitespace-pre-line line-clamp-5">{selected.content}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* SUBMITTED state */}
                {getEffectiveStatus(selected) === "SUBMITTED" && !justSubmitted.includes(selected.id) && !submitDone && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-blue-800">{t("submittedLabel")}</p>
                        {selected.submittedAt && (
                          <p className="text-xs text-blue-600">{t("submittedOn")} {formatDate(selected.submittedAt)}</p>
                        )}
                        <p className="text-xs text-blue-500 mt-0.5">{t("awaitingGrade")}</p>
                      </div>
                    </div>
                    {selected.fileName && (
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                        <File className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{selected.fileName}</span>
                      </div>
                    )}
                    {selected.content && !selected.fileName && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1.5">{t("yourSubmission")}</p>
                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed whitespace-pre-line line-clamp-6">{selected.content}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* PENDING / OVERDUE — show submit form */}
                {(getEffectiveStatus(selected) === "PENDING" || getEffectiveStatus(selected) === "OVERDUE") && !submitDone && (
                  <div className="space-y-3">
                    {getEffectiveStatus(selected) === "OVERDUE" && (
                      <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <p className="text-xs text-red-700">{t("lateLabel")} — {t("overdueLabel")}</p>
                      </div>
                    )}

                    {/* Text submission */}
                    {submissionType === "text" && (
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-2">{t("yourResponse")}</label>
                        <textarea
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          placeholder={t("responseHint")}
                          rows={5}
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                        />
                      </div>
                    )}

                    {/* Document submission */}
                    {submissionType === "document" && (
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-2">{t("uploadFile")}</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        {selectedFile ? (
                          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                            <File className="w-8 h-8 text-blue-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-blue-900 truncate">{selectedFile.name}</p>
                              <p className="text-xs text-blue-500">{(selectedFile.size / 1024).toFixed(0)} KB</p>
                            </div>
                            <button onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = "" }}
                              className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 hover:bg-blue-300 transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm font-medium text-gray-700">{t("clickToUpload")}</p>
                            <p className="text-xs text-gray-400">{t("acceptedFormats")}</p>
                          </button>
                        )}
                        {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
                      </div>
                    )}

                    {/* Image submission */}
                    {submissionType === "image" && (
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-2">{t("uploadImage")}</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                        {imagePreview ? (
                          <div className="relative">
                            <img src={imagePreview} alt="Preview" className="w-full rounded-xl border border-gray-200 max-h-48 object-contain bg-gray-50" />
                            <button onClick={() => { setSelectedFile(null); setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = "" }}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                            <p className="text-xs text-gray-400 mt-1.5 text-center">{selectedFile?.name}</p>
                          </div>
                        ) : (
                          <button onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                            <p className="text-sm font-medium text-gray-700">{t("clickToUpload")}</p>
                            <p className="text-xs text-gray-400">{t("acceptedImageFormats")}</p>
                          </button>
                        )}
                        {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
                      </div>
                    )}

                    {/* Any-type: show both options */}
                    {submissionType === "any" && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-700 block mb-2">{t("yourResponse")}</label>
                          <textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder={t("responseHint")}
                            rows={3}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                          />
                        </div>
                        <div className="text-xs text-gray-400 text-center">— ou —</div>
                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
                        {selectedFile ? (
                          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                            <File className="w-6 h-6 text-blue-600 shrink-0" />
                            <span className="text-sm text-blue-900 truncate flex-1">{selectedFile.name}</span>
                            <button onClick={() => { setSelectedFile(null); setImagePreview(null) }}>
                              <X className="w-4 h-4 text-blue-400" />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-sm text-gray-500">
                            <Upload className="w-4 h-4" />
                            {t("uploadFile")}
                          </button>
                        )}
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !canSubmit}
                      className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                      {submitting ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t("submitting")}</>
                      ) : (
                        <><ClipboardList className="w-4 h-4" />{t("submitBtn")}</>
                      )}
                    </button>
                  </div>
                )}

                {/* Success state */}
                {submitDone && (
                  <div className="flex flex-col items-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-gray-900">{t("submittedLabel")}!</p>
                    <p className="text-sm text-gray-400 mt-1">{t("awaitingGrade")}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
