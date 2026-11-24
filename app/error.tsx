"use client"

import { useEffect } from "react"
import { GraduationCap, RefreshCw } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
        <GraduationCap className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Algo correu mal</h2>
      <p className="text-sm text-gray-500 mb-8 max-w-xs">
        Ocorreu um erro inesperado. Por favor tente novamente.
      </p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Tentar novamente
      </button>
    </div>
  )
}
