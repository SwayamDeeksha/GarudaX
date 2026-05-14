import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const icons = {
  index: "home",
  wallets: "wallet",
  send: "send",
  transactions: "receipt",
  profile: "person"
} as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0A1B34", borderTopColor: "rgba(255,255,255,0.08)", height: 72, paddingBottom: 12, paddingTop: 8 },
        tabBarActiveTintColor: "#F0C96A",
        tabBarInactiveTintColor: "#7C8AA5",
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name as keyof typeof icons]} color={color} size={size} />
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="wallets" options={{ title: "Wallets" }} />
      <Tabs.Screen name="send" options={{ title: "Send" }} />
      <Tabs.Screen name="transactions" options={{ title: "Transactions" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
