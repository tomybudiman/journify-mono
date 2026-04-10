import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateJournalScreen from "@features/journal/screens/CreateJournalScreen";
import DashboardScreen from "@features/journal/screens/DashboardScreen";
import EditJournalScreen from "@features/journal/screens/EditJournalScreen";
import JournalDetailScreen from "@features/journal/screens/JournalDetailScreen";

import { MainStackParamList } from "./types";

const Stack = createStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="EditJournal" component={EditJournalScreen} />
      <Stack.Screen name="CreateJournal" component={CreateJournalScreen} />
      <Stack.Screen name="JournalDetail" component={JournalDetailScreen} />
    </Stack.Navigator>
  );
}
