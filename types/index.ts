export type Role = "SUPER_ADMIN" | "DIRECTOR" | "PROFESSOR" | "ALUNO" | "ENCARREGADO"
export type Gender = "MASCULINO" | "FEMININO"
export type StudentStatus = "ACTIVE" | "INACTIVE" | "TRANSFERRED" | "GRADUATED"
export type AttendanceStatus = "PRESENTE" | "AUSENTE" | "JUSTIFICADO"
export type AnnouncementType = "GERAL" | "URGENTE" | "EVENTO" | "ACADEMICO"
export type PaymentType = "MATRICULA" | "MENSALIDADE" | "EXAME" | "MULTA"
export type PaymentMethod = "MPESA" | "MCEL_MONEY" | "CASH" | "BANCO"
export type PaymentStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELLED"

export interface School {
  id: string
  name: string
  province: string
  district: string
  address: string
  phone?: string
  email?: string
  logoUrl?: string
  directorId?: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: Role
  schoolId?: string
  school?: School
  createdAt: string
}

export interface Student {
  id: string
  studentNumber: string
  firstName: string
  lastName: string
  fullName: string
  dateOfBirth: string
  gender: Gender
  phone?: string
  guardianPhone?: string
  address?: string
  photoUrl?: string
  status: StudentStatus
  enrollmentDate: string
  schoolId: string
  classId?: string
  className?: string
  guardianId?: string
  guardianName?: string
}

export interface Class {
  id: string
  name: string
  grade: number
  section: string
  year: number
  schoolId: string
  studentCount?: number
}

export interface Subject {
  id: string
  name: string
  code: string
  grade?: number
}

export interface Result {
  id: string
  studentId: string
  studentName?: string
  classId: string
  subjectId: string
  subjectName?: string
  trimester: number
  year: number
  nota: number
  status?: "APROVADO" | "REPROVADO"
}

export interface Attendance {
  id: string
  studentId: string
  studentName?: string
  date: string
  status: AttendanceStatus
  notes?: string
}

export interface TimetableEntry {
  id: string
  classId: string
  subjectId: string
  subjectName: string
  subjectCode: string
  teacherName: string
  dayOfWeek: number
  startTime: string
  endTime: string
  room?: string
}

export interface Book {
  id: string
  title: string
  author: string
  subjectId?: string
  subjectName?: string
  grade?: number
  fileUrl?: string
  coverUrl?: string
  language: string
  description?: string
  downloads: number
  createdAt: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: AnnouncementType
  schoolId?: string
  sendSMS: boolean
  createdAt: string
}

export interface Payment {
  id: string
  studentId: string
  studentName?: string
  amount: number
  type: PaymentType
  method: PaymentMethod
  reference?: string
  status: PaymentStatus
  dueDate?: string
  paidAt?: string
  notes?: string
  createdAt: string
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  presentToday: number
  absentToday: number
  pendingPayments: number
  totalRevenue: number
  averageGrade: number
}

export type SubmissionStatus = "PENDING" | "SUBMITTED" | "LATE" | "GRADED" | "OVERDUE"
export type SubmissionType = "text" | "document" | "image" | "any"

export interface Assignment {
  id: string
  title: string
  description: string
  subjectId: string
  subjectName: string
  classId: string
  className: string
  teacherId: string
  teacherName: string
  dueDate: string
  maxGrade: number
  createdAt: string
  submissionType: SubmissionType
}

export interface Submission {
  id: string
  assignmentId: string
  assignmentTitle: string
  subjectName: string
  studentId: string
  studentName: string
  status: SubmissionStatus
  submittedAt?: string
  content?: string
  fileName?: string
  grade?: number
  feedback?: string
  dueDate: string
  maxGrade: number
}
