
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRES_IN = '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw error;
  }
};