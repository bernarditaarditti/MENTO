import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Datos recibidos en /api/onboarding/save:", body);

    const {
      id_usuario,
      nombre,
      edad,
      emociones,
      id_genero,
      id_intensidad,
      id_objetivo,
    } = body;

    if (!id_usuario) {
      return NextResponse.json(
        { success: false, error: "Falta id_usuario" },
        { status: 400 }
      );
    }

    // Insertar o actualizar onboarding
    await pool.query(
      `
      INSERT INTO Onboarding 
        (id_usuario, nombre, edad, emociones, id_genero, id_intensidad, id_objetivo)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id_usuario) DO UPDATE SET
        nombre = EXCLUDED.nombre,
        edad = EXCLUDED.edad,
        emociones = EXCLUDED.emociones,
        id_genero = EXCLUDED.id_genero,
        id_intensidad = EXCLUDED.id_intensidad,
        id_objetivo = EXCLUDED.id_objetivo
      `,
      [
        id_usuario,
        nombre || null,
        edad || null,
        emociones || null,
        id_genero || null,
        id_intensidad || null,
        id_objetivo || null,
      ]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error en /api/onboarding/save:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
