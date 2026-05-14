import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { beneficiarySchema } from "@/validation/schemas";
import { useBeneficiaryStore } from "@/store/beneficiaryStore";
import { Beneficiary, CurrencyCode } from "@/types";

type Form = Omit<Beneficiary, "id">;

const defaults: Form = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  currency: "USD",
  bankName: "",
  accountNumber: "",
  swiftCode: "",
  routingCode: "",
  bankAddress: "",
  relationship: "",
  purposeCategory: ""
};

export default function AddBeneficiaryScreen() {
  const addBeneficiary = useBeneficiaryStore((state) => state.addBeneficiary);
  const { control, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(beneficiarySchema), defaultValues: defaults });
  const fields = Object.keys(defaults) as (keyof Form)[];

  return (
    <Screen>
      <ScreenHeader title="Add beneficiary" subtitle="Bank details are validated before transfer use." />
      {fields.map((name) => (
        <Controller key={name} control={control} name={name} render={({ field }) => <AppInput label={name.replace(/([A-Z])/g, " $1")} value={String(field.value)} onChangeText={(value) => field.onChange(name === "currency" ? value.toUpperCase() as CurrencyCode : value)} error={errors[name]?.message} />} />
      ))}
      <AppButton title="Save beneficiary" icon="save" onPress={handleSubmit(async (data) => { await addBeneficiary(data); router.replace("/beneficiaries"); })} />
    </Screen>
  );
}
