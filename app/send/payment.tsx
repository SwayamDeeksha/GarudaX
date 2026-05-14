import { useLocalSearchParams, router } from "expo-router";
import { Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useTransferStore } from "@/store/transferStore";

export default function PaymentMockScreen() {
  const { transferId } = useLocalSearchParams<{ transferId: string }>();
  const markPaid = useTransferStore((state) => state.markPaid);
  return (
    <Screen>
      <ScreenHeader title="Mock payment" subtitle="Step 9: payment confirmation placeholder." />
      <View className="mb-5 rounded-2xl border border-gold-500/20 bg-navy-900 p-6">
        <Text className="text-2xl font-black text-white">Payment rail disabled</Text>
        <Text className="mt-3 text-slate-300">This demo does not move money. A real launch requires licensed payment partners, settlement accounts, reconciliation, AML monitoring, and audit logging.</Text>
      </View>
      <AppButton title="Mark sandbox payment received" icon="card" onPress={async () => { if (transferId) await markPaid(transferId); router.replace(`/send/tracking?transferId=${transferId}`); }} />
    </Screen>
  );
}
