import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "MZN") {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("pt-MZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...opts,
  }).format(new Date(date))
}

export function formatGrade(nota: number): { label: string; color: string } {
  if (nota >= 14) return { label: "Bom", color: "text-emerald-600" }
  if (nota >= 10) return { label: "Suficiente", color: "text-amber-600" }
  return { label: "Reprovado", color: "text-red-600" }
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function generateStudentNumber(schoolCode: string, year: number, seq: number) {
  return `${schoolCode}/${year}/${String(seq).padStart(4, "0")}`
}

export const PROVINCES = [
  "Cabo Delgado",
  "Gaza",
  "Inhambane",
  "Manica",
  "Maputo Cidade",
  "Maputo Província",
  "Nampula",
  "Niassa",
  "Sofala",
  "Tete",
  "Zambézia",
]

export const GRADES = Array.from({ length: 12 }, (_, i) => i + 1)

export const DAY_NAMES = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]

export const SUBJECTS_BY_GRADE: Record<number, string[]> = {
  1: ["Língua Portuguesa", "Matemática", "Estudo do Meio"],
  2: ["Língua Portuguesa", "Matemática", "Estudo do Meio"],
  3: ["Língua Portuguesa", "Matemática", "Estudo do Meio"],
  4: ["Língua Portuguesa", "Matemática", "Ciências Naturais", "História"],
  5: ["Língua Portuguesa", "Matemática", "Ciências Naturais", "História", "Geografia"],
  6: ["Língua Portuguesa", "Matemática", "Ciências Naturais", "História", "Geografia", "Inglês"],
  7: ["Português", "Matemática", "Física", "Química", "Biologia", "História", "Geografia", "Inglês"],
  8: ["Português", "Matemática", "Física", "Química", "Biologia", "História", "Geografia", "Inglês"],
  9: ["Português", "Matemática", "Física", "Química", "Biologia", "História", "Geografia", "Inglês"],
  10: ["Português", "Matemática", "Física", "Química", "Biologia", "História", "Inglês"],
  11: ["Português", "Matemática", "Física", "Química", "Biologia", "Inglês"],
  12: ["Português", "Matemática", "Física", "Química", "Biologia", "Inglês"],
}

export function getRoleLabel(role: string) {
  const map: Record<string, string> = {
    SUPER_ADMIN: "Super Admin",
    DIRECTOR: "Director",
    PROFESSOR: "Professor",
    ALUNO: "Aluno",
    ENCARREGADO: "Encarregado",
  }
  return map[role] ?? role
}

export function getStatusLabel(status: string) {
  const map: Record<string, string> = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    TRANSFERRED: "Transferido",
    GRADUATED: "Formado",
    PRESENTE: "Presente",
    AUSENTE: "Ausente",
    JUSTIFICADO: "Justificado",
    PENDING: "Pendente",
    PAID: "Pago",
    OVERDUE: "Em Atraso",
    CANCELLED: "Cancelado",
  }
  return map[status] ?? status
}

export function getPaymentTypeLabel(type: string) {
  const map: Record<string, string> = {
    MATRICULA: "Matrícula",
    MENSALIDADE: "Mensalidade",
    EXAME: "Exame",
    MULTA: "Multa",
  }
  return map[type] ?? type
}

export function getPaymentMethodLabel(method: string) {
  const map: Record<string, string> = {
    MPESA: "M-Pesa",
    MCEL_MONEY: "mCel Money",
    CASH: "Numerário",
    BANCO: "Transferência Bancária",
  }
  return map[method] ?? method
}
