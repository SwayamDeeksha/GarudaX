import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { QuoteSummaryCard } from "@/components/QuoteSummaryCard";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SecureText } from "@/components/SecureText";
import { useTransferStore } from "@/store/transferStore";

export default function SendMoneyReviewScreen() {
  const draft = useTransferStore((state) => state.draft);
  const createTransfer = useTransferStore((state) => state.createTransfer);

  return (
    <Screen>
      <ScreenHeader title="Review transfer" subtitle="Step 8: confirm sandbox transfer details." />
      {draft.quote ? <QuoteSummaryCard quote={draft.quote} /> : null}
      <View className="mb-5 rounded-2xl bg-navy-900 p-4">
        <Text className="mb-3 text-lg font-black text-white">Beneficiary</Text>
        <Text className="text-white">{draft.beneficiary?.fullName}</Text>
        <Text className="mt-1 text-slate-300">{draft.beneficiary?.bankName}</Text>
        {draft.beneficiary?.accountNumber ? <SecureText label="Masked account" value={draft.beneficiary.accountNumber} /> : null}
      </View>
      <View className="mb-5 rounded-2xl bg-navy-900 p-4">
        <Text className="text-sm text-slate-300">Transfer purpose</Text>
        <Text className="mt-1 font-bold text-white">{draft.purpose}</Text>
        <Text className="mt-3 text-sm text-slate-300">Source of funds</Text>
        <Text className="mt-1 font-bold text-white">{draft.sourceOfFunds}</Text>
        <Text className="mt-3 text-sm text-gold-300">Risk status: {draft.quote?.risk}. This controls compliance review routing in the sandbox.</Text>
      </View>
      <AppButton title="Create transfer" icon="checkmark-circle" onPress={async () => { const tx = await createTransfer(); router.replace(`/send/payment?transferId=${tx.id}`); }} />
    </Screen>
  );
}
