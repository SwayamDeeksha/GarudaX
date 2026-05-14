import { Switch, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useAppSettingsStore } from "@/store/appSettingsStore";

export default function SecuritySettingsScreen() {
  const biometricEnabled = useAppSettingsStore((state) => state.biometricEnabled);
  const twoFactorEnabled = useAppSettingsStore((state) => state.twoFactorEnabled);
  const toggleBiometric = useAppSettingsStore((state) => state.toggleBiometric);
  const toggleTwoFactor = useAppSettingsStore((state) => state.toggleTwoFactor);

  return (
    <Screen>
      <ScreenHeader title="Security" subtitle="Account protection placeholders and session controls." />
      <View className="mb-4 rounded-2xl bg-navy-900 p-4">
        <Text className="text-lg font-black text-white">Password</Text>
        <Text className="mt-1 text-sm text-slate-300">Passwords are never stored in the mobile app.</Text>
        <View className="mt-4"><AppButton title="Change password" variant="secondary" icon="key" /></View>
      </View>
      <View className="mb-4 rounded-2xl bg-navy-900 p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="font-bold text-white">Biometric login placeholder</Text>
            <Text className="text-sm text-slate-300">Requires native biometric setup.</Text>
          </View>
          <Switch value={biometricEnabled} onValueChange={toggleBiometric} />
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="font-bold text-white">Two-factor authentication placeholder</Text>
            <Text className="text-sm text-slate-300">OTP or authenticator app in production.</Text>
          </View>
          <Switch value={twoFactorEnabled} onValueChange={toggleTwoFactor} />
        </View>
      </View>
      <View className="gap-3">
        <AppButton title="Device management placeholder" variant="secondary" icon="phone-portrait" />
        <AppButton title="Login activity placeholder" variant="secondary" icon="time" />
        <AppButton title="Logout from all devices placeholder" variant="danger" icon="log-out" />
      </View>
      <Text className="mt-5 text-xs text-slate-400">Session timeout placeholder: 15 minutes of inactivity. JWT is stored with Expo SecureStore.</Text>
    </Screen>
  );
}
