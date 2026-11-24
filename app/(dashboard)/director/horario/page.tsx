"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Check, Trash2, Edit2, Clock } from "lucide-react"
import { Header } from "@/components/layout/header"
import { useI18n } from "@/lib/i18n"
import { mockClasses, mockSubjects, mockUsers, mockTimetable } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { TimetableEntry } from "@/types"
import type { TranslationKey } from "@/lib/translations"

const TIME_SLOTS = [
  { start: "07:00", end: "08:00" },
  { start: "08:00", end: "09:00" },
  { start: "09:30", end: "10:30" },
  { start: "10:30", end: "11:30" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
]

const SUBJECT_COLORS: Record<string, string> = {
  PORT: "bg-blue-50 border-blue-300 text-blue-900",
  MAT: "bg-emerald-50 border-emerald-300 text-emerald-900",
  FIS: "bg-purple-50 border-purple-300 text-purple-900",
  QUIM: "bg-amber-50 border-amber-300 text-amber-900",
  BIO: "bg-teal-50 border-teal-300 text-teal-900",
  HIST: "bg-orange-50 border-orange-300 text-orange-900",
  GEO: "bg-cyan-50 border-cyan-300 text-cyan-900",
  ING: "bg-indigo-50 border-indigo-300 text-indigo-900",
  EF: "bg-red-50 border-red-300 text-red-900",
  EV: "bg-pink-50 border-pink-300 text-pink-900",
}

const DEFAULT_COLORS = "bg-gray-50 border-gray-200 text-gray-800"

const DAY_KEYS: TranslationKey[] = ["monday", "tuesday", "wednesday", "thursday", "friday"]

interface EntryModalProps {
  slotStart: string
  slotEnd: string
  dayOfWeek: number
  classId: string
  existing?: TimetableEntry
  onSave: (entry: Omit<TimetableEntry, "id">) => void
  onDelete?: () => void
  onClose: () => void
  t: (key: TranslationKey) => string
}

function EntryModal({ slotStart, slotEnd, dayOfWeek, classId, existing, onSave, onDelete, onClose, t }: EntryModalProps) {
  const professors = mockUsers.filter((u) => u.role === "PROFESSOR")
  const [subjectId, setSubjectId] = useState(existing?.subjectId ?? "")
  const [teacherId, setTeacherId] = useState("")
  const [room, setRoom] = useState(existing?.room ?? "")
  const [startTime, setStartTime] = useState(existing?.startTime ?? slotStart)
  const [endTime, setEndTime] = useState(existing?.endTime ?? slotEnd)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const selectedSubject = mockSubjects.find((s) => s.id === subjectId)

  async function handleSave() {
    if (!subjectId) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    const teacher = professors.find((p) => p.id === teacherId) ?? professors[0]
    onSave({
      classId,
      subjectId,
      subjectName: selectedSubject?.name ?? "",
      subjectCode: selectedSubject?.code ?? "",
      teacherName: teacher?.name ?? "",
      dayOfWeek,
      startTime,
      endTime,
      room: room || undefined,
    })
    setSaving(false)
    setSaved(true)
    setTimeout(onClose, 800)
  }

  async function handleDelete() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 500))
    onDelete?.()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-900">
              {existing ? t("editLesson") : t("addLesson")}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {t(DAY_KEYS[dayOfWeek])} • {startTime} – {endTime}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {saved ? (
            <div className="flex flex-col items-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                <Check className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="font-semibold text-gray-900">{t("lessonSaved")}</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">{t("selectSubject")} *</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                >
                  <option value="">— {t("selectSubject")} —</option>
                  {mockSubjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">{t("selectTeacher")}</label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                >
                  <option value="">— {t("selectTeacher")} —</option>
                  {professors.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("startTime")}</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">{t("endTime")}</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">{t("room")}</label>
                <input
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Sala 1, Lab. Ciências..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                />
              </div>
            </>
          )}
        </div>

        {!saved && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div>
              {existing && onDelete && (
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> {t("delete")}
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                {t("cancel")}
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !subjectId}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                {saving
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Check className="w-4 h-4" />}
                {t("save")}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function DirectorHorarioPage() {
  const { t } = useI18n()
  const [selectedClassId, setSelectedClassId] = useState(mockClasses[0].id)
  const [entries, setEntries] = useState<TimetableEntry[]>(mockTimetable)
  const [modal, setModal] = useState<{
    slotStart: string
    slotEnd: string
    dayOfWeek: number
    existing?: TimetableEntry
  } | null>(null)

  const dayNames = [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday")]

  const selectedClass = mockClasses.find((c) => c.id === selectedClassId)
  const classEntries = entries.filter((e) => e.classId === selectedClassId)

  function getEntry(dayOfWeek: number, startTime: string) {
    return classEntries.find((e) => e.dayOfWeek === dayOfWeek && e.startTime === startTime)
  }

  function handleSave(data: Omit<TimetableEntry, "id">) {
    if (modal?.existing) {
      setEntries((prev) =>
        prev.map((e) => e.id === modal.existing!.id ? { ...modal.existing!, ...data } : e)
      )
    } else {
      setEntries((prev) => [...prev, { ...data, id: `t${Date.now()}` }])
    }
  }

  function handleDelete(entryId: string) {
    setEntries((prev) => prev.filter((e) => e.id !== entryId))
  }

  const totalLessons = classEntries.length

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title={t("timetableTitle")}
        subtitle={t("timetableSub")}
      />

      <div className="p-6 space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-48">
            <label className="text-xs font-medium text-gray-500 mb-1 block uppercase tracking-wide">
              {t("selectClass")}
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white font-medium"
            >
              {mockClasses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{totalLessons}</p>
              <p className="text-xs text-gray-400">{t("lessonsPerWeek")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{selectedClass?.studentCount ?? 0}</p>
              <p className="text-xs text-gray-400">{t("studentPlural")}</p>
            </div>
          </div>

          <button
            onClick={() => setModal({ slotStart: "07:00", slotEnd: "08:00", dayOfWeek: 0 })}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors ml-auto"
          >
            <Plus className="w-4 h-4" /> {t("addLesson")}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {mockSubjects.slice(0, 6).map((s) => (
            <span
              key={s.id}
              className={cn("px-2.5 py-1 rounded-lg border text-xs font-medium", SUBJECT_COLORS[s.code] ?? DEFAULT_COLORS)}
            >
              {s.code} – {s.name}
            </span>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-28">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    {t("timeCol")}
                  </th>
                  {dayNames.map((day) => (
                    <th key={day} className="text-left px-3 py-3 text-xs font-semibold text-gray-600">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((slot, si) => (
                  <tr
                    key={slot.start}
                    className={cn("border-b border-gray-50 group", si % 2 === 1 ? "bg-gray-50/30" : "")}
                  >
                    <td className="px-4 py-2 text-xs text-gray-400 font-mono font-semibold whitespace-nowrap">
                      <span className="text-emerald-600">{slot.start}</span>
                      <span className="text-gray-300 mx-1">–</span>
                      {slot.end}
                    </td>

                    {dayNames.map((_, di) => {
                      const entry = getEntry(di, slot.start)
                      const colorClass = entry ? (SUBJECT_COLORS[entry.subjectCode] ?? DEFAULT_COLORS) : ""

                      return (
                        <td key={di} className="px-2 py-2">
                          {entry ? (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setModal({ slotStart: slot.start, slotEnd: slot.end, dayOfWeek: di, existing: entry })}
                              className={cn("w-full rounded-lg border px-3 py-2 text-left transition-all hover:shadow-sm group/cell", colorClass)}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div className="min-w-0">
                                  <p className="font-semibold text-xs truncate">{entry.subjectName}</p>
                                  <p className="text-xs opacity-60 truncate mt-0.5">{entry.teacherName.split(" ")[0]}</p>
                                  {entry.room && <p className="text-xs opacity-50 mt-0.5">{entry.room}</p>}
                                </div>
                                <Edit2 className="w-3 h-3 opacity-0 group-hover/cell:opacity-40 transition-opacity shrink-0 mt-0.5" />
                              </div>
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              onClick={() => setModal({ slotStart: slot.start, slotEnd: slot.end, dayOfWeek: di })}
                              className="w-full h-14 rounded-lg border-2 border-dashed border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all flex items-center justify-center group/empty"
                            >
                              <Plus className="w-4 h-4 text-gray-200 group-hover/empty:text-emerald-400 transition-colors" />
                            </motion.button>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-50 flex items-center gap-4 text-xs text-gray-400">
            <span>{t("breakTime")}: 09:00 – 09:30</span>
            <span className="text-gray-200">|</span>
            <span>{t("lunchTime")}: 11:30 – 12:00</span>
            <span className="ml-auto text-emerald-600 font-medium">
              {totalLessons} {t("lessonsPerWeek")}
            </span>
          </div>
        </div>

        {classEntries.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">
                {t("lessonsSummary")} — {selectedClass?.name}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("subject")}</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("teacher")}</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("day")}</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("timeCol")}</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">{t("room")}</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {classEntries.map((entry, i) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-gray-50/50"
                    >
                      <td className="px-5 py-3">
                        <span className={cn("px-2 py-0.5 rounded-md border text-xs font-medium", SUBJECT_COLORS[entry.subjectCode] ?? DEFAULT_COLORS)}>
                          {entry.subjectName}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600 text-sm">{entry.teacherName}</td>
                      <td className="px-5 py-3 text-gray-600 text-sm">{dayNames[entry.dayOfWeek]}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs font-mono">{entry.startTime} – {entry.endTime}</td>
                      <td className="px-5 py-3 text-gray-400 text-xs">{entry.room ?? "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={() => setModal({ slotStart: entry.startTime, slotEnd: entry.endTime, dayOfWeek: entry.dayOfWeek, existing: entry })}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <EntryModal
            key="modal"
            slotStart={modal.slotStart}
            slotEnd={modal.slotEnd}
            dayOfWeek={modal.dayOfWeek}
            classId={selectedClassId}
            existing={modal.existing}
            onSave={handleSave}
            onDelete={modal.existing ? () => handleDelete(modal.existing!.id) : undefined}
            onClose={() => setModal(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
