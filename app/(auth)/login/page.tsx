"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Eye, EyeOff, AlertCircle, Globe } from "lucide-react"
import { useAuth, ROLE_ROUTES } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"

const DEMO_ROLES = ["Super Admin", "Director", "Professor", "Encarregado", "Aluno"]
const DEMO_EMAILS = [
  "admin@edumoz.mz",
  "director@edumoz.mz",
  "professor@edumoz.mz",
  "encarregado@edumoz.mz",
  "aluno@edumoz.mz",
]
const ROLE_ROUTES_MAP: Record<string, string> = {
  "admin@edumoz.mz": "/admin",
  "director@edumoz.mz": "/director",
  "professor@edumoz.mz": "/professor",
  "encarregado@edumoz.mz": "/encarregado",
  "aluno@edumoz.mz": "/aluno",
}

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const { t, lang, setLang } = useI18n()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("demo123")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const ok = await login(email, password)
    if (ok) {
      router.push(ROLE_ROUTES_MAP[email] ?? "/")
    } else {
      setError(t("invalidCredentials"))
    }
  }

  async function quickLogin(demoEmail: string) {
    setEmail(demoEmail)
    const ok = await login(demoEmail, "demo123")
    if (ok) router.push(ROLE_ROUTES_MAP[demoEmail] ?? "/")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 flex-col items-center justify-center relative overflow-hidden p-12">
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white" style={{ width: (i + 1) * 80, height: (i + 1) * 80, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">{t("appName")}</h1>
          <p className="text-gray-400 text-lg mb-8">{t("appSubtitle")}</p>
          <p className="text-gray-500 text-sm max-w-xs">{t("tagline")}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 text-left">
            {[
              { label: t("statSchoolsCount"), value: "4" },
              { label: t("statStudentsCount"), value: "2.400+" },
              { label: t("statTeachersCount"), value: "120+" },
              { label: t("statProvincesCount"), value: "4" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-2xl font-bold text-emerald-400">{value}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          {/* Mobile logo + lang toggle */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{t("appName")}</p>
                <p className="text-xs text-gray-500">{t("appSubtitle")}</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600 ml-auto"
            >
              <Globe className="w-3.5 h-3.5" />
              <AnimatePresence mode="wait">
                <motion.span key={lang} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}>
                  {t("language")}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("welcomeBack")}</h2>
          <p className="text-gray-500 text-sm mb-8">{t("signInSubtitle")}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">{t("email")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="o.seu@email.mz"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">{t("password")}</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}
            <button type="submit" disabled={isLoading}
              className="w-full py-3 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
              {isLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("signingIn")}</> : t("signIn")}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <p className="text-xs text-gray-400 text-center mb-3 font-medium uppercase tracking-wide">{t("demoAccess")}</p>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_EMAILS.map((demoEmail, i) => (
                <button key={demoEmail} onClick={() => quickLogin(demoEmail)} disabled={isLoading}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group disabled:opacity-50">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">{DEMO_ROLES[i]}</span>
                  <span className="text-xs text-gray-400 font-mono group-hover:text-emerald-500">{demoEmail}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
