"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { X, Camera, Check, Upload } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { Student, StudentStatus } from "@/types"

interface StudentEditModalProps {
  student: Student
  onClose: () => void
  onSave: (id: string, updates: Partial<Student>) => void
}

const STATUS_OPTIONS: StudentStatus[] = ["ACTIVE", "INACTIVE", "TRANSFERRED", "GRADUATED"]

export function StudentEditModal({ student, onClose, onSave }: StudentEditModalProps) {
  const { t } = useI18n()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [firstName, setFirstName] = useState(student.firstName)
  const [lastName, setLastName] = useState(student.lastName)
  const [status, setStatus] = useState<StudentStatus>(student.status)
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(student.photoUrl)
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [photoError, setPhotoError] = useState("")

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoError("")
    if (!file.type.startsWith("image/")) {
      setPhotoError("Por favor seleccione uma imagem (JPG, PNG ou WEBP).")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("A imagem não pode exceder 2MB.")
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSave() {
    if (!firstName.trim() || !lastName.trim()) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    onSave(student.id, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      status,
      photoUrl: photoPreview,
    })
    setSaving(false)
    setDone(true)
    setTimeout(() => onClose(), 1400)
  }

  function statusLabel(s: StudentStatus): string {
    return { ACTIVE: t("active"), INACTIVE: t("inactive"), TRANSFERRED: t("transferred"), GRADUATED: t("graduated") }[s]
  }

  const STATUS_COLORS: Record<StudentStatus, string> = {
    ACTIVE:      "border-emerald-500 bg-emerald-50 text-emerald-700",
    INACTIVE:    "border-gray-400 bg-gray-50 text-gray-600",
    TRANSFERRED: "border-amber-500 bg-amber-50 text-amber-700",
    GRADUATED:   "border-blue-500 bg-blue-50 text-blue-700",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">{t("editStudent")}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center py-12 px-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="font-semibold text-gray-900">{t("studentEdited")}</p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Photo upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center">
                  {photoPreview ? (
                    <img src={photoPreview} alt={student.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-emerald-700 text-xl font-bold">{getInitials(student.fullName)}</span>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white hover:bg-emerald-700 transition-colors shadow-md"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <Upload className="w-3.5 h-3.5" />
                {t("changePhoto")}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileSelect}
              />

              {photoError && <p className="text-xs text-red-500 text-center">{photoError}</p>}
              <p className="text-xs text-gray-400">{t("photoUploadHint")}</p>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1.5">{t("firstName")}</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1.5">{t("lastName")}</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Student number — read only */}
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">{t("colNumber")}</label>
              <p className="text-sm font-mono text-gray-400 px-3 py-2.5 bg-gray-50 rounded-lg">{student.studentNumber}</p>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-2">{t("colStatus")}</label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={cn(
                      "py-2 text-xs font-medium rounded-lg border transition-colors",
                      status === s ? STATUS_COLORS[s] : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    {statusLabel(s)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {!done && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
              {t("cancel")}
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !firstName.trim() || !lastName.trim()}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition-colors"
            >
              {saving ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t("saving")}</>
              ) : (
                <><Check className="w-4 h-4" />{t("save")}</>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
