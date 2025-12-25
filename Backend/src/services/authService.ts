
import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { RegisterDTO, LoginDTO } from '../types';

export const registerUser = async (data: RegisterDTO) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash password
  const passwordHash = await hashPassword(data.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  // Generate token
  const token = generateToken({ userId: user.id, email: user.email });

  return { user, token };
};

export const loginUser = async (data: LoginDTO) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isValidPassword = await comparePassword(data.password, user.passwordHash);

  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateToken({ userId: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
