"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { StudentTable } from "@/components/students/student-table"
import { StudentForm } from "@/components/students/student-form"
import { StudentEditModal } from "@/components/students/student-edit-modal"
import { mockStudents } from "@/lib/mock-data"
import { useI18n } from "@/lib/i18n"
import type { Student } from "@/types"

export default function MatriculasPage() {
  const { t } = useI18n()
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [overrides, setOverrides] = useState<Record<string, Partial<Student>>>({})

  const students = mockStudents.map((s) => ({ ...s, ...overrides[s.id] }))

  function handleSave(id: string, updates: Partial<Student>) {
    setOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...updates } }))
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("enrollmentsTitle")} subtitle={t("enrollmentsSub")} />

      <div className="p-6">
        <StudentTable
          students={students}
          onAdd={() => setShowForm(true)}
          onView={(s) => setEditingStudent(s)}
          onEdit={(s) => setEditingStudent(s)}
        />
      </div>

      <AnimatePresence>
        {showForm && <StudentForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {editingStudent && (
          <StudentEditModal
            student={editingStudent}
            onClose={() => setEditingStudent(null)}
            onSave={(id, updates) => {
              handleSave(id, updates)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
