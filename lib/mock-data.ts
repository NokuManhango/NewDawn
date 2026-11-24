import type {
  School, User, Student, Class, Subject, Result,
  Attendance, TimetableEntry, Book, Announcement, Payment, DashboardStats,
  Assignment, Submission
} from "@/types"

export const mockSchools: School[] = [
  { id: "s1", name: "Escola Primária 25 de Junho", province: "Maputo Cidade", district: "KaMpfumo", address: "Av. 25 de Junho, nº 45", phone: "+258 21 123456", email: "ep25junho@edu.mz", createdAt: "2020-01-15" },
  { id: "s2", name: "Escola Secundária Josina Machel", province: "Maputo Cidade", district: "KaMavota", address: "Rua de Moçambique, nº 12", phone: "+258 21 456789", email: "esjosina@edu.mz", createdAt: "2018-03-10" },
  { id: "s3", name: "Escola Primária Samora Machel", province: "Nampula", district: "Nampula Cidade", address: "Av. Eduardo Mondlane, nº 88", phone: "+258 26 234567", email: "epsamora@edu.mz", createdAt: "2019-07-20" },
  { id: "s4", name: "Escola Secundária Beira", province: "Sofala", district: "Beira", address: "Rua Major Serpa Pinto, nº 33", phone: "+258 23 345678", email: "esbeira@edu.mz", createdAt: "2017-09-05" },
]

export const mockUsers: User[] = [
  { id: "u1", name: "Admin Geral", email: "admin@edumoz.mz", role: "SUPER_ADMIN", createdAt: "2020-01-01" },
  { id: "u2", name: "João Muiambo", email: "director@edumoz.mz", role: "DIRECTOR", schoolId: "s1", createdAt: "2020-02-01" },
  { id: "u3", name: "Maria Cossa", email: "maria.cossa@edumoz.mz", role: "PROFESSOR", schoolId: "s1", phone: "+258 84 111222", createdAt: "2020-03-01" },
  { id: "u4", name: "António Mondlane", email: "antonio@edumoz.mz", role: "PROFESSOR", schoolId: "s1", phone: "+258 84 333444", createdAt: "2020-03-15" },
  { id: "u5", name: "Beatriz Nhantumbo", email: "beatriz@edumoz.mz", role: "PROFESSOR", schoolId: "s1", phone: "+258 85 555666", createdAt: "2020-04-01" },
  { id: "u6", name: "Carlos Sitoe", email: "carlos.pai@gmail.com", role: "ENCARREGADO", phone: "+258 84 777888", createdAt: "2021-01-10" },
  { id: "u7", name: "Diana Macuacua", email: "diana.mae@gmail.com", role: "ENCARREGADO", phone: "+258 85 999000", createdAt: "2021-01-15" },
]

export const mockClasses: Class[] = [
  { id: "c1", name: "8ª Classe A", grade: 8, section: "A", year: 2025, schoolId: "s1", studentCount: 38 },
  { id: "c2", name: "8ª Classe B", grade: 8, section: "B", year: 2025, schoolId: "s1", studentCount: 35 },
  { id: "c3", name: "9ª Classe A", grade: 9, section: "A", year: 2025, schoolId: "s1", studentCount: 40 },
  { id: "c4", name: "10ª Classe A", grade: 10, section: "A", year: 2025, schoolId: "s1", studentCount: 32 },
  { id: "c5", name: "11ª Classe A", grade: 11, section: "A", year: 2025, schoolId: "s1", studentCount: 28 },
  { id: "c6", name: "12ª Classe A", grade: 12, section: "A", year: 2025, schoolId: "s1", studentCount: 25 },
]

export const mockSubjects: Subject[] = [
  { id: "sub1", name: "Português", code: "PORT", grade: 8 },
  { id: "sub2", name: "Matemática", code: "MAT", grade: 8 },
  { id: "sub3", name: "Física", code: "FIS", grade: 8 },
  { id: "sub4", name: "Química", code: "QUIM", grade: 8 },
  { id: "sub5", name: "Biologia", code: "BIO", grade: 8 },
  { id: "sub6", name: "História", code: "HIST", grade: 8 },
  { id: "sub7", name: "Geografia", code: "GEO", grade: 8 },
  { id: "sub8", name: "Inglês", code: "ING", grade: 8 },
  { id: "sub9", name: "Educação Física", code: "EF", grade: 8 },
  { id: "sub10", name: "Educação Visual", code: "EV", grade: 8 },
]

