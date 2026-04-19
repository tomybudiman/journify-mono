import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { faBars } from "@fortawesome/pro-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Dialog, Portal } from "react-native-paper";
import { Easing } from "react-native-reanimated";
import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Journal } from "@features/journal/store/journalSlice";
import { deleteJournalThunk } from "@features/journal/store/journalThunks";
import { MainStackParamList } from "@navigation/types";
import Button from "@shared/components/core/Button";
import Header from "@shared/components/core/Header";
import { colors, textStyles } from "@shared/constants";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { useAppSelector } from "@shared/hooks/useAppSelector";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 8,
  },
  dateText: {
    marginBottom: 4,
    color: colors.textSecondary,
    ...textStyles.bodyMedium,
  },
  titleText: {
    marginBottom: 16,
    color: colors.textPrimary,
    ...textStyles.headlineLarge,
  },
  contentText: {
    color: colors.textPrimary,
    ...textStyles.bodyLarge,
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
  dialogActions: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bottomSheetView: {
    gap: 8,
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});

export default function JournalDetailScreen(): React.JSX.Element {
  const insets: EdgeInsets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, "JournalDetail">>();
  const dispatch = useAppDispatch();
  const animationConfigs = useMemo(
    () => ({
      duration: 600,
      easing: Easing.out(Easing.exp),
    }),
    [],
  );
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const journal: Journal | undefined = useAppSelector(state =>
    state.journal.journals.find(j => j.id === route.params.journalId),
  );

  console.log("journal:", journal);

  /**
   * @description Shows the delete confirmation dialog.
   */
  const handlePressDelete = useCallback(() => {
    bottomSheetRef.current?.close();
    setConfirmVisible(true);
  }, []);

  /**
   * @description Hides the confirmation dialog without deleting.
   */
  const handleCancelDelete = useCallback(() => {
    setConfirmVisible(false);
  }, []);

  /**
   * @description Dispatches deleteJournalThunk and navigates back on success.
   */
  const handleConfirmDelete = useCallback(async () => {
    if (!journal) {
      return;
    }
    setConfirmVisible(false);
    const result = await dispatch(deleteJournalThunk(journal.id));
    if (deleteJournalThunk.fulfilled.match(result)) {
      navigation.goBack();
    }
  }, [dispatch, journal, navigation]);

  // Render
  if (!journal) {
    return (
      <View style={styles.container}>
        <Header>Journal</Header>
      </View>
    );
  }

  const formattedDate: string = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(journal.date));

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header>Journal</Header>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.titleText}>{journal.title}</Text>
          <Text style={styles.contentText}>{journal.content}</Text>

          {/*  <Button*/}
          {/*    size="medium"*/}
          {/*    mode="outlined"*/}
          {/*    variant="error"*/}
          {/*    onPress={handlePressDelete}>*/}
          {/*    Delete Journal*/}
          {/*  </Button>*/}
        </ScrollView>
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
      <Portal>
        <Dialog visible={confirmVisible} onDismiss={handleCancelDelete}>
          <Dialog.Title>Delete Journal</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to delete this journal? This action cannot
              be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button
              size="medium"
              mode="outlined"
              variant="primary"
              onPress={handleCancelDelete}>
              Cancel
            </Button>
            <Button
              size="medium"
              mode="contained"
              variant="error"
              onPress={handleConfirmDelete}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        animationConfigs={animationConfigs}>
        <BottomSheetView
          style={[{ paddingBottom: insets.bottom }, styles.bottomSheetView]}>
          <Button size="medium" mode="contained" variant="primary">
            Edit Journal
          </Button>
          <Button
            size="medium"
            variant="error"
            mode="outlined"
            onPress={handlePressDelete}>
            Delete Journal
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
