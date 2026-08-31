import { pool } from "@workspace/db";

export async function withOutreachEmailLock<T>(
  email: string,
  operation: () => Promise<T>,
): Promise<T> {
  const normalizedEmail = email.trim().toLowerCase();
  const client = await pool.connect();
  let locked = false;
  try {
    await client.query(
      "select pg_advisory_lock(hashtextextended($1, 0))",
      [normalizedEmail],
    );
    locked = true;
    return await operation();
  } finally {
    if (locked) {
      await client.query(
        "select pg_advisory_unlock(hashtextextended($1, 0))",
        [normalizedEmail],
      );
    }
    client.release();
  }
}