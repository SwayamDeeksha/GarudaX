import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { registerSchema } from "@/validation/schemas";
import { useAuthStore } from "@/store/authStore";

type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  governmentIdType: string;
  governmentIdNumber: string;
  terms: boolean;
};

const defaults: RegisterForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  country: "",
  nationality: "",
  dateOfBirth: "",
  address: "",
  governmentIdType: "",
  governmentIdNumber: "",
  terms: false
};

export default function RegisterScreen() {
  const register = useAuthStore((state) => state.register);
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaults
  });

  const submit = handleSubmit(async (data) => {
    await register(data);
    router.replace("/(auth)/otp");
  });

  const terms = watch("terms");
  const fields: [keyof RegisterForm, string, boolean?][] = [
    ["fullName", "Full Name"],
    ["email", "Email"],
    ["phone", "Phone Number"],
    ["password", "Password", true],
    ["confirmPassword", "Confirm Password", true],
    ["country", "Country"],
    ["nationality", "Nationality"],
    ["dateOfBirth", "Date of Birth"],
    ["address", "Address"],
    ["governmentIdType", "Government ID Type"],
    ["governmentIdNumber", "Government ID Number"]
  ];

  return (
    <Screen>
      <ScreenHeader title="Create account" subtitle="KYC details are collected for compliance review." />
      {fields.map(([name, label, secure]) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <AppInput
              label={label}
              secureTextEntry={secure}
              autoCapitalize={name === "email" ? "none" : "words"}
              value={String(field.value || "")}
              onChangeText={field.onChange}
              error={errors[name]?.message as string | undefined}
            />
          )}
        />
      ))}
      <Pressable onPress={() => setValue("terms", !terms)} className="mb-5 flex-row items-center rounded-xl bg-navy-900 p-4">
        <View className={`mr-3 h-6 w-6 rounded-md border ${terms ? "border-gold-500 bg-gold-500" : "border-white/20"}`} />
        <Text className="flex-1 text-sm text-slate-200">I accept the Terms & Conditions and understand this MVP uses mock/sandbox transfers.</Text>
      </Pressable>
      {errors.terms?.message ? <Text className="mb-3 text-xs text-red-300">{errors.terms.message}</Text> : null}
      <AppButton title="Register and verify OTP" icon="person-add" onPress={submit} />
    </Screen>
  );
}
