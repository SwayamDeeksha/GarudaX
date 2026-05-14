import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { BrandMark } from "@/components/BrandMark";
import { Screen } from "@/components/Screen";
import { loginSchema } from "@/validation/schemas";
import { useAuthStore } from "@/store/authStore";

type LoginForm = { email: string; password: string };

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "arjun@example.com", password: "DemoPass123" }
  });

  const submit = handleSubmit(async (data) => {
    await login(data.email, data.password);
    router.replace("/(tabs)");
  });

  return (
    <Screen>
      <BrandMark />
      <View className="mt-10">
        <Controller control={control} name="email" render={({ field }) => <AppInput label="Email" autoCapitalize="none" keyboardType="email-address" value={field.value} onChangeText={field.onChange} error={errors.email?.message} />} />
        <Controller control={control} name="password" render={({ field }) => <AppInput label="Password" secureTextEntry value={field.value} onChangeText={field.onChange} error={errors.password?.message} />} />
        <AppButton title={loading ? "Signing in..." : "Login"} icon="lock-closed" onPress={submit} disabled={loading} />
        <View className="mt-4 gap-3">
          <AppButton title="Biometric login placeholder" variant="secondary" icon="finger-print" onPress={() => undefined} />
          <AppButton title="Forgot password" variant="ghost" onPress={() => router.push("/(auth)/forgot-password")} />
          <AppButton title="Create account" variant="ghost" onPress={() => router.push("/(auth)/register")} />
        </View>
        <Text className="mt-5 text-center text-xs text-slate-400">Demo credentials: arjun@example.com / DemoPass123</Text>
      </View>
    </Screen>
  );
}
