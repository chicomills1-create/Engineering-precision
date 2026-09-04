import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// Advisory locks intentionally use a separate, small pool. Holding a session
// lock while the protected operation queries through `pool` must never consume
// every general-purpose connection and deadlock the operation it protects.
export const advisoryLockPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 4,
});
export const db = drizzle(pool, { schema });

export * from "./schema";
