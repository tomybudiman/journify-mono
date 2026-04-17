import { API_ENDPOINTS } from "@shared/constants";
import apiClient from "@shared/services/apiClient.ts";

import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types";

export const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.auth.register, payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.auth.login, payload);
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.auth.logout);
    return response.data;
  },
};
