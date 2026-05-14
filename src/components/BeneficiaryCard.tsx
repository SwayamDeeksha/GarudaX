import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Beneficiary } from "@/types";
import { maskAccount } from "@/lib/format";

export function BeneficiaryCard({ beneficiary, onPress }: { beneficiary: Beneficiary; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className="mb-3 flex-row items-center rounded-2xl border border-white/10 bg-navy-900 p-4">
      <View className="mr-3 h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15">
        <Ionicons name="person" size={21} color="#F0C96A" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-bold text-white">{beneficiary.fullName}</Text>
        <Text className="mt-1 text-xs text-slate-300">{beneficiary.country} • {beneficiary.currency} • {maskAccount(beneficiary.accountNumber)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#7C8AA5" />
    </Pressable>
  );
}
