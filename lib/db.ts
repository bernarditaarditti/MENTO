import { Pool } from "pg";

// Evita múltiples conexiones en desarrollo en Next.js (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

if (!global.pgPool) {
  global.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

export const pool = global.pgPool;
