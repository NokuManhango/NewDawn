"use client"

import Link from "next/link"
import { GraduationCap, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6">
        <GraduationCap className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-6xl font-bold text-gray-200 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Página não encontrada</h2>
      <p className="text-sm text-gray-500 mb-8 max-w-xs">
        A página que procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao início
      </Link>
    </div>
  )
}
