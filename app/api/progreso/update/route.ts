import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id_usuario, id_isla, nivel_actual } = body;

    if (!id_usuario || !id_isla || nivel_actual == null) {
      return NextResponse.json({ success: false, message: "Datos incompletos" }, { status: 400 });
    }

    // Intentar actualizar primero
    const updateRes = await pool.query(
      `UPDATE Progreso SET nivel_actual = $1 WHERE Id_usuario = $2 AND Id_isla = $3 RETURNING *`,
      [nivel_actual, id_usuario, id_isla]
    );

    if (updateRes.rowCount === 0) {
      // Si no existe, insertar
      await pool.query(
        `INSERT INTO Progreso (nivel_actual, fecha_inicio, Id_usuario, Id_isla) VALUES ($1, NOW(), $2, $3)`,
        [nivel_actual, id_usuario, id_isla]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/progreso/update:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}

