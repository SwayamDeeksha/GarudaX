import { Controller, useForm } from "react-hook-form";
import { useLocalSearchParams, router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useBeneficiaryStore } from "@/store/beneficiaryStore";
import { Beneficiary } from "@/types";

type Form = Omit<Beneficiary, "id">;

export default function EditBeneficiaryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const beneficiary = useBeneficiaryStore((state) => state.beneficiaries.find((item) => item.id === id));
  const updateBeneficiary = useBeneficiaryStore((state) => state.updateBeneficiary);
  const removeBeneficiary = useBeneficiaryStore((state) => state.removeBeneficiary);
  const { control, handleSubmit } = useForm<Form>({ defaultValues: beneficiary });
  const fields = beneficiary ? Object.keys(beneficiary).filter((key) => key !== "id") as (keyof Form)[] : [];

  return (
    <Screen>
      <ScreenHeader title="Edit beneficiary" subtitle="Keep bank details current and auditable." />
      {fields.map((name) => (
        <Controller key={name} control={control} name={name} render={({ field }) => <AppInput label={name.replace(/([A-Z])/g, " $1")} value={String(field.value)} onChangeText={field.onChange} />} />
      ))}
      <AppButton title="Save changes" icon="save" onPress={handleSubmit(async (data) => { if (id) await updateBeneficiary(id, data); router.back(); })} />
      <AppButton title="Delete beneficiary" variant="danger" icon="trash" onPress={async () => { if (id) await removeBeneficiary(id); router.replace("/beneficiaries"); }} />
    </Screen>
  );
}
