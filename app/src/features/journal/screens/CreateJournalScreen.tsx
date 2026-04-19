import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import JournalForm from "@features/journal/components/JournalForm.tsx";
import { colors } from "@shared/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default function CreateJournalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <JournalForm />
    </SafeAreaView>
  );
}
