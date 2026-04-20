import React, { useCallback } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import JournalForm from "@features/journal/components/JournalForm.tsx";
import { Journal } from "@features/journal/store/journalSlice";
import { updateJournalThunk } from "@features/journal/store/journalThunks";
import { CreateJournalPayload } from "@features/journal/types";
import { MainStackParamList } from "@navigation/types.ts";
import Header from "@shared/components/core/Header.tsx";
import { colors } from "@shared/constants";
import { useAppDispatch } from "@shared/hooks/useAppDispatch.ts";
import { useAppSelector } from "@shared/hooks/useAppSelector.ts";
import { toastService } from "@shared/services/toastService.ts";

export interface EditJournalScreenProps {
  navigation: StackNavigationProp<MainStackParamList, "EditJournal">;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default function EditJournalScreen(
  props: EditJournalScreenProps,
): React.JSX.Element {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<MainStackParamList, "EditJournal">>();
  const journal: Journal = useAppSelector(state =>
    state.journal.journals.find(j => j.id === route.params.journalId),
  ) as Journal;
  const initialValues: CreateJournalPayload = {
    date: journal.date,
    title: journal.title,
    content: journal.content,
  };

  /**
   * @description Dispatches the update journal thunk and resets navigation to JournalDetail on success
   */
  const handleOnSubmitJournalForm = useCallback(
    async (data: CreateJournalPayload) => {
      const result = await dispatch(
        updateJournalThunk({ id: journal.id, payload: data }),
      );

      if (updateJournalThunk.fulfilled.match(result)) {
        toastService.success("Journal updated successfully");
        props.navigation.reset({
          index: 1,
          routes: [
            { name: "Dashboard" },
            { name: "JournalDetail", params: { journalId: journal.id } },
          ],
        });
      } else {
        toastService.error(
          (result.payload as string) ?? "Failed to update journal",
        );
      }
    },
    [dispatch, journal.id, props.navigation],
  );

  // Render
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header>Edit Journal</Header>
        <JournalForm
          initialValues={initialValues}
          onSubmit={handleOnSubmitJournalForm}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
