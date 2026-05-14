import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBadge } from "./StatusBadge";
import { KycStatus } from "@/types";

export function KycBanner({ status }: { status: KycStatus }) {
  return (
    <View className="mb-4 rounded-xl bg-[#0F223A] px-2.5 py-1">
      <View className="flex-row items-center justify-between">
        
        {/* Left */}
        <View className="flex-row items-center flex-1">
          
          {/* Slightly smaller icon container */}
          <View className="items-center justify-center w-8 h-8 mr-2 rounded-lg bg-gold-500/15">
            <Ionicons name="shield-checkmark" size={20} color="#F0C96A" />
          </View>

          {/* SAME content, just tighter spacing */}
          <View className="flex-1">
            <Text className="font-bold leading-tight text-white">
              Compliance status
            </Text>

            <Text className="text-xs leading-tight text-slate-300">
              KYC and AML checks are required before real transfers.
            </Text>
          </View>
        </View>

        {/* Badge */}
        <View className="ml-2">
          <StatusBadge label={status} />
        </View>

      </View>
    </View>
  );
}