import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Journal } from "@features/journal/store/journalSlice.ts";
import { colors, textStyles } from "@shared/constants";

export interface SectionListItemProps {
  journal: Journal;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingLeft: 24,
    flexDirection: "row",
  },
  dateBoxContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLight,
  },
  dateBoxText: {
    color: colors.surface,
    ...textStyles.displayMedium,
  },
  journalPreviewContainer: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 8,
    paddingRight: 48,
    justifyContent: "center",
  },
  journalTitleText: {
    marginBottom: 4,
    color: colors.textPrimary,
    ...textStyles.headlineMedium,
  },
  journalContentPreviewText: {
    color: colors.textPrimary,
    ...textStyles.bodySmall,
  },
});

export default function SectionListItem(props: SectionListItemProps) {
  console.log(props.journal);
  // Render
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={props.onPress}
      style={styles.container}>
      <View style={styles.dateBoxContainer}>
        <Text style={styles.dateBoxText}>
          {new Date(props.journal.date).getUTCDate()}
        </Text>
      </View>
      <View style={styles.journalPreviewContainer}>
        <Text numberOfLines={1} style={styles.journalTitleText}>
          {props.journal.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.journalContentPreviewText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis
          velit ac nunc viverra scelerisque.
        </Text>
      </View>
    </TouchableOpacity>
  );
}
