import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { kycPersonalSchema } from "@/validation/schemas";

type Form = { fullName: string; dateOfBirth: string; nationality: string; occupation: string; governmentIdType: string; governmentIdNumber: string };

export default function KycPersonalDetailsScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(kycPersonalSchema),
    defaultValues: { fullName: "Arjun Rao", dateOfBirth: "1992-04-16", nationality: "Indian", occupation: "Product Manager", governmentIdType: "Passport", governmentIdNumber: "" }
  });
  const fields: (keyof Form)[] = ["fullName", "dateOfBirth", "nationality", "occupation", "governmentIdType", "governmentIdNumber"];
  return (
    <Screen>
      <ScreenHeader title="Personal details" subtitle="KYC step 1 of 5." />
      {fields.map((name) => (
        <Controller key={name} control={control} name={name} render={({ field }) => <AppInput label={name.replace(/([A-Z])/g, " $1")} value={field.value} onChangeText={field.onChange} error={errors[name]?.message} />} />
      ))}
      <AppButton title="Continue to address" icon="arrow-forward" onPress={handleSubmit(() => router.push("/kyc/address"))} />
    </Screen>
  );
}
