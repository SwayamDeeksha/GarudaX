import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export function ScreenHeader({
  title,
  subtitle,
  rightIcon,
  onRightPress,
}: {
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between mb-5">
      
      {/* Left Content */}
      <View className="flex-1">
        <Text className="text-2xl font-black text-white">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-1 text-sm text-slate-300">
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* Right Button */}
      {rightIcon ? (
        <Pressable
          onPress={onRightPress}
          className="items-center justify-center h-11 w-11 rounded-xl bg-navy-800"
        >
          <Ionicons name={rightIcon} size={20} color="#F0C96A" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)");
            }
          }}
          className="items-center justify-center h-11 w-11 rounded-xl bg-navy-800"
        >
          <Ionicons name="chevron-back" size={20} color="#F0C96A" />
        </Pressable>
      )}
    </View>
  );
}