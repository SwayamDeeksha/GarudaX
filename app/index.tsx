import { useEffect } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { BrandMark } from "@/components/BrandMark";
import { Screen } from "@/components/Screen";
import { useAppSettingsStore } from "@/store/appSettingsStore";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/theme/useTheme";

export default function SplashScreen() {
  const theme = useTheme();

  const hasSeenOnboarding = useAppSettingsStore((state) => state.hasSeenOnboarding);
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) return;

    const timeout = setTimeout(() => {
      if (!hasSeenOnboarding) router.replace("/(onboarding)");
      else if (!token) router.replace("/(auth)/login");
      else router.replace("/(tabs)");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [hasSeenOnboarding, hydrated, token]);

  return (
    <Screen scroll={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        
        {/* Logo + App Name */}
        <Animated.View entering={ZoomIn.duration(650)}>
          <BrandMark compact={false} />
        </Animated.View>

        {/* Tagline */}
        <Animated.Text
          entering={FadeIn.delay(550)}
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 12,
            letterSpacing: 2,
            color: theme.secondaryText,
          }}
        >
          Sandbox MVP • No real money movement
        </Animated.Text>
      </View>

      {/* Bottom Text */}
      <Text
        style={{
          paddingBottom: 24,
          textAlign: "center",
          fontSize: 12,
          color: theme.secondaryText,
        }}
      >
        KYC/AML ready architecture demonstration
      </Text>
    </Screen>
  );
}