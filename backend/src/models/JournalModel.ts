import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import db from '../config/db';
import { IJournalModel, Journal, CreateJournalData, UpdateJournalData } from '../interfaces/IJournalModel';

interface JournalRow extends Journal, RowDataPacket {}

class JournalModel implements IJournalModel {

  async findAll(userId: number): Promise<Journal[]> {
    return await db.query<JournalRow[]>(
      'SELECT id, user_id, title, content, date, created_at, updated_at FROM journals WHERE user_id = ? ORDER BY date DESC',
      [userId]
    );
  }

  async findById(id: number): Promise<Journal | null> {
    const rows = await db.query<JournalRow[]>(
      'SELECT id, user_id, title, content, date, created_at, updated_at FROM journals WHERE id = ?',
      [id]
    );
    return rows[0] ?? null;
  }

  async findByDate(userId: number, date: string): Promise<Journal | null> {
    const rows = await db.query<JournalRow[]>(
      'SELECT id, user_id, title, content, date, created_at, updated_at FROM journals WHERE user_id = ? AND date = ?',
      [userId, date]
    );
    return rows[0] ?? null;
  }

  async create(data: CreateJournalData): Promise<ResultSetHeader> {
    return await db.transaction(async (connection) => {
      const [result] = await connection.execute<ResultSetHeader>(
        'INSERT INTO journals (user_id, title, content, date) VALUES (?, ?, ?, ?)',
        [data.user_id, data.title, data.content, data.date]
      );
      return result;
    });
  }

  async update(id: number, data: UpdateJournalData): Promise<ResultSetHeader> {
    return await db.query<ResultSetHeader>(
      'UPDATE journals SET title = ?, content = ? WHERE id = ?',
      [data.title, data.content, id]
    );
  }

  async delete(id: number): Promise<ResultSetHeader> {
    return await db.query<ResultSetHeader>(
      'DELETE FROM journals WHERE id = ?',
      [id]
    );
  }
}

export default new JournalModel();
