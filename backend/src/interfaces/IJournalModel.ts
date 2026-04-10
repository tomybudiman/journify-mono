import { ResultSetHeader } from 'mysql2/promise';

export interface Journal {
  id: number;
  user_id: number;
  title: string;
  content: string;
  date: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateJournalData {
  user_id: number;
  title: string;
  content: string;
  date: string;
}

export interface UpdateJournalData {
  title: string;
  content: string;
}

export interface IJournalModel {
  findAll(userId: number): Promise<Journal[]>;
  findById(id: number): Promise<Journal | null>;
  findByDate(userId: number, date: string): Promise<Journal | null>;
  create(data: CreateJournalData): Promise<ResultSetHeader>;
  update(id: number, data: UpdateJournalData): Promise<ResultSetHeader>;
  delete(id: number): Promise<ResultSetHeader>;
}
