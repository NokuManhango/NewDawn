"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Download, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import type { Book } from "@/types"

interface BookGridProps { books: Book[] }

const GRADE_COLORS = [
  "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700",
  "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-red-100 text-red-700",
]
const BOOK_COVERS = [
  "from-emerald-400 to-emerald-600", "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600", "from-amber-400 to-amber-600",
  "from-red-400 to-red-600", "from-teal-400 to-teal-600",
  "from-indigo-400 to-indigo-600", "from-pink-400 to-pink-600",
  "from-cyan-400 to-cyan-600", "from-orange-400 to-orange-600",
]

export function BookGrid({ books }: BookGridProps) {
  const { t } = useI18n()
  const [search, setSearch] = useState("")
  const [filterGrade, setFilterGrade] = useState("ALL")

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      (b.subjectName?.toLowerCase().includes(search.toLowerCase()) ?? false)
    const matchGrade = filterGrade === "ALL" || b.grade?.toString() === filterGrade
    return matchSearch && matchGrade
  })

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchBookPlaceholder")}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
          />
        </div>
        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
        >
          <option value="ALL">{t("allClassesFilter")}</option>
          {[8, 9, 10, 11, 12].map((g) => <option key={g} value={g}>{g}{t("classFilter")}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer"
          >
            <div className={cn("h-36 bg-gradient-to-br flex items-center justify-center", BOOK_COVERS[i % BOOK_COVERS.length])}>
              <BookOpen className="w-12 h-12 text-white/80" />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">{book.title}</p>
              <p className="text-xs text-gray-400 mt-1">{book.author}</p>
              <div className="flex items-center justify-between mt-2">
                {book.grade && (
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", GRADE_COLORS[i % GRADE_COLORS.length])}>
                    {book.grade}{t("classFilter")}
                  </span>
                )}
                <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                  <Download className="w-3 h-3" />
                  {book.downloads.toLocaleString()}
                </span>
              </div>
              <button className="w-full mt-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                {t("downloadBtn")}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{t("noBooksFound")}</p>
        </div>
      )}
    </div>
  )
}
