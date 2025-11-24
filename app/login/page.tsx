"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BackButton } from "@/components/back-button"
import { ForwardArrow } from "@/components/forward-arrow"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (email.trim() && password.trim()) {
      setError("")
      setIsLoading(true)
      
      try {
        // TODO: Replace with actual authentication API call
        // Example: const response = await fetch('/api/auth/login', { ... })
        // For now, simulate authentication
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          const data = await response.json().catch(() => ({}))
          if (response.status === 401 || data.error?.includes('contraseña') || data.error?.includes('password')) {
            setError("Contraseña incorrecta")
          } else {
            setError(data.error || "Error al iniciar sesión")
          }
          setIsLoading(false)
          return
        }

        // Success - redirect to home
        router.push("/home")
      } catch (err) {
        // If API doesn't exist yet, simulate error for wrong password
        // Remove this catch block once real API is implemented
        setError("Contraseña incorrecta")
        setIsLoading(false)
      }
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
        <h1 className="text-[#0096C7] text-3xl font-bold text-center">Iniciar sesión</h1>

        {/* Form fields */}
        <div className="flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            className="w-4/5 px-6 py-4 bg-[#E2E2E2] rounded-xl text-[#FF6171] placeholder:text-[#FF6171]/60 text-base focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            className="w-4/5 px-6 py-4 bg-[#E2E2E2] rounded-xl text-[#FF6171] placeholder:text-[#FF6171]/60 text-base focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {error && (
            <div className="w-4/5 px-4 py-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm text-center">
              {error}
            </div>
          )}
        </div>

        {/* Forgot password link */}
        <Link href="/forgot-password" className="text-[#0096C7] text-center underline">
          Olvidé mi contraseña
        </Link>

        {/* Submit button */}
        <div className="flex justify-end pr-8">
          <button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Continuar"
          >
            <ForwardArrow strokeColor="#00C49A" />
          </button>
        </div>

        {/* Register link */}
        <div className="text-center pt-8">
          <span className="text-[#0096C7]">¿Nuevo? </span>
          <Link href="/register" className="text-[#0096C7] underline font-semibold">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}
