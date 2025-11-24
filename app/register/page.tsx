"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ForwardArrow } from "@/components/forward-arrow"
import Link from "next/link"
import { BackButton } from "@/components/back-button"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    if (email.trim() && password.trim()) {
      // TODO: Add registration logic here
      // After registration, continue to onboarding
      router.push("/onboarding/welcome")
    }
  }

  const isValid = email.trim() !== "" && password.trim() !== ""

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-background relative">
      <div className="w-full max-w-md mx-auto flex flex-col gap-8 justify-center flex-1">
        {/* Back button */}
        <div className="absolute top-10 left-10">
          <BackButton />
        </div>

        {/* Title */}
        <h1 className="text-[#0096C7] text-3xl font-bold text-center">Registrarse</h1>

        {/* Form fields */}
        <div className="flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-4/5 px-6 py-4 bg-[#E2E2E2] rounded-xl text-[#FF6171] placeholder:text-[#FF6171]/60 text-base focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-4/5 px-6 py-4 bg-[#E2E2E2] rounded-xl text-[#FF6171] placeholder:text-[#FF6171]/60 text-base focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end pr-8">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Continuar"
          >
            <ForwardArrow strokeColor="#00C49A" />
          </button>
        </div>

        {/* Login link */}
        <div className="text-center pt-8">
          <span className="text-[#0096C7]">¿Ya tienes cuenta? </span>
          <Link href="/login" className="text-[#0096C7] underline font-semibold">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
