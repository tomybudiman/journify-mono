import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Image,
  RefreshControl,
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { faBars } from "@fortawesome/pro-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Easing } from "react-native-reanimated";
import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import uuid from "react-native-uuid";

import { logoutThunk } from "@features/auth/store/authThunks";
import SectionListHeader from "@features/journal/components/SectionListHeader.tsx";
import SectionListItem from "@features/journal/components/SectionListItem.tsx";
import { Journal } from "@features/journal/store/journalSlice.ts";
import { fetchJournalsThunk } from "@features/journal/store/journalThunks.ts";
import { MenuSection } from "@features/journal/types";
import { MainStackParamList } from "@navigation/types.ts";
import Button from "@shared/components/core/Button.tsx";
import { colors, textStyles } from "@shared/constants";
import { useAppDispatch } from "@shared/hooks/useAppDispatch.ts";
import { useAppSelector } from "@shared/hooks/useAppSelector.ts";
import { toastService } from "@shared/services/toastService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.background,
  },
  emptyJournalContainer: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyJournalIcon: {
    width: 128,
    height: 128,
  },
  emptyJournalText: {
    maxWidth: "80%",
    textAlign: "center",
    color: colors.textPrimary,
    ...textStyles.bodyLarge,
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

export default function DashboardScreen(): React.JSX.Element {
  const insets: EdgeInsets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const signOutPendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const journals: Journal[] = useAppSelector(state => state.journal.journals);
  const isLoading: boolean = useAppSelector(state => state.journal.isLoading);
  const animationConfigs = useMemo(
    () => ({
      duration: 600,
      easing: Easing.out(Easing.exp),
    }),
    [],
  );
  const keyExtractor = useCallback((item: Journal) => String(item.id), []);
  const fetchJournals = useCallback(() => {
    dispatch(fetchJournalsThunk());
  }, [dispatch]);

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

  /**
   * @description Closes the bottom sheet and navigates to the CreateJournal screen.
   */
  const handleCreateJournal = useCallback(() => {
    bottomSheetRef.current?.close();
    navigation.navigate("CreateJournal");
  }, [navigation]);

  /**
   * @description Closes the bottom sheet and navigates to the journal detail screen with the specified journal ID.
   */
  const handleNavigateToJournalDetail = useCallback(
    (journalId: number) => {
      bottomSheetRef.current?.close();
      navigation.navigate("JournalDetail", { journalId: journalId });
    },
    [navigation],
  );

  /**
   * @description Groups journals by month and year, returning section list data with formatted headers.
   */
  const getSectionListData: MenuSection[] = useMemo(() => {
    if (journals.length > 0) {
      const grouped = journals.reduce<Record<string, Journal[]>>(
        (acc, journal) => {
          const date = new Date(journal.date);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(journal);
          return acc;
        },
        {},
      );
      return Object.entries(grouped).map(([key, data]) => {
        const [year, month] = key.split("-").map(Number);
        const monthName = new Intl.DateTimeFormat("id-ID", {
          month: "long",
        }).format(new Date(year, month));
        return {
          id: uuid.v4() as string,
          title: `${monthName} - ${year}`,
          data,
        };
      });
    }
    return [];
  }, [journals]);

  /**
   * @description Renders section headers and individual journal items for the SectionList.
   */
  const renderSectionHeader = useCallback(
    ({ section }: { section: MenuSection }) => {
      return <SectionListHeader title={section.title} />;
    },
    [],
  );
  const renderItem = useCallback(
    ({ item }: SectionListRenderItemInfo<Journal, MenuSection>) => {
      return (
        <SectionListItem
          journal={item}
          onPress={() => handleNavigateToJournalDetail(item.id)}
        />
      );
    },
    [handleNavigateToJournalDetail],
  );

  /**
   * @description Fetches journals on component mount and logs loading state and journals data for debugging.
   */
  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  // Render
  return (
    <>
      <SafeAreaView style={styles.container}>
        {getSectionListData.length > 0 ? (
          <SectionList
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            sections={getSectionListData}
            renderSectionHeader={renderSectionHeader}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={fetchJournals}
              />
            }
          />
        ) : (
          <View style={styles.emptyJournalContainer}>
            <Image
              style={styles.emptyJournalIcon}
              source={require("@shared/assets/images/empty-journal-512.png")}
            />
            <Text style={styles.emptyJournalText}>
              What's on your mind today? Start capturing your thoughts and
              memories.
            </Text>
            <Button
              size="medium"
              mode="contained"
              onPress={handleCreateJournal}>
              Write Something New
            </Button>
          </View>
        )}
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
            mode="contained"
            variant="primary"
            onPress={handleCreateJournal}>
            Write New Journal
          </Button>
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
