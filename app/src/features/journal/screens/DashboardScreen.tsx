import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { faBars } from "@fortawesome/pro-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Easing } from "react-native-reanimated";
import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { logoutThunk } from "@features/auth/store/authThunks";
import Button from "@shared/components/core/Button.tsx";
import { colors } from "@shared/constants";
import { useAppDispatch } from "@shared/hooks/useAppDispatch.ts";
import { toastService } from "@shared/services/toastService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.background,
  },
  bottomSheetView: {
    gap: 8,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  floatingPrimaryButton: {
    width: 56,
    right: 32,
    height: 56,
    zIndex: 999,
    elevation: 999,
    borderRadius: 32,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
});

export default function DashboardScreen() {
  const insets: EdgeInsets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const signOutPendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationConfigs = useMemo(
    () => ({
      duration: 600,
      easing: Easing.out(Easing.exp),
    }),
    [],
  );

  /**
   * @description Handles sign out with double-tap confirmation.
   * The first tap shows a warning toast, the second tap within 3 seconds performs logout.
   */
  const handleSignOut = useCallback(() => {
    if (signOutPendingRef.current) {
      clearTimeout(signOutPendingRef.current);
      signOutPendingRef.current = null;
      dispatch(logoutThunk());
      return;
    }
    toastService.info("Tap again to sign out");
    signOutPendingRef.current = setTimeout(() => {
      signOutPendingRef.current = null;
    }, 3000);
  }, [dispatch]);

  // Render
  return (
    <>
      <SafeAreaView
        style={styles.container}
        edges={["left", "bottom", "right"]}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => bottomSheetRef.current?.expand()}
          style={[
            styles.floatingPrimaryButton,
            {
              bottom: insets.bottom + 32,
            },
          ]}>
          <FontAwesomeIcon size={24} icon={faBars} color={colors.surface} />
        </TouchableOpacity>
      </SafeAreaView>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        animationConfigs={animationConfigs}>
        <BottomSheetView
          style={[{ paddingBottom: insets.bottom }, styles.bottomSheetView]}>
          <Button
            size="medium"
            variant="error"
            mode="outlined"
            onPress={handleSignOut}>
            Sign Out
          </Button>
          <Button
            mode="text"
            size="medium"
            onPress={() => bottomSheetRef.current?.close()}>
            Cancel
          </Button>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
