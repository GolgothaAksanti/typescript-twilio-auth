import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export const generateToken = (_id: string): string => {
  return jwt.sign({ _id }, `${JWT_SECRET_KEY}`, { expiresIn: '1d' });
};
