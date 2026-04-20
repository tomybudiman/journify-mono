import React, { useCallback } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import JournalForm from "@features/journal/components/JournalForm.tsx";
import { createJournalThunk } from "@features/journal/store/journalThunks";
import { CreateJournalPayload } from "@features/journal/types";
import { MainStackParamList } from "@navigation/types.ts";
import Header from "@shared/components/core/Header.tsx";
import { colors } from "@shared/constants";
import { useAppDispatch } from "@shared/hooks/useAppDispatch.ts";
import { toastService } from "@shared/services/toastService.ts";

export interface CreateJournalScreenProps {
  navigation: StackNavigationProp<MainStackParamList, "CreateJournal">;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default function CreateJournalScreen(
  props: CreateJournalScreenProps,
): React.JSX.Element {
  const dispatch = useAppDispatch();

  /**
   * @description Dispatches the "create" journal thunk and resets navigation to Dashboard on success
   */
  const handleOnSubmitJournalForm = useCallback(
    async (data: CreateJournalPayload) => {
      const result = await dispatch(createJournalThunk(data));

      if (createJournalThunk.fulfilled.match(result)) {
        toastService.success("Journal created successfully");
        props.navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        toastService.error(
          (result.payload as string) ?? "Failed to create journal",
        );
      }
    },
    [dispatch, props.navigation],
  );

  // Render
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header>New Journal</Header>
        <JournalForm onSubmit={handleOnSubmitJournalForm} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
