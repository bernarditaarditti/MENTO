"use client"

import Link from "next/link"
import Image from "next/image"
import { BackButton } from "@/components/back-button"

export default function ProfilePage() {
  // Obtener el mes y año actual para "Se unió en"
  const currentDate = new Date()
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ]
  const month = months[currentDate.getMonth()]
  const year = currentDate.getFullYear()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with Back Button */}
      <div className="px-4 pt-8 pb-2 relative">
        <div className="absolute left-10 top-10">
          <BackButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-24 pt-12 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
          {/* Placeholder for user avatar */}
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center gap-1 mb-8">
          <p className="text-lg font-medium" style={{ fontFamily: "var(--font-poppins)", color: "#0096C7" }}>
            Nombre de usuario
          </p>
          <p className="text-base" style={{ fontFamily: "var(--font-poppins)", color: "#0096C7" }}>
            Se unió en {month} de {year}
          </p>
        </div>

        {/* Completed Islands */}
        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 text-center" style={{ fontFamily: "var(--font-poppins)", color: "#0096C7" }}>
            Islas completadas:
          </h2>
          <div className="flex gap-4 justify-center">
            {/* Three placeholder circles for completed islands */}
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0096C7] px-1 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-center gap-12">
          <Link href="/islands" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-islas.png" alt="Islas" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Islas</span>
          </Link>

          <Link href="/mento" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/cerebro.png" alt="Mento" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Mento</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-perfil.png" alt="Perfil" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Perfil</span>
          </Link>

          <Link href="/settings" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-ajustes.png" alt="Ajustes" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Ajustes</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

