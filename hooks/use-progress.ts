"use client"

import { useCallback } from "react"
import { useAuth } from "@/context/AuthContext"
import { updateProgress } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function useProgress() {
  const { user } = useAuth()
  const { toast } = useToast()

  const saveProgress = useCallback(
    async (idIsla: number, nivelActual: number) => {
      if (!user) {
        toast({ title: "Error", description: "Usuario no autenticado" })
        return { success: false, message: "Usuario no autenticado" }
      }

      try {
        const res = await updateProgress(user.id_usuario, {
          id_isla: idIsla,
          nivel_actual: nivelActual,
        })

        if (!res.success) {
          toast({ title: "Error", description: res.message || "No se pudo guardar el progreso" })
        }

        return res
      } catch (error: any) {
        toast({ title: "Error", description: error?.message || "Error al guardar progreso" })
        return { success: false, message: error?.message }
      }
    },
    [user, toast]
  )

  return { saveProgress }
}
