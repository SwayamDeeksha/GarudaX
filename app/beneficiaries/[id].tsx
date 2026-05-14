import { useLocalSearchParams, router } from "expo-router";
import { Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { SecureText } from "@/components/SecureText";
import { useBeneficiaryStore } from "@/store/beneficiaryStore";

export default function BeneficiaryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const beneficiary = useBeneficiaryStore((state) => state.beneficiaries.find((item) => item.id === id));

  if (!beneficiary) {
    return <Screen><ScreenHeader title="Beneficiary" /><Text className="text-slate-300">Recipient not found.</Text></Screen>;
  }

  return (
    <Screen>
      <ScreenHeader title={beneficiary.fullName} subtitle={`${beneficiary.country} - ${beneficiary.currency}`} rightIcon="create" onRightPress={() => router.push(`/beneficiaries/${id}/edit`)} />
      <View className="rounded-2xl bg-navy-900 p-4">
        <Text className="text-lg font-black text-white">{beneficiary.bankName}</Text>
        <Text className="mt-1 text-slate-300">{beneficiary.bankAddress}</Text>
        <SecureText label="Account / IBAN" value={beneficiary.accountNumber} />
        <SecureText label="SWIFT/BIC" value={beneficiary.swiftCode} />
        <Text className="mt-2 text-sm text-slate-300">Routing / IFSC / Sort code: {beneficiary.routingCode}</Text>
        <Text className="mt-2 text-sm text-slate-300">Relationship: {beneficiary.relationship}</Text>
        <Text className="mt-2 text-sm text-slate-300">Purpose category: {beneficiary.purposeCategory}</Text>
      </View>
      <View className="mt-5">
        <AppButton title="Edit beneficiary" icon="create" onPress={() => router.push(`/beneficiaries/${id}/edit`)} />
      </View>
    </Screen>
  );
}
