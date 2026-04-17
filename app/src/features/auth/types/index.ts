export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}
