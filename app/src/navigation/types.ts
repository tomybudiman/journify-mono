export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
};

export type MainStackParamList = {
	Dashboard: undefined;
	CreateJournal: undefined;
	JournalDetail: { journalId: string };
};
