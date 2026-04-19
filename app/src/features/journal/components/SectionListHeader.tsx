import React from "react";
import { StyleSheet, Text } from "react-native";

import { colors, textStyles } from "@shared/constants";

export interface SectionListHeaderProps {
  title?: string;
}

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 24,
    fontWeight: "bold",
    paddingHorizontal: 24,
    color: colors.textPrimary,
    ...textStyles.headlineLarge,
    lineHeight: 36,
    fontSize: 36,
  },
});

export default function SectionListHeader(props: SectionListHeaderProps) {
  // Render
  return <Text style={styles.headerText}>{props.title}</Text>;
}
