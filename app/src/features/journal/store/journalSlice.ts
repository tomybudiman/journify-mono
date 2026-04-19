import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  createJournalThunk,
  deleteJournalThunk,
  fetchJournalByIdThunk,
  fetchJournalsThunk,
  updateJournalThunk,
} from "./journalThunks";

type SyncStatus = "synced" | "pending" | "failed";

export interface Journal {
  id: number;
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
    deleteJournal: (state, action: PayloadAction<number>) => {
      state.journals = state.journals.filter(j => j.id !== action.payload);
    },
    setJournalSyncStatus: (
      state,
      action: PayloadAction<{ id: number; syncStatus: SyncStatus }>,
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
  extraReducers: builder => {
    builder
      .addCase(fetchJournalsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJournalsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.journals = action.payload;
      })
      .addCase(fetchJournalsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchJournalByIdThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJournalByIdThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(fetchJournalByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createJournalThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createJournalThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createJournalThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updateJournalThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateJournalThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateJournalThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteJournalThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteJournalThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.journals = state.journals.filter(j => j.id !== action.payload);
      })
      .addCase(deleteJournalThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
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