export const mockStudents: Student[] = [
  { id: "st1", studentNumber: "EP25J/2025/0001", firstName: "Anita", lastName: "Sitoe", fullName: "Anita Sitoe", dateOfBirth: "2012-03-15", gender: "FEMININO", guardianPhone: "+258 84 777888", status: "ACTIVE", enrollmentDate: "2025-01-15", schoolId: "s1", classId: "c1", className: "8ª Classe A", guardianId: "u6", guardianName: "Carlos Sitoe", address: "Bairro de Laulane, Maputo" },
  { id: "st2", studentNumber: "EP25J/2025/0002", firstName: "Bruno", lastName: "Macuacua", fullName: "Bruno Macuacua", dateOfBirth: "2011-07-22", gender: "MASCULINO", guardianPhone: "+258 85 999000", status: "ACTIVE", enrollmentDate: "2025-01-15", schoolId: "s1", classId: "c1", className: "8ª Classe A", guardianId: "u7", guardianName: "Diana Macuacua", address: "Bairro do Aeroporto, Maputo" },
  { id: "st3", studentNumber: "EP25J/2025/0003", firstName: "Cláudia", lastName: "Nuvunga", fullName: "Cláudia Nuvunga", dateOfBirth: "2012-11-08", gender: "FEMININO", guardianPhone: "+258 84 123456", status: "ACTIVE", enrollmentDate: "2025-01-15", schoolId: "s1", classId: "c1", className: "8ª Classe A", address: "Bairro do Infulene, Maputo" },
  { id: "st4", studentNumber: "EP25J/2025/0004", firstName: "David", lastName: "Chirindza", fullName: "David Chirindza", dateOfBirth: "2012-05-30", gender: "MASCULINO", guardianPhone: "+258 85 654321", status: "ACTIVE", enrollmentDate: "2025-01-15", schoolId: "s1", classId: "c1", className: "8ª Classe A", address: "Bairro do Jardim, Maputo" },
  { id: "st5", studentNumber: "EP25J/2025/0005", firstName: "Elsa", lastName: "Mulungu", fullName: "Elsa Mulungu", dateOfBirth: "2012-09-12", gender: "FEMININO", guardianPhone: "+258 84 111222", status: "ACTIVE", enrollmentDate: "2025-01-15", schoolId: "s1", classId: "c2", className: "8ª Classe B", address: "Bairro da Polana, Maputo" },
  { id: "st6", studentNumber: "EP25J/2025/0006", firstName: "Feliciano", lastName: "Manhiça", fullName: "Feliciano Manhiça", dateOfBirth: "2011-12-01", gender: "MASCULINO", guardianPhone: "+258 85 333444", status: "ACTIVE", enrollmentDate: "2025-01-15", schoolId: "s1", classId: "c2", className: "8ª Classe B", address: "Bairro Central, Maputo" },
  { id: "st7", studentNumber: "EP25J/2025/0007", firstName: "Graça", lastName: "Tembe", fullName: "Graça Tembe", dateOfBirth: "2010-04-18", gender: "FEMININO", guardianPhone: "+258 84 555666", status: "ACTIVE", enrollmentDate: "2024-01-15", schoolId: "s1", classId: "c3", className: "9ª Classe A", address: "Bairro do Maxaquene, Maputo" },
  { id: "st8", studentNumber: "EP25J/2025/0008", firstName: "Humberto", lastName: "Bila", fullName: "Humberto Bila", dateOfBirth: "2009-08-25", gender: "MASCULINO", guardianPhone: "+258 85 777888", status: "ACTIVE", enrollmentDate: "2023-01-15", schoolId: "s1", classId: "c4", className: "10ª Classe A", address: "Bairro do Sommerschield, Maputo" },
  { id: "st9", studentNumber: "EP25J/2025/0009", firstName: "Inês", lastName: "Guambe", fullName: "Inês Guambe", dateOfBirth: "2008-02-14", gender: "FEMININO", guardianPhone: "+258 84 999000", status: "ACTIVE", enrollmentDate: "2022-01-15", schoolId: "s1", classId: "c5", className: "11ª Classe A", address: "Bairro do Alto Maé, Maputo" },
  { id: "st10", studentNumber: "EP25J/2025/0010", firstName: "José", lastName: "Mabunda", fullName: "José Mabunda", dateOfBirth: "2007-06-30", gender: "MASCULINO", guardianPhone: "+258 85 111222", status: "ACTIVE", enrollmentDate: "2021-01-15", schoolId: "s1", classId: "c6", className: "12ª Classe A", address: "Bairro de Mafalala, Maputo" },
  { id: "st11", studentNumber: "EP25J/2024/0011", firstName: "Lurdes", lastName: "Cossa", fullName: "Lurdes Cossa", dateOfBirth: "2007-10-05", gender: "FEMININO", guardianPhone: "+258 84 444555", status: "TRANSFERRED", enrollmentDate: "2024-01-15", schoolId: "s1", classId: "c6", className: "12ª Classe A", address: "Bairro do Xipamanine, Maputo" },
]

