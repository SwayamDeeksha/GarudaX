import { Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { KycBanner } from "@/components/KycBanner";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useAuthStore } from "@/store/authStore";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen>
      <ScreenHeader title="Profile" subtitle="Personal information and settings." rightIcon="settings" onRightPress={() => router.push("/security")} />
      <View className="mb-5 rounded-2xl bg-navy-900 p-5">
        <Text className="text-2xl font-black text-white">{user?.name || "Arjun Rao"}</Text>
        <Text className="mt-1 text-slate-300">{user?.email || "arjun@example.com"}</Text>
        <Text className="mt-1 text-slate-300">{user?.country || "India"}</Text>
      </View>
      <KycBanner status={user?.kycStatus || "Verified"} />
      <View className="gap-3">
        <AppButton title="KYC status" variant="secondary" icon="shield-checkmark" onPress={() => router.push("/kyc/status")} />
        <AppButton title="Saved beneficiaries" variant="secondary" icon="people" onPress={() => router.push("/beneficiaries")} />
        <AppButton title="Security settings" variant="secondary" icon="lock-closed" onPress={() => router.push("/security")} />
        <AppButton title="Help & support" variant="secondary" icon="help-buoy" onPress={() => router.push("/support")} />
        <AppButton title="Legal documents" variant="secondary" icon="document-text" onPress={() => router.push("/legal")} />
        <AppButton title="Logout" variant="danger" icon="log-out" onPress={async () => { await logout(); router.replace("/(auth)/login"); }} />
      </View>
    </Screen>
  );
}
