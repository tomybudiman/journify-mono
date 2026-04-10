import mysql, { Pool, PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import winston from 'winston';
import fs from 'fs';

// Buat folder logs jika belum ada
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/db-error.log' }),
  ],
});

type QueryParams = (string | number | boolean | null)[];

class Database {
  private pool: Pool | null = null;
  public isConnected: boolean = false;

  constructor() {
    process.on('SIGINT', () => this.close());
    process.on('SIGTERM', () => this.close());
  }

  createPool(): Pool {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: parseInt(process.env.DB_POOL_LIMIT ?? '20'),
      queueLimit: 100,
      connectTimeout: 10000,
      idleTimeout: 60000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 30000,
      timezone: 'Z',
      decimalNumbers: true,
      multipleStatements: false,
    });

    this.pool.getConnection()
      .then((conn: PoolConnection) => {
        this.isConnected = true;
        console.log('✅ Database connected');
        conn.release();
      })
      .catch((err: Error) => {
        logger.error('Connection failed', { error: err.message });
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
      });

    return this.pool;
  }

  private getPool(): Pool {
    if (!this.pool) this.createPool();
    return this.pool!;
  }

  async getConnection(): Promise<PoolConnection> {
    return await this.getPool().getConnection();
  }

  async query<T = RowDataPacket[]>(
    sql: string,
    params: QueryParams = []
  ): Promise<T> {
    const start = Date.now();
    try {
      const [rows] = await this.getPool().execute(sql, params);
      const duration = Date.now() - start;
      if (duration > 1000) logger.warn('Slow query', { sql, duration });
      return rows as T;
    } catch (error) {
      logger.error('Query failed', { sql, params, error: (error as Error).message });
      throw this.normalizeError(error as NodeJS.ErrnoException);
    }
  }

  async transaction<T>(
    callback: (connection: PoolConnection) => Promise<T>
  ): Promise<T> {
    const connection = await this.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      logger.error('Transaction rolled back', { error: (error as Error).message });
      throw this.normalizeError(error as NodeJS.ErrnoException);
    } finally {
      connection.release();
    }
  }

  private normalizeError(error: NodeJS.ErrnoException): Error {
    const map: Record<string, string> = {
      'ER_DUP_ENTRY': 'Data sudah ada.',
      'ER_NO_REFERENCED_ROW': 'Data referensi tidak ditemukan.',
      'ER_ROW_IS_REFERENCED': 'Data sedang digunakan, tidak bisa dihapus.',
      'ECONNREFUSED': 'Database tidak dapat diakses.',
      'ETIMEDOUT': 'Koneksi database timeout.',
      'ER_ACCESS_DENIED_ERROR': 'Akses database ditolak.',
    };
    const message = (error.code && map[error.code]) || 'Terjadi kesalahan pada database.';
    const normalized = new Error(message) as NodeJS.ErrnoException;
    normalized.code = error.code;
    return normalized;
  }

  async ping(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      console.log('Database pool closed');
    }
  }
}

export default new Database();
