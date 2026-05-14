import { useEffect } from "react";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { BeneficiaryCard } from "@/components/BeneficiaryCard";
import { EmptyState } from "@/components/States";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useBeneficiaryStore } from "@/store/beneficiaryStore";

export default function BeneficiariesScreen() {
  const beneficiaries = useBeneficiaryStore((state) => state.beneficiaries);
  const loadBeneficiaries = useBeneficiaryStore((state) => state.loadBeneficiaries);

  useEffect(() => {
    loadBeneficiaries();
  }, [loadBeneficiaries]);

  return (
    <Screen>
      <ScreenHeader title="Beneficiaries" subtitle="Saved recipients for compliant transfers." rightIcon="add" onRightPress={() => router.push("/beneficiaries/add")} />
      {beneficiaries.length ? beneficiaries.map((beneficiary) => <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} onPress={() => router.push(`/beneficiaries/${beneficiary.id}`)} />) : <EmptyState title="No beneficiaries" body="Add a recipient before starting a transfer." />}
      <AppButton title="Add beneficiary" icon="person-add" onPress={() => router.push("/beneficiaries/add")} />
    </Screen>
  );
}
