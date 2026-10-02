import mysql, { type Pool, type ResultSetHeader } from "mysql2/promise";

type SqlValue = string | number | bigint | boolean | Date | null | Buffer | Uint8Array;

declare global {
  // eslint-disable-next-line no-var
  var snhMysqlPool: Pool | undefined;
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_DATABASE || "snh_homes",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    waitForConnections: true,
    connectionLimit: 8,
    queueLimit: 0,
    enableKeepAlive: true,
  });
}

export function getPool() {
  if (!global.snhMysqlPool) {
    global.snhMysqlPool = createPool();
  }

  return global.snhMysqlPool;
}

export async function select<T>(
  sql: string,
  values: SqlValue[] = [],
) {
  try {
    const [rows] = await getPool().query(sql, values);
    return rows as T;
  } catch (error) {
    console.warn("[snh-next] database read failed; using an empty result", error);
    return [] as T;
  }
}

export async function execute(sql: string, values: SqlValue[] = []) {
  const [result] = await getPool().execute<ResultSetHeader>(sql, values);
  return result;
}
