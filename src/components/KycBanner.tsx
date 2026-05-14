import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBadge } from "./StatusBadge";
import { KycStatus } from "@/types";

export function KycBanner({ status }: { status: KycStatus }) {
  return (
    <View className="mb-5 rounded-2xl border border-gold-500/20 bg-navy-900 p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15">
            <Ionicons name="shield-checkmark" size={20} color="#F0C96A" />
          </View>
          <View>
            <Text className="font-bold text-white">Compliance status</Text>
            <Text className="text-xs text-slate-300">KYC and AML checks are required before real transfers.</Text>
          </View>
        </View>
        <StatusBadge label={status} />
      </View>
    </View>
  );
}
