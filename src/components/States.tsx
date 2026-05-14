import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View className="items-center rounded-2xl border border-white/10 bg-navy-900 p-8">
      <Ionicons name="folder-open" size={28} color="#F0C96A" />
      <Text className="mt-3 text-lg font-black text-white">{title}</Text>
      <Text className="mt-1 text-center text-sm text-slate-300">{body}</Text>
    </View>
  );
}

export function LoadingState() {
  return <Text className="py-6 text-center text-slate-300">Loading secure data...</Text>;
}

export function ErrorState({ message }: { message: string }) {
  return <Text className="rounded-xl bg-red-500/10 p-4 text-red-200">{message}</Text>;
}
