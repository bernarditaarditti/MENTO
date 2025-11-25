"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function FamilyIslandPage() {
  const router = useRouter()
  
  // Función para obtener el nivel actual desde localStorage
  const getInitialLevel = (): number => {
    if (typeof window === "undefined") return 1
    
    const level1Completed = localStorage.getItem("family_level_1_completed")
    const level2Completed = localStorage.getItem("family_level_2_completed")
    const level3Completed = localStorage.getItem("family_level_3_completed")
    const level4Completed = localStorage.getItem("family_level_4_completed")
    
    if (level4Completed === "true") {
      return 5
    } else if (level3Completed === "true") {
      return 4
    } else if (level2Completed === "true") {
      return 3
    } else if (level1Completed === "true") {
      return 2
    }
    return 1
  }

  // Función para obtener niveles completados desde localStorage
  const getInitialCompletedLevels = (): Set<number> => {
    if (typeof window === "undefined") return new Set()
    
    const completed = new Set<number>()
    if (localStorage.getItem("family_level_1_completed") === "true") completed.add(1)
    if (localStorage.getItem("family_level_2_completed") === "true") completed.add(2)
    if (localStorage.getItem("family_level_3_completed") === "true") completed.add(3)
    if (localStorage.getItem("family_level_4_completed") === "true") completed.add(4)
    
    return completed
  }
  
  // Estado para saber si el componente está montado en el cliente
  const [isMounted, setIsMounted] = useState(false)
  // Estado inicial: nivel actual depende del progreso guardado
  const [currentLevel, setCurrentLevel] = useState<number>(1)
  // Estado para rastrear qué niveles están completados
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set())

  // Verificar el progreso de los niveles (para actualizar si cambia)
  useEffect(() => {
    if (typeof window === "undefined") return
    
    setIsMounted(true)
    
    const level1Completed = localStorage.getItem("family_level_1_completed")
    const level2Completed = localStorage.getItem("family_level_2_completed")
    const level3Completed = localStorage.getItem("family_level_3_completed")
    const level4Completed = localStorage.getItem("family_level_4_completed")
    
    // Actualizar niveles completados
    const completed = new Set<number>()
    if (level1Completed === "true") completed.add(1)
    if (level2Completed === "true") completed.add(2)
    if (level3Completed === "true") completed.add(3)
    if (level4Completed === "true") completed.add(4)
    setCompletedLevels(completed)
    
    // Actualizar nivel actual
    if (level4Completed === "true") {
      setCurrentLevel(5)
    } else if (level3Completed === "true") {
      setCurrentLevel(4)
    } else if (level2Completed === "true") {
      setCurrentLevel(3)
    } else if (level1Completed === "true") {
      setCurrentLevel(2)
    } else {
      setCurrentLevel(1)
    }
  }, [])

  const totalLevels = 5

  const getLevelColor = (level: number) => {
    // Completado: #FFC832 (naranja/amarillo oscuro)
    if (completedLevels.has(level)) {
      return "#FFC832"
    }
    // Nivel actual (disponible para jugar): #FFC832 (naranja/amarillo oscuro)
    if (level === currentLevel) {
      return "#FFC832"
    }
    // Bloqueado: #FFDF87 (amarillo claro)
    return "#FFDF87"
  }

  const getStarColor = (level: number) => {
    // Completado o nivel actual: estrella amarilla #FFBC03
    if (completedLevels.has(level) || level === currentLevel) {
      return "#FFBC03"
    }
    // Bloqueado: estrella gris #A6A6A5
    return "#A6A6A5"
  }

  // Posiciones zigzag para los niveles - formato zigzag más separado
  const levelPositions = [
    { top: "5%", left: "15%", transform: "translateX(0)" }, // Nivel 1 - top izquierda
    { top: "20%", right: "15%", transform: "translateX(0)" }, // Nivel 2 - below and derecha
    { top: "40%", left: "15%", transform: "translateX(0)" }, // Nivel 3 - below and izquierda
    { top: "53%", right: "15%", transform: "translateX(0)" }, // Nivel 4 - below and derecha
    { top: "72%", left: "15%", transform: "translateX(0)" }, // Nivel 5 - bottom izquierda
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Title with Back Button */}
      <div className="px-4 pt-8 pb-2 relative">
        <div className="absolute left-10 top-10">
          <button
            onClick={() => router.push("/home")}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Volver atrás"
          >
            <svg width="45" height="29" viewBox="0 0 45 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="6.12428" y1="14.0193" x2="41.6506" y2="14.0193" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
              <line x1="14.019" y1="2.3685" x2="2.3685" y2="14.019" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
              <line x1="2.3685" y1="14.019" x2="14.019" y2="25.6696" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <h1 className="text-[#FFC832] text-xl font-bold text-center mt-16">Familia</h1>
      </div>

      {/* Levels Path */}
      <div className="flex-1 relative px-4 pb-24 pt-2">
        {/* SVG Container for curved connections */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Curved paths - zigzag pattern with precise circle connections touching edges */}
          {/* Level 1 to Level 2 - desde borde inferior derecho del círculo 1 (izq) hasta borde superior izquierdo del círculo 2 (der) */}
          {/* Círculo 1: left 15%, top 5%, centro aprox (18, 8.5), radio 2.5, borde derecho aprox (20.5, 11) */}
          {/* Círculo 2: right 15%, top 20%, centro aprox (82, 23.5), radio 2.5, borde izquierdo aprox (79.5, 21) */}
          <path
            d="M 20.5 11 Q 50 10 79.5 21"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
          {/* Level 2 to Level 3 - desde borde inferior izquierdo del círculo 2 (der) hasta borde superior derecho del círculo 3 (izq) */}
          {/* Círculo 2: borde inferior izquierdo aprox (79.5, 26) */}
          {/* Círculo 3: borde superior derecho aprox (20.5, 39) */}
          <path
            d="M 79.5 26 Q 50 32 20.5 39"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
          {/* Level 3 to Level 4 - desde borde inferior derecho del círculo 3 (izq) hasta borde superior izquierdo del círculo 4 (der) */}
          {/* Círculo 3: borde inferior derecho aprox (20.5, 46) */}
          {/* Círculo 4: borde superior izquierdo aprox (79.5, 52) */}
          <path
            d="M 20.5 46 Q 50 42 79.5 52"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
          {/* Level 4 to Level 5 - desde borde inferior izquierdo del círculo 4 (der) hasta borde superior derecho del círculo 5 (izq) */}
          {/* Círculo 4: borde inferior izquierdo aprox (79.5, 59) */}
          {/* Círculo 5: borde superior derecho aprox (20.5, 71) */}
          <path
            d="M 79.5 59 Q 50 64 20.5 71"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
        </svg>

        {/* Levels */}
        {Array.from({ length: totalLevels }, (_, i) => {
          const level = i + 1
          const position = levelPositions[i]
          const starColor = getStarColor(level)

          return (
            <div
              key={level}
              className="absolute"
              style={{
                ...position,
                zIndex: 1,
              }}
            >
              {/* Star above levels */}
              {/* Mostrar estrella con el color correspondiente (gris para actual/bloqueado, amarillo para completados) */}
              {starColor && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={starColor}
                    className="drop-shadow-sm"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={starColor} strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Level Circle - más grande */}
              {level <= currentLevel ? (
                <Link href={`/islands/family/level-${level}`} className="block">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all hover:scale-110 active:scale-95"
                    style={{
                      backgroundColor: getLevelColor(level),
                      boxShadow: level === 1 
                        ? "0 4px 12px rgba(255, 200, 50, 0.3)"
                        : "0 4px 12px rgba(255, 223, 135, 0.3)",
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {level}
                  </div>
                </Link>
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg select-none"
                  style={{
                    backgroundColor: "#FFAC88",
                    boxShadow: "0 4px 12px rgba(255, 172, 136, 0.3)",
                    fontFamily: "var(--font-poppins)",
                    cursor: "not-allowed",
                    WebkitTapHighlightColor: "transparent",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {level}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0096C7] px-1 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-center gap-12">
          <Link href="/islands" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-islas.png" alt="Islas" width={28} height={28} />
            <span className="text-xs">Islas</span>
          </Link>

          <Link href="/mento" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/cerebro.png" alt="Mento" width={28} height={28} />
            <span className="text-xs">Mento</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-perfil.png" alt="Perfil" width={28} height={28} />
            <span className="text-xs">Perfil</span>
          </Link>

          <Link href="/settings" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-ajustes.png" alt="Ajustes" width={28} height={28} />
            <span className="text-xs">Ajustes</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

