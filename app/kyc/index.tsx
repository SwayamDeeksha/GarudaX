import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { KycBanner } from "@/components/KycBanner";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useKycStore } from "@/store/kycStore";

export default function KycStartScreen() {
  const kycStatus = useKycStore((state) => state.status);
  return (
    <Screen>
      <ScreenHeader title="KYC onboarding" subtitle="Identity checks are required before regulated transfers." />
      <KycBanner status={kycStatus} />
      <View className="rounded-2xl bg-navy-900 p-5">
        <Text className="text-lg font-black text-white">Verification steps</Text>
        <Text className="mt-3 text-slate-300">Personal details, address details, ID document upload placeholder, selfie verification placeholder, review and submit.</Text>
      </View>
      <View className="mt-5 gap-3">
        <AppButton title="Start personal details" icon="person" onPress={() => router.push("/kyc/personal")} />
        <AppButton title="View KYC status" variant="secondary" icon="shield-checkmark" onPress={() => router.push("/kyc/status")} />
      </View>
    </Screen>
  );
}
