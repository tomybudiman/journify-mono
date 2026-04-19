import React, { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

import { colors, textStyles } from "@shared/constants";

interface HeaderProps {
  children?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  showBackButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    color: colors.textPrimary,
    ...textStyles.headlineLarge,
    lineHeight: 32,
    fontSize: 32,
  },
});

export default function Header({
  children,
  left,
  right,
  showBackButton = true,
}: HeaderProps): React.JSX.Element {
  const navigation = useNavigation();

  /**
   * @description Renders the header title as styled text if children is a string, otherwise returns children as-is.
   */
  const renderTitle = (): ReactNode => {
    if (typeof children === "string") {
      return <Text style={styles.titleText}>{children}</Text>;
    }
    return children;
  };

  // Render
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {left !== undefined ? (
          left
        ) : showBackButton ? (
          <TouchableOpacity
            hitSlop={8}
            activeOpacity={0.75}
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              size={24}
              icon={faChevronLeft}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.centerContainer}>{renderTitle()}</View>
      {right}
    </View>
  );
}
