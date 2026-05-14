import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { kycAddressSchema } from "@/validation/schemas";

type Form = { address: string; city: string; country: string; postalCode: string };

export default function KycAddressDetailsScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(kycAddressSchema),
    defaultValues: { address: "Indiranagar, Bengaluru", city: "Bengaluru", country: "India", postalCode: "560038" }
  });
  const fields: (keyof Form)[] = ["address", "city", "country", "postalCode"];
  return (
    <Screen>
      <ScreenHeader title="Address details" subtitle="KYC step 2 of 5." />
      {fields.map((name) => (
        <Controller key={name} control={control} name={name} render={({ field }) => <AppInput label={name.replace(/([A-Z])/g, " $1")} value={field.value} onChangeText={field.onChange} error={errors[name]?.message} />} />
      ))}
      <AppButton title="Continue to documents" icon="arrow-forward" onPress={handleSubmit(() => router.push("/kyc/document-upload"))} />
    </Screen>
  );
}
