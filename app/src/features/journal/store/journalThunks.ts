import { createAsyncThunk } from "@reduxjs/toolkit";

import { journalService } from "@features/journal/services/journalService";
import {
  CreateJournalPayload,
  UpdateJournalPayload,
} from "@features/journal/types";

import { Journal } from "./journalSlice";

const mapToJournal = (item: any): Journal => ({
  id: item.id,
  title: item.title,
  content: item.content,
  date: item.date,
  createdAt: item.created_at,
  updatedAt: item.updated_at,
  syncStatus: "synced",
});

export const fetchJournalsThunk = createAsyncThunk(
  "journal/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await journalService.getAll();
      return response.data.map(mapToJournal);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Failed to fetch journals";
      return rejectWithValue(message);
    }
  },
);

export const fetchJournalByIdThunk = createAsyncThunk(
  "journal/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await journalService.getById(id);
      return mapToJournal(response.data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Failed to fetch journal";
      return rejectWithValue(message);
    }
  },
);

export const createJournalThunk = createAsyncThunk(
  "journal/create",
  async (payload: CreateJournalPayload, { rejectWithValue }) => {
    try {
      await journalService.create(payload);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.errors?.[0]?.message ??
        "Failed to create journal";
      return rejectWithValue(message);
    }
  },
);

export const updateJournalThunk = createAsyncThunk(
  "journal/update",
  async (
    { id, payload }: { id: number; payload: UpdateJournalPayload },
    { rejectWithValue },
  ) => {
    try {
      await journalService.update(id, payload);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.errors?.[0]?.message ??
        "Failed to update journal";
      return rejectWithValue(message);
    }
  },
);

export const deleteJournalThunk = createAsyncThunk(
  "journal/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await journalService.delete(id);
      return id;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Failed to delete journal";
      return rejectWithValue(message);
    }
  },
);
