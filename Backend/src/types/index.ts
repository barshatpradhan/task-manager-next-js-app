import { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: number;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface JWTPayload {
  userId: number;
  email: string;
}