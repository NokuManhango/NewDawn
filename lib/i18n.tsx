"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { translations, type Language, type TranslationKey } from "./translations"

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("pt")

  function t(key: TranslationKey): string {
    return (translations[lang] as Record<string, string>)[key] ?? (translations.pt as Record<string, string>)[key] ?? key
  }

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be inside I18nProvider")
  return ctx
}
