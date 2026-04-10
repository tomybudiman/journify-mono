import { ResultSetHeader } from 'mysql2/promise';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUserModel {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(data: CreateUserData): Promise<ResultSetHeader>;
  delete(id: number): Promise<ResultSetHeader>;
}
