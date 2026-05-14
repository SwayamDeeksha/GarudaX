import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, useColorScheme } from "react-native";
import { useAuthStore } from "@/store/authStore";
import "../global.css";

export default function RootLayout() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const scheme = useColorScheme(); // 👈 detect system theme

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 👇 This enables dark mode globally */}
      <View className={scheme === "dark" ? "dark flex-1" : "flex-1"}>
        <StatusBar style="light" />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: "#061428" },
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}