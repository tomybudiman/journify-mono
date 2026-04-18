import React, { useRef } from "react";
import type { TextInput as RNTextInput } from "react-native";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  TextInput as TextInputNative,
  TextInputProps as TextInputNativeProps,
} from "react-native-paper";

export interface TextInputProps extends TextInputNativeProps {
  allowClear?: boolean;
}

export default function TextInput({ allowClear, ...props }: TextInputProps) {
  const inputRef = useRef<RNTextInput>(null);
  /**
   * Clears the field value and restores focus.
   */
  const handleClear = (): void => {
    if (props.onChangeText) {
      props.onChangeText("");
    }
    inputRef.current?.focus();
  };
  /**
   * Resolves the right prop with the following priority:
   * 1. `right` prop — if provided, always wins over `allowClear`
   * 2. Clear icon — rendered when `allowClear` is true and the field has value
   * 3. `undefined` — no right adornment
   */
  const resolveRightProp = (): React.ReactNode => {
    if (props.right) {
      return props.right;
    }
    if (allowClear && props.value && props.value.length > 0) {
      return (
        <TextInputNative.Icon
          onPress={handleClear}
          icon={({ size, color }: { size: number; color: string }) => (
            <FontAwesomeIcon size={size} color={color} icon={faCircleXmark} />
          )}
        />
      );
    }
    return undefined;
  };
  // Render
  return (
    <TextInputNative {...props} ref={inputRef} right={resolveRightProp()} />
  );
}
