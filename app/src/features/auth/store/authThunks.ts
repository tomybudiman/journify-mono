import { createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "@features/auth/services/authService.ts";
import { LoginPayload, RegisterPayload } from "@features/auth/types";
import { tokenService } from "@shared/services/tokenService";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.errors?.[0]?.message ??
        "Registration failed";
      return rejectWithValue(message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);
      await tokenService.saveToken(response.token);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.errors?.[0]?.message ??
        "Login failed";
      return rejectWithValue(message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      await tokenService.removeToken();
      return response;
    } catch (error: any) {
      // Token may be expired or invalid — remove local token regardless
      await tokenService.removeToken();
      const message = error?.response?.data?.message ?? "Logout failed";
      return rejectWithValue(message);
    }
  },
);
