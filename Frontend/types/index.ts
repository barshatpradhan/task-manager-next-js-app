export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  error: string;
}

// Request body for login
export interface LoginRequest {
  email: string;
  password: string;
}

// Response for login (same as AuthResponse)
export interface LoginResponse {
  user: User;
  token: string;
}

// Request body for register
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Response for register (same as AuthResponse)
export interface RegisterResponse {
  user: User;
  token: string;
}
