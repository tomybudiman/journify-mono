import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SyncStatus = "synced" | "pending" | "failed";

export interface Journal {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

interface JournalState {
  journals: Journal[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JournalState = {
  journals: [],
  isLoading: false,
  error: null,
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setJournals: (state, action: PayloadAction<Journal[]>) => {
      state.journals = action.payload;
    },
    addJournal: (state, action: PayloadAction<Journal>) => {
      state.journals.unshift(action.payload);
    },
    updateJournal: (state, action: PayloadAction<Journal>) => {
      const index = state.journals.findIndex(j => j.id === action.payload.id);
      if (index !== -1) state.journals[index] = action.payload;
    },
    deleteJournal: (state, action: PayloadAction<string>) => {
      state.journals = state.journals.filter(j => j.id !== action.payload);
    },
    setJournalSyncStatus: (
      state,
      action: PayloadAction<{ id: string; syncStatus: SyncStatus }>,
    ) => {
      const journal = state.journals.find(j => j.id === action.payload.id);
      if (journal) journal.syncStatus = action.payload.syncStatus;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setJournals,
  addJournal,
  updateJournal,
  deleteJournal,
  setJournalSyncStatus,
  setLoading,
  setError,
} = journalSlice.actions;
export default journalSlice.reducer;
