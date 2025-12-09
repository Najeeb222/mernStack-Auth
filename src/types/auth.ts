// src/types/auth.ts

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserType {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  provider?: string;
  iat: number;
  exp: number;
}

export interface AuthContextType {
  user: UserType | null;
  token: string | null;
  loading?: boolean;
  login: (accessToken: string, userData: UserType) => void; // <- updated
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
    user: UserType;
    token: string;
  };
}
