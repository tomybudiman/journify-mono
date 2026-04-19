import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons/faCircleCheck";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons/faCircleInfo";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BaseToastProps } from "react-native-toast-message";

import { colors, textStyles } from "@shared/constants";

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "90%",
    minHeight: 32,
    borderRadius: 32,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  text: {
    color: colors.surface,
    ...textStyles.labelLarge,
  },
});

interface ToastItemProps extends BaseToastProps {
  backgroundColor: string;
  icon: IconProp;
}

function ToastItem({ backgroundColor, icon, text1, onPress }: ToastItemProps) {
  // Render
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { backgroundColor }]}>
        <FontAwesomeIcon icon={icon} color={colors.surface} size={16} />
        {text1 && <Text style={styles.text}>{text1}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <ToastItem
      {...props}
      icon={faCircleCheck}
      backgroundColor={colors.success}
    />
  ),
  error: (props: BaseToastProps) => (
    <ToastItem {...props} backgroundColor={colors.error} icon={faCircleXmark} />
  ),
  info: (props: BaseToastProps) => (
    <ToastItem
      {...props}
      icon={faCircleInfo}
      backgroundColor={colors.primary}
    />
  ),
};
