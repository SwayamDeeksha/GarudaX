import { useEffect } from "react";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { BeneficiaryCard } from "@/components/BeneficiaryCard";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useBeneficiaryStore } from "@/store/beneficiaryStore";
import { useTransferStore } from "@/store/transferStore";

export default function SendMoneyBeneficiaryScreen() {
  const beneficiaries = useBeneficiaryStore((state) => state.beneficiaries);
  const loadBeneficiaries = useBeneficiaryStore((state) => state.loadBeneficiaries);
  const setDraft = useTransferStore((state) => state.setDraft);

  useEffect(() => {
    loadBeneficiaries();
  }, [loadBeneficiaries]);

  return (
    <Screen>
      <ScreenHeader title="Beneficiary" subtitle="Step 5: select or add recipient." rightIcon="add" onRightPress={() => router.push("/beneficiaries/add")} />
      {beneficiaries.map((beneficiary) => (
        <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} onPress={() => { setDraft({ beneficiary }); router.push("/send/purpose"); }} />
      ))}
      <AppButton title="Add new beneficiary" variant="secondary" icon="person-add" onPress={() => router.push("/beneficiaries/add")} />
    </Screen>
  );
}
