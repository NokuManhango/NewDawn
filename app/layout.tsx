import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { I18nProvider } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "EduMoz — Sistema de Gestão Escolar",
  description: "Plataforma digital de gestão escolar para Moçambique",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 font-sans">
        <I18nProvider>
          <AuthProvider>{children}</AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
