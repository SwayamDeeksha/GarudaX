import { Text, View } from "react-native";

export function FeeBreakdown() {
  return (
    <View className="rounded-2xl border border-white/10 bg-navy-900 p-4">
      <Text className="text-base font-black text-white">Mock transfer limits</Text>
      <Text className="mt-2 text-sm text-slate-300">Minimum transfer: equivalent of 10 USD</Text>
      <Text className="mt-1 text-sm text-slate-300">Transfers above equivalent of 5,000 USD trigger compliance review.</Text>
      <Text className="mt-1 text-sm text-slate-300">Real money movement is disabled unless licensed provider keys and banking partner integrations are supplied.</Text>
    </View>
  );
}
