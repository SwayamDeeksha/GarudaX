import { Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function OtpVerificationScreen() {
  return (
    <Screen>
      <ScreenHeader title="OTP verification" subtitle="Placeholder for SMS/email second factor." />
      <AppInput label="One-time code" keyboardType="number-pad" placeholder="123456" maxLength={6} />
      <AppButton title="Verify OTP" icon="checkmark-circle" />
      <View className="mt-5 rounded-2xl bg-gold-500/10 p-4">
        <Text className="text-sm text-gold-300">Sandbox OTP accepts any 6-digit value once connected to a backend.</Text>
      </View>
    </Screen>
  );
}
