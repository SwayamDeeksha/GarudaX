import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function KycDocumentUploadScreen() {
  return (
    <Screen>
      <ScreenHeader title="Document upload" subtitle="KYC step 3 of 5." />
      <View className="mb-4 rounded-2xl border border-dashed border-gold-500/40 bg-navy-900 p-8">
        <Text className="text-center text-lg font-black text-white">ID document upload placeholder</Text>
        <Text className="mt-2 text-center text-sm text-slate-300">Passport, national ID, or driver license would be uploaded through a secure provider SDK.</Text>
      </View>
      <View className="mb-5 rounded-2xl border border-dashed border-white/20 bg-navy-900 p-8">
        <Text className="text-center text-lg font-black text-white">Selfie verification placeholder</Text>
        <Text className="mt-2 text-center text-sm text-slate-300">Liveness and face match checks belong behind an audited KYC vendor integration.</Text>
      </View>
      <AppButton title="Review submission" icon="document-text" onPress={() => router.push("/kyc/review")} />
    </Screen>
  );
}
