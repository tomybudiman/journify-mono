import { Request, Response } from 'express';
import JournalModel from '../models/JournalModel';
import { UpdateJournalData } from '../interfaces/IJournalModel';

class JournalController {

  checkDuplicateDate = async (userId: number, date: string): Promise<boolean> => {
    const existing = await JournalModel.findByDate(userId, date);
    return existing !== null;
  };

  getAllJournals = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const journals = await JournalModel.findAll(userId);

      res.status(200).json({
        success: true,
        data: journals,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };

  getJournalById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const userId = req.user!.id;

      const journal = await JournalModel.findById(id);

      if (!journal) {
        res.status(404).json({
          success: false,
          message: 'Jurnal tidak ditemukan',
        });
        return;
      }

      if (journal.user_id !== userId) {
        res.status(403).json({
          success: false,
          message: 'Akses tidak diizinkan',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: journal,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };

  createJournal = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user!.id;
      const { date, title, content } = req.body;

      const isDuplicate = await this.checkDuplicateDate(userId, date);
      if (isDuplicate) {
        res.status(409).json({
          success: false,
          message: 'Jurnal untuk tanggal ini sudah ada',
        });
        return;
      }

      await JournalModel.create({
        user_id: userId,
        title,
        content,
        date,
      });

      res.status(201).json({
        success: true,
        message: 'Jurnal berhasil dibuat',
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };

  updateJournal = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const userId = req.user!.id;
      const { title, content } = req.body;

      const journal = await JournalModel.findById(id);

      if (!journal) {
        res.status(404).json({
          success: false,
          message: 'Jurnal tidak ditemukan',
        });
        return;
      }

      if (journal.user_id !== userId) {
        res.status(403).json({
          success: false,
          message: 'Akses tidak diizinkan',
        });
        return;
      }

      const hasChanges =
        journal.title !== title || journal.content !== content;

      if (!hasChanges) {
        res.status(200).json({
          success: true,
          message: 'Tidak ada perubahan',
        });
        return;
      }

      const updateData: UpdateJournalData = { title, content };
      await JournalModel.update(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Jurnal berhasil diperbarui',
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };

  deleteJournal = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const userId = req.user!.id;

      const journal = await JournalModel.findById(id);

      if (!journal) {
        res.status(404).json({
          success: false,
          message: 'Jurnal tidak ditemukan',
        });
        return;
      }

      if (journal.user_id !== userId) {
        res.status(403).json({
          success: false,
          message: 'Akses tidak diizinkan',
        });
        return;
      }

      await JournalModel.delete(id);

      res.status(200).json({
        success: true,
        message: 'Jurnal berhasil dihapus',
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };
}

export default new JournalController();
