export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  CreateJournal: undefined;
  EditJournal: { journalId: number };
  JournalDetail: { journalId: number };
};