export const mockResults: Result[] = [
  { id: "r1", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub1", subjectName: "Português", trimester: 1, year: 2025, nota: 15, status: "APROVADO" },
  { id: "r2", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub2", subjectName: "Matemática", trimester: 1, year: 2025, nota: 17, status: "APROVADO" },
  { id: "r3", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub3", subjectName: "Física", trimester: 1, year: 2025, nota: 13, status: "APROVADO" },
  { id: "r4", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub4", subjectName: "Química", trimester: 1, year: 2025, nota: 12, status: "APROVADO" },
  { id: "r5", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub5", subjectName: "Biologia", trimester: 1, year: 2025, nota: 16, status: "APROVADO" },
  { id: "r6", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub6", subjectName: "História", trimester: 1, year: 2025, nota: 14, status: "APROVADO" },
  { id: "r7", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub7", subjectName: "Geografia", trimester: 1, year: 2025, nota: 11, status: "APROVADO" },
  { id: "r8", studentId: "st1", studentName: "Anita Sitoe", classId: "c1", subjectId: "sub8", subjectName: "Inglês", trimester: 1, year: 2025, nota: 18, status: "APROVADO" },
  { id: "r9", studentId: "st2", studentName: "Bruno Macuacua", classId: "c1", subjectId: "sub1", subjectName: "Português", trimester: 1, year: 2025, nota: 9, status: "REPROVADO" },
  { id: "r10", studentId: "st2", studentName: "Bruno Macuacua", classId: "c1", subjectId: "sub2", subjectName: "Matemática", trimester: 1, year: 2025, nota: 8, status: "REPROVADO" },
  { id: "r11", studentId: "st2", studentName: "Bruno Macuacua", classId: "c1", subjectId: "sub3", subjectName: "Física", trimester: 1, year: 2025, nota: 11, status: "APROVADO" },
  { id: "r12", studentId: "st3", studentName: "Cláudia Nuvunga", classId: "c1", subjectId: "sub1", subjectName: "Português", trimester: 1, year: 2025, nota: 16, status: "APROVADO" },
  { id: "r13", studentId: "st3", studentName: "Cláudia Nuvunga", classId: "c1", subjectId: "sub2", subjectName: "Matemática", trimester: 1, year: 2025, nota: 14, status: "APROVADO" },
  { id: "r14", studentId: "st4", studentName: "David Chirindza", classId: "c1", subjectId: "sub1", subjectName: "Português", trimester: 1, year: 2025, nota: 12, status: "APROVADO" },
  { id: "r15", studentId: "st4", studentName: "David Chirindza", classId: "c1", subjectId: "sub2", subjectName: "Matemática", trimester: 1, year: 2025, nota: 10, status: "APROVADO" },
]

export const mockAttendance: Attendance[] = [
  { id: "a1", studentId: "st1", studentName: "Anita Sitoe", date: "2025-05-08", status: "PRESENTE" },
  { id: "a2", studentId: "st2", studentName: "Bruno Macuacua", date: "2025-05-08", status: "AUSENTE", notes: "Doença" },
  { id: "a3", studentId: "st3", studentName: "Cláudia Nuvunga", date: "2025-05-08", status: "PRESENTE" },
  { id: "a4", studentId: "st4", studentName: "David Chirindza", date: "2025-05-08", status: "JUSTIFICADO", notes: "Consulta médica" },
  { id: "a5", studentId: "st1", studentName: "Anita Sitoe", date: "2025-05-07", status: "PRESENTE" },
  { id: "a6", studentId: "st2", studentName: "Bruno Macuacua", date: "2025-05-07", status: "PRESENTE" },
  { id: "a7", studentId: "st3", studentName: "Cláudia Nuvunga", date: "2025-05-07", status: "AUSENTE" },
  { id: "a8", studentId: "st4", studentName: "David Chirindza", date: "2025-05-07", status: "PRESENTE" },
]

export const mockTimetable: TimetableEntry[] = [
  { id: "t1", classId: "c1", subjectId: "sub1", subjectName: "Português", subjectCode: "PORT", teacherName: "Maria Cossa", dayOfWeek: 0, startTime: "07:00", endTime: "08:00", room: "Sala 1" },
  { id: "t2", classId: "c1", subjectId: "sub2", subjectName: "Matemática", subjectCode: "MAT", teacherName: "António Mondlane", dayOfWeek: 0, startTime: "08:00", endTime: "09:00", room: "Sala 1" },
  { id: "t3", classId: "c1", subjectId: "sub3", subjectName: "Física", subjectCode: "FIS", teacherName: "Beatriz Nhantumbo", dayOfWeek: 0, startTime: "09:30", endTime: "10:30", room: "Lab. Ciências" },
  { id: "t4", classId: "c1", subjectId: "sub4", subjectName: "Química", subjectCode: "QUIM", teacherName: "Beatriz Nhantumbo", dayOfWeek: 0, startTime: "10:30", endTime: "11:30", room: "Lab. Ciências" },
  { id: "t5", classId: "c1", subjectId: "sub1", subjectName: "Português", subjectCode: "PORT", teacherName: "Maria Cossa", dayOfWeek: 1, startTime: "07:00", endTime: "08:00", room: "Sala 1" },
  { id: "t6", classId: "c1", subjectId: "sub5", subjectName: "Biologia", subjectCode: "BIO", teacherName: "Beatriz Nhantumbo", dayOfWeek: 1, startTime: "08:00", endTime: "09:00", room: "Lab. Ciências" },
  { id: "t7", classId: "c1", subjectId: "sub6", subjectName: "História", subjectCode: "HIST", teacherName: "Maria Cossa", dayOfWeek: 1, startTime: "09:30", endTime: "10:30", room: "Sala 1" },
  { id: "t8", classId: "c1", subjectId: "sub8", subjectName: "Inglês", subjectCode: "ING", teacherName: "António Mondlane", dayOfWeek: 2, startTime: "07:00", endTime: "08:00", room: "Sala 2" },
  { id: "t9", classId: "c1", subjectId: "sub2", subjectName: "Matemática", subjectCode: "MAT", teacherName: "António Mondlane", dayOfWeek: 2, startTime: "08:00", endTime: "09:00", room: "Sala 1" },
  { id: "t10", classId: "c1", subjectId: "sub7", subjectName: "Geografia", subjectCode: "GEO", teacherName: "Maria Cossa", dayOfWeek: 3, startTime: "07:00", endTime: "08:00", room: "Sala 1" },
  { id: "t11", classId: "c1", subjectId: "sub3", subjectName: "Física", subjectCode: "FIS", teacherName: "Beatriz Nhantumbo", dayOfWeek: 3, startTime: "08:00", endTime: "09:00", room: "Lab. Ciências" },
  { id: "t12", classId: "c1", subjectId: "sub9", subjectName: "Educação Física", subjectCode: "EF", teacherName: "António Mondlane", dayOfWeek: 4, startTime: "07:00", endTime: "08:00", room: "Campo" },
  { id: "t13", classId: "c1", subjectId: "sub10", subjectName: "Educação Visual", subjectCode: "EV", teacherName: "Maria Cossa", dayOfWeek: 4, startTime: "08:00", endTime: "09:00", room: "Sala 1" },
]

export const mockBooks: Book[] = [
  { id: "b1", title: "Português 8ª Classe", author: "MINED Moçambique", grade: 8, subjectId: "sub1", subjectName: "Português", language: "pt", description: "Manual de Língua Portuguesa para 8ª Classe, aprovado pelo Ministério da Educação.", downloads: 1240, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b2", title: "Matemática 8ª Classe", author: "MINED Moçambique", grade: 8, subjectId: "sub2", subjectName: "Matemática", language: "pt", description: "Manual de Matemática para 8ª Classe.", downloads: 980, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b3", title: "Física 8ª e 9ª Classe", author: "MINED Moçambique", grade: 8, subjectId: "sub3", subjectName: "Física", language: "pt", description: "Manual de Física para o Ensino Secundário.", downloads: 756, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b4", title: "Biologia 8ª Classe", author: "MINED Moçambique", grade: 8, subjectId: "sub5", subjectName: "Biologia", language: "pt", description: "Exploração da vida e dos sistemas biológicos.", downloads: 632, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b5", title: "História de Moçambique", author: "Aurélio Rocha", grade: 9, subjectId: "sub6", subjectName: "História", language: "pt", description: "História de Moçambique desde a pré-história até à actualidade.", downloads: 890, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b6", title: "Geografia 8ª Classe", author: "MINED Moçambique", grade: 8, subjectId: "sub7", subjectName: "Geografia", language: "pt", description: "Estudo do meio geográfico nacional e mundial.", downloads: 445, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b7", title: "English for Mozambique Grade 8", author: "MINED Moçambique", grade: 8, subjectId: "sub8", subjectName: "Inglês", language: "en", description: "English textbook aligned with the Mozambican curriculum.", downloads: 1100, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b8", title: "Química 10ª Classe", author: "MINED Moçambique", grade: 10, subjectId: "sub4", subjectName: "Química", language: "pt", description: "Fundamentos de Química para o Ensino Pré-Universitário.", downloads: 320, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b9", title: "Matemática 12ª Classe", author: "MINED Moçambique", grade: 12, subjectId: "sub2", subjectName: "Matemática", language: "pt", description: "Matemática avançada para o Ensino Pré-Universitário.", downloads: 560, coverUrl: "", createdAt: "2023-01-01" },
  { id: "b10", title: "Guia do Professor - Ciências", author: "MINED Moçambique", grade: undefined, subjectId: "sub3", subjectName: "Física", language: "pt", description: "Guia metodológico para professores de Ciências Naturais.", downloads: 210, coverUrl: "", createdAt: "2023-01-01" },
]

export const mockAnnouncements: Announcement[] = [
  { id: "an1", title: "Início do 2º Trimestre", content: "Informamos que o 2º Trimestre do ano lectivo de 2025 tem início na próxima segunda-feira, dia 12 de Maio. Todos os alunos devem comparecer devidamente uniformizados.", type: "ACADEMICO", sendSMS: true, createdAt: "2025-05-08" },
  { id: "an2", title: "Reunião de Pais e Encarregados", content: "Haverá reunião de pais e encarregados no dia 15 de Maio às 14h00 no anfiteatro da escola. A presença é obrigatória.", type: "EVENTO", sendSMS: true, createdAt: "2025-05-07" },
  { id: "an3", title: "Proibição de Telemóveis", content: "Relembramos que o uso de telemóveis durante as aulas é estrictamente proibido. Os aparelhos serão confiscados.", type: "GERAL", sendSMS: false, createdAt: "2025-05-06" },
  { id: "an4", title: "URGENTE: Suspensão de Aulas", content: "Devido às condições climatéricas adversas, as aulas de amanhã ficam suspensas. Os alunos serão informados via SMS.", type: "URGENTE", sendSMS: true, createdAt: "2025-05-05" },
]

export const mockPayments: Payment[] = [
  { id: "p1", studentId: "st1", studentName: "Anita Sitoe", amount: 150, type: "MENSALIDADE", method: "MPESA", reference: "MP20250501001", status: "PAID", dueDate: "2025-05-05", paidAt: "2025-05-03", createdAt: "2025-04-30" },
  { id: "p2", studentId: "st2", studentName: "Bruno Macuacua", amount: 150, type: "MENSALIDADE", method: "CASH", status: "OVERDUE", dueDate: "2025-05-05", createdAt: "2025-04-30" },
  { id: "p3", studentId: "st3", studentName: "Cláudia Nuvunga", amount: 150, type: "MENSALIDADE", method: "MCEL_MONEY", reference: "MC20250502001", status: "PAID", dueDate: "2025-05-05", paidAt: "2025-05-02", createdAt: "2025-04-30" },
  { id: "p4", studentId: "st4", studentName: "David Chirindza", amount: 150, type: "MENSALIDADE", method: "MPESA", status: "PENDING", dueDate: "2025-05-05", createdAt: "2025-04-30" },
  { id: "p5", studentId: "st1", studentName: "Anita Sitoe", amount: 500, type: "MATRICULA", method: "BANCO", reference: "BCI20250115001", status: "PAID", dueDate: "2025-01-20", paidAt: "2025-01-15", createdAt: "2025-01-10" },
  { id: "p6", studentId: "st5", studentName: "Elsa Mulungu", amount: 150, type: "MENSALIDADE", method: "MPESA", reference: "MP20250501002", status: "PAID", dueDate: "2025-05-05", paidAt: "2025-05-01", createdAt: "2025-04-30" },
  { id: "p7", studentId: "st6", studentName: "Feliciano Manhiça", amount: 150, type: "MENSALIDADE", method: "CASH", status: "OVERDUE", dueDate: "2025-05-05", createdAt: "2025-04-30" },
  { id: "p8", studentId: "st7", studentName: "Graça Tembe", amount: 150, type: "MENSALIDADE", method: "MPESA", reference: "MP20250503001", status: "PAID", dueDate: "2025-05-05", paidAt: "2025-05-03", createdAt: "2025-04-30" },
]

export const mockDashboardStats: DashboardStats = {
  totalStudents: 198,
  totalTeachers: 18,
  totalClasses: 6,
  presentToday: 182,
  absentToday: 16,
  pendingPayments: 24,
  totalRevenue: 28500,
  averageGrade: 13.4,
}

export const attendanceChartData = [
  { day: "Seg", presentes: 185, ausentes: 13 },
  { day: "Ter", presentes: 179, ausentes: 19 },
  { day: "Qua", presentes: 190, ausentes: 8 },
  { day: "Qui", presentes: 183, ausentes: 15 },
  { day: "Sex", presentes: 182, ausentes: 16 },
]

export const gradeDistribution = [
  { range: "0-9", count: 18, label: "Reprovado" },
  { range: "10-13", count: 54, label: "Suficiente" },
  { range: "14-16", count: 82, label: "Bom" },
  { range: "17-20", count: 44, label: "Muito Bom" },
]

export const revenueChartData = [
  { month: "Jan", receita: 22000 },
  { month: "Fev", receita: 24500 },
  { month: "Mar", receita: 23800 },
  { month: "Abr", receita: 26200 },
  { month: "Mai", receita: 28500 },
]

export const mockAssignments: Assignment[] = [
  { id: "as1", title: "Composição sobre a Independência de Moçambique", description: "Escreva uma composição de 500 a 800 palavras sobre os acontecimentos que levaram à Independência de Moçambique em 1975, destacando os principais intervenientes e o impacto na sociedade actual.", subjectId: "sub1", subjectName: "Português", classId: "c1", className: "8ª Classe A", teacherId: "u3", teacherName: "Maria Cossa", dueDate: "2025-04-25", maxGrade: 20, createdAt: "2025-04-15", submissionType: "text" },
  { id: "as2", title: "Exercícios pág. 45–48 — Equações do 1º Grau", description: "Resolver todos os exercícios das páginas 45 a 48 do manual de Matemática. Apresentar o desenvolvimento passo a passo de cada equação.", subjectId: "sub2", subjectName: "Matemática", classId: "c1", className: "8ª Classe A", teacherId: "u4", teacherName: "António Mondlane", dueDate: "2025-04-30", maxGrade: 20, createdAt: "2025-04-20", submissionType: "document" },
  { id: "as3", title: "Relatório de Laboratório — Leis de Newton", description: "Elabore um relatório detalhado da experiência realizada em laboratório sobre as Leis de Newton. Inclua: objectivo, material utilizado, procedimento, resultados e conclusões.", subjectId: "sub3", subjectName: "Física", classId: "c1", className: "8ª Classe A", teacherId: "u5", teacherName: "Beatriz Nhantumbo", dueDate: "2025-05-10", maxGrade: 20, createdAt: "2025-04-28", submissionType: "document" },
  { id: "as4", title: "Ficha de Trabalho — Tabela Periódica", description: "Preencha a ficha de trabalho sobre os primeiros 20 elementos da Tabela Periódica. Identifique o número atómico, massa atómica e grupo de cada elemento.", subjectId: "sub4", subjectName: "Química", classId: "c1", className: "8ª Classe A", teacherId: "u5", teacherName: "Beatriz Nhantumbo", dueDate: "2025-05-20", maxGrade: 20, createdAt: "2025-05-05", submissionType: "image" },
  { id: "as5", title: "Diagrama da Célula — Estrutura e Função", description: "Elabore um diagrama detalhado da célula animal e da célula vegetal, identificando todos os organelos e descrevendo a função de cada um.", subjectId: "sub5", subjectName: "Biologia", classId: "c1", className: "8ª Classe A", teacherId: "u5", teacherName: "Beatriz Nhantumbo", dueDate: "2025-05-13", maxGrade: 20, createdAt: "2025-05-06", submissionType: "image" },
]

export const mockSubmissions: Submission[] = [
  // Anita (st1)
  { id: "sm1", assignmentId: "as1", assignmentTitle: "Composição sobre a Independência de Moçambique", subjectName: "Português", studentId: "st1", studentName: "Anita Sitoe", status: "GRADED", submittedAt: "2025-04-24", content: "A Independência de Moçambique foi proclamada no dia 25 de Junho de 1975, após anos de luta armada liderada pela FRELIMO. O processo de descolonização foi marcado pelo Acordo de Lusaka em 1974, que estabeleceu o cessar-fogo e o governo de transição. Samora Machel tornou-se o primeiro presidente da República Popular de Moçambique...", grade: 16, feedback: "Excelente composição! Boa estrutura e argumentação sólida. Ponto de melhoria: aprofundar o impacto económico do período colonial.", dueDate: "2025-04-25", maxGrade: 20 },
  { id: "sm2", assignmentId: "as2", assignmentTitle: "Exercícios pág. 45–48 — Equações do 1º Grau", subjectName: "Matemática", studentId: "st1", studentName: "Anita Sitoe", status: "OVERDUE", dueDate: "2025-04-30", maxGrade: 20 },
  { id: "sm3", assignmentId: "as3", assignmentTitle: "Relatório de Laboratório — Leis de Newton", subjectName: "Física", studentId: "st1", studentName: "Anita Sitoe", status: "SUBMITTED", submittedAt: "2025-05-09", content: "Relatório de Laboratório — Leis de Newton\n\nObjectivo: Demonstrar experimentalmente a 2ª Lei de Newton (F = ma).\nMaterial: carrinho de atrito, plano inclinado, cronómetro, pesos calibrados.\nResultados: Verificámos que ao dobrar a força aplicada, a aceleração duplicou proporcionalmente.\nConclusão: Os resultados confirmam a 2ª Lei de Newton.", dueDate: "2025-05-10", maxGrade: 20 },
  { id: "sm4", assignmentId: "as4", assignmentTitle: "Ficha de Trabalho — Tabela Periódica", subjectName: "Química", studentId: "st1", studentName: "Anita Sitoe", status: "PENDING", dueDate: "2025-05-20", maxGrade: 20 },
  { id: "sm5", assignmentId: "as5", assignmentTitle: "Diagrama da Célula — Estrutura e Função", subjectName: "Biologia", studentId: "st1", studentName: "Anita Sitoe", status: "PENDING", dueDate: "2025-05-13", maxGrade: 20 },
  // Bruno (st2)
  { id: "sm6", assignmentId: "as1", assignmentTitle: "Composição sobre a Independência de Moçambique", subjectName: "Português", studentId: "st2", studentName: "Bruno Macuacua", status: "GRADED", submittedAt: "2025-04-25", content: "Moçambique tornou-se independente em 1975 após a luta da FRELIMO contra o colonialismo português...", grade: 11, feedback: "Trabalho razoável. Faltou mais desenvolvimento histórico e contextualização dos factos.", dueDate: "2025-04-25", maxGrade: 20 },
  { id: "sm7", assignmentId: "as2", assignmentTitle: "Exercícios pág. 45–48 — Equações do 1º Grau", subjectName: "Matemática", studentId: "st2", studentName: "Bruno Macuacua", status: "SUBMITTED", submittedAt: "2025-04-29", content: "Ex. 1: 2x + 5 = 11 → 2x = 6 → x = 3\nEx. 2: 3x - 7 = 14 → 3x = 21 → x = 7\nEx. 3: x/2 + 4 = 9 → x/2 = 5 → x = 10", dueDate: "2025-04-30", maxGrade: 20 },
  { id: "sm8", assignmentId: "as3", assignmentTitle: "Relatório de Laboratório — Leis de Newton", subjectName: "Física", studentId: "st2", studentName: "Bruno Macuacua", status: "SUBMITTED", submittedAt: "2025-05-08", content: "Experiência sobre as Leis de Newton realizada no dia 7 de Maio...", dueDate: "2025-05-10", maxGrade: 20 },
  { id: "sm9", assignmentId: "as4", assignmentTitle: "Ficha de Trabalho — Tabela Periódica", subjectName: "Química", studentId: "st2", studentName: "Bruno Macuacua", status: "PENDING", dueDate: "2025-05-20", maxGrade: 20 },
  { id: "sm10", assignmentId: "as5", assignmentTitle: "Diagrama da Célula — Estrutura e Função", subjectName: "Biologia", studentId: "st2", studentName: "Bruno Macuacua", status: "OVERDUE", dueDate: "2025-05-13", maxGrade: 20 },
  // Cláudia (st3)
  { id: "sm11", assignmentId: "as1", assignmentTitle: "Composição sobre a Independência de Moçambique", subjectName: "Português", studentId: "st3", studentName: "Cláudia Nuvunga", status: "SUBMITTED", submittedAt: "2025-04-23", content: "A independência de Moçambique representa um marco histórico fundamental na África Austral...", dueDate: "2025-04-25", maxGrade: 20 },
  { id: "sm12", assignmentId: "as2", assignmentTitle: "Exercícios pág. 45–48 — Equações do 1º Grau", subjectName: "Matemática", studentId: "st3", studentName: "Cláudia Nuvunga", status: "GRADED", submittedAt: "2025-04-28", content: "Resolução completa de todos os exercícios...", grade: 14, feedback: "Muito bom trabalho. Resolução clara e correcta. Continua assim!", dueDate: "2025-04-30", maxGrade: 20 },
  { id: "sm13", assignmentId: "as3", assignmentTitle: "Relatório de Laboratório — Leis de Newton", subjectName: "Física", studentId: "st3", studentName: "Cláudia Nuvunga", status: "PENDING", dueDate: "2025-05-10", maxGrade: 20 },
  { id: "sm14", assignmentId: "as4", assignmentTitle: "Ficha de Trabalho — Tabela Periódica", subjectName: "Química", studentId: "st3", studentName: "Cláudia Nuvunga", status: "PENDING", dueDate: "2025-05-20", maxGrade: 20 },
  { id: "sm15", assignmentId: "as5", assignmentTitle: "Diagrama da Célula — Estrutura e Função", subjectName: "Biologia", studentId: "st3", studentName: "Cláudia Nuvunga", status: "PENDING", dueDate: "2025-05-13", maxGrade: 20 },
  // David (st4)
  { id: "sm16", assignmentId: "as1", assignmentTitle: "Composição sobre a Independência de Moçambique", subjectName: "Português", studentId: "st4", studentName: "David Chirindza", status: "SUBMITTED", submittedAt: "2025-04-25", content: "A independência foi conquistada graças à resistência do povo moçambicano...", dueDate: "2025-04-25", maxGrade: 20 },
  { id: "sm17", assignmentId: "as2", assignmentTitle: "Exercícios pág. 45–48 — Equações do 1º Grau", subjectName: "Matemática", studentId: "st4", studentName: "David Chirindza", status: "OVERDUE", dueDate: "2025-04-30", maxGrade: 20 },
  { id: "sm18", assignmentId: "as3", assignmentTitle: "Relatório de Laboratório — Leis de Newton", subjectName: "Física", studentId: "st4", studentName: "David Chirindza", status: "OVERDUE", dueDate: "2025-05-10", maxGrade: 20 },
  { id: "sm19", assignmentId: "as4", assignmentTitle: "Ficha de Trabalho — Tabela Periódica", subjectName: "Química", studentId: "st4", studentName: "David Chirindza", status: "PENDING", dueDate: "2025-05-20", maxGrade: 20 },
  { id: "sm20", assignmentId: "as5", assignmentTitle: "Diagrama da Célula — Estrutura e Função", subjectName: "Biologia", studentId: "st4", studentName: "David Chirindza", status: "PENDING", dueDate: "2025-05-13", maxGrade: 20 },
]
