import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MainStackParamList } from "./types";

const Stack = createStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" />
      <Stack.Screen name="CreateJournal" />
      <Stack.Screen name="JournalDetail" />
    </Stack.Navigator>
  );
}
