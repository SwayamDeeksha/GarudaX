import { Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function ForgotPasswordScreen() {
  return (
    <Screen>
      <ScreenHeader title="Reset password" subtitle="Sandbox flow sends a mock recovery OTP." />
      <AppInput label="Email" keyboardType="email-address" autoCapitalize="none" placeholder="you@example.com" />
      <AppButton title="Send mock OTP" icon="mail" />
      <View className="mt-5 rounded-2xl bg-navy-900 p-4">
        <Text className="text-sm text-slate-300">Password reset is a placeholder in this MVP. No real email is sent.</Text>
      </View>
    </Screen>
  );
}
