import { useEffect } from "react";
import { Text, View } from "react-native";
import { KycBanner } from "@/components/KycBanner";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useKycStore } from "@/store/kycStore";

const statuses = ["Not Started", "Pending", "Verified", "Rejected", "Needs More Information"];

export default function KycStatusScreen() {
  const kycStatus = useKycStore((state) => state.status);
  const loadStatus = useKycStore((state) => state.loadStatus);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  return (
    <Screen>
      <ScreenHeader title="KYC status" subtitle="Verification state machine for compliance workflows." />
      <KycBanner status={kycStatus} />
      <View className="rounded-2xl bg-navy-900 p-5">
        <Text className="mb-4 text-lg font-black text-white">Supported statuses</Text>
        {statuses.map((status) => (
          <View key={status} className="mb-3"><StatusBadge label={status} /></View>
        ))}
      </View>
    </Screen>
  );
}
