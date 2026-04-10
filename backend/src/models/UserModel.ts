import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import db from '../config/db';
import { IUserModel, User, CreateUserData } from '../interfaces/IUserModel';

interface UserRow extends User, RowDataPacket {}

class UserModel implements IUserModel {

  async findByEmail(email: string): Promise<User | null> {
    const rows = await db.query<UserRow[]>(
      'SELECT id, name, email, password, created_at FROM users WHERE email = ?',
      [email]
    );
    return rows[0] ?? null;
  }

  async findById(id: number): Promise<User | null> {
    const rows = await db.query<UserRow[]>(
      'SELECT id, name, email, password, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] ?? null;
  }

  async create(data: CreateUserData): Promise<ResultSetHeader> {
    return await db.query<ResultSetHeader>(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [data.name, data.email, data.password]
    );
  }

  async delete(id: number): Promise<ResultSetHeader> {
    return await db.query<ResultSetHeader>(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
  }
}

export default new UserModel();
