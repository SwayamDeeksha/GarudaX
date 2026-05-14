import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useKycStore } from "@/store/kycStore";

export default function KycReviewScreen() {
  const submit = useKycStore((state) => state.submit);
  const loading = useKycStore((state) => state.loading);
  return (
    <Screen>
      <ScreenHeader title="Review & submit" subtitle="KYC step 5 of 5." />
      <View className="rounded-2xl bg-navy-900 p-5">
        <Text className="text-lg font-black text-white">Submission summary</Text>
        <Text className="mt-2 text-slate-300">Personal details, address details, ID upload placeholder, and selfie placeholder are ready for sandbox submission.</Text>
        <Text className="mt-3 text-slate-300">Audit log placeholder: user ID, timestamp, device ID, IP metadata, document checks, sanctions screening result.</Text>
      </View>
      <View className="mt-5">
        <AppButton
          title={loading ? "Submitting..." : "Submit KYC"}
          icon="cloud-upload"
          disabled={loading}
          onPress={async () => {
            await submit({
              documentUploadAcknowledged: true,
              selfieVerificationAcknowledged: true
            });
            router.replace("/kyc/status");
          }}
        />
      </View>
    </Screen>
  );
}
