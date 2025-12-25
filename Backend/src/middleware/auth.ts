import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Extend Express Request type
export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    console.log('Auth Header:', authHeader); // Debug log

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log('Token:', token.substring(0, 20) + '...'); // Debug log

    const decoded = verifyToken(token);
    console.log('Decoded user:', decoded.userId); // Debug log

    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth error:', error); // Debug log
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};