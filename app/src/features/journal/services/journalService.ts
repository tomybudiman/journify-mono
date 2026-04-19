import { API_ENDPOINTS } from "@shared/constants";
import apiClient from "@shared/services/apiClient";

import {
  CreateJournalPayload,
  GetAllJournalsResponse,
  GetJournalByIdResponse,
  UpdateJournalPayload,
} from "../types";

export const journalService = {
  getAll: async (): Promise<GetAllJournalsResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.journal.getAll);
    return response.data;
  },

  getById: async (id: number): Promise<GetJournalByIdResponse> => {
    const response = await apiClient.get(API_ENDPOINTS.journal.getById(id));
    return response.data;
  },

  create: async (payload: CreateJournalPayload): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.journal.create, payload);
  },

  update: async (id: number, payload: UpdateJournalPayload): Promise<void> => {
    await apiClient.put(API_ENDPOINTS.journal.update(id), payload);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.journal.delete(id));
  },
};
