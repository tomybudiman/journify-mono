import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import UserModel from '../models/UserModel';

const SALT_ROUNDS = 12;

class AuthController {
  private tokenSecret: string = process.env.JWT_SECRET as string;

  generateToken = (id: number, email: string): string => {
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN ?? '15m') as SignOptions['expiresIn'],
    };
    return jwt.sign({ id, email }, this.tokenSecret, options);
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'Email sudah terdaftar',
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: 'Registrasi berhasil',
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Email atau password salah',
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Email atau password salah',
        });
        return;
      }

      const token = this.generateToken(user.id, user.email);

      res.status(200).json({
        success: true,
        token,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      message: 'Logout berhasil',
    });
  };
}

export default new AuthController();
