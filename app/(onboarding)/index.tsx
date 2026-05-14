import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";
import { BrandMark } from "@/components/BrandMark";
import { Screen } from "@/components/Screen";
import { useAppSettingsStore } from "@/store/appSettingsStore";

const slides = [
  { title: "Send Money Globally", body: "Transfer money across borders with multi-currency support.", icon: "send" },
  { title: "Transparent Exchange Rates", body: "View fees, FX markup, and recipient amount before you send.", icon: "stats-chart" },
  { title: "Secure & Compliance Ready", body: "KYC, AML checks, and tracking built into every transfer.", icon: "shield-checkmark" }
] as const;

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const setSeen = useAppSettingsStore((state) => state.setSeenOnboarding);
  const slide = slides[index];

  const next = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else {
      setSeen();
      router.replace("/(auth)/login");
    }
  };

  return (
    <Screen scroll={false}>
      <View className="flex-1 justify-between">
        <BrandMark compact />
        <Animated.View key={slide.title} entering={FadeInRight.duration(350)} className="items-center">
          <View className="mb-8 h-28 w-28 items-center justify-center rounded-[28px] border border-gold-500/25 bg-gold-500/10">
            <Ionicons name={slide.icon} size={48} color="#F0C96A" />
          </View>
          <Text className="text-center text-4xl font-black text-white">{slide.title}</Text>
          <Text className="mt-4 text-center text-base leading-6 text-slate-300">{slide.body}</Text>
          <View className="mt-8 flex-row gap-2">
            {slides.map((item, dotIndex) => (
              <View key={item.title} className={`h-2 rounded-full ${dotIndex === index ? "w-8 bg-gold-500" : "w-2 bg-white/20"}`} />
            ))}
          </View>
        </Animated.View>
        <View className="gap-3">
          <AppButton title={index === slides.length - 1 ? "Get started" : "Continue"} icon="arrow-forward" onPress={next} />
          <AppButton title="Skip to login" variant="ghost" onPress={() => { setSeen(); router.replace("/(auth)/login"); }} />
        </View>
      </View>
    </Screen>
  );
}
