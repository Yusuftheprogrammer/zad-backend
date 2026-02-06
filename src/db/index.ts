import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Build connection string from either DATABASE_URL or individual PG_* vars
const connectionString = process.env.DATABASE_URL ?? (() => {
	const host = process.env.PGHOST ?? 'localhost';
	const port = process.env.PGPORT ?? '5432';
	const user = process.env.PGUSER ?? 'postgres';
	const password = process.env.PGPASSWORD ?? '';
	const database = process.env.PGDATABASE ?? 'postgres';

	const auth = user ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@` : '';
	return `postgresql://${auth}${host}:${port}/${database}`;
})();

const pool = new Pool({ connectionString });

export const db = drizzle(pool);
export { pool };

export async function testConnection() {
	const client = await pool.connect();
	try {
		await client.query('SELECT 1');
		return true;
	} catch (err) {
		console.error('DB connection test failed:', err);
		return false;
	} finally {
		client.release();
	}
}
