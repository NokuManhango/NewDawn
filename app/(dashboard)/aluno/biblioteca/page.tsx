"use client"

import { Header } from "@/components/layout/header"
import { BookGrid } from "@/components/library/book-grid"
import { mockBooks } from "@/lib/mock-data"
import { Library, TrendingDown } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function BibliotecaPage() {
  const { t } = useI18n()
  const totalDownloads = mockBooks.reduce((s, b) => s + b.downloads, 0)

  return (
    <div className="flex flex-col min-h-full">
      <Header title={t("libraryTitle")} subtitle={t("librarySub")} />

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <Library className="w-5 h-5 text-emerald-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{mockBooks.length}</p>
            <p className="text-xs text-gray-400">{t("booksAvailable")}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <TrendingDown className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{totalDownloads.toLocaleString()}</p>
            <p className="text-xs text-gray-400">{t("downloadsLabel")}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <Library className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">PT / EN</p>
            <p className="text-xs text-gray-400">{t("languagesLabel")}</p>
          </div>
        </div>

        <BookGrid books={mockBooks} />
      </div>
    </div>
  )
}
