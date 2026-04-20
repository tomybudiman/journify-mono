import React, { useCallback } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import JournalForm from "@features/journal/components/JournalForm.tsx";
import { CreateJournalPayload } from "@features/journal/types";
import Header from "@shared/components/core/Header.tsx";
import { colors } from "@shared/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default function EditJournalScreen() {
  const handleOnSubmitJournalForm = useCallback(
    (data: CreateJournalPayload) => {
      console.log(data);
    },
    [],
  );

  // Render
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header>Edit Journal</Header>
        <JournalForm onSubmit={handleOnSubmitJournalForm} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
