import { Text, View } from "react-native";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { complianceDisclaimer } from "@/constants/options";

export default function LegalScreen() {
  return (
    <Screen>
      <ScreenHeader title="Legal" subtitle="Demo disclaimer and compliance boundaries." />
      <View className="rounded-2xl border border-gold-500/20 bg-navy-900 p-5">
        <Text className="text-lg font-black text-white">Compliance disclaimer</Text>
        <Text className="mt-3 text-base leading-6 text-slate-200">{complianceDisclaimer}</Text>
      </View>
      <View className="mt-5 rounded-2xl bg-navy-900 p-5">
        <Text className="text-lg font-black text-white">Secure architecture placeholders</Text>
        <Text className="mt-3 text-sm text-slate-300">KYC/AML vendor checks, sanctions screening, audit logs, encrypted document storage, transaction monitoring, manual review queues, partner-bank settlement, and regulatory reporting must be implemented before production use.</Text>
      </View>
    </Screen>
  );
}
