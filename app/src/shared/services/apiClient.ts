import axios from "axios";

import { clearCredentials } from "@features/auth/store/authSlice.ts";
import { API_BASE_URL } from "@shared/constants/api";
import { store } from "@store";

import { toastService } from "./toastService.ts";
import { tokenService } from "./tokenService";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async config => {
    const token = await tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const message: string =
      error?.response?.data?.message ??
      error?.response?.data?.errors?.[0]?.message ??
      "Something went wrong. Please try again.";
    toastService.error(message);
    if (error?.response?.status === 401) {
      await tokenService.removeToken();
      store.dispatch(clearCredentials());
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
