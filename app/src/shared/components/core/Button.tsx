import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
  Button as ButtonNative,
  ButtonProps as ButtonNativeProps,
} from "react-native-paper";

import { textStyles } from "@shared/constants";

export interface ButtonProps extends Omit<ButtonNativeProps, "contentStyle"> {
  size?: "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({});

export default function Button({ size = "large", ...props }: ButtonProps) {
  const getDynamicSizeStyle = () => {
    switch (size) {
      case "small":
        return {
          buttonHeight: 32,
          labelStyle: {
            ...textStyles.labelSmall,
          },
        };
      case "medium":
        return {
          buttonHeight: 40,
          labelStyle: {
            ...textStyles.labelMedium,
          },
        };
      case "large":
      default:
        return {
          buttonHeight: 48,
          labelStyle: {
            ...textStyles.labelLarge,
          },
        };
    }
  };
  // Render
  const { buttonHeight, labelStyle } = getDynamicSizeStyle();
  return (
    <ButtonNative
      {...props}
      labelStyle={labelStyle}
      contentStyle={[{ height: buttonHeight }, props.style]}>
      {props.children}
    </ButtonNative>
  );
}
