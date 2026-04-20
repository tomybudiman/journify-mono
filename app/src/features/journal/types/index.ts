import { SectionListData } from "react-native";

import { Journal } from "@features/journal/store/journalSlice.ts";

export interface JournalApiResponse {
  id: number;
  user_id: number;
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface GetAllJournalsResponse {
  success: boolean;
  data: JournalApiResponse[];
}

export interface GetJournalByIdResponse {
  success: boolean;
  data: JournalApiResponse;
}

export interface CreateJournalPayload {
  date: string;
  title: string;
  content: string;
}

export interface UpdateJournalPayload {
  title: string;
  content: string;
}

export interface MenuSection extends SectionListData<Journal> {
  id: string;
  title: string;
}

export interface JournalContent {
  question: string;
  answer: string;
}
